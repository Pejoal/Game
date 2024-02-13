<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import ResuableModal from "@/Components/ResuableModal.vue";
import Toast from "@/Components/Toast.vue";
import axios from "axios";
import { ref } from "vue";
import swal from "sweetalert";
import { trans } from "laravel-vue-i18n";
import QuestionLocales from "../Quiz/Partials/QuestionLocales.vue";

const props = defineProps({
  type: String,
  questions: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const showModal = ref(false);
let showToast = ref(false);

const photoForm = useForm({
  photo: null,
});

const videoForm = useForm({
  video: null,
});

const page = usePage().props;

const locale = ref(page.active_locale_code);
const locales = Object.keys(page.locales);

let formData = {};

locales.forEach((lang) => {
  formData[lang] = {
    content: "",
  };
});

const form = useForm({
  id: 0,
  ...formData,
  photo: "",
  video: "",
  answers: [],
  type: props.type,
});

const edit = (id) => {
  axios.get(route("question.get", id)).then((response) => {
    showModal.value = true;
    form.id = response.data.id;
    form.photo = response.data.photo;
    form.video = response.data.video;
    form.content = response.data.content;
    form.answers = response.data.answers;
    locales.forEach((lang) => {
      form[lang].content = response.data[lang].content;
      // form[lang]?.content = response.data[lang]?.content ?? null;
    });
  });
};

const update = () => {
  form.put(route("question.update", [form.id]), {
    onSuccess: () => {
      showToast.value = true;
      showModal.value = false;
    },
  });
};

function uploadPhoto() {
  photoForm.post(route("question.photo.update", [form.id]), {
    preserveScroll: true,
    onSuccess: () => {
      edit(form.id);
    },
  });
}

function uploadVideo() {
  videoForm.post(route("question.video.update", [form.id]), {
    preserveScroll: true,
    onSuccess: () => {
      edit(form.id);
    },
  });
}

const destroy = (id) => {
  new swal({
    title: trans("words.are_you_sure"),
    text: trans(
      "words.once_deleted_you_will_not_be_able_to_recover_this_Question"
    ),
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      form.delete(route("question.destroy", id), {
        onSuccess: () => {
          new swal(trans("words.question_has_been_deleted"), {
            icon: "success",
          });
        },
        onError: (error) => {
          new swal(trans("oops_Something_went_wrong"), error, "error");
        },
      });
    } else {
      new swal(trans("words.question_is_safe"));
    }
  });
};
const active_locale = (newLocale) => {
  locale.value = newLocale;
};
</script>

<template>
  <Head>
    <title>{{ trans("words.questions") }}</title>
  </Head>
  <AuthLayout>
    <template #left-sidebar> </template>
    <template #content>
      <Teleport to="#toasts">
        <Toast
          :show="showToast"
          :type="'success'"
          @close="showToast = false"
          :message="trans('words.question_updated')"
        />
      </Teleport>
      <Teleport to="#modal">
        <ResuableModal
          :classes="['w-[90%] md:w-[85%] lg:w-[80%] h-[60%]']"
          :header="trans('words.update_question')"
          :show="showModal"
          @close="showModal = false"
        >
          <template #content>
            <h3 class="w-full text-center font-bold text-xl">
              {{ trans(`words.${type}_questions`) }}
            </h3>
            <form @submit.prevent="update">
              <section class="flex items-center p-2">
                <label for="question" class="w-24"
                  >{{ trans("words.question") }}:</label
                >
                <textarea
                  id="question"
                  v-model="form[locale].content"
                  class="flex-1 rounded-md h-24"
                  required
                ></textarea>
                <QuestionLocales
                  v-on:active_locale="active_locale"
                  class="mx-2"
                  :horizontal="true"
                />
                <section
                  v-if="props.type === 'photo'"
                  class="border mx-2 w-40 flex items-center justify-center"
                >
                  <img
                    v-if="form.photo"
                    :src="form.photo"
                    :alt="trans('words.photo')"
                  />
                </section>
              </section>
              <p v-if="form.errors.content" class="error">
                {{ form.errors.content }}
              </p>

              <section class="p-2">
                <label>{{ trans("words.answers") }}:</label>
                <section
                  v-for="(answer, index) in form.answers"
                  :key="index"
                  class="flex items-center gap-2 p-2"
                >
                  <label :for="'answer' + index" class="w-3/4">
                    <input
                      v-if="props.type !== 'math'"
                      type="text"
                      v-model="form.answers[index][locale].content"
                      class="block w-full rounded-md"
                      required
                    />
                    <input
                      v-else-if="props.type === 'math'"
                      type="number"
                      v-model="form.answers[index][locale].value"
                      class="block w-full rounded-md"
                      required
                    />
                  </label>
                  <input
                    type="checkbox"
                    :id="'answer' + index"
                    :value="index"
                    v-model="form.answers[index].is_correct"
                  />
                </section>
              </section>
              <p v-if="form.errors.answers" class="error">
                {{ form.errors.answers }}
              </p>
              <button type="submit" class="btn btn-primary mx-auto">
                {{ trans("words.update_question") }}
              </button>
            </form>

            <template v-if="props.type === 'photo'">
              <form @submit.prevent="uploadPhoto" class="p-2">
                <section class="flex justify-between flex-col sm:flex-row">
                  <div class="my-2">
                    <label class="pr-2" for="photo">
                      {{ trans("words.photo") }}
                    </label>
                    <input
                      id="photo"
                      type="file"
                      @input="photoForm.photo = $event.target.files[0]"
                    />
                  </div>
                  <button
                    class="btn btn-success"
                    type="submit"
                    :disabled="photoForm.processing"
                  >
                    {{ trans("words.upload") }}
                  </button>
                </section>
                <p
                  v-if="photoForm.errors.photo"
                  class="text-sm bg-red-600 rounded-md my-1 px-2 py-1"
                >
                  {{ photoForm.errors.photo }}
                </p>
                <progress
                  v-if="photoForm.progress"
                  :value="photoForm.progress.percentage"
                  max="100"
                >
                  {{ photoForm.progress.percentage }}%
                </progress>
                <Transition
                  enter-from-class="opacity-0"
                  leave-to-class="opacity-0"
                  class="transition ease-in-out"
                >
                  <p v-if="photoForm.recentlySuccessful" class="text-sm">
                    {{ trans("words.uploaded") }}
                  </p>
                </Transition>
              </form>
            </template>
            <template v-if="props.type === 'video'">
              <form @submit.prevent="uploadVideo" class="p-2">
                <section class="flex justify-between flex-col sm:flex-row">
                  <div class="my-2">
                    <label class="pr-2" for="video">
                      {{ trans("words.video") }}
                    </label>
                    <input
                      id="video"
                      type="file"
                      @input="videoForm.video = $event.target.files[0]"
                    />
                  </div>
                  <button
                    class="btn btn-success"
                    type="submit"
                    :disabled="videoForm.processing"
                  >
                    {{ trans("words.upload") }}
                  </button>
                </section>
                <p
                  v-if="videoForm.errors.video"
                  class="text-sm bg-red-600 rounded-md my-1 px-2 py-1"
                >
                  {{ videoForm.errors.video }}
                </p>
                <progress
                  v-if="videoForm.progress"
                  :value="videoForm.progress.percentage"
                  max="100"
                >
                  {{ videoForm.progress.percentage }}%
                </progress>
                <Transition
                  enter-from-class="opacity-0"
                  leave-to-class="opacity-0"
                  class="transition ease-in-out"
                >
                  <p v-if="videoForm.recentlySuccessful" class="text-sm">
                    {{ trans("words.uploaded") }}
                  </p>
                </Transition>
              </form>
            </template>
            <section v-if="form.video" class="flex justify-center h-[40vh]">
              <video class="max-w-full" controls>
                <source :src="form.video" />
              </video>
            </section>
          </template>
        </ResuableModal>
      </Teleport>
      <section
        class="flex items-center justify-between p-4 my-2 rounded-lg bg-slate-300"
        v-for="question in questions"
        :key="question.id"
      >
        <p>{{ trans("words.question") }}: {{ question.content }}</p>
        <section class="flex gap-2 items-center">
          <button class="btn btn-primary" @click="edit(question.id)">
            {{ trans("words.edit") }}
          </button>
          <button class="btn btn-danger" @click="destroy(question.id)">
            {{ trans("words.delete") }}
          </button>
        </section>
      </section>
    </template>
  </AuthLayout>
</template>

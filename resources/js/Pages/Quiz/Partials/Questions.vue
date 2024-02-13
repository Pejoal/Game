<script setup>
import { Link, useForm, usePage } from "@inertiajs/vue3";
import ResuableModal from "@/Components/ResuableModal.vue";
import Toast from "@/Components/Toast.vue";
import { ref } from "vue";
import { trans } from "laravel-vue-i18n";
import QuestionLocales from "./QuestionLocales.vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  questions_count: {
    type: Number,
    default: 999,
  },
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
  ...formData,
  answers: [],
  photo: null,
  video: null,
  type: props.type,
});

const showModal = ref(false);
let showToast = ref(false);

const open_question_modal = (type) => {
  showModal.value = true;
  if (type === "math") {
    form.answers = [{ is_correct: true }];
    locales.forEach((lang) => {
      form.answers[0][lang] = {
        content: "",
      };
    });
  } else {
    form.answers = [
      { is_correct: false },
      { is_correct: false },
      { is_correct: false },
      { is_correct: false },
    ];

    form.answers.forEach((answer, index) => {
      locales.forEach((lang) => {
        form.answers[index][lang] = {
          content: "",
        };
      });
    });
  }
};

const saveQuestion = () => {
  form.post(route("question.store"), {
    onSuccess: () => {
      showToast.value = true;
      showModal.value = false;
      form.reset("content", "answers", "photo", "video", "type");
    },
  });
};

const active_locale = (newLocale) => {
  locale.value = newLocale;
};
</script>
<template>
  <section class="bg-slate-300 rounded-lg p-2">
    <h3 class="text-center text-lg font-bold mt-2 mb-3">
      {{ trans(`words.${type}_questions`) }}
    </h3>
    <Teleport to="#toasts">
      <Toast
        :show="showToast"
        :type="'success'"
        @close="showToast = false"
        :message="trans('words.question_added')"
      />
    </Teleport>
    <Teleport to="#modal">
      <ResuableModal
        :classes="['w-[90%] md:w-[85%] lg:w-[80%] h-[60%]']"
        :header="trans('words.add_question')"
        :show="showModal"
        @close="showModal = false"
      >
        <template #content>
          <h3 class="w-full text-center font-bold text-xl">
            {{ trans(`words.${type}_questions`) }}
          </h3>
          <form @submit.prevent="saveQuestion">
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
            </section>
            <p v-if="form.errors.content" class="error">
              {{ form.errors.content }}
            </p>

            <template v-if="props.type === 'photo'">
              <section class="flex justify-between flex-col sm:flex-row">
                <div class="my-2">
                  <label class="p-2" for="photo">
                    {{ trans("words.photo") }}
                  </label>
                  <input
                    id="photo"
                    type="file"
                    @input="form.photo = $event.target.files[0]"
                  />
                </div>
              </section>
              <p v-if="form.errors.photo" class="error">
                {{ form.errors.photo }}
              </p>
              <progress
                v-if="form.progress"
                :value="form.progress.percentage"
                max="100"
              >
                {{ form.progress.percentage }}%
              </progress>
              <Transition
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
                class="transition ease-in-out"
              >
                <p v-if="form.recentlySuccessful" class="text-sm">
                  {{ trans("words.uploaded") }}
                </p>
              </Transition>
            </template>

            <template v-if="props.type === 'video'">
              <section class="flex justify-between flex-col sm:flex-row">
                <div class="my-2">
                  <label class="p-2" for="video">
                    {{ trans("words.video") }}
                  </label>
                  <input
                    id="video"
                    type="file"
                    @input="form.video = $event.target.files[0]"
                  />
                </div>
              </section>
              <p v-if="form.errors.video" class="error">
                {{ form.errors.video }}
              </p>
              <progress
                v-if="form.progress"
                :value="form.progress.percentage"
                max="100"
              >
                {{ form.progress.percentage }}%
              </progress>
              <Transition
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
                class="transition ease-in-out"
              >
                <p v-if="form.recentlySuccessful" class="text-sm">
                  {{ trans("words.uploaded") }}
                </p>
              </Transition>
            </template>

            <section class="p-2">
              <label>{{ trans("words.answers") }}:</label>
              <section
                v-for="(answer, index) in form.answers"
                :key="index"
                class="flex items-center gap-2 p-2"
              >
                <label :for="'answer' + index" class="w-3/4">
                  <input
                    type="text"
                    v-model="form.answers[index][locale].content"
                    class="block w-full rounded-md"
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
              {{ trans("words.add_question") }}
            </button>
          </form>
        </template>
      </ResuableModal>
    </Teleport>
    <section class="flex items-center justify-between">
      <p>{{ questions_count }} {{ trans("words.questions") }}</p>
      <section class="flex gap-2">
        <Link
          class="btn btn-primary"
          :href="route('questions.showByType', type)"
        >
          {{ trans("words.show_questions") }}
        </Link>
        <button class="btn btn-primary" @click="open_question_modal(type)">
          {{ trans("words.add_question") }}
        </button>
      </section>
    </section>
  </section>
</template>

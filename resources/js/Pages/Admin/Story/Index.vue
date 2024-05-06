<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import ResuableModal from "@/Components/ResuableModal.vue";
import { Teleport } from "vue";
import { ref } from "vue";
import TextInput from "@/Components/TextInput.vue";
import { Transition } from "vue";
import InputError from "@/Components/InputError.vue";

const props = defineProps({
  stories: {
    type: Array,
    default: [],
  },
});

const form = useForm({
  id: null,
  name: "",
  description: "",
  pdf: null,
});
let showModal = ref(false);
let nameInput = ref(null);
let descriptionInput = ref(null);
let pdfInput = ref(null);

const store = () => {
  form.post(route("story.store"), {
    onSuccess: () => {
      setTimeout(() => {
        showModal.value = false;
      }, 1000);
      form.reset();
    },
    onError: () => {
      if (form.errors.name) {
        nameInput.value.focus();
      }
      if (form.errors.description) {
        descriptionInput.value.focus();
      }
    },
  });
};

const openCreateModal = (id) => {
  form.id = null;
  form.name = "";
  form.description = "";
  showModal.value = true;
};

const edit = (id) => {
  showModal.value = true;
  const foundStroy = props.stories.find((story) => story.id === id);
  form.id = foundStroy.id;
  form.name = foundStroy.name;
  form.description = foundStroy.description;
};

const destroy = (id) => {
  form.post(route("story.delete", id), {});
};

const uploadPDF = () => {
  form.post(route("story.updatePDF", form.id), {
    preserveScroll: true,
  });
};
</script>

<template>
  <Head :title="trans('words.story')" />

  <AuthLayout>
    <h2 class="text-2xl font-bold underline">
      {{ trans("words.stories") }}
    </h2>

    <!-- Create Story -->
    <section class="flex items-center justify-center">
      <button class="btn btn-primary" @click="openCreateModal">
        {{ trans("words.create_story") }}
      </button>
    </section>
    <Teleport to="#modal">
      <ResuableModal
        :classes="['w-[90%] md:w-[85%] lg:w-[80%] h-[80%]']"
        :header="trans('words.create_story')"
        :show="showModal"
        @close="showModal = false"
      >
        <template #content>
          <form @submit.prevent="store" class="px-4 py-2">
            <section>
              {{ trans("words.name") }}

              <TextInput
                id="name"
                ref="nameInput"
                v-model="form.name"
                type="text"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.name')"
              />
              <InputError
                :message="form.errors.name"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <section>
              {{ trans("words.description") }}

              <TextInput
                id="description"
                ref="descriptionInput"
                v-model="form.description"
                type="text"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.description')"
              />
              <InputError
                :message="form.errors.description"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <button class="btn btn-primary" :disabled="form.processing">
              {{ trans("words.save") }}
            </button>
            <Transition
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
              class="transition ease-in-out"
            >
              <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">
                {{ trans("words.saved") }}
              </p>
            </Transition>
          </form>

          <form
            class="p-2 sm:p-4 shadow sm:rounded-lg"
            @submit.prevent="uploadPDF"
          >
            <section class="flex justify-between flex-col sm:flex-row">
              <div class="my-2">
                <label class="pr-2" for="pdf">
                  {{ trans("words.pdf") }}
                </label>
                <input
                  id="pdf"
                  type="file"
                  @input="form.pdf = $event.target.files[0]"
                />
              </div>
              <button
                class="btn btn-success"
                type="submit"
                :disabled="form.processing"
              >
                {{ trans("words.upload") }}
              </button>
            </section>
            <p
              v-if="form.errors.pdf"
              class="text-sm bg-red-600 rounded-md my-1 px-2 py-1"
            >
              {{ form.errors.pdf }}
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
          </form>
        </template>
      </ResuableModal>
    </Teleport>

    <!-- Stories List -->
    <template v-for="story in stories" :key="story.id">
      <section class="m-1 p-2 rounded-lg bg-slate-500">
        <p class="text-lg font-bold text-gray-100">{{ story.name }}</p>
        <p class="indent-2 text-white">{{ story.description }}</p>
        <section class="flex items-center justify-center gap-2">
          <button class="btn btn-success" @click="edit(story.id)">
            {{ trans("words.edit") }}
          </button>
          <button class="btn btn-danger" @click="destroy(story.id)">
            {{ trans("words.delete") }}
          </button>
          <Link :href="route('story.show', story.id)" class="btn btn-info">
            {{ trans("words.details") }}
          </Link>
        </section>
      </section>
    </template>
  </AuthLayout>
</template>

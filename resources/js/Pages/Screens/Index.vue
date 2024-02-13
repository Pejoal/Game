<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import axios from "axios";

const props = defineProps({
  screens: {
    type: Array,
    default: [],
  },
});
const page = usePage().props;

const form = useForm({
  logo: null,
});

function uploadLogo() {
  form.post(route("admin.logo.update"), {
    preserveScroll: true,
  });
}

const save_home = () => {
  axios.post(route("home.store"), {
    content: CKEDITOR.instances.home.getData(),
  });
};

const save_imprint = () => {
  axios.post(route("imprint.store"), {
    content: CKEDITOR.instances.imprint.getData(),
  });
};

const save_data_protection = () => {
  axios.post(route("data-protection.store"), {
    content: CKEDITOR.instances.data_protection.getData(),
  });
};

$(document).ready(function () {
  CKEDITOR.replace("home", {
    language: page.active_locale_code,
    uiColor: "#eeeeee",
  });
  CKEDITOR.replace("imprint", {
    language: page.active_locale_code,
    uiColor: "#eeeeee",
  });
  CKEDITOR.replace("data_protection", {
    language: page.active_locale_code,
    uiColor: "#eeeeee",
  });
});
</script>

<template>
  <Head :title="trans('words.screens')" />

  <AuthLayout>
    <template #left-sidebar> </template>
    <template #content>
      <section class="p-4">
        <header class="flex items-center justify-center">
          <h2 class="text-xl font-bold pb-1 border-b border-b-black">
            {{ trans("words.screens") }}
          </h2>
        </header>

        <form
          class="p-2 sm:p-4 shadow sm:rounded-lg"
          @submit.prevent="uploadLogo"
        >
          <section class="flex justify-between flex-col sm:flex-row">
            <div class="my-2">
              <label class="pr-2" for="logo">
                {{ trans("words.logo") }}
              </label>
              <input
                id="logo"
                type="file"
                @input="form.logo = $event.target.files[0]"
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
            v-if="form.errors.logo"
            class="text-sm bg-red-600 rounded-md my-1 px-2 py-1"
          >
            {{ form.errors.logo }}
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

        <main class="space-y-2 rounded-lg">
          <section class="py-2 border-b border-black">
            <h3 class="text-2xl">{{ trans("words.home") }}</h3>
            <textarea name="home" id="home">
              {{ screens[0].content }}
            </textarea>
            <button @click="save_home" class="btn btn-primary my-2">
              {{ trans("words.save") }}
            </button>
          </section>
          <section class="py-2 border-b border-black">
            <h3 class="text-2xl">{{ trans("words.imprint") }}</h3>
            <textarea name="imprint" id="imprint">
              {{ screens[1].content }}
            </textarea>
            <button @click="save_imprint" class="btn btn-primary my-2">
              {{ trans("words.save") }}
            </button>
          </section>
          <section class="py-2 border-b border-black">
            <h3 class="text-2xl">{{ trans("words.data_protection") }}</h3>
            <textarea name="data_protection" id="data_protection">
              {{ screens[2].content }}
            </textarea>
            <button @click="save_data_protection" class="btn btn-primary my-2">
              {{ trans("words.save") }}
            </button>
          </section>
        </main>
      </section>
    </template>
  </AuthLayout>
</template>
<style>
.cke_contents {
  height: 50rem !important;
}
</style>

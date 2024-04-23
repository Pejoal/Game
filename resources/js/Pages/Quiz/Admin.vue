<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";

defineProps({
  text_questions_count: Number,
  math_questions_count: Number,
  photo_questions_count: Number,
  video_questions_count: Number,
});
</script>

<template>
  <Head>
    <title>{{ trans("words.quiz") }}</title>
  </Head>
  <AuthLayout>
      <main class="p-4 space-y-2">
        Quiz
      </main>
  </AuthLayout>
</template>

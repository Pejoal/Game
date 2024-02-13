<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";

defineProps({
  test_questions_count: Number,
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
    <template #content>
      <section class="p-4 space-y-2">
        Quiz
      </section>
    </template>
  </AuthLayout>
</template>

<script setup>
import Questions from "./Partials/Questions.vue";
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
    <template #content>
      <main class="p-4 space-y-2">
        <Questions :type="'text'" :questions_count="text_questions_count" />
        <Questions :type="'math'" :questions_count="math_questions_count" />
        <Questions :type="'photo'" :questions_count="photo_questions_count" />
        <Questions :type="'video'" :questions_count="video_questions_count" />
      </main>
    </template>
  </AuthLayout>
</template>

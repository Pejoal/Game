<script setup>
import Quiz from "./Partials/Quiz.vue";
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
    <template #left-sidebar> </template>
    <template #content>
      <section class="p-4 space-y-2">
        <Quiz :type="'test'" :questions_count="test_questions_count" />
        <Quiz :type="'text'" :questions_count="text_questions_count" />
        <Quiz :type="'math'" :questions_count="math_questions_count" />
        <Quiz :type="'photo'" :questions_count="photo_questions_count" />
        <Quiz :type="'video'" :questions_count="video_questions_count" />
      </section>
    </template>
  </AuthLayout>
</template>

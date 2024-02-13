<script setup>
import { Link } from "@inertiajs/vue3";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  questions_count: {
    type: Number,
    required: true,
  },
});


</script>
<template>
  <section class="bg-slate-300 rounded-lg p-2">
    <h3 class="text-center text-lg font-bold mt-2 mb-3">
      {{ trans(`words.${type}_questions`) }}
    </h3>

    <section class="flex items-center justify-between">
      <p>{{ questions_count }} {{ trans("words.questions") }}</p>
      <section class="flex gap-2">
        <Link
          class="btn btn-primary"
          :href="route('quiz.quizByType', type)"
        >
          {{ trans("words.start_quiz") }}
        </Link>
      </section>
    </section>
  </section>
</template>

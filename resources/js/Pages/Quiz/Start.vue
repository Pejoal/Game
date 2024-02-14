<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
});

</script>
<template>
  <Head>
    <title>{{ trans("words.quiz") }}</title>
  </Head>
  <AuthLayout>
    <template #content>
      <section class="p-4">
        Start
      </section>
    </template>
  </AuthLayout>
</template>

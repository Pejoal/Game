<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";

let props = defineProps({
  previousDates: {
    type: Object,
    default: {},
  },
  upcomingDates: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <Head :title="trans('words.my_data')" />

  <AuthLayout>
    <section class="p-4">hey</section>
  </AuthLayout>
</template>

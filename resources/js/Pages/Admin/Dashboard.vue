<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";

const props = defineProps({});
</script>

<template>
  <Head :title="trans('words.admin_dashboard')" />

  <AuthLayout>
    <template #content> Dashboard </template>
  </AuthLayout>
</template>

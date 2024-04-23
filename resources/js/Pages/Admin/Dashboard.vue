<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";

const props = defineProps({});
</script>

<template>
  <Head :title="trans('words.dashboard')" />

  <AuthLayout> Dashboard </AuthLayout>
</template>

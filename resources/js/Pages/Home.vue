<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head } from "@inertiajs/vue3";
const props = defineProps({
  screen: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <Head>
    <title>{{ trans("words.home") }}</title>
  </Head>
  <GuestLayout>
    <main v-html="screen.content">
    </main>
  </GuestLayout>
</template>

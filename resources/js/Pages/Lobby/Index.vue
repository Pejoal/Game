<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head } from "@inertiajs/vue3";
import { defineProps } from "vue"; // Import defineProps function

let props = defineProps({
  name: {
    type: String,
    default: "",
  },
  lobbyId: {
    type: Number,
    default: 0,
  },
  messages: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <Head>
    <title>{{ trans("words.home") }}</title>
  </Head>
  <GuestLayout>
    <main class="">Lobbies Index</main>
  </GuestLayout>
</template>

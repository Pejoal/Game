<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head } from "@inertiajs/vue3";
import { defineProps } from "vue"; // Import defineProps function

let props = defineProps({
  name: {
    type: String,
    default: "",
  },
  max_players: {
    type: Number,
    default: 4,
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
    <main class="p-2">
      <header class="text-xl font-bold flex items-center justify-between">
        <h2 class="">
          {{ props.name }}
        </h2>
        <p>
          {{ trans("words.max_players") }}
          :
          {{ props.max_players }}
        </p>
      </header>
    </main>
  </GuestLayout>
</template>

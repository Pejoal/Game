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
  users: {
    type: Array,
    default: [],
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
    <main>
      <header class="p-2 text-xl font-bold flex items-center justify-between">
        <h2 class="">
          {{ props.name }}
        </h2>
        <p>
          {{ trans("words.max_players") }}
          :
          {{ props.max_players }}
        </p>
      </header>

      <section class="my-2 p-2 bg-neutral-300">
        <h3 class="text-lg font-semibold">Joined Users</h3>
        <p
          class="bg-neutral-100 p-2 rounded-lg"
          v-for="user in props.users"
          :key="user.id"
        >
          {{ user.firstname + " " + user.lastname }}
        </p>
      </section>
    </main>
  </GuestLayout>
</template>

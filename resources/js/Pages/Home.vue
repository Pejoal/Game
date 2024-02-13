<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head } from "@inertiajs/vue3";
import { defineProps } from "vue"; // Import defineProps function
import { Link } from "@inertiajs/vue3";

const props = defineProps({
  lobbies: {
    type: Array,
    default: [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 3, name: "C" },
    ],
  },
});
</script>

<template>
  <Head>
    <title>{{ trans("words.home") }}</title>
  </Head>
  <GuestLayout>
    <main class="grid grid-cols-1 md:grid-cols-3">
      <section class="bg-amber-200 p-2">
        <h2 class="text-xl font-bold">Lobbies</h2>
        <section class="flex gap-2" v-for="lobby in lobbies" :key="lobby.id">
          <p class="font-semibold">
            {{ lobby.name }}
          </p>
          <Link :href="route('lobby.join')" class="underline hover:font-bold">
            {{ trans("words.join") }}
          </Link>
        </section>
      </section>
      <section class="col-span-2 bg-indigo-400">Hello Everyone!</section>
    </main>
  </GuestLayout>
</template>

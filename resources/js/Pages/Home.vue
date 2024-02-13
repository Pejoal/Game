<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head } from "@inertiajs/vue3";
import { defineProps } from "vue"; // Import defineProps function

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
    <main class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-10">
      <section class="bg-amber-200 p-2">
        <h2 class="text-xl font-semibold">Lobbies</h2>
        <section>
          <p v-for="lobby in lobbies" :key="lobby.id">
            {{ lobby.name }}
          </p>
          <Link
            :href="route('lobby.join')"
            class="hover:font-bold"
            :class="{
              'text-zinc-700 hover:text-zinc-800': props.dark,
              'underline  font-bold': route().current('profile.edit'),
            }"
          >
            {{ trans("words.settings") }}
          </Link>
        </section>
      </section>
      <section class="">Hello Everyone!</section>
    </main>
  </GuestLayout>
</template>

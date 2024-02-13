<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head } from "@inertiajs/vue3";
import { defineProps } from "vue"; // Import defineProps function
import { Link } from "@inertiajs/vue3";
import ResuableModal from "@/Components/ResuableModal.vue";
import { Teleport } from "vue";
import { ref } from "vue";

let showModal = ref(false);

const props = defineProps({
  lobbies: {
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
    <main class="grid grid-cols-1 md:grid-cols-3">
      <section class="bg-amber-200 p-2">
        <h2 class="text-xl font-bold">Lobbies</h2>
        <section class="flex gap-2" v-for="lobby in lobbies" :key="lobby.id">
          <p class="font-semibold">
            {{ lobby.name }}
          </p>
          <Link
            :href="route('lobby.join', lobby.id)"
            class="underline hover:font-bold"
          >
            {{ trans("words.join") }}
          </Link>
        </section>
        <button class="btn btn-primary" @click="showModal = true">
          Create Lobby
        </button>
        <Teleport to="#modal">
          <ResuableModal
            :classes="['w-[90%] md:w-[85%] lg:w-[80%] h-[80%]']"
            :header="'xxx'"
            :show="showModal"
            @close="showModal = false"
          >
            <template #content> xxx </template>
          </ResuableModal>
        </Teleport>
      </section>
      <section class="col-span-2 bg-indigo-400">Hello Everyone!</section>
    </main>
  </GuestLayout>
</template>

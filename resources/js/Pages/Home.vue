<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, useForm } from "@inertiajs/vue3";
import { defineProps } from "vue"; // Import defineProps function
import { Link } from "@inertiajs/vue3";
import ResuableModal from "@/Components/ResuableModal.vue";
import { Teleport } from "vue";
import { ref } from "vue";
import TextInput from "@/Components/TextInput.vue";
import { Transition } from "vue";
import InputError from "@/Components/InputError.vue";

let showModal = ref(false);

const props = defineProps({
  lobbies: {
    type: Array,
    default: [],
  },
});

const form = useForm({
  name: "",
  max_players: 4,
});

const store = () => {
  form.post(route("lobby.store"), {
    onSuccess: () => {
      showModal.value = false;
      form.reset();
    },
    onError: () => {
      if (form.errors.name) {
        nameInput.value.focus();
      }
      if (form.errors.max_players) {
        max_playersInput.value.focus();
      }
    },
  });
};
</script>

<template>
  <Head>
    <title>{{ trans("words.home") }}</title>
  </Head>
  <GuestLayout>
    <main class="grid grid-cols-1 md:grid-cols-3">
      <section class="bg-amber-50 p-2">
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
            :header="'Create Lobby'"
            :show="showModal"
            @close="showModal = false"
          >
            <template #content>
              <form
                @submit.prevent="store"
                class="px-4 py-2"
              >

                <TextInput
                  id="name"
                  ref="nameInput"
                  v-model="form.name"
                  type="text"
                  class="my-2 block w-3/4 text-black rounded-lg"
                  :placeholder="trans('words.name')"
                />
                <InputError
                  :message="form.errors.name"
                  class="my-2 bg-white rounded-md px-2 py-1"
                />

                <TextInput
                  id="max_players"
                  ref="max_playersInput"
                  v-model="form.max_players"
                  type="text"
                  class="my-2 block w-3/4 text-black rounded-lg"
                  :placeholder="trans('words.max_players')"
                />
                <InputError
                  :message="form.errors.max_players"
                  class="my-2 bg-white rounded-md px-2 py-1"
                />

                <button class="btn btn-primary" :disabled="form.processing">
                  {{ trans("words.save") }}
                </button>
                <Transition
                  enter-from-class="opacity-0"
                  leave-to-class="opacity-0"
                  class="transition ease-in-out"
                >
                  <p
                    v-if="form.recentlySuccessful"
                    class="text-sm text-gray-600"
                  >
                    {{ trans("words.created") }}
                  </p>
                </Transition>
              </form>
            </template>
          </ResuableModal>
        </Teleport>
      </section>
      <section class="col-span-2 p-2">Hello Everyone!</section>
    </main>
  </GuestLayout>
</template>

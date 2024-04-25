<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Teleport, defineProps } from "vue"; // Import defineProps function
import Toast from "@/Components/Toast.vue";
import { ref } from "vue";
import { trans } from "laravel-vue-i18n";
import Draggable from "vuedraggable";
import { Head } from "@inertiajs/vue3";
import axios from "axios";

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
  hostId: {
    type: Number,
    default: 0,
  },
  story: {
    type: Object,
    default: {
    },
  },
  cardGroups: {
    type: Array,
    default: [],
  },
});

let showToast = ref(true);

setTimeout(() => {
  showToast.value = false;
}, 4000);

const taskMoved = () => {
  axios.put(route("card.sync"), {
    cardGroups: props.cardGroups,
  });
};
</script>

<template>
  <Head>
    <title>{{ props.name }}</title>
  </Head>
  <AuthLayout>
    <Teleport to="#toasts">
      <Toast
        :show="showToast"
        :type="'success'"
        @close="showToast = false"
        :message="trans('words.game_started')"
      />
    </Teleport>
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

    <main class="relative bg-green-600 h-[90vh] py-12 px-16">
      <section
        class="absolute top-1 left-[50%] transform -translate-x-1/2 flex items-center justify-center flex-col text-white text-sm"
      >
        <p>Player 4</p>
        <span>100</span>
      </section>
      <section
        class="absolute top-[50%] left-1 transform -translate-y-1/2 flex items-center justify-center flex-col text-white text-sm"
      >
        <p>Player 2</p>
        <span>100</span>
      </section>
      <section
        class="absolute top-[50%] right-1 transform -translate-y-1/2 flex items-center justify-center flex-col text-white text-sm"
      >
        <p>Player 3</p>
        <span>100</span>
      </section>
      <section
        class="absolute bottom-1 right-[50%] transform translate-x-1/2 flex items-center justify-center flex-col text-white text-sm"
      >
        <p>Player 1</p>
        <span>100</span>
      </section>

      <section
        class="relative flex overflow-x-auto h-full rounded-lg bg-blue-200"
      >
        <section
          v-for="cardGroup in cardGroups"
          class="p-2 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto"
        >
          <Draggable
            :list="cardGroup.cards"
            group="cards"
            itemKey="id"
            @change="taskMoved"
          >
            <template #item="{ element, index }">
              <div class="bg-slate-700 p-2 my-2 cursor-pointer rounded-lg">
                <p class="block mb-2 text-xl text-gray-100">
                  {{ element.name }}
                </p>
                <span class="text-white truncate">
                  {{ element.description }}
                </span>
              </div>
            </template>
          </Draggable>
        </section>
      </section>
    </main>
  </AuthLayout>
</template>

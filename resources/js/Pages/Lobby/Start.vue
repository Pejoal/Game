<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Teleport, defineProps } from "vue"; // Import defineProps function
import Toast from "@/Components/Toast.vue";
import { ref } from "vue";
import { trans } from "laravel-vue-i18n";
import Draggable from "vuedraggable";
import { Head } from "@inertiajs/vue3";
import axios from "axios";
import { usePage } from "@inertiajs/vue3";

const page = usePage().props;

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
    default: {},
  },
  userCards: {
    type: Object,
    default: {},
  },
  cardGroupIds: {
    type: Array,
    default: [],
  },
});

let showToast = ref(true);

setTimeout(() => {
  showToast.value = false;
}, 3000);

const taskMoved = () => {
  axios.put(route("card.sync"), {
    cardGroups: props.cardGroups,
  });
};

let cards = ref([]);
props.cardGroupIds.forEach((cardGroupId) => {
  cards.value[cardGroupId] = [];
});

const checkMove = (event) => {
  const draggedItem = event.draggedContext.element;
  const targetList = event.relatedContext.list;

  // Check if all items in the target list have the same group_id as the dragged item
  const validMove = targetList.every(
    (item) => item.card_group_id === draggedItem.card_group_id
  );

  if (targetList.length == 0 && draggedItem.order != 1) {
    return false;
  }

  if (validMove && targetList[0]?.order + 1 == draggedItem.order) {
    // order cards[draggedItem.card_group_id] by order
    return true;
  }

  if (targetList[0]?.order && targetList[0]?.order + 1 != draggedItem.order) {
    return false;
  }

  return validMove;
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

    <main class="relative bg-green-600 h-[80vh] py-12 px-16">
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
          v-for="cardGroupId in cardGroupIds"
          class="p-2 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto"
        >
          <Draggable
            :list="cards[cardGroupId]"
            group="cards"
            itemKey="id"
            :move="checkMove"
          >
            <template #item="{ element, index }">
              <div class="bg-slate-700 p-1 my-1 cursor-pointer rounded-lg">
                <p class="block mb-2 text-xl text-gray-100">
                  {{ element?.name }}
                </p>
                <span class="text-white truncate">
                  {{ element?.description }}
                </span>
              </div>
            </template>
          </Draggable>
        </section>
      </section>
    </main>

    <Draggable
      class="flex items-center justify-center gap-1 bg-red-400 px-2 py-1 overflow-x-auto flex-wrap"
      :list="props.userCards[page.auth.user.id]"
      group="cards"
      itemKey="id"
      :move="checkMove"
    >
      <template #item="{ element, index }">
        <div class="bg-slate-700 p-1 my-1 cursor-pointer rounded-lg h-20 w-40">
          <p class="block mb-2 text-xl text-gray-100">
            {{ element.name }}
          </p>
          <span class="text-white truncate">
            {{ element.description }}
          </span>
        </div>
      </template>
    </Draggable>

    <section>
      <p>PDF</p>
      <iframe
        :src="story.pdf"
        width="100%"
        height="600px"
        frameborder="0"
      ></iframe>
    </section>
  </AuthLayout>
</template>

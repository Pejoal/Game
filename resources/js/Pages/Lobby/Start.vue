<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Teleport, defineProps, watch } from "vue"; // Import defineProps function
import Toast from "@/Components/Toast.vue";
import { ref } from "vue";
import { trans } from "laravel-vue-i18n";
import Draggable from "vuedraggable";
import { Head } from "@inertiajs/vue3";
import axios from "axios";
import { usePage } from "@inertiajs/vue3";
import { onMounted, onUnmounted } from "vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getRandomDigits } from "@/utils";

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
  hostName: {
    type: String,
    default: "",
  },
  story: {
    type: Object,
    default: {},
  },
  userCards: {
    type: Object,
    default: {},
  },
  cardGroupTypes: {
    type: Object,
    default: {},
  },
});

let showToast = ref(true);

setTimeout(() => {
  showToast.value = false;
}, 3000);

let cards = ref([]);
Object.values(props.cardGroupTypes).forEach((cardGroupType, key) => {
  cards.value[key] = [];
});

let nextUserId = ref(props.hostId);
let nextUsername = ref(props.hostName);
let wonUsername = ref("");
let users = ref([]);

const checkMove = (event) => {
  if (nextUserId.value != page.auth.user.id) {
    return false;
  }

  const draggedItem = event.draggedContext.element;
  const targetList = event.relatedContext.list;

  // Handle Joker Cards
  if (draggedItem.order == 0 && targetList?.length > 0) {
    return true;
  }

  // Check if all items in the target list have the same group_id as the dragged item
  const validMove = targetList?.every(
    (item) =>
      item.card_group_id === draggedItem.card_group_id || item.order == 0
  );

  if (targetList?.length == 0 && draggedItem.order != 1) {
    return false;
  }

  if (targetList[0]?.order && targetList[0]?.order + 1 != draggedItem.order) {
    return false;
  }

  if (validMove && targetList[0]?.order + 1 == draggedItem.order) {
    return true;
  }

  return validMove;
};

const orderCards = () => {
  cards.value.forEach((cardGroup) => {
    cardGroup?.sort((a, b) => b.order - a.order);
  });
  axios
    .post(route("lobby.turn", props.lobbyId), {
      cards: cards.value,
      users: users.value,
      nextUserId: nextUserId.value,
    })
    .then(() => {});
};

const env = import.meta.env;
let initials = ref([]);
let messages = ref([]);
let echo;

onMounted(() => {
  const pusher = new Pusher(env.VITE_PUSHER_APP_KEY, {
    cluster: env.VITE_PUSHER_APP_CLUSTER,
    encrypted: true,
  });
  echo = new Echo({
    broadcaster: "pusher",
    key: env.VITE_PUSHER_APP_KEY,
    cluster: env.VITE_PUSHER_APP_CLUSTER,
    encrypted: true,
    pusher: pusher,
  });
  echo
    .join(`chat.${props.lobbyId}`)
    .here((data) => {
      initials.value = data.map(function (user) {
        users.value.push(user.id);

        return {
          id: user.id,
          name: user.firstname[0] + user.lastname[0],
          fullname: user.firstname + " " + user.lastname,
        };
      });
    })
    .joining((user) => {
      messages.value.unshift({
        id: getRandomDigits(),
        firstname: user.firstname,
        lastname: user.lastname,
        created_at: new Date().toLocaleTimeString(),
        type: "join",
      });
      initials.value.unshift({
        id: user.id,
        name: user.firstname[0] + user.lastname[0],
        fullname: user.firstname + " " + user.lastname,
      });
    })
    .leaving((user) => {
      messages.value.unshift({
        id: getRandomDigits(),
        firstname: user.firstname,
        lastname: user.lastname,
        created_at: new Date().toLocaleTimeString(),
        type: "leave",
      });
      initials.value = initials.value.filter(function (ini) {
        return ini.id != user.id;
      });
      axios
        .delete(route("lobby.leave", [props.lobbyId, user.id]))
        .then(() => {});
    })
    .listen("LobbyMessageSent", (data) => {
      if (data.user_id != page.auth.user.id) {
        messages.value.unshift({
          id: getRandomDigits(),
          firstname: data.firstname,
          lastname: data.lastname,
          content: data.content,
          created_at: new Date().toLocaleTimeString(),
          type: "content",
        });
      }
    })
    .listen("LobbyTurnChange", (data) => {
      cards.value = data.cards;
      nextUserId.value = data.nextUserId;
      nextUsername.value = data.nextUsername;
    })
    .listen("UserWin", (data) => {
      wonUsername.value = data.wonUsername;
      showloseToast.value = true;
    })
    .error((error) => {
      console.error(error);
    });
});

onUnmounted(() => {
  echo.leaveAllChannels();
});

const pass = () => {
  if (nextUserId.value != page.auth.user.id) {
    alert("Wait for your turn");
    return false;
  }
  const lastItems = cards.value.map((arr) =>
    arr.length > 0 ? arr[arr.length - 1] : null
  );

  for (const item of lastItems) {
    for (const card of props.userCards[page.auth.user.id]) {
      if (
        (card?.order + 1 == item?.order &&
          card?.group_card_id == item?.group_card_id) ||
        (card?.order == 1 && !item) ||
        (card?.order === 0 &&
          cards.value.some((cardArray) => cardArray.length > 0))
      ) {
        alert("Can't pass, you can play");
        return false;
      }
    }
  }

  orderCards();
};

let showWinToast = ref(false);
let showloseToast = ref(false);
watch(props.userCards[page.auth.user.id], (newVal) => {
  if (newVal.length === 0) {
    showWinToast.value = true;
    axios
      .post(route("lobby.win", props.lobbyId), {
        wonUserId: page.auth.user.id,
      })
      .then(() => {});
  }
});
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
    <Teleport to="#toasts">
      <Toast
        :show="showWinToast"
        :type="'success'"
        @close="showWinToast = false"
        :message="trans('words.you_won')"
      />
    </Teleport>
    <Teleport to="#toasts">
      <Toast
        :show="showloseToast"
        :type="'danger'"
        @close="showloseToast = false"
        :message="`${wonUsername} ${trans('words.won')}, ${trans(
          'words.you_lost'
        )}`"
      />
    </Teleport>
    <header class="p-2 text-lg font-bold flex items-center justify-between">
      <h2 class="">
        {{ props.name }}
      </h2>
      <p>
        {{ trans("words.max_players") }}
        :
        {{ props.max_players }}
      </p>
    </header>

    <p class="font-bold px-4 py-2 bg-stone-800 text-white">
      {{ nextUsername }} turn
    </p>
    <main class="relative bg-green-600 h-[70vh] py-12 px-16">
      <section
        class="absolute top-1 left-[50%] transform -translate-x-1/2 flex items-center justify-center flex-col text-white text-sm"
      >
        <p>{{ initials[3]?.fullname }}</p>
        <span>0</span>
      </section>
      <section
        class="absolute top-[50%] left-1 transform -translate-y-1/2 flex items-center justify-center flex-col text-white text-sm"
      >
        <p>{{ initials[1]?.fullname }}</p>

        <span>0</span>
      </section>
      <section
        class="absolute top-[50%] right-1 transform -translate-y-1/2 flex items-center justify-center flex-col text-white text-sm"
      >
        <p>{{ initials[2]?.fullname }}</p>
        <span>0</span>
      </section>
      <section
        class="absolute bottom-1 right-[50%] transform translate-x-1/2 flex items-center justify-center flex-col text-white text-sm"
      >
        <p>{{ initials[0]?.fullname }}</p>
        <span>0</span>
      </section>

      <section
        class="relative flex overflow-x-auto h-full rounded-lg bg-blue-200"
      >
        <section
          v-for="(cardGroupType, key) in Object.values(cardGroupTypes)"
          class="p-1 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto"
        >
          <Draggable
            :list="cards[key]"
            group="cards"
            itemKey="id"
            :move="checkMove"
            @change="orderCards"
          >
            <template #item="{ element, index }">
              <div class="bg-slate-700 p-1 my-1 cursor-pointer rounded-lg">
                <p class="block mb-1 text-lg text-gray-100">
                  {{ element?.name }}
                </p>
                <p class="text-white truncate">
                  {{ element?.description }}
                </p>
                <section class="flex items-center justify-between my-1">
                  <p class="text-gray-200 font-bold">
                    {{ cardGroupTypes[element?.card_group_id] }}
                  </p>
                  <p class="text-gray-200 font-bold">
                    {{ element?.order }}
                  </p>
                </section>
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
      @change="orderCards"
    >
      <template #item="{ element, index }">
        <div class="bg-slate-700 p-1 my-1 cursor-pointer rounded-lg w-40">
          <p class="block mb-1 text-lg text-gray-100">
            {{ element.name }}
          </p>
          <p class="text-white truncate">
            {{ element.description }}
          </p>
          <section class="flex items-center justify-between my-1">
            <p class="text-gray-200 font-bold">
              {{ cardGroupTypes[element?.card_group_id] }}
            </p>
            <p class="text-gray-200 font-bold">
              {{ element?.order }}
            </p>
          </section>
        </div>
      </template>
    </Draggable>

    <section>
      <button @click="pass" class="btn btn-primary w-[80vw] h-8 mx-auto my-2">
        Pass
      </button>
    </section>

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

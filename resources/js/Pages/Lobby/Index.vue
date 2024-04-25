<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import Alert from "@/Components/Alert.vue";
import CreateMessage from "@/Components/CreateMessage.vue";
import Message from "@/Components/Message.vue";
import { Head, Link } from "@inertiajs/vue3";
import { onMounted, onUnmounted } from "vue";
import { ref } from "vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getRandomDigits } from "@/utils";
import { usePage } from "@inertiajs/vue3";
import axios from "axios";
import { getActiveLanguage } from "laravel-vue-i18n";

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
  stories: {
    type: Array,
    default: [],
  },
});

const env = import.meta.env;
let initials = ref([]); // Online Users
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
    .here((users) => {
      // console.log("users here:", users, "#####");
      initials.value = users.map(function (user) {
        return {
          id: user.id,
          name: user.firstname[0] + user.lastname[0],
          fullname: user.firstname + " " + user.lastname,
        };
      });
    })
    .joining((user) => {
      // console.log(user, "Joined the channel", "#####");
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
    .listen("LobbyStarted", (data) => {
      let link = `/${getActiveLanguage()}/lobby/${props.lobbyId}/start`;
      location.href = link;
    })
    .error((error) => {
      console.error(error);
    });
});

onUnmounted(() => {
  echo.leaveAllChannels();
});

const leave = () => {
  location.href = "/";
};

const deleteLobby = () => {
  axios.delete(route("lobby.delete", props.lobbyId)).then(() => {
    location.href = "/";
  });
};

const unshiftMessage = (data) => {
  messages.value.unshift({
    id: getRandomDigits(),
    firstname: data.firstname,
    lastname: data.lastname,
    content: data.content,
    created_at: new Date().toLocaleTimeString(),
    type: "content",
  });
};

let selectedOption = ref(null);
</script>

<template>
  <Head>
    <title>{{ trans("words.home") }}</title>
  </Head>
  <AuthLayout>
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
    <section class="my-1 px-2">
      <label for="select" class="block text-sm font-medium text-gray-700"
        >Story:</label
      >
      <section class="mt-1 relative">
        <select
          id="select"
          v-model="selectedOption"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="" disabled>Select an option</option>
            <option v-for="story in props.stories" :key="story.id" :value="story.id">
              {{ story.name }}
            </option>
        </select>
      </section>
    </section>

    <section
      class="mb-2 bg-zinc-400 px-2 border border-gray-600 rounded-md shadow-lg"
    >
      <section
        class="flex gap-1 m-2 px-2 py-4 border rounded-lg overflow-x-auto"
      >
        <p
          class="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full"
          v-for="initial in initials"
          :key="initial.id"
          v-text="initial.name"
          :title="initial.fullname"
        ></p>
      </section>
      <div
        class="overflow-y-auto h-96 max-h-[75vh] mb-5 px-2 py-4 border border-gray-600 rounded-lg"
      >
        <section v-for="message in messages" :key="message.id">
          <Alert
            v-if="message.type === 'join' || message.type === 'leave'"
            :message="message"
          />
          <Message v-else :message="message" />
        </section>
      </div>
      <CreateMessage
        :lobbyId="props.lobbyId"
        v-on:unshiftMessage="unshiftMessage"
      />
    </section>
    <section class="flex items-center justify-center gap-2 my-2">
      <template v-if="props.hostId === page.auth.user.id">
        <button @click="deleteLobby" class="btn btn-danger">
          Delete Lobby
        </button>
        <Link :href="route('lobby.start', lobbyId)" class="btn btn-primary">
          Start Game
        </Link>
      </template>
      <button @click="leave" class="btn btn-danger">Leave Lobby</button>
    </section>
  </AuthLayout>
</template>

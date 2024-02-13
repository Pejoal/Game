<script setup>
import { ref } from "vue";
import { usePage } from "@inertiajs/vue3";
import axios from "axios";

let props = defineProps({
  lobbyId: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["unshiftMessage"]);
const user = usePage().props.auth.user;
let input = ref(null);
let newMessage = ref("");

async function sendMessage() {
  emit("unshiftMessage", {
    firstname: user.firstname,
    lastname: user.lastname,
    content: newMessage.value,
  });
  try {
    axios.post("/lobby_message", {
      content: newMessage.value,
      lobbyId: props.lobbyId,
    });
  } catch (err) {
    console.log(err);
  }
  newMessage.value = "";
  input.value.focus();
}
</script>
<template>
  <div class="flex items-center mb-5">
    <div class="flex-1 mr-3">
      <input
        name="content"
        type="text"
        class="w-full text-black border-2 border-gray-300 p-2 rounded-md"
        :placeholder="'Type your message here'"
        ref="input"
        v-model="newMessage"
        @keyup.enter="sendMessage"
      />
    </div>
    <button
      @click="sendMessage"
      class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    >
      Send
    </button>
  </div>
</template>

<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import { Teleport, defineProps } from "vue"; // Import defineProps function
import Toast from "@/Components/Toast.vue";
import { ref } from "vue";
import { trans } from "laravel-vue-i18n";


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
  // messages: {
  //   type: Array,
  //   default: [],
  // },
});

let showToast = ref(true);

setTimeout(() => {
  showToast.value = false;
}, 4000);
</script>

<template>
  <Head>
    <title>{{ trans("words.home") }}</title>
  </Head>
  <AuthLayout>
    <main>
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

      <section>
        <h2>Hey</h2>
      </section>
    </main>
  </AuthLayout>
</template>

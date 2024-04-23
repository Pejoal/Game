<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";

const props = defineProps({
  modes: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <Head :title="trans('words.mode')" />

  <AuthLayout>
    <template #content>
      <h2 class="text-2xl font-bold underline">
        {{ trans("words.modes") }}
      </h2>
      <section v-for="mode in modes">
        <p class="text-lg">{{ mode.name }}</p>
        <p class="indent-2">{{ mode.description }}</p>
      </section>
    </template>
  </AuthLayout>
</template>

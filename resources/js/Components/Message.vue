<script setup>
let props = defineProps({
  message: {
    type: Object,
    default: {},
  },
});
</script>
<template>
  <div class="bg-gray-700 py-2 px-4 rounded-lg mb-3">
    <div class="flex justify-between items-center mb-2">
      <h2 class="font-bold text-white">
        {{ message.firstname + " " + message.lastname }}
      </h2>
      <p class="text-gray-400 text-sm">at {{ message.created_at }}</p>
    </div>
    <p class="indent-2 text-gray-200">
      {{ message.content }}
    </p>
  </div>
</template>

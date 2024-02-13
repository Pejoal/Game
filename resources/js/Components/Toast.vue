<script setup>
const props = defineProps({
  show: Boolean,
  message: String | Boolean,
  type: String,
});

const emit = defineEmits(["close"]);

setTimeout(() => {
  emit("close");
}, 7000);
</script>

<template>
  <Transition name="toast">
    <div v-if="props.show" @click.self="$emit('close')">
      <div
        class="toast-container transition-all relative bg-green-500 text-white px-6 py-4 border-0 rounded-lg my-4 z-50"
        :class="[{ 'bg-red-500': props.type == 'danger' }]"
      >
        <span class="text-xl inline-block mr-4 align-middle">
          <i v-if="type == 'success'" class="fa-solid fa-check"></i>
          <i v-if="type == 'danger'" class="fa-solid fa-exclamation"></i>
        </span>
        <span class="inline-block align-middle mr-8">
          {{ props.message }}
        </span>
        <button
          class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
          @click="$emit('close')"
        >
          <span>&times;</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-from .toast-container,
.toast-leave-to .toast-container {
  opacity: 0;
  -webkit-transform: scale(0.1);
  transform: scale(0.1);
}
.toast-leave-from .toast-container,
.toast-enter-to .toast-container {
  opacity: 1;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

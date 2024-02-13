<script setup>
const props = defineProps({
  show: Boolean,
  classes: Array,
  header: String,
});

</script>

<template>
  <Transition name="modal">
    <div v-show="props.show" class="modal-mask" @click.self="$emit('close')">
      <div class="modal-container m-auto bg-white overflow-y-auto transition-all pb-4 rounded-lg" :class="props.classes">
        <slot name="header">
          <div class="flex items-center justify-between px-4 bg-gray-200">
            <h2 class="text-2xl">{{ props.header ? props.header : 'Header'  }}</h2>
            <button class="text-5xl" @click="$emit('close')">&times;</button>
          </div>
        </slot>
        <slot name="content">default body</slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 40;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

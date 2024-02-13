<script setup>
import Appointment from "./Appointment.vue";
import { ref } from "vue";

const props = defineProps({
  appointments: {
    type: Object,
    default: {},
  },
  header: {
    type: String,
    default: "",
  },
});

</script>

<template>
  <section class="p-2 bg-sky-200 rounded-lg space-y-2">
    <h2 class="text-xl font-black">
      {{ trans(`words.${header}`) }}
    </h2>
    <Appointment
      v-for="appointment in props.appointments"
      :appointment="appointment"
      :key="appointment.id"
    />
  </section>
</template>

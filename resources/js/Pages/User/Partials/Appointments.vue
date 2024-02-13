<script setup>
import { ref } from "vue";
import ResuableModal from "@/Components/ResuableModal.vue";
import AppointmentModal from "@/Pages/Admin/Partials/AppointmentModal.vue";
import AppointmentStatus from "@/Components/AppointmentStatus.vue";

const props = defineProps({
  date: {
    type: Object,
    required: true,
    default: {},
  },
});

let showModal = ref(false);
</script>
<template>
  <Teleport to="#modal">
    <ResuableModal
      :classes="['w-[90%] md:w-[85%] lg:w-[80%] h-[80%]']"
      :header="trans('words.update_appointment')"
      :show="showModal"
      @close="showModal = false"
    >
      <template #content>
        <AppointmentModal :date="date" v-on:save="showModal = false" />
      </template>
    </ResuableModal>
  </Teleport>
  <section
    class="flex items-center justify-between my-2 bg-white p-2 rounded-lg"
    @click="showModal = true"
  >
    <p>{{ props.date.date }} {{ trans("words.at") }} {{ props.date.time }}</p>
    <AppointmentStatus :status="props.date.status" />
  </section>
</template>

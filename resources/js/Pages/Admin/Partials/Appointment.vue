<script setup>
import ResuableModal from "@/Components/ResuableModal.vue";
import AppointmentStatus from "@/Components/AppointmentStatus.vue";
import AppointmentModal from "./AppointmentModal.vue";
import { ref } from "vue";

const props = defineProps({
  appointment: {
    type: Object,
    default: {},
  },
});

let showModal = ref(false);
</script>

<template>
  <section

    class="flex items-center justify-between bg-white shadow-lg rounded-lg p-2"
    @click="showModal = true"
  >
    <Teleport to="#modal">
      <ResuableModal
        :classes="['w-[90%] md:w-[85%] lg:w-[80%] h-[80%]']"
        :header="trans('words.update_appointment')"
        :show="showModal"
        @close="showModal = false"
      >
        <template #content>
          <AppointmentModal :date="appointment" v-on:save="showModal = false" />
        </template>
      </ResuableModal>
    </Teleport>
    <section>
      <h3>
        {{ trans("words.requester") }}
        : <strong> {{ appointment.requester }} </strong>
      </h3>
      <p>
        {{ appointment.date }} {{ trans("words.at") }}
        {{ appointment.time }}
      </p>
    </section>
    <AppointmentStatus :status="appointment.status" />
  </section>
</template>

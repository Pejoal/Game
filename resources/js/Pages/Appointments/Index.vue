<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";
import AvailableAppointment from "./Partials/AvailableAppointment.vue";
import { ref } from "vue";
import Toast from "@/Components/Toast.vue";

const props = defineProps({
  appointments: {
    tpye: Array,
    default: [],
  },
});

let showUpdatedToast = ref(false);
const save = () => {
  showUpdatedToast.value = true;
};
</script>

<template>
  <Head>
    <title>{{ trans("words.appointments") }}</title>
  </Head>
  <AuthLayout>
    <template #left-sidebar> </template>
    <template #content>
      <section class="p-4 overflow-x-auto">
        <header class="flex items-center justify-center">
          <h2 class="text-xl font-bold">
            {{ trans("words.available_appointments") }}
          </h2>
        </header>
        <main class="flex gap-4">
          <Teleport to="#toasts">
            <Toast
              :show="showUpdatedToast"
              :type="'success'"
              @close="showUpdatedToast = false"
              :message="trans('words.appointment_confirmed')"
            />
          </Teleport>
          <section v-for="appointment in props.appointments" class="flex-1">
            <h5 class="text-center">
              {{ appointment.date }}
            </h5>
            <h5 class="text-center">
              <b> {{ trans('words.' + appointment.day_name) }}</b>
            </h5>
            <section v-if="!appointment.off">
              <AvailableAppointment
                v-for="time in appointment.business_hours"
                :key="time"
                v-on:save="save"
                :appointment="appointment"
                :time="time"
              />
            </section>
          </section>
        </main>
      </section>
    </template>
  </AuthLayout>
</template>

<script setup>
import Appointments from "./Partials/Appointments.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";

let props = defineProps({
  previousDates: {
    type: Object,
    default: {},
  },
  upcomingDates: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <Head :title="trans('words.my_data')" />

  <AuthLayout>
    <template #left-sidebar> </template>
    <template #content>
      <section class="p-4">
        <header class="flex items-center justify-center mb-2">
          <h2 class="text-xl font-bold pb-1 border-b border-b-black">
            {{ trans("words.my_appointments") }}
          </h2>
        </header>
        <h2 class="text-lg font-bold text-center">
          {{ trans("words.upcoming_appointments") }}
        </h2>
        <template v-if="props.upcomingDates != {}">
          <Appointments
            v-for="date in props.upcomingDates"
            :key="date.id"
            :date="date"
          />
        </template>
        <template v-else>
          <h4 class="text-lg">
            {{ trans("words.there_are_no_upcoming_appointments") }}
          </h4>
        </template>

        <h2 class="text-lg font-bold text-center">
          {{ trans("words.previous_appointments") }}
        </h2>
        <template v-if="props.previousDates != {}">
          <Appointments
            v-for="date in props.previousDates"
            :key="date.id"
            :date="date"
          />
        </template>
        <template v-else>
          <h4 class="text-lg">
            {{ trans("words.there_are_no_previous_appointments") }}
          </h4>
        </template>
      </section>
    </template>
  </AuthLayout>
</template>

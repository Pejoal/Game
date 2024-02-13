<script setup>
import ResuableModal from "@/Components/ResuableModal.vue";
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";

const emits = defineEmits(["save"]);
const props = defineProps({
  appointment: {
    type: Object,
    default: {},
  },
  time: {
    type: String,
    default: "",
  },
});

let showModal = ref(false);

const form = useForm({
  date: "",
  time: "",
  location: "",
  notes: "",
});

const submit = (date, time) => {
  form.date = date;
  form.time = time;
  form.post(route("appointment.reserve"), {
    onSuccess: () => {
      emits("save");
    },
    onFinish: () => form.reset(["date", "time"]),
  });
};
</script>
<template>
  <main class="my-2 flex items-center justify-center">
    <template v-if="!appointment.reserved_hours.includes(time)">
      <button class="btn btn-primary" type="submit" @click="showModal = true">
        {{ time }}
      </button>
      <ResuableModal
        :classes="['w-[90%] md:w-[85%] lg:w-[80%] h-[70%]']"
        :header="'Termin vereinbaren'"
        :show="showModal"
        @close="showModal = false"
      >
        <template #content>
          <form @submit.prevent="submit(appointment['full_date'], time)">
            <header class="flex items-center justify-center">
              <h2
                class="w-[80vw] text-lg font-bold py-3 rounded-lg flex justify-center items-center bg-blue-500"
              >
                {{ appointment["full_date"] }} {{ trans("words.at") }}
                {{ time }}
              </h2>
            </header>
            <section class="flex items-center justify-start my-2">
              <label for="location" class="w-24 px-4">{{
                trans("words.address")
              }}</label>
              <input
                type="text"
                class="block rounded-lg flex-1 px-2 mx-2 h-10"
                name="location"
                id="location"
                :placeholder="trans('words.address')"
                v-model="form.location"
                required
              />
            </section>
            <p class="error" v-if="form.errors.location">
              {{ form.errors.location }}
            </p>
            <section class="flex items-center justify-start my-2">
              <label for="notes" class="w-24 px-4">
                {{ trans("words.notes") }}
              </label>
              <textarea
                class="rounded-lg flex-1 px-2 mx-2 h-40"
                name="notes"
                id="notes"
                :placeholder="trans('words.notes')"
                v-model="form.notes"
              >
              </textarea>
            </section>
            <footer class="flex items-center justify-center">
              <button
                class="btn btn-primary"
                type="submit"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
              >
                {{ trans("words.confirm") }}
              </button>
            </footer>
          </form>
        </template>
      </ResuableModal>
    </template>
    <template v-else>
      <button class="btn btn-secondary" disabled>
        {{ time }}
      </button>
    </template>
  </main>
</template>

<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import ResuableModal from "@/Components/ResuableModal.vue";
import { Teleport } from "vue";
import { ref } from "vue";
import TextInput from "@/Components/TextInput.vue";
import { Transition } from "vue";
import InputError from "@/Components/InputError.vue";

const props = defineProps({
  story: {
    type: Object,
    default: {},
  },
});

const form = useForm({
  name: "",
  description: "",
});
let showModal = ref(false);
let nameInput = ref(null);
let descriptionInput = ref(null);

const store = () => {
  form.post(route("card.group.store", props.story.id), {
    onSuccess: () => {
      setTimeout(() => {
        showModal.value = false;
      }, 1000);
      form.reset();
    },
    onError: () => {
      if (form.errors.name) {
        nameInput.value.focus();
      }
      if (form.errors.description) {
        descriptionInput.value.focus();
      }
    },
  });
};
</script>

<template>
  <Head :title="trans('words.story')" />

  <AuthLayout>
    <h2 class="text-2xl font-bold underline">
      {{ story.name }}
    </h2>

    <!-- Create Card Group -->
    <button class="btn btn-primary" @click="showModal = true">
      {{ trans("words.create_card_group") }}
    </button>
    <Teleport to="#modal">
      <ResuableModal
        :classes="['w-[90%] md:w-[85%] lg:w-[80%] h-[80%]']"
        :header="trans('words.create_card_group')"
        :show="showModal"
        @close="showModal = false"
      >
        <template #content>
          <form @submit.prevent="store" class="px-4 py-2">
            <section>
              {{ trans("words.name") }}

              <TextInput
                id="name"
                ref="nameInput"
                v-model="form.name"
                type="text"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.name')"
              />
              <InputError
                :message="form.errors.name"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <section>
              {{ trans("words.description") }}

              <TextInput
                id="description"
                ref="descriptionInput"
                v-model="form.description"
                type="text"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.description')"
              />
              <InputError
                :message="form.errors.description"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <button class="btn btn-primary" :disabled="form.processing">
              {{ trans("words.save") }}
            </button>
            <Transition
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
              class="transition ease-in-out"
            >
              <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">
                {{ trans("words.created") }}
              </p>
            </Transition>
          </form>
        </template>
      </ResuableModal>
    </Teleport>
  </AuthLayout>
</template>

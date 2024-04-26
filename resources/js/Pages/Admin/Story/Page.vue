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
  cardGroups: {
    type: Array,
    default: [],
  },
});

const form = useForm({
  id: null,
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

const edit = (id) => {
  showModal.value = true;
  const foundCardGroup = props.cardGroups.find((cardGroup) => cardGroup.id === id);
  form.id = foundCardGroup.id;
  form.name = foundCardGroup.name;
  form.description = foundCardGroup.description;
};

const destroy = (id) => {
  form.post(route("card.group.delete", id), {});
};

let showCardModal = ref(false);
let cardGroupId = ref(0);
const handleShowCardModal = (id) => {
  showCardModal.value = true;
  cardGroupId.value = id;
};
const storeCard = () => {
  form.post(route("card.store", cardGroupId.value), {
    onSuccess: () => {
      setTimeout(() => {
        showCardModal.value = false;
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
    <section class="flex items-center justify-center">
      <button class="btn btn-primary" @click="showModal = true">
        {{ trans("words.create_card_group") }}
      </button>
    </section>

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

            <section class="flex items-center justify-center">
              <button class="btn btn-primary" :disabled="form.processing">
                {{ trans("words.save") }}
              </button>
            </section>
            <Transition
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
              class="transition ease-in-out"
            >
              <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">
                {{ trans("words.saved") }}
              </p>
            </Transition>
          </form>
        </template>
      </ResuableModal>
    </Teleport>

    <!-- Card Groups List -->
    <section
      v-for="cardGroup in cardGroups"
      :key="cardGroup.id"
      class="block m-1 p-2 rounded-lg bg-slate-500"
    >
      <p class="text-lg font-bold text-gray-100">{{ cardGroup.name }}</p>
      <p class="indent-2 text-white">{{ cardGroup.description }}</p>

      <!-- Cards List -->
      <section
        v-for="card in cardGroup.cards"
        :key="card.id"
        class="block m-1 p-2 rounded-lg bg-gray-800"
      >
        <p class="text-lg font-bold text-gray-100">{{ card.name }}</p>
        <p class="indent-2 text-white">{{ card.description }}</p>
      </section>

      <!-- Create Card -->
      <section class="flex items-center justify-center gap-2">
        <button
          class="btn btn-primary"
          @click="() => handleShowCardModal(cardGroup.id)"
        >
          {{ trans("words.create_card") }}
        </button>
        <button type="button" class="btn btn-success" @click="edit(cardGroup.id)">
          {{ trans("words.edit") }}
        </button>
        <button type="button" class="btn btn-danger" @click="destroy(cardGroup.id)">
          {{ trans("words.delete") }}
        </button>
      </section>
    </section>
    <Teleport to="#modal">
      <ResuableModal
        :classes="['w-[90%] md:w-[85%] lg:w-[80%] h-[80%]']"
        :header="trans('words.create_card')"
        :show="showCardModal"
        @close="showCardModal = false"
      >
        <template #content>
          <form @submit.prevent="storeCard" class="px-4 py-2">
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

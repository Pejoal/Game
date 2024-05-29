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

const cardGroupForm = useForm({
  id: null,
  name: "",
  description: "",
  type: "",
});
let showModal = ref(false);
let nameInput = ref(null);
let descriptionInput = ref(null);
let typeInput = ref(null);
let orderInput = ref(null);

const openCreateModal = (id) => {
  cardGroupForm.id = null;
  cardGroupForm.name = "";
  cardGroupForm.description = "";
  cardGroupForm.type = "";
  showModal.value = true;
};

const store = () => {
  cardGroupForm.post(route("card.group.store", props.story.id), {
    onSuccess: () => {
      setTimeout(() => {
        showModal.value = false;
      }, 1000);
      cardGroupForm.reset();
    },
    onError: () => {
      if (cardGroupForm.errors.name) {
        nameInput.value.focus();
      }
      if (cardGroupForm.errors.description) {
        descriptionInput.value.focus();
      }
      if (cardGroupForm.errors.type) {
        typeInput.value.focus();
      }
    },
  });
};

const edit = (id) => {
  showModal.value = true;
  const foundCardGroup = props.cardGroups.find(
    (cardGroup) => cardGroup.id === id
  );
  cardGroupForm.id = foundCardGroup.id;
  cardGroupForm.name = foundCardGroup.name;
  cardGroupForm.description = foundCardGroup.description;
  cardGroupForm.type = foundCardGroup.type;
};

const destroy = (id) => {
  cardGroupForm.post(route("card.group.delete", id), {});
};

const cardForm = useForm({
  id: null,
  name: "",
  order: 0,
  description: "",
});

let showCardModal = ref(false);
let cardGroupId = ref(0);

const handleShowCardModal = (id) => {
  showCardModal.value = true;
  cardGroupId.value = id;
  cardForm.id = null;
  cardForm.name = "";
  cardForm.order = 0;
  cardForm.description = "";
};
const storeCard = () => {
  cardForm.post(route("card.store", cardGroupId.value), {
    onSuccess: () => {
      setTimeout(() => {
        showCardModal.value = false;
      }, 1000);
      cardForm.reset();
    },
    onError: () => {
      if (cardForm.errors.name) {
        nameInput.value.focus();
      }
      if (cardForm.errors.description) {
        descriptionInput.value.focus();
      }
      if (cardForm.errors.order) {
        orderInput.value.focus();
      }
    },
  });
};

const editCard = (id, cardGroupId) => {
  showCardModal.value = true;
  const foundCardGroup = props.cardGroups.find(
    (cardGroup) => cardGroup.id === cardGroupId
  );
  const foundCard = foundCardGroup.cards.find((card) => card.id === id);
  cardForm.id = foundCard.id;
  cardForm.name = foundCard.name;
  cardForm.description = foundCard.description;
  cardForm.order = foundCard.order;
};

const destroyCard = (id) => {
  cardForm.post(route("card.delete", id), {});
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
      <button class="btn btn-primary" @click="openCreateModal">
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
                v-model="cardGroupForm.name"
                type="text"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.name')"
              />
              <InputError
                :message="cardGroupForm.errors.name"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <section>
              {{ trans("words.description") }}

              <TextInput
                id="description"
                ref="descriptionInput"
                v-model="cardGroupForm.description"
                type="text"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.description')"
              />
              <InputError
                :message="cardGroupForm.errors.description"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <section>
              {{ trans("words.type") }}

              <TextInput
                id="type"
                ref="typeInput"
                v-model="cardGroupForm.type"
                type="text"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.type')"
              />
              <InputError
                :message="cardGroupForm.errors.type"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <section class="flex items-center justify-center">
              <button class="btn btn-primary" :disabled="cardGroupForm.processing">
                {{ trans("words.save") }}
              </button>
            </section>
            <Transition
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
              class="transition ease-in-out"
            >
              <p v-if="cardGroupForm.recentlySuccessful" class="text-sm text-gray-600">
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

        <section class="flex items-center justify-center gap-2">
          <button
            type="button"
            class="btn btn-success"
            @click="editCard(card.id, cardGroup.id)"
          >
            {{ trans("words.edit") }}
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="destroyCard(card.id)"
          >
            {{ trans("words.delete") }}
          </button>
        </section>
      </section>

      <!-- Card Group Controls -->
      <section class="flex items-center justify-center gap-2">
        <button
          class="btn btn-primary"
          @click="() => handleShowCardModal(cardGroup.id)"
        >
          {{ trans("words.create_card") }}
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="edit(cardGroup.id)"
        >
          {{ trans("words.edit") }}
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="destroy(cardGroup.id)"
        >
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
                v-model="cardForm.name"
                type="text"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.name')"
              />
              <InputError
                :message="cardForm.errors.name"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <section>
              {{ trans("words.description") }}

              <TextInput
                id="description"
                ref="descriptionInput"
                v-model="cardForm.description"
                type="text"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.description')"
              />
              <InputError
                :message="cardForm.errors.description"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <section>
              {{ trans("words.order") }}

              <TextInput
                id="order"
                ref="orderInput"
                v-model="cardForm.order"
                type="number"
                class="my-2 block w-3/4 text-black rounded-lg"
                :placeholder="trans('words.order')"
              />
              <InputError
                :message="cardForm.errors.order"
                class="my-2 bg-white rounded-md px-2 py-1"
              />
            </section>

            <button class="btn btn-primary" :disabled="cardForm.processing">
              {{ trans("words.save") }}
            </button>
            <Transition
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
              class="transition ease-in-out"
            >
              <p v-if="cardForm.recentlySuccessful" class="text-sm text-gray-600">
                {{ trans("words.created") }}
              </p>
            </Transition>
          </form>
        </template>
      </ResuableModal>
    </Teleport>
  </AuthLayout>
</template>

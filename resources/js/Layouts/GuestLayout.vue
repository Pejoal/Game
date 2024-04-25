<script setup>
import Locales from "@/Components/Locales.vue";
import Navigations from "@/Components/Navigations.vue";
import Hamburger from "@/Components/Hamburger.vue";
import Footer from "./Partials/Footer.vue";
import { Link } from "@inertiajs/vue3";

import { ref } from "vue";

const showNav = ref(false);
const toggleNav = () => {
  showNav.value = !showNav.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header
      class="flex items-center justify-between h-20 bg-zinc-400 py-2 px-4 sm:px-6 lg:px-8"
    >
      <section class="flex items-center gap-2">
        <img
          class="rounded-full w-14 h-14 md:w-16 md:h-16"
          v-if="$page?.props?.logo"
          :src="$page?.props?.logo"
          :alt="trans('words.logo')"
        />
        <Link class="font-bold text-xl" :href="route('home')">
          {{ trans("words.game") }}
        </Link>
      </section>
      <Locales :horizontal="true" />

      <Navigations :horizontal="true" />

      <Hamburger class="md:hidden" @close="toggleNav" :show="showNav" />

      <!-- Side Menu  -->
      <transition name="slide">
        <div
          v-if="showNav"
          class="md:hidden bg-slate-200 fixed inset-y-0 left-0 z-40 w-full h-screen shadow-lg px-8 py-4 overflow-y-auto"
        >
          <h2 class="text-xl font-bold mb-2">
            {{ trans("words.navigation") }}
          </h2>
          <!-- Navigation Links -->
          <Navigations class="pb-4" :vertical="true" />

          <!-- Translations -->
          <Locales class="border-t" :vertical="true" />

          <div class="py-2 border-b">
            <Link
              class="btn btn-danger"
              :href="route('logout')"
              method="post"
              as="button"
            >
              {{ trans("words.logout") }}
            </Link>
          </div>
          <!-- Button to close the menu -->
          <button
            @click="showNav = false"
            class="mt-4 px-3 py-1 hover:font-bold rounded-md"
          >
            {{ trans("words.close") }}
          </button>
        </div>
      </transition>
      <!-- Overlay to cover the content when the menu is open -->
      <div
        v-if="showNav"
        class="fixed inset-0 bg-black opacity-25 z-30"
        @click="showNav = false"
      ></div>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>

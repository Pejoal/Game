<script setup>
import { ref } from "vue";
import { Link } from "@inertiajs/vue3";
import Navigations from "@/Components/Navigations.vue";
import Hamburger from "@/Components/Hamburger.vue";
import Locales from "@/Components/Locales.vue";
import Footer from "./Partials/Footer.vue";

const showNav = ref(false);
const toggleNav = () => {
  showNav.value = !showNav.value;
};
</script>
<template>
  <div class="min-h-screen bg-slate-200">
    <header
      class="bg-zinc-400 flex items-center justify-between h-20 py-2 px-4 sm:px-6 lg:px-8"
    >
      <section class="flex items-center gap-2">
        <img
          class="rounded-full w-14 h-14 md:w-16 md:h-16"
          v-if="$page?.props?.auth?.user.profile_photo_url"
          :src="$page?.props?.auth?.user.profile_photo_url"
          :alt="trans('words.profile_photo')"
        />
        <Link class="font-bold text-xl" :href="route('home')">
          {{ $page.props.auth.user.firstname }}
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
    <main class="lg:container lg:mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-10">
        <div class="hidden">
          <slot name="left-sidebar">
            <Link
              class="btn btn-danger"
              :href="route('logout')"
              method="post"
              as="button"
            >
              {{ trans("words.logout") }}
            </Link>
          </slot>
        </div>
        <section class="md:col-span-2">
          <slot name="content" />
        </section>
        <div class="hidden">
          <slot name="right-sidebar" />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<style scoped>
/* Transition styles */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>

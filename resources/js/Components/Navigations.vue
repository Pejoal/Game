<script setup>
import { Link } from "@inertiajs/vue3";

const props = defineProps({
  horizontal: {
    tpye: Boolean,
    default: false,
  },
  vertical: {
    tpye: Boolean,
    default: false,
  },
  dark: {
    tpye: Boolean,
    default: false,
  },
});
</script>
<template>
  <nav
    :class="{
      'hidden md:flex items-center justify-center gap-2': props.horizontal,
      'flex flex-col space-y-2 px-4': props.vertical,
    }"
  >
    <template
      v-if="['admin', 'super admin'].includes($page.props.auth?.user?.type)"
    >
      <Link
        :href="route('admin.dashboard')"
        class="hover:font-bold"
        :class="{
          'text-zinc-700 hover:text-zinc-800': props.dark,
          'underline font-bold': route().current('admin.dashboard'),
        }"
      >
        {{ trans("words.dashboard") }}
      </Link>
      <Link
        :href="route('admin.story')"
        class="hover:font-bold"
        :class="{
          'text-zinc-700 hover:text-zinc-800': props.dark,
          'underline  font-bold': route().current('admin.story'),
        }"
      >
        {{ trans("words.story") }}
      </Link>
    </template>
    <template v-if="$page.props.auth?.user?.type === 'client'">
      <Link
        :href="route('home')"
        class="hover:font-bold"
        :class="{
          'text-zinc-700 hover:text-zinc-800': props.dark,
          'underline  font-bold': route().current('home'),
        }"
      >
        {{ trans("words.home") }}
      </Link>
      <Link
        :href="route('user.profile.me')"
        class="hover:font-bold"
        :class="{
          'text-zinc-700 hover:text-zinc-800': props.dark,
          'underline  font-bold': route().current('user.profile.me'),
        }"
      >
        {{ trans("words.my_data") }}
      </Link>
    </template>
    <Link
      v-if="$page.props.auth.user"
      :href="route('profile.edit')"
      class="hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline  font-bold': route().current('profile.edit'),
      }"
    >
      {{ trans("words.settings") }}
    </Link>
    <Link
      v-else
      :href="route('login')"
      class="hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline  font-bold': route().current('login'),
      }"
    >
      {{ trans("words.login") }}
    </Link>
  </nav>
</template>

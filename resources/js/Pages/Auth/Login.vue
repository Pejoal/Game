<script setup>
import Checkbox from "@/Components/Checkbox.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

defineProps({
  canResetPassword: Boolean,
  status: String,
});

const form = useForm({
  input_type: "",
  password: "",
  remember: false,
});

const submit = () => {
  form.post(route("login"), {
    onFinish: () => form.reset("password"),
  });
};
</script>

<template>
  <GuestLayout>
    <Head title="Login" />
    <main class="grid place-items-center">
      <section class="p-8 my-4 bg-zinc-300 w-full rounded-lg md:container">
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
          {{ status }}
        </div>

        <Link
          :href="route('register')"
          class="underline float-right text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ trans("words.register") }}
        </Link>
        <form @submit.prevent="submit">
          <div>
            <InputLabel
              for="input_type"
              :value="trans('words.email_username')"
            />

            <TextInput
              id="input_type"
              type="text"
              class="mt-1 block w-full"
              v-model="form.input_type"
              autofocus
              autocomplete="username"
              required
            />

            <InputError class="mt-2" :message="form.errors.username" />
            <InputError class="mt-2" :message="form.errors.email" />
          </div>

          <div class="mt-4">
            <InputLabel for="password" :value="trans('words.password')" />

            <TextInput
              id="password"
              type="password"
              class="mt-1 block w-full"
              v-model="form.password"
              required
              autocomplete="current-password"
            />

            <InputError class="mt-2" :message="form.errors.password" />
          </div>

          <div class="block mt-4">
            <label class="flex items-center">
              <Checkbox name="remember" v-model:checked="form.remember" />
              <span class="ml-2 text-sm">
                {{ trans("words.remember_me") }}
              </span>
            </label>
          </div>

          <div class="flex items-center justify-end mt-4">
            <Link
              v-if="canResetPassword"
              :href="route('password.request')"
              class="underline text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ trans("words.forgot_your_password") }}
            </Link>

            <button
              class="ml-4 btn btn-primary"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
            >
              {{ trans("words.login") }}
            </button>
          </div>
        </form>
      </section>
    </main>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, useForm } from "@inertiajs/vue3";

const form = useForm({
  password: "",
});

const submit = () => {
  form.post(route("password.confirm"), {
    onFinish: () => form.reset(),
  });
};
</script>

<template>
  <GuestLayout>
    <Head title="Confirm Password" />

    <div class="mb-4 text-sm">
      {{ trans('words.this_is_a_secure_area_of_the_application_please_confirm_your_password_before_continuing') }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <InputLabel for="password" :value="trans('words.password')" />
        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="current-password"
          autofocus
        />
        <InputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="flex justify-end mt-4">
        <button
          class="ml-4 btn btn-success"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          {{ trans('words.confirm') }}
        </button>
      </div>
    </form>
  </GuestLayout>
</template>

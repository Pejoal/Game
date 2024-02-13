<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, useForm } from "@inertiajs/vue3";

defineProps({
  status: String,
});

const form = useForm({
  input_type: "",
});

const submit = () => {
  form.post(route("password.email"));
};
</script>

<template>
  <GuestLayout>
    <Head title="Forgot Password" />
    <main class="grid place-items-center">
      <div class="my-2 w-[85%]">
        {{
          trans(
            "words.forgot_your_password_no_problem_just_let_us_know_your_email_address_and_we_will_email_you_a_password_reset_link_that_will_allow_you_to_choose_a_new_one"
          )
        }}
      </div>  

      <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
        {{ status }}
      </div>

      <form @submit.prevent="submit" class="w-[90vw]">
        <div>
          <InputLabel for="input_type" :value="trans('words.email_username')" />

          <TextInput
            id="input_type"
            type="text"
            class="mt-1 block w-full"
            v-model="form.input_type"
            required
            autofocus
            autocomplete="username"
          />

          <InputError class="mt-2" :message="form.errors.username" />
          <InputError class="mt-2" :message="form.errors.email" />
        </div>

        <div class="flex items-center justify-end mt-4">
          <button
            class="btn btn-success"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
          >
            {{ trans("words.email_password_reset_link") }}
          </button>
        </div>
      </form>
    </main>
  </GuestLayout>
</template>

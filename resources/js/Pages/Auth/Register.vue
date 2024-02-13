<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const form = useForm({
  firstname: "",
  lastname: "",
  username: "",
  gender: "",
  email: "",
  password: "",
  password_confirmation: "",
  profile_photo: null,
  // terms: false,
});

const submit = () => {
  form.post(route("register"), {
    preserveScroll: true,
    onFinish: () => form.reset("password", "password_confirmation"),
  });
};
</script>

<template>
  <GuestLayout>
    <Head title="Register" />
    <main class="grid place-items-center">
      <form
        @submit.prevent="submit"
        class="bg-zinc-300 w-full mt-2 mb-4 rounded-lg md:container px-8 py-4 flex flex-col gap-2"
      >
        <div>
          <InputLabel for="firstname" :value="trans('words.firstname')" />

          <TextInput
            id="firstname"
            type="text"
            class="mt-1 block w-full"
            v-model="form.firstname"
            :placeholder="trans('words.firstname')"
            required
            autocomplete="firstname"
            autofocus
          />

          <InputError class="mt-2" :message="form.errors.firstname" />
        </div>

        <div>
          <InputLabel for="lastname" :value="trans('words.lastname')" />

          <TextInput
            id="lastname"
            type="text"
            class="mt-1 block w-full"
            v-model="form.lastname"
            :placeholder="trans('words.lastname')"
            autocomplete="lasstname"
            required
          />

          <InputError class="mt-2" :message="form.errors.lastname" />
        </div>
        <div>
          <InputLabel for="username" :value="trans('words.username')" />

          <TextInput
            id="username"
            type="text"
            class="mt-1 block w-full"
            v-model="form.username"
            :placeholder="trans('words.username')"
            autocomplete="username"
            required
          />

          <InputError class="mt-2" :message="form.errors.username" />
        </div>
        <div>
          <InputLabel :value="trans('words.gender')" />
          <div class="flex justify-center gap-12">
            <section>
              <input
                type="radio"
                id="male"
                value="male"
                v-model="form.gender"
                autocomplete="gender"
              />
              <label class="ml-2" for="male">{{ trans("words.male") }}</label>
            </section>
            <section>
              <input
                type="radio"
                id="female"
                value="female"
                v-model="form.gender"
                autocomplete="gender"
              />
              <label class="ml-2" for="female">
                {{ trans("words.female") }}
              </label>
            </section>
          </div>
          <InputError class="mt-2" :message="form.errors.gender" />
        </div>

        <div class="mt-4">
          <InputLabel for="email" :value="trans('words.email')" />

          <TextInput
            id="email"
            type="email"
            class="mt-1 block w-full"
            v-model="form.email"
            :placeholder="trans('words.email')"
            autocomplete="email"
            required
          />

          <InputError class="mt-2" :message="form.errors.email" />
        </div>

        <div class="mt-4">
          <InputLabel for="password" :value="trans('words.password')" />

          <TextInput
            id="password"
            type="password"
            class="mt-1 block w-full"
            v-model="form.password"
            :placeholder="trans('words.password')"
            required
            autocomplete="new-password"
          />

          <InputError class="mt-2" :message="form.errors.password" />
        </div>

        <div class="mt-4">
          <InputLabel
            for="password_confirmation"
            :value="trans('words.confirm_password')"
          />

          <TextInput
            id="password_confirmation"
            type="password"
            class="mt-1 block w-full"
            v-model="form.password_confirmation"
            :placeholder="trans('words.confirm_password')"
            required
            autocomplete="new-password"
          />

          <InputError
            class="mt-2"
            :message="form.errors.password_confirmation"
          />
        </div>

        <section class="flex justify-between flex-col sm:flex-row">
          <div class="my-2">
            <label class="pr-2" for="profile_photo">
              {{ trans("words.profile_photo") }}
            </label>
            <input
              id="profile_photo"
              type="file"
              @input="form.profile_photo = $event.target.files[0]"
            />
          </div>
        </section>
        <p
          v-if="form.errors.profile_photo"
          class="text-sm bg-red-600 rounded-md my-1 px-2 py-1"
        >
          {{ form.errors.profile_photo }}
        </p>
        <progress
          v-if="form.progress"
          :value="form.progress.percentage"
          max="100"
        >
          {{ form.progress.percentage }}%
        </progress>
        <Transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          class="transition ease-in-out"
        >
          <p v-if="form.recentlySuccessful" class="text-sm">
            {{ trans("words.uploaded") }}
          </p>
        </Transition>

        <div class="flex items-center justify-end mt-2">
          <Link
            :href="route('login')"
            class="underline text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ trans("words.already_registered") }}
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
    </main>
  </GuestLayout>
</template>

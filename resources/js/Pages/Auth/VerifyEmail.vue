<script setup>
import { computed } from "vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const props = defineProps({
  status: String,
});

const form = useForm({});

const submit = () => {
  form.post(route("verification.send"));
};

const verificationLinkSent = computed(
  () => props.status === "verification-link-sent"
);
</script>

<template>
  <GuestLayout>
    <Head title="Email Verification" />

    <div class="my-2">
      {{
        trans(
          "words.thanks_for_signing_up_before_getting_started_could_you_verify_your_email_address_by_clicking_on_the_link_we_just_emailed_to_you_If_you_didnt_receive_the_email_we_will_gladly_send_you_another"
        )
      }}
    </div>

    <div
      class="my-2 font-medium text-sm text-green-700"
      v-if="verificationLinkSent"
    >
      {{
        trans(
          "words.a_new_verification_link_has_been_sent_to_the_email_address_you_provided_during_registration"
        )
      }}
    </div>

    <form @submit.prevent="submit">
      <div class="mt-4 flex items-center justify-between">
        <button
          class="btn btn-primary"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          {{ trans("words.resend_verification_email") }}
        </button>

        <Link
          :href="route('logout')"
          method="post"
          as="button"
          class="underline text-white ml-3 bg-red-600 px-2 py-1 rounded-md"
          >
          {{ trans("words.logout") }}
          </Link
        >
      </div>
    </form>
  </GuestLayout>
</template>

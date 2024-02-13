<script setup>
import { useForm } from "@inertiajs/vue3";
import AppointmentStatus from "@/Components/AppointmentStatus.vue";

const emits = defineEmits(["save"]);

const props = defineProps({
  date: {
    type: Object,
    default: {},
    required: true,
  },
});

const form = useForm({
  location: props.date.location,
  notes: props.date.notes,
});

const update = () => {
  form.put(route("appointment.update", [props.date.id]), {
    onSuccess: () => {
      emits("save");
    },
    onFinish: () => form.reset(["locations", "notes"]),
  });
};

const cancel = () => {
  form.delete(route("appointment.cancel", [props.date.id]), {
    onSuccess: () => {
      emits("save");
    },
    onFinish: () => form.reset(["locations", "notes"]),
  });
};

const approve = () => {
  form.put(route("appointment.approve", [props.date.id]), {
    onSuccess: () => {
      emits("save");
    },
    onFinish: () => form.reset(["locations", "notes"]),
  });
};

const decline = () => {
  form.put(route("appointment.decline", [props.date.id]), {
    onSuccess: () => {
      emits("save");
    },
    onFinish: () => form.reset(["locations", "notes"]),
  });
};

const delete_appointment = () => {
  form.delete(route("appointment.delete", [props.date.id]), {
    onSuccess: () => {
      emits("save");
    },
    onFinish: () => form.reset(["locations", "notes"]),
  });
};
</script>

<template>
  <main class="my-2 bg-zinc-300 mx-2 p-3 rounded-lg">
    <section class="flex items-center justify-between">
      <p>{{ props.date.date }} {{ trans("words.at") }} {{ props.date.time }}</p>
      <AppointmentStatus :status="props.date.status" />
    </section>
    <form @submit.prevent="update">
      <section class="flex items-center my-2">
        <label for="location" class="w-24 px-4">
          {{ trans("words.address") }}
        </label>
        <input
          type="text"
          class="block rounded-lg flex-1 px-2 mx-2 h-10"
          name="location"
          id="location"
          :placeholder="trans('words.address')"
          v-model="form.location"
          required
        />
      </section>
      <section class="flex items-center my-2">
        <label for="notes" class="w-24 px-4">
          {{ trans("words.notes") }}
        </label>
        <textarea
          class="rounded-lg flex-1 px-2 mx-2 h-40"
          name="notes"
          id="notes"
          :placeholder="trans('words.notes')"
          v-model="form.notes"
        >
        </textarea>
      </section>
      <footer class="flex items-center justify-center gap-3 flex-wrap">
        <button type="submit" class="btn btn-primary">
          {{ trans("words.update_appointment") }}
        </button>
        <button
          v-if="
            $page.props.auth.user.type === 'client' &&
            props.date.more_than_24_hours
          "
          type="button"
          class="btn btn-warning"
          @click="cancel"
        >
          {{ trans("words.cancel_appointment") }}
        </button>
        <template
          v-if="
            ['super admin', 'admin'].includes($page.props.auth.user.type) &&
            (props.date.more_than_24_hours || $props.date.status === 'pending')
          "
        >
          <button type="button" class="btn btn-success" @click="approve">
            {{ trans("words.approve_appointment") }}
          </button>
          <button type="button" class="btn btn-danger" @click="decline">
            {{ trans("words.decline_appointment") }}
          </button>
        </template>
        <button
          v-if="
            ['super admin', 'admin'].includes($page.props.auth.user.type) ||
            props.date.more_than_24_hours
          "
          type="button"
          class="btn btn-danger"
          @click="delete_appointment"
        >
          {{ trans("words.delete_appointment") }}
        </button>
      </footer>
    </form>
  </main>
</template>

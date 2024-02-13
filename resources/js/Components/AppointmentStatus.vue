<script setup>
defineProps({
  status: String,
});
</script>
<template>
  <section v-if="status == 'pending'" class="btn btn-info">
      {{ trans("words.pending") }}
    </section>
    <section
      v-else-if="status == 'approved'"
      class="btn btn-success"
    >
      {{ trans("words.approved") }}
    </section>
    <section
      v-else-if="status == 'cancelled'"
      class="btn btn-warning"
    >
      {{ trans("words.cancelled") }}
    </section>
    <section v-else-if="status == 'declined'" class="btn btn-danger">
      {{ trans("words.declined") }}
    </section>
</template>

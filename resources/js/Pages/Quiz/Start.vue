<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
});

const mathAnswer = ref("");
const result = ref(0);
const currentIndex = ref(0);
const userAnswers = ref([]);
const selectedAnswerIds = ref({
  answer_ids: [],
  math: { content: "", answer_id: 0 },
});

const setMathAnswer = (answer_id) => {
  selectedAnswerIds.value.math = {
    content: mathAnswer.value,
    answer_id: answer_id,
  };
};

const setSelectedAnswerIds = (selectedAnswerId) => {
  const index = selectedAnswerIds.value.answer_ids.indexOf(selectedAnswerId);
  if (index === -1) {
    selectedAnswerIds.value.answer_ids.push(selectedAnswerId);
  } else {
    selectedAnswerIds.value.answer_ids.splice(index, 1);
  }
};
const moveToNextQuestion = () => {
  // userAnswers.value.push({
  // question_id: props.questions[currentIndex.value].id,
  //   answer_id: selectedAnswerId,
  // });
  mathAnswer.value = "";
  userAnswers.value.push(selectedAnswerIds.value);
  selectedAnswerIds.value = {
    answer_ids: [],
    math: { content: "", answer_id: 0 },
  };
  // console.log(userAnswers.value);
  currentIndex.value++;
  if (currentIndex.value > props.questions.length - 1) {
    submitAnswers(userAnswers.value);
  }
};

const submitAnswers = (answers) => {
  axios.post(route("quiz.submitAnswers"), answers).then((response) => {
    result.value = response.data;
  });
};
</script>
<template>
  <Head>
    <title>{{ trans("words.quiz") }}</title>
  </Head>
  <AuthLayout>
    <template #content>
      <section class="p-4">
        Start
      </section>
    </template>
  </AuthLayout>
</template>

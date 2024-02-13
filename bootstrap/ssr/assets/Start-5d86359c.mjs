import { ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, withDirectives, vModelText, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-1cd28b10.mjs";
import { Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import "./Footer-11875b49.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "Start",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: true
    },
    questions: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const mathAnswer = ref("");
    const result = ref(0);
    const currentIndex = ref(0);
    const userAnswers = ref([]);
    const selectedAnswerIds = ref({
      answer_ids: [],
      math: { content: "", answer_id: 0 }
    });
    const setMathAnswer = (answer_id) => {
      selectedAnswerIds.value.math = {
        content: mathAnswer.value,
        answer_id
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
      mathAnswer.value = "";
      userAnswers.value.push(selectedAnswerIds.value);
      selectedAnswerIds.value = {
        answer_ids: [],
        math: { content: "", answer_id: 0 }
      };
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.trans("words.quiz"))}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.trans("words.quiz")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        "left-sidebar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2)
            ;
          else {
            return [];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="p-4"${_scopeId}>`);
            if (currentIndex.value < __props.questions.length) {
              _push2(`<div${_scopeId}><h2 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(_ctx.trans("words.question"))} ${ssrInterpolate(currentIndex.value + 1)}</h2><h3 class="text-xl font-semibold p-2"${_scopeId}>${ssrInterpolate(__props.questions[currentIndex.value].content)}</h3>`);
              if (__props.questions[currentIndex.value].type !== "math") {
                _push2(`<ul class="p-2 space-y-2"${_scopeId}><!--[-->`);
                ssrRenderList(__props.questions[currentIndex.value].answers, (answer) => {
                  _push2(`<li${_scopeId}><label${_scopeId}><input type="checkbox"${ssrRenderAttr("name", "question_" + __props.questions[currentIndex.value].id)}${ssrRenderAttr("value", answer.id)}${_scopeId}> ${ssrInterpolate(answer.content)}</label></li>`);
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<section class="p-2"${_scopeId}><input type="number"${ssrRenderAttr("value", mathAnswer.value)}${_scopeId}></section>`);
              }
              _push2(`<button class="btn btn-primary"${_scopeId}>${ssrInterpolate(_ctx.trans("words.confirm"))}</button>`);
              if ((props.type === "photo" || props.type === "test") && __props.questions[currentIndex.value].photo) {
                _push2(`<section class="border flex justify-center h-[50vh]"${_scopeId}>`);
                if (__props.questions[currentIndex.value].photo) {
                  _push2(`<img class="max-h-full"${ssrRenderAttr("src", __props.questions[currentIndex.value].photo)}${ssrRenderAttr("alt", _ctx.trans("words.photo"))}${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</section>`);
              } else {
                _push2(`<!---->`);
              }
              if ((props.type === "video" || props.type === "test") && __props.questions[currentIndex.value].video) {
                _push2(`<section class="flex justify-center h-[50vh]"${_scopeId}><!--[-->`);
                ssrRenderList(__props.questions, (question, key) => {
                  _push2(`<!--[-->`);
                  if (key == currentIndex.value) {
                    _push2(`<video class="max-w-full" controls${_scopeId}><source${ssrRenderAttr("src", __props.questions[key].video)}${_scopeId}></video>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]--></section>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="flex items-center justify-center flex-col"${_scopeId}><h2 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(result.value)} / ${ssrInterpolate(__props.questions.length)}</h2>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("home"),
                class: "btn btn-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.trans("words.congratulations_youve_answered_all_questions"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.trans("words.congratulations_youve_answered_all_questions")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</section>`);
          } else {
            return [
              createVNode("section", { class: "p-4" }, [
                currentIndex.value < __props.questions.length ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("h2", { class: "text-2xl font-bold" }, toDisplayString(_ctx.trans("words.question")) + " " + toDisplayString(currentIndex.value + 1), 1),
                  createVNode("h3", { class: "text-xl font-semibold p-2" }, toDisplayString(__props.questions[currentIndex.value].content), 1),
                  __props.questions[currentIndex.value].type !== "math" ? (openBlock(), createBlock("ul", {
                    key: 0,
                    class: "p-2 space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.questions[currentIndex.value].answers, (answer) => {
                      return openBlock(), createBlock("li", {
                        key: answer.id
                      }, [
                        createVNode("label", null, [
                          createVNode("input", {
                            type: "checkbox",
                            name: "question_" + __props.questions[currentIndex.value].id,
                            value: answer.id,
                            onChange: ($event) => setSelectedAnswerIds(answer.id)
                          }, null, 40, ["name", "value", "onChange"]),
                          createTextVNode(" " + toDisplayString(answer.content), 1)
                        ])
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("section", {
                    key: 1,
                    class: "p-2"
                  }, [
                    withDirectives(createVNode("input", {
                      type: "number",
                      "onUpdate:modelValue": ($event) => mathAnswer.value = $event,
                      onChange: (event) => setMathAnswer(__props.questions[currentIndex.value].answers[0].id)
                    }, null, 40, ["onUpdate:modelValue", "onChange"]), [
                      [vModelText, mathAnswer.value]
                    ])
                  ])),
                  createVNode("button", {
                    onClick: moveToNextQuestion,
                    class: "btn btn-primary"
                  }, toDisplayString(_ctx.trans("words.confirm")), 1),
                  (props.type === "photo" || props.type === "test") && __props.questions[currentIndex.value].photo ? (openBlock(), createBlock("section", {
                    key: 2,
                    class: "border flex justify-center h-[50vh]"
                  }, [
                    __props.questions[currentIndex.value].photo ? (openBlock(), createBlock("img", {
                      key: 0,
                      class: "max-h-full",
                      src: __props.questions[currentIndex.value].photo,
                      alt: _ctx.trans("words.photo")
                    }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  (props.type === "video" || props.type === "test") && __props.questions[currentIndex.value].video ? (openBlock(), createBlock("section", {
                    key: 3,
                    class: "flex justify-center h-[50vh]"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.questions, (question, key) => {
                      return openBlock(), createBlock(Fragment, null, [
                        key == currentIndex.value ? (openBlock(), createBlock("video", {
                          key: 0,
                          class: "max-w-full",
                          controls: ""
                        }, [
                          createVNode("source", {
                            src: __props.questions[key].video
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("", true)
                      ], 64);
                    }), 256))
                  ])) : createCommentVNode("", true)
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex items-center justify-center flex-col"
                }, [
                  createVNode("h2", { class: "text-2xl font-bold" }, toDisplayString(result.value) + " / " + toDisplayString(__props.questions.length), 1),
                  createVNode(unref(Link), {
                    href: _ctx.route("home"),
                    class: "btn btn-primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.trans("words.congratulations_youve_answered_all_questions")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Quiz/Start.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, Fragment, Transition, renderList, vModelCheckbox, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { R as ResuableModal } from "./ResuableModal-2ed3759c.mjs";
import { T as Toast } from "./Toast-0297fd7e.mjs";
import { trans } from "laravel-vue-i18n";
import _sfc_main$1 from "./QuestionLocales-2c5994b2.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Dropdown-d2a4ee41.mjs";
const _sfc_main = {
  __name: "Questions",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: true
    },
    questions_count: {
      type: Number,
      default: 999
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage().props;
    const locale = ref(page.active_locale_code);
    const locales = Object.keys(page.locales);
    let formData = {};
    locales.forEach((lang) => {
      formData[lang] = {
        content: ""
      };
    });
    const form = useForm({
      ...formData,
      answers: [],
      photo: null,
      video: null,
      type: props.type
    });
    const showModal = ref(false);
    let showToast = ref(false);
    const saveQuestion = () => {
      form.post(route("question.store"), {
        onSuccess: () => {
          showToast.value = true;
          showModal.value = false;
          form.reset("content", "answers", "photo", "video", "type");
        }
      });
    };
    const active_locale = (newLocale) => {
      locale.value = newLocale;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-slate-300 rounded-lg p-2" }, _attrs))}><h3 class="text-center text-lg font-bold mt-2 mb-3">${ssrInterpolate(unref(trans)(`words.${__props.type}_questions`))}</h3>`);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(ssrRenderComponent(Toast, {
          show: unref(showToast),
          type: "success",
          onClose: ($event) => isRef(showToast) ? showToast.value = false : showToast = false,
          message: unref(trans)("words.question_added")
        }, null, _parent));
      }, "#toasts", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(ssrRenderComponent(ResuableModal, {
          classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[60%]"],
          header: unref(trans)("words.add_question"),
          show: showModal.value,
          onClose: ($event) => showModal.value = false
        }, {
          content: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(`<h3 class="w-full text-center font-bold text-xl"${_scopeId}>${ssrInterpolate(unref(trans)(`words.${__props.type}_questions`))}</h3><form${_scopeId}><section class="flex items-center p-2"${_scopeId}><label for="question" class="w-24"${_scopeId}>${ssrInterpolate(unref(trans)("words.question"))}:</label><textarea id="question" class="flex-1 rounded-md h-24" required${_scopeId}>${ssrInterpolate(unref(form)[locale.value].content)}</textarea>`);
              _push3(ssrRenderComponent(_sfc_main$1, {
                onActive_locale: active_locale,
                class: "mx-2",
                horizontal: true
              }, null, _parent2, _scopeId));
              _push3(`</section>`);
              if (unref(form).errors.content) {
                _push3(`<p class="error"${_scopeId}>${ssrInterpolate(unref(form).errors.content)}</p>`);
              } else {
                _push3(`<!---->`);
              }
              if (props.type === "photo") {
                _push3(`<!--[--><section class="flex justify-between flex-col sm:flex-row"${_scopeId}><div class="my-2"${_scopeId}><label class="p-2" for="photo"${_scopeId}>${ssrInterpolate(unref(trans)("words.photo"))}</label><input id="photo" type="file"${_scopeId}></div></section>`);
                if (unref(form).errors.photo) {
                  _push3(`<p class="error"${_scopeId}>${ssrInterpolate(unref(form).errors.photo)}</p>`);
                } else {
                  _push3(`<!---->`);
                }
                if (unref(form).progress) {
                  _push3(`<progress${ssrRenderAttr("value", unref(form).progress.percentage)} max="100"${_scopeId}>${ssrInterpolate(unref(form).progress.percentage)}% </progress>`);
                } else {
                  _push3(`<!---->`);
                }
                if (unref(form).recentlySuccessful) {
                  _push3(`<p class="text-sm"${_scopeId}>${ssrInterpolate(unref(trans)("words.uploaded"))}</p>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`<!--]-->`);
              } else {
                _push3(`<!---->`);
              }
              if (props.type === "video") {
                _push3(`<!--[--><section class="flex justify-between flex-col sm:flex-row"${_scopeId}><div class="my-2"${_scopeId}><label class="p-2" for="video"${_scopeId}>${ssrInterpolate(unref(trans)("words.video"))}</label><input id="video" type="file"${_scopeId}></div></section>`);
                if (unref(form).errors.video) {
                  _push3(`<p class="error"${_scopeId}>${ssrInterpolate(unref(form).errors.video)}</p>`);
                } else {
                  _push3(`<!---->`);
                }
                if (unref(form).progress) {
                  _push3(`<progress${ssrRenderAttr("value", unref(form).progress.percentage)} max="100"${_scopeId}>${ssrInterpolate(unref(form).progress.percentage)}% </progress>`);
                } else {
                  _push3(`<!---->`);
                }
                if (unref(form).recentlySuccessful) {
                  _push3(`<p class="text-sm"${_scopeId}>${ssrInterpolate(unref(trans)("words.uploaded"))}</p>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`<!--]-->`);
              } else {
                _push3(`<!---->`);
              }
              _push3(`<section class="p-2"${_scopeId}><label${_scopeId}>${ssrInterpolate(unref(trans)("words.answers"))}:</label><!--[-->`);
              ssrRenderList(unref(form).answers, (answer, index) => {
                _push3(`<section class="flex items-center gap-2 p-2"${_scopeId}><label${ssrRenderAttr("for", "answer" + index)} class="w-3/4"${_scopeId}><input type="text"${ssrRenderAttr("value", unref(form).answers[index][locale.value].content)} class="block w-full rounded-md"${_scopeId}></label><input type="checkbox"${ssrRenderAttr("id", "answer" + index)}${ssrRenderAttr("value", index)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).answers[index].is_correct) ? ssrLooseContain(unref(form).answers[index].is_correct, index) : unref(form).answers[index].is_correct) ? " checked" : ""}${_scopeId}></section>`);
              });
              _push3(`<!--]--></section>`);
              if (unref(form).errors.answers) {
                _push3(`<p class="error"${_scopeId}>${ssrInterpolate(unref(form).errors.answers)}</p>`);
              } else {
                _push3(`<!---->`);
              }
              _push3(`<button type="submit" class="btn btn-primary mx-auto"${_scopeId}>${ssrInterpolate(unref(trans)("words.add_question"))}</button></form>`);
            } else {
              return [
                createVNode("h3", { class: "w-full text-center font-bold text-xl" }, toDisplayString(unref(trans)(`words.${__props.type}_questions`)), 1),
                createVNode("form", {
                  onSubmit: withModifiers(saveQuestion, ["prevent"])
                }, [
                  createVNode("section", { class: "flex items-center p-2" }, [
                    createVNode("label", {
                      for: "question",
                      class: "w-24"
                    }, toDisplayString(unref(trans)("words.question")) + ":", 1),
                    withDirectives(createVNode("textarea", {
                      id: "question",
                      "onUpdate:modelValue": ($event) => unref(form)[locale.value].content = $event,
                      class: "flex-1 rounded-md h-24",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form)[locale.value].content]
                    ]),
                    createVNode(_sfc_main$1, {
                      onActive_locale: active_locale,
                      class: "mx-2",
                      horizontal: true
                    })
                  ]),
                  unref(form).errors.content ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "error"
                  }, toDisplayString(unref(form).errors.content), 1)) : createCommentVNode("", true),
                  props.type === "photo" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode("section", { class: "flex justify-between flex-col sm:flex-row" }, [
                      createVNode("div", { class: "my-2" }, [
                        createVNode("label", {
                          class: "p-2",
                          for: "photo"
                        }, toDisplayString(unref(trans)("words.photo")), 1),
                        createVNode("input", {
                          id: "photo",
                          type: "file",
                          onInput: ($event) => unref(form).photo = $event.target.files[0]
                        }, null, 40, ["onInput"])
                      ])
                    ]),
                    unref(form).errors.photo ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "error"
                    }, toDisplayString(unref(form).errors.photo), 1)) : createCommentVNode("", true),
                    unref(form).progress ? (openBlock(), createBlock("progress", {
                      key: 1,
                      value: unref(form).progress.percentage,
                      max: "100"
                    }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true),
                    createVNode(Transition, {
                      "enter-from-class": "opacity-0",
                      "leave-to-class": "opacity-0",
                      class: "transition ease-in-out"
                    }, {
                      default: withCtx(() => [
                        unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm"
                        }, toDisplayString(unref(trans)("words.uploaded")), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ], 64)) : createCommentVNode("", true),
                  props.type === "video" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createVNode("section", { class: "flex justify-between flex-col sm:flex-row" }, [
                      createVNode("div", { class: "my-2" }, [
                        createVNode("label", {
                          class: "p-2",
                          for: "video"
                        }, toDisplayString(unref(trans)("words.video")), 1),
                        createVNode("input", {
                          id: "video",
                          type: "file",
                          onInput: ($event) => unref(form).video = $event.target.files[0]
                        }, null, 40, ["onInput"])
                      ])
                    ]),
                    unref(form).errors.video ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "error"
                    }, toDisplayString(unref(form).errors.video), 1)) : createCommentVNode("", true),
                    unref(form).progress ? (openBlock(), createBlock("progress", {
                      key: 1,
                      value: unref(form).progress.percentage,
                      max: "100"
                    }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true),
                    createVNode(Transition, {
                      "enter-from-class": "opacity-0",
                      "leave-to-class": "opacity-0",
                      class: "transition ease-in-out"
                    }, {
                      default: withCtx(() => [
                        unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm"
                        }, toDisplayString(unref(trans)("words.uploaded")), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ], 64)) : createCommentVNode("", true),
                  createVNode("section", { class: "p-2" }, [
                    createVNode("label", null, toDisplayString(unref(trans)("words.answers")) + ":", 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(form).answers, (answer, index) => {
                      return openBlock(), createBlock("section", {
                        key: index,
                        class: "flex items-center gap-2 p-2"
                      }, [
                        createVNode("label", {
                          for: "answer" + index,
                          class: "w-3/4"
                        }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).answers[index][locale.value].content = $event,
                            class: "block w-full rounded-md"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).answers[index][locale.value].content]
                          ])
                        ], 8, ["for"]),
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          id: "answer" + index,
                          value: index,
                          "onUpdate:modelValue": ($event) => unref(form).answers[index].is_correct = $event
                        }, null, 8, ["id", "value", "onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).answers[index].is_correct]
                        ])
                      ]);
                    }), 128))
                  ]),
                  unref(form).errors.answers ? (openBlock(), createBlock("p", {
                    key: 3,
                    class: "error"
                  }, toDisplayString(unref(form).errors.answers), 1)) : createCommentVNode("", true),
                  createVNode("button", {
                    type: "submit",
                    class: "btn btn-primary mx-auto"
                  }, toDisplayString(unref(trans)("words.add_question")), 1)
                ], 40, ["onSubmit"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }, "#modal", false, _parent);
      _push(`<section class="flex items-center justify-between"><p>${ssrInterpolate(__props.questions_count)} ${ssrInterpolate(unref(trans)("words.questions"))}</p><section class="flex gap-2">`);
      _push(ssrRenderComponent(unref(Link), {
        class: "btn btn-primary",
        href: _ctx.route("questions.showByType", __props.type)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("words.show_questions"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("words.show_questions")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="btn btn-primary">${ssrInterpolate(unref(trans)("words.add_question"))}</button></section></section></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Quiz/Partials/Questions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { ref, unref, withCtx, isRef, createVNode, withModifiers, createTextVNode, toDisplayString, Transition, openBlock, createBlock, createCommentVNode, Teleport, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-b39e6883.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { R as ResuableModal } from "./ResuableModal-001969d6.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputError-20f2d7b9.mjs";
import "./Locales-9be1f4f4.mjs";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    stories: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      id: null,
      name: "",
      description: "",
      pdf: null
    });
    let showModal = ref(false);
    let nameInput = ref(null);
    let descriptionInput = ref(null);
    ref(null);
    const store = () => {
      form.post(route("story.store"), {
        onSuccess: () => {
          setTimeout(() => {
            showModal.value = false;
          }, 1e3);
          form.reset();
        },
        onError: () => {
          if (form.errors.name) {
            nameInput.value.focus();
          }
          if (form.errors.description) {
            descriptionInput.value.focus();
          }
        }
      });
    };
    const openCreateModal = (id) => {
      form.id = null;
      form.name = "";
      form.description = "";
      showModal.value = true;
    };
    const edit = (id) => {
      showModal.value = true;
      const foundStroy = props.stories.find((story) => story.id === id);
      form.id = foundStroy.id;
      form.name = foundStroy.name;
      form.description = foundStroy.description;
    };
    const destroy = (id) => {
      form.post(route("story.delete", id), {});
    };
    const uploadPDF = () => {
      form.post(route("story.updatePDF", form.id), {
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("words.story")
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-2xl font-bold underline"${_scopeId}>${ssrInterpolate(_ctx.trans("words.stories"))}</h2><section class="flex items-center justify-center"${_scopeId}><button class="btn btn-primary"${_scopeId}>${ssrInterpolate(_ctx.trans("words.create_story"))}</button></section>`);
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(ResuableModal, {
                classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                header: _ctx.trans("words.create_story"),
                show: unref(showModal),
                onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
              }, {
                content: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(`<form class="px-4 py-2"${_scopeId2}><section${_scopeId2}>${ssrInterpolate(_ctx.trans("words.name"))} `);
                    _push4(ssrRenderComponent(_sfc_main$1, {
                      id: "name",
                      ref_key: "nameInput",
                      ref: nameInput,
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      type: "text",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.name")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      message: unref(form).errors.name,
                      class: "my-2 bg-white rounded-md px-2 py-1"
                    }, null, _parent3, _scopeId2));
                    _push4(`</section><section${_scopeId2}>${ssrInterpolate(_ctx.trans("words.description"))} `);
                    _push4(ssrRenderComponent(_sfc_main$1, {
                      id: "description",
                      ref_key: "descriptionInput",
                      ref: descriptionInput,
                      modelValue: unref(form).description,
                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                      type: "text",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.description")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      message: unref(form).errors.description,
                      class: "my-2 bg-white rounded-md px-2 py-1"
                    }, null, _parent3, _scopeId2));
                    _push4(`</section><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId2}>${ssrInterpolate(_ctx.trans("words.save"))}</button>`);
                    if (unref(form).recentlySuccessful) {
                      _push4(`<p class="text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(_ctx.trans("words.saved"))}</p>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(`</form>`);
                    if (unref(form).id) {
                      _push4(`<form class="p-2 sm:p-4 shadow sm:rounded-lg"${_scopeId2}><section class="flex justify-between flex-col sm:flex-row"${_scopeId2}><div class="my-2"${_scopeId2}><label class="pr-2" for="pdf"${_scopeId2}>${ssrInterpolate(_ctx.trans("words.pdf"))}</label><input id="pdf" type="file"${_scopeId2}></div><button class="btn btn-success" type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId2}>${ssrInterpolate(_ctx.trans("words.upload"))}</button></section>`);
                      if (unref(form).errors.pdf) {
                        _push4(`<p class="text-sm bg-red-600 rounded-md my-1 px-2 py-1"${_scopeId2}>${ssrInterpolate(unref(form).errors.pdf)}</p>`);
                      } else {
                        _push4(`<!---->`);
                      }
                      if (unref(form).progress) {
                        _push4(`<progress${ssrRenderAttr("value", unref(form).progress.percentage)} max="100"${_scopeId2}>${ssrInterpolate(unref(form).progress.percentage)}% </progress>`);
                      } else {
                        _push4(`<!---->`);
                      }
                      if (unref(form).recentlySuccessful) {
                        _push4(`<p class="text-sm"${_scopeId2}>${ssrInterpolate(_ctx.trans("words.uploaded"))}</p>`);
                      } else {
                        _push4(`<!---->`);
                      }
                      _push4(`</form>`);
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("form", {
                        onSubmit: withModifiers(store, ["prevent"]),
                        class: "px-4 py-2"
                      }, [
                        createVNode("section", null, [
                          createTextVNode(toDisplayString(_ctx.trans("words.name")) + " ", 1),
                          createVNode(_sfc_main$1, {
                            id: "name",
                            ref_key: "nameInput",
                            ref: nameInput,
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.name")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.name,
                            class: "my-2 bg-white rounded-md px-2 py-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("section", null, [
                          createTextVNode(toDisplayString(_ctx.trans("words.description")) + " ", 1),
                          createVNode(_sfc_main$1, {
                            id: "description",
                            ref_key: "descriptionInput",
                            ref: descriptionInput,
                            modelValue: unref(form).description,
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            type: "text",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.description")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.description,
                            class: "my-2 bg-white rounded-md px-2 py-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("button", {
                          class: "btn btn-primary",
                          disabled: unref(form).processing
                        }, toDisplayString(_ctx.trans("words.save")), 9, ["disabled"]),
                        createVNode(Transition, {
                          "enter-from-class": "opacity-0",
                          "leave-to-class": "opacity-0",
                          class: "transition ease-in-out"
                        }, {
                          default: withCtx(() => [
                            unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-gray-600"
                            }, toDisplayString(_ctx.trans("words.saved")), 1)) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ], 40, ["onSubmit"]),
                      unref(form).id ? (openBlock(), createBlock("form", {
                        key: 0,
                        class: "p-2 sm:p-4 shadow sm:rounded-lg",
                        onSubmit: withModifiers(uploadPDF, ["prevent"])
                      }, [
                        createVNode("section", { class: "flex justify-between flex-col sm:flex-row" }, [
                          createVNode("div", { class: "my-2" }, [
                            createVNode("label", {
                              class: "pr-2",
                              for: "pdf"
                            }, toDisplayString(_ctx.trans("words.pdf")), 1),
                            createVNode("input", {
                              id: "pdf",
                              type: "file",
                              onInput: ($event) => unref(form).pdf = $event.target.files[0]
                            }, null, 40, ["onInput"])
                          ]),
                          createVNode("button", {
                            class: "btn btn-success",
                            type: "submit",
                            disabled: unref(form).processing
                          }, toDisplayString(_ctx.trans("words.upload")), 9, ["disabled"])
                        ]),
                        unref(form).errors.pdf ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm bg-red-600 rounded-md my-1 px-2 py-1"
                        }, toDisplayString(unref(form).errors.pdf), 1)) : createCommentVNode("", true),
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
                            }, toDisplayString(_ctx.trans("words.uploaded")), 1)) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ], 40, ["onSubmit"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, "#modal", false, _parent2);
            _push2(`<!--[-->`);
            ssrRenderList(__props.stories, (story) => {
              _push2(`<section class="m-1 p-2 rounded-lg bg-slate-500"${_scopeId}><p class="text-lg font-bold text-gray-100"${_scopeId}>${ssrInterpolate(story.name)}</p><p class="indent-2 text-white"${_scopeId}>${ssrInterpolate(story.description)}</p><section class="flex items-center justify-center gap-2"${_scopeId}><button class="btn btn-success"${_scopeId}>${ssrInterpolate(_ctx.trans("words.edit"))}</button><button class="btn btn-danger"${_scopeId}>${ssrInterpolate(_ctx.trans("words.delete"))}</button>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("story.show", story.id),
                class: "btn btn-info"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.trans("words.details"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.trans("words.details")), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</section></section>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("h2", { class: "text-2xl font-bold underline" }, toDisplayString(_ctx.trans("words.stories")), 1),
              createVNode("section", { class: "flex items-center justify-center" }, [
                createVNode("button", {
                  class: "btn btn-primary",
                  onClick: openCreateModal
                }, toDisplayString(_ctx.trans("words.create_story")), 1)
              ]),
              (openBlock(), createBlock(Teleport, { to: "#modal" }, [
                createVNode(ResuableModal, {
                  classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                  header: _ctx.trans("words.create_story"),
                  show: unref(showModal),
                  onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
                }, {
                  content: withCtx(() => [
                    createVNode("form", {
                      onSubmit: withModifiers(store, ["prevent"]),
                      class: "px-4 py-2"
                    }, [
                      createVNode("section", null, [
                        createTextVNode(toDisplayString(_ctx.trans("words.name")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          id: "name",
                          ref_key: "nameInput",
                          ref: nameInput,
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder: _ctx.trans("words.name")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(_sfc_main$2, {
                          message: unref(form).errors.name,
                          class: "my-2 bg-white rounded-md px-2 py-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("section", null, [
                        createTextVNode(toDisplayString(_ctx.trans("words.description")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          id: "description",
                          ref_key: "descriptionInput",
                          ref: descriptionInput,
                          modelValue: unref(form).description,
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder: _ctx.trans("words.description")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(_sfc_main$2, {
                          message: unref(form).errors.description,
                          class: "my-2 bg-white rounded-md px-2 py-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("button", {
                        class: "btn btn-primary",
                        disabled: unref(form).processing
                      }, toDisplayString(_ctx.trans("words.save")), 9, ["disabled"]),
                      createVNode(Transition, {
                        "enter-from-class": "opacity-0",
                        "leave-to-class": "opacity-0",
                        class: "transition ease-in-out"
                      }, {
                        default: withCtx(() => [
                          unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-600"
                          }, toDisplayString(_ctx.trans("words.saved")), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onSubmit"]),
                    unref(form).id ? (openBlock(), createBlock("form", {
                      key: 0,
                      class: "p-2 sm:p-4 shadow sm:rounded-lg",
                      onSubmit: withModifiers(uploadPDF, ["prevent"])
                    }, [
                      createVNode("section", { class: "flex justify-between flex-col sm:flex-row" }, [
                        createVNode("div", { class: "my-2" }, [
                          createVNode("label", {
                            class: "pr-2",
                            for: "pdf"
                          }, toDisplayString(_ctx.trans("words.pdf")), 1),
                          createVNode("input", {
                            id: "pdf",
                            type: "file",
                            onInput: ($event) => unref(form).pdf = $event.target.files[0]
                          }, null, 40, ["onInput"])
                        ]),
                        createVNode("button", {
                          class: "btn btn-success",
                          type: "submit",
                          disabled: unref(form).processing
                        }, toDisplayString(_ctx.trans("words.upload")), 9, ["disabled"])
                      ]),
                      unref(form).errors.pdf ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm bg-red-600 rounded-md my-1 px-2 py-1"
                      }, toDisplayString(unref(form).errors.pdf), 1)) : createCommentVNode("", true),
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
                          }, toDisplayString(_ctx.trans("words.uploaded")), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onSubmit"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["header", "show", "onClose"])
              ])),
              (openBlock(true), createBlock(Fragment, null, renderList(__props.stories, (story) => {
                return openBlock(), createBlock("section", {
                  key: story.id,
                  class: "m-1 p-2 rounded-lg bg-slate-500"
                }, [
                  createVNode("p", { class: "text-lg font-bold text-gray-100" }, toDisplayString(story.name), 1),
                  createVNode("p", { class: "indent-2 text-white" }, toDisplayString(story.description), 1),
                  createVNode("section", { class: "flex items-center justify-center gap-2" }, [
                    createVNode("button", {
                      class: "btn btn-success",
                      onClick: ($event) => edit(story.id)
                    }, toDisplayString(_ctx.trans("words.edit")), 9, ["onClick"]),
                    createVNode("button", {
                      class: "btn btn-danger",
                      onClick: ($event) => destroy(story.id)
                    }, toDisplayString(_ctx.trans("words.delete")), 9, ["onClick"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("story.show", story.id),
                      class: "btn btn-info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.trans("words.details")), 1)
                      ]),
                      _: 2
                    }, 1032, ["href"])
                  ])
                ]);
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Story/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

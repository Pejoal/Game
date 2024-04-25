import { ref, unref, withCtx, isRef, createVNode, withModifiers, createTextVNode, toDisplayString, Transition, openBlock, createBlock, createCommentVNode, Teleport, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-ea10b4fc.mjs";
import { useForm, Head } from "@inertiajs/vue3";
import { R as ResuableModal } from "./ResuableModal-c02eb6ca.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputError-20f2d7b9.mjs";
import "./Footer-ec5c717f.mjs";
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
    const form = useForm({
      name: "",
      description: ""
    });
    let showModal = ref(false);
    let nameInput = ref(null);
    let descriptionInput = ref(null);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("words.story")
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-2xl font-bold underline"${_scopeId}>${ssrInterpolate(_ctx.trans("words.stories"))}</h2><button class="btn btn-primary"${_scopeId}>${ssrInterpolate(_ctx.trans("words.create_story"))}</button>`);
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
                      _push4(`<p class="text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(_ctx.trans("words.created"))}</p>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(`</form>`);
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
                            }, toDisplayString(_ctx.trans("words.created")), 1)) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ], 40, ["onSubmit"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, "#modal", false, _parent2);
            _push2(`<!--[-->`);
            ssrRenderList(__props.stories, (story) => {
              _push2(`<section class="m-1 p-2 rounded-lg bg-slate-500"${_scopeId}><p class="text-lg font-bold text-gray-100"${_scopeId}>${ssrInterpolate(story.name)}</p><p class="indent-2 text-white"${_scopeId}>${ssrInterpolate(story.description)}</p></section>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("h2", { class: "text-2xl font-bold underline" }, toDisplayString(_ctx.trans("words.stories")), 1),
              createVNode("button", {
                class: "btn btn-primary",
                onClick: ($event) => isRef(showModal) ? showModal.value = true : showModal = true
              }, toDisplayString(_ctx.trans("words.create_story")), 9, ["onClick"]),
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
                          }, toDisplayString(_ctx.trans("words.created")), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onSubmit"])
                  ]),
                  _: 1
                }, 8, ["header", "show", "onClose"])
              ])),
              (openBlock(true), createBlock(Fragment, null, renderList(__props.stories, (story) => {
                return openBlock(), createBlock("section", { class: "m-1 p-2 rounded-lg bg-slate-500" }, [
                  createVNode("p", { class: "text-lg font-bold text-gray-100" }, toDisplayString(story.name), 1),
                  createVNode("p", { class: "indent-2 text-white" }, toDisplayString(story.description), 1)
                ]);
              }), 256))
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

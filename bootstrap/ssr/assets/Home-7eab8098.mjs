import { ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, isRef, withModifiers, Transition, openBlock, createBlock, createCommentVNode, Fragment, renderList, Teleport, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderTeleport, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-b0684c6d.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { R as ResuableModal } from "./ResuableModal-2ed3759c.mjs";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-66ab7a8d.mjs";
import "./Footer-1c20d405.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    lobbies: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    let showModal = ref(false);
    const form = useForm({
      name: ""
    });
    const store = () => {
      form.post(route("lobby.store"), {
        onSuccess: () => {
          showModal.value = false;
          form.reset();
        },
        onError: () => {
          if (form.errors.name) {
            nameInput.value.focus();
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.trans("words.home"))}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.trans("words.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="grid grid-cols-1 md:grid-cols-3"${_scopeId}><section class="bg-amber-200 p-2"${_scopeId}><h2 class="text-xl font-bold"${_scopeId}>Lobbies</h2><!--[-->`);
            ssrRenderList(__props.lobbies, (lobby) => {
              _push2(`<section class="flex gap-2"${_scopeId}><p class="font-semibold"${_scopeId}>${ssrInterpolate(lobby.name)}</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("lobby.join", lobby.id),
                class: "underline hover:font-bold"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.trans("words.join"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.trans("words.join")), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</section>`);
            });
            _push2(`<!--]--><button class="btn btn-primary"${_scopeId}> Create Lobby </button>`);
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(ResuableModal, {
                classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                header: "Create Lobby",
                show: unref(showModal),
                onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
              }, {
                content: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(`<form class="px-4 py-2"${_scopeId2}>`);
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      id: "name",
                      ref: "nameInput",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      type: "text",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.name")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$3, {
                      message: unref(form).errors.name,
                      class: "my-2 bg-white rounded-md px-2 py-1"
                    }, null, _parent3, _scopeId2));
                    _push4(`<button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId2}>${ssrInterpolate(_ctx.trans("words.save"))}</button>`);
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
                        createVNode(_sfc_main$2, {
                          id: "name",
                          ref: "nameInput",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder: _ctx.trans("words.name")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(_sfc_main$3, {
                          message: unref(form).errors.name,
                          class: "my-2 bg-white rounded-md px-2 py-1"
                        }, null, 8, ["message"]),
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
            _push2(`</section><section class="col-span-2 bg-indigo-400"${_scopeId}>Hello Everyone!</section></main>`);
          } else {
            return [
              createVNode("main", { class: "grid grid-cols-1 md:grid-cols-3" }, [
                createVNode("section", { class: "bg-amber-200 p-2" }, [
                  createVNode("h2", { class: "text-xl font-bold" }, "Lobbies"),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.lobbies, (lobby) => {
                    return openBlock(), createBlock("section", {
                      class: "flex gap-2",
                      key: lobby.id
                    }, [
                      createVNode("p", { class: "font-semibold" }, toDisplayString(lobby.name), 1),
                      createVNode(unref(Link), {
                        href: _ctx.route("lobby.join", lobby.id),
                        class: "underline hover:font-bold"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.trans("words.join")), 1)
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ]);
                  }), 128)),
                  createVNode("button", {
                    class: "btn btn-primary",
                    onClick: ($event) => isRef(showModal) ? showModal.value = true : showModal = true
                  }, " Create Lobby ", 8, ["onClick"]),
                  (openBlock(), createBlock(Teleport, { to: "#modal" }, [
                    createVNode(ResuableModal, {
                      classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                      header: "Create Lobby",
                      show: unref(showModal),
                      onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
                    }, {
                      content: withCtx(() => [
                        createVNode("form", {
                          onSubmit: withModifiers(store, ["prevent"]),
                          class: "px-4 py-2"
                        }, [
                          createVNode(_sfc_main$2, {
                            id: "name",
                            ref: "nameInput",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.name")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$3, {
                            message: unref(form).errors.name,
                            class: "my-2 bg-white rounded-md px-2 py-1"
                          }, null, 8, ["message"]),
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
                    }, 8, ["show", "onClose"])
                  ]))
                ]),
                createVNode("section", { class: "col-span-2 bg-indigo-400" }, "Hello Everyone!")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

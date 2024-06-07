import { ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, isRef, withModifiers, Transition, openBlock, createBlock, createCommentVNode, Fragment, renderList, Teleport, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderTeleport, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-b39e6883.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { R as ResuableModal } from "./ResuableModal-001969d6.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputError-20f2d7b9.mjs";
import Redis from "ioredis";
import "./Locales-9be1f4f4.mjs";
import "laravel-vue-i18n";
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379
});
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
    let nameInput = ref(null);
    let max_playersInput = ref(null);
    const form = useForm({
      name: "",
      max_players: 4
    });
    const store = () => {
      form.post(route("lobby.store"), {
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
          if (form.errors.max_players) {
            max_playersInput.value.focus();
          }
        }
      });
    };
    (async () => {
      redis.subscribe("my-channel", (err, count) => {
        if (err) {
          console.error("Error subscribing:", err);
        } else {
          console.log(`Subscribed to ${count} channels`);
        }
      });
      redis.on("message", (channel, message) => {
        console.log(`Received message on channel ${channel}: ${message}`);
      });
    })();
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
      _push(ssrRenderComponent(AuthLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="grid grid-cols-1 md:grid-cols-3"${_scopeId}><section class="bg-amber-50 p-2"${_scopeId}><h2 class="text-xl font-bold"${_scopeId}>${ssrInterpolate(_ctx.trans("words.lobbies"))}</h2><!--[-->`);
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
            _push2(`<!--]--><button class="btn btn-primary"${_scopeId}>${ssrInterpolate(_ctx.trans("words.create_lobby"))}</button>`);
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(ResuableModal, {
                classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                header: _ctx.trans("words.create_lobby"),
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
                    _push4(`</section><section${_scopeId2}>${ssrInterpolate(_ctx.trans("words.max_players"))} `);
                    _push4(ssrRenderComponent(_sfc_main$1, {
                      id: "max_players",
                      ref_key: "max_playersInput",
                      ref: max_playersInput,
                      modelValue: unref(form).max_players,
                      "onUpdate:modelValue": ($event) => unref(form).max_players = $event,
                      type: "text",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.max_players")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      message: unref(form).errors.max_players,
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
                          createTextVNode(toDisplayString(_ctx.trans("words.max_players")) + " ", 1),
                          createVNode(_sfc_main$1, {
                            id: "max_players",
                            ref_key: "max_playersInput",
                            ref: max_playersInput,
                            modelValue: unref(form).max_players,
                            "onUpdate:modelValue": ($event) => unref(form).max_players = $event,
                            type: "text",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.max_players")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.max_players,
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
            _push2(`</section><section class="col-span-2 p-2"${_scopeId}>Hello Everyone!</section></main>`);
          } else {
            return [
              createVNode("main", { class: "grid grid-cols-1 md:grid-cols-3" }, [
                createVNode("section", { class: "bg-amber-50 p-2" }, [
                  createVNode("h2", { class: "text-xl font-bold" }, toDisplayString(_ctx.trans("words.lobbies")), 1),
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
                  }, toDisplayString(_ctx.trans("words.create_lobby")), 9, ["onClick"]),
                  (openBlock(), createBlock(Teleport, { to: "#modal" }, [
                    createVNode(ResuableModal, {
                      classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                      header: _ctx.trans("words.create_lobby"),
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
                            createTextVNode(toDisplayString(_ctx.trans("words.max_players")) + " ", 1),
                            createVNode(_sfc_main$1, {
                              id: "max_players",
                              ref_key: "max_playersInput",
                              ref: max_playersInput,
                              modelValue: unref(form).max_players,
                              "onUpdate:modelValue": ($event) => unref(form).max_players = $event,
                              type: "text",
                              class: "my-2 block w-3/4 text-black rounded-lg",
                              placeholder: _ctx.trans("words.max_players")
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                            createVNode(_sfc_main$2, {
                              message: unref(form).errors.max_players,
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
                  ]))
                ]),
                createVNode("section", { class: "col-span-2 p-2" }, "Hello Everyone!")
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

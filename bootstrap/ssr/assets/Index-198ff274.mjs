import { mergeProps, useSSRContext, ref, unref, onMounted, onUnmounted, withCtx, createVNode, toDisplayString, createTextVNode, withDirectives, isRef, openBlock, createBlock, Fragment, renderList, vModelSelect, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-ea10b4fc.mjs";
import { usePage, Head, Link } from "@inertiajs/vue3";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import { getActiveLanguage } from "laravel-vue-i18n";
import "./Footer-ec5c717f.mjs";
const _sfc_main$3 = {
  __name: "Alert",
  __ssrInlineRender: true,
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["flex px-1 py-2 my-2 text-sm rounded-lg", {
          "text-blue-800 border border-blue-300  bg-blue-50": __props.message.type === "join",
          "text-red-800 border border-red-300 bg-red-50": __props.message.type === "leave"
        }],
        role: "alert"
      }, _attrs))}>`);
      if (__props.message.type === "join") {
        _push(`<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.message.type === "leave") {
        _push(`<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="w-full"><div class="flex justify-between items-center my-2"><span class="font-medium">Info alert!</span><time class="text-gray-500 text-sm"> at ${ssrInterpolate(__props.message.created_at)}</time></div><p>${ssrInterpolate(__props.message.firstname + " " + __props.message.lastname)} has ${ssrInterpolate(__props.message.type === "leave" ? "left" : "joined")} the lobby </p></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Alert.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CreateMessage",
  __ssrInlineRender: true,
  props: {
    lobbyId: {
      type: Number,
      default: 0
    }
  },
  emits: ["unshiftMessage"],
  setup(__props, { emit }) {
    usePage().props.auth.user;
    ref(null);
    let newMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center mb-5" }, _attrs))}><div class="flex-1 mr-3"><input name="content" type="text" class="w-full text-black border-2 border-gray-300 p-2 rounded-md"${ssrRenderAttr("placeholder", "Type your message here")}${ssrRenderAttr("value", unref(newMessage))}></div><button class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"> Send </button></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CreateMessage.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Message",
  __ssrInlineRender: true,
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-700 py-2 px-4 rounded-lg mb-3" }, _attrs))}><div class="flex justify-between items-center mb-2"><h2 class="font-bold text-white">${ssrInterpolate(__props.message.firstname + " " + __props.message.lastname)}</h2><p class="text-gray-400 text-sm">at ${ssrInterpolate(__props.message.created_at)}</p></div><p class="indent-2 text-gray-200">${ssrInterpolate(__props.message.content)}</p></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Message.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const getRandomDigits = (length = 16) => {
  let randomNumber = "";
  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      default: ""
    },
    max_players: {
      type: Number,
      default: 4
    },
    lobbyId: {
      type: Number,
      default: 0
    },
    hostId: {
      type: Number,
      default: 0
    },
    stories: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage().props;
    const env = { "VITE_PUSHER_APP_KEY": "a5fc9c15e9d538e998b4", "VITE_PUSHER_HOST": "localhost", "VITE_PUSHER_PORT": "80", "VITE_PUSHER_SCHEME": "http", "VITE_PUSHER_APP_CLUSTER": "eu", "VITE_LARAVEL_VUE_I18N_HAS_PHP": "true", "BASE_URL": "/build/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true };
    let initials = ref([]);
    let messages = ref([]);
    let echo;
    onMounted(() => {
      const pusher = new Pusher(env.VITE_PUSHER_APP_KEY, {
        cluster: env.VITE_PUSHER_APP_CLUSTER,
        encrypted: true
      });
      echo = new Echo({
        broadcaster: "pusher",
        key: env.VITE_PUSHER_APP_KEY,
        cluster: env.VITE_PUSHER_APP_CLUSTER,
        encrypted: true,
        pusher
      });
      echo.join(`chat.${props.lobbyId}`).here((users) => {
        initials.value = users.map(function(user) {
          return {
            id: user.id,
            name: user.firstname[0] + user.lastname[0],
            fullname: user.firstname + " " + user.lastname
          };
        });
      }).joining((user) => {
        messages.value.unshift({
          id: getRandomDigits(),
          firstname: user.firstname,
          lastname: user.lastname,
          created_at: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
          type: "join"
        });
        initials.value.unshift({
          id: user.id,
          name: user.firstname[0] + user.lastname[0],
          fullname: user.firstname + " " + user.lastname
        });
      }).leaving((user) => {
        messages.value.unshift({
          id: getRandomDigits(),
          firstname: user.firstname,
          lastname: user.lastname,
          created_at: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
          type: "leave"
        });
        initials.value = initials.value.filter(function(ini) {
          return ini.id != user.id;
        });
      }).listen("LobbyMessageSent", (data) => {
        if (data.user_id != page.auth.user.id) {
          messages.value.unshift({
            id: getRandomDigits(),
            firstname: data.firstname,
            lastname: data.lastname,
            content: data.content,
            created_at: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
            type: "content"
          });
        }
      }).listen("LobbyStarted", (data) => {
        let link = `/${getActiveLanguage()}/lobby/${props.lobbyId}/start`;
        location.href = link;
      }).error((error) => {
        console.error(error);
      });
    });
    onUnmounted(() => {
      echo.leaveAllChannels();
    });
    const leave = () => {
      location.href = "/";
    };
    const deleteLobby = () => {
      axios.delete(route("lobby.delete", props.lobbyId)).then(() => {
        location.href = "/";
      });
    };
    const unshiftMessage = (data) => {
      messages.value.unshift({
        id: getRandomDigits(),
        firstname: data.firstname,
        lastname: data.lastname,
        content: data.content,
        created_at: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        type: "content"
      });
    };
    let selectedOption = ref(null);
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
            _push2(`<header class="p-2 text-xl font-bold flex items-center justify-between"${_scopeId}><h2 class=""${_scopeId}>${ssrInterpolate(unref(props).name)}</h2><p${_scopeId}>${ssrInterpolate(_ctx.trans("words.max_players"))} : ${ssrInterpolate(unref(props).max_players)}</p></header><section class="my-1 px-2"${_scopeId}><label for="select" class="block text-sm font-medium text-gray-700"${_scopeId}>Story:</label><section class="mt-1 relative"${_scopeId}><select id="select" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"${_scopeId}><option value="" disabled${_scopeId}>Select an option</option><!--[-->`);
            ssrRenderList(unref(props).stories, (story) => {
              _push2(`<option${ssrRenderAttr("value", story.id)}${_scopeId}>${ssrInterpolate(story.name)}</option>`);
            });
            _push2(`<!--]--></select></section></section><section class="mb-2 bg-zinc-400 px-2 border border-gray-600 rounded-md shadow-lg"${_scopeId}><section class="flex gap-1 m-2 px-2 py-4 border rounded-lg overflow-x-auto"${_scopeId}><!--[-->`);
            ssrRenderList(unref(initials), (initial) => {
              _push2(`<p class="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full"${ssrRenderAttr("title", initial.fullname)}${_scopeId}>${ssrInterpolate(initial.name)}</p>`);
            });
            _push2(`<!--]--></section><div class="overflow-y-auto h-96 max-h-[75vh] mb-5 px-2 py-4 border border-gray-600 rounded-lg"${_scopeId}><!--[-->`);
            ssrRenderList(unref(messages), (message) => {
              _push2(`<section${_scopeId}>`);
              if (message.type === "join" || message.type === "leave") {
                _push2(ssrRenderComponent(_sfc_main$3, { message }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_sfc_main$1, { message }, null, _parent2, _scopeId));
              }
              _push2(`</section>`);
            });
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              lobbyId: unref(props).lobbyId,
              onUnshiftMessage: unshiftMessage
            }, null, _parent2, _scopeId));
            _push2(`</section><section class="flex items-center justify-center gap-2 my-2"${_scopeId}>`);
            if (unref(props).hostId === unref(page).auth.user.id) {
              _push2(`<!--[--><button class="btn btn-danger"${_scopeId}> Delete Lobby </button>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("lobby.start", __props.lobbyId),
                class: "btn btn-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Start Game `);
                  } else {
                    return [
                      createTextVNode(" Start Game ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="btn btn-danger"${_scopeId}>Leave Lobby</button></section>`);
          } else {
            return [
              createVNode("header", { class: "p-2 text-xl font-bold flex items-center justify-between" }, [
                createVNode("h2", { class: "" }, toDisplayString(unref(props).name), 1),
                createVNode("p", null, toDisplayString(_ctx.trans("words.max_players")) + " : " + toDisplayString(unref(props).max_players), 1)
              ]),
              createVNode("section", { class: "my-1 px-2" }, [
                createVNode("label", {
                  for: "select",
                  class: "block text-sm font-medium text-gray-700"
                }, "Story:"),
                createVNode("section", { class: "mt-1 relative" }, [
                  withDirectives(createVNode("select", {
                    id: "select",
                    "onUpdate:modelValue": ($event) => isRef(selectedOption) ? selectedOption.value = $event : selectedOption = $event,
                    class: "block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  }, [
                    createVNode("option", {
                      value: "",
                      disabled: ""
                    }, "Select an option"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(props).stories, (story) => {
                      return openBlock(), createBlock("option", {
                        key: story.id,
                        value: story.id
                      }, toDisplayString(story.name), 9, ["value"]);
                    }), 128))
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(selectedOption)]
                  ])
                ])
              ]),
              createVNode("section", { class: "mb-2 bg-zinc-400 px-2 border border-gray-600 rounded-md shadow-lg" }, [
                createVNode("section", { class: "flex gap-1 m-2 px-2 py-4 border rounded-lg overflow-x-auto" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(initials), (initial) => {
                    return openBlock(), createBlock("p", {
                      class: "flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full",
                      key: initial.id,
                      textContent: toDisplayString(initial.name),
                      title: initial.fullname
                    }, null, 8, ["textContent", "title"]);
                  }), 128))
                ]),
                createVNode("div", { class: "overflow-y-auto h-96 max-h-[75vh] mb-5 px-2 py-4 border border-gray-600 rounded-lg" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(messages), (message) => {
                    return openBlock(), createBlock("section", {
                      key: message.id
                    }, [
                      message.type === "join" || message.type === "leave" ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 0,
                        message
                      }, null, 8, ["message"])) : (openBlock(), createBlock(_sfc_main$1, {
                        key: 1,
                        message
                      }, null, 8, ["message"]))
                    ]);
                  }), 128))
                ]),
                createVNode(_sfc_main$2, {
                  lobbyId: unref(props).lobbyId,
                  onUnshiftMessage: unshiftMessage
                }, null, 8, ["lobbyId"])
              ]),
              createVNode("section", { class: "flex items-center justify-center gap-2 my-2" }, [
                unref(props).hostId === unref(page).auth.user.id ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("button", {
                    onClick: deleteLobby,
                    class: "btn btn-danger"
                  }, " Delete Lobby "),
                  createVNode(unref(Link), {
                    href: _ctx.route("lobby.start", __props.lobbyId),
                    class: "btn btn-primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Start Game ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ], 64)) : createCommentVNode("", true),
                createVNode("button", {
                  onClick: leave,
                  class: "btn btn-danger"
                }, "Leave Lobby")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lobby/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

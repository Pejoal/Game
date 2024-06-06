import { useSSRContext, ref, onMounted, onUnmounted, watch, unref, withCtx, createVNode, toDisplayString, isRef, openBlock, createBlock, Teleport, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderTeleport, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-b39e6883.mjs";
import { b as _export_sfc } from "./Locales-9be1f4f4.mjs";
import { trans } from "laravel-vue-i18n";
import Draggable from "vuedraggable";
import { usePage, Head } from "@inertiajs/vue3";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { g as getRandomDigits } from "./utils-8dfec9b8.mjs";
const Toast_vue_vue_type_style_index_0_scoped_56ea47d0_lang = "";
const _sfc_main$1 = {
  __name: "Toast",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    message: String | Boolean,
    type: String
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    setTimeout(() => {
      emit("close");
    }, 7e3);
    return (_ctx, _push, _parent, _attrs) => {
      if (props.show) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-56ea47d0><div class="${ssrRenderClass([[{ "bg-red-500": props.type == "danger" }], "toast-container transition-all relative bg-green-500 text-white px-6 py-4 border-0 rounded-lg my-4 z-50"])}" data-v-56ea47d0><span class="text-xl inline-block mr-4 align-middle" data-v-56ea47d0>`);
        if (__props.type == "success") {
          _push(`<i class="fa-solid fa-check" data-v-56ea47d0></i>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.type == "danger") {
          _push(`<i class="fa-solid fa-exclamation" data-v-56ea47d0></i>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><span class="inline-block align-middle mr-8" data-v-56ea47d0>${ssrInterpolate(props.message)}</span><button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" data-v-56ea47d0><span data-v-56ea47d0>×</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Toast.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Toast = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-56ea47d0"]]);
const _sfc_main = {
  __name: "Start",
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
    hostName: {
      type: String,
      default: ""
    },
    story: {
      type: Object,
      default: {}
    },
    userCards: {
      type: Object,
      default: {}
    },
    cardGroupTypes: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage().props;
    let showToast = ref(true);
    setTimeout(() => {
      showToast.value = false;
    }, 3e3);
    let cards = ref([]);
    Object.values(props.cardGroupTypes).forEach((cardGroupType, key) => {
      cards.value[key] = [];
    });
    let nextUserId = ref(props.hostId);
    let nextUsername = ref(props.hostName);
    let wonUsername = ref("");
    let users = ref([]);
    const checkMove = (event) => {
      var _a, _b, _c;
      if (nextUserId.value != page.auth.user.id) {
        return false;
      }
      const draggedItem = event.draggedContext.element;
      const targetList = event.relatedContext.list;
      if (draggedItem.order == 0 && (targetList == null ? void 0 : targetList.length) > 0) {
        return true;
      }
      const validMove = targetList == null ? void 0 : targetList.every(
        (item) => item.card_group_id === draggedItem.card_group_id || item.order == 0
      );
      if ((targetList == null ? void 0 : targetList.length) == 0 && draggedItem.order != 1) {
        return false;
      }
      if (((_a = targetList[0]) == null ? void 0 : _a.order) && ((_b = targetList[0]) == null ? void 0 : _b.order) + 1 != draggedItem.order) {
        return false;
      }
      if (validMove && ((_c = targetList[0]) == null ? void 0 : _c.order) + 1 == draggedItem.order) {
        return true;
      }
      return validMove;
    };
    const orderCards = () => {
      cards.value.forEach((cardGroup) => {
        cardGroup == null ? void 0 : cardGroup.sort((a, b) => b.order - a.order);
      });
      axios.post(route("lobby.turn", props.lobbyId), {
        cards: cards.value,
        users: users.value,
        nextUserId: nextUserId.value
      }).then(() => {
      });
    };
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
      echo.join(`chat.${props.lobbyId}`).here((data) => {
        initials.value = data.map(function(user) {
          users.value.push(user.id);
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
        axios.delete(route("lobby.leave", [props.lobbyId, user.id])).then(() => {
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
      }).listen("LobbyTurnChange", (data) => {
        cards.value = data.cards;
        nextUserId.value = data.nextUserId;
        nextUsername.value = data.nextUsername;
      }).listen("UserWin", (data) => {
        wonUsername.value = data.wonUsername;
        showloseToast.value = true;
      }).error((error) => {
        console.error(error);
      });
    });
    onUnmounted(() => {
      echo.leaveAllChannels();
    });
    const pass = () => {
      if (nextUserId.value != page.auth.user.id) {
        alert("Wait for your turn");
        return false;
      }
      const lastItems = cards.value.map(
        (arr) => arr.length > 0 ? arr[arr.length - 1] : null
      );
      for (const item of lastItems) {
        for (const card of props.userCards[page.auth.user.id]) {
          if ((card == null ? void 0 : card.order) + 1 == (item == null ? void 0 : item.order) && (card == null ? void 0 : card.group_card_id) == (item == null ? void 0 : item.group_card_id) || (card == null ? void 0 : card.order) == 1 && !item || (card == null ? void 0 : card.order) === 0) {
            alert("Can't pass, you can play");
            return false;
          }
        }
      }
      orderCards();
    };
    let showWinToast = ref(false);
    let showloseToast = ref(false);
    watch(props.userCards[page.auth.user.id], (newVal) => {
      if (newVal.length === 0) {
        showWinToast.value = true;
        axios.post(route("lobby.win", props.lobbyId), {
          wonUserId: page.auth.user.id
        }).then(() => {
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(unref(props).name)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(unref(props).name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(Toast, {
                show: unref(showToast),
                type: "success",
                onClose: ($event) => isRef(showToast) ? showToast.value = false : showToast = false,
                message: unref(trans)("words.game_started")
              }, null, _parent2, _scopeId));
            }, "#toasts", false, _parent2);
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(Toast, {
                show: unref(showWinToast),
                type: "success",
                onClose: ($event) => isRef(showWinToast) ? showWinToast.value = false : showWinToast = false,
                message: unref(trans)("words.you_won")
              }, null, _parent2, _scopeId));
            }, "#toasts", false, _parent2);
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(Toast, {
                show: unref(showloseToast),
                type: "danger",
                onClose: ($event) => isRef(showloseToast) ? showloseToast.value = false : showloseToast = false,
                message: `${unref(wonUsername)} ${unref(trans)("words.won")}, ${unref(trans)(
                  "words.you_lost"
                )}`
              }, null, _parent2, _scopeId));
            }, "#toasts", false, _parent2);
            _push2(`<header class="p-2 text-lg font-bold flex items-center justify-between"${_scopeId}><h2 class=""${_scopeId}>${ssrInterpolate(unref(props).name)}</h2><p${_scopeId}>${ssrInterpolate(unref(trans)("words.max_players"))} : ${ssrInterpolate(unref(props).max_players)}</p></header><p class="font-bold px-4 py-2 bg-stone-800 text-white"${_scopeId}>${ssrInterpolate(unref(nextUsername))} turn </p><main class="relative bg-green-600 h-[70vh] py-12 px-16"${_scopeId}><section class="absolute top-1 left-[50%] transform -translate-x-1/2 flex items-center justify-center flex-col text-white text-sm"${_scopeId}><p${_scopeId}>${ssrInterpolate((_a = unref(initials)[3]) == null ? void 0 : _a.fullname)}</p><span${_scopeId}>0</span></section><section class="absolute top-[50%] left-1 transform -translate-y-1/2 flex items-center justify-center flex-col text-white text-sm"${_scopeId}><p${_scopeId}>${ssrInterpolate((_b = unref(initials)[1]) == null ? void 0 : _b.fullname)}</p><span${_scopeId}>0</span></section><section class="absolute top-[50%] right-1 transform -translate-y-1/2 flex items-center justify-center flex-col text-white text-sm"${_scopeId}><p${_scopeId}>${ssrInterpolate((_c = unref(initials)[2]) == null ? void 0 : _c.fullname)}</p><span${_scopeId}>0</span></section><section class="absolute bottom-1 right-[50%] transform translate-x-1/2 flex items-center justify-center flex-col text-white text-sm"${_scopeId}><p${_scopeId}>${ssrInterpolate((_d = unref(initials)[0]) == null ? void 0 : _d.fullname)}</p><span${_scopeId}>0</span></section><section class="relative flex overflow-x-auto h-full rounded-lg bg-blue-200"${_scopeId}><!--[-->`);
            ssrRenderList(Object.values(__props.cardGroupTypes), (cardGroupType, key) => {
              _push2(`<section class="p-1 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Draggable), {
                list: unref(cards)[key],
                group: "cards",
                itemKey: "id",
                move: checkMove,
                onChange: orderCards
              }, {
                item: withCtx(({ element, index }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="bg-slate-700 p-1 my-1 cursor-pointer rounded-lg"${_scopeId2}><p class="block mb-1 text-lg text-gray-100"${_scopeId2}>${ssrInterpolate(element == null ? void 0 : element.name)}</p><p class="text-white truncate"${_scopeId2}>${ssrInterpolate(element == null ? void 0 : element.description)}</p><section class="flex items-center justify-between my-1"${_scopeId2}><p class="text-gray-200 font-bold"${_scopeId2}>${ssrInterpolate(__props.cardGroupTypes[element == null ? void 0 : element.card_group_id])}</p><p class="text-gray-200 font-bold"${_scopeId2}>${ssrInterpolate(element == null ? void 0 : element.order)}</p></section></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "bg-slate-700 p-1 my-1 cursor-pointer rounded-lg" }, [
                        createVNode("p", { class: "block mb-1 text-lg text-gray-100" }, toDisplayString(element == null ? void 0 : element.name), 1),
                        createVNode("p", { class: "text-white truncate" }, toDisplayString(element == null ? void 0 : element.description), 1),
                        createVNode("section", { class: "flex items-center justify-between my-1" }, [
                          createVNode("p", { class: "text-gray-200 font-bold" }, toDisplayString(__props.cardGroupTypes[element == null ? void 0 : element.card_group_id]), 1),
                          createVNode("p", { class: "text-gray-200 font-bold" }, toDisplayString(element == null ? void 0 : element.order), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</section>`);
            });
            _push2(`<!--]--></section></main>`);
            _push2(ssrRenderComponent(unref(Draggable), {
              class: "flex items-center justify-center gap-1 bg-red-400 px-2 py-1 overflow-x-auto flex-wrap",
              list: unref(props).userCards[unref(page).auth.user.id],
              group: "cards",
              itemKey: "id",
              move: checkMove,
              onChange: orderCards
            }, {
              item: withCtx(({ element, index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-slate-700 p-1 my-1 cursor-pointer rounded-lg w-40"${_scopeId2}><p class="block mb-1 text-lg text-gray-100"${_scopeId2}>${ssrInterpolate(element.name)}</p><p class="text-white truncate"${_scopeId2}>${ssrInterpolate(element.description)}</p><section class="flex items-center justify-between my-1"${_scopeId2}><p class="text-gray-200 font-bold"${_scopeId2}>${ssrInterpolate(__props.cardGroupTypes[element == null ? void 0 : element.card_group_id])}</p><p class="text-gray-200 font-bold"${_scopeId2}>${ssrInterpolate(element == null ? void 0 : element.order)}</p></section></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-slate-700 p-1 my-1 cursor-pointer rounded-lg w-40" }, [
                      createVNode("p", { class: "block mb-1 text-lg text-gray-100" }, toDisplayString(element.name), 1),
                      createVNode("p", { class: "text-white truncate" }, toDisplayString(element.description), 1),
                      createVNode("section", { class: "flex items-center justify-between my-1" }, [
                        createVNode("p", { class: "text-gray-200 font-bold" }, toDisplayString(__props.cardGroupTypes[element == null ? void 0 : element.card_group_id]), 1),
                        createVNode("p", { class: "text-gray-200 font-bold" }, toDisplayString(element == null ? void 0 : element.order), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<section${_scopeId}><button class="btn btn-primary w-[80vw] h-8 mx-auto my-2"${_scopeId}> Pass </button></section><section${_scopeId}><p${_scopeId}>PDF</p><iframe${ssrRenderAttr("src", __props.story.pdf)} width="100%" height="600px" frameborder="0"${_scopeId}></iframe></section>`);
          } else {
            return [
              (openBlock(), createBlock(Teleport, { to: "#toasts" }, [
                createVNode(Toast, {
                  show: unref(showToast),
                  type: "success",
                  onClose: ($event) => isRef(showToast) ? showToast.value = false : showToast = false,
                  message: unref(trans)("words.game_started")
                }, null, 8, ["show", "onClose", "message"])
              ])),
              (openBlock(), createBlock(Teleport, { to: "#toasts" }, [
                createVNode(Toast, {
                  show: unref(showWinToast),
                  type: "success",
                  onClose: ($event) => isRef(showWinToast) ? showWinToast.value = false : showWinToast = false,
                  message: unref(trans)("words.you_won")
                }, null, 8, ["show", "onClose", "message"])
              ])),
              (openBlock(), createBlock(Teleport, { to: "#toasts" }, [
                createVNode(Toast, {
                  show: unref(showloseToast),
                  type: "danger",
                  onClose: ($event) => isRef(showloseToast) ? showloseToast.value = false : showloseToast = false,
                  message: `${unref(wonUsername)} ${unref(trans)("words.won")}, ${unref(trans)(
                    "words.you_lost"
                  )}`
                }, null, 8, ["show", "onClose", "message"])
              ])),
              createVNode("header", { class: "p-2 text-lg font-bold flex items-center justify-between" }, [
                createVNode("h2", { class: "" }, toDisplayString(unref(props).name), 1),
                createVNode("p", null, toDisplayString(unref(trans)("words.max_players")) + " : " + toDisplayString(unref(props).max_players), 1)
              ]),
              createVNode("p", { class: "font-bold px-4 py-2 bg-stone-800 text-white" }, toDisplayString(unref(nextUsername)) + " turn ", 1),
              createVNode("main", { class: "relative bg-green-600 h-[70vh] py-12 px-16" }, [
                createVNode("section", { class: "absolute top-1 left-[50%] transform -translate-x-1/2 flex items-center justify-center flex-col text-white text-sm" }, [
                  createVNode("p", null, toDisplayString((_e = unref(initials)[3]) == null ? void 0 : _e.fullname), 1),
                  createVNode("span", null, "0")
                ]),
                createVNode("section", { class: "absolute top-[50%] left-1 transform -translate-y-1/2 flex items-center justify-center flex-col text-white text-sm" }, [
                  createVNode("p", null, toDisplayString((_f = unref(initials)[1]) == null ? void 0 : _f.fullname), 1),
                  createVNode("span", null, "0")
                ]),
                createVNode("section", { class: "absolute top-[50%] right-1 transform -translate-y-1/2 flex items-center justify-center flex-col text-white text-sm" }, [
                  createVNode("p", null, toDisplayString((_g = unref(initials)[2]) == null ? void 0 : _g.fullname), 1),
                  createVNode("span", null, "0")
                ]),
                createVNode("section", { class: "absolute bottom-1 right-[50%] transform translate-x-1/2 flex items-center justify-center flex-col text-white text-sm" }, [
                  createVNode("p", null, toDisplayString((_h = unref(initials)[0]) == null ? void 0 : _h.fullname), 1),
                  createVNode("span", null, "0")
                ]),
                createVNode("section", { class: "relative flex overflow-x-auto h-full rounded-lg bg-blue-200" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(Object.values(__props.cardGroupTypes), (cardGroupType, key) => {
                    return openBlock(), createBlock("section", { class: "p-1 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto" }, [
                      createVNode(unref(Draggable), {
                        list: unref(cards)[key],
                        group: "cards",
                        itemKey: "id",
                        move: checkMove,
                        onChange: orderCards
                      }, {
                        item: withCtx(({ element, index }) => [
                          createVNode("div", { class: "bg-slate-700 p-1 my-1 cursor-pointer rounded-lg" }, [
                            createVNode("p", { class: "block mb-1 text-lg text-gray-100" }, toDisplayString(element == null ? void 0 : element.name), 1),
                            createVNode("p", { class: "text-white truncate" }, toDisplayString(element == null ? void 0 : element.description), 1),
                            createVNode("section", { class: "flex items-center justify-between my-1" }, [
                              createVNode("p", { class: "text-gray-200 font-bold" }, toDisplayString(__props.cardGroupTypes[element == null ? void 0 : element.card_group_id]), 1),
                              createVNode("p", { class: "text-gray-200 font-bold" }, toDisplayString(element == null ? void 0 : element.order), 1)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["list"])
                    ]);
                  }), 256))
                ])
              ]),
              createVNode(unref(Draggable), {
                class: "flex items-center justify-center gap-1 bg-red-400 px-2 py-1 overflow-x-auto flex-wrap",
                list: unref(props).userCards[unref(page).auth.user.id],
                group: "cards",
                itemKey: "id",
                move: checkMove,
                onChange: orderCards
              }, {
                item: withCtx(({ element, index }) => [
                  createVNode("div", { class: "bg-slate-700 p-1 my-1 cursor-pointer rounded-lg w-40" }, [
                    createVNode("p", { class: "block mb-1 text-lg text-gray-100" }, toDisplayString(element.name), 1),
                    createVNode("p", { class: "text-white truncate" }, toDisplayString(element.description), 1),
                    createVNode("section", { class: "flex items-center justify-between my-1" }, [
                      createVNode("p", { class: "text-gray-200 font-bold" }, toDisplayString(__props.cardGroupTypes[element == null ? void 0 : element.card_group_id]), 1),
                      createVNode("p", { class: "text-gray-200 font-bold" }, toDisplayString(element == null ? void 0 : element.order), 1)
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["list"]),
              createVNode("section", null, [
                createVNode("button", {
                  onClick: pass,
                  class: "btn btn-primary w-[80vw] h-8 mx-auto my-2"
                }, " Pass ")
              ]),
              createVNode("section", null, [
                createVNode("p", null, "PDF"),
                createVNode("iframe", {
                  src: __props.story.pdf,
                  width: "100%",
                  height: "600px",
                  frameborder: "0"
                }, null, 8, ["src"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lobby/Start.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { computed, mergeProps, unref, useSSRContext, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withModifiers } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./GuestLayout-b0684c6d.mjs";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./TextInput-66ab7a8d.mjs";
import { _ as _sfc_main$3 } from "./InputLabel-f67e6be2.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./Footer-1c20d405.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "laravel-vue-i18n";
const _sfc_main$1 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      default: false
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit }) {
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(unref(proxyChecked)) ? ssrLooseContain(unref(proxyChecked), __props.value) : unref(proxyChecked),
        class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(proxyChecked)))))}>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: Boolean,
    status: String
  },
  setup(__props) {
    const form = useForm({
      input_type: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Login" }, null, _parent2, _scopeId));
            _push2(`<main class="grid place-items-center"${_scopeId}><section class="p-8 my-4 bg-zinc-300 w-full rounded-lg md:container"${_scopeId}>`);
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "underline float-right text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.trans("words.register"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.trans("words.register")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "input_type",
              value: _ctx.trans("words.email_username")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "input_type",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).input_type,
              "onUpdate:modelValue": ($event) => unref(form).input_type = $event,
              autofocus: "",
              autocomplete: "username",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.username
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "password",
              value: _ctx.trans("words.password")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="block mt-4"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-2 text-sm"${_scopeId}>${ssrInterpolate(_ctx.trans("words.remember_me"))}</span></label></div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "underline text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.trans("words.forgot_your_password"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.trans("words.forgot_your_password")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "ml-4 btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.trans("words.login"))}</button></div></form></section></main>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Login" }),
              createVNode("main", { class: "grid place-items-center" }, [
                createVNode("section", { class: "p-8 my-4 bg-zinc-300 w-full rounded-lg md:container" }, [
                  __props.status ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4 font-medium text-sm text-green-600"
                  }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
                  createVNode(unref(Link), {
                    href: _ctx.route("register"),
                    class: "underline float-right text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.trans("words.register")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$3, {
                        for: "input_type",
                        value: _ctx.trans("words.email_username")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$4, {
                        id: "input_type",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).input_type,
                        "onUpdate:modelValue": ($event) => unref(form).input_type = $event,
                        autofocus: "",
                        autocomplete: "username",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.username
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(_sfc_main$3, {
                        for: "password",
                        value: _ctx.trans("words.password")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$4, {
                        id: "password",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        autocomplete: "current-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "block mt-4" }, [
                      createVNode("label", { class: "flex items-center" }, [
                        createVNode(_sfc_main$1, {
                          name: "remember",
                          checked: unref(form).remember,
                          "onUpdate:checked": ($event) => unref(form).remember = $event
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("span", { class: "ml-2 text-sm" }, toDisplayString(_ctx.trans("words.remember_me")), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                      __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: _ctx.route("password.request"),
                        class: "underline text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.trans("words.forgot_your_password")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true),
                      createVNode("button", {
                        class: ["ml-4 btn btn-primary", { "opacity-25": unref(form).processing }],
                        disabled: unref(form).processing
                      }, toDisplayString(_ctx.trans("words.login")), 11, ["disabled"])
                    ])
                  ], 40, ["onSubmit"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

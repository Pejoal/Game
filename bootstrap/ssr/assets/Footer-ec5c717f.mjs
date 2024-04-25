import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, onMounted, onUnmounted, computed, ref, createVNode, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { Link, usePage } from "@inertiajs/vue3";
import { loadLanguageAsync } from "laravel-vue-i18n";
const _sfc_main$4 = {
  __name: "Navigations",
  __ssrInlineRender: true,
  props: {
    horizontal: {
      tpye: Boolean,
      default: false
    },
    vertical: {
      tpye: Boolean,
      default: false
    },
    dark: {
      tpye: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: {
          "hidden md:flex items-center justify-center gap-2": props.horizontal,
          "flex flex-col space-y-2 px-4": props.vertical
        }
      }, _attrs))}>`);
      if (["admin", "super admin"].includes((_b = (_a = _ctx.$page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.type)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.dashboard"),
          class: ["hover:font-bold", {
            "text-zinc-700 hover:text-zinc-800": props.dark,
            "underline font-bold": _ctx.route().current("admin.dashboard")
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("words.dashboard"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("words.dashboard")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.mode"),
          class: ["hover:font-bold", {
            "text-zinc-700 hover:text-zinc-800": props.dark,
            "underline  font-bold": _ctx.route().current("admin.mode")
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("words.mode"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("words.mode")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (((_d = (_c = _ctx.$page.props.auth) == null ? void 0 : _c.user) == null ? void 0 : _d.type) === "client") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("home"),
          class: ["hover:font-bold", {
            "text-zinc-700 hover:text-zinc-800": props.dark,
            "underline  font-bold": _ctx.route().current("home")
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("words.home"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("words.home")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("user.profile.me"),
          class: ["hover:font-bold", {
            "text-zinc-700 hover:text-zinc-800": props.dark,
            "underline  font-bold": _ctx.route().current("user.profile.me")
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("words.my_data"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("words.my_data")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.auth.user) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("profile.edit"),
          class: ["hover:font-bold", {
            "text-zinc-700 hover:text-zinc-800": props.dark,
            "underline  font-bold": _ctx.route().current("profile.edit")
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("words.settings"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("words.settings")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: ["hover:font-bold", {
            "text-zinc-700 hover:text-zinc-800": props.dark,
            "underline  font-bold": _ctx.route().current("login")
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("words.login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("words.login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Navigations.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Hamburger_vue_vue_type_style_index_0_scoped_963fbf2a_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  __name: "Hamburger",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    dark: {
      tpye: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["hamburger-icon", { active: __props.show }]
      }, _attrs))} data-v-963fbf2a><span class="${ssrRenderClass([{ "bg-black": props.dark }, "bar bg-white"])}" data-v-963fbf2a></span><span class="${ssrRenderClass([{ "bg-black": props.dark }, "bar bg-white"])}" data-v-963fbf2a></span><span class="${ssrRenderClass([{ "bg-black": props.dark }, "bar bg-white"])}" data-v-963fbf2a></span></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Hamburger.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Hamburger = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-963fbf2a"]]);
const _sfc_main$2 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      default: "right"
    },
    width: {
      default: "48"
    },
    contentClasses: {
      default: () => ["py-1", "bg-white"]
    }
  },
  setup(__props) {
    const props = __props;
    const closeOnEscape = (e) => {
      if (open.value && e.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "origin-top-left left-0";
      } else if (props.align === "right") {
        return "origin-top-right right-0";
      } else {
        return "origin-top";
      }
    });
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(open.value ? null : { display: "none" })}" class="fixed inset-0 z-40"></div><div style="${ssrRenderStyle([
        open.value ? null : { display: "none" },
        { "display": "none" }
      ])}" class="${ssrRenderClass([[unref(widthClass), unref(alignmentClasses)], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Locales",
  __ssrInlineRender: true,
  props: {
    horizontal: {
      tpye: Boolean,
      default: false
    },
    vertical: {
      tpye: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage().props;
    if (page.active_locale_code) {
      loadLanguageAsync(page.active_locale_code);
    }
    const active_locale = (locale, url) => {
      location.href = url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: {
          "hidden md:flex items-center space-x-2 relative": props.horizontal,
          "py-2 my-2 border-b flex justify-between items-center": props.vertical
        }
      }, _attrs))}><p>${ssrInterpolate(_ctx.trans("words.choose_locale"))}</p>`);
      _push(ssrRenderComponent(_sfc_main$2, { width: "48" }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"${_scopeId}><svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "ml-2 -mr-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.$page.props.locales, (locale, code) => {
              _push2(`<button class="${ssrRenderClass([
                code === _ctx.$page.props.active_locale_code ? "bg-zinc-900 text-white" : "text-gray-900 hover:text-white",
                "flex justify-between items-center w-full p-2 bg-white hover:bg-zinc-900"
              ])}"${_scopeId}><span${_scopeId}>${ssrInterpolate(locale.native)}</span><span${_scopeId}>${ssrInterpolate(locale.emoji)}</span></button>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.locales, (locale, code) => {
                return openBlock(), createBlock("button", {
                  class: [
                    "flex justify-between items-center w-full p-2 bg-white hover:bg-zinc-900",
                    code === _ctx.$page.props.active_locale_code ? "bg-zinc-900 text-white" : "text-gray-900 hover:text-white"
                  ],
                  onClick: ($event) => active_locale(code, locale.url),
                  key: code
                }, [
                  createVNode("span", null, toDisplayString(locale.native), 1),
                  createVNode("span", null, toDisplayString(locale.emoji), 1)
                ], 10, ["onClick"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Locales.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-900 text-white py-8" }, _attrs))}> Footer </footer>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Partials/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  Hamburger as H,
  _sfc_main$1 as _,
  _sfc_main$4 as a,
  _sfc_main as b,
  _export_sfc as c
};

import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, H as Hamburger, b as _sfc_main$3 } from "./Footer-ec5c717f.mjs";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const showNav = ref(false);
    const toggleNav = () => {
      showNav.value = !showNav.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100" }, _attrs))}><header class="flex items-center justify-between h-20 bg-zinc-400 py-2 px-4 sm:px-6 lg:px-8"><section class="flex items-center gap-2">`);
      if ((_b = (_a = _ctx.$page) == null ? void 0 : _a.props) == null ? void 0 : _b.logo) {
        _push(`<img class="rounded-full w-14 h-14 md:w-16 md:h-16"${ssrRenderAttr("src", (_d = (_c = _ctx.$page) == null ? void 0 : _c.props) == null ? void 0 : _d.logo)}${ssrRenderAttr("alt", _ctx.trans("words.logo"))}>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Link), {
        class: "font-bold text-xl",
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("words.game"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("words.game")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(_sfc_main$1, { horizontal: true }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { horizontal: true }, null, _parent));
      _push(ssrRenderComponent(Hamburger, {
        class: "md:hidden",
        onClose: toggleNav,
        show: showNav.value
      }, null, _parent));
      if (showNav.value) {
        _push(`<div class="md:hidden bg-slate-200 fixed inset-y-0 left-0 z-40 w-full h-screen shadow-lg px-8 py-4 overflow-y-auto"><h2 class="text-xl font-bold mb-2">${ssrInterpolate(_ctx.trans("words.navigation"))}</h2>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          class: "pb-4",
          vertical: true
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "border-t",
          vertical: true
        }, null, _parent));
        _push(`<div class="py-2 border-b">`);
        _push(ssrRenderComponent(unref(Link), {
          class: "btn btn-danger",
          href: _ctx.route("logout"),
          method: "post",
          as: "button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("words.logout"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("words.logout")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><button class="mt-4 px-3 py-1 hover:font-bold rounded-md">${ssrInterpolate(_ctx.trans("words.close"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showNav.value) {
        _push(`<div class="fixed inset-0 bg-black opacity-25 z-30"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};

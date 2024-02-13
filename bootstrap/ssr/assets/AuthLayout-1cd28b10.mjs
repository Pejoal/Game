import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2, H as Hamburger, b as _sfc_main$3 } from "./Footer-11875b49.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
const AuthLayout_vue_vue_type_style_index_0_scoped_8d06dbe3_lang = "";
const _sfc_main = {
  __name: "AuthLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const showNav = ref(false);
    const toggleNav = () => {
      showNav.value = !showNav.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-200" }, _attrs))} data-v-8d06dbe3><header class="bg-zinc-400 flex items-center justify-between h-20 py-2 px-4 sm:px-6 lg:px-8" data-v-8d06dbe3><section class="flex items-center gap-2" data-v-8d06dbe3>`);
      if ((_c = (_b = (_a = _ctx.$page) == null ? void 0 : _a.props) == null ? void 0 : _b.auth) == null ? void 0 : _c.user.profile_photo_url) {
        _push(`<img class="rounded-full w-14 h-14 md:w-16 md:h-16"${ssrRenderAttr("src", (_f = (_e = (_d = _ctx.$page) == null ? void 0 : _d.props) == null ? void 0 : _e.auth) == null ? void 0 : _f.user.profile_photo_url)}${ssrRenderAttr("alt", _ctx.trans("words.profile_photo"))} data-v-8d06dbe3>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Link), {
        class: "font-bold text-xl",
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.auth.user.firstname)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.auth.user.firstname), 1)
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
        _push(`<div class="md:hidden bg-slate-200 fixed inset-y-0 left-0 z-40 w-full h-screen shadow-lg px-8 py-4 overflow-y-auto" data-v-8d06dbe3><h2 class="text-xl font-bold mb-2" data-v-8d06dbe3>${ssrInterpolate(_ctx.trans("words.navigation"))}</h2>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          class: "pb-4",
          vertical: true
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "border-t",
          vertical: true
        }, null, _parent));
        _push(`<div class="py-2 border-b" data-v-8d06dbe3>`);
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
        _push(`</div><button class="mt-4 px-3 py-1 hover:font-bold rounded-md" data-v-8d06dbe3>${ssrInterpolate(_ctx.trans("words.close"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showNav.value) {
        _push(`<div class="fixed inset-0 bg-black opacity-25 z-30" data-v-8d06dbe3></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><main class="lg:container lg:mx-auto" data-v-8d06dbe3><div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-10" data-v-8d06dbe3><div class="hidden" data-v-8d06dbe3>`);
      ssrRenderSlot(_ctx.$slots, "left-sidebar", {}, () => {
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
      }, _push, _parent);
      _push(`</div><section class="md:col-span-2" data-v-8d06dbe3>`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</section><div class="hidden" data-v-8d06dbe3>`);
      ssrRenderSlot(_ctx.$slots, "right-sidebar", {}, null, _push, _parent);
      _push(`</div></div></main>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AuthLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d06dbe3"]]);
export {
  AuthLayout as A
};

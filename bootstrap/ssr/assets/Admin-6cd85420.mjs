import { unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-b39e6883.mjs";
import { Head } from "@inertiajs/vue3";
import "./Locales-9be1f4f4.mjs";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "Admin",
  __ssrInlineRender: true,
  props: {
    text_questions_count: Number,
    math_questions_count: Number,
    photo_questions_count: Number,
    video_questions_count: Number
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.trans("words.quiz"))}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.trans("words.quiz")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="p-4 space-y-2"${_scopeId}> Quiz </main>`);
          } else {
            return [
              createVNode("main", { class: "p-4 space-y-2" }, " Quiz ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Quiz/Admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

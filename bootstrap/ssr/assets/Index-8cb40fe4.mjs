import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-ea10b4fc.mjs";
import { Head } from "@inertiajs/vue3";
import "./Footer-ec5c717f.mjs";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    previousDates: {
      type: Object,
      default: {}
    },
    upcomingDates: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("words.my_data")
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="p-4"${_scopeId}>hey</section>`);
          } else {
            return [
              createVNode("section", { class: "p-4" }, "hey")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

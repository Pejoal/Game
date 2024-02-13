import { unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import _sfc_main$1 from "./Questions-b61f7b57.mjs";
import { A as AuthLayout } from "./AuthLayout-1cd28b10.mjs";
import { Head } from "@inertiajs/vue3";
import "./ResuableModal-2ed3759c.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Toast-0297fd7e.mjs";
import "laravel-vue-i18n";
import "./QuestionLocales-2c5994b2.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./Footer-11875b49.mjs";
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
        "left-sidebar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2)
            ;
          else {
            return [];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="p-4 space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              type: "text",
              questions_count: __props.text_questions_count
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              type: "math",
              questions_count: __props.math_questions_count
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              type: "photo",
              questions_count: __props.photo_questions_count
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              type: "video",
              questions_count: __props.video_questions_count
            }, null, _parent2, _scopeId));
            _push2(`</main>`);
          } else {
            return [
              createVNode("main", { class: "p-4 space-y-2" }, [
                createVNode(_sfc_main$1, {
                  type: "text",
                  questions_count: __props.text_questions_count
                }, null, 8, ["questions_count"]),
                createVNode(_sfc_main$1, {
                  type: "math",
                  questions_count: __props.math_questions_count
                }, null, 8, ["questions_count"]),
                createVNode(_sfc_main$1, {
                  type: "photo",
                  questions_count: __props.photo_questions_count
                }, null, 8, ["questions_count"]),
                createVNode(_sfc_main$1, {
                  type: "video",
                  questions_count: __props.video_questions_count
                }, null, 8, ["questions_count"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Quiz/Admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

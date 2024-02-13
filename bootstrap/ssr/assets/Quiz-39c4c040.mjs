import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Quiz",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: true
    },
    questions_count: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-slate-300 rounded-lg p-2" }, _attrs))}><h3 class="text-center text-lg font-bold mt-2 mb-3">${ssrInterpolate(_ctx.trans(`words.${__props.type}_questions`))}</h3><section class="flex items-center justify-between"><p>${ssrInterpolate(__props.questions_count)} ${ssrInterpolate(_ctx.trans("words.questions"))}</p><section class="flex gap-2">`);
      _push(ssrRenderComponent(unref(Link), {
        class: "btn btn-primary",
        href: _ctx.route("quiz.quizByType", __props.type)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("words.start_quiz"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("words.start_quiz")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></section></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Quiz/Partials/Quiz.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

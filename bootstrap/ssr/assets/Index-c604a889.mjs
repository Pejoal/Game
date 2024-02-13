import { unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import _sfc_main$1 from "./Appointments-88c27fb6.mjs";
import { A as AuthLayout } from "./AuthLayout-1cd28b10.mjs";
import { Head } from "@inertiajs/vue3";
import "./ResuableModal-2ed3759c.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./AppointmentModal-91aba976.mjs";
import "./Footer-11875b49.mjs";
import "./Dropdown-d2a4ee41.mjs";
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
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("words.my_data")
      }, null, _parent));
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
            _push2(`<section class="p-4"${_scopeId}><header class="flex items-center justify-center mb-2"${_scopeId}><h2 class="text-xl font-bold pb-1 border-b border-b-black"${_scopeId}>${ssrInterpolate(_ctx.trans("words.my_appointments"))}</h2></header><h2 class="text-lg font-bold text-center"${_scopeId}>${ssrInterpolate(_ctx.trans("words.upcoming_appointments"))}</h2>`);
            if (unref(props).upcomingDates != {}) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(props).upcomingDates, (date) => {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  key: date.id,
                  date
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<h4 class="text-lg"${_scopeId}>${ssrInterpolate(_ctx.trans("words.there_are_no_upcoming_appointments"))}</h4>`);
            }
            _push2(`<h2 class="text-lg font-bold text-center"${_scopeId}>${ssrInterpolate(_ctx.trans("words.previous_appointments"))}</h2>`);
            if (unref(props).previousDates != {}) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(props).previousDates, (date) => {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  key: date.id,
                  date
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<h4 class="text-lg"${_scopeId}>${ssrInterpolate(_ctx.trans("words.there_are_no_previous_appointments"))}</h4>`);
            }
            _push2(`</section>`);
          } else {
            return [
              createVNode("section", { class: "p-4" }, [
                createVNode("header", { class: "flex items-center justify-center mb-2" }, [
                  createVNode("h2", { class: "text-xl font-bold pb-1 border-b border-b-black" }, toDisplayString(_ctx.trans("words.my_appointments")), 1)
                ]),
                createVNode("h2", { class: "text-lg font-bold text-center" }, toDisplayString(_ctx.trans("words.upcoming_appointments")), 1),
                unref(props).upcomingDates != {} ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(props).upcomingDates, (date) => {
                  return openBlock(), createBlock(_sfc_main$1, {
                    key: date.id,
                    date
                  }, null, 8, ["date"]);
                }), 128)) : (openBlock(), createBlock("h4", {
                  key: 1,
                  class: "text-lg"
                }, toDisplayString(_ctx.trans("words.there_are_no_upcoming_appointments")), 1)),
                createVNode("h2", { class: "text-lg font-bold text-center" }, toDisplayString(_ctx.trans("words.previous_appointments")), 1),
                unref(props).previousDates != {} ? (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(props).previousDates, (date) => {
                  return openBlock(), createBlock(_sfc_main$1, {
                    key: date.id,
                    date
                  }, null, 8, ["date"]);
                }), 128)) : (openBlock(), createBlock("h4", {
                  key: 3,
                  class: "text-lg"
                }, toDisplayString(_ctx.trans("words.there_are_no_previous_appointments")), 1))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

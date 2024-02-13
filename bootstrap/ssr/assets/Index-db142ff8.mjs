import { ref, unref, withCtx, createVNode, toDisplayString, isRef, openBlock, createBlock, Teleport, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderTeleport, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-1cd28b10.mjs";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./AvailableAppointment-e43fcce7.mjs";
import { T as Toast } from "./Toast-0297fd7e.mjs";
import "./Footer-11875b49.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "laravel-vue-i18n";
import "./ResuableModal-2ed3759c.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    appointments: {
      tpye: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    let showUpdatedToast = ref(false);
    const save = () => {
      showUpdatedToast.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.trans("words.appointments"))}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.trans("words.appointments")), 1)
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
            _push2(`<section class="p-4 overflow-x-auto"${_scopeId}><header class="flex items-center justify-center"${_scopeId}><h2 class="text-xl font-bold"${_scopeId}>${ssrInterpolate(_ctx.trans("words.available_appointments"))}</h2></header><main class="flex gap-4"${_scopeId}>`);
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(Toast, {
                show: unref(showUpdatedToast),
                type: "success",
                onClose: ($event) => isRef(showUpdatedToast) ? showUpdatedToast.value = false : showUpdatedToast = false,
                message: _ctx.trans("words.appointment_confirmed")
              }, null, _parent2, _scopeId));
            }, "#toasts", false, _parent2);
            _push2(`<!--[-->`);
            ssrRenderList(props.appointments, (appointment) => {
              _push2(`<section class="flex-1"${_scopeId}><h5 class="text-center"${_scopeId}>${ssrInterpolate(appointment.date)}</h5><h5 class="text-center"${_scopeId}><b${_scopeId}>${ssrInterpolate(appointment.day_name)}</b></h5>`);
              if (!appointment.off) {
                _push2(`<section${_scopeId}><!--[-->`);
                ssrRenderList(appointment.business_hours, (time) => {
                  _push2(ssrRenderComponent(_sfc_main$1, {
                    key: time,
                    onSave: save,
                    appointment,
                    time
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></section>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</section>`);
            });
            _push2(`<!--]--></main></section>`);
          } else {
            return [
              createVNode("section", { class: "p-4 overflow-x-auto" }, [
                createVNode("header", { class: "flex items-center justify-center" }, [
                  createVNode("h2", { class: "text-xl font-bold" }, toDisplayString(_ctx.trans("words.available_appointments")), 1)
                ]),
                createVNode("main", { class: "flex gap-4" }, [
                  (openBlock(), createBlock(Teleport, { to: "#toasts" }, [
                    createVNode(Toast, {
                      show: unref(showUpdatedToast),
                      type: "success",
                      onClose: ($event) => isRef(showUpdatedToast) ? showUpdatedToast.value = false : showUpdatedToast = false,
                      message: _ctx.trans("words.appointment_confirmed")
                    }, null, 8, ["show", "onClose", "message"])
                  ])),
                  (openBlock(true), createBlock(Fragment, null, renderList(props.appointments, (appointment) => {
                    return openBlock(), createBlock("section", { class: "flex-1" }, [
                      createVNode("h5", { class: "text-center" }, toDisplayString(appointment.date), 1),
                      createVNode("h5", { class: "text-center" }, [
                        createVNode("b", null, toDisplayString(appointment.day_name), 1)
                      ]),
                      !appointment.off ? (openBlock(), createBlock("section", { key: 0 }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(appointment.business_hours, (time) => {
                          return openBlock(), createBlock(_sfc_main$1, {
                            key: time,
                            onSave: save,
                            appointment,
                            time
                          }, null, 8, ["appointment", "time"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ]);
                  }), 256))
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Appointments/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

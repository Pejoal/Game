import { ref, mergeProps, unref, isRef, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { R as ResuableModal } from "./ResuableModal-2ed3759c.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./AppointmentModal-91aba976.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Appointment",
  __ssrInlineRender: true,
  props: {
    appointment: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    let showModal = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between bg-white shadow-lg rounded-lg p-2" }, _attrs))}>`);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(ssrRenderComponent(ResuableModal, {
          classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
          header: _ctx.trans("words.update_appointment"),
          show: unref(showModal),
          onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
        }, {
          content: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(ssrRenderComponent(_sfc_main$1, {
                date: __props.appointment,
                onSave: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$1, {
                  date: __props.appointment,
                  onSave: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
                }, null, 8, ["date", "onSave"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }, "#modal", false, _parent);
      _push(`<section><h3>${ssrInterpolate(_ctx.trans("words.requester"))} : <strong>${ssrInterpolate(__props.appointment.requester)}</strong></h3><p>${ssrInterpolate(__props.appointment.date)} ${ssrInterpolate(_ctx.trans("words.at"))} ${ssrInterpolate(__props.appointment.time)}</p></section>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        status: __props.appointment.status
      }, null, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Partials/Appointment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

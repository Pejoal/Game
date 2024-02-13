import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./Appointment-4ec97797.mjs";
import "./ResuableModal-2ed3759c.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./AppointmentModal-91aba976.mjs";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "AppointmentsGroup",
  __ssrInlineRender: true,
  props: {
    appointments: {
      type: Object,
      default: {}
    },
    header: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "p-2 bg-sky-200 rounded-lg space-y-2" }, _attrs))}><h2 class="text-xl font-black">${ssrInterpolate(_ctx.trans(`words.${__props.header}`))}</h2><!--[-->`);
      ssrRenderList(props.appointments, (appointment) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          appointment,
          key: appointment.id
        }, null, _parent));
      });
      _push(`<!--]--></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Partials/AppointmentsGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

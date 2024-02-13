import { mergeProps, useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
const _sfc_main$1 = {
  __name: "AppointmentStatus",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.status == "pending") {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "btn btn-info" }, _attrs))}>${ssrInterpolate(_ctx.trans("words.pending"))}</section>`);
      } else if (__props.status == "approved") {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "btn btn-success" }, _attrs))}>${ssrInterpolate(_ctx.trans("words.approved"))}</section>`);
      } else if (__props.status == "cancelled") {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "btn btn-warning" }, _attrs))}>${ssrInterpolate(_ctx.trans("words.cancelled"))}</section>`);
      } else if (__props.status == "declined") {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "btn btn-danger" }, _attrs))}>${ssrInterpolate(_ctx.trans("words.declined"))}</section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppointmentStatus.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AppointmentModal",
  __ssrInlineRender: true,
  props: {
    date: {
      type: Object,
      default: {},
      required: true
    }
  },
  emits: ["save"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const form = useForm({
      location: props.date.location,
      notes: props.date.notes
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "my-2 bg-zinc-300 mx-2 p-3 rounded-lg" }, _attrs))}><section class="flex items-center justify-between"><p>${ssrInterpolate(props.date.date)} ${ssrInterpolate(_ctx.trans("words.at"))} ${ssrInterpolate(props.date.time)}</p>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        status: props.date.status
      }, null, _parent));
      _push(`</section><form><section class="flex items-center my-2"><label for="location" class="w-24 px-4">${ssrInterpolate(_ctx.trans("words.address"))}</label><input type="text" class="block rounded-lg flex-1 px-2 mx-2 h-10" name="location" id="location"${ssrRenderAttr("placeholder", _ctx.trans("words.address"))}${ssrRenderAttr("value", unref(form).location)} required></section><section class="flex items-center my-2"><label for="notes" class="w-24 px-4">${ssrInterpolate(_ctx.trans("words.notes"))}</label><textarea class="rounded-lg flex-1 px-2 mx-2 h-40" name="notes" id="notes"${ssrRenderAttr("placeholder", _ctx.trans("words.notes"))}>${ssrInterpolate(unref(form).notes)}</textarea></section><footer class="flex items-center justify-center gap-3 flex-wrap"><button type="submit" class="btn btn-primary">${ssrInterpolate(_ctx.trans("words.update_appointment"))}</button>`);
      if (_ctx.$page.props.auth.user.type === "client" && props.date.more_than_24_hours) {
        _push(`<button type="button" class="btn btn-warning">${ssrInterpolate(_ctx.trans("words.cancel_appointment"))}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (["super admin", "admin"].includes(_ctx.$page.props.auth.user.type) && (props.date.more_than_24_hours || _ctx.$props.date.status === "pending")) {
        _push(`<!--[--><button type="button" class="btn btn-success">${ssrInterpolate(_ctx.trans("words.approve_appointment"))}</button><button type="button" class="btn btn-danger">${ssrInterpolate(_ctx.trans("words.decline_appointment"))}</button><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (["super admin", "admin"].includes(_ctx.$page.props.auth.user.type) || props.date.more_than_24_hours) {
        _push(`<button type="button" class="btn btn-danger">${ssrInterpolate(_ctx.trans("words.delete_appointment"))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer></form></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Partials/AppointmentModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppointmentModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
export {
  AppointmentModal as A,
  _sfc_main as _,
  _sfc_main$1 as a
};

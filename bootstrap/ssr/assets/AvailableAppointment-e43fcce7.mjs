import { ref, mergeProps, unref, isRef, withCtx, createVNode, withModifiers, toDisplayString, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { R as ResuableModal } from "./ResuableModal-2ed3759c.mjs";
import { useForm } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "AvailableAppointment",
  __ssrInlineRender: true,
  props: {
    appointment: {
      type: Object,
      default: {}
    },
    time: {
      type: String,
      default: ""
    }
  },
  emits: ["save"],
  setup(__props, { emit: emits }) {
    let showModal = ref(false);
    const form = useForm({
      date: "",
      time: "",
      location: "",
      notes: ""
    });
    const submit = (date, time) => {
      form.date = date;
      form.time = time;
      form.post(route("appointment.reserve"), {
        onSuccess: () => {
          emits("save");
        },
        onFinish: () => form.reset(["date", "time"])
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "my-2 flex items-center justify-center" }, _attrs))}>`);
      if (!__props.appointment.reserved_hours.includes(__props.time)) {
        _push(`<!--[--><button class="btn btn-primary" type="submit">${ssrInterpolate(__props.time)}</button>`);
        _push(ssrRenderComponent(ResuableModal, {
          classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[70%]"],
          header: "Termin vereinbaren",
          show: unref(showModal),
          onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form${_scopeId}><header class="flex items-center justify-center"${_scopeId}><h2 class="w-[80vw] text-lg font-bold py-3 rounded-lg flex justify-center items-center bg-blue-500"${_scopeId}>${ssrInterpolate(__props.appointment["full_date"])} ${ssrInterpolate(_ctx.trans("words.at"))} ${ssrInterpolate(__props.time)}</h2></header><section class="flex items-center justify-start my-2"${_scopeId}><label for="location" class="w-24 px-4"${_scopeId}>${ssrInterpolate(_ctx.trans("words.address"))}</label><input type="text" class="block rounded-lg flex-1 px-2 mx-2 h-10" name="location" id="location"${ssrRenderAttr("placeholder", _ctx.trans("words.address"))}${ssrRenderAttr("value", unref(form).location)} required${_scopeId}></section>`);
              if (unref(form).errors.location) {
                _push2(`<p class="error"${_scopeId}>${ssrInterpolate(unref(form).errors.location)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<section class="flex items-center justify-start my-2"${_scopeId}><label for="notes" class="w-24 px-4"${_scopeId}>${ssrInterpolate(_ctx.trans("words.notes"))}</label><textarea class="rounded-lg flex-1 px-2 mx-2 h-40" name="notes" id="notes"${ssrRenderAttr("placeholder", _ctx.trans("words.notes"))}${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea></section><footer class="flex items-center justify-center"${_scopeId}><button type="submit" class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.trans("words.confirm"))}</button></footer></form>`);
            } else {
              return [
                createVNode("form", {
                  onSubmit: withModifiers(($event) => submit(__props.appointment["full_date"], __props.time), ["prevent"])
                }, [
                  createVNode("header", { class: "flex items-center justify-center" }, [
                    createVNode("h2", { class: "w-[80vw] text-lg font-bold py-3 rounded-lg flex justify-center items-center bg-blue-500" }, toDisplayString(__props.appointment["full_date"]) + " " + toDisplayString(_ctx.trans("words.at")) + " " + toDisplayString(__props.time), 1)
                  ]),
                  createVNode("section", { class: "flex items-center justify-start my-2" }, [
                    createVNode("label", {
                      for: "location",
                      class: "w-24 px-4"
                    }, toDisplayString(_ctx.trans("words.address")), 1),
                    withDirectives(createVNode("input", {
                      type: "text",
                      class: "block rounded-lg flex-1 px-2 mx-2 h-10",
                      name: "location",
                      id: "location",
                      placeholder: _ctx.trans("words.address"),
                      "onUpdate:modelValue": ($event) => unref(form).location = $event,
                      required: ""
                    }, null, 8, ["placeholder", "onUpdate:modelValue"]), [
                      [vModelText, unref(form).location]
                    ])
                  ]),
                  unref(form).errors.location ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "error"
                  }, toDisplayString(unref(form).errors.location), 1)) : createCommentVNode("", true),
                  createVNode("section", { class: "flex items-center justify-start my-2" }, [
                    createVNode("label", {
                      for: "notes",
                      class: "w-24 px-4"
                    }, toDisplayString(_ctx.trans("words.notes")), 1),
                    withDirectives(createVNode("textarea", {
                      class: "rounded-lg flex-1 px-2 mx-2 h-40",
                      name: "notes",
                      id: "notes",
                      placeholder: _ctx.trans("words.notes"),
                      "onUpdate:modelValue": ($event) => unref(form).notes = $event
                    }, "\n              ", 8, ["placeholder", "onUpdate:modelValue"]), [
                      [vModelText, unref(form).notes]
                    ])
                  ]),
                  createVNode("footer", { class: "flex items-center justify-center" }, [
                    createVNode("button", {
                      class: ["btn btn-primary", { "opacity-25": unref(form).processing }],
                      type: "submit",
                      disabled: unref(form).processing
                    }, toDisplayString(_ctx.trans("words.confirm")), 11, ["disabled"])
                  ])
                ], 40, ["onSubmit"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<button class="btn btn-secondary" disabled>${ssrInterpolate(__props.time)}</button>`);
      }
      _push(`</main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Appointments/Partials/AvailableAppointment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

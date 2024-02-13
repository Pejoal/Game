import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
const Toast_vue_vue_type_style_index_0_scoped_56ea47d0_lang = "";
const _sfc_main = {
  __name: "Toast",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    message: String | Boolean,
    type: String
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    setTimeout(() => {
      emit("close");
    }, 7e3);
    return (_ctx, _push, _parent, _attrs) => {
      if (props.show) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-56ea47d0><div class="${ssrRenderClass([[{ "bg-red-500": props.type == "danger" }], "toast-container transition-all relative bg-green-500 text-white px-6 py-4 border-0 rounded-lg my-4 z-50"])}" data-v-56ea47d0><span class="text-xl inline-block mr-4 align-middle" data-v-56ea47d0>`);
        if (__props.type == "success") {
          _push(`<i class="fa-solid fa-check" data-v-56ea47d0></i>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.type == "danger") {
          _push(`<i class="fa-solid fa-exclamation" data-v-56ea47d0></i>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><span class="inline-block align-middle mr-8" data-v-56ea47d0>${ssrInterpolate(props.message)}</span><button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" data-v-56ea47d0><span data-v-56ea47d0>×</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Toast.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Toast = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-56ea47d0"]]);
export {
  Toast as T
};

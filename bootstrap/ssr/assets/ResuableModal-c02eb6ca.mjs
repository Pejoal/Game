import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { c as _export_sfc } from "./Footer-ec5c717f.mjs";
const ResuableModal_vue_vue_type_style_index_0_scoped_d495b25d_lang = "";
const _sfc_main = {
  __name: "ResuableModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    classes: Array,
    header: String
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: props.show ? null : { display: "none" },
        class: "modal-mask"
      }, _attrs))} data-v-d495b25d><div class="${ssrRenderClass([props.classes, "modal-container m-auto bg-white overflow-y-auto transition-all pb-4 rounded-lg"])}" data-v-d495b25d>`);
      ssrRenderSlot(_ctx.$slots, "header", {}, () => {
        _push(`<div class="flex items-center justify-between px-4 bg-gray-200" data-v-d495b25d><h2 class="text-2xl" data-v-d495b25d>${ssrInterpolate(props.header ? props.header : "Header")}</h2><button class="text-5xl" data-v-d495b25d>×</button></div>`);
      }, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "content", {}, () => {
        _push(`default body`);
      }, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResuableModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ResuableModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d495b25d"]]);
export {
  ResuableModal as R
};

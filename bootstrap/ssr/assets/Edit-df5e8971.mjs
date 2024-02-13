import { useSSRContext, unref, withCtx, createVNode, withModifiers, toDisplayString, openBlock, createBlock, createCommentVNode, Transition } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-aaf8546f.mjs";
import _sfc_main$4 from "./DeleteUserForm-0636c234.mjs";
import _sfc_main$3 from "./UpdatePasswordForm-2bb9897a.mjs";
import _sfc_main$2 from "./UpdateProfileInformationForm-47e92260.mjs";
import { useForm, Head } from "@inertiajs/vue3";
import "./Footer-1c20d405.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "laravel-vue-i18n";
import "./TextInput-1899e056.mjs";
const Switcher_vue_vue_type_style_index_0_scoped_bde7da85_lang = "";
const _sfc_main$1 = {};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Switcher.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: Boolean,
    status: String
  },
  setup(__props) {
    const form = useForm({
      profile_photo: null
    });
    function uploadProfilePhoto() {
      form.post(route("profile.photo.update"), {
        preserveScroll: true
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("words.profile")
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-gray-50 pb-2"${_scopeId}><div class="p-2 sm:p-4 shadow sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              "must-verify-email": __props.mustVerifyEmail,
              status: __props.status,
              class: "max-w-xl"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="p-2 sm:p-4 shadow sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div><form class="p-2 sm:p-4 shadow sm:rounded-lg"${_scopeId}><section class="flex justify-between flex-col sm:flex-row"${_scopeId}><div class="my-2"${_scopeId}><label class="pr-2" for="profile_photo"${_scopeId}>${ssrInterpolate(_ctx.trans("words.profile_photo"))}</label><input id="profile_photo" type="file"${_scopeId}></div><button class="btn btn-success" type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.trans("words.upload"))}</button></section>`);
            if (unref(form).errors.profile_photo) {
              _push2(`<p class="text-sm bg-red-600 rounded-md my-1 px-2 py-1"${_scopeId}>${ssrInterpolate(unref(form).errors.profile_photo)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).progress) {
              _push2(`<progress${ssrRenderAttr("value", unref(form).progress.percentage)} max="100"${_scopeId}>${ssrInterpolate(unref(form).progress.percentage)}% </progress>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).recentlySuccessful) {
              _push2(`<p class="text-sm"${_scopeId}>${ssrInterpolate(_ctx.trans("words.uploaded"))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form><div class="p-2 sm:p-4 shadow sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-gray-50 pb-2" }, [
                createVNode("div", { class: "p-2 sm:p-4 shadow sm:rounded-lg" }, [
                  createVNode(_sfc_main$2, {
                    "must-verify-email": __props.mustVerifyEmail,
                    status: __props.status,
                    class: "max-w-xl"
                  }, null, 8, ["must-verify-email", "status"])
                ]),
                createVNode("div", { class: "p-2 sm:p-4 shadow sm:rounded-lg" }, [
                  createVNode(_sfc_main$3, { class: "max-w-xl" })
                ]),
                createVNode("form", {
                  class: "p-2 sm:p-4 shadow sm:rounded-lg",
                  onSubmit: withModifiers(uploadProfilePhoto, ["prevent"])
                }, [
                  createVNode("section", { class: "flex justify-between flex-col sm:flex-row" }, [
                    createVNode("div", { class: "my-2" }, [
                      createVNode("label", {
                        class: "pr-2",
                        for: "profile_photo"
                      }, toDisplayString(_ctx.trans("words.profile_photo")), 1),
                      createVNode("input", {
                        id: "profile_photo",
                        type: "file",
                        onInput: ($event) => unref(form).profile_photo = $event.target.files[0]
                      }, null, 40, ["onInput"])
                    ]),
                    createVNode("button", {
                      class: "btn btn-success",
                      type: "submit",
                      disabled: unref(form).processing
                    }, toDisplayString(_ctx.trans("words.upload")), 9, ["disabled"])
                  ]),
                  unref(form).errors.profile_photo ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-sm bg-red-600 rounded-md my-1 px-2 py-1"
                  }, toDisplayString(unref(form).errors.profile_photo), 1)) : createCommentVNode("", true),
                  unref(form).progress ? (openBlock(), createBlock("progress", {
                    key: 1,
                    value: unref(form).progress.percentage,
                    max: "100"
                  }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true),
                  createVNode(Transition, {
                    "enter-from-class": "opacity-0",
                    "leave-to-class": "opacity-0",
                    class: "transition ease-in-out"
                  }, {
                    default: withCtx(() => [
                      unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm"
                      }, toDisplayString(_ctx.trans("words.uploaded")), 1)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"]),
                createVNode("div", { class: "p-2 sm:p-4 shadow sm:rounded-lg" }, [
                  createVNode(_sfc_main$4, { class: "max-w-xl" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

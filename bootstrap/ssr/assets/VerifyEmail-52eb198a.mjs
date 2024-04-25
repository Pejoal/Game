import { computed, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-a8fd22d7.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./Footer-ec5c717f.mjs";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const submit = () => {
      form.post(route("verification.send"));
    };
    const verificationLinkSent = computed(
      () => props.status === "verification-link-sent"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Email Verification" }, null, _parent2, _scopeId));
            _push2(`<div class="my-2"${_scopeId}>${ssrInterpolate(_ctx.trans(
              "words.thanks_for_signing_up_before_getting_started_could_you_verify_your_email_address_by_clicking_on_the_link_we_just_emailed_to_you_If_you_didnt_receive_the_email_we_will_gladly_send_you_another"
            ))}</div>`);
            if (unref(verificationLinkSent)) {
              _push2(`<div class="my-2 font-medium text-sm text-green-700"${_scopeId}>${ssrInterpolate(_ctx.trans(
                "words.a_new_verification_link_has_been_sent_to_the_email_address_you_provided_during_registration"
              ))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="mt-4 flex items-center justify-between"${_scopeId}><button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.trans("words.resend_verification_email"))}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "underline text-white ml-3 bg-red-600 px-2 py-1 rounded-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.trans("words.logout"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.trans("words.logout")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Email Verification" }),
              createVNode("div", { class: "my-2" }, toDisplayString(_ctx.trans(
                "words.thanks_for_signing_up_before_getting_started_could_you_verify_your_email_address_by_clicking_on_the_link_we_just_emailed_to_you_If_you_didnt_receive_the_email_we_will_gladly_send_you_another"
              )), 1),
              unref(verificationLinkSent) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "my-2 font-medium text-sm text-green-700"
              }, toDisplayString(_ctx.trans(
                "words.a_new_verification_link_has_been_sent_to_the_email_address_you_provided_during_registration"
              )), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                  createVNode("button", {
                    class: ["btn btn-primary", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, toDisplayString(_ctx.trans("words.resend_verification_email")), 11, ["disabled"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("logout"),
                    method: "post",
                    as: "button",
                    class: "underline text-white ml-3 bg-red-600 px-2 py-1 rounded-md"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.trans("words.logout")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

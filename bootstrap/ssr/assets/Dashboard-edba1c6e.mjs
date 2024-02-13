import { ref, watch, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-1cd28b10.mjs";
import _sfc_main$1 from "./AppointmentsGroup-be50479d.mjs";
import { Head } from "@inertiajs/vue3";
import axios from "axios";
import "./Footer-11875b49.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "laravel-vue-i18n";
import "./Appointment-4ec97797.mjs";
import "./ResuableModal-2ed3759c.mjs";
import "./AppointmentModal-91aba976.mjs";
const Dashboard_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    previousAppointments: {
      type: Object,
      default: {}
    },
    upcomingAppointments: {
      type: Object,
      default: {}
    },
    users: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    let previousAppointments = ref(props.previousAppointments);
    let upcomingAppointments = ref(props.upcomingAppointments);
    watch(
      () => [props.previousAppointments, props.upcomingAppointments],
      ([newPreviousAppointments, newUpcomingAppointments]) => {
        if (newPreviousAppointments !== previousAppointments.value) {
          previousAppointments.value = newPreviousAppointments;
        }
        if (newUpcomingAppointments !== upcomingAppointments.value) {
          upcomingAppointments.value = newUpcomingAppointments;
        }
      }
    );
    $(document).ready(() => {
      $(".chosen-select").chosen({
        no_results_text: "Oops, nothing found!"
      });
      $(".chosen-select").change(function() {
        (async () => {
          try {
            const response = await axios.get(route("admin.dashboard"), {
              params: {
                search: $(".chosen-select").val()
              }
            });
            previousAppointments.value = response.data.previousAppointments;
            upcomingAppointments.value = response.data.upcomingAppointments;
          } catch (error) {
            console.error(error);
          }
        })();
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("words.admin_dashboard")
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
            _push2(`<section class="p-4"${_scopeId}><header class="flex items-center justify-center mb-2"${_scopeId}><h2 class="text-xl font-bold pb-1 border-b border-b-black"${_scopeId}>${ssrInterpolate(_ctx.trans("words.appointment_requests"))}</h2></header><main class="space-y-2 rounded-lg"${_scopeId}><section class="flex items-center"${_scopeId}><label for="users" class="text-2xl font-bold w-1/3"${_scopeId}>${ssrInterpolate(_ctx.trans("words.filter_by_user"))}</label><select id="users" class="chosen-select"${ssrRenderAttr("data-placeholder", _ctx.trans("words.choose_a_user"))} multiple${_scopeId}><!--[-->`);
            ssrRenderList(__props.users, (user) => {
              _push2(`<option${ssrRenderAttr("value", user.id)}${_scopeId}>${ssrInterpolate(user.full_name)}</option>`);
            });
            _push2(`<!--]--></select></section>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              appointments: unref(upcomingAppointments),
              header: "upcoming_appointments"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              appointments: unref(previousAppointments),
              header: "previous_appointments"
            }, null, _parent2, _scopeId));
            _push2(`</main></section>`);
          } else {
            return [
              createVNode("section", { class: "p-4" }, [
                createVNode("header", { class: "flex items-center justify-center mb-2" }, [
                  createVNode("h2", { class: "text-xl font-bold pb-1 border-b border-b-black" }, toDisplayString(_ctx.trans("words.appointment_requests")), 1)
                ]),
                createVNode("main", { class: "space-y-2 rounded-lg" }, [
                  createVNode("section", { class: "flex items-center" }, [
                    createVNode("label", {
                      for: "users",
                      class: "text-2xl font-bold w-1/3"
                    }, toDisplayString(_ctx.trans("words.filter_by_user")), 1),
                    createVNode("select", {
                      id: "users",
                      class: "chosen-select",
                      "data-placeholder": _ctx.trans("words.choose_a_user"),
                      multiple: ""
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.users, (user) => {
                        return openBlock(), createBlock("option", {
                          value: user.id
                        }, toDisplayString(user.full_name), 9, ["value"]);
                      }), 256))
                    ], 8, ["data-placeholder"])
                  ]),
                  createVNode(_sfc_main$1, {
                    appointments: unref(upcomingAppointments),
                    header: "upcoming_appointments"
                  }, null, 8, ["appointments"]),
                  createVNode(_sfc_main$1, {
                    appointments: unref(previousAppointments),
                    header: "previous_appointments"
                  }, null, 8, ["appointments"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { ref, unref, withCtx, isRef, createVNode, withModifiers, createTextVNode, toDisplayString, Transition, openBlock, createBlock, createCommentVNode, Teleport, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-b39e6883.mjs";
import { useForm, Head } from "@inertiajs/vue3";
import { R as ResuableModal } from "./ResuableModal-001969d6.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputError-20f2d7b9.mjs";
import "./Locales-9be1f4f4.mjs";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "Page",
  __ssrInlineRender: true,
  props: {
    story: {
      type: Object,
      default: {}
    },
    cardGroups: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const cardGroupForm = useForm({
      id: null,
      name: "",
      description: "",
      type: ""
    });
    let showModal = ref(false);
    let nameInput = ref(null);
    let descriptionInput = ref(null);
    let typeInput = ref(null);
    let orderInput = ref(null);
    const openCreateModal = (id) => {
      cardGroupForm.id = null;
      cardGroupForm.name = "";
      cardGroupForm.description = "";
      cardGroupForm.type = "";
      showModal.value = true;
    };
    const store = () => {
      cardGroupForm.post(route("card.group.store", props.story.id), {
        onSuccess: () => {
          setTimeout(() => {
            showModal.value = false;
          }, 1e3);
          cardGroupForm.reset();
        },
        onError: () => {
          if (cardGroupForm.errors.name) {
            nameInput.value.focus();
          }
          if (cardGroupForm.errors.description) {
            descriptionInput.value.focus();
          }
          if (cardGroupForm.errors.type) {
            typeInput.value.focus();
          }
        }
      });
    };
    const edit = (id) => {
      showModal.value = true;
      const foundCardGroup = props.cardGroups.find(
        (cardGroup) => cardGroup.id === id
      );
      cardGroupForm.id = foundCardGroup.id;
      cardGroupForm.name = foundCardGroup.name;
      cardGroupForm.description = foundCardGroup.description;
      cardGroupForm.type = foundCardGroup.type;
    };
    const destroy = (id) => {
      cardGroupForm.post(route("card.group.delete", id), {});
    };
    const cardForm = useForm({
      id: null,
      name: "",
      order: 0,
      description: ""
    });
    let showCardModal = ref(false);
    let cardGroupId = ref(0);
    const handleShowCardModal = (id) => {
      showCardModal.value = true;
      cardGroupId.value = id;
      cardForm.id = null;
      cardForm.name = "";
      cardForm.order = 0;
      cardForm.description = "";
    };
    const storeCard = () => {
      cardForm.post(route("card.store", cardGroupId.value), {
        onSuccess: () => {
          setTimeout(() => {
            showCardModal.value = false;
          }, 1e3);
          cardForm.reset();
        },
        onError: () => {
          if (cardForm.errors.name) {
            nameInput.value.focus();
          }
          if (cardForm.errors.description) {
            descriptionInput.value.focus();
          }
          if (cardForm.errors.order) {
            orderInput.value.focus();
          }
        }
      });
    };
    const editCard = (id, cardGroupId2) => {
      showCardModal.value = true;
      const foundCardGroup = props.cardGroups.find(
        (cardGroup) => cardGroup.id === cardGroupId2
      );
      const foundCard = foundCardGroup.cards.find((card) => card.id === id);
      cardForm.id = foundCard.id;
      cardForm.name = foundCard.name;
      cardForm.description = foundCard.description;
      cardForm.order = foundCard.order;
    };
    const destroyCard = (id) => {
      cardForm.post(route("card.delete", id), {});
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.trans("words.story")
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-2xl font-bold underline"${_scopeId}>${ssrInterpolate(__props.story.name)}</h2><section class="flex items-center justify-center"${_scopeId}><button class="btn btn-primary"${_scopeId}>${ssrInterpolate(_ctx.trans("words.create_card_group"))}</button></section>`);
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(ResuableModal, {
                classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                header: _ctx.trans("words.create_card_group"),
                show: unref(showModal),
                onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
              }, {
                content: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(`<form class="px-4 py-2"${_scopeId2}><section${_scopeId2}>${ssrInterpolate(_ctx.trans("words.name"))} `);
                    _push4(ssrRenderComponent(_sfc_main$1, {
                      id: "name",
                      ref_key: "nameInput",
                      ref: nameInput,
                      modelValue: unref(cardGroupForm).name,
                      "onUpdate:modelValue": ($event) => unref(cardGroupForm).name = $event,
                      type: "text",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.name")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      message: unref(cardGroupForm).errors.name,
                      class: "my-2 bg-white rounded-md px-2 py-1"
                    }, null, _parent3, _scopeId2));
                    _push4(`</section><section${_scopeId2}>${ssrInterpolate(_ctx.trans("words.description"))} `);
                    _push4(ssrRenderComponent(_sfc_main$1, {
                      id: "description",
                      ref_key: "descriptionInput",
                      ref: descriptionInput,
                      modelValue: unref(cardGroupForm).description,
                      "onUpdate:modelValue": ($event) => unref(cardGroupForm).description = $event,
                      type: "text",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.description")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      message: unref(cardGroupForm).errors.description,
                      class: "my-2 bg-white rounded-md px-2 py-1"
                    }, null, _parent3, _scopeId2));
                    _push4(`</section><section${_scopeId2}>${ssrInterpolate(_ctx.trans("words.type"))} `);
                    _push4(ssrRenderComponent(_sfc_main$1, {
                      id: "type",
                      ref_key: "typeInput",
                      ref: typeInput,
                      modelValue: unref(cardGroupForm).type,
                      "onUpdate:modelValue": ($event) => unref(cardGroupForm).type = $event,
                      type: "text",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.type")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      message: unref(cardGroupForm).errors.type,
                      class: "my-2 bg-white rounded-md px-2 py-1"
                    }, null, _parent3, _scopeId2));
                    _push4(`</section><section class="flex items-center justify-center"${_scopeId2}><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(cardGroupForm).processing) ? " disabled" : ""}${_scopeId2}>${ssrInterpolate(_ctx.trans("words.save"))}</button></section>`);
                    if (unref(cardGroupForm).recentlySuccessful) {
                      _push4(`<p class="text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(_ctx.trans("words.saved"))}</p>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(`</form>`);
                  } else {
                    return [
                      createVNode("form", {
                        onSubmit: withModifiers(store, ["prevent"]),
                        class: "px-4 py-2"
                      }, [
                        createVNode("section", null, [
                          createTextVNode(toDisplayString(_ctx.trans("words.name")) + " ", 1),
                          createVNode(_sfc_main$1, {
                            id: "name",
                            ref_key: "nameInput",
                            ref: nameInput,
                            modelValue: unref(cardGroupForm).name,
                            "onUpdate:modelValue": ($event) => unref(cardGroupForm).name = $event,
                            type: "text",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.name")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$2, {
                            message: unref(cardGroupForm).errors.name,
                            class: "my-2 bg-white rounded-md px-2 py-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("section", null, [
                          createTextVNode(toDisplayString(_ctx.trans("words.description")) + " ", 1),
                          createVNode(_sfc_main$1, {
                            id: "description",
                            ref_key: "descriptionInput",
                            ref: descriptionInput,
                            modelValue: unref(cardGroupForm).description,
                            "onUpdate:modelValue": ($event) => unref(cardGroupForm).description = $event,
                            type: "text",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.description")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$2, {
                            message: unref(cardGroupForm).errors.description,
                            class: "my-2 bg-white rounded-md px-2 py-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("section", null, [
                          createTextVNode(toDisplayString(_ctx.trans("words.type")) + " ", 1),
                          createVNode(_sfc_main$1, {
                            id: "type",
                            ref_key: "typeInput",
                            ref: typeInput,
                            modelValue: unref(cardGroupForm).type,
                            "onUpdate:modelValue": ($event) => unref(cardGroupForm).type = $event,
                            type: "text",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.type")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$2, {
                            message: unref(cardGroupForm).errors.type,
                            class: "my-2 bg-white rounded-md px-2 py-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("section", { class: "flex items-center justify-center" }, [
                          createVNode("button", {
                            class: "btn btn-primary",
                            disabled: unref(cardGroupForm).processing
                          }, toDisplayString(_ctx.trans("words.save")), 9, ["disabled"])
                        ]),
                        createVNode(Transition, {
                          "enter-from-class": "opacity-0",
                          "leave-to-class": "opacity-0",
                          class: "transition ease-in-out"
                        }, {
                          default: withCtx(() => [
                            unref(cardGroupForm).recentlySuccessful ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-gray-600"
                            }, toDisplayString(_ctx.trans("words.saved")), 1)) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ], 40, ["onSubmit"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, "#modal", false, _parent2);
            _push2(`<!--[-->`);
            ssrRenderList(__props.cardGroups, (cardGroup) => {
              _push2(`<section class="block m-1 p-2 rounded-lg bg-slate-500"${_scopeId}><p class="text-lg font-bold text-gray-100"${_scopeId}>${ssrInterpolate(cardGroup.name)}</p><p class="indent-2 text-white"${_scopeId}>${ssrInterpolate(cardGroup.description)}</p><!--[-->`);
              ssrRenderList(cardGroup.cards, (card) => {
                _push2(`<section class="block m-1 p-2 rounded-lg bg-gray-800"${_scopeId}><p class="text-lg font-bold text-gray-100"${_scopeId}>${ssrInterpolate(card.name)}</p><p class="indent-2 text-white"${_scopeId}>${ssrInterpolate(card.description)}</p><section class="flex items-center justify-center gap-2"${_scopeId}><button type="button" class="btn btn-success"${_scopeId}>${ssrInterpolate(_ctx.trans("words.edit"))}</button><button type="button" class="btn btn-danger"${_scopeId}>${ssrInterpolate(_ctx.trans("words.delete"))}</button></section></section>`);
              });
              _push2(`<!--]--><section class="flex items-center justify-center gap-2"${_scopeId}><button class="btn btn-primary"${_scopeId}>${ssrInterpolate(_ctx.trans("words.create_card"))}</button><button type="button" class="btn btn-success"${_scopeId}>${ssrInterpolate(_ctx.trans("words.edit"))}</button><button type="button" class="btn btn-danger"${_scopeId}>${ssrInterpolate(_ctx.trans("words.delete"))}</button></section></section>`);
            });
            _push2(`<!--]-->`);
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(ResuableModal, {
                classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                header: _ctx.trans("words.create_card"),
                show: unref(showCardModal),
                onClose: ($event) => isRef(showCardModal) ? showCardModal.value = false : showCardModal = false
              }, {
                content: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(`<form class="px-4 py-2"${_scopeId2}><section${_scopeId2}>${ssrInterpolate(_ctx.trans("words.name"))} `);
                    _push4(ssrRenderComponent(_sfc_main$1, {
                      id: "name",
                      ref_key: "nameInput",
                      ref: nameInput,
                      modelValue: unref(cardForm).name,
                      "onUpdate:modelValue": ($event) => unref(cardForm).name = $event,
                      type: "text",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.name")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      message: unref(cardForm).errors.name,
                      class: "my-2 bg-white rounded-md px-2 py-1"
                    }, null, _parent3, _scopeId2));
                    _push4(`</section><section${_scopeId2}>${ssrInterpolate(_ctx.trans("words.description"))} `);
                    _push4(ssrRenderComponent(_sfc_main$1, {
                      id: "description",
                      ref_key: "descriptionInput",
                      ref: descriptionInput,
                      modelValue: unref(cardForm).description,
                      "onUpdate:modelValue": ($event) => unref(cardForm).description = $event,
                      type: "text",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.description")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      message: unref(cardForm).errors.description,
                      class: "my-2 bg-white rounded-md px-2 py-1"
                    }, null, _parent3, _scopeId2));
                    _push4(`</section><section${_scopeId2}>${ssrInterpolate(_ctx.trans("words.order"))} `);
                    _push4(ssrRenderComponent(_sfc_main$1, {
                      id: "order",
                      ref_key: "orderInput",
                      ref: orderInput,
                      modelValue: unref(cardForm).order,
                      "onUpdate:modelValue": ($event) => unref(cardForm).order = $event,
                      type: "number",
                      class: "my-2 block w-3/4 text-black rounded-lg",
                      placeholder: _ctx.trans("words.order")
                    }, null, _parent3, _scopeId2));
                    _push4(ssrRenderComponent(_sfc_main$2, {
                      message: unref(cardForm).errors.order,
                      class: "my-2 bg-white rounded-md px-2 py-1"
                    }, null, _parent3, _scopeId2));
                    _push4(`</section><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(cardForm).processing) ? " disabled" : ""}${_scopeId2}>${ssrInterpolate(_ctx.trans("words.save"))}</button>`);
                    if (unref(cardForm).recentlySuccessful) {
                      _push4(`<p class="text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(_ctx.trans("words.created"))}</p>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(`</form>`);
                  } else {
                    return [
                      createVNode("form", {
                        onSubmit: withModifiers(storeCard, ["prevent"]),
                        class: "px-4 py-2"
                      }, [
                        createVNode("section", null, [
                          createTextVNode(toDisplayString(_ctx.trans("words.name")) + " ", 1),
                          createVNode(_sfc_main$1, {
                            id: "name",
                            ref_key: "nameInput",
                            ref: nameInput,
                            modelValue: unref(cardForm).name,
                            "onUpdate:modelValue": ($event) => unref(cardForm).name = $event,
                            type: "text",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.name")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$2, {
                            message: unref(cardForm).errors.name,
                            class: "my-2 bg-white rounded-md px-2 py-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("section", null, [
                          createTextVNode(toDisplayString(_ctx.trans("words.description")) + " ", 1),
                          createVNode(_sfc_main$1, {
                            id: "description",
                            ref_key: "descriptionInput",
                            ref: descriptionInput,
                            modelValue: unref(cardForm).description,
                            "onUpdate:modelValue": ($event) => unref(cardForm).description = $event,
                            type: "text",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.description")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$2, {
                            message: unref(cardForm).errors.description,
                            class: "my-2 bg-white rounded-md px-2 py-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("section", null, [
                          createTextVNode(toDisplayString(_ctx.trans("words.order")) + " ", 1),
                          createVNode(_sfc_main$1, {
                            id: "order",
                            ref_key: "orderInput",
                            ref: orderInput,
                            modelValue: unref(cardForm).order,
                            "onUpdate:modelValue": ($event) => unref(cardForm).order = $event,
                            type: "number",
                            class: "my-2 block w-3/4 text-black rounded-lg",
                            placeholder: _ctx.trans("words.order")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$2, {
                            message: unref(cardForm).errors.order,
                            class: "my-2 bg-white rounded-md px-2 py-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("button", {
                          class: "btn btn-primary",
                          disabled: unref(cardForm).processing
                        }, toDisplayString(_ctx.trans("words.save")), 9, ["disabled"]),
                        createVNode(Transition, {
                          "enter-from-class": "opacity-0",
                          "leave-to-class": "opacity-0",
                          class: "transition ease-in-out"
                        }, {
                          default: withCtx(() => [
                            unref(cardForm).recentlySuccessful ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-gray-600"
                            }, toDisplayString(_ctx.trans("words.created")), 1)) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ], 40, ["onSubmit"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, "#modal", false, _parent2);
          } else {
            return [
              createVNode("h2", { class: "text-2xl font-bold underline" }, toDisplayString(__props.story.name), 1),
              createVNode("section", { class: "flex items-center justify-center" }, [
                createVNode("button", {
                  class: "btn btn-primary",
                  onClick: openCreateModal
                }, toDisplayString(_ctx.trans("words.create_card_group")), 1)
              ]),
              (openBlock(), createBlock(Teleport, { to: "#modal" }, [
                createVNode(ResuableModal, {
                  classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                  header: _ctx.trans("words.create_card_group"),
                  show: unref(showModal),
                  onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
                }, {
                  content: withCtx(() => [
                    createVNode("form", {
                      onSubmit: withModifiers(store, ["prevent"]),
                      class: "px-4 py-2"
                    }, [
                      createVNode("section", null, [
                        createTextVNode(toDisplayString(_ctx.trans("words.name")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          id: "name",
                          ref_key: "nameInput",
                          ref: nameInput,
                          modelValue: unref(cardGroupForm).name,
                          "onUpdate:modelValue": ($event) => unref(cardGroupForm).name = $event,
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder: _ctx.trans("words.name")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(_sfc_main$2, {
                          message: unref(cardGroupForm).errors.name,
                          class: "my-2 bg-white rounded-md px-2 py-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("section", null, [
                        createTextVNode(toDisplayString(_ctx.trans("words.description")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          id: "description",
                          ref_key: "descriptionInput",
                          ref: descriptionInput,
                          modelValue: unref(cardGroupForm).description,
                          "onUpdate:modelValue": ($event) => unref(cardGroupForm).description = $event,
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder: _ctx.trans("words.description")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(_sfc_main$2, {
                          message: unref(cardGroupForm).errors.description,
                          class: "my-2 bg-white rounded-md px-2 py-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("section", null, [
                        createTextVNode(toDisplayString(_ctx.trans("words.type")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          id: "type",
                          ref_key: "typeInput",
                          ref: typeInput,
                          modelValue: unref(cardGroupForm).type,
                          "onUpdate:modelValue": ($event) => unref(cardGroupForm).type = $event,
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder: _ctx.trans("words.type")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(_sfc_main$2, {
                          message: unref(cardGroupForm).errors.type,
                          class: "my-2 bg-white rounded-md px-2 py-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("section", { class: "flex items-center justify-center" }, [
                        createVNode("button", {
                          class: "btn btn-primary",
                          disabled: unref(cardGroupForm).processing
                        }, toDisplayString(_ctx.trans("words.save")), 9, ["disabled"])
                      ]),
                      createVNode(Transition, {
                        "enter-from-class": "opacity-0",
                        "leave-to-class": "opacity-0",
                        class: "transition ease-in-out"
                      }, {
                        default: withCtx(() => [
                          unref(cardGroupForm).recentlySuccessful ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-600"
                          }, toDisplayString(_ctx.trans("words.saved")), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onSubmit"])
                  ]),
                  _: 1
                }, 8, ["header", "show", "onClose"])
              ])),
              (openBlock(true), createBlock(Fragment, null, renderList(__props.cardGroups, (cardGroup) => {
                return openBlock(), createBlock("section", {
                  key: cardGroup.id,
                  class: "block m-1 p-2 rounded-lg bg-slate-500"
                }, [
                  createVNode("p", { class: "text-lg font-bold text-gray-100" }, toDisplayString(cardGroup.name), 1),
                  createVNode("p", { class: "indent-2 text-white" }, toDisplayString(cardGroup.description), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(cardGroup.cards, (card) => {
                    return openBlock(), createBlock("section", {
                      key: card.id,
                      class: "block m-1 p-2 rounded-lg bg-gray-800"
                    }, [
                      createVNode("p", { class: "text-lg font-bold text-gray-100" }, toDisplayString(card.name), 1),
                      createVNode("p", { class: "indent-2 text-white" }, toDisplayString(card.description), 1),
                      createVNode("section", { class: "flex items-center justify-center gap-2" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-success",
                          onClick: ($event) => editCard(card.id, cardGroup.id)
                        }, toDisplayString(_ctx.trans("words.edit")), 9, ["onClick"]),
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-danger",
                          onClick: ($event) => destroyCard(card.id)
                        }, toDisplayString(_ctx.trans("words.delete")), 9, ["onClick"])
                      ])
                    ]);
                  }), 128)),
                  createVNode("section", { class: "flex items-center justify-center gap-2" }, [
                    createVNode("button", {
                      class: "btn btn-primary",
                      onClick: () => handleShowCardModal(cardGroup.id)
                    }, toDisplayString(_ctx.trans("words.create_card")), 9, ["onClick"]),
                    createVNode("button", {
                      type: "button",
                      class: "btn btn-success",
                      onClick: ($event) => edit(cardGroup.id)
                    }, toDisplayString(_ctx.trans("words.edit")), 9, ["onClick"]),
                    createVNode("button", {
                      type: "button",
                      class: "btn btn-danger",
                      onClick: ($event) => destroy(cardGroup.id)
                    }, toDisplayString(_ctx.trans("words.delete")), 9, ["onClick"])
                  ])
                ]);
              }), 128)),
              (openBlock(), createBlock(Teleport, { to: "#modal" }, [
                createVNode(ResuableModal, {
                  classes: ["w-[90%] md:w-[85%] lg:w-[80%] h-[80%]"],
                  header: _ctx.trans("words.create_card"),
                  show: unref(showCardModal),
                  onClose: ($event) => isRef(showCardModal) ? showCardModal.value = false : showCardModal = false
                }, {
                  content: withCtx(() => [
                    createVNode("form", {
                      onSubmit: withModifiers(storeCard, ["prevent"]),
                      class: "px-4 py-2"
                    }, [
                      createVNode("section", null, [
                        createTextVNode(toDisplayString(_ctx.trans("words.name")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          id: "name",
                          ref_key: "nameInput",
                          ref: nameInput,
                          modelValue: unref(cardForm).name,
                          "onUpdate:modelValue": ($event) => unref(cardForm).name = $event,
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder: _ctx.trans("words.name")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(_sfc_main$2, {
                          message: unref(cardForm).errors.name,
                          class: "my-2 bg-white rounded-md px-2 py-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("section", null, [
                        createTextVNode(toDisplayString(_ctx.trans("words.description")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          id: "description",
                          ref_key: "descriptionInput",
                          ref: descriptionInput,
                          modelValue: unref(cardForm).description,
                          "onUpdate:modelValue": ($event) => unref(cardForm).description = $event,
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder: _ctx.trans("words.description")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(_sfc_main$2, {
                          message: unref(cardForm).errors.description,
                          class: "my-2 bg-white rounded-md px-2 py-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("section", null, [
                        createTextVNode(toDisplayString(_ctx.trans("words.order")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          id: "order",
                          ref_key: "orderInput",
                          ref: orderInput,
                          modelValue: unref(cardForm).order,
                          "onUpdate:modelValue": ($event) => unref(cardForm).order = $event,
                          type: "number",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder: _ctx.trans("words.order")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(_sfc_main$2, {
                          message: unref(cardForm).errors.order,
                          class: "my-2 bg-white rounded-md px-2 py-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("button", {
                        class: "btn btn-primary",
                        disabled: unref(cardForm).processing
                      }, toDisplayString(_ctx.trans("words.save")), 9, ["disabled"]),
                      createVNode(Transition, {
                        "enter-from-class": "opacity-0",
                        "leave-to-class": "opacity-0",
                        class: "transition ease-in-out"
                      }, {
                        default: withCtx(() => [
                          unref(cardForm).recentlySuccessful ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-600"
                          }, toDisplayString(_ctx.trans("words.created")), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onSubmit"])
                  ]),
                  _: 1
                }, 8, ["header", "show", "onClose"])
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Story/Page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

function ModalWords(user_settings) {

    let user_data = {};

    user_settings.data.filter(item => typeof(item) != 'string').forEach(obj => user_data[obj.id] = "");

    console.log(user_data);
    console.log(user_settings.data);

    let ModalWordsInit = {
        init: function () {
            let handleOutsideClick;
            Vue.directive('closable', {
                bind(el, binding, vnode) {
                    handleOutsideClick = (e) => {
                        e.stopPropagation();
                        const {handler, exclude} = binding.value;
                        let clickedOnExcludedEl = false;
                        exclude.forEach(refName => {
                            if (!clickedOnExcludedEl) {
                                const excludedEl = vnode.context.$refs[refName];
                                clickedOnExcludedEl = excludedEl.includes(e.target)
                            }
                        });
                        if (!el.contains(e.target) && !clickedOnExcludedEl) {
                            vnode.context[handler]();
                        }
                    };
                    document.addEventListener('click', handleOutsideClick);
                    document.addEventListener('touchstart', handleOutsideClick);
                },
            });

            new Vue({
                template: `
                    <div class="modal-words-wrapper">
                        <div class="task">Составьте пользовательские истории, используя предложенные фразы. При составлении помните про правила составления историй.</div>
                        <div class="modal-words-task" style="position: relative">
                            <template v-for="(op,index) in main_data">
                                <span v-if="typeof(op)=='string'" class="sentence-part">{{op}}</span>
                                <span ref="can_select_button" v-else class="can-select sentence-part" @click="show_modal(op, $event)" :class="{'default': user_data[op.id] == '', 'active': modal_data.item && modal_data.item.id == op.id }" >
                                    <template v-if="user_data[op.id] != ''">{{op.variants.filter(v => v.id == user_data[op.id])[0].text}}</template>
                                    <template v-else>{{op.default}}</template>
                                </span>
                            </template>
                            <div ref="modalChoice" class="modal-choice" v-bind:style="modal_position" :class="{'hidden': !modal_data.is_show}" v-closable="{exclude: ['can_select_button'], handler: 'closeModal' }">
                                <div v-if="modal_data.item.help_text">{{ modal_data.item.help_text }}</div>
                                <template v-for="variant in modal_data.item.variants">
                                    <div :id="variant.id" class="variant" @click="select_variant(variant.id)">{{variant.text}}</div>
                                </template>
                            </div>
                        </div>
                    </div>
                `,
                el: user_settings.element,
                data: {
                    user_data: user_data,
                    main_data: user_settings.data,
                    modal_data: {
                        is_show: false,
                        item: {}
                    },
                    modal_position: {},
                },
                methods: {
                    closeModal() {
                        this.modal_data.item = {};
                        this.modal_data.is_show = false;
                    },
                    show_modal: function (op, event) {
                        this.modal_data.item = op;
                        this.modal_data.is_show = true;

                        let modalLeft = event.offsetX - 400/2;
                        modalLeft = modalLeft > 0 ? modalLeft:0;
                        // let modalBottom = event.target.parentNode.getBoundingClientRect().height - event.offsetY + 18;
                        let modalTop = event.offsetY + 18;
                        this.modal_position = {
                            left: modalLeft + 'px',
                            top: modalTop + 'px',
                        };
                    },
                    select_variant: function (id) {
                        user_data[this.modal_data.item.id] = id;
                        this.closeModal();
                        console.log(user_data);
                    },
                },
                mounted() {
                    let self = this;
                    window.addEventListener('keyup', function(event) {
                        if (event.keyCode === 27) {
                            self.closeModal();
                        }
                    });
                },
            });
        }

    };

    ModalWordsInit.init();
    // console.log(user_settings.data)
}

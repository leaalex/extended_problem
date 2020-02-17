function ModalWords(user_settings) {

    let user_data = {};

    function Answer(elementField) {
        this.elementField = elementField;
        this.fieldValue = "";
        this.fieldObject = {};
        this.get = function () {
            this.fieldValue = elementField.value;
            return this.fieldValue;
        };
        this.set = function (value) {
            if (value === undefined) value = this.fieldValue;
            elementField.value = value;
        };
        this.getJSON = function () {
            if (this.isJsonString(this.get())) this.fieldObject = JSON.parse(this.get());
            return this.fieldObject;
        };
        this.setJSON = function (object) {
            if (object === undefined) object = this.fieldObject;
            this.set(JSON.stringify(object));
        };
        this.isJsonString = function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        };
    }

    let answer = undefined;
    let correctness_state = undefined;

    if (user_settings.input) {
        if (user_settings.input.querySelector("input[type='text']")) {
            answer = new Answer(user_settings.input.querySelector("input[type='text']"));
            if (user_settings.input.parentNode.parentNode.querySelector(".message")) {
                user_settings.input.parentNode.parentNode.querySelector(".message").classList.add("hidden");
            }
            user_settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");
            if (answer.get()) {
                if (user_settings.input.parentNode.parentNode.querySelector("span.message")) {
                    correctness_state = JSON.parse(user_settings.input.parentNode.parentNode.querySelector("span.message").innerHTML);
                }
            }
        }
    }

    let default_signs = ["<", ">"];
    if (Object.keys(user_settings).includes('default_signs')){
        if (user_settings.default_signs.length === 2){
            default_signs[0] = user_settings.default_signs[0].toString();
            default_signs[1] = user_settings.default_signs[1].toString();
        }
    }

    if (Object.keys(user_data).length === 0){
        user_settings.data.filter(item => typeof (item) != 'string').forEach(obj => user_data[obj.id] = "");
    }


    let ModalWordsInit = {
        init: function () {
            if (answer) {
                if (answer.get()) {
                    user_data = answer.getJSON()["answer"];
                }
            }

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
                        <div class="task" v-html="task_text"></div>
                        <div class="modal-words-task" style="position: relative">
                            <template v-for="(op,index) in main_data">
                                <span v-if="typeof(op)=='string'" class="sentence-part" v-html="op"></span>
                                <span ref="can_select_button" v-else :id="op.id" class="can-select sentence-part" @click="show_modal(op, $event)" :class="calculate_select_button_classes(op.id)" >
                                    <template v-if="user_data[op.id] != ''">{{op.variants.filter(v => v.id == user_data[op.id])[0].text}}</template>
                                    <template v-else >{{default_signs[0]}}{{op.default}}{{default_signs[1]}}</template>
                                </span>
                            </template>
                            <div ref="modalChoice" class="modal-choice" v-bind:style="modal_position" :class="{'hidden': !modal_data.is_show}" v-closable="{exclude: ['can_select_button'], handler: 'close_modal' }">
                                <div class="modal-choice-help" v-if="modal_data.item.help_text" v-html="modal_data.item.help_text"></div>
                                <template v-for="variant in modal_data.item.variants">
                                    <div :id="variant.id" class="variant" @click="select_variant(variant.id)" :class="{'selected': user_data[modal_data.item.id] == variant.id}"> {{variant.text}}</div>
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
                    correctness: correctness_state,
                    default_signs: default_signs,
                    task_text: user_settings.task_text || "",
                    can_change_correct: true, // можно ли менять значения верных ответов
                },
                methods: {
                    close_modal() {
                        this.modal_data.item = {};
                        this.modal_data.is_show = false;
                    },
                    show_modal: function (op, event) {
                        if (!this.can_change_correct) {
                            if (this.correctness !== undefined) {
                                if (Object.keys(this.correctness).includes(op.id)) {
                                    if (this.correctness[op.id]) {
                                        return;
                                    }
                                }
                            }
                        }

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
                        if(user_data[this.modal_data.item.id] !== id){
                            if(this.correctness !== undefined){
                                if (Object.keys(this.correctness).includes(this.modal_data.item.id)) {
                                    delete this.correctness[this.modal_data.item.id];
                                }
                            }
                        }
                        user_data[this.modal_data.item.id] = id;

                        this.close_modal();
                        this.set_answer();
                    },
                    set_answer: function(event){
                        answer.setJSON({answer: this.user_data});
                    },
                    calculate_select_button_classes: function(id){
                        let class_list = {
                            'default': this.user_data[id] === '',
                            'active': this.modal_data.item && this.modal_data.item.id === id
                        };
                        if(this.correctness !== undefined){
                            if (Object.keys(this.correctness).includes(id)){
                                if (this.correctness[id]){
                                    class_list['correct'] = true;
                                }
                                else{
                                    class_list['incorrect'] = true;
                                }
                            }
                        }
                        if (!this.can_change_correct) class_list['no-change'] = true;
                        return class_list;
                    },
                },
                mounted() {
                    let self = this;
                    window.addEventListener('keyup', function(event) {
                        if (event.keyCode === 27) {
                            self.close_modal();
                        }
                    });
                },
            });
        }

    };

    ModalWordsInit.init();
}

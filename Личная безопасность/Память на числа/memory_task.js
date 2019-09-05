function MemoryTask(settings) {
/*
*
* Обязательно ставим количество попыток!(1)
* Время запоминания по умолчанию - 20 сек.
*
* */
    let data = settings.data;
    let element = settings.element;
    let state = {};
    state.step = 0;
    state.answer = {};
    state.result = [];

    let language = "ru";
    let labels = {
        ru: {
            start_label: "Начать",
            instruction_label: "Инструкция",
            result_label: "Результаты",
            input_instruction: "Введите что-нибудь:",
            start_instruction: ["Пожалуйста, не записывайте цифры, а только запоминайте.", "Тренажер предназначен для оценки кратковременной зрительной памяти, ее объема и точности."]
        },
        en: {
            start_label: "Start",
            input_instruction: "Введите что-нибудь:",
            start_instruction: ["Пожалуйста, не записывайте цифры, а только запоминайте.", "Тренажер предназначен для оценки кратковременной зрительной памяти, ее объема и точности."]
        }
    };

    let delay = settings.delay ? ( typeof settings.delay == 'number' ? settings.delay : 20 ) : 20;

    let user_labels = labels[language];

    let answer = undefined;
    let submit_btn = undefined;
    let save_btn = undefined;

    if (settings.input) {
        answer = new Answer(settings.input.querySelector("input[type='text']"));
        submit_btn = answer.elementField.closest(".problem").querySelector(".submit.btn-brand");

        submit_btn.classList.add("hidden");
        submit_btn.classList.add("submit-button-center");
        submit_btn.removeAttribute("disabled");

        save_btn = answer.elementField.closest(".problem").querySelector("button.save");
        answer.elementField.closest(".problem").querySelector(".problem-action-buttons-wrapper").classList.add("hidden");
        answer.elementField.closest(".problem").querySelector(".notification").classList.add("hidden");
        answer.elementField.closest(".problem").querySelector(".submission-feedback").classList.add("hidden");
        answer.elementField.closest(".problem").querySelector(".submit-attempt-container").classList.add("center-button-wrap");

        if (answer.get()) {
            state = answer.getJSON()["state"];
            if(state.step === 2){
                let msg = settings.input.querySelector(".message").innerHTML.toLocaleLowerCase();
                if(msg.length > 0){
                    state.result = JSON.parse(msg);
                }
            }
        }
    }

    let MemoryTaskInit = {
        init: function () {
                if (state.step === 0){
                        this.buildStart();
                }
                else if (state.step === 1){
                    this.buildInput();
                }
                else{
                    this.buildResult();
                }
        },

        buildStart: function () {
            let start_wrap = utils.create("div", {className: "start-wrapper"});

            let instruction_block = utils.create("div", {className: "instruction-block"}, utils.create("h2", {text: user_labels.instruction_label}));

            user_labels.start_instruction.map((inst)=>utils.create("p", {text: inst})).forEach(item=>instruction_block.appendChild(item));


            let start_btn = utils.create("button", {className: "", text: user_labels.start_label});
            start_btn.onclick = function (evt) {
                this.buildTable();
            }.bind(this);

            start_wrap.appendChild(instruction_block);
            start_wrap.appendChild(start_btn);
            element.appendChild(start_wrap);
        },

        buildTable: function () {
            utils.clear(element);
            let table_wrap = utils.create("div", {className: "table-wrapper"});
            let timer_block = utils.create("div", {className: "timer-block"});
            let table = utils.create("div", {className: "num-table-wrap"});
            data.forEach(function (item) {
                let num_item = utils.create("div", {className: "num-table-item", text: item});
                table.appendChild(num_item);
            });
            table_wrap.appendChild(timer_block);
            table_wrap.appendChild(table);
            element.appendChild(table_wrap);
            utils.timer(delay, function (s) {timer_block.innerHTML = utils.sec2time(s)}, this.buildInput);
        },

        buildInput: function () {
            utils.clear(element);
            state.step = 1;
            answer.setJSON({"state": state});
            if (save_btn) save_btn.click();
            let input_wrap = utils.create("div", {className: "input-wrapper"});
            let input_instruction = utils.create("div", {className: "input-instruction", text: user_labels.input_instruction});
            let input_area = utils.create("textarea", {className: "input-area", attr: {"rows": "2", "type": "text"}});

            input_wrap.appendChild(input_instruction);
            input_wrap.appendChild(input_area);
            element.appendChild(input_wrap);

            submit_btn.classList.remove("hidden");
            answer.setJSON({"state": state});
            let len = 0;

            submit_btn.classList.add( "disabled");


            input_area.oninput = function(evt){
                this.value = this.value.replace(/[^\d, \t\n]/g,'');

                let answer_arr_candidate = this.value.split(/[ ,\t\n]+/).filter(function (item) { return !isNaN(parseFloat(item))}).map(function(item){return parseInt(item)});

                if(answer_arr_candidate.length < 1){
                    submit_btn.classList.add("disabled");
                }
                else{
                    submit_btn.classList.remove("disabled");
                }

                if(answer_arr_candidate.length > 12){
                    this.value = this.value.substr(0, len);
                    alert("Максимум элементов!");
                }
                else{
                    len = this.value.length;
                    state.answer = answer_arr_candidate;
                    answer.setJSON({"state": state});
                }

                submit_btn.removeAttribute("disabled");
                state.step = 2;
            };

        },
        buildResult: function () {
            utils.clear(element);
            let result_wrap = utils.create("div", {className: "table-wrapper"}, utils.create("h2", {text: user_labels.result_label}));
            let table = utils.create("div", {className: "num-table-wrap"});

            data.forEach(function (item, idx) {
                let num_item = utils.create("div", {className: "num-table-item" + (state.result[idx] ? " correct": ""), text: item});
                table.appendChild(num_item);
            });
            result_wrap.appendChild(table);
            let grade = state.result.reduce((n, x) => n + (x === true), 0);
            let result = utils.create("div", {className: "instruction-block",}, utils.create("p", {text: `Вы набрали ${grade} из ${state.result.length} баллов.`}));
            result_wrap.appendChild(result);
            element.appendChild(result_wrap);
        },
    };

    let utils = {
        create: function (tag, {id, className, text, html, attr, style, data}, ...array) {
            let element = document.createElement(tag);
            if (id) element.id = id;
            if (className) element.className = className;
            if (text) element.innerText = text;
            if (html) element.innerHTML = html;
            if (attr) {
                for (let key in attr) {
                    element.setAttribute(key, attr[key])
                }
            }
            if (style) {
                for (let key in style) {
                    element.style[key] = style[key]
                }
            }
            if (data) {
                for (let key in data) {
                    element.dataset[key] = data[key]
                }
            }
            if (array) {
                array.forEach(function (child) {
                    element.appendChild(child)
                });
            }

            element.toggle = function (name) {
                this.classList.toggle(name)
            };
            element.add = function (name) {
                this.classList.add(name)
            };
            element.remove = function (name) {
                this.classList.remove(name)
            };

            return element
        },
        clear: function (el) {
            el.innerHTML = "";
        },
        timer: function (seconds, tick, result) {
            if (seconds !== -1) {
                tick(seconds);
                seconds -= 1;
                setTimeout(function () {
                    this.timer(seconds, tick, result);
                }.bind(this), 1000);
            } else {
                result();
            }
        },
        sec2time: function (timeInSeconds) {
            let pad = function (num, size) {
                    return ('000' + num).slice(size * -1);
                },
                time = parseFloat(timeInSeconds).toFixed(3),
                hours = Math.floor(time / 60 / 60),
                minutes = Math.floor(time / 60) % 60,
                seconds = Math.floor(time - minutes * 60),
                milliseconds = time.slice(-3);

            return pad(minutes, 2) + ':' + pad(seconds, 2)
            // return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
        }
    };

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
            this.set(JSON.stringify(object))
        };
        this.isJsonString = function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        };
    };

    MemoryTaskInit.init();
}

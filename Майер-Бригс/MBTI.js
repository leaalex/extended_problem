function MBTI(settings) {

    let element = settings.element;
    let questions = settings.questions;
    let interpretations = settings.interpretations;

    let state = {
        complete: true
    };
    let answer = undefined;

    if (settings.input) {
        if (settings.input.querySelector("input[type='text']")) {
            answer = new Answer(settings.input.querySelector("input[type='text']"));
            settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");
            if (answer.get()) {
                state = answer.getJSON()["answer"];
            }
        }
    }

    let submit_btn = element.closest(".problem").querySelector("button.submit.btn-brand");
    element.closest(".problem").parentNode.querySelector(".problem-progress").classList.add("hidden");
    $(".notification",element.closest(".problem").parentNode).hide();
    submit_btn.querySelector(".submit-label").innerHTML = "Проверить";
    submit_btn.classList.add("disabled");

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

    let MBTIInit = {
        init: function () {
            if (!state.student_answer){
                state.student_answer = utils.empty_arr([questions.length]);
                this.createTest();
            }
            else{
                if(state.complete){
                    this.createResult();
                    state.complete = false;
                    answer.setJSON({answer: state});
                }
                else{
                    state.student_answer = utils.empty_arr([questions.length]);
                    answer.setJSON({answer: state});
                    this.createTest();
                }
            }

        },
        createTest: function () {
            state.complete = true;
            let test_wrapper = utils.create("div", {className: "test-wrapper"});
            questions.forEach(function (question, index) {
                let question_block = utils.create("div", {
                    id: `question_${index}`,
                    className: "question-block"
                }, utils.create("div", {
                    className: "question-text",
                    html: `${index + 1}. ` + question.title
                }));
                let answers_block = utils.create("div", {className: "answers-block"});
                Object.keys(question.answers).forEach(function (answer, idx) {
                    // console.log(question.answers[answer])
                    let answer_block = utils.create("div", {className: "answer-block"});
                    let answer_input = utils.create("input", {
                        className: `radio-input`,
                        attr: {type: "radio", value: answer, name: `question_${index}`}
                    });
                    if (state.student_answer[index] === answer) answer_input.checked = true;
                    answer_input.addEventListener('change', function () {
                        state.student_answer[index] = answer_input.value;
                        utils.calculate_type();
                    });
                    let answer_label = utils.create("label", {className: `radio-label`, html: question.answers[answer]});
                    answer_label.prepend(answer_input);
                    answer_block.appendChild(answer_label);
                    answers_block.appendChild(answer_block);
                });
                question_block.appendChild(answers_block);
                test_wrapper.appendChild(question_block);
            });
            element.appendChild(test_wrapper);
        },
        createResult: function () {
            let student_result = utils.calculate_type();
            let result_wrapper = utils.create("div", {className: "result-wrapper"}, utils.create("h2",{html:"Ваш результат"}));
            let result_block = utils.create("div", {html:interpretations.types[student_result.join("")].title});
            result_wrapper.appendChild(result_block);
            element.appendChild(result_wrapper);
            submit_btn.classList.remove("disabled");
            submit_btn.querySelector(".submit-label").innerHTML = "Пройти ещё раз";
        }
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
        empty_arr: function (dimensions) {
            let array = [];

            for (let i = 0; i < dimensions[0]; ++i) {
                array.push(dimensions.length === 1 ? "" : this.empty_arr(dimensions.slice(1)));
            }
            return array;
        },
        range: function (start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        },
        let_count(arr, letter){
            return arr.filter(l=>l===letter).length;
        },
        calculate_type: function () {
            let result = ["", "", "", ""];
            let calc_arr = [];
            utils.range(1, 7).forEach(function(item){
                let calc_arr_tmp = [];
                utils.range(0, 9).forEach(function(sub_item){
                    calc_arr_tmp.push(sub_item*7 + item)
                });
                calc_arr.push(calc_arr_tmp)
            });

            let E_I_ans = calc_arr[0].map(q_num=>state.student_answer[q_num-1]);
            let E_I_brightness = (Math.max(utils.let_count(E_I_ans, 'a'), utils.let_count(E_I_ans, 'b')) - 5) * 2;
            result[0] = utils.let_count(E_I_ans, 'a') <= utils.let_count(E_I_ans, 'b') ?  "I" : "E";

            let S_N_ans = calc_arr[1].concat(calc_arr[2]).map(q_num=>state.student_answer[q_num-1]);
            let S_N_brightness = Math.max(utils.let_count(S_N_ans, 'a'), utils.let_count(S_N_ans, 'b')) - 10;
            result[1] = utils.let_count(S_N_ans, 'a') <= utils.let_count(S_N_ans, 'b') ?  "N" : "S";

            let T_F_ans = calc_arr[3].concat(calc_arr[4]).map(q_num=>state.student_answer[q_num-1]);
            let T_F_brightness = Math.max(utils.let_count(T_F_ans, 'a'), utils.let_count(T_F_ans, 'b')) - 10;
            result[2] = utils.let_count(T_F_ans, 'a') <= utils.let_count(T_F_ans, 'b') ?  "F" : "T";

            let J_P_ans = calc_arr[5].concat(calc_arr[6]).map(q_num=>state.student_answer[q_num-1]);
            let J_P_brightness = Math.max(utils.let_count(J_P_ans, 'a'), utils.let_count(J_P_ans, 'b')) - 10;
            result[3] = utils.let_count(J_P_ans, 'a') <= utils.let_count(J_P_ans, 'b') ?  "P" : "J";

            let sum_brightness = E_I_brightness + S_N_brightness + T_F_brightness + J_P_brightness;
            console.log(E_I_brightness, " ", S_N_brightness, " ", T_F_brightness, " ", J_P_brightness, " = ", sum_brightness);

            answer.setJSON({answer: state});

            if (state.student_answer.every(item => item.length > 0)){
                submit_btn.classList.remove("disabled");
            }
            else{
                submit_btn.classList.add("disabled");
            }

            return result;


        }
    };


    MBTIInit.init();
}

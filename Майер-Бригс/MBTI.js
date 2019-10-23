function MBTI(settings) {

    let element = settings.element;
    let questions = settings.questions;
    let interpretations = settings.interpretations;
    let task_wording = settings.task_wording;

    let state = {
        type: [],
        sum_brightness: 0,
        complete: true,
    };
    let answer = undefined;

    let letters_types = {
        I: "Интравертный",
        E: "Экстравертный",
        S: "Сенсорный",
        N: "Интуитивный",
        T: "Мыслительный",
        F: "Чувствующий",
        J: "Решающий",
        P: "Воспринимающий"
    };

    let description_titles = {
        general: "Общая характеристика",
        first: "Первое впечатление",
        communication: "Общение",
        sex: "Секс и близость",
        finance: "Финансы",
        conflict: "Конфликт",
        commitment: "Обязательства",
        parenthood: "Родительство",
        contracts: "Контракты",
        end_relationship: "Окончание отношений",
    };

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

            let wording_wrapper = utils.create("div", {className: "wording-wrapper"});
            task_wording.forEach(function (paragraph) {
                wording_wrapper.appendChild(utils.create("p", {html: paragraph}));
            });
            test_wrapper.appendChild(wording_wrapper);

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

            let type_let = state.type.map(item=>Object.keys(item)[0]).join("");

            let student_type = interpretations.types[type_let];

            let result_wrapper = utils.create("div", {className: "result-wrapper"}, utils.create("h2",{html:"Психологический портрет: "}));

            let student_type_title = utils.create("h2",{className: "student_type_title", html: student_type.title});

            let temper_type = utils.create("p",{html:"Тип тепмерамента: "}, utils.create("strong",{}, utils.create("i",{html: "«" + student_type.temper_type + "»"})));

            let lol_html =
                  Object.keys(state.type[0])[0] + " - " + letters_types[Object.keys(state.type[0])[0]] + " (" + state.type[0][Object.keys(state.type[0])[0]] + ") + "
                + Object.keys(state.type[1])[0] + " - " + letters_types[Object.keys(state.type[1])[0]] + " (" + state.type[1][Object.keys(state.type[1])[0]] + ") + "
                + Object.keys(state.type[2])[0] + " - " + letters_types[Object.keys(state.type[2])[0]] + " (" + state.type[2][Object.keys(state.type[2])[0]] + ") + "
                + Object.keys(state.type[3])[0] + " - " + letters_types[Object.keys(state.type[3])[0]] + " (" + state.type[3][Object.keys(state.type[3])[0]] + ") = "
                + state.sum_brightness;

            let sum_brightness = utils.create("p",{html:"Суммарная яркость факторов: "}, utils.create("strong",{html:  lol_html}));

            let result_header_a = utils.create("h2",{className: "a-b-header", html: student_type.description.A_thesis});
            // let result_header_a = utils.create("h2",{className: "a-b-header", html: student_type.description.A_thesis});
            result_wrapper.appendChild(student_type_title);
            result_wrapper.appendChild(temper_type);
            result_wrapper.appendChild(sum_brightness);

            result_wrapper.appendChild(result_header_a);
            student_type.description.A_description.forEach(function (description_paragraph) {
                result_wrapper.appendChild(utils.create("p",{html:description_paragraph}));
            });

            let result_header_b = utils.create("h2",{className: "a-b-header", html: student_type.description.B_thesis});
            result_wrapper.appendChild(result_header_b);

            Object.keys(description_titles).forEach(function (d_t) {
                let dt_div = utils.create("p",{html: student_type.description[d_t]});
                let dt_div_title = utils.create("strong", {className: "d_t_description", html: description_titles[d_t] + ". "});
                dt_div.prepend(dt_div_title);
                result_wrapper.appendChild(dt_div);
            });

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
            result[0] = utils.let_count(E_I_ans, 'a') <= utils.let_count(E_I_ans, 'b') ?  {"I": E_I_brightness} : {"E":E_I_brightness};

            let S_N_ans = calc_arr[1].concat(calc_arr[2]).map(q_num=>state.student_answer[q_num-1]);
            let S_N_brightness = Math.max(utils.let_count(S_N_ans, 'a'), utils.let_count(S_N_ans, 'b')) - 10;
            result[1] = utils.let_count(S_N_ans, 'a') <= utils.let_count(S_N_ans, 'b') ?  {"N":S_N_brightness} : {"S":S_N_brightness};

            let T_F_ans = calc_arr[3].concat(calc_arr[4]).map(q_num=>state.student_answer[q_num-1]);
            let T_F_brightness = Math.max(utils.let_count(T_F_ans, 'a'), utils.let_count(T_F_ans, 'b')) - 10;
            result[2] = utils.let_count(T_F_ans, 'a') <= utils.let_count(T_F_ans, 'b') ?  {"F":T_F_brightness} : {"T":T_F_brightness};

            let J_P_ans = calc_arr[5].concat(calc_arr[6]).map(q_num=>state.student_answer[q_num-1]);
            let J_P_brightness = Math.max(utils.let_count(J_P_ans, 'a'), utils.let_count(J_P_ans, 'b')) - 10;
            result[3] = utils.let_count(J_P_ans, 'a') <= utils.let_count(J_P_ans, 'b') ?  {"P": J_P_brightness} : {"J":J_P_brightness};

            let sum_brightness = E_I_brightness + S_N_brightness + T_F_brightness + J_P_brightness;
            state.type = result;
            state.sum_brightness = sum_brightness;

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

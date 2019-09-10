function PhilosophyTest(settings) {
    let questions = settings.questions;
    let element = settings.element;
    let type = settings.type || "checkbox"; // radio
    let state = {};
    let answer = undefined;
    let interpretations = settings.interpretations;
    if (settings.input) {
        if (settings.input.querySelector("input[type='text']")) {
            answer = new Answer(settings.input.querySelector("input[type='text']"));
            // settings.input.querySelector(".message").classList.add("hidden");
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

    let PhilosophyTestInit = {
        init: function () {
            if (state.result){
                this.buildResult();
                submit_btn.classList.add("hidden");
            }
            else{
                submit_btn.classList.add("disabled");
                this.createTest();
            }
        },

        createTest: function () {
            let test_wrapper = utils.create("div", {className: "test-wrapper"});
            Object.keys(questions).forEach(function (question, index) {
                let question_block = utils.create("div", {
                    id: `question_${index}`,
                    className: "question-block"
                }, utils.create("div", {
                    className: "question-text",
                    html: `${index + 1}. ` + questions[question].text
                }));
                let answers_block = utils.create("div", {className: "answers-block"});
                questions[question].answers.forEach(function (answer, idx) {
                    let answer_block = utils.create("div", {className: "answer-block"});
                    let answer_input = utils.create("input", {
                        className: `${type}-input`,
                        attr: {type: type, value: answer.let, name: `question_${index}`}
                    });
                    answer_input.addEventListener('change', function () {
                        utils.buildAnswer();
                    });
                    let answer_label = utils.create("label", {className: `${type}-label`, html: answer.text});
                    answer_label.prepend(answer_input);
                    answer_block.appendChild(answer_label);
                    answers_block.appendChild(answer_block);
                });
                question_block.appendChild(answers_block);
                test_wrapper.appendChild(question_block);
            });
            element.appendChild(test_wrapper);
        },
        buildResult: function () {
            let result_wrapper = utils.create("div", {className: "result-wrapper"}, utils.create("h2",{html:"Ваш результат"}));
            interpretations[state.result].interpretation.forEach(function(paragraph){
                let p = utils.create("p", {html: paragraph});
                result_wrapper.appendChild(p)
            });
            element.innerHTML = "";
            element.appendChild(result_wrapper);
        }
    };

    let utils = {
        buildAnswer() {
            state.answers = {};
            element.querySelectorAll(".question-block").forEach(function (block) {
                let inputs = block.querySelectorAll('input[name="' + block.id + '"]');
                state.answers[block.id] = [];
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].checked) {
                        state.answers[block.id].push(inputs[i].value);
                    }
                }
            });
            if (Object.keys(state.answers).every(item => state.answers[item].length > 0)) {
                submit_btn.removeAttribute("disabled");
                submit_btn.classList.remove("disabled");
            } else {
                submit_btn.classList.add("disabled");
            }
            state.result = this.interpret();
            console.log(state);
            answer.setJSON({answer: state});
        },
        interpret: function () {
            let possible_results = {};
            Object.keys(interpretations).forEach(item=> possible_results[item] = 0);
            Object.keys(state.answers).forEach(function(answer){
                for (let i = 0; i < Object.keys(interpretations).length; i++) {
                    let l = Object.keys(interpretations)[i];
                    if (arraysEqual(state.answers[answer], interpretations[l].answers[answer])){
                        possible_results[l] += 1;
                        break;
                    }
                }
            });
            // console.log("__________________________________________________________");
            // console.log(possible_results);
            let res = Object.keys(possible_results).reduce((a, b) => possible_results[a] > possible_results[b] ? a : b);
            return res;
        },

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
    };

    function arraysEqual(a, b) {
        a = a.sort();
        b = b.sort();
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    PhilosophyTestInit.init();
}

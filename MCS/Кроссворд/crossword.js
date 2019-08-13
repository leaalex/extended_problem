function Crossword(settings) {

    /*
    * Возможные ориентации слова:
    *   horizontal
    *   vertical
    *
    *
    * */

    //

    let data_1 = [
        {
            clue: "First letter of greek alphabet",
            answer: "alpha",
            position: 1,
            orientation: "across",
            start_x: 1,
            start_y: 1,
            hint: "Подсказка к вопросу 1"
        },
        {
            clue: "Not a one ___ motor, but a three ___ motor",
            answer: "phase",
            position: 3,
            orientation: "across",
            start_x: 7,
            start_y: 1,
            hint: "Подсказка к вопросу 3"
        },
        {
            clue: "Created from a separation of charge",
            answer: "capacitance",
            position: 5,
            orientation: "across",
            start_x: 1,
            start_y: 3,
            hint: "Подсказка к вопросу 5"
        },
        {
            clue: "The speeds of engines without and accelaration",
            answer: "idlespeeds",
            position: 8,
            orientation: "across",
            start_x: 1,
            start_y: 5,
            hint: "Подсказка к вопросу 8"
        },
        {
            clue: "Complex resistances",
            answer: "impedances",
            position: 10,
            orientation: "across",
            start_x: 2,
            start_y: 7,
            hint: "Подсказка к вопросу 10"
        },
        {
            clue: "This device is used to step-up, step-down, and/or isolate",
            answer: "transformer",
            position: 13,
            orientation: "across",
            start_x: 1,
            start_y: 9,
            hint: "Подсказка к вопросу 13"
        },
        {
            clue: "Type of ray emitted frm the sun",
            answer: "gamma",
            position: 16,
            orientation: "across",
            start_x: 1,
            start_y: 11,
            hint: "Подсказка к вопросу 16"
        },
        {
            clue: "C programming language operator",
            answer: "cysan",
            position: 17,
            orientation: "across",
            start_x: 7,
            start_y: 11,
            hint: "Подсказка к вопросу 17"
        },
        {
            clue: "Defines the alpha-numeric characters that are typically associated with text used in programming",
            answer: "ascii",
            position: 1,
            orientation: "down",
            start_x: 1,
            start_y: 1,
            hint: "Подсказка к вопросу 1"
        },
        {
            clue: "Generally, if you go over 1kV per cm this happens",
            answer: "arc",
            position: 2,
            orientation: "down",
            start_x: 5,
            start_y: 1,
            hint: "Подсказка к вопросу 2"
        },
        {
            clue: "Control system strategy that tries to replicate the human through process (abbr.)",
            answer: "ann",
            position: 4,
            orientation: "down",
            start_x: 9,
            start_y: 1,
            hint: "Подсказка к вопросу 4"
        },
        {
            clue: "Greek variable that usually describes rotor positon",
            answer: "theta",
            position: 6,
            orientation: "down",
            start_x: 7,
            start_y: 3,
            hint: "Подсказка к вопросу 6"
        },
        {
            clue: "Electromagnetic (abbr.)",
            answer: "em",
            position: 7,
            orientation: "down",
            start_x: 11,
            start_y: 3,
            hint: "Подсказка к вопросу 7"
        },
        {
            clue: "No. 13 across does this to a voltage",
            answer: "steps",
            position: 9,
            orientation: "down",
            start_x: 5,
            start_y: 5,
            hint: "Подсказка к вопросу 9"
        },
        {
            clue: "Emits a lout wailing sound",
            answer: "siren",
            position: 11,
            orientation: "down",
            start_x: 11,
            start_y: 7,
            hint: "Подсказка к вопросу 11"
        },
        {
            clue: "Information technology (abbr.)",
            answer: "it",
            position: 12,
            orientation: "down",
            start_x: 1,
            start_y: 8,
            hint: "Подсказка к вопросу 12"
        },
        {
            clue: "Asynchronous transfer mode (abbr.)",
            answer: "atm",
            position: 14,
            orientation: "down",
            start_x: 3,
            start_y: 9,
            hint: "Подсказка к вопросу 14"
        },
        {
            clue: "Offset current control (abbr.)",
            answer: "occ",
            position: 15,
            orientation: "down",
            start_x: 7,
            start_y: 9,
            hint: "Подсказка к вопросу 15"
        }
    ]

    let data = [
        {
            clue: "Польский ученый, создавший гелиоцентрическую модель строения Солнечной системы и достаточно точно определивший относительные расстояния от Солнца до планет",
            answer: "коперник",
            position: 1,
            orientation: "across",
            start_x: 1,
            start_y: 3,
            hint: "Посказка горизонталь 1"
        },
        {
            clue: "Греческий ученый и поэт, благодаря своим астрономическим наблюдениям достаточно точно вычисливший расстояние от экватора до тропика",
            answer: "эратосфен",
            position: 2,
            orientation: "across",
            start_x: 1,
            start_y: 6,
            hint: "Посказка горизонталь 2"
        },
        {
            clue: "Итальянский и французский ученый-астроном, внесший значительный вклад в исследование Луны и планет Солнечной системы и их спутников, определивший расстояние от Солнца до Земли по параллаксу Марса",
            answer: "кассини",
            position: 7,
            orientation: "across",
            start_x: 6,
            start_y: 9,
            hint: "Посказка горизонталь 7"
        },
        {
            clue: "Немецкий физик, лауреат Нобелевской премии, один из создателей квантовой механики, известен широкой публике благодаря мысленному эксперименту, демонстрирующему неполноту квантовой механики при переходе от субатомных систем к макроскопическим",
            answer: "шредингер",
            position: 9,
            orientation: "across",
            start_x: 1,
            start_y: 15,
            hint: "Посказка горизонталь 9"
        },
        {
            clue: "Датский физик, один из создателей квантовой механики, создатель первой квантовой теории атома",
            answer: "бор",
            position: 11,
            orientation: "across",
            start_x: 12,
            start_y: 5,
            hint: "Посказка горизонталь 11"
        },
        {
            clue: "Древнегреческий философ, развивал атомистические идеи Демокрита, рассматривал Вселенную как бесконечность",
            answer: "эпикур",
            position: 14,
            orientation: "across",
            start_x: 11,
            start_y: 7,
            hint: "Посказка горизонталь 14"
        },
        {
            clue: "Английский ученый, заложивший основы классической механики, в том числе закон всемирного тяготения и законы механики",
            answer: "ньютон",
            position: 15,
            orientation: "across",
            start_x: 11,
            start_y: 14,
            hint: "Посказка горизонталь 15"
        },
        {
            clue: "Немецкий физик, лауреат Нобелевской премии, основоположник квантовой физики, сформулировал второе начало термодинамики в виде принципа возрастания энтропии",
            answer: "планк",
            position: 16,
            orientation: "across",
            start_x: 15,
            start_y: 12,
            hint: "Посказка горизонталь 16"
        },
        {
            clue: "Итальянский ученый, гелиоцентрист, основатель экспериментальной физики, одним из первых стал использовать телескоп для исследования небесных тел",
            answer: "галилей",
            position: 17,
            orientation: "across",
            start_x: 10,
            start_y: 18,
            hint: "Посказка горизонталь 17"
        },


        {
            clue: "Итальянский философ, гелиоцентрист, рассматривающий звезды как далекие солнца, за свои убеждения пал жертвой римской инквизиции",
            answer: "бруно",
            position: 3,
            orientation: "down",
            start_x: 5,
            start_y: 2,
            hint: "Посказка вертикаль 3"
        },
        {
            clue: "Английский физик, основоположник учения об электромагнитном поле",
            answer: "фарадей",
            position: 4,
            orientation: "down",
            start_x: 3,
            start_y: 5,
            hint: "Посказка вертикаль 4"
        },
        {
            clue: "Древнегреческий философ, предполагавший, что Земля имеет форму цилиндра, парящего в центре мира, а звезды и Луна – это «окошки» в  кольцах-торах, окружающих Землю",
            answer: "анаксимандр",
            position: 5,
            orientation: "down",
            start_x: 9,
            start_y: 5,
            hint: "Посказка вертикаль 5"
        },
        {
            clue: "Американский астроном, внес значительный вклад в современные представления о Вселенной, существовании других галактик, а также применил эффект Доплера к космическим объектам (открыл красное смещение).",
            answer: "хаббл",
            position: 6,
            orientation: "down",
            start_x: 7,
            start_y: 8,
            hint: "Посказка вертикаль 6"
        },
        {
            clue: "Древнегреческий философ, основоположник атомистики, внес значительный вклад в формирование идей Демокрита",
            answer: "левкипп",
            position: 8,
            orientation: "down",
            start_x: 5,
            start_y: 11,
            hint: "Посказка вертикаль 8"
        },
        {
            clue: "Древнегреческий ученый и философ, соратники приписывают ему открытие шарообразности  Земли",
            answer: "пифагор",
            position: 10,
            orientation: "down",
            start_x: 16,
            start_y: 1,
            hint: "Посказка вертикаль 10"
        },
        {
            clue: "Немецкий ученый, первым сформулировал три закона движения планет в Солнечной ситсеме",
            answer: "кеплер",
            position: 12,
            orientation: "down",
            start_x: 3,
            start_y: 14,
            hint: "Посказка вертикаль 12"
        },
        {
            clue: "Древнегреческий философ, ввел положение о всеобщей изменчивости и предложил геоцентрическую модель мира",
            answer: "гераклит",
            position: 13,
            orientation: "down",
            start_x: 14,
            start_y: 3,
            hint: "Посказка вертикаль 13"
        },
        {
            clue: "Немецкий физик-теоретик, один из основателей  современной теоретической физики, автор теории относительности.",
            answer: "эйнштейн",
            position: 14,
            orientation: "down",
            start_x: 11,
            start_y: 7,
            hint: "Посказка вертикаль 14"
        },
        {
            clue: "Создал геоцентрическую модель мира, предсказывающую движение планет, по предполагаемым траекториям – деферентам и эпициклам.",
            answer: "птолемей",
            position: 16,
            orientation: "down",
            start_x: 15,
            start_y: 12,
            hint: "Посказка вертикаль 16"
        }
    ]

    let horizontal_sign = "across";
    let vertical_sign = "down";

    let app_data = {};
    let element = settings.element;
    let activePosition = 0;
    let currentOrientation = "across";
    let last_hint_index = -1;

    let hint_block;
    let grade = 0;


    app_data.student_state = {};
    app_data.questions = data;
    app_data.state = {};

    let answer = undefined;
    if(document.querySelector("#crossword_input")){
        answer = new Answer(document.querySelector("#crossword_input").querySelector("input[type='text']"));
        if(answer.get()){
            app_data.state =  answer.getJSON()["answer"]["user_state"];
        }
    }

    let rowsCount = 0,
        colsCount = 0;

    function Answer(elementField) {
        this.elementField = elementField;
        this.fieldValue = "";
        this.fieldObject = {};
        this.get = function() {
            this.fieldValue = elementField.value;
            return this.fieldValue;
        };
        this.set = function(value) {
            if (value == undefined) value = this.fieldValue;
            elementField.value = value;
        };
        this.getJSON = function() {
            if (this.isJsonString(this.get())) this.fieldObject = JSON.parse(this.get());
            return this.fieldObject;
        };
        this.setJSON = function(object) {
            if (object == undefined) object = this.fieldObject;
            this.set(JSON.stringify(object))
        };
        this.isJsonString = function(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        };
    };

    let CrosswordInit = {
        init: function () {
            app_data.questions.sort(function (a, b) {
                return b.orientation.localeCompare(a.orientation);
            }).sort(function (a, b) {
                return a.position - b.position;
            });
            this.calcCoordinates();
            this.buildTable();
            this.buildEntriesAndClues();
            this.createHandlers();

            if(app_data.state){
                utils.restoreState();
            }
        },

        calcCoordinates: function () {
            app_data.questions.forEach(function (item, i) {
                app_data.questions[i].coords = [];
                app_data.questions[i].unique_position = i;
                app_data.questions[i].raw_coords = [];
                let start_coords = {
                    x: parseInt(app_data.questions[i].start_x),
                    y: parseInt(app_data.questions[i].start_y)
                };
                app_data.questions[i].answer.split('').forEach(function (letter, index) {
                    let new_coords = {x: start_coords.x, y: start_coords.y};
                    if (item.orientation === horizontal_sign) {
                        new_coords.x = start_coords.x + index;
                    } else {
                        new_coords.y = start_coords.y + index;
                    }
                    app_data.questions[i].raw_coords.push({x: new_coords.x, y: new_coords.y});
                    app_data.questions[i].coords.push(new_coords.x.toString() + "," + new_coords.y.toString());
                    rowsCount = new_coords.y > rowsCount ? new_coords.y : rowsCount;
                    colsCount = new_coords.x > colsCount ? new_coords.x : colsCount;
                });
            });
        },

        buildTable: function () {
            let table_block = utils.create("div", {className: "table-block"});

            let table = utils.create("div", {className: ""});
            [...Array(rowsCount).keys()].forEach(function (row, i) {
                let tr = utils.create("div", {className:"row"});
                [...Array(colsCount).keys()].forEach(function (cell, j) {
                    let td = utils.create("div", {className: "cell", attr: {"data-coords": (j + 1) + "," + (i + 1)}});
                    tr.appendChild(td);
                });
                table.appendChild(tr)
            });
            table_block.appendChild(table);
            hint.init();
            table_block.appendChild(hint_block);
            element.appendChild(table_block);
        },

        buildEntriesAndClues: function () {
            let clues_block = utils.create("div", {className: "clues-block"});
            let clues_block_horizontal = utils.create("div", {className: "horizontal"}, utils.create("h3", {text: "По горизонтали"}));
            let clues_block_horizontal_content = utils.create("div", {className: "clue-content"});
            let clues_block_vertical = utils.create("div", {className: "vertical"}, utils.create("h3", {text: "По вертикали"}));
            let clues_block_vertical_content = utils.create("div", {className: "clue-content"});

            app_data.questions.forEach(function (item) {
                item.cells = [];
                item.raw_coords.forEach(function (coord) {
                    let current_cell = element.querySelector('[data-coords="' + coord.x + ',' + coord.y + '"]');
                    current_cell.classList.add("entry-" + item.position);
                    current_cell.classList.add("position-" + item.unique_position);
                    current_cell.classList.add("input");

                    if (!Array.from(current_cell.children).map(c => c.tagName.toLowerCase()).includes("input")) {
                        let current_cell_input = utils.create("input", {attr: {"maxlength": 1, type: "text"}});
                        current_cell.appendChild(current_cell_input);
                    }
                    item.cells.push(current_cell);
                });
                let clue = utils.create("div", {
                    // text: item.position + ". " + item.clue,
                    // html: utils.create("span",{text:item.position}),
                    attr: {"data-position": item.unique_position},
                    className: "clue"
                },
                    utils.create("span",{text:item.position+". ", className:"clue-number"}),
                    utils.create("span",{html:item.clue}),
                    );
                if (item.orientation === horizontal_sign) {
                    clues_block_horizontal_content.appendChild(clue);
                } else {
                    clues_block_vertical_content.appendChild(clue);
                }
                item.html_clue = clue;

            });
            let unique_coords = utils.removeDuplicates(app_data.questions.map(function (item) {
                return {x: item.start_x, y: item.start_y, pos: item.position}
            }));
            unique_coords.forEach(function (item) {
                let current_cell = element.querySelector('[data-coords="' + item.x + ',' + item.y + '"]');
                // current_cell.querySelector("input").placeholder = item.pos; // Номер вопроса placeholder
                current_cell.appendChild(utils.create("span", {text: item.pos})) // Номер вопроса span
            });

            clues_block_horizontal.appendChild(clues_block_horizontal_content);
            clues_block.appendChild(clues_block_horizontal);
            clues_block_vertical.appendChild(clues_block_vertical_content);
            clues_block.appendChild(clues_block_vertical);
            element.appendChild(clues_block);

        },

        createHandlers: function () {

            element.onkeyup = function(evt){
                if ( evt.keyCode === 27 || evt.keyCode === 13) {
                    hint.hide();
                }
            };


            app_data.questions.forEach(function (item) {
                item.cells.forEach(function (html_cell, idx, all_html_cell) {
                    html_cell.onclick = function () {
                        hint.hide();
                        // last_hint_index = -1;
                        utils.highlightEntryAndClue(item);
                        if (!this.classList.contains("correct-cell")) {
                            html_cell.querySelector("input").select();
                        }
                        activePosition = item.unique_position;
                    };

                    html_cell.onkeyup = function(evt){
                        utils.checkAllWords();
                        if ( evt.keyCode === 16 || evt.keyCode === 17 || evt.keyCode === 18 || evt.keyCode === 9  || evt.keyCode === 20 ) {

                            return false;
                        }
                        hint.hide();
                        let curr_cells = app_data.questions.filter(c=>c.unique_position === activePosition)[0].cells;
                        let curr_ind = curr_cells.indexOf(html_cell);
                        if (curr_ind >=0 && curr_ind < curr_cells.length-1){
                            if (!curr_cells[curr_ind+1].classList.contains("correct-cell")){
                                curr_cells[curr_ind+1].querySelector("input").select();
                            }
                            else {
                                if ((curr_cells.length-1) >= curr_ind+2){
                                    if (!curr_cells[curr_ind+2].classList.contains("correct-cell")) {
                                        curr_cells[curr_ind + 2].querySelector("input").select();
                                    }
                                }
                            }
                        }
                        // utils.toNextCell();
                        utils.showHint(activePosition);
                        evt.preventDefault();
                        return false;
                    };

                    item.html_clue.onclick = function (evt) {
                        utils.highlightEntryAndClue(item);
                        if (!item.cells[0].classList.contains("correct-cell")) {
                            item.cells[0].querySelector("input").select();
                        }
                        activePosition = item.unique_position;
                        hint.hide();
                    }

                });
            });




        }


    };

    let hint = {

        // let dd="";

        init: function(){
            let close_btn = utils.create("button", {text: "Скрыть"});
            hint_block = utils.create("div", {className:"hint-block"},
                utils.create("div", {className:"hint-text"}));
            hint_block.appendChild(close_btn);
            let that = this;
            close_btn.onclick = function(){
                that.hide();
            };
            this.hide();


        },
        hide: function(){
            hint_block.classList.add("hidden");
        },
        show: function(){
            hint_block.classList.remove("hidden");
        },

        setValue: function (item) {
            hint_block.querySelector(".hint-text").innerHTML = item.hint + ". " + item.clue;
            // let hint_top = item.cells[item.cells.length-1].getBoundingClientRect().top;
            // let hint_left = item.cells[item.cells.length-1].getBoundingClientRect().left + item.cells[item.cells.length-1].getBoundingClientRect().width;
            // hint_block.style.top = hint_top+"px";
            // hint_block.style.left = hint_left+"px";
            if(last_hint_index != item.unique_position){
                this.show();
                last_hint_index = item.unique_position;
            }
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
        removeDuplicates: function (arr) {
            const result = [];
            const duplicatesIndices = [];
            arr.forEach((current, index) => {
                if (duplicatesIndices.includes(index)) return;
                result.push(current);
                for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
                    const comparison = arr[comparisonIndex];
                    const currentKeys = Object.keys(current);
                    const comparisonKeys = Object.keys(comparison);
                    if (currentKeys.length !== comparisonKeys.length) continue;
                    const currentKeysString = currentKeys.sort().join("").toLowerCase();
                    const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
                    if (currentKeysString !== comparisonKeysString) continue;
                    let valuesEqual = true;
                    for (let i = 0; i < currentKeys.length; i++) {
                        const key = currentKeys[i];
                        if (current[key] !== comparison[key]) {
                            valuesEqual = false;
                            break;
                        }
                    }
                    if (valuesEqual) duplicatesIndices.push(comparisonIndex);
                }
            });
            return result;
        },
        highlightEntryAndClue: function (item) {

            // let question_id = item.unique_position;
            app_data.questions.forEach((q) => {
                q.html_clue.classList.remove("active-clue");
                q.cells.forEach(cell => cell.classList.remove("active-cell"))
            });
            if (item){
                item.html_clue.classList.add("active-clue");
                item.cells.forEach(cell => cell.classList.add("active-cell"));
            }
        },
        toNextCell: function (e, override) {

        },
        checkAllWords: function (){
            grade = 0;
            app_data.questions.forEach(function (item) {
                let student_str = item.cells.map(cell => cell.querySelector("input").value).join('').toLowerCase();
                if (item.answer.toLowerCase() === student_str) {
                    grade += 1;
                    item.cells.forEach(cell => {
                        cell.classList.add("correct-cell");
                        cell.querySelector("input").blur()
                    });
                    item.html_clue.classList.add("correct-clue");
                }
            });
            // console.log(last_hint_index);
            this.buildState();
        },
        showHint: function (pos) {
            let item = app_data.questions.filter(c=>c.unique_position === pos)[0];
            let student_str = item.cells.map(cell => cell.querySelector("input").value).join('').toLowerCase();
            if (item.answer.length === student_str.length){
                if(item.answer.toLowerCase() !== student_str){
                    // console.log("show hint", );
                    hint.setValue(item);

                }
            }
            // console.log(item);
        },
        buildState: function () {
            app_data.state = {};
            // let grade = 0;
            let max_grade = app_data.questions.length;
            app_data.questions.forEach(function (item) {
                app_data.state["question_" + item.unique_position] = {};
                item.cells.forEach(function (cell) {
                    app_data.state["question_" + item.unique_position][cell.getAttribute("data-coords")] = cell.querySelector("input").value;
                })
            });
            // localStorage.setItem("crossword_student_state", JSON.stringify(app_data.state))
            if(answer){
                answer.setJSON({answer: {"user_state": app_data.state, "grade": (grade/max_grade).toFixed(7)}});
            }
        },
        restoreState: function () {
            // if (localStorage.getItem("crossword_student_state")) {
            //     app_data.state = JSON.parse(localStorage.getItem("crossword_student_state"));
                Object.keys(app_data.state).forEach(function (item) {
                    Object.keys(app_data.state[item]).forEach(function (sub_item) {
                        element.querySelector('[data-coords="' + sub_item + '"] input').value = app_data.state[item][sub_item];
                    });
                });
                this.checkAllWords();
            // } else {
            //     console.log("localStorage is empty");
            // }
        },
    };

    CrosswordInit.init();
};

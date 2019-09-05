function Crossword(settings) {

    /*
    * settings:
    *    - element - html-контейнер кроссворда
    *    - language - язык: "ru" || "en"
    *    - cell_size - размер ячейки, напр. "2.05em"
    *
    * */

    let language = "ru";
    let labels = {
        ru: {
            hint_label: "Подсказка",
            horizontal_label: "По горизонтали",
            vertical_label: "По вертикали",
            answer_label: "Ответ",
            hide_label: "Скрыть",
            save_label: "Сохранить",
            check_label: "Проверить",
        },
        en:{
            hint_label: "Hint",
            horizontal_label: "Across",
            vertical_label: "Down",
            answer_label: "Answer",
            hide_label: "Hide",
            save_label: "Save",
            check_label: "Check",
        }
    };

    let horizontal_sign = "across";
    let vertical_sign = "down";

    let element = settings.element;

    if (settings.language){
        if(Object.keys(labels).includes(settings.language)){
            language = settings.language;
        }
    }
    let user_labels = labels[language];

    let client_check = true;
    if (settings.client_check !== undefined){
        if (typeof settings.client_check === "boolean"){
            client_check = settings.client_check;
        }
    }

    let btn_label = client_check ? user_labels.save_label : user_labels.check_label;
    element.closest(".problem").querySelector("button.submit.btn-brand .submit-label").innerHTML = btn_label;

    let activePosition = 0;

    let last_hint_index = -1;
    let hint_block;

    let app_data = {};
    app_data.student_state = {};
    app_data.questions = settings.data;
    // app_data.questions = data_mcs_01_03;
    app_data.state = {};

    let answer = undefined;
    if(settings.input) {
        if (settings.input.querySelector("input[type='text']")) {
            answer = new Answer(settings.input.querySelector("input[type='text']"));
            // settings.input.querySelector(".message").classList.add("hidden");
            settings.input.classList.add("hidden");

            answer.elementField.classList.add("hidden");

            if (answer.get()) {
                app_data.state = answer.getJSON()["answer"]["user_state"];
            }
        }
    }

    let grade = 0;
    let max_grade = app_data.questions.length;

    let rowsCount = 0,
        colsCount = 0;

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

            if (app_data.state) {
                utils.restoreState();
            }
        },
        calcCoordinates: function () {
            app_data.questions.forEach(function (item, i) {
                app_data.questions[i].coords = [];
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
                let tr = utils.create("div", {className: "row"});
                [...Array(colsCount).keys()].forEach(function (cell, j) {
                    let size_style =  settings.cell_size ? "width: " + settings.cell_size + " !important;" + "height: " + settings.cell_size + " !important;": "";
                    let td = utils.create("div", {className: "cell", attr: {"data-coords": (j + 1) + "," + (i + 1), style: size_style }});
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
            let clues_block_horizontal = utils.create("div", {className: "horizontal"}, utils.create("h2", {text: user_labels.horizontal_label}));
            let clues_block_horizontal_content = utils.create("div", {className: "clue-content"});
            let clues_block_vertical = utils.create("div", {className: "vertical"}, utils.create("h2", {text: user_labels.vertical_label}));
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
                        attr: {"data-position": item.unique_position},
                        className: "clue"
                    },
                    utils.create("span", {text: item.position + ". ", className: "clue-number"}),
                    utils.create("span", {html: item.clue}),
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
                current_cell.appendChild(utils.create("span", {text: item.pos, className: "question-num"})) // Номер вопроса span
            });

            clues_block_horizontal.appendChild(clues_block_horizontal_content);
            clues_block.appendChild(clues_block_horizontal);
            clues_block_vertical.appendChild(clues_block_vertical_content);
            clues_block.appendChild(clues_block_vertical);
            element.appendChild(clues_block);

        },
        createHandlers: function () {
            app_data.questions.forEach(function (item, item_idx) {
                item.cells.forEach(function (html_cell, idx, all_html_cell) {
                    html_cell.onclick = function () {
                        hint.hide();
                        utils.highlightEntryAndClue(item);
                        if (!this.classList.contains("correct-cell")) {
                            html_cell.querySelector("input").select();
                        }
                        activePosition = item.unique_position;
                    };
                    html_cell.onkeydown = function (evt) {
                        if (hint.isShow()) return false;
                        let curr_item = app_data.questions.filter(c => c.unique_position === activePosition)[0];
                        let curr_cells = curr_item.cells;
                        let curr_ind = curr_cells.indexOf(html_cell);
                        if (evt.keyCode === 9) {
                            let next = app_data.questions.filter(x => x.unique_position === 0)[0];
                            if (curr_item.unique_position < app_data.questions.length - 1) {
                                next = app_data.questions.filter(x => x.unique_position === curr_item.unique_position + 1)[0];
                            }

                            activePosition = next.unique_position;
                            utils.highlightEntryAndClue(next);
                            if (!next.cells[0].classList.contains("correct-cell")) {
                                next.cells[0].querySelector("input").select();
                            } else {
                                curr_cells[0].querySelector("input").blur();
                            }
                            return false;
                        }
                    };

                    html_cell.onkeyup = function (evt) {
                        if (client_check) {
                            utils.checkAllWords();
                        }
                        else{
                            utils.serverCheckedAllWords();
                        }
                        // hint.hide();
                        if (hint.isShow()) return false;
                        let curr_item = app_data.questions.filter(c => c.unique_position === activePosition)[0];
                        let curr_cells = curr_item.cells;
                        let curr_ind = curr_cells.indexOf(html_cell);

                        if (evt.keyCode === 16 || evt.keyCode === 17 || evt.keyCode === 18 || evt.keyCode === 9 || evt.keyCode === 20) {
                            // console.log("keyCode: " + evt.keyCode);
                            if (evt.keyCode === 9) {
                            }
                            return false;
                        } else if (evt.keyCode === 8 || evt.keyCode === 46) {
                            if (curr_ind > 0) {
                                if (!curr_cells[curr_ind - 1].classList.contains("correct-cell")) {
                                    curr_cells[curr_ind - 1].querySelector("input").select();
                                } else {
                                    if (curr_ind - 2 >= 0) {
                                        curr_cells[curr_ind - 2].querySelector("input").select();
                                    }
                                }
                            }
                            return false;
                        }
                        if (curr_ind >= 0 && curr_ind < curr_cells.length - 1) {
                            if (!curr_cells[curr_ind + 1].classList.contains("correct-cell")) {
                                curr_cells[curr_ind + 1].querySelector("input").select();
                            } else {
                                if ((curr_cells.length - 1) >= curr_ind + 2) {
                                    if (!curr_cells[curr_ind + 2].classList.contains("correct-cell")) {
                                        curr_cells[curr_ind + 2].querySelector("input").select();
                                    }
                                }
                            }
                        }

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

            document.onkeyup = function (evt) {
                if (evt.keyCode === 27 || evt.keyCode === 13 || evt.keyCode === 8) {
                    hint.hide();
                }
            };

        }
    };

    let hint = {
        init: function () {
            let close_btn = utils.create("button", {text: user_labels.hide_label});
            hint_block = utils.create("div", {className:"hint-wrapper"});
            let hint_content = utils.create("div", {className: "hint-block " + language});
            let hint_text = utils.create("div", {className: "hint-text"});
            hint_content.appendChild(hint_text);
            hint_content.appendChild(close_btn);
            hint_block.appendChild(hint_content);
            let that = this;
            close_btn.onclick = function () {
                that.hide();
            };
            this.hide();
        },
        hide: function () {
            hint_block.classList.add("hidden");
        },
        show: function () {
            hint_block.classList.remove("hidden");
        },
        setValue: function (item) {
            let position_label = "<strong>" + item.position + " " + (item.orientation === horizontal_sign ? user_labels.horizontal_label : user_labels.vertical_label).toLowerCase() + "</strong></br>";
            hint_block.querySelector(".hint-text").innerHTML = position_label + "<strong>" + user_labels.hint_label + "</strong>: " + item.hint; //+ ". " + item.clue + "";
            // if (last_hint_index !== item.unique_position) {  // тут под вопросом
                this.show();
            //     last_hint_index = item.unique_position;
            // }
        },
        isShow: function () {
            return !hint_block.classList.contains("hidden");
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
            app_data.questions.forEach((q) => {
                q.html_clue.classList.remove("active-clue");
                q.cells.forEach(cell => cell.classList.remove("active-cell"))
            });
            if (item) {
                item.html_clue.classList.add("active-clue");
                item.cells.forEach(cell => cell.classList.add("active-cell"));
            }
        },
        serverCheckedAllWords: function () {
            app_data.questions.forEach(function (item) {
                let student_str = item.cells.map(cell => cell.querySelector("input").value).join('').toLowerCase();
                if (item.answer.length === student_str.length) {
                    item.cells.forEach(cell => {
                        cell.querySelector("input").blur()
                    });
                }
            });
            this.buildState();
        },
        checkAllWords: function () {
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
            this.buildState();
        },
        showHint: function (pos) {
            let item = app_data.questions.filter(c => c.unique_position === pos)[0];
            let student_str = item.cells.map(cell => cell.querySelector("input").value).join('').toLowerCase();
            if (item.answer.length === student_str.length) {
                if (item.answer.toLowerCase() !== student_str) {
                    if (client_check) {
                        if (item.hint) {
                            hint.setValue(item);
                        }
                    }
                }
            }
        },
        buildState: function () {
            app_data.state = {};
            app_data.questions.forEach(function (item) {
                app_data.state["question_" + item.unique_position] = {};
                app_data.state["question_" + item.unique_position]["position"] = {};
                app_data.state["question_" + item.unique_position]["word"] = "";
                item.cells.forEach(function (cell) {
                    app_data.state["question_" + item.unique_position]["position"][cell.getAttribute("data-coords")] = cell.querySelector("input").value;
                });
                app_data.state["question_" + item.unique_position]["word"] = item.cells.map(cell => cell.querySelector("input").value).join('').toLowerCase()
            });

            if (answer) {
                let ans = {};
                ans["user_state"] = app_data.state;
                if(client_check){
                    ans["grade"] = grade;
                    ans["max_grade"] = max_grade;
                }
                answer.setJSON({answer: ans});
            }
        },
        restoreState: function () {
            Object.keys(app_data.state).forEach(function (item) {
                Object.keys(app_data.state[item]['position']).forEach(function (sub_item) {
                    if(element.querySelector('[data-coords="' + sub_item + '"] input')){
                        element.querySelector('[data-coords="' + sub_item + '"] input').value = app_data.state[item]['position'][sub_item];
                    }
                });
            });
            if (client_check) {
                this.checkAllWords();
            }
            else{

                if (answer.elementField.parentNode.parentNode.querySelector("span.message")){
                    let correct_words = JSON.parse(answer.elementField.parentNode.parentNode.querySelector("span.message").innerHTML)["correct_list"];
                    app_data.questions.forEach(function (item) {
                        if(correct_words.includes("question_" + item.unique_position)){
                            item.cells.forEach(cell => {
                                cell.classList.add("correct-cell");
                            });
                            item.html_clue.classList.add("correct-clue");
                        }
                    });
                }
            //     this.buildState();
            }
        },
    };

    CrosswordInit.init();
};

function CrosswordAnswer(settings){

    let element = settings.element;

    let app_data = {};
    app_data.questions = settings.data;
    let horizontal_sign = "across";

    let language = "ru";
    let labels = {
        ru: {
            answer_label: "Решение задачи"
        },
        en:{
            answer_label: "Correct answer"
        }
    };
    if (settings.language){
        if(Object.keys(labels).includes(settings.language)){
            language = settings.language;
        }
    }
    let user_labels = labels[language];

    let rowsCount = 0,
        colsCount = 0;

    let CrosswordAnswerInit = {
        init: function () {
            app_data.questions.sort(function (a, b) {
                return b.orientation.localeCompare(a.orientation);
            }).sort(function (a, b) {
                return a.position - b.position;
            });
            this.calcCoordinates();
            this.buildTable();
            this.buildEntries();
        },
        calcCoordinates: function () {
            app_data.questions.forEach(function (item, i) {
                app_data.questions[i].coords = [];
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
                let tr = utils.create("div", {className: "row"});
                [...Array(colsCount).keys()].forEach(function (cell, j) {
                    let size_style =  settings.cell_size ? "width: " + settings.cell_size + " !important;" + "height: " + settings.cell_size + " !important;": "";
                    let td = utils.create("div", {className: "cell", attr: {"data-coords": (j + 1) + "," + (i + 1), style: size_style }});
                    tr.appendChild(td);
                });
                table.appendChild(tr)
            });
            table_block.appendChild(table);
            element.appendChild(table_block);
        },
        buildEntries: function () {
            app_data.questions.forEach(function (item) {
                item.cells = [];
                item.raw_coords.forEach(function (coord, index) {
                    let current_cell = element.querySelector('[data-coords="' + coord.x + ',' + coord.y + '"]');
                    current_cell.classList.add("answer");
                    // current_cell.classList.add("input");
                    current_cell.appendChild(utils.create("span", {text: item.answer[index], className: "answer-letter"}));
                    item.cells.push(current_cell);
                });

            });
            let unique_coords = utils.removeDuplicates(app_data.questions.map(function (item) {
                return {x: item.start_x, y: item.start_y, pos: item.position}
            }));
            unique_coords.forEach(function (item) {
                let current_cell = element.querySelector('[data-coords="' + item.x + ',' + item.y + '"]');
                // current_cell.querySelector("input").placeholder = item.pos; // Номер вопроса placeholder
                current_cell.appendChild(utils.create("span", {text: item.pos, className:"question-num"})) // Номер вопроса span
            });
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
    };

    element.parentNode.prepend(utils.create('div', {className:"detailed-solution-header"}, utils.create('h2', {text: user_labels.answer_label})));
    CrosswordAnswerInit.init();

};

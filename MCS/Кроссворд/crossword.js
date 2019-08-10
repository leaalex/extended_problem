function Crossword(settings) {

    /*
    * Возможные ориентации слова:
    *   horizontal
    *   vertical
    *
    *
    * */

    let horizontal_sign = "across";
    let vertical_sign = "down";

    let app_data = {};
    let element = settings.element;
    app_data.student_state = {};
    app_data.questions = settings.data;
    app_data.state = {};

    let rowsCount = 0,
        colsCount = 0;

    let CrosswordInit = {
        init: function () {
            app_data.questions.sort(function (a, b) {
                return b.orientation.localeCompare(a.orientation);
            }).sort(function (a, b) {
                return a.position - b.position;
            });

            // app_data.questions
            // console.log(app_data.questions);
            this.calcCoordinates();
            this.buildTable();
            this.buildEntriesAndClues();
            utils.restoreState();
            this.createHandlers();
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
                    // console.log(colsCount, app_data.questions[i].answer)
                    colsCount = new_coords.x > colsCount ? new_coords.x : colsCount;
                });
                // console.log(app_data.questions[i].raw_coords)
            });
            // console.log(rowsCount, colsCount)
        },

        buildTable: function () {
            let table_block = utils.create("div", {className: "table-block"});
            let table = utils.create("table", {className: ""});
            [...Array(rowsCount).keys()].forEach(function (row, i) {
                let tr = utils.create("tr", {});
                [...Array(colsCount).keys()].forEach(function (cell, j) {
                    let td = utils.create("td", {className: "cell", attr: {"data-coords": (j + 1) + "," + (i + 1)}});
                    tr.appendChild(td);
                });
                table.appendChild(tr)
            });
            // console.log(table_block);
            table_block.appendChild(table);
            element.appendChild(table_block);
        },

        buildEntriesAndClues: function () {
            let clues_block = utils.create("div", {className: "clues-block"});
            let clues_block_horizontal = utils.create("div", {className: "horizontal"}, utils.create("h3", {text: "По горизонтали"}));
            let clues_block_horizontal_content = utils.create("div", {className: "content"});
            let clues_block_vertical = utils.create("div", {className: "vertical"}, utils.create("h3", {text: "По вертикали"}));
            let clues_block_vertical_content = utils.create("div", {className: "content"});

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
                    utils.create("span",{text:item.clue}),
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

            app_data.questions.forEach(function (item) {
                item.cells.forEach(function (html_cell) {
                    html_cell.onclick = function () {
                        utils.highlightEntryAndClue(item);
                        if (!this.classList.contains("correct-cell")) {
                            html_cell.querySelector("input").select();
                        }
                    };

                    html_cell.onkeyup = function(){
                        utils.checkAllWords();
                        console.log("onkeyup");
                    };

                    item.html_clue.onclick = function (evt) {
                        utils.highlightEntryAndClue(item)
                    }

                });
            });

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

            // Loop through each item in the original array
            arr.forEach((current, index) => {

                if (duplicatesIndices.includes(index)) return;

                result.push(current);

                // Loop through each other item on array after the current one
                for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {

                    const comparison = arr[comparisonIndex];
                    const currentKeys = Object.keys(current);
                    const comparisonKeys = Object.keys(comparison);

                    // Check number of keys in objects
                    if (currentKeys.length !== comparisonKeys.length) continue;

                    // Check key names
                    const currentKeysString = currentKeys.sort().join("").toLowerCase();
                    const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
                    if (currentKeysString !== comparisonKeysString) continue;

                    // Check values
                    let valuesEqual = true;
                    for (let i = 0; i < currentKeys.length; i++) {
                        const key = currentKeys[i];
                        if (current[key] !== comparison[key]) {
                            valuesEqual = false;
                            break;
                        }
                    }
                    if (valuesEqual) duplicatesIndices.push(comparisonIndex);

                } // end for loop

            }); // end arr.forEach()

            return result;
        },
        highlightEntryAndClue: function (item) {
            let question_id = item.unique_position;
            app_data.questions.forEach((q) => {
                q.html_clue.classList.remove("active-clue");
                q.cells.forEach(cell => cell.classList.remove("active-cell"))
            });
            item.html_clue.classList.add("active-clue");
            item.cells.forEach(cell => cell.classList.add("active-cell"));
        },
        toNextCell: function (e, override) {
        },
        checkAllWords: function () {
            app_data.questions.forEach(function (item) {
                let student_str = item.cells.map(cell => cell.querySelector("input").value).join('').toLowerCase();
                if (item.answer.toLowerCase() === student_str) {
                    item.cells.forEach(cell => {
                        cell.classList.add("correct-cell");
                        cell.querySelector("input").blur()
                    });
                    item.html_clue.classList.add("correct-clue");
                }
            });
            this.buildState();
        },
        showHint: function (item) {
            // console.log(item)
        },
        buildState: function () {
            app_data.state = {};
            app_data.questions.forEach(function (item) {
                app_data.state["question_" + item.unique_position] = {};
                item.cells.forEach(function (cell) {
                    app_data.state["question_" + item.unique_position][cell.getAttribute("data-coords")] = cell.querySelector("input").value;
                })
            });
            // console.log(app_data.state);
            localStorage.setItem("crossword_student_state", JSON.stringify(app_data.state))
        },
        restoreState: function () {
            if (localStorage.getItem("crossword_student_state")) {
                app_data.state = JSON.parse(localStorage.getItem("crossword_student_state"));
                Object.keys(app_data.state).forEach(function (item) {
                    Object.keys(app_data.state[item]).forEach(function (sub_item) {
                        element.querySelector('[data-coords="' + sub_item + '"] input').value = app_data.state[item][sub_item];
                    });
                });
                this.checkAllWords();
            } else {
                console.log("localStorage is empty");
            }
        },
    };
    CrosswordInit.init()
};

function MachineryManagement1(settings) {

    let element = settings.element;

    let count = 5;
    let source_data = settings.source_data;
    let groups_len = source_data.groups_len;
    let tables_len = settings.tables_len ? (settings.tables_len.length === 3) ? settings.tables_len : [16, 16, 16] : [16, 16, 16];

    let state = {
        table_1: [],
        table_2: [],
        table_3: [],
        durations: [0,0,0]
    };

    let groups = range(0,groups_len-1).map(g=>{return {title: `Транспортная партия #${g+1} (цифра "${g+1}" для ввода)`, id: "group_"+(g+1), btn:(g+1) } });

    console.log(groups);

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
    };

    let correctness = undefined;
    let answer = undefined;

    if (settings.input) {
        if (settings.input.querySelector("input[type='text']")) {
            answer = new Answer(settings.input.querySelector("input[type='text']"));
            if (settings.input.parentNode.parentNode.querySelector(".message")) {
                settings.input.parentNode.parentNode.querySelector(".message").classList.add("hidden");
            }

            settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");

            if (answer.get()) {
                state = answer.getJSON()["answer"];
                if (settings.input.parentNode.parentNode.querySelector("span.message")) {
                    correctness = JSON.parse(settings.input.parentNode.parentNode.querySelector("span.message").innerHTML);
                }
            }
        }
    }

    let MachineryManagementInit = {
        init: function () {

            if (state.table_1.length === 0 && state.table_2.length === 0 && state.table_3.length === 0) {
                state.table_1 = utils.zeros([count, tables_len[0]]);
                state.table_2 = utils.zeros([count, tables_len[1]]);
                state.table_3 = utils.zeros([count, tables_len[2]]);
            }



            element.appendChild(utils.create("h2", {html: "1. Определение длительности технологического цикла обработки партии деталей при всех ВДПТ"}));

            this.init_duration();

            element.appendChild(utils.create("h2", {html: "2. Построение графиков технологического цикла обработки партии деталей при всех ВДПТ"}));

            element.appendChild(utils.create("div", {html: `<p>Общие правила построения (заполнения) графиков при всех ВДПТ:</p>
                        <ul>
                        <li>все графики разбиты на <strong>ячейки</strong>, длина которых в минутах соответствует <strong>наиболее удобному масштабу</strong> для данного ВДПТ (подробнее см. <strong>лекционный материал п.2.2.3.</strong>);</li>
                        <li>для построения графика обработки деталей на конкретной операции необходимо:
                        <ul>
                        <li>для <strong>последовательного</strong> ВДПТ<strong> - отметить </strong>(одиночным кликом левой клавишей мыши) все ячейки, в которых происходит эта обработка;</li>
                        <li>для <strong>параллельного</strong> и <strong>параллельно-последовательного </strong>ВДПТ – <strong>вписать</strong> в соответствующие ячейки (где идёт обработка) <strong>ЦИФРУ</strong> порядкового номера транспортной партии, которая там обрабатывается.</li>
                        </ul>
                        </li>
                        </ul>
            `}));

            this.init_group_description();
            this.init_table_1();
            this.init_table_2();
            this.init_table_3();



            if (correctness !== undefined) {
                console.log(correctness);
                ["table_1", "table_2", "table_3"].forEach(function (item) {
                    if (correctness[item]) {
                        element.querySelector(`table.task-table#${item}`).classList.add("correct");
                    } else {
                        element.querySelector(`table.task-table#${item}`).classList.add("incorrect");
                    }
                });

                correctness["durations"].forEach(function (item, idx) {
                    if(item){
                        element.querySelector(`#duration_input_${idx+1}`).classList.add("correct");
                    }
                    else{
                        element.querySelector(`#duration_input_${idx+1}`).classList.add("incorrect");
                    }
                });

            }

        },
        init_duration: function (){
            let durations_block = utils.create("div", {className: "table-container"});
            let task_block = utils.create_text_task([], "");
            durations_block.appendChild(task_block);

            let input_block_1 = utils.create("div", {className: "duration-block"});
            let input_1_task = utils.create("p", {html: "Длительность технологического цикла обработки партии деталей при <strong>последовательном ВДПТ</strong> составит (мин):"});
            let input_1 = utils.create("input", {id: "duration_input_1", className:"duration-block-input", attr:{type: "number"}});
            input_1.value = state.durations[0];

            input_1.oninput = function(evt) {
                state.durations[0] = this.value;
                answer.setJSON({answer: state});
            };

            input_block_1.appendChild(input_1_task);
            input_block_1.appendChild(input_1);

            let input_block_2 = utils.create("div", {className: "duration-block"});
            let input_2_task = utils.create("p", {html: "Длительность технологического цикла обработки партии деталей при <strong>параллельном ВДПТ</strong> составит (мин):"});
            let input_2 = utils.create("input", {id: "duration_input_2", className:"duration-block-input", attr:{type: "number"}});
            input_2.value = state.durations[1];

            input_2.oninput = function(evt) {
                state.durations[1] = this.value;
                answer.setJSON({answer: state});
            };

            input_block_2.appendChild(input_2_task);
            input_block_2.appendChild(input_2);

            let input_block_3 = utils.create("div", {className: "duration-block"});
            let input_3_task = utils.create("p", {html: "Длительность технологического цикла обработки партии деталей при <strong>параллельно-последовательном ВДПТ</strong> составит (мин):"});
            let input_3 = utils.create("input", {id: "duration_input_3", className:"duration-block-input", attr:{type: "number"}});
            input_3.value = state.durations[2];

            input_3.oninput = function(evt) {
                state.durations[2] = this.value;
                answer.setJSON({answer: state});
            };


            input_block_3.appendChild(input_3_task);
            input_block_3.appendChild(input_3);

            durations_block.appendChild(input_block_1);
            durations_block.appendChild(input_block_2);
            durations_block.appendChild(input_block_3);

            element.appendChild(durations_block);
        },
        init_group_description: function () {
            let group_description_block = utils.create("div", {className: "group-description-block"});
            groups.forEach(function (group) {
                let description_item = utils.create("div", {className: "description-item"});
                let description_color = utils.create("div", {className: `description-color ${group.id}`});
                let description_label = utils.create("div", {
                    className: "description-label",
                    html: " - " + group.title.toLowerCase()
                });
                description_item.appendChild(description_color);
                description_item.appendChild(description_label);
                group_description_block.appendChild(description_item);
            });
            element.appendChild(group_description_block);
        },
        init_table_1: function () {
            let task_block = utils.create_text_task([], "График технологического цикла при последовательном виде движения предметов труда");
            let scale_block = utils.create("div", {html: `Масштаб графика: длина одной ячейки = ${source_data.n} мин.`});
            task_block.appendChild(scale_block);
            let table_1 = utils.create_table_type_1(count * 2, tables_len[0], "table_1", task_block);
            this.build_table_type_1(table_1, state.table_1);
            let cells = Array.from(table_1.querySelectorAll("td.active"));
            for (let i in cells) {
                cells[i].onclick = function (event) {
                    utils.remove_classes(table_1.querySelector("table"), ["correct", "incorrect"]);
                    let x = cells[i].dataset.coordinates.split(",")[0];
                    let y = cells[i].dataset.coordinates.split(",")[1];
                    if (event.target.classList.contains("selected")) {
                        event.target.classList.remove("selected");
                        state.table_1[y][x] = 0;
                    } else {
                        event.target.classList.add("selected");
                        state.table_1[y][x] = 1;
                    }
                    answer.setJSON({answer: state});
                }
            }

            element.appendChild(table_1);
        },
        init_table_2: function () {
            let task_block = utils.create_text_task([], "График технологического цикла при параллельном виде движения предметов труда");
            let scale_block = utils.create("div", {html: `Масштаб графика: длина одной ячейки = ${source_data.p} мин.`});
            task_block.appendChild(scale_block);
            let table_2 = utils.create_table_type_2(count * 2, tables_len[1], "table_2", task_block);
            this.build_table_type_2(table_2, state.table_2);
            let cells = Array.from(table_2.querySelectorAll("td.active"));
            for (let i in cells) {
                cells[i].onclick = function (event) {
                    cells[i].querySelector("input.group-input").select();
                };
                cells[i].querySelector("input.group-input").oninput = function (event) {
                    utils.remove_classes(table_2.querySelector("table"), ["correct", "incorrect"]);
                    let x = cells[i].dataset.coordinates.split(",")[0];
                    let y = cells[i].dataset.coordinates.split(",")[1];
                    utils.remove_classes(cells[i], groups.map(g=>"group-"+g.btn));
                    let val = parseInt(event.target.value);
                    if (groups.map(g=>g.btn).includes(val)){
                        cells[i].classList.add("group-" + val);
                    }
                    else{
                        val = 0;
                    }

                    state.table_2[y][x] = val;
                    answer.setJSON({answer: state});
                }
            }

            element.appendChild(table_2);
        },
        init_table_3: function () {
            let task_block = utils.create_text_task([], "График технологического цикла при параллельно-последовательном виде движения предметов труда");

            let scale_block = utils.create("div", {html: `Масштаб графика: длина одной ячейки = ${source_data.p} мин.`});
            task_block.appendChild(scale_block);

            let table_3 = utils.create_table_type_2(count * 2, tables_len[2], "table_3", task_block);
            this.build_table_type_2(table_3, state.table_3);
            let cells = Array.from(table_3.querySelectorAll("td.active"));
            for (let i in cells) {
                cells[i].onclick = function (event) {
                    cells[i].querySelector("input.group-input").select();
                };
                cells[i].querySelector("input.group-input").oninput = function (event) {
                    utils.remove_classes(table_3.querySelector("table"), ["correct", "incorrect"]);
                    let x = cells[i].dataset.coordinates.split(",")[0];
                    let y = cells[i].dataset.coordinates.split(",")[1];
                    utils.remove_classes(cells[i], groups.map(g=>"group-"+g.btn));
                    let val = parseInt(event.target.value);
                    if (groups.map(g=>g.btn).includes(val)){
                        cells[i].classList.add("group-" + val);
                    }
                    else{
                        val = 0;
                    }
                    state.table_3[y][x] = val;
                    answer.setJSON({answer: state});
                }
            }

            element.appendChild(table_3);
        },
        build_table_type_2: function (table, data) {
            data.forEach(function (row_val, row_idx) {
                data[row_idx].forEach(function (cell_val, cell_idx) {
                    let current_td = table.querySelector(`[data-coordinates="${cell_idx},${row_idx}"]`);
                    if (current_td) {
                        let current_input = current_td.querySelector('input.group-input');

                        if (groups.map(g=>g.btn).includes(parseInt(cell_val))) {
                            current_td.classList.add("group-" + cell_val);
                            current_input.value = cell_val;
                        }
                    }
                });
            });
        },
        build_table_type_1: function (table, data) {
            data.forEach(function (row_val, row_idx) {
                data[row_idx].forEach(function (cell_val, cell_idx) {
                    let current_td = table.querySelector(`[data-coordinates="${cell_idx},${row_idx}"]`);
                    if (current_td) {
                        if (cell_val === 1) {
                            current_td.classList.add("selected");
                        }
                    }
                });
            });

        },
    };

    function range (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
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
        range: function (start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        },
        remove_classes: function (element, class_list) {
            class_list.forEach(function (class_item) {
                class_item = class_item.replace(/\s/g, '');
                element.classList.remove(class_item);
            });
        },
        zeros: function (dimensions) {
            let array = [];

            for (let i = 0; i < dimensions[0]; ++i) {
                array.push(dimensions.length === 1 ? 0 : this.zeros(dimensions.slice(1)));
            }
            return array;
        },
        create_table_type_1: function (row_count, column_count, id, task_block) {
            let table_container = utils.create("div", {className: "table-container"});
            let table = utils.create("table", {id: id, className: "task-table table-type-1"});
            utils.range(0, row_count - 1).forEach(function (row, row_ind) {
                let table_tr = utils.create("tr", {/*id: row_ind.toString()*/});
                utils.range(0, column_count).forEach(function (cell, cell_ind) {
                    let table_td = utils.create("td", {});
                    if (cell_ind === 0) {
                        if (row_ind !== row_count && row_ind % 2 === 0) {
                            table_td.innerHTML = (row_ind / 10 * count + 1);
                        }
                        table_td.classList.add("first-cell");
                    }
                    if (row_ind === row_count) {
                        table_td.classList.add("first-row");
                    }
                    if (cell_ind !== 0 && row_ind !== row_count && row_ind % 2 === 0) {
                        table_td.id = (cell_ind - 1).toString();
                        table_td.setAttribute("data-coordinates", `${(cell_ind - 1)},${row_ind / 2}`);
                        table_td.classList.add("active")
                    } else if (cell_ind !== 0 && row_ind !== row_count && row_ind % 2 !== 0) {
                        table_td.classList.add("inactive")
                    }
                    table_tr.appendChild(table_td);
                });
                table.appendChild(table_tr);
            });
            let correct_indicator = utils.create("div", {className: "correct-indicator",});
            if (task_block) table_container.appendChild(task_block);
            table_container.appendChild(table);
            table_container.appendChild(correct_indicator);

            return table_container;
        },
        create_table_type_2: function (row_count, column_count, id, task_block) {
            let table_container = utils.create("div", {className: "table-container"});
            let table = utils.create("table", {id: id, className: "task-table table-type-2"});
            utils.range(0, row_count - 1).forEach(function (row, row_ind) {
                let table_tr = utils.create("tr", {/*id: row_ind.toString()*/});
                utils.range(0, column_count).forEach(function (cell, cell_ind) {
                    let table_td = utils.create("td", {});
                    if (cell_ind === 0) {
                        if (row_ind !== row_count && row_ind % 2 === 0) {
                            table_td.innerHTML = (row_ind / 10 * count + 1);
                        }
                        table_td.classList.add("first-cell");
                    }
                    if (row_ind === row_count) {
                        table_td.classList.add("first-row");
                    }
                    if (cell_ind !== 0 && row_ind !== row_count && row_ind % 2 === 0) {
                        table_td.id = (cell_ind - 1).toString();
                        table_td.setAttribute("data-coordinates", `${(cell_ind - 1)},${row_ind / 2}`);
                        let input = utils.create("input", {
                            className: "group-input",
                            attr: {"maxlength": "1", type: "text"}
                        });
                        input.onkeypress = function (evt) {
                            let theEvent = evt || window.event;
                            let key;
                            if (theEvent.type === 'paste') {
                                key = event.clipboardData.getData('text/plain');
                            } else {
                                key = theEvent.keyCode || theEvent.which;
                                key = String.fromCharCode(key);
                            }
                            let regex = new RegExp(`[1-${groups_len}]`);

                            if (!regex.test(key)) {
                                theEvent.returnValue = false;
                                if (theEvent.preventDefault) theEvent.preventDefault();
                            }
                        };
                        table_td.appendChild(input);
                        table_td.classList.add("active")
                    } else if (cell_ind !== 0 && row_ind !== row_count && row_ind % 2 !== 0) {
                        table_td.classList.add("inactive")
                    }
                    table_tr.appendChild(table_td);
                });
                table.appendChild(table_tr);
            });
            let correct_indicator = utils.create("div", {className: "correct-indicator",});
            if (task_block) table_container.appendChild(task_block);
            table_container.appendChild(table);
            table_container.appendChild(correct_indicator);
            return table_container;
        },
        create_text_task: function (text, header) {
            let task_block = utils.create("div", {className: "table-task"});
            if (header) {
                let head = utils.create("p",{});
                let head_strong = utils.create("strong", {html: header});
                head.appendChild(head_strong);
                task_block.appendChild(head)
            }
            text.forEach(function (item) {
                let t = utils.create("p", {html: [item]});
                task_block.appendChild(t);
            });

            return task_block;
        },
    };


    MachineryManagementInit.init();
}

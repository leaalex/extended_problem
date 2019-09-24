function MachineryManagement1(settings) {

    let element = settings.element;

    let width = 20;
    let count = 5;

    let height = count * 2;

    let state = {
        table_1: [],
        table_2: [],
        table_3: [],
    };

    // let groups = {
    //     group_1:{
    //         class: "group-1",
    //         value: 1,
    //     },
    //     group_2:{
    //         class: "group-2",
    //         value: 2,
    //     },
    //     group_3:{
    //         class: "group-3",
    //         value: 3,
    //     },
    // };

    let MachineryManagementInit = {
        init: function () {

            state.table_1 = utils.zeros([count, width]);
            state.table_2 = utils.zeros([count, width]);

            this.init_table_1();
            this.init_table_2();

        },
        init_table_1: function () {
            let table_1 = utils.create_table_type_1(height, width, "table_1");
            let cells = Array.from(table_1.querySelectorAll("td.active"));
            for (let i in cells) {
                cells[i].onclick = function (event) {
                    let x = cells[i].dataset.coordinates.split(",")[0];
                    let y = cells[i].dataset.coordinates.split(",")[1];
                    if (event.target.classList.contains("selected")) {
                        event.target.classList.remove("selected");
                        state.table_1[y][x] = 0;
                    } else {
                        event.target.classList.add("selected");
                        state.table_1[y][x] = 1;
                    }
                    // console.log(state.table_1);
                }
            }
            element.appendChild(table_1);
        },
        init_table_2: function () {
            let table_2 = utils.create_table_type_2(height, width, "table_2");
            let cells = Array.from(table_2.querySelectorAll("td.active"));
            for (let i in cells) {
                cells[i].onclick = function(event){
                    cells[i].querySelector("input.group-input").select();
                };
                cells[i].querySelector("input.group-input").oninput = function (event) {
                    let x = cells[i].dataset.coordinates.split(",")[0];
                    let y = cells[i].dataset.coordinates.split(",")[1];
                    cells[i].classList.remove("group-1");
                    cells[i].classList.remove("group-2");
                    cells[i].classList.remove("group-3");
                    let val = parseInt(event.target.value);
                    switch (val) {
                        case 1:
                            cells[i].classList.add("group-1");
                            break;
                        case 2:
                            cells[i].classList.add("group-2");
                            break;
                        case 3:
                            cells[i].classList.add("group-3");
                            break;
                        default:
                            val = 0;
                    }
                    state.table_2[y][x] = val;

                    console.log(state.table_2);
                }
            }
            element.appendChild(table_2);
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
        range: function (start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        },
        zeros: function (dimensions) {
            let array = [];

            for (let i = 0; i < dimensions[0]; ++i) {
                array.push(dimensions.length === 1 ? 0 : this.zeros(dimensions.slice(1)));
            }
            return array;
        },

        create_table_type_1: function (row_count, column_count, id) {
            let table = utils.create("table", {id: id, className: "task-table table-type-1"});
            utils.range(0, row_count).forEach(function (row, row_ind) {
                let table_tr = utils.create("tr", {id: row_ind.toString()});
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
                    }
                    table_tr.appendChild(table_td);
                });
                table.appendChild(table_tr);
            });
            return table;
        },

        create_table_type_2: function (row_count, column_count, id) {
            let table = utils.create("table", {id: id, className: "task-table table-type-2"});
            utils.range(0, row_count).forEach(function (row, row_ind) {
                let table_tr = utils.create("tr", {id: row_ind.toString()});
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
                        let input = utils.create("input", {className: "group-input", attr: {"maxlength": "1", type:"text" }});
                        input.onkeypress = function(evt){
                            let theEvent = evt || window.event;
                            let key;
                            if (theEvent.type === 'paste') {
                                key = event.clipboardData.getData('text/plain');
                            } else {
                                key = theEvent.keyCode || theEvent.which;
                                key = String.fromCharCode(key);
                            }
                            let regex = /[1-3]/;
                            if( !regex.test(key) ) {
                                theEvent.returnValue = false;
                                if(theEvent.preventDefault) theEvent.preventDefault();
                            }
                        };
                        table_td.appendChild(input);
                        table_td.classList.add("active")
                    }
                    table_tr.appendChild(table_td);
                });
                table.appendChild(table_tr);
            });
            return table;
        },
    };



    MachineryManagementInit.init();
}

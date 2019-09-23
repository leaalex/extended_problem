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


    let MachineryManagementInit = {
        init: function () {

            state.table_1 = utils.zeros([count, width]);

            let table_1 = utils.create("table", {id: "table_1"});
            utils.range(0, height).forEach(function (row, row_ind) {
                let table_tr = utils.create("tr", {id: row_ind.toString()});
                utils.range(0, width).forEach(function (cell, cell_ind) {
                    let table_td = utils.create("td", {});
                    if (cell_ind === 0) {
                        if (row_ind !== height && row_ind % 2 === 0) {
                            table_td.innerHTML = (row_ind / 10 * count + 1);
                        }
                        table_td.classList.add("first-cell");
                    }
                    if (row_ind === height) {
                        table_td.classList.add("first-row");
                    }
                    if (cell_ind !== 0 && row_ind !== height && row_ind % 2 === 0) {
                        table_td.id = (cell_ind - 1).toString();
                        table_td.setAttribute("data-coordinates", `${(cell_ind - 1)},${row_ind/2}`);
                        table_td.classList.add("active")
                    }
                    table_tr.appendChild(table_td);
                });
                table_1.appendChild(table_tr);
            });

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
                }
            }
            element.appendChild(table_1);
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

    };

    MachineryManagementInit.init();
}

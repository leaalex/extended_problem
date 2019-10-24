/*
*
ПП - председатель правления;
ДП - директор предприятия;
ЗП - заместитель директора по производству;
ЗК - заместитель директора по коммерции.

ГБ - главный бухгалтер;
СР - секретарь-референт,
ЮК - юрисконсульт-кадровик;
ЭП - экономист по планированию;
ПО - программист-оператор;
ИМ - инженер по маркетингу;
ИС - инженер по снабжению;
ДС - диспетчер.

ТЗП - транспортно-заготовительный участок;
ПУ - производственный участок;
РСУ - ремонтно-строительный участок;
МС - магазин-склад.

* * */

function MachineryManagement4(settings) {

    let subdivision = [
        {
            abbr: "ПП",
            title: "Председатель правления"
        },
        {
            abbr: "ДП",
            title: "Директор предприятия"
        },
        {
            abbr: "ЗП",
            title: "Заместитель директора по производству"
        },
        {
            abbr: "ЗК",
            title: "Заместитель директора по коммерции"
        },
        {
            abbr: "ГБ",
            title: "Главный бухгалтер"
        },
        {
            abbr: "СР",
            title: "Секретарь-референт"
        },
        {
            abbr: "ЮК",
            title: "Юрисконсульт-кадровик"
        },
        {
            abbr: "ЭП",
            title: "Экономист по планированию"
        },
        {
            abbr: "ПО",
            title: "Программист-оператор"
        },
        {
            abbr: "ДС",
            title: "Диспетчер"
        },
        {
            abbr: "ИМ",
            title: "Инженер по маркетингу"
        },
        {
            abbr: "ИС",
            title: "Инженер по снабжению"
        },
        // {
        //     abbr: "ТЗ",
        //     title: " Транспортно-заготовительный участок"
        // },
        // {
        //     abbr: "ПУ",
        //     title: "Производственный участок"
        // },
        // {
        //     abbr: "РС",
        //     title: " Ремонтно-строительный участок"
        // },
        // {
        //     abbr: "МС",
        //     title: "Магазин-склад"
        // },
    ];

    let subdivision_functions = [
        {title: "1. Управление стратегией развития предприятия"},
        {title: "2. Организация системы и процессов управления"},
        {title: "3. Управление персоналом"},
        {title: "4. Управление социальным развитием"},
        {title: "5. Управление экономическим развитием"},
        {title: "6. Управление финансами и бухгалтерским учетом"},
        {title: "7. Управление техническим развитием"},
        {title: "8. Управление капитальным строительством и ремонтом"},
        {title: "9. Управление подготовкой производства"},
        {title: "10. Управление основным производством"},
        {title: "11. Управление вспомогательным производством"},
        {title: "12. Управление качеством продукции"},
        {title: "13. Управление трудом и заработной платой"},
        {title: "14. Управление охраной труда и техникой безопасности"},
        {title: "15. Управление материально-техническим снабжением"},
        {title: "16. Управление маркетингом и сбытом продукции"},
        {title: "17. Управление механизацией производства"},
        {title: "18. Управление транспортом"},
        {title: "19. Управление обслуживающим хозяйством"},
        {title: "20. Управление внешне-экономической деятельностью"},
    ];

    let operations = [
        {
            let_ru: "Ц",
            title: "постановка цели управления",
            let_en: "C",
        },
        {
            let_ru: "Р",
            title: "руководство, принятие решения, утверждение",
            let_en: "R",
        },
        {
            let_ru: "П",
            title: "подготовка решения, составление, расчет, разработка",
            let_en: "P",
        },
        {
            let_ru: "С",
            title: "согласование, рассмотрение",
            let_en: "S",
        },
        {
            let_ru: "И",
            title: "исполнение, доведение, выполнение",
            let_en: "I",
        },
        {
            let_ru: "У",
            title: "участие, оказание помощи, информирование",
            let_en: "U",
        }
    ];

    let element = settings.element;

    // let subdivision = settings.subdivision;
    // let subdivision_functions = settings.subdivision_functions;
    // let operations = settings.operations;

    let student_state = undefined;

    let MachineryManagementInit = {
        init: function () {
            console.log(element);

            student_state = utils.empty_arr([subdivision_functions.length, subdivision.length]);

            console.log("subdivision_functions:", subdivision_functions.length, " subdivision: ", subdivision.length)

            student_state = [["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],
                ["ц","р","п","И","у","с","с","у","с","с","п","у"],]

            console.log(student_state);

            this.build_table();
        },
        build_table: function () {
            let table_container = utils.create("div", {className: "table-container"});
            let table = utils.create("table", {});

            let table_header_0 = utils.create("tr", {});
            let table_header_left_top = utils.create("td", {
                attr: {rowspan: "2"},
                className: "header-cell",
                html: "Функции управления"
            });
            let table_header_right_top = utils.create("td", {
                attr: {colspan: subdivision.length.toString()},
                className: "header-cell",
                html: "Руководитель подразделения"
            });
            table_header_0.appendChild(table_header_left_top);
            table_header_0.appendChild(table_header_right_top);

            let table_header_1 = utils.create("tr", {});

            subdivision.forEach(function (sd, ind) {
                let sd_title = utils.create("td", {
                    html: sd.title + "<br>" + (ind+1),
                    className: "subdivision-abbr-header",
                    attr: {"data-tooltip": sd.title}
                });
                table_header_1.appendChild(sd_title)
            });
            table.appendChild(table_header_0);
            table.appendChild(table_header_1);

            subdivision_functions.forEach(function (sf, sf_index) {
                let sf_row = utils.create("tr", {});
                let sf_title_cell = utils.create("th", {html: sf.title, className: "function-title-cell"});
                sf_row.appendChild(sf_title_cell);
                subdivision.forEach(function (sd, sd_index) {
                    let sd_input_cell = utils.create("td", {
                        className: "operation-input-cell",
                        attr: {"data-coords": `${sf_index},${sd_index}`}
                    });

                    let input = utils.create("input", {
                        className: "operation-input",
                        attr: {"maxlength": "1", type: "text", value:student_state[sf_index][sd_index]}
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
                        let allowed_letters = operations.map(l => l.let_ru.toUpperCase() + "-" + l.let_ru.toUpperCase() + l.let_ru.toLowerCase() + "-" + l.let_ru.toLowerCase() + l.let_en.toUpperCase() + "-" + l.let_en.toUpperCase() + l.let_en.toLowerCase() + "-" + l.let_en.toLowerCase()).join("");
                        let regex_str = '/[Ц-Цц-цC-Cc-cР-Рр-рR-Rr-rП-Пп-пP-Pp-pС-Сс-сS-Ss-sИ-Ии-иI-Ii-iУ-Уу-уU-Uu-u]/';
                        let lastSlash = regex_str.lastIndexOf("/");
                        let regex = new RegExp(regex_str.slice(1, lastSlash), regex_str.slice(lastSlash + 1));
                        console.log(allowed_letters);

                        if (!regex.test(key)) {
                            theEvent.returnValue = false;
                            if (theEvent.preventDefault) theEvent.preventDefault();
                        }
                        // else {
                        //     console.log("OK!: ", typeof key)
                        // }
                    };

                    input.oninput = function (evt) {
                        student_state[sf_index][sd_index] = input.value === "" ? "" : input.value;
                        console.log(JSON.stringify(student_state));
                    };

                    sd_input_cell.onclick = function(event){
                        input.select();
                    };

                    sd_input_cell.appendChild(input);

                    sf_row.appendChild(sd_input_cell);


                });
                table.appendChild(sf_row);
            });
            table_container.appendChild(table);
            element.appendChild(table_container);
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
        empty_arr: function (dimensions) {
            let array = [];

            for (let i = 0; i < dimensions[0]; ++i) {
                array.push(dimensions.length === 1 ? "" : this.empty_arr(dimensions.slice(1)));
            }
            return array;
        },
    };


    MachineryManagementInit.init();
}

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
            title: "руководства, принятия решения, утверждения",
            let_en: "R",
        },
        {
            let_ru: "П",
            title: "подготовки решения, составления, расчета, разработки",
            let_en: "P",
        },
        {
            let_ru: "С",
            title: "согласования, рассмотрения",
            let_en: "S",
        },
        {
            let_ru: "И",
            title: "исполнения, доведения, выполнения",
            let_en: "I",
        },
        {
            let_ru: "У",
            title: "участия, оказания помощи, информирования",
            let_en: "U",
        }
    ];

    let element = settings.element;

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

    let answer = undefined;
    let student_state = undefined;
    let response = undefined;

    let letters_description = {
        c: {
            letter: "ц",
            title: "постановки цели управления",
        },
        r: {
            letter: "р",
            title: "руководства, принятия решения, утверждения",
        },
        p: {
            letter: "п",
            title: "подготовки решения, составления, расчета, разработки",
        },
        i: {
            letter: "с",
            title: "согласования, рассмотрения",
        },
        u: {
            letter: "и",
            title: "исполнения, доведения, выполнения",
        },
        s: {
            letter: "у",
            title: "участия, оказания помощи, информирования",
        },
    };

    let letters_conformity = {
        "ц": "c",
        "р": "r",
        "п": "p",
        "и": "i",
        "у": "u",
        "с": "s",
    };

    let letters_conformity_reverse = {
        "c": "ц",
        "r": "р",
        "p": "п",
        "i": "и",
        "u": "у",
        "s": "с",
    };


    if (settings.input) {
        if (settings.input.querySelector("input[type='text']")) {
            answer = new Answer(settings.input.querySelector("input[type='text']"));
            if (settings.input.parentNode.parentNode.querySelector(".message")) {
                settings.input.parentNode.parentNode.querySelector(".message").classList.add("hidden");
            }

            settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");

            if (answer.get()) {
                student_state = answer.getJSON()["answer"];
                if (settings.input.parentNode.parentNode.querySelector("span.message")) {
                    response = JSON.parse(settings.input.parentNode.parentNode.querySelector("span.message").innerHTML);
                    // console.log(element);
                    // console.log(response);
                    // correctness = ;
                }
            }
        }
    }



    let MachineryManagementInit = {
        init: function () {

            if (!student_state){
                student_state = utils.empty_arr([subdivision_functions.length, subdivision.length]);
            }

            answer.setJSON({answer: student_state});

            this.build_table();


            if (response){
                this.build_response();
            }

        },

        build_response: function(){
            let response_block = utils.create("div", {});

            response_block.appendChild(utils.create("p", {}, utils.create("strong", {html: "Все это относительно ста баллов:"})));
            response_block.appendChild(utils.create("p", {html: response.criteria_1}));

            response_block.appendChild(utils.create("p", {html: response.criteria_2.c}));
            response_block.appendChild(utils.create("p", {html: response.criteria_2.r}));
            response_block.appendChild(utils.create("p", {html: response.criteria_2.p}));
            response_block.appendChild(utils.create("p", {html: response.criteria_2.i}));
            //
            element.appendChild(response_block);
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
                    html: sd.abbr + "<br>", // + (ind+1),
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

                    let cand = student_state[sf_index][sd_index] === "" ? "": letters_conformity_reverse[student_state[sf_index][sd_index]];

                    let input = utils.create("input", {
                        className: "operation-input",
                        attr: {"maxlength": "1", type: "text", value: cand}
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
                        let allowed_letters = operations.map(l => l.let_ru.toUpperCase() + "-" + l.let_ru.toUpperCase() + l.let_ru.toLowerCase() + "-" + l.let_ru.toLowerCase()).join("");
                        // + l.let_en.toUpperCase() + "-" + l.let_en.toUpperCase() + l.let_en.toLowerCase() + "-" + l.let_en.toLowerCase()
                        // let regex_str = '/[Ц-Цц-цC-Cc-cР-Рр-рR-Rr-rП-Пп-пP-Pp-pС-Сс-сS-Ss-sИ-Ии-иI-Ii-iУ-Уу-уU-Uu-u]/';
                        let regex_str = '/[Ц-Цц-цР-Рр-рП-Пп-пС-Сс-сИ-Ии-иУ-Уу-у]/';


                        let lastSlash = regex_str.lastIndexOf("/");
                        let regex = new RegExp(regex_str.slice(1, lastSlash), regex_str.slice(lastSlash + 1));



                        if (!regex.test(key)) {
                            theEvent.returnValue = false;
                            if (theEvent.preventDefault) theEvent.preventDefault();
                        }
                        // else {
                        //     console.log("OK!: ", typeof key)
                        // }
                    };

                    input.oninput = function (evt) {
                        let val_candidate = input.value.replace(" ", "") === "" ? "" : letters_conformity[input.value.toLowerCase()];
                        if (val_candidate!== "" && student_state[sf_index].includes(val_candidate) && !["s","u"].includes(val_candidate)){
                            alert("Данная функция управления уже содержит операцию " + letters_description[val_candidate].title);
                            input.value = "";
                            val_candidate = "";
                        }
                        else{
                            // console.log("Не содержится val_candidate: ", val_candidate);
                        }

                        student_state[sf_index][sd_index] = val_candidate === undefined ? "": val_candidate;
                        answer.setJSON({answer: student_state});
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

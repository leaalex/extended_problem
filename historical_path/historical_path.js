function HistoricalPath(settings) {

    /*
    *
    * path_city_4__city_22 data-name="03_02_02"
    * path_city_20__city_31 data-name="04_01"
    * path_city_22__city_31 data-name="04_02"
    * path_city_4__city_20 data-name="03_02_01"
    * path_city_1__city_4 data-name="03_02"
    * path_city_0__city_1 data-name="03_01"
    * path_city_5__city_22 data-name="02_02_02"
    * path_city_5__city_20 data-name="02_02_01"
    * path_city_0__city_5 data-name="02_01"
    * path_city_9__city_20 data-name="01_02_01"
    * path_city_9__city_22 data-name="01_02_02"
    * path_city_0__city_9 data-name="01_01"
    *
    * */
    svg = settings.svg;
    settings.element.appendChild(svg);
    svg.querySelector("title").textContent = "";

    svg.removeAttribute("width");
    svg.removeAttribute("height");

    let startPoint = 'city_0';

    let rules = [
        {
            "from": startPoint,
            "can_to": [
                "city_1", "city_5", "city_9"
            ]
        },
        {
            "from": "city_1",
            "can_to": [
                "city_4"
            ]
        },
        {
            "from": "city_4",
            "can_to": [
                "city_20", "city_22"
            ]
        },
        {
            "from": "city_5",
            "can_to": [
                "city_20", "city_22"
            ]
        },
        {
            "from": "city_9",
            "can_to": [
                "city_20", "city_22"
            ]
        },
        {
            "from": "city_20",
            "can_to": [
                "city_31"
            ]
        },
        {
            "from": "city_22",
            "can_to": [
                "city_31"
            ]
        },
        {
            "from": "city_31",
            "can_to": [
                "city_71"
            ]
        }
    ];

    let kievID = "city_31";

    let endPoint = "city_71";
    let correctness = undefined;
    let can_used_cities = rules.map((item) => {
        return [item["from"]].concat(item["can_to"])
    }).reduce(function (a, b) {
        return a.concat(b)
    });
    can_used_cities = can_used_cities.concat(["city_8", "city_13", "city_16"]);

    console.log(can_used_cities);

    let user_path = [startPoint];
    let cities = Array.from(svg.querySelector(settings.cities_selector).children);

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

    let answer = undefined;
    if (settings.input) {
        if (settings.input.querySelector("input[type='text']")) {
            answer = new Answer(settings.input.querySelector("input[type='text']"));
            if(settings.input.parentNode.parentNode.querySelector(".message")){
                settings.input.parentNode.parentNode.querySelector(".message").classList.add("hidden");
            }

            settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");

            if (answer.get()) {
                user_path = answer.getJSON()["answer"];
                if (settings.input.parentNode.parentNode.querySelector("span.message")) {
                    correctness = JSON.parse(settings.input.parentNode.parentNode.querySelector("span.message").innerHTML);
                }
            }
        }
    }

    let HistoricalPathInit = {
        init: function () {
            this.test_filling();
            if (user_path.length > 0) this.build_state();
            if (svg.querySelector(`.city#${kievID}`)) svg.querySelector(`.city#${kievID}`).classList.add("kiev");
            if (svg.querySelector(`.city#${endPoint}`)) svg.querySelector(`.city#${endPoint}`).classList.add("end-city");

        },
        build_state: function () {
            user_path.forEach(function (item, index) {
                if (index + 1 < user_path.length) {
                    utils.path_class_changer(item, user_path[index + 1], ["approved"], ["hidden"]);
                }
            });
            startPoint = user_path[user_path.length - 1];
            if (startPoint !== endPoint){
                utils.set_can_start(startPoint);
            }
            else{
                utils.set_can_start('');
            }

            if (correctness) {
                correctness.forEach(function (item, index) {
                    if (index + 1 < correctness.length) {
                        if (svg.querySelector(`.path#path_${item}__${correctness[index+1]}`))svg.querySelector(`.path#path_${item}__${correctness[index+1]}`).classList.add("correct");
                    }
                });
            }




        },
        test_filling: function () {
            let main_city = svg.querySelector(settings.main_city_selector).firstElementChild;
            main_city.classList.add("main-city");
            // main_city.classList.add("can-used");
            main_city.id = startPoint;
            cities.push(main_city);

            let cities_array = Array.from(svg.querySelector(settings.cities_selector).children);
            cities_array.sort(utils.cy_sorter).forEach(function (x, index) {

                x.id = `city_${index + 1}`;
                // if (can_used_cities.includes(x.id)) {
                    // x.classList.add("can-used");
                // }
            });
            let paths = Array.from(svg.querySelector(settings.paths_selector).children);

            for (let i = 0; i < paths.length; i++) {
                paths[i].classList.add("path");
                paths[i].classList.add("hidden");

                paths[i].onmouseover = function (event) {
                    let path = undefined;

                    if (event.target.closest("g.path")) {
                        if (utils.contains_classes(event.target.closest("g.path"), ["path", "approved"])) {
                            path = event.target.closest("g.path")
                        }
                    } else if (utils.contains_classes(event.target, ["path", "approved"])) {
                        path = event.target
                    }

                    if (path && !path.classList.contains("correct")) {
                        let from = path.id.replace("path_", "").split("__")[0];
                        let user_path_sr = user_path.slice(user_path.indexOf(from));
                        user_path_sr.forEach(function (item, index) {
                            if (index + 1 < user_path_sr.length) {
                                utils.path_class_changer(item, user_path_sr[index + 1], ["for-remove"], []);
                            }
                        });
                    }
                };
                paths[i].onmouseleave = function (event) {
                    for (let path in paths) {
                        paths[path].classList.remove("for-remove");
                    }
                };
                paths[i].onclick = function (event) {
                    let path = undefined;
                    if (event.target.closest("g.path")) {
                        if (utils.contains_classes(event.target.closest("g.path"), ["path", "approved", "for-remove"])) {
                            path = event.target.closest("g.path")
                        }
                    } else if (utils.contains_classes(event.target, ["path", "approved", "for-remove"])) {
                        path = event.target
                    }

                    if (path && !path.classList.contains("correct")) {

                        // if (utils.contains_classes(event.target.closest("g.path"), ["path", "approved", "for-remove"])) {
                        let from = path.id.replace("path_", "").split("__")[0];
                        let user_path_rem = user_path.slice(user_path.indexOf(from));
                        let user_path_sr = user_path.slice(0, user_path.indexOf(from) + 1);
                        user_path_rem.forEach(function (item, index) {
                            if (index + 1 < user_path_rem.length) {
                                utils.path_class_changer(item, user_path_rem[index + 1], ["hidden"], ["for-remove", "approved"]);
                            }
                        });
                        user_path = user_path_sr;
                        startPoint = user_path_sr[user_path_sr.length - 1];
                        utils.set_can_start(startPoint);
                        answer.setJSON({answer: user_path});
                    }
                };

            }

            for (let i = 0; i < cities.length; i++) {
                cities[i].classList.add("city");

                // console.log(cities[i].id)
                if (!can_used_cities.includes(cities[i].id)){
                    cities[i].classList.add("unused-city");

                }

                cities[i].onmouseleave = function (event) {
                    let path = svg.querySelector(`.path#path_${startPoint}__${event.target.id}`);
                    if (path) {
                        path.classList.remove("tmp-visible");
                    }
                };
                cities[i].onmouseover = function (event) {
                    let current_path = svg.querySelector(`.path#path_${startPoint}__${event.target.id}`);
                    if (current_path) {
                        current_path.classList.add("tmp-visible");
                    } else {
                        // console.log("Нет такого пути")
                    }
                };
                cities[i].onclick = function (event) {
                    if (utils.contains_classes(event.target, ["city", "can-end"])) {
                        utils.path_class_changer(startPoint, event.target.id, ["approved"], ["tmp-visible", "hidden"]);
                        startPoint = event.target.id;
                        utils.set_can_start(startPoint);
                        user_path.push(startPoint);
                        answer.setJSON({answer: user_path});

                        if (startPoint === endPoint) {
                            utils.set_can_start('');
                        }

                    }
                };
            }
            utils.set_can_start(main_city.id);

        },
    };

    let utils = {
        createElementSVG: function (name, id, classList, attributes) {
            let NS = "http://www.w3.org/2000/svg";
            let element = document.createElementNS(NS, name);
            if (id) element.id = id;
            if (classList) element.classList.add(classList);
            if (attributes) {
                for (let a in attributes) {
                    element.setAttribute(a, attributes[a])
                }
            }
            return element;
        },
        cy_sorter: function (a, b,) {
            let a_cx = parseFloat(a.getAttribute("cy"));
            let b_cx = parseFloat(b.getAttribute("cy"));
            if (a_cx < b_cx) return -1;
            if (a_cx > b_cx) return 1;
        },
        cx_sorter: function (a, b,) {
            let a_cx = parseFloat(a.getAttribute("cx"));
            let b_cx = parseFloat(b.getAttribute("cx"));
            if (a_cx < b_cx) return -1;
            if (a_cx > b_cx) return 1;
        },
        cursorPoint: function (SVGObject, event) {
            pt = SVGObject.createSVGPoint();
            pt.x = event.clientX;
            pt.y = event.clientY;
            return pt.matrixTransform(SVGObject.getScreenCTM().inverse());
        },
        set_can_start(id) {
            for (let city in cities) {
                cities[city].classList.remove("can-start");
                if (cities[city].id === id) cities[city].classList.add("can-start");
            }
            let curr_candidates = rules.filter(x => x.from === id);
            let curr = curr_candidates.length > 0 ? curr_candidates[0] : undefined;

            for (let city in cities) {
                cities[city].classList.remove("can-end");
                if (curr) {
                    if (curr.can_to.includes(cities[city].id) && svg.querySelector(`.path#path_${id}__${cities[city].id}`)) {
                        cities[city].classList.add("can-end")
                    }
                }
            }
            if (!curr) {
                // console.log("Не описано правил")
            }
        },
        contains_classes: function (element, class_list) {
            return class_list.every(elem => element.classList.contains(elem));
        },
        path_class_changer: function (start_id, end_id, add, remove) {


            if (svg.querySelector(`.path#path_${start_id}__${end_id}`)) {
                add.forEach(function (add_item) {
                    svg.querySelector(`.path#path_${start_id}__${end_id}`).classList.add(add_item);
                });
                remove.forEach(function (remove_item) {
                    svg.querySelector(`.path#path_${start_id}__${end_id}`).classList.remove(remove_item);
                });
            }
        },
    };

    HistoricalPathInit.init();

}

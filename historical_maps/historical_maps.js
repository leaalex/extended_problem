function HistoricalMaps(settings) {

    svg = settings.svg;
    settings.element.appendChild(svg);

    let startPoint;
    let max_arrows = settings.max_arrows || 5;
    let lines = {};
    let cities = Array.from(svg.querySelector(settings.cities_selector).querySelectorAll('circle'));
    // Array.from(svg.querySelector(settings.cities_selector).querySelectorAll('circle'));
    let used = [];
    let main_city_id = 'city_0';
    let city_radius = 4;
    let correctness = undefined;
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
    if(settings.input) {
        if (settings.input.querySelector("input[type='text']")) {
            answer = new Answer(settings.input.querySelector("input[type='text']"));
            if(settings.input.parentNode.parentNode.querySelector(".message")){
                settings.input.parentNode.parentNode.querySelector(".message").classList.add("hidden");
            }

            settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");

            if (answer.get()) {
                lines = answer.getJSON()["answer"];
                if(settings.input.parentNode.parentNode.querySelector("span.message")){
                    correctness = JSON.parse(settings.input.parentNode.parentNode.querySelector("span.message").innerHTML);
                    // console.log(correctness);
                }

            }
        }
    }

    let HistoricalMapsInit = {
        init: function () {
            arrow.init();
            this.test_filling();
            if(Object.keys(lines).length > 0) this.build_state();
            this.create_city_events();
        },

        build_state(){
          let lines_keys = Object.keys(lines);
            lines_keys.forEach(function (item){
                let arrow_coordinates = utils.calculate_arrow_coordinates(svg.querySelector(`#${lines[item].from}`), svg.querySelector(`#${lines[item].to}`), city_radius);
                let new_arrow = utils.create_arrow(arrow_coordinates.x1, arrow_coordinates.y1, arrow_coordinates.x2, arrow_coordinates.y2, item, ['connecting']);
                svg.querySelector(settings.cities_selector).parentNode.insertBefore(new_arrow, svg.querySelector(settings.cities_selector));
            });

            if (max_arrows > Object.keys(lines).length){
                utils.set_can_start(lines[lines_keys[lines_keys.length - 1]].to);
            }
            else{
                utils.set_can_start('');
            }

            if (correctness){
                Object.keys(correctness).forEach(function (correct_item) {
                    if(svg.querySelector(`.arrowGroup#${correct_item} .arrow-line.connecting`)){
                        svg.querySelector(`.arrowGroup#${correct_item} .arrow-line.connecting`).classList.add("correct");
                    }
                    svg.querySelector(`.city#${correctness[correct_item].to}`).parentNode.querySelector('text').textContent= '';
                    let city_name_arr = correctness[correct_item].to_title.split("-");
                    city_name_arr.forEach(function(name, idx, all_arr){
                        let title_block = utils.createElementSVG("tspan", null, null, {x:"2", y: idx.toString() + "em"});
                        title_block.innerHTML = name + (all_arr.length-1 === idx ? "":"-");
                        svg.querySelector(`.city#${correctness[correct_item].to}`).parentNode.querySelector('text').appendChild(title_block);
                    });
                    let year_pad = (city_name_arr[0].length * 6 + 4 - 36)/2;
                    year_pad = year_pad > 0 ? year_pad : 0;
                    let year_block = utils.createElementSVG("tspan", null, null, {x:year_pad.toString(), y:city_name_arr.length.toString() + "em"});
                    year_block.innerHTML = "(" + correctness[correct_item].to_year.toString() + ")";
                    svg.querySelector(`.city#${correctness[correct_item].to}`).parentNode.querySelector('text').appendChild(year_block);
                    svg.querySelector(`.city#${correctness[correct_item].to}`).parentNode.querySelector('g').classList.remove("hidden");
                });
            }

        },

        test_filling: function () {
            let main_city = svg.querySelector(settings.main_city_selector).firstElementChild;
            main_city.classList.add("main-city");
            main_city.id = main_city_id;
            cities.push(main_city);

            utils.set_can_start(main_city.id);
            let cities_array = Array.from(svg.querySelector(settings.cities_selector).querySelectorAll('circle'));

            cities_array.sort(utils.cx_sorter).forEach((x, index) => x.id = `city_${index + 1}`);

            for (let i = 0; i < cities.length; i++) {
                cities[i].classList.add("city");

                if(cities[i].parentNode.querySelector("text")){
                    let city_name = cities[i].parentNode.querySelector("text").textContent;
                    let hidden_city_name = '?'.repeat(city_name.split("(")[0].length);
                    cities[i].parentNode.querySelector("text").textContent = hidden_city_name;
                    // console.log(cities[i].parentNode)
                    if(cities[i].parentNode.querySelector("g")) cities[i].parentNode.querySelector("g").classList.add("hidden");
                }

                cities[i].setAttribute("r", 5);
                cities[i].onclick = function (event) {

                    if (cities[i].classList.contains("can-start")) {
                        let targetX = event.target.getAttribute('cx');
                        let targetY = event.target.getAttribute('cy');
                        arrow.set_coordinate({'x1': targetX, 'y1': targetY, 'x2': targetX, 'y2': targetY});

                        arrow.toggle("show");
                        startPoint = event.target;
                        utils.set_can_end();

                    }
                    else if (startPoint && !used.includes(event.target.id)) {
                        let arrow_coords = utils.calculate_arrow_coordinates(startPoint,event.target, city_radius);

                        let new_arrow = utils.create_arrow(arrow_coords.x1, arrow_coords.y1, arrow_coords.x2, arrow_coords.y2, utils.genID(), ['connecting']);
                        svg.querySelector(settings.cities_selector).parentNode.insertBefore(new_arrow, svg.querySelector(settings.cities_selector));
                        lines[new_arrow.id] = {
                            from: startPoint.id,
                            to: event.target.id
                        };
                        if (max_arrows > Object.keys(lines).length){
                            startPoint = event.target;
                            utils.set_can_start(event.target.id);
                            utils.set_can_end();
                        }
                        else{
                            startPoint = undefined;
                            utils.set_can_start('');
                            arrow.toggle();
                            utils.remove_can_end();
                        }

                    }

                    answer.setJSON({answer: lines});
                }

            }

        },
        create_city_events: function () {
            svg.onmousemove = function (event) {
                if (startPoint) {
                    let mousePosition = utils.cursorPoint(svg, event);
                    var startX = startPoint.getAttribute('cx');
                    var startY = startPoint.getAttribute('cy');
                    var r = Math.floor(Math.sqrt((mousePosition.y - startY) * (mousePosition.y - startY) + (mousePosition.x - startX) * (mousePosition.x - startX)));
                    r = r > 30 ? r : 50;
                    var k = (r - 8) / r;
                    var currentX = Math.floor(startX) + (mousePosition.x - startX) * k;
                    var currentY = Math.floor(startY) + (mousePosition.y - startY) * k;
                    arrow.set_coordinate({'x1': startX, 'y1': startY, 'x2': currentX, 'y2': currentY});
                    if (event.target.classList.contains("city") && !used.includes(event.target.id)) {
                        let arrow_coords = utils.calculate_arrow_coordinates(startPoint, event.target, city_radius);
                        arrow.set_coordinate({'x2': arrow_coords.x2, 'y2': arrow_coords.y2});
                    }
                }
                else if(utils.contains_classes(event.target, ["arrow-line", "connecting"]) && !event.target.classList.contains("correct")){
                    let lines_keys = Object.keys(lines);
                    let for_remove = lines_keys.slice(lines_keys.indexOf(event.target.parentNode.id), lines_keys.length);
                    for_remove.forEach(item=>svg.querySelector(`#${item} .arrow-line`).classList.add("for-remove"));
                }

            };

            svg.onmouseout = function(){
                if(utils.contains_classes(event.target, ["arrow-line", "connecting"])){
                    let lines_keys = Object.keys(lines);
                    for (let i in lines_keys){
                            svg.querySelector("#"+lines_keys[i] + " .arrow-line").classList.remove("for-remove");
                    }
                }
            };

            svg.onclick = function (event) {

                if (!startPoint && utils.contains_classes(event.target, ["arrow-line", "connecting"]) && !event.target.classList.contains("correct")) {
                    let lines_keys = Object.keys(lines);
                    let for_remove = lines_keys.slice(lines_keys.indexOf(event.target.parentNode.id), lines_keys.length);
                    for_remove.forEach(item=>{delete lines[item];svg.querySelector(`#${item}`).remove();});

                    lines_keys = Object.keys(lines);
                    if(Object.keys(lines).length > 0){
                        utils.set_can_start(lines[lines_keys[lines_keys.length - 1]].to);
                    }
                    else{
                        utils.set_can_start(main_city_id);
                    }


                } else if (!event.target.classList.contains("city")) {
                    arrow.toggle("hide");
                    utils.remove_can_end();
                    startPoint = undefined;
                }
                answer.setJSON({answer: lines});
            };

            document.onkeyup = function (evt) {
                if (evt.keyCode === 27 || evt.keyCode === 13 || evt.keyCode === 8) {
                    arrow.toggle("hide");
                    utils.remove_can_end();
                    startPoint = undefined;
                }
            };

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
        cursorPoint: function (SVGObject, event) {
            pt = SVGObject.createSVGPoint();
            pt.x = event.clientX;
            pt.y = event.clientY;
            return pt.matrixTransform(SVGObject.getScreenCTM().inverse());
        },
        create_arrow: function (x1, y1, x2, y2, arrow_id, classList) {
            let arrowId;
            if (arrow_id) {
                arrowId = arrow_id.replace("arrow_", "");
            }
            // let arrowColor = "#00d274";
            let arrowColor = "#20323c";

            let arrowGroup = this.createElementSVG('g', "arrow_" + arrowId, "arrowGroup");
            let arrowLine = this.createElementSVG('line', "arrowLine" + arrowId, "arrow-line", {
                stroke: arrowColor,
                "stroke-width": "5",
                // "stroke-width": "4",
                "marker-end": "url(#" + 'arrowMarker_' + arrowId + ")",
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            });

            if (classList) {
                classList.forEach(cls => arrowLine.classList.add(cls))
            }

            arrowGroup.append(arrowLine);

            let arrowMarker = this.createElementSVG('marker', 'arrowMarker_' + arrowId, null, {
                "markerWidth": "10",
                "markerHeight": "10",
                "refX": "2.4",
                // "refX": "0.2",
                "refY": "3",
                "orient": "auto",
                "markerUnits": "strokeWidth"
            });
            arrowMarker.innerHTML = '<path d="M-3,0 L-3,6 L6,3 z" fill="' + arrowColor + '" />';
            arrowMarker.innerHTML = '<path d="M-3,0 L-3,6 L6,3 z" fill="' + arrowColor + '" />';
            arrowMarker.innerHTML = '<path d="M-3,0 L-3,6 L4,3.1 z" fill="' + arrowColor + '" />';
            // arrowMarker.innerHTML = '<path d="M-5,0 L-5,6 L3,3 z" fill="' + arrowColor + '" />';
            arrowGroup.append(arrowMarker);

            return arrowGroup;
        },
        cx_sorter: function (a, b) {
            let a_cx = parseFloat(a.getAttribute("cx"));
            let b_cx = parseFloat(b.getAttribute("cx"));
            if (a_cx < b_cx) return -1;
            if (a_cx > b_cx) return 1;
        },
        contains_classes: function (element, class_list) {
            return class_list.every(elem => element.classList.contains(elem));
        },
        set_can_start(id) {
            for (let city in cities) {
                cities[city].classList.remove("can-start");
                if (cities[city].id === id) cities[city].classList.add("can-start");
            }
        },
        set_can_end() {

            used = [startPoint.id];
            Object.keys(lines).forEach((item) => {
                used.push(lines[item].from);
                used.push(lines[item].to)
            });
            // console.log(used);
            for (let city in cities) {
                cities[city].classList.remove("can-end");
                if (!used.includes(cities[city].id)) {
                    cities[city].classList.add("can-end")
                }
            }
        },
        remove_can_end() {
            for (let city in cities) {
                cities[city].classList.remove("can-end");
            }
        },
        genID: function (value) {
            value = value || "id";
            return value + "_" + Math.random().toString(16).substr(2, 8).toUpperCase();
        },
        calculate_arrow_coordinates: function (start_city, end_city, point_radius) {
            point_radius = point_radius || 0;
            let startX = start_city.getAttribute("cx");
            let startY = start_city.getAttribute("cy");
            let endX = end_city.getAttribute('cx');
            let endY = end_city.getAttribute('cy');
            let r = Math.floor(Math.sqrt((endY - startY) * (endY - startY) + (endX - startX) * (endX - startX)));
            let k = r === 0 ? 0 : (r - point_radius - 6) / r;
            let currentX = Math.floor(startX) + (endX - startX) * k;
            let currentY = Math.floor(startY) + (endY - startY) * k;

            return {
                x1: startX,
                y1: startY,
                x2: currentX,
                y2: currentY,
            }
        }
    };

    let arrow = {
        arrow: utils.create_arrow(0, 0, 1, 1, "main"),
        visibility: false,
        init: function () {
            svg.append(this.arrow);
            this.arrow.classList.add("hidden");
        },
        set_coordinate: function (obj) {
            for (let prop in obj) {
                this.arrow.querySelector("line").setAttribute(prop, obj[prop]);
            }
        },
        toggle: function (val) {
            if (val) this.visibility = val !== "show";
            if (this.visibility) {
                this.arrow.classList.add("hidden")
            } else {
                this.arrow.classList.remove("hidden")
            }
            this.visibility = !this.visibility;
        },

    };
    HistoricalMapsInit.init();

}

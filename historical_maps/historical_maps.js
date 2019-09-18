function HistoricalMaps(settings) {

    svg = settings.svg;
    settings.element.appendChild(svg);

    let first_selected = undefined;

    let connections = [];
    let main_arrow;
    let startPoint;

    let can_start_id;

    let lines={};
    let cities = Array.from(svg.querySelector(settings.cities_selector).children);

    let HistoricalMapsInit = {
        init: function () {
            console.log(settings);
            arrow.init();
            this.test_filling();
            this.create_city_events();
            // console.log(main_arrow)
        },

        test_filling: function () {

            let main_city = svg.querySelector(settings.main_city_selector).firstElementChild;

            main_city.classList.add("main-city");
            // main_city.classList.add("city");
            main_city.id = `city_0`;
            cities.push(main_city);


            utils.set_can_start(`city_0`);

            let cities_array = Array.from(svg.querySelector(settings.cities_selector).children);
            cities_array.sort(utils.cx_sorter).forEach((x, index) => x.id = `city_${index + 1}`);

            for (let i = 0; i < cities.length; i++) {
                cities[i].classList.add("city");
                cities[i].onclick = function (event) {
                    // console.log(startPoint);

                    if (!startPoint && cities[i].classList.contains("can-start")) {
                        let targetX = event.target.getAttribute('cx');
                        let targetY = event.target.getAttribute('cy');
                        arrow.set_coordinate({'x1': targetX, 'y1': targetY, 'x2': targetX, 'y2': targetY});

                        arrow.toggle("show");
                        startPoint = event.target;
                        utils.set_can_end();

                    } else if(startPoint) {
                        let startX = startPoint.getAttribute("cx");
                        let startY = startPoint.getAttribute("cy");
                        let targetX = event.target.getAttribute('cx');
                        let targetY = event.target.getAttribute('cy');
                        let r = Math.floor(Math.sqrt((targetY - startY) * (targetY - startY) + (targetX - startX) * (targetX - startX)));
                        let k = r === 0 ? 0 : (r - 10) / r; //(r-pointsRadius-10) / r
                        let currentX = Math.floor(startX) + (targetX - startX) * k;
                        let currentY = Math.floor(startY) + (targetY - startY) * k;
                        // let arrow_id =
                        let new_arrow = utils.create_arrow(startX, startY, currentX, currentY, utils.genID(), ['connecting']);
                        svg.appendChild(new_arrow);
                        utils.set_can_start(event.target.id);
                        arrow.toggle();
                        lines[new_arrow.id] = {
                            from: startPoint.id,
                            to: event.target.id
                        };
                        console.log(lines);
                        utils.remove_can_end();
                        startPoint = undefined;
                    }
                }

            }

        },

        create_city_events: function () {

            svg.onmousemove = function (event) {
                if (startPoint) {
                    // console.log("KEK");
                    let mousePosition = utils.cursorPoint(svg, event);
                    var startX = startPoint.getAttribute('cx');
                    var startY = startPoint.getAttribute('cy');
                    var r = Math.floor(Math.sqrt((mousePosition.y - startY) * (mousePosition.y - startY) + (mousePosition.x - startX) * (mousePosition.x - startX)));
                    r = r > 30 ? r : 50;
                    // console.log(r)
                    var k = (r - 8) / r;
                    var currentX = Math.floor(startX) + (mousePosition.x - startX) * k;
                    var currentY = Math.floor(startY) + (mousePosition.y - startY) * k;
                    arrow.set_coordinate({'x2': currentX, 'y2': currentY});

                    if (event.target.classList.contains("city")) {
                        // console.log(event.target);

                        var endX = event.target.getAttribute('cx');
                        var endY = event.target.getAttribute('cy');

                        var r = Math.floor(Math.sqrt((endY - startY) * (endY - startY) + (endX - startX) * (endX - startX)));

                        var k = r === 0 ? 0 : (r - 10) / r; // (r-pointsRadius-10) / r
                        currentX = Math.floor(startX) + (endX - startX) * k;
                        currentY = Math.floor(startY) + (endY - startY) * k;
                        // console.log(startX, startY, k, (endY - startY) * (endY - startY) + (endX - startX) * (endX - startX))
                        arrow.set_coordinate({'x2': currentX, 'y2': currentY});
                    }

                }

            };

            svg.onclick = function (event) {

                if (!startPoint && utils.contains_classes(event.target, ["arrow-line", "connecting"])) {
                    // console.log(startPoint, event.target.parentNode.id);
                    delete lines[event.target.parentNode.id];
                    event.target.parentNode.remove();
                }

                else if (!event.target.classList.contains("city")) {
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
            } else {
                // arrowId = genID();
            }
            let arrowColor = "#00d274";

            let arrowGroup = this.createElementSVG('g', "arrow_" + arrowId, "arrowGroup");
            let arrowLine = this.createElementSVG('line', "arrowLine" + arrowId, "arrow-line", {
                stroke: arrowColor,
                "stroke-width": "4",
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
                "refX": "3.4",
                "refY": "3",
                "orient": "auto",
                "markerUnits": "strokeWidth"
            });
            arrowMarker.innerHTML = '<path d="M-3,0 L-3,6 L6,3 z" fill="' + arrowColor + '" />';
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
            // let all_elem_classes = element.classList;
            return class_list.every(elem => element.classList.contains(elem));
        },
        set_can_start(id){
            for (let city in cities){
                cities[city].classList.remove("can-start");
                if (cities[city].id === id)cities[city].classList.add("can-start");
            }
        },
        set_can_end(){

            let used = [startPoint.id];
            Object.keys(lines).forEach((item)=>{used.push(lines[item].from); used.push(lines[item].to)});
            console.log(used);
            for (let city in cities){
                if(!used.includes(cities[city].id)){
                    console.log(cities[city].classList.add("can-end"))
                }
            }
        },
        remove_can_end(){
            for (let city in cities){
                cities[city].classList.remove("can-end");
            }
        },
        genID: function (value) {
            var value = value || "id";
            return value + "_" + Math.random().toString(16).substr(2, 8).toUpperCase();
        },
    };

    let arrow = {
        arrow: utils.create_arrow(0, 0, 1, 1, "main"),
        visibility: false,
        init: function () {
            // console.log(arrow);
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

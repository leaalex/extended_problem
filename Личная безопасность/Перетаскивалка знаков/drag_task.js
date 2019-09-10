function DragTask(options) {
    let task_container = options.element;
    let user_buttons = [];

    let settings = {
        width: 820,//viewBox[2],
        height: 600,//viewBox[3] + 120,
        elements_height: 40,

        elements_widths: [40, 80], //возможные ширины
    };
    let task_scale = 1;
    let buttons_zone_height = settings.elements_height * 3;
    let buttons_templates = {};
    Array.from(sourceSVG.getButtons().children).forEach(b => buttons_templates[b.id] = b);
    let buttons = {};
    let dragObject = undefined;
    let dragUserObject = undefined;
    let dragTaskBlock = undefined;

    let user_state = {
        buttons: [],
        scale: 1,
    };

    let test_scale = 1;

    let elementStart = {x: 0, y: 0};
    let mouseStart;

    let pt;
    let DragTaskInit = {
        init: function (elem) {

            let svg = utils.createElementSVG('svg', "mind_map_svg", null, {
                viewbox: '0 0 ' + settings.width + ' ' + settings.height,
                width: settings.width,
                height: settings.height,
                "fill": '#d6d6ff',
            });

            let task_background = utils.createElementSVG('rect', "task-background", null, {
                width: settings.width,
                height: settings.height - buttons_zone_height,
                fill: '#e4f2ff',
            });

            let task_block = utils.createElementSVG('g', "task_block", null, {
                "transform-origin": "center",
            });
            task_block.appendChild(task_background);
            let task_img = sourceSVG.getTask().querySelector("g");
            task_block.appendChild(task_img);
            // task_block.onmousedown = function (e) {
            //     dragTaskBlock = task_block;
            //     start_drag_click = utils.cursorPoint(svg, e);
            // };
            // task_block.onmouseup = function () {
            //     dragTaskBlock = false;
            // };

            svg.appendChild(task_block);

            this.createTemplatesButtons(svg);

            this.createHandlers(svg);
            pt = svg.createSVGPoint();
            elem.appendChild(svg)
        },
        createHandlers: function (svg) {

            // addUserButton('btn_x5F_9', {x:20, y:100}, 'kekes');

            Object.keys(buttons).forEach(function (item) {
                buttons[item].onmousedown = function (e) {
                    buttons[item].setAttribute("cursor", "grabbing");
                    // buttons[item].setAttribute("transform", `scale(${test_scale})`);
                    dragObject = buttons[item].cloneNode(true);
                    // buttons[item].setAttribute("transform", `scale(1)`)

                    elementStart = utils.getTransform(dragObject, "translate");
                    mouseStart   = utils.cursorPoint(svg,e);
                    svg.querySelector("#task_block").appendChild(dragObject);
                    dragObject.onmouseup = function (e) {
                        if (utils.getTransform(dragObject, "translate").y < settings.height - buttons_zone_height - settings.elements_height / 2) {
                            addUserButton(item, utils.getTransform(dragObject, "translate"), utils.getRandomString())
                        }
                        buttons[item].setAttribute("cursor", "grab");
                        dragObject.parentNode.removeChild(dragObject);
                        dragObject = undefined;
                        return false;
                    };
                }
            });

            let offset = {x: 0, y: 0};

            function addUserButton(btn_class, coordinates, id) {
                let t = buttons_templates[btn_class].cloneNode(true);
                t.classList.add("user-button");
                t.classList.remove("template-button");
                utils.moveElement(t, coordinates.x, coordinates.y);
                let new_btn = {
                    button_id: id,
                    class: btn_class,
                    x: coordinates.x,
                    y: coordinates.y,
                    html: t,
                };

                new_btn.html.setAttribute("cursor", "grab");

                let remove_btn = utils.createElementSVG('circle', '', 'remove-btn', {
                    cx: utils.getWidth(new_btn.html) / 2,
                    cy: (-1) * settings.elements_height / 2,
                    r: 8,
                });

                remove_btn.onmousedown = function (e) {
                    if (confirm('Удалить элемент?')) {
                        new_btn.html.parentNode.removeChild(new_btn.html);
                        user_buttons = user_buttons.filter(item => item.button_id !== id)
                    } else {
                    }
                    dragUserObject = undefined;
                    dragObject = undefined;

                };

                new_btn.html.appendChild(remove_btn);

                new_btn.html.onmousedown = function (e) {
                    if (e.target.classList.contains("remove-btn")) return false;
                    new_btn.html.setAttribute("cursor", "grabbing");
                    dragUserObject = new_btn.button_id;


                    offset.x = e.offsetX - utils.getTransform(user_buttons.filter(item => item.button_id === dragUserObject)[0].html, "translate").x;
                    offset.y = e.offsetY - utils.getTransform(user_buttons.filter(item => item.button_id === dragUserObject)[0].html, "translate").y;

                    elementStart = utils.getTransform(new_btn.html, "translate");
                    mouseStart   = utils.cursorPoint(svg,e);

                    // console.log("elementStart", elementStart);
                };
                new_btn.html.onmouseup = function () {
                    offset.x = 0;
                    offset.y = 0;
                    new_btn.html.setAttribute("cursor", "grab");
                    dragUserObject = undefined;
                };


                svg.querySelector("#task_block").appendChild(new_btn.html);

                user_buttons.push(new_btn);
            }


            svg.querySelector("#task_block").addEventListener("mousewheel", ScrollFreeNodesHandler, false);

            // svg.querySelector("#task-background").addEventListener("DOMMouseScroll", ScrollFreeNodesHandler, false);


            function ScrollFreeNodesHandler(e) {
                e = e || window.event;
                var scroll_delta = e.deltaY || e.detail || e.wheelDelta;
                if (e.deltaY && e) {
                    test_scale = Math.round((test_scale + scroll_delta * 0.0005) * 100) / 100;
                    if (test_scale < 0.5) test_scale = 0.5;
                    if (test_scale > 2) test_scale = 2;
                }
                // console.log(test_scale)
                utils.scaleElement(svg.querySelector("#task_block"), test_scale)
                // drawMindMap(nodesObject, null, graph_scale);
            }

            document.onmousemove = onMouseMove;
            document.onmouseup = function () {
                dragUserObject = undefined;
                return false;
            };

            function onMouseMove(e) {
                let mousePosition = utils.cursorPoint(svg, e);


                let moveX = mousePosition.x;
                let moveY = mousePosition.y;

                let _x = moveX;
                let _y = moveY;

                if(dragObject || dragUserObject){

                    let current = utils.cursorPoint(svg,e);
                    pt.x = current.x - mouseStart.x;
                    pt.y = current.y - mouseStart.y;

                    let m;
                    if(dragObject){
                        // elementStart = utils.getTransform(dragObject, "translate");
                        m = dragObject.getTransformToElement(svg).inverse();
                    }
                    else{
                        // elementStart = utils.getTransform(user_buttons.filter(item => item.button_id === dragUserObject)[0].html, "translate");
                        m = user_buttons.filter(item => item.button_id === dragUserObject)[0].html.getTransformToElement(svg).inverse();
                    }
                    m.e = m.f = 0;
                    pt = pt.matrixTransform(m);

                    _x = elementStart.x+pt.x;
                    _y = elementStart.y+pt.y;
                }



                //
                // console.log()
                // console.log();

                SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) {
                    return elem.getScreenCTM().inverse().multiply(this.getScreenCTM());
                };

                if (dragObject) {
                    utils.moveElement(dragObject, _x, _y);
                } else if (dragUserObject) {

                    let current_elem = user_buttons.filter(item => item.button_id === dragUserObject)[0];

                    // if (moveX - offset.x > utils.getWidth(current_elem.html) / 2) {
                    //     if (moveX - offset.x < settings.width - utils.getWidth(current_elem.html) / 2) {
                    //         if (moveY - offset.y > settings.elements_height / 2) {
                    //             if (moveY - offset.y < settings.height - buttons_zone_height - settings.elements_height / 2) {

                    utils.userMoveElement(current_elem, _x, _y);
                    //             }
                    //         }
                    //     }
                    // }
                    return false;
                } else if (dragTaskBlock) {
                    // let mousePosition = utils.cursorPoint(svg, e);
                    // let start_sdvig = {x: 0, y: 0};
                    // let moveX = mousePosition.x - start_sdvig.x;
                    // let moveY = mousePosition.y - start_sdvig.y;
                    // dragTaskBlock.setAttribute("transform", "translate(" + moveX + "," + moveY + ")" + `scale(${test_scale})`);
                } else {
                    return false;
                }
            }
        },
        createTemplatesButtons: function (svg) {
            let elements_zone = utils.createElementSVG('rect', "elements-background", null, {
                width: settings.width,
                y: settings.height - buttons_zone_height,
                height: buttons_zone_height,
                fill: '#cccdcc',
            });
            svg.appendChild(elements_zone);
            let last_end = 0;
            let row_num = 0;

            // [].forEach.call(sourceSVG.getButtons().children, function (item, index) {

            Object.keys(buttons_templates).forEach(function (item, index) {
                buttons[item] = buttons_templates[item].cloneNode(true);
                buttons[item].classList.add("template-button");
                buttons[item].classList.add("drag-button");
                buttons[item].setAttribute("cursor", "grab");
                svg.appendChild(buttons[item]);
                last_end = parseInt(last_end) + parseInt(utils.getWidth(buttons[item])) + settings.elements_height / 4;
                if (last_end + 1 > settings.width) {
                    row_num = 1;
                    last_end = parseInt(utils.getWidth(buttons[item])) + settings.elements_height / 4;
                }
                let h = settings.height - 1.75 * settings.elements_height + 1.25 * settings.elements_height * row_num;
                utils.translateElement(buttons[item], last_end, h)
            });
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
        scaleElement: function (element, scale) {
            element.setAttribute("transform", `scale(${scale},${scale})`)
        },
        translateElement: function (element, x, y) {
            let el_height = element.querySelector("rect").getAttribute("height") / 2;
            let el_width = element.querySelector("rect").getAttribute("width") / 2;
            element.setAttribute("transform", `translate(${x - el_width},${y - el_height})`)
        },
        moveElement: function (element, x, y, user_elem) {
            if (x < this.getWidth(element) / 2) x = this.getWidth(element) / 2;
            if (x > settings.width - this.getWidth(element) / 2) x = settings.width - this.getWidth(element) / 2;
            if (y < settings.elements_height / 2) y = settings.elements_height / 2;
            if (y > settings.height - (user_elem ? buttons_zone_height : 0) - settings.elements_height / 2) y = settings.height - (user_elem ? buttons_zone_height : 0) - settings.elements_height / 2;

            element.setAttribute("transform", `translate(${x},${y})`);
            this.createAnswer();
        },
        userMoveElement: function (object, x, y) {
            this.moveElement(object.html, x, y, true);
            let c = this.getTransform(object.html, "translation");
            object.x = c.x;
            object.y = c.y;
        },
        getWidth: function (element) {
            return element.querySelector("rect").getAttribute("width");
        },
        cursorPoint: function (SVGObject, event) {
            pt = SVGObject.createSVGPoint();
            pt.x = event.clientX;
            pt.y = event.clientY;
            return pt.matrixTransform(SVGObject.getScreenCTM().inverse());
        },
        // DragTarget: function (SVGObject, event) {
        //     var pnt = SVGObject.ownerSVGElement.createSVGPoint();
        //     // console.log(DragTarget)
        //     pnt.x = event.clientX;
        //     pnt.y = event.clientY;
        //     //---elements in different(svg) viewports, and/or transformed ---
        //     var sCTM = SVGObject.getScreenCTM();
        //     // console.log(sCTM)
        //     var Pnt = pnt.matrixTransform(sCTM.inverse());
        //     return Pnt;
        //     // return pt.matrixTransform(SVGObject.getScreenCTM().inverse());
        // },
        getTransform: function (element, type) {
            let output = {x: 0, y: 0};
            let full_output = {};
            if (element.hasAttribute("transform")) {
                full_output = utils.parseTransform(element.getAttribute("transform"));
            }
            if (full_output[type]) {
                output = full_output[type]
            }

            return output;
        },
        parseTransform: function (input_str) {
            var prop = ['translate', 'matrix', 'rotate', 'skewX', 'skewY', 'scale'];
            var val = input_str.match(/(translate|matrix|rotate|skewX|skewY|scale)\(.*?\)/g);
            var obj = {};
            if (val) {
                for (var i = 0, length = val.length; i < length; i++) {
                    var item = val[i];
                    var index = item.indexOf('(');
                    var v = item.substring(index + 1, item.length - 1).split(/\,|\s/);
                    var n = item.substring(0, index);
                    obj[n] = {};
                    switch (n) {
                        case 'translate':
                        case 'scale':
                            obj[n].x = +v[0] || 0;
                            obj[n].y = +v[1] || 0;
                            break;
                        case 'rotate':
                            obj[n].a = +v[0] || 0;
                            obj[n].x = +v[1] || 0;
                            obj[n].y = +v[2] || 0;
                            break;
                        case 'skewX':
                        case 'skewY':
                            obj[n].a = +v[0];
                            break;
                        case 'matrix':
                            obj[n].a = +v[0] || 0;
                            obj[n].b = +v[1] || 0;
                            obj[n].c = +v[2] || 0;
                            obj[n].d = +v[3] || 0;
                            obj[n].e = +v[4] || 0;
                            obj[n].f = +v[5] || 0;
                            break;
                    }
                }
            }
            return obj;
        },
        getRandomString: function (length) {
            return Math.random().toString(36).substr(2, (length || 8));
        },
        createAnswer() {
            user_state.buttons = user_buttons.map(function (item) {
                return {x: item.x, y: item.y, class: item.class, button_id: item.button_id};
            });
            user_state.scale = test_scale || 1;
        },
    };


    DragTaskInit.init(task_container)

}

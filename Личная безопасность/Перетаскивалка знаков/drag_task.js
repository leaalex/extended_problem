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
    Array.from(sourceSVG.getButtons().children).forEach(b=>buttons_templates[b.id] = b);
    let buttons = {};
    let dragObject = undefined;
    let dragUserObject = undefined;

    let user_state = {
      buttons: [],
      scale: 1,
    };

    let test_scale = 1;

    let DragTaskInit = {
        init: function (elem){

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
            utils.scaleElement(task_block,test_scale);
            svg.appendChild(task_block);

            this.createTemplatesButtons(svg);

            this.createHandlers(svg);

            elem.appendChild(svg)
        },
        createHandlers: function(svg){

            // addUserButton('btn_x5F_9', {x:20, y:100}, 'kekes');

            Object.keys(buttons).forEach(function (item) {
                buttons[item].onmousedown = function (e) {
                    buttons[item].setAttribute("cursor", "grabbing");
                    dragObject = buttons[item].cloneNode(true);

                    svg.querySelector("#task_block").appendChild(dragObject);
                    dragObject.onmouseup = function (e) {
                        if (utils.getTranslation(dragObject).y < settings.height - buttons_zone_height - settings.elements_height / 2) {
                            addUserButton(item, utils.getTranslation(dragObject), utils.getRandomString())
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
                utils.moveElement(t,coordinates.x,coordinates.y);
                let new_btn = {
                    button_id: id,
                    class: btn_class,
                    x: coordinates.x,
                    y: coordinates.y,
                    html:t,
                };

                // console.log(new_btn);
                new_btn.html.setAttribute("cursor", "grab");

                let remove_btn = utils.createElementSVG('circle', '', 'remove-btn', {
                    cx: utils.getWidth(new_btn.html) / 2,
                    cy: (-1) * settings.elements_height / 2,
                    r: 8,
                });

                remove_btn.onmousedown = function (e) {
                    // console.log(new_btn);
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
                    offset.x = e.offsetX - utils.getTranslation(user_buttons.filter(item => item.button_id === dragUserObject)[0].html).x;
                    offset.y = e.offsetY - utils.getTranslation(user_buttons.filter(item => item.button_id === dragUserObject)[0].html).y;
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

            svg.onmousemove = onMouseMove;

            function onMouseMove(e) {
                let mousePosition = utils.cursorPoint(svg, e);
                let moveX = mousePosition.x;
                let moveY = mousePosition.y;


                if (dragObject) {
                    utils.moveElement(dragObject, moveX, moveY);
                } else if (dragUserObject) {
                    let current_elem = user_buttons.filter(item => item.button_id === dragUserObject)[0];
                    if (moveX - offset.x > utils.getWidth(current_elem.html) / 2) {
                        if (moveX - offset.x < settings.width - utils.getWidth(current_elem.html) / 2) {
                            if (moveY - offset.y > settings.elements_height / 2) {
                                if (moveY - offset.y < settings.height - buttons_zone_height - settings.elements_height / 2){

                                    console.log("Без скейла", (moveX - offset.x),(moveY - offset.y) );
                                    console.log("Co скейла", (moveX - offset.x)/test_scale,(moveY - offset.y)/test_scale );

                                    utils.userMoveElement(current_elem, (moveX), (moveY));
                                }
                            }
                        }
                    }
                    return false;
                } else {
                    return false;
                }
            }
        },
        createTemplatesButtons: function(svg){
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

            Object.keys(buttons_templates).forEach(function(item, index){
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
        scaleElement: function(element, scale){
            element.setAttribute("transform", `scale(${scale},${scale})`)
        },
        translateElement: function (element, x, y) {
            let el_height = element.querySelector("rect").getAttribute("height") / 2;
            let el_width = element.querySelector("rect").getAttribute("width") / 2;
            element.setAttribute("transform", `translate(${x - el_width},${y - el_height})`)
        },

        moveElement: function (element, x, y) {
            element.setAttribute("transform", `translate(${x/test_scale},${y/test_scale})`)
        },

        userMoveElement: function (object, x, y) {
            this.moveElement(object.html, x, y);
            let c = this.getTranslation(object.html);
            object.x = c.x;
            object.y = c.y;
        },

        getWidth: function (element) {
            return element.querySelector("rect").getAttribute("width");
        },

        cursorPoint: function (SVGObject, event) {
            let pt = SVGObject.createSVGPoint();
            pt.x = event.clientX;
            pt.y = event.clientY;
            return pt.matrixTransform(SVGObject.getScreenCTM().inverse());
        },

        getTranslation: function (element) {
            let coords = {x: 0, y: 0};
            if (element.hasAttribute("transform")) {
                if (element.getAttribute("transform").includes('translate')) {
                    let c = element.getAttribute("transform").replace('translate(', '').replace(')', '').split(',').map(x => Number(x));
                    coords.x = c[0];
                    coords.y = c[1];
                }
            }
            return coords;
        },
        getRandomString: function (length) {
            return Math.random().toString(36).substr(2, (length || 8));
        },
    };

    DragTaskInit.init(task_container)

}

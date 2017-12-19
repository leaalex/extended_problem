if (timeline_task_objects == undefined) var timeline_task_objects = {};

function timeline_task_activation(selector) {
    Array.prototype.filter.call(document.querySelectorAll(selector), function(element) {
        return element.dataset.status == undefined
    }).forEach(function(element, i, array) {
        timeline_task_objects[element.id] = (new timeline_task_objects(element, element.getAttribute("data")));
        element.dataset.status = "activate";
    });
    setTimeout(function() {
        timeline_task_activation(selector)
    }, 1000);
}

function Answer(elementField) {
    this.elementField = elementField;
    this.fieldValue = "";
    this.fieldObject = {};
    this.get = function() {
        this.fieldValue = elementField.value;
        return this.fieldValue;
    };
    this.set = function(value) {
        if (value == undefined) value = this.fieldValue;
        elementField.value = value;
    };
    this.getJSON = function() {
        if (this.isJsonString(this.get())) this.fieldObject = JSON.parse(this.get());
        return this.fieldObject;
    };
    this.setJSON = function(object) {
        if (object == undefined) object = this.fieldObject;
        this.set(JSON.stringify(object))
    };
    this.isJsonString = function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };
};

function timeline_task_objects(element, data) {
    this.element = element;
    this.data = JSON.parse(data.replace(/'/g, '"')) || [];
    var answer = new Answer(element.querySelector("#input_id").querySelector("input[type='text']"));
    this.svg_element = createSVGObject.bind(this)(this.data);
    element.querySelector(".svg_object").appendChild(this.svg_element);
    $(this.svg_element).hide().fadeIn(500);


    function createElementSVG(name, id, classList, attributes) {
        var NS = "http://www.w3.org/2000/svg";
        var element = document.createElementNS(NS, name);
        if (id) element.id = id;

        if (classList) element.classList.add(classList);
        if (attributes) {
            for (attribute in attributes) {
                element.setAttribute(attribute, attributes[attribute])
            }
        }
        return element;
    };

    function setAttributes(element, attrs) {
        for (var key in attrs) {
            element.setAttribute(key, attrs[key]);
        }
        return element;
    };

    function createTextSVG(x, y, text, attributes) {
        var NS = "http://www.w3.org/2000/svg";
        var textObject = document.createElementNS(NS, "text");
        var textObject = createElementSVG("text", null, null, {
            x: x,
            y: y
        });
        if (attributes) {
            for (attribute in attributes) {
                textObject.setAttribute(attribute, attributes[attribute])
            }
        }
        var textNode = document.createTextNode(text);
        textObject.appendChild(textNode);
        return textObject;
    }

        function stringToArray(str, len) {
            // str - входная строка; len - количество символов, на которые разбить
            var temp_arr = [];

            function STR(str, pos) {
                var next_pos = str.indexOf(" ", pos + 1);
                if (next_pos == -1) {
                    temp_arr.push(str);
                    return
                }
                if (next_pos < len) {
                    STR(str, next_pos);
                } else {
                    if (len - pos < next_pos - len) {
                        temp_arr.push(str.slice(0, pos));
                        STR(str.slice(pos));
                    } else {
                        temp_arr.push(str.slice(0, next_pos));
                        STR(str.slice(next_pos));
                    }

                }
            }
            STR(str, str.indexOf(" "));
            return temp_arr;
        }

    function genID(value) {
        var value = value || "id"
        return value +"_" + Math.random().toString(16).substr(2, 8).toUpperCase();
    };

    function cursorPoint(SVGObject, event) {
        var pt = SVGObject.createSVGPoint()
        pt.x = event.clientX;
        pt.y = event.clientY;
        return pt.matrixTransform(SVGObject.getScreenCTM().inverse());
    }

    function createSVGObject(data) {
        var state_items = data["state_items"];

        if (answer.get()) {
            state_items = answer.getJSON();
        }

        var days = data["settings"]["days"] || 37;
        var timelineWidth = data["settings"]["timelineWidth"] || 600;
        var SVG_width = data["settings"]["SVG_width"] || 800;
        var SVG_height = data["settings"]["SVG_height"] || 660;
        var items_background_height = data["settings"]["items_background_height"] || 140;
        var item_width = data["settings"]["item_width"] || 180;
        var item_height = data["settings"]["item_height"] || 104;
        var timeline_signature = data["settings"]["timeline_signature"] || "Время, месяцы";
        var margin_binding_lines = data["settings"]["margin_binding_lines"] || 100;
        var timeline_marker_line_width = data["settings"]["timeline_marker_line_width"] || 20;
        var up_bottom_toggle = data["settings"]["up_bottom_toggle"] || 32;
        var mark_height = data["settings"]["mark_height"] || 12;
        var max_item_symbols_count = data["settings"]["max_item_symbols_count"] || 22;

        var timelineStart = {
            x: (SVG_width - timelineWidth - timeline_marker_line_width - 10) / 2 - 60,
            y: (SVG_height - items_background_height) / 2
        };

        // интервал привязки к маркеру, сейчас 0,25 длины иежду маркерами
        var mark_bind_interval = parseInt((timelineWidth / days) / 2);
        var item_font_size = 0.7; // em
        var item_mark_font_size = 1.3; // em
        var timeline_arrow_color = "#009fea";
        var timeline_stroke_size = 4;
        var timeline_mark_stroke_size = 3;
        var background_color = "#ffffff";
        var item_color = "#f8f8f8";
        var item_stroke_color = "#a8a8a8";
        var item_stroke_width = 1.5;
        var timeline_mark_color = "#009fea";

        // основной список элементов, с которыми работаем
        var items = [];
        // текущий элемент, за который тащим
        var draggableElement = false;

        var svg = createElementSVG('svg', "time_line_svg", null, {
            "viewbox": '0 0 ' + SVG_width + ' ' + SVG_height,
            "width": SVG_width,
            "height": SVG_height,
        });

        var background = createElementSVG('rect', null, 'time-line-background', {
            "x": "0",
            "y": "0",
            "width": SVG_width,
            "height": SVG_height,
            "fill": background_color,
            "stroke": "#f6f6f6",
            'stroke-width': 5,
        });

        var items_zone_line = createElementSVG('line', null, 'items-zone-line', {
            "x1": 0,
            "y1": SVG_height - items_background_height,
            "x2": SVG_width,
            "y2": SVG_height - items_background_height,
            "stroke": "rgb(246, 246, 246)",
            "stroke-width": 5,
        });

        var timelineMarkerId = genID();
        var timeline = createElementSVG('g', null, null, {});
        var timelineMarker = createElementSVG('marker', 'time-line-marker' + timelineMarkerId, null, {
            "markerWidth": "10",
            "markerHeight": "10",
            "refX": "0.5",
            "refY": "3",
            "orient": "auto",
            "markerUnits": "strokeWidth"
        });
        timelineMarker.innerHTML = '<path d="M-3,0 L-3,6 L6,3 z" fill="' + timeline_arrow_color + '" />';

        var timeline_marker_line = createElementSVG('line', null, 'timeline-marker-line', {
            "x1": timelineStart.x + timelineWidth - 1,
            "y1": timelineStart.y,
            "x2": timelineStart.x + timelineWidth + timeline_marker_line_width,
            "y2": timelineStart.y,
            "stroke": timeline_arrow_color,
            "stroke-width": timeline_stroke_size,
            "marker-end": "url(#time-line-marker" + timelineMarkerId + ")",
        });

        var timeline_label = createTextSVG(timelineWidth + timeline_marker_line_width + 46, timelineStart.y + 20, timeline_signature, {
            "font-size": "0.9em",
            "class": "mark-label",
            "style": "user-select: none; cursor: pointer;"
        });

        var timeline_object = createElementSVG('line', 'time-line', 'time-line', {
            "x1": timelineStart.x,
            "y1": timelineStart.y,
            "x2": timelineStart.x + timelineWidth,
            "y2": timelineStart.y,
            "stroke": timeline_arrow_color,
            "stroke-width": timeline_stroke_size,
        });

        svg.append(background);
        svg.append(items_zone_line);
        svg.append(timeline_marker_line);
        timeline.append(timelineMarker);
        svg.append(timeline_label);
        timeline.append(timeline_object);
        svg.append(timeline);

        /***
            Временные линии, с которых начинается привязка к таймлайну
        ***/

        // var up_binding_line = createElementSVG('line', null, 'binding-line', {
        //     "x1": timelineStart.x,
        //     "y1": timelineStart.y - margin_binding_lines,
        //     "x2": timelineStart.x + timelineWidth + timeline_marker_line_width,
        //     "y2": timelineStart.y - margin_binding_lines,
        //     "stroke": "black",
        //     "stroke-width": 2,
        //     "stroke-dasharray": "5, 5",
        //     "opacity": 0.3,
        // });

        // var bottom_binding_line = createElementSVG('line', null, 'binding-line', {
        //     "x1": timelineStart.x,
        //     "y1": timelineStart.y + margin_binding_lines,
        //     "x2": timelineStart.x + timelineWidth + timeline_marker_line_width,
        //     "y2": timelineStart.y + margin_binding_lines,
        //     "stroke": "black",
        //     "stroke-width": 2,
        //     "stroke-dasharray": "5, 5",
        //     "opacity": 0.3,
        // });
        // svg.append(bottom_binding_line);
        // svg.append(up_binding_line);

        /***
            Временные линии, через которые перепрыгиваем
        ***/

        // var temp_line_1 = createElementSVG('line', null, 'item-rect', {
        //     "x1": timelineStart.x,
        //     "y1": timelineStart.y - up_bottom_toggle,
        //     "x2": timelineStart.x + timelineWidth + timeline_marker_line_width,
        //     "y2": timelineStart.y - up_bottom_toggle,
        //     "stroke": "black",
        //     "stroke-width": 1,
        //     "opacity": 0.3,
        // });
        // var temp_line_2 = createElementSVG('line', null, 'item-rect', {
        //     "x1": timelineStart.x,
        //     "y1": timelineStart.y + up_bottom_toggle,
        //     "x2": timelineStart.x + timelineWidth + timeline_marker_line_width,
        //     "y2": timelineStart.y + up_bottom_toggle,
        //     "stroke": "black",
        //     "stroke-width": 1,
        //     "opacity": 0.3,
        // });
        // svg.append(temp_line_1);
        // svg.append(temp_line_2);


        var marks = [];
        for (var i = 0; i < days; i++) {
            var mark_object = {};
            mark_object.html = createElementSVG('line', null, 'mark', {
                "x1": i * timelineWidth / days + timelineStart.x,
                "y1": timelineStart.y + mark_height / 2,
                "x2": i * timelineWidth / days + timelineStart.x,
                "y2": timelineStart.y - mark_height / 2,
                "stroke": timeline_mark_color,
                "stroke-width": timeline_mark_stroke_size,
            });
            mark_object.center = {
                x: i * timelineWidth / days + timelineStart.x,
                y: timelineStart.y
            };
            mark_object.value = i;

            // var label_pos_x = i.toString().length > 1 ? mark_object.center.x - 4 : mark_object.center.x - 2;
            // var mark_label = createTextSVG(label_pos_x, mark_object.center.y + 25, i.toString(), {
            //     "font-size": "0.6em",
            //     "class": "mark-label",
            // });
            // svg.append(mark_label);
            marks.push(mark_object);
            svg.append(mark_object.html);
        }

        for (var i = 0; i < state_items.length; i++) {
            var item_object = {};
            var item_position = {};
            item_object.id = state_items[i].id;
            item_object.title = state_items[i].title;
            item_position.x = parseInt(timelineStart.x + i * item_width * 1.1);
            item_position.y = parseInt(SVG_height - items_background_height + (items_background_height - item_height) / 2);
            item_object.start_postition = JSON.parse(JSON.stringify(item_position));

            if (state_items[i].current_position) {
                item_position.x = parseInt(state_items[i].current_position.x);
                item_position.y = parseInt(state_items[i].current_position.y);
            }

            item_object.html = createElementSVG('g', state_items[i].id, 'item', {
                "style": "cursor: pointer;",
            });

            var item_rect = createElementSVG('rect', null, 'item-rect', {
                "x": item_position.x - 10,
                "y": item_position.y,
                "width": item_width,
                "height": item_height,
                "fill": item_color,
                "rx": "12",
                "ry": "12",
                "stroke-width": item_stroke_width,
                "stroke": item_stroke_color,
            });

            var vertical_binding_line_marker = createElementSVG('marker', 'binding_marker_' + item_object.id, null, {
                "markerWidth": "10",
                "markerHeight": "10",
                "refX": "0",
                "refY": "3",
                "orient": "auto-start-reverse",
                "markerUnits": "strokeWidth",
            });
            vertical_binding_line_marker.innerHTML = '<path d="M-3,0 L-3,6 L6,3 z" fill="' + item_stroke_color + '" />';

            var vertical_binding_line = createElementSVG('line', null, 'vertical-binding-line', {
                "stroke": item_stroke_color,
                "stroke-width": 2,
                "style": "display: none",
                "marker-start": "url(#" + 'binding_marker_' + item_object.id + ")",
            });
            item_object.html.append(vertical_binding_line_marker);

            var item_text = createElementSVG('text', null, 'item-text', {
                "x": item_position.x,
                "y": item_position.y + (items_background_height - item_height) / 2,
                "font-size": item_font_size + "em",
                "text-anchor": "middle",
                "style": "user-select: none;",
            });

            var item_mark = createElementSVG('text', null, 'item-mark', {
                "font-size": item_mark_font_size + "em",
                "text-anchor": "middle",
                "style": "user-select: none;",
            });

            var item_mark_text = createElementSVG('tspan', null, 'item-mark-text', {});
            item_mark.append(item_mark_text);

            stringToArray(state_items[i].title, max_item_symbols_count).forEach(function(str, index) {
                var line_dy = index == 0 ? "0" : (item_font_size + 0.2) + "em";
                var str_line = createElementSVG('tspan', null, null, {
                    "x": parseInt(item_position.x) + item_width / 2 - 10,
                    "dy": line_dy
                });
                str_line.append(str);
                item_text.append(str_line);
            });

            item_object.html.append(vertical_binding_line);
            item_object.html.append(item_rect);
            item_object.html.append(item_text);
            item_object.html.append(item_mark);
            item_object.value = -999;

            if (state_items[i].current_position) {
                draggableElement = item_object;
                setPosition(item_position);
                draggableElement = false;
            }

            items.push(item_object);
            svg.append(item_object.html);
        }


        function findMark(marks, position, interval) {
            var finded_mark = false;
            for (var i = 0; i < marks.length; i++) {
                if (marks[i].center.x - interval < position.x && marks[i].center.x + interval > position.x) {
                    finded_mark = marks[i];
                }
            }
            return finded_mark;
        }

        function setItemPosition(element, x, y) {
            element.html.querySelector('rect').setAttribute("x", x - 10);
            element.html.querySelector('rect').setAttribute("y", y);
            element.html.querySelector('text').setAttribute("x", x - 10);
            element.html.querySelector('text').setAttribute("y", y + (items_background_height - item_height) / 2);
            element.html.querySelectorAll('tspan').forEach(function(el, index) {
                el.setAttribute("x", x + item_width / 2 - 10);
            });
            return element.html;
        }

        function setAnswer(items) {
            local_answer = [];
            for (var i = 0; i < items.length; i++) {
                answer_object = {};
                answer_object.id = items[i].id;
                answer_object.title = items[i].title;
                answer_object.value = items[i].value;
                if (items[i].start_postition) {
                    answer_object.start_postition = items[i].start_postition;
                }
                if (items[i].current_position) {
                    answer_object.current_position = items[i].current_position;
                }
                local_answer.push(answer_object);
            }
            return local_answer;
        }
        answer.setJSON(setAnswer(items));

        items.forEach(function(element, index) {
            element.html.onmousedown = function(e) {
                draggableElement = element;
                var mouse_pos = cursorPoint(svg, e);
                draggableElement.drag_x = mouse_pos.x - parseInt(element.html.querySelector('rect').getAttribute("x"));
                draggableElement.drag_y = mouse_pos.y - parseInt(element.html.querySelector('rect').getAttribute("y"));
            };
        });

        svg.onmouseup = mouseUpHandler;
        function mouseUpHandler() {
            if (draggableElement.value === -999) {
                draggableElement.html = setItemPosition(draggableElement, draggableElement.start_postition.x, draggableElement.start_postition.y);
                draggableElement.html.querySelector('.vertical-binding-line').style.display = "none";
                if (draggableElement.current_position) {
                    delete draggableElement.current_position;
                }
            }
            draggableElement = false;
            answer.setJSON(setAnswer(items));
        }

        function setPosition(new_pos) {
            var bind_line = draggableElement.html.querySelector('.vertical-binding-line');
            var marker = draggableElement.html.querySelector('.item-mark').querySelector('.item-mark-text');
            bind_line = setAttributes(bind_line, {
                "style": "display: none;"
            });

            if (new_pos.y < timelineStart.y + margin_binding_lines && new_pos.y > timelineStart.y) {
                bind_line = setAttributes(bind_line, {
                    "style": "display: block;",
                    "x1": new_pos.x,
                    "y1": timelineStart.y + 20,
                    "x2": new_pos.x,
                    "y2": new_pos.y + 10
                });

                marker.style.display = "none";
                var current_mark = findMark(marks, new_pos, mark_bind_interval);
                if (current_mark) {
                    draggableElement.html = setItemPosition(draggableElement, parseInt(current_mark.center.x), parseInt(new_pos.y));
                    draggableElement.value = current_mark.value;
                    bind_line = setAttributes(bind_line, {
                        "x1": current_mark.center.x,
                        "x2": current_mark.center.x
                    });
                    marker.innerHTML = draggableElement.value;
                    marker = setAttributes(marker, {
                        "style": "display: block;",
                        "x": current_mark.center.x,
                        "y": current_mark.center.y - (mark_height / 2 + 4)
                    });
                    draggableElement.current_position = new_pos;
                } else {
                    draggableElement.value = -999;
                }
            } else if (new_pos.y + item_height > timelineStart.y - margin_binding_lines && new_pos.y < timelineStart.y) {
                bind_line = setAttributes(bind_line, {
                    "style": "display: block;",
                    "x1": new_pos.x,
                    "y1": timelineStart.y - 20,
                    "x2": new_pos.x,
                    "y2": new_pos.y + item_height - 10,
                });
                marker.style.display = "none";
                var current_mark = findMark(marks, new_pos, mark_bind_interval);
                if (current_mark) {
                    draggableElement.html = setItemPosition(draggableElement, parseInt(current_mark.center.x), parseInt(new_pos.y));
                    draggableElement.value = current_mark.value;
                    bind_line = setAttributes(bind_line, {
                        "x1": current_mark.center.x,
                        "x2": current_mark.center.x
                    });

                    marker.innerHTML = draggableElement.value;
                    marker = setAttributes(marker, {
                        "style": "display: block;",
                        "x": current_mark.center.x,
                        "y": current_mark.center.y + mark_height / 2 + 20,
                    });
                    draggableElement.current_position = new_pos;
                } else {
                    draggableElement.value = -999;
                }
            } else {
                bind_line = setAttributes(bind_line, {
                    "style": "display: none;"
                });
                marker.style.display = "none";
                draggableElement.value = -999;
            }
        }

        svg.onmousemove = function(e) {
            if (draggableElement) {
                var mouse_pos = cursorPoint(svg, e);
                var new_pos = {
                    x: mouse_pos.x - draggableElement.drag_x,
                    y: mouse_pos.y - draggableElement.drag_y,
                };
                //Перепрыгивания
                if (new_pos.y <= timelineStart.y + up_bottom_toggle) {
                    new_pos.y = timelineStart.y + up_bottom_toggle;
                    if (mouse_pos.y < timelineStart.y) {
                        new_pos.y = timelineStart.y - up_bottom_toggle - item_height;
                        if (mouse_pos.y < timelineStart.y - up_bottom_toggle) {
                            new_pos.y = mouse_pos.y - draggableElement.drag_y;
                            if (new_pos.y + item_height > timelineStart.y - up_bottom_toggle) {
                                new_pos.y = timelineStart.y - up_bottom_toggle - item_height;
                            }
                        }
                    }
                }
                // Ограничиваем перемещение по оси 'x'
                if (new_pos.x <= marks[0].center.x) new_pos.x = marks[0].center.x;
                if (new_pos.x >= marks[marks.length - 1].center.x) new_pos.x = marks[marks.length - 1].center.x;

                draggableElement.html = setItemPosition(draggableElement, parseInt(new_pos.x), parseInt(new_pos.y));
                setPosition(new_pos);
            }
        };
        return svg;
    }
}

timeline_task_activation(".timeline_task");
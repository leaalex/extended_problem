if (mind_mapObjects == undefined) var mind_mapObjects = {};

function mind_mapActivation(selector) {
    Array.prototype.filter.call(document.querySelectorAll(selector), function(element) {
        return element.dataset.status == undefined
    }).forEach(function(element, i, array) {
        mind_mapObjects[element.id] = (new mind_mapObjects(element, element.getAttribute("data")));
        element.dataset.status = "activate";
    });
    setTimeout(function() {
        mind_mapActivation(selector)
    }, 1000);
}

// Конструктор работы с полем ответа
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
    /* Утилиты */
    /* Проверка строки на возможность преобразования в JSON */
    this.isJsonString = function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };
};

function mind_mapObjects(element, data) {

    $(element).on('mouseenter', function(event) {
        $("body").css("overflow", "hidden");
    }).on('mouseleave', function() {
        $("body").css("overflow", "auto");
    });

    this.element = element;
    var answer = new Answer(element.querySelector("#input_id").querySelector("input[type='text']"));
    this.svg_element = createSVGObject.bind(this)(data);

    element.querySelector(".svg_object").appendChild(this.svg_element);
    $(this.svg_element).hide().fadeIn(600);

    function createSVGObject(data) {
        data = JSON.parse(data)
        var nodesGroups = data["nodesGroups"] || {};
        var SVG_width = data["SVG_width"] || 800;
        var SVG_height = data["SVG_height"] || 800;
        var free_nodes_zone_height = data["free_nodes_zone_height"] || 140;
        var node_radius = data["node_radius"] || 52;
        var deep_radius = data["deep_radius"] || 140;
        var group_circle_radius = data["group_circle_radius"] || 14;
        var groups_area_width = data["groups_area_width"] || 250;
        var font_size = data["font_size"] || 0.65;
        var groups_area_color = data["groups_area_color"] || "#c8c8c8";
        var graph_space_color = data["graph_space_color"] || "#e6e6e6";
        var free_nodes_zone_color = data["free_nodes_zone_color"] || "#c8c8c8";
        var nodes_default_color = data["nodes_default_color"] || "azure";

        var min_scale = data["min_scale"] || 0.5;
        var max_scale = data["max_scale"] || 1.5;

        var nodesObject = data["nodesObject"] || {};
        var graph_scale = data["graph_scale"] || 1;
        var center = {
            x: SVG_width / 2,
            y: SVG_height / 6
        };

        if (answer.get()) {
            var current_answer = answer.getJSON();
            nodesObject = current_answer["nodesObject"];
            graph_scale = current_answer["graph_scale"];
            center = current_answer["center"];
        }

        function setAnswer(no, gs, c) {
            var studentAnswer = {};
            studentAnswer["nodesObject"] = no;
            studentAnswer["graph_scale"] = gs;
            studentAnswer["center"] = c;
            answer.setJSON(studentAnswer)
        }
        setAnswer(nodesObject, graph_scale, center)

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

        function cursorPoint(SVGObject, event) {
            var pt = SVGObject.createSVGPoint()
            pt.x = event.clientX;
            pt.y = event.clientY;
            return pt.matrixTransform(SVGObject.getScreenCTM().inverse());
        }

        var svg = createElementSVG('svg', "mind_map_svg", null, {
            viewbox: '0 0 ' + SVG_width + ' ' + SVG_height,
            width: SVG_width,
            height: SVG_height,
        });

        var background = createElementSVG('g', null, 'mind-map-background', {});
        var graph_space = createElementSVG('rect', null, ["graph_space"], {
            x: "0",
            y: "0",
            width: SVG_width,
            height: SVG_height,
            fill: graph_space_color
        });
        background.append(graph_space);
        svg.append(background);

        function getNode(node_data, x, y, scale) {
            var node = createElementSVG('g', node_data["node_id"], ["node"], {});
            var node_circle = createElementSVG('circle', null, ["node-body"], {
                "cx": x,
                "cy": y,
                "r": parseFloat(node_radius * scale),
                fill: nodes_default_color
            });
            var node_label = createElementSVG('text', null, null, {
                "x": node_circle.getAttribute("cx"),
                "y": node_circle.getAttribute("cy"),
                "font-size": font_size * scale + "em",
            });

            node_data["label"].split(" ").forEach(function(str, index) {
                var line_dy = index == 0 ? "0" : "0.8em";
                var str_line = createElementSVG('tspan', null, null, {
                    "x": node_circle.getAttribute("cx"),
                    "dy": line_dy
                });
                str_line.append(str);
                node_label.append(str_line)
            });

            node.append(node_circle);
            node.append(node_label);
            return node;
        }

        var all_graph_nodes = [];
        var main_node_object = {};

        function drawMindMap(nodesObjectTemp, temp_node_id, scale_coeff) {
            var graph_nodes = []
            $(svg).find(".edge").remove();
            $(svg).find(".graph-node").remove();
            var obj = nodesObjectTemp["graph"];
            var deep = 0;
            main_node_object = {
                "node_id": nodesObjectTemp["main_node"]["node_id"],
                "label": nodesObjectTemp["main_node"]["label"],
                "center_x": center.x,
                "center_y": center.y
            }
            drawDeep(obj, deep);

            function drawDeep(obj, deep) {
                if (obj instanceof Array) {
                    if (deep == 0) {
                        obj.forEach(function(child, index) {
                            child.parent_center_x = center.x;
                            child.parent_center_y = center.y;
                            child.parent_rotate = 90;
                            child.parent_current_angle = 0;
                            child.deep = 0;
                        })
                    }
                    deep++
                    obj.forEach(function(v, i) {
                        v.deep = deep;

                        // Доступный угол завист от кол-ва эл-тов того же уровня
                        // + node_radius  * 1.7 //countInDeep(nodesObject["graph"], deep-1) + node_radius * 1.7;

                        // Изначально доступно 360 гр., тогда child.parent_current_angle = 270;
                        // var angle =360 / deep
                        // var l = deep == 1 ? 0 : 1;
                        // var interval = angle / (obj.length + l);

                        //доступный угол просто посчитан
                        var angle = 180 / deep + node_radius * 2;
                        var interval = angle / (obj.length + 1);
                        // // конец

                        var ots = v.parent_rotate - (angle / 2);
                        v.center_y = (v.parent_center_y + scale_coeff * deep_radius * Math.sin((-180 + (-1) * (ots + interval * (i + 1) + v.parent_current_angle)) / 180 * Math.PI));
                        v.center_x = (v.parent_center_x + scale_coeff * deep_radius * Math.cos((-180 + (-1) * (ots + interval * (i + 1) + v.parent_current_angle)) / 180 * Math.PI));
                        var line = createElementSVG('line', null, "edge", {
                            "x1": v.center_x,
                            "y1": v.center_y,
                            "x2": v.parent_center_x,
                            "y2": v.parent_center_y,
                            "stroke-width": 3 * scale_coeff,
                        });

                        if (temp_node_id && temp_node_id == v.node_id) {
                            line.classList.add("temp-edge");
                        }
                        svg.append(line);
                        graph_nodes.push(v);
                        try {
                            if (v.children.length > 0) {
                                v.children.forEach(function(child, index) {
                                    child.parent_center_x = v.center_x;
                                    child.parent_center_y = v.center_y;
                                    child.parent_rotate = interval * (i + 1);
                                    child.parent_current_angle = ots + v.parent_current_angle;
                                })
                                drawDeep(v.children, deep)
                            }
                        } catch (e) {
                            v["children"] = [];
                        }
                    })
                } else if (obj instanceof Object) {
                    obj.deep = deep;
                    graph_nodes.push(v)
                }
            }
            graph_nodes.forEach(function(v, i) {
                if (temp_node_id && temp_node_id == v.node_id) {
                    var node = getNode(v, v.center_x, v.center_y, scale_coeff);
                    node.setAttribute('class', "graph-node node temp-node");
                    node.querySelector('circle').style["stroke-width"] = 3 * scale_coeff;
                } else {
                    var node = getNode(v, v.center_x, v.center_y, scale_coeff);
                    node.setAttribute('class', "graph-node node");
                }
                node.setAttribute("group", v["group"]);
                svg.append(node);

                node.onmousedown = function(e) {
                    if (e.which != 1) return;
                    var elem = e.target.closest('.graph-node');
                    if (!elem) return;
                    dragObject.elem = elem;
                    return false;
                };
                node.onmouseup = function(e) {
                    if (dragObject.copy) {
                        dragObject.copy.rollback();
                        if (dragObject.parentCandidate) {
                            var nodesObjectCopy = JSON.parse(JSON.stringify(nodesObject));
                            if (dragObject.parentCandidate.node_id == main_node_object.node_id) {
                                nodesObjectCopy["graph"].push(dragObject.object);
                                nodesObjectCopy["free_nodes"] = $.grep(nodesObjectCopy["free_nodes"], function(e) {
                                    return e.node_id != dragObject.object.node_id;
                                });
                            } else {

                                for (var i = 0; i < nodesObjectCopy["graph"].length; i++) {
                                    var check = addNode(dragObject.parentCandidate.node_id, nodesObjectCopy["graph"][i], dragObject.object);
                                    if (check) {
                                        nodesObjectCopy["graph"][i] = check;
                                        nodesObjectCopy["free_nodes"] = $.grep(nodesObjectCopy["free_nodes"], function(e) {
                                            return e.node_id != dragObject.object.node_id;
                                        });
                                        break;
                                    }
                                }
                            }
                            drawMindMap(nodesObjectCopy, false, graph_scale);
                            drawFreeNodes(nodesObjectCopy);
                            nodesObject = JSON.parse(JSON.stringify(nodesObjectCopy));
                            setAnswer(nodesObject, graph_scale, center);
                        } else {
                            nodesObject["free_nodes"].forEach(function(element, index) {
                                element.group = "empty_group";
                            });
                            drawFreeNodes(nodesObject);
                        }
                        drawFreeNodes(nodesObject);
                    }
                    dragObject = {};
                }
            });
            var main_node = getNode(nodesObjectTemp["main_node"], center.x, center.y, scale_coeff);
            main_node.setAttribute('class', "graph-node node");
            main_node.setAttribute("group", nodesObjectTemp["main_node"]["group"]);
            svg.append(main_node);
            all_graph_nodes = graph_nodes.concat(main_node_object);
            drawGroupsList();
            drawFreeNodes(nodesObject);
            setAnswer(nodesObject, graph_scale, center);
        };

        function drawFreeNodes(nodesObjectTemp) {
            $(svg).find(".free-node").remove();
            $(svg).find(".free_nodes_zone").remove();
            var free_nodes_zone = createElementSVG('rect', null, ["free_nodes_zone"], {
                width: SVG_width,
                height: free_nodes_zone_height,
                y: SVG_height - free_nodes_zone_height,
                x: 0,
                fill: free_nodes_zone_color
            });

            svg.append(free_nodes_zone);
            var free_nodes = nodesObjectTemp["free_nodes"];
            free_nodes.forEach(function(element, index) {
                var node = getNode(element, (index * node_radius * 2.2) + node_radius + 10, SVG_height - free_nodes_zone_height / 2, 1);
                node.setAttribute('class', "free-node node");
                svg.append(node);

                node.onmousedown = function(e) {
                    if (e.which != 1) return;
                    var elem = e.target.closest('.free-node');
                    if (!elem) return;
                    dragObject.elem = elem;
                    dragObject.object = nodesObject["free_nodes"].filter(function(element) {
                        return element.node_id === elem.id;
                    })[0];
                    dragObject.downX = e.pageX;
                    dragObject.downY = e.pageY;
                    return false;
                };

                node.onmouseup = function(e) {
                    if (dragObject.copy) {
                        dragObject.copy.rollback();

                        if (dragObject.parentCandidate) {
                            var nodesObjectCopy = JSON.parse(JSON.stringify(nodesObject));
                            if (dragObject.parentCandidate.node_id == main_node_object.node_id) {
                                nodesObjectCopy["graph"].push(dragObject.object);
                                nodesObjectCopy["free_nodes"] = $.grep(nodesObjectCopy["free_nodes"], function(e) {
                                    return e.node_id != dragObject.object.node_id;
                                });
                            } else {
                                for (var i = 0; i < nodesObjectCopy["graph"].length; i++) {
                                    var check = addNode(dragObject.parentCandidate.node_id, nodesObjectCopy["graph"][i], dragObject.object);
                                    if (check) {
                                        nodesObjectCopy["graph"][i] = check;
                                        nodesObjectCopy["free_nodes"] = $.grep(nodesObjectCopy["free_nodes"], function(e) {
                                            return e.node_id != dragObject.object.node_id;
                                        });
                                        break;
                                    }
                                }
                            }
                            drawMindMap(nodesObjectCopy, false, graph_scale);
                            drawFreeNodes(nodesObjectCopy);
                            nodesObject = JSON.parse(JSON.stringify(nodesObjectCopy));
                            setAnswer(nodesObject, graph_scale, center);
                        }
                        svg.querySelector("#" + dragObject.object.node_id).classList.remove("drop-candidate");
                    }
                    graphSpaceMoving.isMoving = false;
                    dragObject = {};
                }
            });
            setFreeNodesScroll();
        }

        function drawGroupsList() {
            $(svg).find(".groups_space").remove();
            $(svg).find(".group-circle").remove();
            $(svg).find(".group-label").remove();

            if (Object.keys(nodesGroups).length > 0) {
                var keys = Object.keys(nodesGroups);
                var groups_area_height = (group_circle_radius * 2 + 5) * (keys.length) + 5;
                var groups_area = createElementSVG('rect', null, ["groups_space"], {
                    x: SVG_width - groups_area_width,
                    y: "0",
                    width: groups_area_width,
                    height: groups_area_height,
                    fill: groups_area_color
                });
                svg.append(groups_area);
                keys.forEach(function(k, i) {
                    var group_label = createElementSVG('text', null, "group-label", {
                        "x": SVG_width - groups_area_width + group_circle_radius * 2 + group_circle_radius / 1,
                        "y": (group_circle_radius * 2 + 5) * (i) + group_circle_radius + 10,

                    });

                    var textNode = document.createTextNode(nodesGroups[k]["title"]);
                    group_label.appendChild(textNode);

                    var group = createElementSVG('g', k, ["group-circle"], {});
                    var group_circle = createElementSVG('circle', null, ["group-body"], {
                        "cx": SVG_width - groups_area_width + group_circle_radius + 5,
                        "cy": (group_circle_radius * 2 + 5) * (i) + group_circle_radius + 5,
                        "r": group_circle_radius,
                        fill: nodesGroups[k]["color"]
                    });

                    group_circle.onmousedown = function(e) {
                        if (e.which != 1) return;
                        var elem = e.target.closest('.group-circle');
                        if (!elem) return;
                        groupObject.elem = elem;
                        drawGroupsList();
                        return false;
                    };
                    group_circle.onmouseup = function(e) {
                        if (groupObject.copy) {
                            groupObject.copy.rollback();
                            if (groupObject.parentCandidate) {
                                var nodesObjectCopy = JSON.parse(JSON.stringify(nodesObject));
                                nodesObjectCopy = setNodeAttr(groupObject.parentCandidate.node_id, nodesObjectCopy, groupObject.elem.id);

                                nodesObject = JSON.parse(JSON.stringify(nodesObjectCopy));
                                setAnswer(nodesObject, graph_scale, center);
                                drawMindMap(nodesObject, false, graph_scale);
                            } else {
                                drawMindMap(nodesObject, false, graph_scale);
                            }
                        }
                        groupObject = {};
                    };
                    group.append(group_circle);
                    svg.append(group);
                    svg.append(group_label);
                });
            }
        }

        // DRAG N DROP
        var dragObject = {};
        var groupObject = {};
        var graphSpaceMoving = {};
        svg.onmousemove = onMouseMove;
        drawMindMap(nodesObject, false, graph_scale);
        drawFreeNodes(nodesObject);
        drawGroupsList();

        svg.querySelector('.graph_space').onmousedown = function(e) {
            graphSpaceMoving.isMoving = true;
            graphSpaceMoving.x = cursorPoint(svg, e).x;
            graphSpaceMoving.y = cursorPoint(svg, e).y;

            graphSpaceMoving.center_x = center.x;
            graphSpaceMoving.center_y = center.y;
        };

        svg.onmouseup = function(e) {
            graphSpaceMoving.isMoving = false;
        };

        svg.querySelector('.graph_space').onmousemove = function(e) {
            if (graphSpaceMoving.isMoving) {
                var currentMoving = {};
                currentMoving = cursorPoint(svg, e);
                var loc_x = currentMoving.x - graphSpaceMoving.x;
                var loc_y = currentMoving.y - graphSpaceMoving.y;
                center.x = graphSpaceMoving.center_x + loc_x
                center.y = graphSpaceMoving.center_y + loc_y

                center.x = center.x < 0 + node_radius * graph_scale ? 0 + node_radius * graph_scale : center.x;
                center.x = center.x > SVG_width - node_radius * graph_scale ? SVG_width - node_radius * graph_scale : center.x;

                center.y = center.y < 0 + node_radius * graph_scale ? 0 + node_radius * graph_scale : center.y;
                center.y = center.y > SVG_height - free_nodes_zone_height - node_radius * graph_scale ? SVG_height - free_nodes_zone_height - node_radius * graph_scale : center.y;
                drawMindMap(nodesObject, false, graph_scale);
            }
        }

        function findNode(nodes, radius, mouse_pos) {
            radius = radius * graph_scale;
            var nodeList = nodes;
            for (i = 0; i < nodeList.length; i++) {
                if (Math.hypot(nodeList[i].center_x - mouse_pos.x, nodeList[i].center_y - mouse_pos.y) < radius) {
                    return nodeList[i];
                }
            }
            return false;
        }

        function onMouseMove(e) {
            var mousePosition = cursorPoint(svg, e);
            var moveX = mousePosition.x;
            var moveY = mousePosition.y;
            if (!dragObject.elem && !groupObject.elem) {
                return;
            } else if (dragObject.elem && dragObject.elem.classList.contains("free-node")) {

                dragObject.elem.querySelector('circle').setAttribute("r", parseFloat(node_radius * graph_scale));
                dragObject.elem.querySelector('text').setAttribute("font-size", font_size * graph_scale + "em");

                if (!dragObject.copy) {
                    dragObject.copy = createCopy(e);
                    svg.append(dragObject.copy);
                }
                moveX = moveX < node_radius ? node_radius : moveX;
                moveX = moveX > SVG_width - node_radius ? SVG_width - node_radius : moveX;
                moveY = moveY < node_radius ? node_radius : moveY;
                moveY = moveY > SVG_height - node_radius ? SVG_height - node_radius : moveY;

                dragObject.elem.querySelector('circle').setAttribute("cx", moveX);
                dragObject.elem.querySelector('circle').setAttribute("cy", moveY);
                dragObject.elem.querySelector('text').setAttribute("x", moveX);
                dragObject.elem.querySelector('text').setAttribute("y", moveY);
                dragObject.elem.querySelectorAll('tspan').forEach(function(element, index) {
                    element.setAttribute("x", moveX);
                });

                dragObject.parentCandidate = findNode(all_graph_nodes, node_radius, {
                    x: dragObject.elem.querySelector('circle').getAttribute('cx'),
                    y: dragObject.elem.querySelector('circle').getAttribute('cy')
                });

                if (dragObject.parentCandidate) {
                    var nodesObjectCopy = JSON.parse(JSON.stringify(nodesObject));
                    if (dragObject.parentCandidate.node_id == main_node_object.node_id) {
                        nodesObjectCopy["graph"].push(dragObject.object);
                        nodesObjectCopy["free_nodes"] = $.grep(nodesObjectCopy["free_nodes"], function(e) {
                            return e.node_id != dragObject.object.node_id;
                        });
                    } else {
                        for (var i = 0; i < nodesObjectCopy["graph"].length; i++) {
                            var check = addNode(dragObject.parentCandidate.node_id, nodesObjectCopy["graph"][i], dragObject.object);
                            if (check) {
                                nodesObjectCopy["graph"][i] = check;
                                nodesObjectCopy["free_nodes"] = $.grep(nodesObjectCopy["free_nodes"], function(e) {
                                    return e.node_id != dragObject.object.node_id;
                                });
                                break;
                            }
                        }
                    }
                    drawMindMap(nodesObjectCopy, dragObject.object.node_id, graph_scale);
                    svg.append(dragObject.elem)
                    svg.querySelectorAll(".graph-node").forEach(function(v, i) {
                        v.classList.remove("parent-candidate");
                    });
                    svg.getElementById(dragObject.parentCandidate.node_id).classList.add("parent-candidate");
                } else {
                    svg.querySelectorAll(".graph-node").forEach(function(v, i) {
                        v.classList.remove("parent-candidate");
                    });
                    nodesObject["free_nodes"].forEach(function(element, index) {
                        if (element.node_id != dragObject.object.node_id) {
                            element.group = "empty_group";
                        }
                    });
                    drawMindMap(nodesObject, false, graph_scale);
                    drawFreeNodes(nodesObject);
                    svg.append(dragObject.elem);
                }
                svg.querySelectorAll('.free-node').forEach(function(v, i) {
                    if (v.id == dragObject.elem.id) {
                        v.classList.add("drop-candidate");
                        dragObject.elem.classList.remove("drop-candidate");
                    }
                });

            } else if (dragObject.elem && dragObject.elem.classList.contains("graph-node")) {
                if (!dragObject.copy) {
                    dragObject.copy = createCopy(e);
                    svg.append(dragObject.copy);
                }
                dragObject.elem.querySelector('circle').setAttribute("r", parseFloat(node_radius * graph_scale));
                dragObject.elem.querySelector('text').setAttribute("font-size", font_size * graph_scale + "em");

                moveX = moveX < node_radius ? node_radius : moveX;
                moveX = moveX > SVG_width - node_radius ? SVG_width - node_radius : moveX;
                moveY = moveY < node_radius ? node_radius : moveY;
                moveY = moveY > SVG_height - node_radius ? SVG_height - node_radius : moveY;

                dragObject.elem.querySelector('circle').setAttribute("cx", moveX);
                dragObject.elem.querySelector('circle').setAttribute("cy", moveY);
                dragObject.elem.querySelector('text').setAttribute("x", moveX);
                dragObject.elem.querySelector('text').setAttribute("y", moveY);
                dragObject.elem.querySelectorAll('tspan').forEach(function(element, index) {
                    element.setAttribute("x", moveX);
                });

                nodesObjectTemp = JSON.parse(JSON.stringify(nodesObject));

                var nodesObjectCopy = removeNode(dragObject.elem.id, nodesObjectTemp);

                nodesObject = JSON.parse(JSON.stringify(nodesObjectCopy));
                setAnswer(nodesObject, graph_scale, center);

                dragObject.copy = createCopy(e);
                drawFreeNodes(nodesObject)

                dragObject.object = nodesObject["free_nodes"].filter(function(element) {
                    return element.node_id === dragObject.elem.id;

                })[0];

                dragObject.elem.classList.remove("graph-node");
                dragObject.elem.classList.add("free-node");

                dragObject.parentCandidate = findNode(all_graph_nodes, node_radius, {
                    x: dragObject.elem.querySelector('circle').getAttribute('cx'),
                    y: dragObject.elem.querySelector('circle').getAttribute('cy')
                });
                return;
            } else if (groupObject.elem && groupObject.elem.classList.contains("group-circle")) {
                if (!groupObject.copy) {
                    groupObject.copy = createGroupCopy(e);
                    svg.append(groupObject.copy);
                }

                moveX = moveX < group_circle_radius ? group_circle_radius : moveX;
                moveX = moveX > SVG_width - group_circle_radius ? SVG_width - group_circle_radius : moveX;
                moveY = moveY < group_circle_radius ? group_circle_radius : moveY;
                moveY = moveY > SVG_height - group_circle_radius ? SVG_height - group_circle_radius : moveY;

                groupObject.elem.querySelector('circle').setAttribute("cx", moveX);
                groupObject.elem.querySelector('circle').setAttribute("cy", moveY);

                groupObject.parentCandidate = findNode(all_graph_nodes, node_radius, {
                    x: groupObject.elem.querySelector('circle').getAttribute('cx'),
                    y: groupObject.elem.querySelector('circle').getAttribute('cy')
                });

                if (groupObject.parentCandidate) {
                    var nodesObjectCopy = JSON.parse(JSON.stringify(nodesObject));
                    nodesObjectCopy = setNodeAttr(groupObject.parentCandidate.node_id, nodesObjectCopy, groupObject.elem.id);
                    drawMindMap(nodesObjectCopy, false, graph_scale);
                } else {
                    drawMindMap(nodesObject, false, graph_scale);
                }
                svg.append(groupObject.elem)
            }
            return false;

        }

        function createCopy(e) {
            var copy = dragObject.elem;
            var old = {
                c_cx: dragObject.elem.querySelector('circle').getAttribute("cx"),
                c_cy: dragObject.elem.querySelector('circle').getAttribute("cy"),
                t_x: dragObject.elem.querySelector('text').getAttribute("x"),
                t_y: dragObject.elem.querySelector('text').getAttribute("y"),
                tl_x: [].push(dragObject.elem.querySelectorAll('tspan').forEach(function(element, index) {
                    return element.getAttribute("x");
                }))
            };
            copy.rollback = function() {
                dragObject.elem.querySelector('circle').setAttribute("cx", old.c_cx);
                dragObject.elem.querySelector('circle').setAttribute("cy", old.c_cy);
                dragObject.elem.querySelector('text').setAttribute("x", old.t_x);
                dragObject.elem.querySelector('text').setAttribute("y", old.t_y);
                dragObject.elem.querySelectorAll('tspan').forEach(function(element, index) {
                    element.setAttribute("x", old.c_cx);
                });
                dragObject.copy.style.display = 'none';
            };
            var cx = copy.querySelector('circle').getAttribute("cx");
            var cy = copy.querySelector('circle').getAttribute("cy");
            return copy;
        }

        function createGroupCopy(e) {
            var copy = groupObject.elem;
            var old = {
                c_cx: groupObject.elem.querySelector('circle').getAttribute("cx"),
                c_cy: groupObject.elem.querySelector('circle').getAttribute("cy"),
            };
            copy.rollback = function() {
                groupObject.elem.querySelector('circle').setAttribute("cx", old.c_cx);
                groupObject.elem.querySelector('circle').setAttribute("cy", old.c_cy);
                groupObject.copy.style.display = 'none';
            };
            return copy;
        }

        function flat(r, a) {
            var b = {};
            Object.keys(a).forEach(function(k) {
                if (k !== 'children') {
                    b[k] = a[k];
                }
            });
            r.push(b);
            if (Array.isArray(a.children)) {
                return a.children.reduce(flat, r);
            }
            return r;
        }

        function addNode(id, currentNode, newNode) {
            var i, currentChild, result;
            if (id == currentNode.node_id) {
                currentNode.children.push(newNode);
                return currentNode;
            } else {
                try {
                    var c = currentNode.children.length;
                } catch (e) {
                    currentNode.children = [];
                }
                for (i = 0; i < currentNode.children.length; i += 1) {
                    currentChild = currentNode.children[i];
                    result = addNode(id, currentChild, newNode);
                    if (result !== false) {
                        return currentNode;
                    }
                }
                return false;
            }
        }

        function setNodeAttr(id, nodesObjectCopy, newGroup) {
            var check = false;
            var objForSearch = nodesObjectCopy["main_node"];
            objForSearch.children = nodesObjectCopy["graph"];
            var changedNode = false;

            function findObjectById(root, id, newGroup) {
                if (root.node_id == id) {
                    root.group = newGroup;
                    return;
                } else {
                    for (var k = 0; k < root.children.length; k++) {
                        if (root.children[k].node_id == id) {
                            changedNode = root.children[k];
                            root.children[k].group = newGroup;
                            return;
                        } else if (root.children[k].children) {
                            findObjectById(root.children[k], id, newGroup);
                        }
                    }
                }
            };
            findObjectById(objForSearch, id, newGroup);
            nodesObjectCopy["graph"] = objForSearch.children;
            objForSearch.children = [];
            nodesObjectCopy["main_node"] = objForSearch;

            return nodesObjectCopy;
        }

        function removeNode(id, nodesObjectCopy) {
            var check = false;
            var objForSearch = nodesObjectCopy["main_node"];
            objForSearch.children = nodesObjectCopy["graph"];
            var removedNode = false;

            function findObjectById(root, id) {
                for (var k = 0; k < root.children.length; k++) {
                    if (root.children[k].node_id == id) {
                        removedNode = root.children[k];
                        delete root.children[k];
                        root.children = root.children.filter(function(n) {
                            return (n != undefined && n != null)
                        });
                        return;
                    } else if (root.children[k].children) {
                        findObjectById(root.children[k], id);
                    }
                }
            };
            findObjectById(objForSearch, id);
            if (removedNode) {
                nodesObjectCopy["graph"] = objForSearch.children;
                nodesObjectCopy["free_nodes"] = nodesObjectCopy["free_nodes"].concat(([removedNode].reduce(flat, [])))
            }
            return nodesObjectCopy;
        }

        setFreeNodesScroll();

        function setFreeNodesScroll() {
            var nodes = svg.querySelectorAll(".free-node");
            var scroll_zone = svg.getElementsByClassName("free_nodes_zone")[0];
            if (scroll_zone.addEventListener) {
                scroll_zone.addEventListener("mousewheel", ScrollFreeNodesHandler, false);
                scroll_zone.addEventListener("DOMMouseScroll", ScrollFreeNodesHandler, false);
            }
            var nodes = svg.querySelectorAll(".free-node");
            nodes.forEach(function(v, i) {
                if (v.addEventListener) {
                    v.addEventListener("mousewheel", ScrollFreeNodesHandler, false);
                    v.addEventListener("DOMMouseScroll", ScrollFreeNodesHandler, false);
                }
            });

            function ScrollFreeNodesHandler(e) {
                e = e || window.event;
                var delta = e.deltaY || e.detail || e.wheelDelta;
                if (nodes.length == 0) return;
                var first_node_x = Math.round(nodes[0].querySelector('circle').getAttribute("cx"));
                var last_node_x = Math.round(nodes[nodes.length - 1].querySelector('circle').getAttribute("cx"));
                var first_limitation = Math.round((0 * node_radius * 2.2) + node_radius + 10);
                var last_limitation = Math.round(SVG_width - first_limitation);
                var offset = 20;
                offset = delta > 0 ? offset * (-1) : offset;
                if (offset > 0 && first_node_x >= first_limitation) return;
                if (offset < 0 && last_node_x <= last_limitation) return;
                nodes.forEach(function(v, i) {
                    var cx = parseInt(v.querySelector('circle').getAttribute("cx"));
                    cx = cx + offset;
                    v.querySelector('circle').setAttribute("cx", (cx));
                    v.querySelector('text').setAttribute("x", (cx));
                    v.querySelector('text').querySelectorAll('tspan').forEach(function(text_node, i) {
                        text_node.setAttribute("x", (cx));
                    });
                });
            }
        }


        setGraphNodesScroll(graph_scale);

        function setGraphNodesScroll(delta) {
            var nodes = svg.querySelectorAll(".graph-node");
            var scroll_zone = svg.getElementsByClassName("graph_space")[0];
            if (scroll_zone.addEventListener) {
                scroll_zone.addEventListener("mousewheel", ScrollFreeNodesHandler, false);
                scroll_zone.addEventListener("DOMMouseScroll", ScrollFreeNodesHandler, false);
            }
            var nodes = svg.querySelectorAll(".graph-node");
            nodes.forEach(function(v, i) {
                if (v.addEventListener) {
                    v.addEventListener("mousewheel", ScrollFreeNodesHandler, false);
                    v.addEventListener("DOMMouseScroll", ScrollFreeNodesHandler, false);
                }
            });

            ScrollFreeNodesHandler({});

            function ScrollFreeNodesHandler(e) {
                e = e || window.event;
                var scroll_delta = e.deltaY || e.detail || e.wheelDelta;
                if (e.deltaY && e) {
                    graph_scale = Math.round((graph_scale + scroll_delta * 0.0005) * 100) / 100;
                    if (graph_scale < min_scale) graph_scale = min_scale;
                    if (graph_scale > max_scale) graph_scale = max_scale;
                }
                drawMindMap(nodesObject, null, graph_scale);
            }
        }

        var css = "g.free-node, g.graph-node{ cursor: pointer; }";
        css += ".node text{-moz-user-select: none;user-select: none;font-family: 'Open Sans';fill: black;text-anchor: middle;dy: 0;}";
        css += ".node circle {stroke: black;stroke-width: .3px;}";
        css += ".node.drop-candidate{opacity: 0.4;}";
        css += "g.parent-candidate circle{stroke: aquamarine;stroke-width: 3px;}";
        css += "g.temp-node circle{stroke: black !important;stroke-dasharray: 5 !important;}";
        css += "line.edge{stroke: black;}";
        css += "line.temp-edge{ stroke: black !important;stroke-dasharray: 5;}";
        css += "text.group-label{-moz-user-select: none;user-select: none;font-family: 'Open Sans';fill: black;font-size: 0.9em;}";
        css += "g.group-circle {cursor: pointer;}";
        css += ".graph_space{cursor: move; stroke: #c1c1c1; stroke-width: 3px;}";
        css += ".groups_space{fill-opacity: .3;}"
        css += ".free_nodes_zone{fill-opacity: .75;}"
        css += ".svg_object { width: " + SVG_width + "px; height: " + SVG_height + "px;}";

        Object.keys(nodesGroups).forEach(function(v, i) {
            css += "#" + element.id + " g[group='" + v + "'] circle{fill:" + nodesGroups[v]["color"] + " !important;}";
        })

        var style = document.createElement("style")
        style.id = "mind_map";
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        if (!document.querySelector("style#mind_map")) document.querySelector("head").appendChild(style);

        return svg;
    }

}

mind_mapActivation(".mind_map");
if ( sumObjects==undefined ) var sumObjects = {};

function sumActivation(selector){
    Array.prototype.filter.call(document.querySelectorAll(selector),function(element){return element.dataset.status==undefined}).forEach(function(element, i ,array){
        sumObjects[element.id] = (new sumObject(element, element.getAttribute("points_count"), element.getAttribute("xblocks_count"), element.getAttribute("yblocks_count")));
        element.dataset.status = "activate";
    });
    setTimeout(function(){sumActivation(selector)}, 1000);
}

// Конструктор работы с полем ответа
function Answer(elementField){
    this.elementField = elementField;
    this.fieldValue = "";
    this.fieldObject = {};
    this.get = function(){
        this.fieldValue = elementField.value;
        return this.fieldValue;
    };
    this.set = function(value){
        if(value == undefined) value = this.fieldValue;
        elementField.value = value;
    };
    this.getJSON = function(){
        if (this.isJsonString(this.get())) this.fieldObject = JSON.parse(this.get());
        return this.fieldObject;
    };
    this.setJSON = function(object){
        if(object == undefined) object = this.fieldObject;
         this.set(JSON.stringify(object))
    };
    /* Утилиты */
    /* Проверка строки на возможность преобразования в JSON */
    this.isJsonString = function(str) {
        try {JSON.parse(str);}
        catch (e) {return false;}
        return true;
    };
};

function genID(value) {
    var value = value || "id"
    return value +"_" + Math.random().toString(16).substr(2, 8).toUpperCase();
};


function Buffer(objectAnswer){
    this.coordinates = [];

    this.get = function(value, arrow_id){
        this.coordinates.push(value);
        if(this.complete()){
            if(arrow_id) { objectAnswer[arrow_id] = this.coordinates; }
            else { objectAnswer[genID()] = this.coordinates; }
            this.coordinates = [];
        }
    }
    
    this.complete = function(){
        return this.coordinates.length == 2 ? true : false;
    }

    this.stop = function(){
        this.coordinates = [];
    }

    this.getObject = function(){
        return objectAnswer;
    }
    this.setObject = function(object){
        objectAnswer = object;
    }

    this.getStartCoords = function(){
        return this.coordinates[0] || undefined;
    }

    this.getEndCoords = function(){
        return this.coordinates[1] || undefined;
    }
}


function sumObject(element, points_count, xblocks_count, yblocks_count){
    this.element = element;
    //селектор добавить
    this.answer = new Answer(element.querySelector("#answerInput_"+element.id).querySelector("input[type='text']"));

    this.buffer = new Buffer(this.answer.fieldObject);

    this.dataAnswer = {
        formula: null,
        numbers: [],
        graphic: null
    }

    function toggle(element){
        return function(value){
            if (value != undefined) {
                element.style.display = value;
            }
            else {
                element.style.display == "block" ? element.style.display = "none" : element.style.display = "block";
            }
        }
    }
    
    function transformAndRotate(element){
        return function (cx, cy, a){
            element.setAttribute("transform", "translate("+cx+","+cy+") rotate("+a+")");
        }
    }

    this.svg_element = createSVGObject.bind(this)(points_count, xblocks_count, yblocks_count)
    element.querySelector(".svg_object").appendChild(this.svg_element);



    // if (this.answer.get()){
    //     this.dataAnswer = this.answer.getJSON().answer;
    // }

    function createElementSVG(name, id, classList, attributes){
        var NS ="http://www.w3.org/2000/svg";
        var element = document.createElementNS(NS, name);
        if (id) element.id =id;

        if (classList) element.classList.add(classList);
        if (attributes){
            for (attribute in attributes){
                element.setAttribute(attribute, attributes[attribute])
            }
        }
        return element;
    };

    function createTextSVG(x, y, text, attributes){
        var NS ="http://www.w3.org/2000/svg";
        var textObject = document.createElementNS(NS,"text");
        var textObject = createElementSVG("text", null, null, {x: x, y: y});
        if (attributes){
            for (attribute in attributes){
                textObject.setAttribute(attribute, attributes[attribute])
            }
        }
        var textNode = document.createTextNode(text);
        textObject.appendChild(textNode);
        return textObject;
    }

    function cursorPoint(SVGObject, event){
        var pt = SVGObject.createSVGPoint()
        pt.x = event.clientX;
        pt.y = event.clientY;
        return pt.matrixTransform(SVGObject.getScreenCTM().inverse());
    }

    function createArrow(x1, y1, x2, y2, arrow_id){
        if(arrow_id) {
            var arrowId = arrow_id.replace("arrow_", "");
        }
        else{
            var arrowId = genID();
        }
        
        var arrowGroup = createElementSVG('g', "arrow_" + arrowId, "arrowGroup"); 
        var arrowLine = createElementSVG('line', "arrowLine" + arrowId, "arrow-line", {stroke: "black", "stroke-width": "3",  "marker-end": "url(#"+'arrowMarker_' + arrowId + ")", x1: x1, y1: y1, x2: x2, y2: y2});
        
        arrowGroup.append(arrowLine);
        
        var arrowMarker = createElementSVG('marker', 'arrowMarker_' + arrowId, null, {"markerWidth": "10", "markerHeight": "10", "refX": "3", "refY": "3", "orient": "auto", "markerUnits": "strokeWidth"});
        arrowMarker.innerHTML = '<path d="M0,0 L0,6 L6,3 z" fill="black" />';
        arrowGroup.append(arrowMarker);

        return arrowGroup;
    }

    function createSVGObject(points_count, xblocks_count, yblocks_count){
        var pointsCount = parseInt(points_count);
        var xBlocksCount = parseInt(xblocks_count);
        var yBlocksCount = parseInt(yblocks_count);

        // svg object sizes
        var svg_width = 800;
        var svg_height = pointsCount * 50;

        var pointsMargins = 100;
        var pointsRadius = 9;
        var blockMargins = 70;
        var blockWidth = 80;
        var blockPointsRadius = 9;
        
        var svg = createElementSVG('svg', genID("svgObject"), null, {viewbox: '0 0 ' + svg_width + ' ' + svg_height, width: svg_width, height: svg_height });

        // var centerLine = createElementSVG('line', genID("centerLine"), null, {x1: svg_width/2, y1: 0, x2: svg_width/2, y2: svg_height, stroke: "black", "stroke-width": "3"})
        // svg.append(centerLine);

        var arrowMarkerId = genID("marker");
        var arrowGroup = createElementSVG('g', genID("arrowGroup"), "arrowGroup");
        var arrowLine = createElementSVG('line', genID("arrowLine"), "arrow-line", {stroke: "black", "stroke-width": "3",  "marker-end": "url(#" + arrowMarkerId + ")" });
        
        arrowGroup.append(arrowLine);
        
        var arrowMarker = createElementSVG('marker', arrowMarkerId, null, {"markerWidth": "10", "markerHeight": "10", "refX": "3", "refY": "3", "orient": "auto", "markerUnits": "strokeWidth"});
        arrowMarker.innerHTML = '<path d="M0,0 L0,6 L6,3 z" fill="black" />';
        arrowMarker.querySelector("path").style.display = "none";
        arrowGroup.append(arrowMarker);

        var pointsList = createElementSVG('g', genID("points_group"), null);


        var inputAnswers = Array.apply(null, {length: pointsCount}).map(String.prototype.valueOf,"");
        var answer = this.answer.getJSON();
        answer["inputs"] = inputAnswers;
        this.buffer.setObject(answer);


        var pointsArrays = Array.apply(null, {length: pointsCount}).map(Number.call, Number);

        pointsArrays.forEach(function(item, i, arr) {
            pointsArrays[i] = [];
        });

        var startColumn = 0;        
        var usedPoints = [];
        var startPoint;

        var rect_height = (svg_height/(pointsCount+1)) * (pointsCount/xBlocksCount-1) + (svg_height/(pointsCount+1))/2;
        var arr = Array.apply(null, {length: xBlocksCount}).map(Number.call, Number);
        var groupXBlocks = createElementSVG('g', null, null, null);
        arr.forEach(function(item, i, arr) {
            x = svg_width/2 - blockWidth - blockMargins;
            y = (svg_height/(pointsCount+1)) + ((pointsCount/xBlocksCount*i)*(svg_height/(pointsCount+1)))-(svg_height/(pointsCount+1))/4;

            var rect = createElementSVG('rect', genID("rect"), "x-rect", {x: x, y: y, height: rect_height, width: blockWidth, fill: "#bdbdbd"});
            groupXBlocks.append(rect);

            groupXBlocks.append(createTextSVG(x + blockWidth/2 - 25, y + rect_height/2 + 8, ("ДПФ "+Math.floor(pointsCount/xBlocksCount)), null));

            var BlockpointsCount = pointsCount/xBlocksCount;
            var arrPoints = Array.apply(null, {length: BlockpointsCount}).map(Number.call, Number);
            arrPoints.forEach(function(item, j, arr) {
                var x = Math.floor(svg_width/2 - blockWidth - blockMargins);
                var y = Math.floor((svg_height/(pointsCount+1)) + ((BlockpointsCount*(i)+j))*(svg_height/(pointsCount+1)));
                
                var point = createElementSVG('circle', genID("point"), "end-point", {cx: x, cy: y, r: blockPointsRadius, fill: "#04d804", stroke: "#12a212", "stroke-width": 2});
                pointsList.append(point);

                var inputDiv = document.createElement("div");
                inputDiv.className = "input-container";

                element.querySelector(".inputs-list").appendChild(inputDiv);

                pointsArrays[1].push(point);

                var x = Math.floor(svg_width/2 - blockWidth - blockMargins + blockWidth);
                var point = createElementSVG('circle', genID("point"), "start-point", {cx: x, cy: y, r: blockPointsRadius, fill: "#90c9ff", stroke: "#be86ff", "stroke-width": 2});
                pointsList.append(point);

                pointsArrays[2].push(point);


            });
        });

        var groupYBlocks = createElementSVG('g', null, null, null); 
        var rect_height = (svg_height/(pointsCount+1)) * (pointsCount/yBlocksCount-1) + (svg_height/(pointsCount+1))/2;
        var arr = Array.apply(null, {length: yBlocksCount}).map(Number.call, Number);

        arr.forEach(function(item, i, arr) {
            x = svg_width/2 + blockMargins;
            y = (svg_height/(pointsCount+1)) + ((pointsCount/yBlocksCount*i)*(svg_height/(pointsCount+1)))-(svg_height/(pointsCount+1))/4;

            var rect = createElementSVG('rect', genID("rect"), "y-rect", {x: x, y: y, height: rect_height, width: blockWidth, fill: "#bdbdbd"});
            groupYBlocks.append(rect);

            groupYBlocks.append(createTextSVG(x + blockWidth/2 - 25, y + rect_height/2 + 8, ("ДПФ "+Math.floor(pointsCount/yBlocksCount)), null));


            var BlockpointsCount = pointsCount/yBlocksCount;
            var arrPoints = Array.apply(null, {length: BlockpointsCount}).map(Number.call, Number);
            arrPoints.forEach(function(item, j, arr) {
                var x = Math.floor(svg_width/2 + blockMargins);
                var y = Math.floor((svg_height/(pointsCount+1)) + ((BlockpointsCount*(i)+j))*(svg_height/(pointsCount+1)));

                var point = createElementSVG('circle', genID("point"), "end-point", {cx: x, cy: y, r: blockPointsRadius, fill: "#04d804", stroke: "#12a212", "stroke-width": 2});
                pointsList.append(point);

            pointsArrays[3].push(point);

                var x = Math.floor(svg_width/2 + blockMargins + blockWidth);
                var point = createElementSVG('circle', genID("point"), "start-point", {cx: x, cy: y, r: blockPointsRadius, fill: "#90c9ff", stroke: "#be86ff", "stroke-width": 2});
                pointsList.append(point);

            pointsArrays[4].push(point);

            });     
        });

        var arr = Array.apply(null, {length: pointsCount}).map(Number.call, Number);
        arr.forEach(function(item, i, arr){
            var group = createElementSVG('g', null, null, null);
            var x = Math.floor(pointsMargins);
            var y = Math.floor((i+1)*(svg_height/(pointsCount+1)));
            var point = createElementSVG('circle', genID("point"), "start-point", {cx: x, cy: y, r: pointsRadius, fill: "#90c9ff", stroke: "#be86ff", "stroke-width": 2});
            pointsList.append(point);

            pointsArrays[0].push(point);

            var signText = createTextSVG(pointsMargins-pointsRadius-30, (i+1)*(svg_height/(pointsCount+1))+5, "x" + i, null);
            group.append(signText);
            svg.append(group);
        });

        arr.forEach(function(item, i, arr){
            var group = createElementSVG('g', null, null, null);
            var x = Math.floor(svg_width-pointsMargins);
            var y = Math.floor((i+1)*(svg_height/(pointsCount+1)));
            var point = createElementSVG('circle', genID("point"), "end-point", {cx: x, cy: y, r: pointsRadius, fill: "#04d804", stroke: "#12a212", "stroke-width": 2});
            pointsList.append(point);

            pointsArrays[5].push(point);

            var signText = createTextSVG(svg_width-pointsMargins+pointsRadius+3, (i+1)*(svg_height/(pointsCount+1))+5, "y" + i, null);
            group.append(signText);
            svg.append(group);
        });

        forEach = Array.prototype.forEach;
        pointsArrays.forEach(function(array, i, arr){
            array.forEach(function(item, j, arr){
                item.addEventListener("click", function(event){
                    var targetX = event.target.getAttribute('cx');
                    var targetY = event.target.getAttribute('cy');
                    
                    if(event.target.classList.contains("start-point") && !this.buffer.getStartCoords() && !usedPoints.includes(event.target)){

                            startColumn = parseInt(i);

                            this.buffer.get([j, i], null);
                            this.answer.setJSON();

                            arrowLine.setAttribute('x1', targetX);
                            arrowLine.setAttribute('y1', targetY);
                            arrowLine.setAttribute('x2', targetX);
                            arrowLine.setAttribute('y2', targetY);

                            pointsArrays[startColumn+1].forEach(function(array, i, arr){
                                if(!usedPoints.includes(pointsArrays[startColumn+1][i])){
                                    pointsArrays[startColumn+1][i].setAttribute("stroke-width","4");
                                    pointsArrays[startColumn+1][i].setAttribute("stroke", "#ff8b19");
                                }
                            });

                            startPoint = event.target;
                    }

                    else if(this.buffer.getStartCoords() && event.target.classList.contains("end-point") && pointsArrays[startColumn+1].includes(event.target) && !usedPoints.includes(event.target)){
                        var mousePosition = cursorPoint(svg, event);

                        var startX = startPoint.getAttribute('cx');
                        var startY = startPoint.getAttribute('cy');
                        
                        var r = Math.floor(Math.sqrt((targetY-startY)*(targetY-startY)+(targetX-startX)*(targetX-startX)));
                        var k = (r-pointsRadius-10) / r;
                        var currentX = Math.floor(startX) + (targetX-startX) * k;
                        var currentY = Math.floor(startY) + (targetY-startY) * k;
                        
                        arrowLine.setAttribute('x2', currentX);
                        arrowLine.setAttribute('y2', currentY);
                        arrowLine.style.display = "none";

                        var newArrow = createArrow(startX, startY, currentX, currentY, null);

                        usedPoints.push(event.target);
                        usedPoints.push(startPoint);

                        if(startColumn == 2){
                            
                            var input_index = pointsArrays[startColumn].indexOf(startPoint);
                            var inputBlock = document.createElement("div");
                            var label = document.createElement("label");
                            var input = document.createElement("input");
                            
                            label.innerHTML = "(" + input_index + ") : k = " + input_index; //'\(e^{-j \frac{2 \pi}{N}} \)' ;
                            input.type = "text";
                            input.className = "arrow-input";

                            inputBlock.id = "arrow_input" +  newArrow.querySelector("line").getAttribute("id");
                            inputBlock.appendChild(label);
                            inputBlock.appendChild(input);
                            
       //                      var formula = element.querySelector("#task_input_formula");
       //                   var formulaClone = formula.cloneNode(true);
       //                   formulaClone.style.display = "block";
                            // formulaClone.id = "formula_input" +  newArrow.querySelector("line").getAttribute("id");
       //                      element.querySelector(".inputs-list").querySelectorAll(".input-container")[input_index].appendChild(formulaClone);

                            element.querySelector(".inputs-list").querySelectorAll(".input-container")[input_index].appendChild(inputBlock);

                            // input.focus();
                            var new_k = (pointsRadius+15) / r;
                            var new_currentX = Math.floor(startX) + (targetX-startX) * new_k;
                            var new_currentY = Math.floor(startY) + (targetY-startY) * new_k;
                            

                            var arrowLabelCircle = createElementSVG('circle', null, null, {cx: new_currentX, cy: new_currentY, r: 8, fill: "black", stroke: "black", "stroke-width": 1});
                            var arrowLabel = createTextSVG(parseInt(arrowLabelCircle.getAttribute("cx"))-  4, 6 + parseInt(arrowLabelCircle.getAttribute("cy")), input_index, {"fill":"white","font-size":"15", "font-weight":"bold"});
                            
                            if(input_index>9){
                                arrowLabelCircle.setAttribute("r", "10")
                                arrowLabel.setAttribute("x",parseInt(arrowLabelCircle.getAttribute("cx"))-9)
                            }

                            newArrow.append(arrowLabelCircle);
                            newArrow.append(arrowLabel);
                        } 

                    pointsArrays[startColumn+1].forEach(function(array, i, arr){
                                if(pointsArrays[startColumn+1][i].classList.contains("start-point")){
                                    pointsArrays[startColumn+1][i].setAttribute("stroke-width","2");
                                    pointsArrays[startColumn+1][i].setAttribute("stroke", "#be86ff");
                                }
                                
                                if(pointsArrays[startColumn+1][i].classList.contains("end-point")){
                                    pointsArrays[startColumn+1][i].setAttribute("stroke-width","2");
                                    pointsArrays[startColumn+1][i].setAttribute("stroke", "#12a212");
                                }
                        });


                        svg.append(newArrow, pointsList);

                        this.buffer.get([j, i], newArrow.getAttribute("id"));
                        this.answer.setJSON();
                    }

                }.bind(this));
            }.bind(this));
        }.bind(this));
        
        svg.addEventListener("mousemove", function(event){
           if(this.buffer.getStartCoords() && !this.buffer.complete()){
                arrowLine.style.display = "block";
                arrowMarker.querySelector("path").style.display = "block";
                var mousePosition = cursorPoint(svg, event);

                var startX = startPoint.getAttribute('cx');
                var startY = startPoint.getAttribute('cy');

                var endX = event.target.getAttribute('cx');
                var endY = event.target.getAttribute('cy');

                if(event.target.classList.contains("end-point") && pointsArrays[startColumn+1].includes(event.target) && !usedPoints.includes(event.target)){
                    var r = Math.floor(Math.sqrt((endY-startY)*(endY-startY)+(endX-startX)*(endX-startX)));
                    var k = (r-pointsRadius-10) / r;
                    var currentX = Math.floor(startX) + (endX-startX) * k;
                    var currentY = Math.floor(startY) + (endY-startY) * k;
                    
                    arrowLine.setAttribute('x2', currentX);
                    arrowLine.setAttribute('y2', currentY);

                    event.target.setAttribute("stroke","gold");
                    event.target.setAttribute("stroke-width","4");
                }
                else{
                    var r = Math.floor(Math.sqrt((mousePosition.y-startY)*(mousePosition.y-startY)+(mousePosition.x-startX)*(mousePosition.x-startX)));
                    r = r>30?r:50;

                    var k = (r-8) /  r;
                    var currentX = Math.floor(startX) + (mousePosition.x-startX) * k;
                    var currentY = Math.floor(startY) + (mousePosition.y-startY) * k;
                    
                    arrowLine.setAttribute('x2', currentX);
                    arrowLine.setAttribute('y2', currentY);
                }
  
           }
           else if(event.target.classList.contains("start-point") && !usedPoints.includes(event.target)){
                event.target.setAttribute("stroke","gold");
                event.target.setAttribute("stroke-width","4");
           }
           else if(event.target.classList.contains("arrow-line") && !this.buffer.getStartCoords()){
                event.target.parentNode.querySelector("path").setAttribute("fill","red");
                event.target.setAttribute("stroke","red");
           }

        }.bind(this));

        svg.addEventListener("click", function(event){

                if(!event.target.classList.contains("end-point") && !event.target.classList.contains("start-point") && !event.target.classList.contains("arrow-line")){
                    arrowLine.style.display = "none";
                    this.buffer.stop();

                    pointsArrays[startColumn+1].forEach(function(array, i, arr){
                                if(pointsArrays[startColumn+1][i].classList.contains("start-point")){
                                    pointsArrays[startColumn+1][i].setAttribute("stroke-width","2");
                                    pointsArrays[startColumn+1][i].setAttribute("stroke", "#be86ff");
                                }
                                
                                if(pointsArrays[startColumn+1][i].classList.contains("end-point")){
                                    pointsArrays[startColumn+1][i].setAttribute("stroke-width","2");
                                    pointsArrays[startColumn+1][i].setAttribute("stroke", "#12a212");
                                }
                        });

                }
                if (event.target.classList.contains("arrow-line") && !this.buffer.getStartCoords()){
                    var removedArrow = this.buffer.getObject()[event.target.parentNode.getAttribute('id')];
                    for (var i=0; i < usedPoints.length; i++){
                        if(usedPoints[i] == pointsArrays[removedArrow[0][1]][removedArrow[0][0]]){
                            usedPoints.splice(i, 1);
                            break;
                        }
                    }

                    for (var i=0; i < usedPoints.length; i++){
                        if(usedPoints[i] == pointsArrays[removedArrow[1][1]][removedArrow[1][0]]){
                            usedPoints.splice(i, 1);
                            break;
                        }
                    }

                    var answer = this.buffer.getObject();
                    delete answer[event.target.parentNode.getAttribute('id')];
                    this.buffer.setObject(answer);
                    this.answer.setJSON(answer);
                    event.target.parentNode.remove();
                    if (element.querySelector("#arrow_input" +  event.target.getAttribute("id"))) {
                        element.querySelector("#arrow_input" +  event.target.getAttribute("id")).remove();
                        // element.querySelector("#formula_input" +  event.target.getAttribute("id")).remove();
                    }

                    element.querySelector(".inputs-list").querySelectorAll(".input-container").forEach(function(item, i, arr){
                        if(item.querySelector("input")){
                            inputAnswers[i] = item.querySelector("input").value;
                        }
                        else{
                            inputAnswers[i] = "";
                        }
                    });

                    var answer = this.answer.getJSON();
                    answer["inputs"] = inputAnswers;
                    this.buffer.setObject(answer);
                    this.answer.setJSON(answer);
                }

        }.bind(this));



        svg.addEventListener("mouseout", function(event){
                        if(event.target.classList.contains("start-point")){
                            event.target.setAttribute("stroke-width","2");
                            event.target.setAttribute("stroke", "#be86ff");
                        }
                        
                        if(event.target.classList.contains("end-point")){
                            event.target.setAttribute("stroke-width","2");
                            event.target.setAttribute("stroke", "#12a212");
                        }

                        if(event.target.classList.contains("arrow-line")){
                            event.target.parentNode.querySelector("path").setAttribute("fill","black");
                            event.target.setAttribute("stroke","black");
                        }

                        if(this.buffer.getStartCoords() && !this.buffer.complete()){
                            pointsArrays[startColumn+1].forEach(function(array, i, arr){
                                    if(!usedPoints.includes(pointsArrays[startColumn+1][i])){
                                        pointsArrays[startColumn+1][i].setAttribute("stroke-width","4");
                                        pointsArrays[startColumn+1][i].setAttribute("stroke", "#ff8b19");
                                    }
                                });
                        }
        }.bind(this));



        svg.append(groupXBlocks);
        svg.append(groupYBlocks);
        svg.append(pointsList);

        element.querySelector(".inputs-list").querySelectorAll(".input-container").forEach(function(item, i, arr){
            item.addEventListener("change", function(event){
                inputAnswers[i] = event.target.value;
                var answer = this.answer.getJSON();
                answer["inputs"] = inputAnswers;
                this.buffer.setObject(answer);
                this.answer.setJSON(answer);
            }.bind(this));
        }.bind(this));


        if(this.answer.get()){
            var answer = this.answer.getJSON();
            inputAnswers = answer["inputs"];
            this.answer.setJSON(answer);
            this.buffer.setObject(answer);
            Object.keys(answer).forEach(function(key,index) {

                if(key != "inputs"){
                    var startX = pointsArrays[answer[key][0][1]][answer[key][0][0]].getAttribute('cx');
                    var startY = pointsArrays[answer[key][0][1]][answer[key][0][0]].getAttribute('cy');
                    usedPoints.push(pointsArrays[answer[key][0][1]][answer[key][0][0]]);
                    var targetX = pointsArrays[answer[key][1][1]][answer[key][1][0]].getAttribute('cx');
                    var targetY = pointsArrays[answer[key][1][1]][answer[key][1][0]].getAttribute('cy');
                    usedPoints.push(pointsArrays[answer[key][1][1]][answer[key][1][0]]);
                    var r = Math.floor(Math.sqrt((targetY-startY)*(targetY-startY)+(targetX-startX)*(targetX-startX)));
                    var k = (r-pointsRadius-10) / r;
                    var currentX = Math.floor(startX) + (targetX-startX) * k;
                    var currentY = Math.floor(startY) + (targetY-startY) * k;
                    var newArrow = createArrow(startX, startY, currentX, currentY, key);
                    if(answer[key][0][1] == 2){
                            var input_index = pointsArrays[answer[key][0][1]].indexOf(pointsArrays[answer[key][0][1]][answer[key][0][0]]);
                            var inputBlock = document.createElement("div");
                            var label = document.createElement("label");
                            var input = document.createElement("input");
                            label.innerHTML = "(" + input_index + ") : k = " + input_index; 
                            input.type = "text";
                            input.value = answer["inputs"][input_index];
                            input.className = "arrow-input";
                            inputBlock.id = "arrow_input" +  newArrow.querySelector("line").getAttribute("id");
                            inputBlock.appendChild(label);
                            inputBlock.appendChild(input);
                            //  var formula = element.querySelector("#task_input_formula");
                            //  var formulaClone = formula.cloneNode(true);
                            //  formulaClone.style.display = "block";
                            //  formulaClone.id = "formula_input" +  newArrow.querySelector("line").getAttribute("id");
                            //  element.querySelector(".inputs-list").querySelectorAll(".input-container")[input_index].appendChild(formulaClone);

                            element.querySelector(".inputs-list").querySelectorAll(".input-container")[input_index].appendChild(inputBlock);
                            var new_k = (pointsRadius+15) / r;
                            var new_currentX = Math.floor(startX) + (targetX-startX) * new_k;
                            var new_currentY = Math.floor(startY) + (targetY-startY) * new_k;
                            var arrowLabelCircle = createElementSVG('circle', null, null, {cx: new_currentX, cy: new_currentY, r: 8, fill: "black", stroke: "black", "stroke-width": 1});
                            var arrowLabel = createTextSVG(parseInt(arrowLabelCircle.getAttribute("cx"))-  4, 6 + parseInt(arrowLabelCircle.getAttribute("cy")), input_index, {"fill":"white","font-size":"15", "font-weight":"bold"});
                            if(input_index>9){
                                arrowLabelCircle.setAttribute("r", "10")
                                arrowLabel.setAttribute("x",parseInt(arrowLabelCircle.getAttribute("cx"))-9)
                            }
                            newArrow.append(arrowLabelCircle);
                            newArrow.append(arrowLabel);
                    } 
                    
                    svg.append(newArrow, pointsList);

                }
                });
        }

        svg.insertBefore(arrowGroup, pointsList);

        return svg;

    };
}

sumActivation(".sum_task");
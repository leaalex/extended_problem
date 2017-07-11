if ( sumObjects==undefined ) var sumObjects = {};

function sumActivation(selector){
    Array.prototype.filter.call(document.querySelectorAll(selector),function(element){return element.dataset.status==undefined}).forEach(function(element, i ,array){
        sumObjects[element.id] = (new sumObject(element));
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

    this.get = function(value){
        this.coordinates.push(value);
        console.log(this.coordinates);
        if(this.complete()){
            objectAnswer[genID()] = this.coordinates;
            this.coordinates = [];
            console.log(objectAnswer);
        }
    }
    
    this.complete = function(){
        return this.coordinates.length == 2 ? true : false;
    }

    this.stop = function(){
        this.coordinates = [];
    }

    this.getStartCoords = function(){
        return this.coordinates[0] || undefined;
    }

    this.getEndCoords = function(){
        return this.coordinates[1] || undefined;
    }
}


function sumObject(element){
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

    this.svg_element = createSVGObject.bind(this)(6, 3, 2)
    element.querySelector(".svg_object").appendChild(this.svg_element);



    if (this.answer.get()){
        this.dataAnswer = this.answer.getJSON().answer;
    }

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

    function createTextSVG(x, y, text){
        var NS ="http://www.w3.org/2000/svg";
        var textObject = document.createElementNS(NS,"text");
        var textObject = createElementSVG("text", null, null, {x: x, y: y});
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

    function createSVGObject(points_count, xblocks_count, yblocks_count){
        var pointsCount = points_count;
        var xBlocksCount = xblocks_count;
        var yBlocksCount = yblocks_count;

        // svg object sizes
        var svg_width = 800;
        var svg_height = 400;

        var pointsMargins = 100;
        var pointsRadius = 8;
        var blockMargins = 70;
        var blockWidth = 60;
        var blockPointsRadius = 8;
        
        var svg = createElementSVG('svg', genID("svgObject"), null, {viewbox: '0 0 ' + svg_width + ' ' + svg_height, width: svg_width, height: svg_height });

        // var centerLine = createElementSVG('line', genID("centerLine"), null, {x1: svg_width/2, y1: 0, x2: svg_width/2, y2: svg_height, stroke: "black", "stroke-width": "3"})
        // svg.append(centerLine);

        var arrowMarkerId = genID("marker");
        var arrowGroup = createElementSVG('g', genID("arrowGroup"), "arrowGroup");
        var arrowLine = createElementSVG('line', genID("arrowLine"), "arrow-line", {stroke: "black", "stroke-width": "3",  "marker-end": "url(#"+arrowMarkerId+")" });
        
        arrowGroup.append(arrowLine);
        
        var arrowMarker = createElementSVG('marker', arrowMarkerId, null, {"markerWidth": "10", "markerHeight": "10", "refX": "3", "refY": "3", "orient": "auto", "markerUnits": "strokeWidth"});
        arrowMarker.innerHTML = '<path d="M0,0 L0,6 L9,3 z" fill="black" />';
        arrowMarker.querySelector("path").style.display = "none";
        arrowGroup.append(arrowMarker);

        var pointsList = createElementSVG('g', genID("points_group"), null);




        var pointsArrays = Array.apply(null, {length: 6}).map(Number.call, Number);
        pointsArrays.forEach(function(item, i, arr) {
            pointsArrays[i] = [];
        });

        var startColumn = 0;


        svg.addEventListener("mousemove", function(event){

           if(this.buffer.getStartCoords() && !this.buffer.complete()){
                arrowLine.style.display = "block";
                arrowMarker.querySelector("path").style.display = "block";
                var mousePosition = cursorPoint(svg, event);

                var atan2 = Math.atan2((mousePosition.y-this.buffer.getStartCoords()[1]),(mousePosition.x-this.buffer.getStartCoords()[0]));
                var angle = atan2 > 0 ? atan2 * 360 / (2*Math.PI) : 360 + atan2 * 360 / (2*Math.PI);
           
           // var r = 31.53 - Math.floor(Math.sqrt((mousePosition.y-this.buffer.getStartCoords()[1])*(mousePosition.y-this.buffer.getStartCoords()[1])+(mousePosition.x-this.buffer.getStartCoords()[0])*(mousePosition.x-this.buffer.getStartCoords()[0])));
            // r = r<-10?r:-10;
            // console.log("R: ", r);
            // var string = String(31.583-r) + ",0 " + String(3.478-r) + ",-7.5 " + String(3.478-r) + ",-2.927 0.583,-2.925 0.583,2.927 " + String(3.478-r) + ",2.927 " + String(3.478-r) + ",7.5"
            // arrow.querySelector("polygon").setAttribute('points', string )
            // arrow.angle = Math.floor(angle);
            // arrow.setAttribute("transform", "translate("+this.buffer.getStartCoords()[0]+","+this.buffer.getStartCoords()[1]+") rotate("+Math.floor(angle)+")");

           // console.log(angle)
                
              //  if(angle >= 270 || angle <= 90){

                    if(event.target.classList.contains("end-point") && pointsArrays[startColumn+1].includes(event.target)){
                        var r = Math.floor(Math.sqrt((event.target.getAttribute('cy')-this.buffer.getStartCoords()[1])*(event.target.getAttribute('cy')-this.buffer.getStartCoords()[1])+(event.target.getAttribute('cx')-this.buffer.getStartCoords()[0])*(event.target.getAttribute('cx')-this.buffer.getStartCoords()[0])));
                        //console.log(r);
                        var k = (r-25) / r ;
                        var currentX = Math.floor(this.buffer.getStartCoords()[0]) + (event.target.getAttribute('cx')-this.buffer.getStartCoords()[0]) * k;
                        var currentY = Math.floor(this.buffer.getStartCoords()[1]) + (event.target.getAttribute('cy')-this.buffer.getStartCoords()[1]) * k;
                        
                        arrowLine.setAttribute('x2', currentX);
                        arrowLine.setAttribute('y2', currentY);
                    }
                    else{
                        var r = Math.floor(Math.sqrt((mousePosition.y-this.buffer.getStartCoords()[1])*(mousePosition.y-this.buffer.getStartCoords()[1])+(mousePosition.x-this.buffer.getStartCoords()[0])*(mousePosition.x-this.buffer.getStartCoords()[0])));
                        r = r>30?r:50;
                        //console.log(r);
                        var k = (r-15) /  r;
                        var currentX = Math.floor(this.buffer.getStartCoords()[0]) + (mousePosition.x-this.buffer.getStartCoords()[0]) * k;
                        var currentY = Math.floor(this.buffer.getStartCoords()[1]) + (mousePosition.y-this.buffer.getStartCoords()[1]) * k;
                        
                        arrowLine.setAttribute('x2', currentX);
                        arrowLine.setAttribute('y2', currentY);
                    }

                //    }       
           }

        }.bind(this));



        svg.addEventListener("click", function(event){
                if(!event.target.classList.contains("end-point") && !event.target.classList.contains("start-point")){
                    arrowLine.style.display = "none";
                    this.buffer.stop();
                }
                if (event.target.classList.contains("arrow-line")){
                    event.target.parentNode.remove();
                }
                console.log(event.target);
        }.bind(this));


        var count = xBlocksCount;
        var rect_height = (svg_height - 10*(count+1))/count;
        var arr = Array.apply(null, {length: count}).map(Number.call, Number);

        var groupXBlocks = createElementSVG('g', null, null, null);
        
        arr.forEach(function(item, i, arr) {
            x = svg_width/2 - blockWidth - blockMargins;
            y = i*rect_height+10*(i+1);
            var rect = createElementSVG('rect', genID("rect"), "x-rect", {x: x, y: y, height: rect_height, width: blockWidth, fill: "#bdbdbd"});
            groupXBlocks.append(rect);
            var BlockpointsCount = pointsCount/xBlocksCount;
            var arrPoints = Array.apply(null, {length: BlockpointsCount}).map(Number.call, Number);
            arrPoints.forEach(function(item, j, arr) {
                var x = svg_width/2 - blockWidth - blockMargins;
                var y = i*rect_height + (rect_height/BlockpointsCount*j)+10*(i+1)+ rect_height/(2*BlockpointsCount);
                
                var point = createElementSVG('circle', genID("point"), "end-point", {cx: x, cy: y, r: blockPointsRadius, fill: "green"});
                pointsList.append(point);

            pointsArrays[1].push(point);


                var x = svg_width/2 - blockWidth - blockMargins + blockWidth;
                var point = createElementSVG('circle', genID("point"), "start-point", {cx: x, cy: y, r: blockPointsRadius, fill: "green"});
                pointsList.append(point);

            pointsArrays[2].push(point);


            });
        });

        var groupYBlocks = createElementSVG('g', null, null, null);
        var count = yBlocksCount;    
        var rect_height = (svg_height - 10*(count+1))/count;
        var arr = Array.apply(null, {length: count}).map(Number.call, Number);
        arr.forEach(function(item, i, arr) {
            x = svg_width/2 + blockMargins;
            y = i*rect_height+10*(i+1);
            var rect = createElementSVG('rect', genID("rect"), "y-rect", {x: x, y: y, height: rect_height, width: blockWidth, fill: "#bdbdbd"});
            groupYBlocks.append(rect);
            var BlockpointsCount = pointsCount/yBlocksCount;
            var arrPoints = Array.apply(null, {length: BlockpointsCount}).map(Number.call, Number);
            arrPoints.forEach(function(item, j, arr) {
                var x = svg_width/2 + blockMargins;
                var y = i*rect_height + (rect_height/BlockpointsCount*j)+10*(i+1)+ rect_height/(2*BlockpointsCount);
                var point = createElementSVG('circle', genID("point"), "end-point", {cx: x, cy: y, r: blockPointsRadius, fill: "green"});
                pointsList.append(point);

            pointsArrays[3].push(point);

                var x = svg_width/2 + blockMargins + blockWidth;
                var point = createElementSVG('circle', genID("point"), "start-point", {cx: x, cy: y, r: blockPointsRadius, fill: "green"});
                pointsList.append(point);

            pointsArrays[4].push(point);

            });     
        });
        
        var count = pointsCount;
        var arr = Array.apply(null, {length: count}).map(Number.call, Number);
        arr.forEach(function(item, i, arr){
            var group = createElementSVG('g', null, null, null);
            var x = pointsMargins;
            var y = (i+1)*(svg_height/(count+1));
            var point = createElementSVG('circle', genID("point"), "start-point", {cx: x, cy: y, r: pointsRadius, fill: "green"});
            pointsList.append(point);

            pointsArrays[0].push(point);

            var signText = createTextSVG(pointsMargins-pointsRadius-20, (i+1)*(svg_height/(count+1))+5, "x" + i);
            group.append(signText);
            svg.append(group);
        });

        arr.forEach(function(item, i, arr){
            var group = createElementSVG('g', null, null, null);
            var x = svg_width-pointsMargins;
            var y = (i+1)*(svg_height/(count+1));
            var point = createElementSVG('circle', genID("point"), "end-point", {cx: x, cy: y, r: pointsRadius, fill: "green"});
            pointsList.append(point);

            pointsArrays[5].push(point);

            var signText = createTextSVG(svg_width-pointsMargins+pointsRadius+3, (i+1)*(svg_height/(count+1))+5, "y" + i);
            group.append(signText);
            svg.append(group);
        });


        forEach = Array.prototype.forEach;
        // pointsList.querySelectorAll("circle").forEach(function(item){
        //     item.addEventListener("click", function(event){
        //         if(event.target.classList.contains("start-point") && !this.buffer.getStartCoords()){
        //                 console.log("CASE 1");

        //                 this.buffer.get([event.target.getAttribute('cx'), event.target.getAttribute('cy')]);
        //                 this.answer.setJSON();

        //                 arrowLine.setAttribute('x1', event.target.getAttribute('cx'));
        //                 arrowLine.setAttribute('y1', event.target.getAttribute('cy'));

        //                 arrowLine.setAttribute('x2', event.target.getAttribute('cx'));
        //                 arrowLine.setAttribute('y2', event.target.getAttribute('cy'));
        //         }
        //         else if(this.buffer.getStartCoords() && event.target.classList.contains("end-point")){
        //             console.log("CASE 2");

        //             var mousePosition = cursorPoint(svg, event);
        //             var atan2 = Math.atan2((mousePosition.y-this.buffer.getStartCoords()[1]),(mousePosition.x-this.buffer.getStartCoords()[0]));
        //             var angle = atan2 > 0 ? atan2 * 360 / (2*Math.PI) : 360 + atan2 * 360 / (2*Math.PI);
        //             var r = Math.floor(Math.sqrt((mousePosition.y-this.buffer.getStartCoords()[1])*(mousePosition.y-this.buffer.getStartCoords()[1])+(mousePosition.x-this.buffer.getStartCoords()[0])*(mousePosition.x-this.buffer.getStartCoords()[0])));
        //             var k = (r-25) / r;
        //             var currentX = Math.floor(this.buffer.getStartCoords()[0]) + (event.target.getAttribute('cx')-this.buffer.getStartCoords()[0]) * k;
        //             var currentY = Math.floor(this.buffer.getStartCoords()[1]) + (event.target.getAttribute('cy')-this.buffer.getStartCoords()[1]) * k;
                    
        //             arrowLine.setAttribute('x2', currentX);
        //             arrowLine.setAttribute('y2', currentY);

        //             svg.append(arrowGroup.cloneNode(true), pointsList);

        //             this.buffer.get([event.target.getAttribute('cx'), event.target.getAttribute('cy')]);
        //             this.answer.setJSON();
        //         }

        //     }.bind(this))
        // }.bind(this))



        pointsArrays.forEach(function(array, i, arr){
            array.forEach(function(item){
                item.addEventListener("click", function(event){
                    if(event.target.classList.contains("start-point") && !this.buffer.getStartCoords()){
                            console.log("CASE 1", i);

                            startColumn = parseInt(i);

                            this.buffer.get([event.target.getAttribute('cx'), event.target.getAttribute('cy')]);
                            this.answer.setJSON();

                            arrowLine.setAttribute('x1', event.target.getAttribute('cx'));
                            arrowLine.setAttribute('y1', event.target.getAttribute('cy'));

                            arrowLine.setAttribute('x2', event.target.getAttribute('cx'));
                            arrowLine.setAttribute('y2', event.target.getAttribute('cy'));
                    }
                    else if(this.buffer.getStartCoords() && event.target.classList.contains("end-point") && pointsArrays[startColumn+1].includes(event.target)){
                        console.log("CASE 2");

                        var mousePosition = cursorPoint(svg, event);
                        var atan2 = Math.atan2((mousePosition.y-this.buffer.getStartCoords()[1]),(mousePosition.x-this.buffer.getStartCoords()[0]));
                        var angle = atan2 > 0 ? atan2 * 360 / (2*Math.PI) : 360 + atan2 * 360 / (2*Math.PI);
                        var r = Math.floor(Math.sqrt((mousePosition.y-this.buffer.getStartCoords()[1])*(mousePosition.y-this.buffer.getStartCoords()[1])+(mousePosition.x-this.buffer.getStartCoords()[0])*(mousePosition.x-this.buffer.getStartCoords()[0])));
                        var k = (r-25) / r;
                        var currentX = Math.floor(this.buffer.getStartCoords()[0]) + (event.target.getAttribute('cx')-this.buffer.getStartCoords()[0]) * k;
                        var currentY = Math.floor(this.buffer.getStartCoords()[1]) + (event.target.getAttribute('cy')-this.buffer.getStartCoords()[1]) * k;
                        
                        arrowLine.setAttribute('x2', currentX);
                        arrowLine.setAttribute('y2', currentY);

                        svg.append(arrowGroup.cloneNode(true), pointsList);

                        this.buffer.get([event.target.getAttribute('cx'), event.target.getAttribute('cy')]);
                        this.answer.setJSON();
                    }

                }.bind(this));
            }.bind(this));
        }.bind(this));


        svg.append(groupXBlocks);
        svg.append(groupYBlocks);
        svg.append(pointsList);

        svg.insertBefore(arrowGroup, pointsList);

        console.log("pointsArrays: ", pointsArrays);

        return svg;

    };


    // .bind(this)(this.SVG)
}

sumActivation(".sum_task");

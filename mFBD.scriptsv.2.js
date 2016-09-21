function activationFBD(selector){
    Array.prototype.filter.call(document.querySelectorAll(selector),function(element){return element.dataset.status==undefined}).forEach(function(element, i ,array){
        var p = document.createElement('p');
        p.innerText = "activate";
        element.appendChild(p);
        element.dataset.status = "activate";
    });
    setTimeout(function(){ActivationFBD(selector)}, 1000)
}
activationFBD(".mengine_fbd");














function Constructor(className){
    var className = className || "mengine_fbd";

    var answer={};
    function Answer(field){
        	this.field = "#" + field + " input[type=text]";
        	this.fieldValue = "";
        	this.fieldObject = {};
        	this.get = function(){
        		this.fieldValue = $(this.field).val();
        		return this.fieldValue;
        	};
        	this.set = function(value){
        		if(value == undefined) value = this.fieldValue;
        		$(this.field).val(value);
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




    // Функция генерации ID
    function genID(value) {
        var value = value || "id"
        return value +"_" + Math.random().toString(16).substr(2, 8).toUpperCase();
    };

    // Функция перебора HTMLCollection и NodeList и выполене функции action
    function forEach(collection, action) {
        collection = collection || {};
        for (var i = 0; i < collection.length; i++)
            action(collection[i]);
    };

    function translate(element){
        return function (cx, cy){
            element.x = cx;
            element.y = cy;
            element.setAttribute("transform", "translate("+cx+","+cy+")");
        }
    };

    function rotate(element){
        return function (a){
            element.angle = a;
            element.setAttribute("transform", "rotate("+a+")");
        }
    };

    function scale(element){
        return function (sx, sy){
            element.scaleX = sx;
            element.scaleY = sy;
            element.setAttribute("transform", "scale("+sx+","+sy+")");
        }
    };

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

    function transformAndScale(element){
        return function (cx, cy, sx, sy){
            element.setAttribute("transform", "translate("+cx+","+cy+") scale("+sx+","+sy+")");
        }
    }
    function transformAndRotate(element){
        return function (cx, cy, a){
            element.setAttribute("transform", "translate("+cx+","+cy+") rotate("+a+")");
        }
    }

    function cursorPoint(SVGObject, event){
        var pt = SVGObject.createSVGPoint()
        pt.x = event.clientX;
        pt.y = event.clientY;
        return pt.matrixTransform(SVGObject.getScreenCTM().inverse());
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

  function append(element, array){
    array.forEach(function(el){element.appendChild(el)})
  }

    function addStyle(array, styleObject){
        array.forEach(function(element){
            for (style in styleObject){
                element.style[style] = styleObject[style];
            }
        });
    }


  function createMenu(SVGObject){

    // создание группы в которую входят все элементы меню
    var svgMenu = createElementSVG('g', genID("svgMenu"), "svgMenu");
    //
    var menuLevelOne = createElementSVG('g', genID("menuLevelOne"), "menuLevelOne");
    //
    var whiteRound = createElementSVG('circle', genID("whiteRound"), "whiteRound",{ stroke: "#000000", fill:'#FFFFFF', opacity: '0.1', cx: '0',  cy: '0', r:'65'});
    var axis = createElementSVG('g', genID("axis"), "axis");

    if (SVGObject.parentNode.dataset.axis == "flat"){
        var axisX = createElementSVG('line', genID("axis"), "axis",{ x1:"0", y1:"-160",x2:"0", y2:"160", stroke:"#000000", "stroke-dasharray":"12 5", "stroke-width":1});
        var axisY = createElementSVG('line', genID("axis"), "axis",{ x1:"-160", y1:"0",x2:"160", y2:"0", stroke:"#000000", "stroke-dasharray":"12 5", "stroke-width":1});
        append(axis, [
            axisX,
            axisY,
        ]);
    }
    if (SVGObject.parentNode.dataset.axis == "isometry"){

        var axisZ = createElementSVG('line', genID("axis"), "axis",{ x1:"0", y1:"-160",x2:"0", y2:"160", stroke:"#000000", "stroke-dasharray":"12 5", "stroke-width":1});
        var axisX = createElementSVG('line', genID("axis"), "axis",{ x1:"0", y1:"-160",x2:"0", y2:"160", stroke:"#000000", "stroke-dasharray":"12 5", "stroke-width":1, transform:"rotate(-120)"});
        var axisY = createElementSVG('line', genID("axis"), "axis",{ x1:"0", y1:"-160",x2:"0", y2:"160", stroke:"#000000", "stroke-dasharray":"12 5", "stroke-width":1, transform:"rotate(120)"});

        append(axis, [
            axisZ,
            axisX,
            axisY,
        ]);

    }
    if (SVGObject.parentNode.dataset.axis == "custom"){
        if (SVGObject.parentNode.dataset.custom){
            var a = SVGObject.parentNode.dataset.custom.split(',');
            var axisX = createElementSVG('line', genID("axis"), "axis",{ x1:"-160", y1:"0",x2:"160", y2:"0", stroke:"#000000", "stroke-dasharray":"12 5", "stroke-width":1, transform:"rotate("+ Number(a[0]) +")"});
            var axisY = createElementSVG('line', genID("axis"), "axis",{ x1:"-160", y1:"0",x2:"160", y2:"0", stroke:"#000000", "stroke-dasharray":"12 5", "stroke-width":1, transform:"rotate("+ Number(a[1]) +")"});
            var axisZ = createElementSVG('line', genID("axis"), "axis",{ x1:"-160", y1:"0",x2:"160", y2:"0", stroke:"#000000", "stroke-dasharray":"12 5", "stroke-width":1, transform:"rotate("+ Number(a[2]) +")"});
        }

        append(axis, [
            axisZ,
            axisX,
            axisY,
        ]);

    }
    //
    var scDelAllinPoint = createElementSVG('g', genID("scDelAllinPoint"), "scDelAllinPoint");
    scDelAllinPoint.innerHTML = '<circle fill="#FFFFFF" stroke="#000000" stroke-width="2" stroke-miterlimit="10" cx="0" cy="58" r="28"></circle>';
    scDelAllinPoint.innerHTML += '<path d="M10.362,52.793c-0.004-0.055-0.006-0.105-0.016-0.156c-0.009-0.048-0.023-0.094-0.037-0.141c-0.014-0.05-0.026-0.097-0.044-0.143s-0.042-0.089-0.064-0.133c-0.021-0.042-0.042-0.083-0.067-0.123c-0.027-0.042-0.059-0.08-0.089-0.119c-0.029-0.037-0.056-0.073-0.088-0.105c-0.034-0.036-0.072-0.066-0.109-0.101c-0.036-0.029-0.07-0.062-0.108-0.09c-0.04-0.028-0.083-0.051-0.125-0.075c-0.042-0.022-0.083-0.049-0.127-0.067C9.444,51.52,9.397,51.506,9.35,51.49c-0.047-0.016-0.092-0.031-0.141-0.044C9.161,51.435,9.11,51.43,9.06,51.424c-0.04-0.005-0.077-0.016-0.117-0.02c-0.012,0-0.023,0.004-0.036,0.004c-0.012,0-0.023-0.005-0.035-0.005H-8.874c-0.012,0-0.023,0.005-0.035,0.005c-0.012,0-0.023-0.004-0.036-0.004c-0.041,0.004-0.078,0.014-0.117,0.02c-0.05,0.006-0.101,0.011-0.149,0.021c-0.049,0.013-0.094,0.028-0.141,0.044c-0.046,0.018-0.093,0.03-0.138,0.052c-0.045,0.02-0.085,0.045-0.127,0.067c-0.042,0.024-0.084,0.047-0.125,0.075c-0.038,0.028-0.073,0.061-0.108,0.09c-0.037,0.032-0.075,0.063-0.109,0.101c-0.032,0.032-0.059,0.068-0.088,0.105c-0.031,0.039-0.063,0.077-0.089,0.119c-0.025,0.04-0.045,0.082-0.067,0.123c-0.023,0.044-0.046,0.087-0.064,0.133s-0.03,0.093-0.044,0.143c-0.013,0.047-0.028,0.092-0.037,0.141c-0.009,0.051-0.012,0.104-0.016,0.156c-0.003,0.038-0.011,0.074-0.011,0.11c0,0.014,0.003,0.022,0.003,0.034c0,0.014-0.002,0.024-0.002,0.036l1,21.255c0.002,0.043,0.013,0.083,0.018,0.125c0.006,0.046,0.01,0.092,0.02,0.139c0.012,0.051,0.029,0.1,0.046,0.146c0.014,0.043,0.026,0.086,0.044,0.127c0.021,0.047,0.048,0.091,0.074,0.136c0.022,0.038,0.042,0.077,0.066,0.113c0.029,0.042,0.064,0.079,0.098,0.118c0.028,0.033,0.055,0.068,0.085,0.098c0.037,0.036,0.078,0.066,0.119,0.1c0.034,0.025,0.066,0.057,0.102,0.081c0.045,0.028,0.094,0.052,0.142,0.075c0.037,0.021,0.071,0.042,0.11,0.06c0.058,0.022,0.12,0.039,0.181,0.056c0.032,0.009,0.063,0.022,0.096,0.029c0.096,0.019,0.195,0.03,0.296,0.03c0,0,0,0,0.001,0l0,0h15.75l0,0c0,0,0,0,0.001,0c0.102,0,0.201-0.013,0.296-0.03c0.033-0.007,0.064-0.021,0.096-0.029c0.061-0.017,0.123-0.032,0.181-0.056c0.039-0.018,0.073-0.039,0.11-0.06c0.048-0.022,0.097-0.047,0.142-0.075c0.036-0.024,0.068-0.056,0.102-0.081c0.041-0.032,0.082-0.063,0.119-0.1c0.031-0.028,0.057-0.063,0.085-0.098c0.034-0.039,0.068-0.076,0.098-0.118c0.025-0.036,0.044-0.075,0.066-0.113c0.026-0.045,0.052-0.088,0.074-0.136c0.018-0.041,0.03-0.084,0.044-0.127c0.017-0.049,0.035-0.097,0.046-0.146c0.01-0.047,0.014-0.093,0.02-0.139c0.005-0.042,0.016-0.082,0.018-0.125l1-21.255c0-0.012-0.002-0.022-0.002-0.036c0-0.012,0.003-0.021,0.003-0.034C10.374,52.867,10.365,52.831,10.362,52.793z M2.625,55.593c-0.552,0-1,0.448-1,1V72.66h-3.249V56.593c0-0.552-0.448-1-1-1c-0.552,0-1,0.448-1,1V72.66h-2.818l-0.859-18.257H7.301L6.442,72.66H3.625V56.593C3.625,56.041,3.177,55.593,2.625,55.593z"/>';
    scDelAllinPoint.innerHTML += '<path d="M10.286,47.698H4.398c-0.223-0.859-0.999-1.5-1.929-1.5h-4.938c-0.931,0-1.706,0.641-1.929,1.5h-5.888c-0.829,0-1.5,0.673-1.5,1.5c0,0.829,0.671,1.5,1.5,1.5h20.572c0.829,0,1.5-0.671,1.5-1.5C11.786,48.37,11.115,47.698,10.286,47.698z"/>';
    //
    var scMoment = createElementSVG('g', genID("scMoment"), "scMoment");
    scMoment.innerHTML = '<circle  fill="#FFFFFF" stroke="#000000" stroke-width="2" stroke-miterlimit="10" cx="56" cy="18" r="28" />';
    scMoment.innerHTML += '<path d="M62.838-1.187l-0.925,2.854c9.076,2.939,14.039,12.802,11.065,21.979C70.002,32.826,60.199,37.9,51.123,34.959c-3.553-1.151-6.597-3.422-8.725-6.434l1.868-0.147l-5.635-15.864L35.578,29.07l3.448-0.272c2.497,4.255,6.443,7.483,11.172,9.017c2.053,0.666,4.137,0.982,6.19,0.981c8.594,0,16.63-5.544,19.443-14.226C79.317,13.82,73.488,2.264,62.838-1.187z"/>';
    scMoment.innerHTML += '<circle fill="#FFFFFF" stroke="#000000" stroke-width="2" stroke-miterlimit="10" cx="57" cy="19" r="2"></circle>';
    //
    var scForce = createElementSVG('g', genID("scForce"), "scForce");
    scForce.innerHTML = '<circle  fill="#FFFFFF" stroke="#000000" stroke-width="2" stroke-miterlimit="10" cx="-57" cy="19" r="28" />';
    scForce.innerHTML += '<path d="M-51.534,19.316l7.712-14.965l-14.162,9.104l2.115,1.922l-13.115,14.431c-0.075-0.007-0.148-0.021-0.225-0.021c-1.38,0-2.5,1.117-2.5,2.5c0,1.381,1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5c0-0.161-0.019-0.316-0.047-0.471l13.107-14.422L-51.534,19.316z"/>';
    //
    var menuLevelTwo = createElementSVG('g', genID("menuLevelTwo"), "menuLevelTwo");
    //
//    var activeSpaceForce = createElementSVG('circle', genID("activeSpaceForce"), "activeSpaceForce",{ fill: '#FFFFFF', opacity: '0.1', cx: '0',  cy: '0', r:'500'});
    //Добовление элементов
    append(menuLevelOne, [
      scDelAllinPoint,
      scMoment,
      scForce
    ]);
    //
    var force = createElementSVG('g', genID("force"), "force");
    force.innerHTML = '<polygon fill="#FF691F" stroke="#724A22" stroke-miterlimit="10" points="91.583,0 63.478,-7.5 63.478,-2.927 0.583,-2.925 0.583,2.927 63.478,2.927 63.478,7.5 "/>';
    //
    var moment = createElementSVG('g', genID("moment"), "moment");
    moment.innerHTML = '<path fill="#FF691F" stroke="#724A22" stroke-miterlimit="10" d="M13.446-42.098l-1.827,5.715c15.894,5.083,26.573,19.719,26.573,36.421c0,21.081-17.15,38.23-38.23,38.23c-3.102,0-6.152-0.373-9.118-1.099l1.245-1.925L-30.338,28l15.799,17.49l1.961-3.032c4.053,1.198,8.254,1.811,12.54,1.811c24.389,0,44.23-19.842,44.23-44.23C44.192-19.284,31.836-36.218,13.446-42.098z"/>';
    //
    append(menuLevelTwo,[
//      activeSpaceForce,
      force,
      moment
    ]);
    //
    var scButtonOpenClose = createElementSVG('g', genID("scButtonOpenClose"), "scButtonOpenClose");
    scButtonOpenClose.innerHTML = '<circle fill="#FFFFFF" stroke="#000000" stroke-width="2" stroke-miterlimit="10" cx="0" cy="0" r="10"/>';
    scButtonOpenClose.innerHTML += '<line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="5" y1="-5" x2="-5" y2="5"/>';
    scButtonOpenClose.innerHTML += '<line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="-5" y1="-5" x2="5" y2="5"/>';
    //
    append(svgMenu, [
        axis,
        whiteRound,
        menuLevelOne,
        menuLevelTwo,
        scButtonOpenClose
    ]);
    //
    append(SVGObject, [
      svgMenu
    ]);
    // Функции управления элементами
    var fn={};
    svgMenu.translate = translate(svgMenu);
    svgMenu.visible = toggle(svgMenu);
    menuLevelOne.visible = toggle(menuLevelOne);
    menuLevelTwo.visible = toggle(menuLevelTwo);
    force.rotate = rotate(force);
    force.translate = translate(force);
    force.visible = toggle(force);
    moment.scale = scale(moment);
    moment.visible = toggle(moment);


    //Установка начальных условий
    svgMenu.translate(0,0);
    svgMenu.visible("none");
    menuLevelOne.visible("block");
    menuLevelTwo.visible("none");
    force.visible("none")
    moment.visible("none");

    // Слушатели событий
    scMoment.addEventListener("click", function(event){
        menuLevelOne.visible();
        menuLevelTwo.visible();
        moment.visible("block");
        moment.action = true;
        event.stopPropagation();
  }, true);



    scForce.addEventListener("click", function(event){
        menuLevelOne.visible();
        menuLevelTwo.visible();
        force.visible("block");
        force.action = true;
        event.stopPropagation();
  }, true);

    scDelAllinPoint.addEventListener("click", function(event){
        answer[SVGObject.parentNode.id][svgMenu.position].forEach(function(){
            insertForce.removeChild(insertForce.querySelector(".f"+svgMenu.position))
        });
        answer[SVGObject.parentNode.id][svgMenu.position] = [];
        event.stopPropagation();
        SVGObject.parentNode.querySelector("#" + SVGObject.parentNode.id + " input[type=text]").value = JSON.stringify({answer:answer[SVGObject.parentNode.id]});
        SVGObject.parentNode.querySelector("#" + SVGObject.parentNode.id + " input[type=text]").setAttribute('value', JSON.stringify({answer:answer[SVGObject.parentNode.id]}));
        svgMenu.visible("none");
    }, true);

    scButtonOpenClose.addEventListener("click", function(event){
        svgMenu.visible("none")
        menuLevelOne.visible("block");
        menuLevelTwo.visible("none");

        force.visible("none");
        force.action = false;

        moment.visible("none");
        moment.action = false;
        event.stopPropagation();
  }, true);

    SVGObject.addEventListener("click", function(event){
        if (force.action && answer[SVGObject.parentNode.id][svgMenu.position].indexOf(force.angle)<0) {
            forceClone = force.cloneNode(true);
            forceClone.removeAttribute("data-select");
            forceClone.classList.add("f"+svgMenu.position);
            transformAndRotate(forceClone)(svgMenu.x, svgMenu.y, force.angle);
            insertForce.appendChild(forceClone);
            force.action = false;
            menuLevelTwo.visible();
            menuLevelOne.visible();
            svgMenu.visible();
            answer[SVGObject.parentNode.id][svgMenu.position].push(force.angle);

            SVGObject.parentNode.querySelector("#" + SVGObject.parentNode.id + " input[type=text]").value = JSON.stringify({answer:answer[SVGObject.parentNode.id]})
            SVGObject.parentNode.querySelector("#" + SVGObject.parentNode.id + " input[type=text]").setAttribute('value', JSON.stringify({answer:answer[SVGObject.parentNode.id]}));
        }
        else if(moment.action && answer[SVGObject.parentNode.id][svgMenu.position].indexOf(force.angle)<0){
            momentClone = moment.cloneNode(true);
            momentClone.classList.add("f"+svgMenu.position);
            transformAndScale(momentClone)(svgMenu.x, svgMenu.y, moment.scaleX, moment.scaleY );
            insertForce.appendChild(momentClone);
            moment.action = false;
            menuLevelTwo.visible();
            menuLevelOne.visible();
            svgMenu.visible();
            answer[SVGObject.parentNode.id][svgMenu.position].push(moment.scaleX>0?"mr":"ml");
            SVGObject.parentNode.querySelector("#" + SVGObject.parentNode.id + " input[type=text]").value = JSON.stringify({answer:answer[SVGObject.parentNode.id]})
            SVGObject.parentNode.querySelector("#" + SVGObject.parentNode.id + " input[type=text]").setAttribute('value', JSON.stringify({answer:answer[SVGObject.parentNode.id]}));

        }
        if (svgMenu.style.display == "block") svgMenu.visible();
        force.action = false;


    }, false);

    SVGObject.addEventListener("mousemove", function(event){
        var mousePosition = cursorPoint(SVGObject, event);
        var atan2 = Math.atan2((mousePosition.y-svgMenu.y),(mousePosition.x-svgMenu.x));
        var angle = atan2 > 0 ? atan2 * 360 / (2*Math.PI) : 360 + atan2 * 360 / (2*Math.PI);


        if (SVGObject.parentNode.dataset.axis == "flat"){
            angle = Math.abs(angle-90)<5 ? 90 : angle;
            angle = Math.abs(angle-270)<5 ? 270 : angle;
            angle = Math.abs(angle)<5 ? 0 : angle;
            angle = Math.abs(angle-180)<5 ? 180 : angle;
        }
        if (SVGObject.parentNode.dataset.axis == "isometry"){
            angle = Math.abs(angle-270)<5 ? 270 : angle;
            angle = Math.abs(angle-90)<5 ? 90 : angle;
            angle = Math.abs(angle-30)<5 ? 30 : angle;
            angle = Math.abs(angle-210)<5 ? 210 : angle;
            angle = Math.abs(angle-330)<5 ? 330 : angle;
            angle = Math.abs(angle-150)<5 ? 150 : angle;
        }
        if (SVGObject.parentNode.dataset.axis == "custom"){
            if (SVGObject.parentNode.dataset.custom){
                var a = SVGObject.parentNode.dataset.custom.split(',');
                angle = Math.abs(angle-Number(a[0]))<5 ? Number(a[0]) : angle;
                angle = Math.abs(angle-Number(a[0])-180)<5 ? Number(a[0])+180 : angle;
                angle = Math.abs(angle-Number(a[1]))<5 ? Number(a[1]) : angle;
                angle = Math.abs(angle-Number(a[1])-180)<5 ? Number(a[1])+180 : angle;
                angle = Math.abs(angle-Number(a[2]))<5 ? Number(a[2]) : angle;
                angle = Math.abs(angle-Number(a[2])-180)<5 ? Number(a[2])+180 : angle;
                if (angle == Number(a[0])||angle == Number(a[0])+180||angle == Number(a[1])||angle == Number(a[1])+180||angle == Number(a[2])||angle == Number(a[2])+180) {
                    force.setAttribute("data-select", "true");
                }
                else {
                    force.removeAttribute("data-select");
                }
            }
            else{
                console.info("custom setting is not set");
            }
        }
        else{
            console.info("axis is undefined");
        }

        var r = 91.583 - Math.floor(Math.sqrt((mousePosition.y-svgMenu.y)*(mousePosition.y-svgMenu.y)+(mousePosition.x-svgMenu.x)*(mousePosition.x-svgMenu.x)));
        r = r>-10?r:-10;
        r = r<30?r:30;
        r = r+10;
        var string = String(91.583-r) + ",0 " + String(63.478-r) + ",-7.5 " + String(63.478-r) + ",-2.927 0.583,-2.925 0.583,2.927 " + String(63.478-r) + ",2.927 " + String(63.478-r) + ",7.5"
        force.querySelector("polygon").setAttribute('points', string )
        force.rotate(Math.floor(angle));

        leftOrRigth = (svgMenu.x-mousePosition.x > 0 ? -1 : 1)
        moment.scale(leftOrRigth,1);



    });

    var actionPointsGroup = SVGObject.querySelectorAll(".actionPoints");
    var insertForce = createElementSVG('g', genID("insertForce"), "insertForce");
    SVGObject.insertBefore(insertForce, actionPointsGroup[0]);
    answer[SVGObject.parentNode.id] = {};

    forEach(actionPointsGroup, function(actionPoints){
        points = actionPoints.querySelectorAll('circle');
        var i=0;
        forEach(points, function(point){
            point.id = i;
            answer[SVGObject.parentNode.id][i]=[];
            i++;
            point.addEventListener("click", function(event){
                if (force.action) {
                    var atan2 = Math.atan2((point.getAttribute("cy")-svgMenu.y),(point.getAttribute("cx")-svgMenu.x));
                    var angle = atan2 > 0 ? atan2 * 360 / (2*Math.PI) : 360 + atan2 * 360 / (2*Math.PI);
                    force.rotate(Math.floor(angle));
                }
                else if (moment.action){

                }
                else{
                    menuLevelOne.visible("block");
                    menuLevelTwo.visible("none");

                    force.visible("none");
                    force.action = false;

                    moment.visible("none");
                    moment.action = false;
                    svgMenu.visible("block");
                    svgMenu.translate(Number(point.getAttribute("cx")),Number(point.getAttribute("cy")));
                    svgMenu.position = point.id;

                    event.stopPropagation();
                    }

            });
            addStyle([point],{cursor : "pointer"})
        });
    });

    addStyle([scMoment, scForce, scDelAllinPoint, scButtonOpenClose],{cursor : "pointer"})
//    svgMenu.addEventListener("mouseenter",function(event){
//        addStyle([scButtonOpenClose],{filter : "url(#f3)"})
//    })
//    svgMenu.addEventListener("mouseleave",function(){
//        addStyle([scButtonOpenClose],{filter : "none"})
//    })

// Этот код каким то образом добавляет css в DOM
var css = ".scButtonOpenClose:hover line {stroke: #ffffff; -webkit-transition: all 100ms;} .scButtonOpenClose:hover circle {fill: #000000; -webkit-transition: all 100ms;}";
css += ".scButtonOpenClose:active line {stroke: #000000; -webkit-transition: all 150ms;} .scButtonOpenClose:active circle {fill: #ff691f; -webkit-transition: all 150ms;}";

css += ".scMoment:hover path, .scForce:hover path, .scDelAllinPoint:hover path {fill: #000000; -webkit-transition: all 100ms;}"
css += ".scMoment:hover circle, .scForce:hover circle, .scDelAllinPoint:hover circle {fill: #ff691f; stroke: #000000; stroke-width: 2px; -webkit-transition: all 100ms;}";

css += ".scMoment:active path, .scForce:active path, .scDelAllinPoint:active path {fill: #000000; -webkit-transition: all 150ms;}"
css += ".scMoment:active circle, .scForce:active circle, .scDelAllinPoint:active circle {fill: #ff691f; stroke: #000000; stroke-width: 1px; -webkit-transition: all 10ms;}";



css += ".actionPoints circle:hover {stroke: #ff691f; stroke-width: 3px; fill: #ffffff; -webkit-transition: all 100ms;}"
css += ".actionPoints circle {stroke: #000000; stroke-width: 2px; fill: #ff691f; -webkit-transition: all 100ms;}"

css+= "div[data-axis='flat'] .force[transform='rotate(90)'] polygon {fill: #33c654;}";
css+= "div[data-axis='flat'] .force[transform='rotate(270)'] polygon {fill: #33c654;}";
css+= "div[data-axis='flat'] .force[transform='rotate(0)'] polygon {fill: #33c654;}";
css+= "div[data-axis='flat'] .force[transform='rotate(180)'] polygon {fill: #33c654;}";


css+= "div[data-axis='isometry'] .force[transform='rotate(30)'] polygon {fill: #0ab9f1;}";
css+= "div[data-axis='isometry'] .force[transform='rotate(90)'] polygon {fill: #0ab9f1;}";
css+= "div[data-axis='isometry'] .force[transform='rotate(150)'] polygon {fill: #0ab9f1;}";
css+= "div[data-axis='isometry'] .force[transform='rotate(210)'] polygon {fill: #0ab9f1;}";
css+= "div[data-axis='isometry'] .force[transform='rotate(270)'] polygon {fill: #0ab9f1;}";
css+= "div[data-axis='isometry'] .force[transform='rotate(330)'] polygon {fill: #0ab9f1;}";

css+= "div[data-axis='custom'] .force[data-select='true'] polygon {fill: gold;}";




style = document.createElement("style")
style.id = "fbd";
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
if(!document.querySelector("style#fbd")) document.querySelector("head").appendChild(style);

  return SVGObject;
  };

  this.init = function(){
    forEach(document.getElementsByClassName(className), function (element){
        createMenu(element.querySelector("svg"))}.bind(this) )
  };
  this.initElement = function(){

  };


}

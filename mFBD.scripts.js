
function Constructor(className){
  var className = className || "mengine_fbd";

  // Функция генерации ID
  function genID(value) {
    var value = value+"_" || "id"
      return value + Math.random().toString(16).substr(2, 8).toUpperCase();
    };

  // Функция перебора HTMLCollection и NodeList и выполене функции action
  function forEach(collection, action) {
      collection = collection || {};
      for (var i = 0; i < collection.length; i++)
          action(collection[i]);
      };


  function transform(element){
    return function (cx, cy){
      element.setAttribute("transform", "translate("+cx+","+cy+")");
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

  function createElementSVG(name, id, classList, attributes){
    var NS ="http://www.w3.org/2000/svg";
    var element = document.createElementNS(NS, name);
    if (id) element.id =id;
    if (className) element.classList = classList;
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


  function createMenu(SVGObject){
    // создание группы в которую входят все элементы меню
    var svgMenu = createElementSVG('g', genID("svgMenu"), "svgMenu");
    //
    var menuLevelOne = createElementSVG('g', genID("menuLevelOne"), "menuLevelOne");
    //
    var whiteRound = createElementSVG('circle', genID(), "whiteRound",{ fill: '#FFFFFF', opacity: '0.1', cx: '0',  cy: '0', r:'50'});
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
    var activeSpaceForce = createElementSVG('circle', genID(activeSpaceForce), "activeSpaceForce",{ fill: '#FFFFFF', opacity: '0.1', cx: '0',  cy: '0', r:'500'});
    //Добовление элементов
    append(menuLevelOne, [
      whiteRound,
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
      activeSpaceForce,
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
    fn.transformMenu = transform(svgMenu);
    fn.visibleMenu = toggle(svgMenu);
    fn.visibleMenuLevelOne = toggle(menuLevelOne);
    fn.visibleMenuLevelTwo = toggle(menuLevelTwo);
    //Установка начальных условий
    fn.visibleMenuLevelOne("block");
    fn.visibleMenuLevelTwo("none");

    // Слушатели событий
    scForce.addEventListener("click", function(e){
      fn.visibleMenuLevelOne();
      fn.visibleMenuLevelTwo();
    }, false);

    scButtonOpenClose.addEventListener("click", function(e){
      console.log(e.target);
      fn.visibleMenu()
    }, false);

    SVGObject.addEventListener("click", function(e){
      fn.transformMenu(200,200)
    }, false);

  return SVGObject;
  };

  this.init = function(){
    forEach(document.getElementsByClassName(className), function (element){createMenu(element.querySelector("svg"))}.bind(this) )
  };
  this.initElement = function(){

  };


}





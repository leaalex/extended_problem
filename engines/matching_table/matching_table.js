if (MatchingTableObjects == undefined) var MatchingTableObjects = {};

function MatchingTableActivation(selector) {
    Array.prototype.filter.call(document.querySelectorAll(selector), function(element) {
        return element.dataset.status == undefined
    }).forEach(function(element, i, array) {
        MatchingTableObjects[element.id] = (new MatchingTableObjects(element, element.getAttribute("data")));
        element.dataset.status = "activate";
    });
    setTimeout(function() {
        MatchingTableActivation(selector)
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

$.fn.shuffleChildren = function() {
    $.each(this.get(), function(index, el) {
        var $el = $(el);
        var $find = $el.children();

        $find.sort(function() {
            return 0.5 - Math.random();
        });

        $el.empty();
        $find.appendTo($el);
    });
};

function MatchingTableObjects(element, data){

	//Перемешать незадействованные элементы
	$("#conf-id",element).shuffleChildren();
    $(".matching_table").hide().fadeIn(500);

	this.element = element;
    var answer = new Answer(element.querySelector("#matching_table_input").querySelector("input[type='text']"));

    $(".conf-answers-place",element).sortable({
        connectWith: "#" + element.id + " .conf-answers-place",
        stop: function() {
      	    setAnswer();
        },
        sort: function() {
            $(".conf-table .conf-answers-place", element).removeClass("conf-wrong-cell");
        },
        opacity: 0.8,
        over: function(event) { 
            $("#" + event.target.id, element).css("border","2px dashed #b2b2b2");
        },
        out: function(event) { 
            $("#" + event.target.id, element).css("border","");
        }
	}).disableSelection();

    function setAnswer(){
    	var problem =  $("#" + element.id).closest(".problem");
    	var checkButton = $("button.check", problem);
    	checkButton.removeClass("is-disabled");
    	checkButton.disabled = false;

    	var student_answer = {};
        $(".conf-table td.conf-answers-place", element).map(function(indx, item){	
        	item_id = $(item).attr("id");
        	student_answer[item_id] = $(item).find(".conf-item").map(function(index, sub_item){
        		return $(sub_item).attr("id")
        	}).get();
        }).get();
        answer.setJSON({answer: student_answer}); 
    }

    if(answer.get()){
        var student_answer = answer.getJSON()["answer"];
        for (key in student_answer) { 
        	for ( l in student_answer[key]) { 
        		$("#"+key, element).append($("#"+student_answer[key][l], element));
        	}
        }

		if($("span.message", element)){
		  if( $("span.message", element).text() != ""){
		    var wrongCells = JSON.parse($("span.message",element).text())["wrong_cells"];
		    var message = JSON.parse($("span.message",element).text())["message"];
		    for (cellId in wrongCells){
		      $(".conf-table #" + wrongCells[cellId], element).addClass("conf-wrong-cell");
		    }
		    // $(".message-about-grade", element).html(message);
		  }
		}
		console.log($("input[type=text]", element));
		console.log($("span.message", element));
		
		$(document).ready(function(){$("input[type=text]", element).hide()});
  		$(document).ready(function(){$("span.message", element).hide()});
  		
    }

    var css = ".capa_inputtype{text-align: center !important;}";
    css += ".conf-text{text-align: center !important;padding: 5px !important;font-family: 'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;}";
    css += ".conf-wrong-cell{border: 2px solid rgb(178, 6, 16) !important;}";
    css += ".conf-all-answers{min-height: 60px}";
    css += ".conf-table td{border: 1px solid #b2b2b2;}";
    css += ".conf-table{width:100%}";
    css += "td.conf-answers-place{min-width: 250px;}";
    css += ".conf-item{max-height: 120px;vertical-align: middle;background: #f3f3f3;border: 1px solid #b2b2b2;;margin: 2px;padding: 3px;text-align: center;cursor: move;}";
    css += ".conf-answers-place{background: #f9f9f9;}";
	css += "#" + element.id + " .conf-table td { padding: 5px 0px !important;}";
	css += "#" + element.id + " div.table-header{padding: 5px;}";
    // css +=".message-about-grade{text-align: center;font-size: 1.2em;}";
    css += "#" + element.id + " input[type=text]{display:none}";
    css += "#" + element.id + " span.message{display:none}";
    
    var style = document.createElement("style")
    style.id = "matching_table";
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    if (!document.querySelector("style#matching_table")) document.querySelector("head").appendChild(style);
}

MatchingTableActivation(".matching_table")
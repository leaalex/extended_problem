if (GenotypeTaskObjects == undefined) var GenotypeTaskObjects = {};

function GenotypeTaskActivation(selector) {
    Array.prototype.filter.call(document.querySelectorAll(selector), function(element) {
        return element.dataset.status == undefined
    }).forEach(function(element, i, array) {
        GenotypeTaskObjects[element.id] = (new GenotypeTaskObjects(element, element.getAttribute("genotype_count")));
        element.dataset.status = "activate";
    });
    setTimeout(function() {
        GenotypeTaskActivation(selector)
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
function genID(value) {
    var value = value || "id"
    return value +"_" + Math.random().toString(16).substr(2, 8).toUpperCase();
};

function GenotypeTaskObjects(element, data){

    $(element).fadeOut(100).fadeIn(300);

    var genotype_count = parseInt(data);
    var answer = new Answer(element.querySelector("#genotype_task_input").querySelector("input[type='text']"));

    var content_for_buttons = {
        "empty_a": '<div class="genotype-letter empty-letter">__</div>',
        "empty_b": '<div class="genotype-letter empty-letter">__</div>',

        "aa": "<div class='genotype-letter'>aa</div>",
        "AA": "<div class='genotype-letter'>AA</div>",
        "Aa": "<div class='genotype-letter'>Aa</div>",

        "bb": "<div class='genotype-letter'>bb</div>",
        "BB": "<div class='genotype-letter'>BB</div>",
        "Bb": "<div class='genotype-letter'>Bb</div>",
    }

    element.append(generateSubsidiaryElement("("));
    for(var i = 0; i < genotype_count; i++){
        // if(i == 0 && genotype_count > 1){
        //     element.append(generateSubsidiaryElement("("));
        // }
        element.append(generateGenotypeBlock());
        
        if(genotype_count > 1 && i != genotype_count-1){
            element.append(generateSubsidiaryElement(","));
        }

        // else if(genotype_count > 1 && i == genotype_count-1){
        //     element.append(generateSubsidiaryElement(")"));
        // }
    }
    element.append(generateSubsidiaryElement(")"));

    function generateGenotypeBlock(){
        var GenotypeBlockContainer = document.createElement("div");
        GenotypeBlockContainer.classList = "genotype-block-container";
        // GenotypeBlockContainer.append(createButton("a"));
        GenotypeBlockContainer.append(createButton("a"));
        GenotypeBlockContainer.append(createButton("b"));
        // GenotypeBlockContainer.append(createButton("b"));
        return GenotypeBlockContainer;
    }

    function generateSubsidiaryElement(content){
        var SubsidiaryElement = document.createElement("div");
        SubsidiaryElement.classList = "subsidiary-element";
        SubsidiaryElement.innerHTML = "<div><div class='genotype-letter'>"+content+"</div></div>";
        return SubsidiaryElement;
    }

    function createButton(type){
        var button = document.createElement("div");
        button.classList = "change-genotype button-type-"+type;
        button.setAttribute("state", "empty_"+ type);
        button.innerHTML = content_for_buttons["empty_" + type];
        button.onclick = function(event){
            var currentState = button.getAttribute("state");
            if(currentState == "empty_"+ type){
                button.innerHTML = content_for_buttons[type+type];
                button.setAttribute("state", type+type);
            }
            else if(currentState == type+type){
                button.innerHTML = content_for_buttons[type.toUpperCase()+type];
                button.setAttribute("state", type.toUpperCase()+type);
            }
            else if(currentState == type.toUpperCase()+type){
                button.innerHTML = content_for_buttons[type.toUpperCase()+type.toUpperCase()];
                button.setAttribute("state", type.toUpperCase()+type.toUpperCase());
            }
            else if(currentState == type.toUpperCase()+type.toUpperCase()){
                button.innerHTML = content_for_buttons[type+type];
                button.setAttribute("state", type+type);
            }
            else{
                ;
            }
            setAnswer();
        };
        return button;
    }

    function setAnswer(){
        var problem =  $("#" + element.id).closest(".problem");
        var checkButton = $("button.submit", problem)[0];
        checkButton.removeAttribute("disabled");
        $(checkButton).removeClass("is-disabled");
        $(checkButton).disabled = false;

        var student_answer = [];
        var blocks = element.getElementsByClassName("genotype-block-container");
        for (var i = 0; i < blocks.length; i++) {
            var one_answer = [];
            var buttons = blocks[i].getElementsByClassName("change-genotype");
            for (var j = 0; j < buttons.length; j++) {
                one_answer.push(buttons[j].getAttribute("state"))
            }
            student_answer.push(one_answer);
        }
        answer.setJSON({answer: student_answer});
        $(".genotype-block-container", element).removeClass("genotype-correct");
        $(".genotype-block-container", element).removeClass("genotype-incorrect");

        console.log(student_answer);
    }

    if(answer.get()){
        var student_answer = answer.getJSON()["answer"];
        for (var i=0; i<student_answer.length; i++){
            for(var j=0; j<student_answer[i].length; j++){
                element.getElementsByClassName("genotype-block-container")[i].getElementsByClassName("change-genotype")[j].innerHTML = content_for_buttons[student_answer[i][j]];
                element.getElementsByClassName("genotype-block-container")[i].getElementsByClassName("change-genotype")[j].setAttribute("state", student_answer[i][j]);
            }
        }

        if($("span.message", element)){
          if( $("span.message", element).text() != ""){
            try{
            var statuses = JSON.parse($("span.message",element).text());
            if(statuses.length > 0){
                for(var i = 0; i < statuses.length; i++){
                    if(statuses[i].status){
                        $(".genotype-block-container", element)[i].classList.add("genotype-correct");
                    }
                    else{
                        $(".genotype-block-container", element)[i].classList.add("genotype-incorrect");
                    }
                }
            }
            }
            catch(e){
                console.log("Ошибка: ", e);
            }
          }
        }
        $(document).ready(function(){$("input[type=text]", element).hide()});
        $(document).ready(function(){$("span.message", element).hide()});
        $(document).ready(function(){$("#genotype_task_input", element).hide()});
    }
    
    var css = ".change-genotype{/*color:#4c4c51;background: #f9f9f9; margin: 1px;*/ width: 42px !important; height: 36px !important;display: table;}";
    css += ".change-genotype:hover{background: #eeeeee; cursor: pointer;}"
    css += ".genotype-letter{display:table-cell !important; vertical-align:middle !important; text-align:center !important; font-size: 2em; user-select: none;}";
    css += ".genotype-block-container{    color: #4c4c51; display:inline-flex !important;margin: 3px;}";
    
    css += ".genotype-correct{border-bottom: 3px solid rgba(0, 155, 0, 1); background: rgba(0, 155, 0, 0.30)}"
    css += ".genotype-incorrect{border-bottom: 3px solid rgba(203, 7, 18, 1); background: rgba(203, 7, 18, 0.25);}"
    
    css += ".genotype-task{min-height: 44px;}"
    css += ".empty-letter{opacity: 0.5;}"
    
    css +=".subsidiary-element{display: inline-flex !important;margin: 3px 0px;}"

    var style = document.createElement("style")
    style.id = "genotype_task_style";
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    if (!document.querySelector("style#genotype_task_style")) document.querySelector("head").appendChild(style);
}

GenotypeTaskActivation(".genotype-task");
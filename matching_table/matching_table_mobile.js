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
    //$("#conf-id",element).shuffleChildren();
    $(".matching_table").hide().fadeIn(500);

    this.element = element;

    var answer = new Answer(element.querySelector("#matching_table_input").querySelector("input[type='text']"));
    console.log(document.querySelectorAll('.conf-answers-place'))
    const sortable = new Sortable.default(
        document.querySelectorAll('.conf-answers-place'), {
            draggable: '.conf-item',
            delay: 0,
            mirror: {
                constrainDimensions: true,
            },
        }
    )

    sortable.on('drag:start', (evt) => {
        console.log(sortable.getDraggableElementsForContainer(sortable.containers[1]).length);
        console.log('drag:start');
    })
    sortable.on('drag:over', (evt) => {
        // console.log('drag:over');
    })
    sortable.on('drag:out', (evt) => {
        // console.log('drag:out');
    })
    sortable.on('drag:move', (evt) => {
//         console.log('drag:move', evt);
    })
    sortable.on('drag:over:container', (evt) => {
        // $(evt.data.overContainer).css("border","2px dashed #b2b2b2");
    })
    sortable.on('drag:out:container', (evt) => {
        // $(evt.data.overContainer).css("border","");
    })
    sortable.on('drag:pressure', (evt) => {
        // console.log('drag:pressure');
    })
    sortable.on('drag:stop', (evt) => {
        console.log('drag:stop');
        // $(evt.data.source.parentNode).css("border","");
        /*
            Здесь присваиваем ответ
        */

        setAnswer();
    })
    sortable.on('sortable:sort', (evt) => {
        var capacity = evt.data.dragEvent.data.overContainer.getAttribute("capacity");
        var count = sortable.getDraggableElementsForContainer(evt.data.dragEvent.data.overContainer).length;
        console.log(count, " ", capacity);
        if (!isNaN(capacity)){
            capacity = parseInt(capacity)
            if(capacity == count){
                evt.cancel();
            }
        }
        // console.log('drag:sort', );
    })
    /*
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
    */
    function setAnswer(){
        var problem =  $("#" + element.id).closest(".problem");
        var checkButton = $("button.submit", problem);
        checkButton.removeClass("is-disabled");
        checkButton.disabled = false;
        $(checkButton).removeAttr("disabled");

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

        // $(document).ready(function(){$("input[type=text]", element).hide()});
        // $(document).ready(function(){$("span.message", element).hide()});
    }


    var css = `
    .conf-text{
        text-align: center !important;
        padding: 5px !important;
        font-family: 'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
    }

    .conf-all-answers{
        min-height: 60px;
        justify-content: flex-start;
        align-content: flex-start;
        align-items: flex-start;
        display: flex;
        flex-flow: row wrap;
    }

    .conf-table td{
        border: 1px solid #b2b2b2;
    }

    .conf-table{
        width:100%;
    }

    .conf-answers-place{
        min-width: 250px;
        padding: 0px 0px !important;
        background: #9a9a9a23;
        }


    .conf-item{
        max-height: 120px;
        vertical-align: middle;
        border: 1px solid #b2b2b2;;
        margin: 2px;
        text-align: center;
        cursor: move;
        padding: .6rem;
        flex: 0 0 auto;
        box-shadow: 0 0.1rem 1rem rgba(0,0,0,0.1), 0 0 0.5rem rgba(0,0,0,0.1);
        z-index: 2;
        overflow: auto;
        border-radius: 0.2rem;
        background-color: #fff;
        box-sizing: border-box;
        margin: 0.5rem 0.5rem 0.5rem 0.5rem;
    }

    .conf-all-answers.ones > * {
        flex-basis: calc(100% / 1 - 1rem);
    }

    .conf-all-answers.halfs > * {
        flex-basis: calc(100% / 2 - 1rem);
    }

    .conf-all-answers.thirds > * {
        flex-basis: calc(100% / 3 - 1rem);
    }

    .conf-all-answers.fourths > * {
        flex-basis: calc(100% / 4 - 1rem);
    }

    .conf-all-answers.fifths > * {
        flex-basis: calc(100% / 5 - 1rem);
    }

    .conf-all-answers.sixths > * {
        flex-basis: calc(100% / 6 - 1rem);
    }

    .conf-all-answers.sevenths > * {
        flex-basis: calc(100% / 7 - 1rem);
    }

    .conf-all-answers.eigths > * {
        flex-basis: calc(100% / 8 - 1rem);
    }

    .draggable-source--is-dragging {
        opacity: 0.3;
    }

    .draggable-container--over {
        animation: none;
                /*draggablePulseBg cubic-bezier(0.22, 0.61, 0.36, 1) 1500ms infinite;*/
    }

    .draggable-mirror {
        position: absolute;
        /*padding: 1rem;*/
        background-color: #fff;
        -webkit-transition: all 0ms;
        -moz-transition: all 0ms;
        -o-transition: all 0ms;
        transition: all 0ms;
        overflow: auto;
        box-shadow: 0 0.4rem 3rem rgba(0, 0, 0, 0.35), 0 0.1rem 0.5rem rgba(0, 0, 0, 0.2);
        border-radius: 0.2rem;
        z-index: 10;
        cursor: move;
        -webkit-transition: top 0ms left 0ms;
        -moz-transition: top 0ms left 0ms;
        -o-transition: top 0ms left 0ms;
        transition: top 0ms left 0ms;
    }

    .draggable-source--placed {
        animation: none;
                /*placedItem cubic-bezier(0.22, 0.61, 0.36, 1) 0.5s;*/
    }
`;

    /*var css = "#" + element.id + " .capa_inputtype{text-align: center !important;}";
    css += ".conf-text{text-align: center !important;padding: 5px !important;font-family: 'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;}";
    css += ".conf-wrong-cell{border: 2px solid rgb(178, 6, 16) !important;}";
    css += ".conf-all-answers{min-height: 60px}";
    css += ".conf-table td{border: 1px solid #b2b2b2;}";
    css += ".conf-table{width:100%}";
    css += "td.conf-answers-place{min-width: 250px; padding: 0px 0px !important;}";
    css += ".conf-item{max-height: 120px;vertical-align: middle;background: #f3f3f3;border: 1px solid #b2b2b2;;margin: 2px;padding: 3px;text-align: center;cursor: move;}";
    css += ".conf-answers-place{background: #f9f9f9;}";
	css += "#" + element.id + " .conf-table td { padding: 5px 0px !important;}";
	css += "#" + element.id + " div.table-header{padding: 5px;}";
    // css +=".message-about-grade{text-align: center;font-size: 1.2em;}";
    css += "#" + element.id + " input[type=text]{display:none}";
    css += "#" + element.id + " span.message{display:none}";
    */
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

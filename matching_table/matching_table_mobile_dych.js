/*
*
* дать таблице класс top-items - перетаскивающиеся блоки будут прижиматься к верху
*
* */

if (MatchingTableObjects == undefined) var MatchingTableObjects = {};

function MatchingTableActivation(selector) {
    Array.prototype.filter.call(document.querySelectorAll(selector), function (element) {
        return element.dataset.status == undefined
    }).forEach(function (element, i, array) {
        MatchingTableObjects[element.id] = (new MatchingTableObjects(element, element.getAttribute("data")));
        element.dataset.status = "activate";
    });
    setTimeout(function () {
        MatchingTableActivation(selector)
    }, 1000);
}

function Answer(elementField) {
    this.elementField = elementField;
    this.fieldValue = "";
    this.fieldObject = {};
    this.get = function () {
        this.fieldValue = elementField.value;
        return this.fieldValue;
    };
    this.set = function (value) {
        if (value == undefined) value = this.fieldValue;
        elementField.value = value;
    };
    this.getJSON = function () {
        if (this.isJsonString(this.get())) this.fieldObject = JSON.parse(this.get());
        return this.fieldObject;
    };
    this.setJSON = function (object) {
        if (object == undefined) object = this.fieldObject;
        this.set(JSON.stringify(object))
    };
    this.isJsonString = function (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };
};

$.fn.shuffleChildren = function () {
    $.each(this.get(), function (index, el) {
        var $el = $(el);
        var $find = $el.children();

        $find.sort(function () {
            return 0.5 - Math.random();
        });

        $el.empty();
        $find.appendTo($el);
    });
};

function MatchingTableObjects(element, data) {

    this.lang = "ru";

    this.translations = {
        ru: {
            correct_answers_label: "",
        },
        en: {
            correct_answers_label: "",
        }

    }

    if (data) {
        try {
            a = JSON.parse(data);
            if (a.lang) {
                this.lang = a.lang;
            }
        } catch (e) {
            console.log(e);
        }
    }

    //Перемешать незадействованные элементы

    //
    $('.conf-all-answers', element).each(function(){
        $(this).shuffleChildren();
    });
    //

    $(".matching_table").hide().fadeIn(500);

    this.element = element;

    var answer = new Answer(element.querySelector("#matching_table_input").querySelector("input[type='text']"));

    $(element).closest('.problem').find('.submit.btn-brand').hide();

    $(element).closest('.problem').find('.submit-attempt-container').css("text-align", "center");
    $(element).closest('.problem').find('.submit.btn-brand').css("float", "none");
    //

    console.log($(element).closest('.problem').find('.submit.btn-brand'))

    var current_step = 1;


    const sortable = new Sortable.default(
        this.element.querySelectorAll('.conf-answers-place.conf-inputable'), {
            draggable: '.conf-item.conf-draggable',
            delay: 0,
            mirror: {
                constrainDimensions: true,
            },
        }
    )

    // sortable.on('drag:start', (evt) => {
    // })
    // sortable.on('drag:over', (evt) => {
    // })
    // sortable.on('drag:out', (evt) => {
    // })
    // sortable.on('drag:move', (evt) => {
    // })
    // sortable.on('drag:over:container', (evt) => {
    // })
    // sortable.on('drag:out:container', (evt) => {
    // })
    // sortable.on('drag:pressure', (evt) => {
    // })
    sortable.on('drag:stop', (evt) => {
        setAnswer();
        $(".conf-table .conf-answers-place", element).removeClass("conf-wrong-cell");
        if ($("#tr-" + current_step + " .conf-inputable .conf-item", element).not(".draggable-mirror").not(".draggable--original").length > 0) {
            $("#choiser-" + current_step + " button", element).removeAttr("disabled");
        } else {
            $("#choiser-" + current_step + " button", element).attr("disabled", "disabled");
        }
        // console.log()


    })
    sortable.on('sortable:sort', (evt) => {
        var capacity = evt.data.dragEvent.data.overContainer.getAttribute("capacity");
        var count = sortable.getDraggableElementsForContainer(evt.data.dragEvent.data.overContainer).length;

        if (!isNaN(capacity)) {
            capacity = parseInt(capacity)
            if (capacity == count) {
                evt.cancel();
            }
        }
    })

    function setAnswer() {
        var problem = $("#" + element.id).closest(".problem");
        var checkButton = $("button.submit", problem);
        checkButton.removeClass("is-disabled");
        checkButton.disabled = false;
        $(checkButton).removeAttr("disabled");

        var student_answer = {};

        $(".input-place.conf-answers-place", element).map(function (indx, item) {
            item_id = $(item).attr("id");
            student_answer[item_id] = $(item).find(".conf-item").map(function (index, sub_item) {

                if (sub_item.classList.contains('draggable--original') || sub_item.classList.contains('draggable--mirror')) {

                    console.log()

                } else {
                    return $(sub_item).attr("id")
                }

            }).get();

            student_answer[item_id] = student_answer[item_id].filter((el, i, a) => i === a.indexOf(el))

        }).get();

        console.log(student_answer);
        answer.setJSON({answer: student_answer});

    }

    if (answer.get()) {
        var student_answer = answer.getJSON()["answer"];
        for (key in student_answer) {
            for (l in student_answer[key]) {
                $("#" + key, element).append($("#" + student_answer[key][l], element));
            }
        }

        if ($("span.message", element)) {
            if ($("span.message", element).text() != "") {
                var wrongCells = JSON.parse($("span.message", element).text())["wrong_cells"];
                var message = JSON.parse($("span.message", element).text())["message"];
                for (cellId in wrongCells) {
                    $(".conf-table #" + wrongCells[cellId], element).addClass("conf-wrong-cell");
                }
                // $(".message-about-grade", element).html(message);
            }
        }

        $(document).ready(function () {
            $("input[type=text]", element).hide()
        });
        $(document).ready(function () {
            $("span.message", element).hide()
        });

        $('.trka', element).show();
        $('.choiser', element).hide();

        $(".conf-draggable", element).each(function (j, tr) {
            $(tr).removeClass("conf-draggable");
        });

    }
    else{

        $(".conf-all-answers", element).each(function (i, item) {
            var all_answers_item = item.closest(".choiser");

            if (i + 1 != $(".conf-all-answers", element).length) {

                var next_btn_wrap = $("<div>", {class: "next-btn-wrap"}).appendTo(all_answers_item);

                var next_btn = $('<button/>', {
                    id: '',
                    "class": 'btn-brand',
                    text: 'Далее',
                    disabled: "disabled",
                }).appendTo(next_btn_wrap);

                next_btn.click(function () {
                    var next_choiser_id = $(all_answers_item).attr('next-choiser');
                    var next_tr_id = $(all_answers_item).attr('next-tr');
                    var current_tr_id = $(all_answers_item).attr('current-tr');

                    $("#" + current_tr_id + " .conf-inputable", element).attr("capacity", "0");
                    $("#" + current_tr_id + " .conf-draggable", element).each(function (j, tr) {
                        $(tr).removeClass("conf-draggable");
                    });

                    $(all_answers_item).hide(500);
                    $("#" + next_choiser_id, element).show(500);

                    if(next_tr_id == 'tr-5'){
                        $('#lol_tr', element).show();
                    }

                    $("#" + next_tr_id, element).show(500);
                    current_step += 1;

                    //console.log();
                    if (current_step == $(".conf-all-answers", element).length) {
                        $(element).closest('.problem').find('.submit.btn-brand').css("display", "initial");
                        $(element).closest('.problem').find('.submit.btn-brand').show();
                    }
                });
            }
            else{
                //

            }
        });

    }

    var css = `
    
    .next-btn-wrap{
        text-align: center;
        padding: 20px;
    }
    
    .conf-text{
        text-align: center !important;
        padding: 5px !important;
        font-family: 'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
    }

    .conf-all-answers{
        min-width: 250px;
        min-height: 80px;
        justify-content: flex-start;
        align-content: flex-start;
        align-items: initial;
        display: flex;
        flex-flow: row wrap;
        border: 1px solid #b2b2b2;
    }

    .conf-table td, .conf-table th{
        border: 1px solid #b2b2b2;
    }
    
    .conf-header{
        font-style: italic !important;
        /* font-weight: bold !important; */
        background: #ececec;
    }

    .conf-table{
        width:100%;
    }

     .conf-answers-place{
        padding: 0px 0px !important;
        /*background: #9a9a9a23;*/
        line-height: normal !important;
        /* vertical-align: baseline !important;*/
     }

    .top-items td.conf-answers-place{
        vertical-align: baseline !important;
    }

    .conf-item{
        max-height: 390px;
        vertical-align: middle;
        border: 1px solid #b2b2b2;;
        margin: 2px;
        text-align: center;
        font-size: 80%;
        padding: .6rem;
        flex: 0 0 auto;
        box-shadow: 0 0.1rem 1rem rgba(0,0,0,0.1), 0 0 0.5rem rgba(0,0,0,0.1);
        z-index: 2;
        overflow: auto;
        border-radius: 0.2rem;
        background-color: #fff;
        box-sizing: border-box;
        margin: 0.5rem 0.5rem 0.5rem 0.5rem;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        line-height: normal !important;
    }
    
    .conf-item.conf-draggable{
            cursor: pointer;
    }
    
    .disable-marker {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
        
    .conf-item.conf-draggable:hover {
            transform: scale(1.01);
            box-shadow: 0 0.25rem 2rem rgba(0, 0, 0, 0.25), 0 0.1rem 0.5rem rgba(0, 0, 0, 0.15);
            z-index: 3;
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
    
    
    .detailed-solution-header{
        border-left: 5px solid #009b01;
        padding: 10px;
        color: #009b01;
        background: whitesmoke;
        border-radius: 4px;
    }
    
    .detailed-solution-header h1{
        margin-bottom: 0.11575em !important;
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
    
    
        .draggable-container--over {
            animation: draggablePulseBg cubic-bezier(0.22, 0.61, 0.36, 1) 1500ms infinite;
        }
        
        @-moz-keyframes draggablePulseBg {
            0% {
                background-color: transparent;
                outline: solid 0.1rem transparent;
            }
            35% {
                background-color: rgba(0, 0, 0, 0.05);
                outline: solid 0.1rem rgba(0, 0, 0, 0.1);
            }
            100% {
                background-color: transparent;
                outline: solid 0.1rem transparent;
            }
        }

        @-webkit-keyframes draggablePulseBg {
            0% {
                background-color: transparent;
                outline: solid 0.1rem transparent;
            }
            35% {
                background-color: rgba(0, 0, 0, 0.05);
                outline: solid 0.1rem rgba(0, 0, 0, 0.1);
            }
            100% {
                background-color: transparent;
                outline: solid 0.1rem transparent;
            }
        }

        @-o-keyframes draggablePulseBg {
            0% {
                background-color: transparent;
                outline: solid 0.1rem transparent;
            }
            35% {
                background-color: rgba(0, 0, 0, 0.05);
                outline: solid 0.1rem rgba(0, 0, 0, 0.1);
            }
            100% {
                background-color: transparent;
                outline: solid 0.1rem transparent;
            }
        }

        @keyframes draggablePulseBg {
            0% {
                background-color: transparent;
                outline: solid 0.1rem transparent;
            }
            35% {
                background-color: rgba(0, 0, 0, 0.05);
                outline: solid 0.1rem rgba(0, 0, 0, 0.1);
            }
            100% {
                background-color: transparent;
                outline: solid 0.1rem transparent;
            }
        }
        
        .conf-wrong-cell{
            border: 2px solid rgb(178, 6, 16) !important;
        }
`;


    css += "#" + element.id + " .capa_inputtype{text-align: center !important;}";
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

script = document.createElement('script');
script.id = 'pdfjs';
script.src = 'http://mozilla.github.io/pdf.js/build/pdf.js';
script.type = 'text/javascript';
document.head.appendChild(script);

function PresentaionActivation(selector) {
    Array.prototype.filter.call(document.querySelectorAll(selector), function(element) {
        return element.dataset.status == undefined
    }).forEach(function(element, i, array) {
        PresentaionObjects[element.id] = (new PresentaionObjects(element, element.getAttribute("data")));
        element.dataset.status = "activate";
    });
    setTimeout(function() {
        PresentaionActivation(selector)
    }, 1000);
}

script.onload = function () {
    PresentaionActivation(".presentation-block");
};

if (PresentaionObjects == undefined) var PresentaionObjects = {};

function PresentaionObjects(element, data){
    this.element = element;

    var url = this.element.dataset.src;
    var size = (this.element.dataset.size || "16x9").toLowerCase();
    filename_pdf = url.split("/")[url.split("/").length-1];
    $(element).html("");


    function createElement(name, id, classList, attributes) {
        var element = document.createElement(name);
        if (id) element.id = id;
        if (classList) element.classList = classList;
        if (attributes) {
            for (attribute in attributes) {
                element.setAttribute(attribute, attributes[attribute])
            }
        }
        return element;
    }


    var wrap = $('<div/>', {
        class: "presentation-wrap"
    });

    var canvas_block = $('<canvas/>', {
        id: "the_canvas",
    }).appendTo(wrap);

    var nav = $('<div/>', {
        class:'buttons-block'
    });

    var button_previous = $('<button/>', {
        class: 'sequence-nav-button button-previous',
        html: '<span class="icon fa fa-chevron-prev" aria-hidden="true"></span><span>Назад</span>'
    }).appendTo(nav);

    var page_input = $('<input/>', {
        class: 'page-input',
    }).appendTo(nav);

    var page_count = $('<span/>', {
        class: 'page-count',
    }).appendTo(nav);

    var button_next = $('<button/>', {
        class: 'sequence-nav-button button-next',
        html: '<span>Вперёд</span><span class="icon fa fa-chevron-next" aria-hidden="true"></span>'
    }).appendTo(nav);

    var download_block = $('<p/>', {
        class: "download-block",
        text: "Скачать в формате: "
    });

    var download_pdf = $('<a/>', {
        class: 'download-link',
        text: 'PDF',
        href: url,
        download: filename_pdf
    }).appendTo(download_block);

    var pres_n_buttons = $('<div/>', {
        class: "presentation-n-buttons",
    });

    $(wrap).appendTo(pres_n_buttons);
    $(nav).appendTo(pres_n_buttons);
    $(pres_n_buttons).appendTo(element);
    $(download_block).appendTo(element);

    $(page_input).on('input', function() {
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    });

    $(page_input).bind('blur keyup',function(e) {
        if (e.type === 'blur' || e.keyCode === 13){
            var page_candidate = Number(this.value);
            if (page_candidate >= 1 && pdfDoc.numPages >= page_candidate){
                pageNum = page_candidate;
                queueRenderPage(pageNum);
            }
            else{
                alert("Значение должно быть в диапазоне от 1 до " + pdfDoc.numPages + ".")
                $(page_input).val(pageNum);
            }
        }
    });

    pdfjsLib.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

    var canvas = $("#the_canvas", wrap)[0];
    var pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 2,
        ctx = canvas.getContext('2d');

    function renderPage(num) {
        pageRendering = true;
        pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport(scale);
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            if(size == "a4"){
                $('.buttons-block', element).css("background:", "#e9e9e9eb");
                $('.buttons-block', element).css("border-radius", "8px");
                $('.buttons-block', element).css('position','sticky');
                $('.buttons-block', element).css('position','-webkit-sticky');
                $('.buttons-block', element).css('box-shadow', '0 2px 6px #7b7b7b');
                $('.buttons-block', element).css('bottom', '10px');
                $('.buttons-block', element).css('width', 'calc(100% - 12px)');
                $('.presentation-n-buttons', element).css('padding-bottom', '8px')
                // $('#the_canvas', element).css('width:', 'calc(90vh - 45px)')
            }
            else{
                canvas_block.css("height", "calc(90vh - 45px)");
                $('canvas', element).css('max-height', $('.presentation-wrap', element).width() * viewport.viewBox[3]/viewport.viewBox[2]);
                window.onresize = function(event) {
                    $('canvas', element).css('max-height', $('.presentation-wrap', element).width() * viewport.viewBox[3]/viewport.viewBox[2]);
                };
            }
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);

            renderTask.promise.then(function() {
                pageRendering = false;
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
        });
        $('.button-next', element).removeClass("disabled");
        $('.button-previous', element).removeClass("disabled");

        $('.page-input', element)[0].value=num;
        if(num == 1){
            $('.button-previous', element).addClass("disabled");
        }
        if(num == pdfDoc.numPages){
            $('.button-next', element).addClass("disabled");
        }
        $(page_input).blur();
        $(button_previous).blur();
        $(button_next).blur();
    }

    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }
    function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    }
    function onNextPage() {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    }
    $('.button-previous', element).click(function() {
        onPrevPage();
        if(size=="a4"){
            $([document.documentElement, document.body]).animate({
                scrollTop: $('.presentation-wrap', element).offset().top
            }, 500);
        }
    });
    $('.button-next', element).click(function() {
        onNextPage();
        if(size=="a4"){
            $([document.documentElement, document.body]).animate({
                scrollTop: $('.presentation-wrap', element).offset().top
            }, 500);
        }
    });

    pdfjsLib.getDocument(url).then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        $('.page-count', element).text("/"+pdfDoc.numPages);
        renderPage(pageNum);
    }).catch(function(e) {
        $(element).html('<div class="presentation-error">Произошла ошибка загрузки презентации, попробуйте перезагрузить страницу.<br>Если ошибка сохраняется, обратитесь в техническую поддержку.</div>');
    });

    var css = ".presentation-block .download-block{-moz-user-select: none;-khtml-user-select: none;user-select: none;  padding-top: 8px;font-size: 1.1em !important;text-align: right}";
    css += ".presentation-block .download-link{background: #f3f3f2;padding: 4px 6px;border-radius: 5px;margin: 0px 4px;}";
    css += ".presentation-block .download-link:hover {background: #dcdcdc;}";
    css += ".presentation-block .presentation-wrap{background: white;}";
    css += ".presentation-block .presentation-wrap canvas{max-width: 100%;margin: 0 auto;display:block;min-height: 200px;}";
    css += ".presentation-block .buttons-block{margin: 0 auto; height: 45px;display: flex;background: #e9e9e9;padding: 6px 0px;width: 100%;bottom: 0px;justify-content: center;}";
    css += ".presentation-block {position: relative;margin: 10px 0;max-width: 500px;}";
    css += ".presentation-block .presentation-n-buttons {border: 2px solid #e9e9e9;}";
    css += ".presentation-block .sequence-nav-button {-moz-user-select: none;-khtml-user-select: none;user-select: none;margin: 0px 10px !important;}";
    css += ".presentation-block .page-input{text-align: center;width: 26px;padding: 2px;font-size: 1.3em;margin: 4px 0px;border-radius: 5px;border: 1px solid #c9c8c8;}";
    css += ".presentation-block .page-count{-moz-user-select: none;-khtml-user-select: none;user-select: none;font-size: 1.3em;display: inline-flex;align-items: center;padding-left: 3px;margin-bottom: 0px;font-family: sans-serif;word-break: normal;}";
    css+= ".presentation-block .presentation-error{height: 220px;background: #f9f9f9;font-size: 1.16em;display: flex;flex-direction: column;justify-content: center;align-items: center;border: 2px dashed #e9e9e9;text-align: center;}";

    var style = document.createElement("style")
    style.id = "presentation_css";
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    if (!document.querySelector("style#presentation_css")) document.querySelector("head").appendChild(style);
}

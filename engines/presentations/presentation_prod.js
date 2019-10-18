script = document.createElement('script');
script.id = 'pdfjs';
script.src = 'https://mozilla.github.io/pdf.js/build/pdf.js';
script.type = 'text/javascript';
document.head.appendChild(script);

const presentationSelectorClass = "presentation-block";

function PresentationActivation(selector) {
    Array.prototype.filter.call(document.querySelectorAll(selector), function(element) {
        return element.dataset.status == undefined
    }).forEach(function(element) {
        element.innerHTML = "";
        PresentationObjects[element.id] = (new PresentationObjects(element));
        element.dataset.status = "activate";
    });
    setTimeout(function() {
        PresentationActivation(selector)
    }, 1000);
}

function PresentationDefaulfViewerActivation(selector) {
    Array.prototype.filter.call(document.querySelectorAll(selector), function(element) {
        return element.dataset.status == undefined
    }).forEach(function(element) {
        element.innerHTML = "";
        PresentationObjects[element.id] = (new PresentationDefaulfViewerObjects(element));
        element.dataset.status = "activate";
    });
    setTimeout(function() {
        PresentationDefaulfViewerActivation(selector)
    }, 1000);
}

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

script.onload = function(){

    if (typeof pdfjsLib !== 'undefined'){
        PresentationActivation("." + presentationSelectorClass);
    }
    else{
        console.warn("Activate default pdf viewer.");
        PresentationDefaulfViewerActivation("." + presentationSelectorClass);
    }

};

function PresentationDefaulfViewerObjects(element){
    this.element = element;

    var presentation = {
        lang: (this.element.dataset.lang || "ru").toLowerCase(),
        size: (this.element.dataset.size || "16x9").toLowerCase(),
        url: this.element.dataset.src,
        filename: this.element.dataset.src.split("/")[this.element.dataset.src.split("/").length-1],
        current_page: (parseInt(this.element.dataset.currentPage) || 1),
        // pdfDoc: null,
    };

    const labels = translation[presentation.lang];

    let default_view_warn = createElement('p', null, null, null);
    default_view_warn.innerHTML = labels.default_view_warn;

    let defaultObject = createElement('object', null, "", {data: presentation.url, type: "application/pdf", width: "100%", height: "800px", });

    this.element.appendChild(default_view_warn);
    this.element.appendChild(defaultObject);
}

if (PresentationObjects == undefined) var PresentationObjects = {};

const translation = {
  ru: {
      next_btn_label: "Вперёд",
      prev_btn_label: "Назад",
      download_as_label: "Скачать в формате",
      value_range_msg: "Значение должно быть в диапазоне от 1 до ",
      default_view_warn: "Отображение pdf по умолчанию используется только на стороне Studio!",
      presentation_error_msg: "Произошла ошибка загрузки презентации, попробуйте перезагрузить страницу. Если ошибка сохраняется, обратитесь в техническую поддержку."
  },
  en: {
      next_btn_label: "Next",
      prev_btn_label: "Previous",
      download_as_label: "Download as",
      value_range_msg: "Value must be in the range 1 - ",
      default_view_warn: "Default pdf viewer used only for OpenEdx Studio!",
      presentation_error_msg: "There was an error loading the presentation, try reloading the page. If the error persists, contact technical support."

  }
};

function PresentationObjects(element){
    this.element = element;

    $(this.element).closest(".xblock").css("overflow-x", "initial");

    var presentation = {
        lang: (this.element.dataset.lang || "ru").toLowerCase(),
        size: (this.element.dataset.size || "16x9").toLowerCase(),
        url: this.element.dataset.src,
        filename: this.element.dataset.src.split("/")[this.element.dataset.src.split("/").length-1],
        current_page: (parseInt(this.element.dataset.currentPage) || 1),
        pdfDoc: null,
    };

    this.element.classList.add(presentation.size);
    const labels = translation[presentation.lang];

    let wrap = createElement('div', null, "presentation-wrap", null);

    let canvas_block = createElement('canvas', 'the_canvas', null, null);

    wrap.appendChild(canvas_block);

    let nav = createElement('div', null, "buttons-block", null);

    let button_previous = createElement('button', null, "sequence-nav-button button-previous", null);
    button_previous.innerHTML = '<span class="icon fa fa-chevron-prev" aria-hidden="true"></span><span>' + labels.prev_btn_label + '</span>';
    button_previous.onclick = onPrevPage;
    let button_next = createElement('button', null, "sequence-nav-button button-next", null);
    button_next.innerHTML = '<span>' + labels.next_btn_label + '</span><span class="icon fa fa-chevron-next" aria-hidden="true"></span>';
    button_next.onclick = onNextPage;

    let page_input = createElement('input', null, "page-input", null);
    page_input.value = presentation.current_page;
    let page_count = createElement('span', null, "page-count", null);

    let download_block = createElement('p', null, "download-block", null);
    let download_link = createElement('a', null, "download-link", {target: "_blank", href: presentation.url});
    download_link.innerHTML = labels.download_as_label + " " + "pdf";

    download_block.appendChild(download_link);

    page_input.onchange = function() {
        var page_candidate = Number(page_input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));

        if (page_candidate >= 1 && presentation.pdfDoc.numPages >= page_candidate){
            presentation.current_page = page_candidate;
            queueRenderPage(presentation.current_page);
        }
        else{
            alert(labels.value_range_msg + presentation.pdfDoc.numPages);
            page_input.value = presentation.current_page;
        }
    };

    nav.appendChild(button_previous);
    nav.appendChild(page_input);
    nav.appendChild(page_count);
    nav.appendChild(button_next);


    let pres_n_buttons = createElement('div', null, "presentation-n-buttons", null);

    pres_n_buttons.appendChild(wrap);
    pres_n_buttons.appendChild(nav);
    element.appendChild(pres_n_buttons);
    element.appendChild(download_block);

    // var pdfjsLib;
    pdfjsLib.workerSrc = './pdf.worker.js';
    // pdfjsLib.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

    var pageRendering = false,
        pageNumPending = null,
        scale = 2,
        ctx = canvas_block.getContext('2d');

    function renderPage(num) {
        pageRendering = true;
        presentation.pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport({scale:scale});
            canvas_block.height = viewport.height;
            canvas_block.width = viewport.width;

            if(presentation.size != "a4"){
                $(canvas_block).css("height", "calc(90vh - 45px)");
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
        page_input.value = num;
        button_previous.removeAttribute("disabled");
        button_next.removeAttribute("disabled");
        //
        // $('.page-input', element)[0].value=num;
        if(num == 1){
            button_previous.setAttribute("disabled", "disabled");
            // $('.button-previous', element).addClass("disabled");
        }
        if(num == presentation.pdfDoc.numPages){
            button_next.setAttribute("disabled", "disabled");

            // $('.button-next', element).addClass("disabled");
        }

        page_input.blur();
        button_previous.blur();
        button_next.blur();
    }

    function queueRenderPage() {
        let num = presentation.current_page;
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }
    function onPrevPage() {
        if (presentation.current_page <= 1) {
            return;
        }
        presentation.current_page--;
        queueRenderPage();
    }
    function onNextPage() {
        if (presentation.current_page >= presentation.pdfDoc.numPages) {
            return;
        }
        presentation.current_page++;
        queueRenderPage();
    }

    let loadingTask = pdfjsLib.getDocument(presentation.url);

    loadingTask.promise.then(function(pdfDoc_) {
        presentation.pdfDoc = pdfDoc_;
        page_count.innerHTML = " / " + presentation.pdfDoc.numPages;
        renderPage(presentation.current_page);
    }).catch(function(e) {
        $(element).html('<div class="presentation-error">' + labels.presentation_error_msg + '</div>');
    });

    var css = `
    .presentation-block {
        position: relative;
        margin: 10px 0;
        // max-width: 500px;
    }
    
    .presentation-block .presentation-n-buttons {
        border: 2px solid #e9e9e9;
        margin: 0 auto;
    }
    
    .presentation-block .presentation-n-buttons .presentation-wrap {
        background: white;
    }
    
    .presentation-block .presentation-n-buttons .presentation-wrap canvas {
        max-width: 100%;
        margin: 0 auto;
        display: block;
        min-height: 200px;
    }
    
    .presentation-block .presentation-n-buttons .buttons-block {
        margin: 0 auto;
        height: 45px;
        display: flex;
        background: #e9e9e9;
        padding: 6px 0px;
        width: 100%;
        bottom: 0px;
        justify-content: center;
    }
    
    .presentation-block .presentation-n-buttons .buttons-block .sequence-nav-button {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        margin: 0px 10px !important;
        min-width: 100px;
    }
    
    .presentation-block .presentation-n-buttons .buttons-block .page-input {
        text-align: center;
        width: 26px;
        padding: 2px;
        font-size: 1.3em;
        margin: 4px 0px;
        border-radius: 5px;
        border: 1px solid #c9c8c8;
    }
    
    .presentation-block .presentation-n-buttons .buttons-block .page-count {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        font-size: 1.3em;
        display: inline-flex;
        align-items: center;
        padding-left: 3px;
        margin-bottom: 0px;
        font-family: sans-serif;
        word-break: normal;
    }
    
    .presentation-block .download-block {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        padding-top: 8px;
        font-size: 1.1em !important;
        text-align: right;
    }
    
    .presentation-block .download-block .download-link {
        background: #f3f3f2;
        padding: 4px 6px;
        border-radius: 5px;
        margin: 0px 4px;
    }
    
    .presentation-block .download-block .download-link:hover {
        background: #dcdcdc;
    }
    
    .presentation-block .presentation-error {
        height: 220px;
        background: #f9f9f9;
        font-size: 1.16em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px dashed #e9e9e9;
        text-align: center;
    }
    
    .presentation-block.a4 .buttons-block {
        background: #e9e9e9eb;
        border-radius: 8px;
        position: sticky;
        position: -webkit-sticky;
        box-shadow: 0 2px 6px #7b7b7b;
        bottom: 10px;
        width: calc(100% - 12px);
    }
    
    .presentation-block.a4 .presentation-n-buttons {
        max-width: 830px;
        padding-bottom: 8px;
    }
    
    `;
    var style = document.createElement("style");
    style.id = "presentation_css";
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    if (!document.querySelector("style#presentation_css")) document.querySelector("head").appendChild(style);
}

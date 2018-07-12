pdfjs_script = document.createElement('script');
pdfjs_script.id = 'pdfjs';
pdfjs_script.src = 'https://mozilla.github.io/pdf.js/build/pdf.js';
pdfjs_script.type = 'text/javascript'
document.head.appendChild(pdfjs_script);

platformURL = "https://courses.openprofession.ru";

// pdfjs_script.onload = function() {
Array.prototype.map.call(document.getElementsByClassName('vert'), function(element) {
    console.log(element.dataset.id)
    var page_element_data = JSON.parse(element.dataset.id.replace(/^.+type@(.+)@(.+)/g, '{"type":"$1", "block_id":"$2"}'))
    if (page_element_data.type == 'video+block') {
    	page_element = $('#video_' + page_element_data.block_id)
        var video_presentation = new VideoPresentation(page_element);
        video_presentation.init();
    }
});
// }

function createElementHTML(name, id, classList, attributes) {
    var element = document.createElement(name);
    if (id) element.id = id;
    if (classList) element.classList = classList;
    if (attributes) {
        for (attribute in attributes) {
            element.setAttribute(attribute, attributes[attribute])
        }
    }
    return element;
};



function VideoPresentation(video) {
    this.init = function() {
    	console.log("video", video);
        var uploadsURL = platformURL + '/' + $$course_id.replace('course', 'asset') + '+type@asset+block@';
        //video.block_id = "test_settings"; //тестовый файл настроек
        var jsonURL = uploadsURL + "test_settings" + '.json';
        console.log(jsonURL);
        this.createModeButton();

        // $.getJSON(jsonURL, function(data) {
        //     presentationURL = uploadsURL + data["pdf_name"];
        //     addPresentation(presentationURL, data["time_codes"]);
        // }).fail(function(jqXHR) {
        //     if (jqXHR.status == 404) {
        //         console.error("JSON presentation file not found!");
        //     } else {
        //         console.error(jqXHR.status, "JSON download error!");
        //     }
        // });
    }

    // function addPresentation(presentation_url, time_codes) {
    //     var PDFJS = window['pdfjs-dist/build/pdf'];
    //     PDFJS.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

    //     console.log("presentation_url: " + presentation_url);

    //     var loadingTask = pdfjsLib.getDocument(presentation_url);
    //     loadingTask.promise.then(function(presentation_pdf) {
            // console.log("pdf loaded");
            // var video_player = $('#' + video.block_id).parent().parent();
            // console.log(video_player);
            // $(video_player).find('.secondary-controls').append(createModeButton(video_player));

            // var divPresentation = document.createElement('div');
            // divPresentation.classList.add('blockPresentation');
            // $(divPresentation).css({
            //     "height": "100%",
            //     "width": "100%",
            //     "position": "absolute",
            //     "top": "0px",
            //     "left": "0px",
            //     "background": "#b8ffa2",
            //     "display": "block"
            // });
            // $(divPresentation).html('<canvas style="width:100%" id = "the_canvas"></canvas>');
            // $("#" + video.block_id).parent().append(divPresentation)

            // var pageNum = 0,
            //     pageRendering = false,
            //     pageNumPending = null,
            //     canvas = $('#' + video.block_id).parent().find('#the_canvas')[0],
            //     ctx = canvas.getContext('2d');

            // var videoObject = $('#' + video.block_id).find('video')[0];
            // console.log("videoObject.currentTime", videoObject.currentTime);
            // renderPageFromTime(videoObject.currentTime);

            // videoObject.addEventListener('timeupdate', function() {
            //     console.log("timeupdate!");
            //     renderPageFromTime(this.currentTime);
            // });

            // function renderPageFromTime(current_time) {
            //     var array = time_codes.sort(function(a, b) {
            //         return a.time - b.time
            //     }).filter(function(element) {
            //         return element.time < current_time;
            //     });
            //     if (array.length > 0) {
            //         if (pageNum != array[array.length - 1].slide) {
            //             pageNum = array[array.length - 1].slide;
            //             if (pageNum <= presentation_pdf.numPages && pageNum >= 1) {
            //                 console.log("ljikb" + pageNum);
            //                 queueRenderPage(pageNum);
            //             }
            //         }
            //     } else {
            //         queueRenderPage(1);
            //     }
            // }

            // function queueRenderPage(num) {
            //     if (pageRendering) {
            //         pageNumPending = num;
            //     } else {
            //         renderPage(num);
            //     }
            // }

            // function renderPage(num) {
            //     pageRendering = true;
            //     presentation_pdf.getPage(num).then(function(page) {
            //         var viewport = page.getViewport(1);
            //         canvas.height = viewport.height;
            //         canvas.width = viewport.width;
            //         var renderContext = {
            //             canvasContext: ctx,
            //             viewport: viewport
            //         };
            //         var renderTask = page.render(renderContext);
            //         renderTask.promise.then(function() {
            //             pageRendering = false;
            //             if (pageNumPending !== null) {
            //                 renderPage(pageNumPending);
            //                 pageNumPending = null;
            //             }
            //         });
            //     });
            // }

    //     }, function(reason) {
    //         console.error("Ошибка загрузки презентации: " + reason);
    //     })
    // }

    this.createModeButton = function(){
	    var mode_button_container = createElementHTML('div', null, "view-mode menu-container", {"role":"application"});
	    var mode_button = createElementHTML('button', null, "control view-mode-button", null);
	    mode_button.innerHTML = "<span class='icon-fallback-img'><span class='icon fa fa-caret-right' aria-hidden='true'></span></span><span class='view-mode-button-value value'>Видеолекция</span>";
	    var list_menu = createElementHTML('ol', null, "view-modes menu", null);
	    list_menu.innerHTML = "<li data-view-mode='video' class='view-mode-is-active'><button class='control view-mode-option' tabindex='-1'>Видеолекция</button></li>";
	    list_menu.innerHTML += "<li data-view-mode='presentation'><button class='control view-mode-option' tabindex='-1'>Презентация</button></li>";
	    list_menu.innerHTML += "<li data-view-mode='video_presentation'><button class='control view-mode-option' tabindex='-1'>Совмещение</button></li>";
	    mode_button_container.appendChild(mode_button);
	    mode_button_container.appendChild(list_menu);
	    mode_button_container.onmouseover = function(event) {
		    mode_button_container.classList.add('is-opened');
		};
		mode_button_container.onmouseout = function(event) {
		     mode_button_container.classList.remove('is-opened');
		};


		view_mode_options = list_menu.getElementsByClassName("view-mode-option");
		for (var i=0; i < view_mode_options.length; i++) {
		    view_mode_options[i].onclick = function(e){
		    	for (var j=0; j < view_mode_options.length; j++) {
		           view_mode_options[j].parentNode.classList.remove("view-mode-is-active");
				}
				mode_button.getElementsByClassName("view-mode-button-value")[0].innerHTML = e.target.innerHTML;
				e.target.parentNode.classList.add("view-mode-is-active");
				mode_button_container.classList.remove('is-opened');
				console.log("setViewMode(" + e.target.parentNode.dataset.viewMode + ");");
			}
		}
		// console.log($(video).find('.secondary-controls'))
	    $(video).find('.secondary-controls').append(mode_button_container);
	}
}
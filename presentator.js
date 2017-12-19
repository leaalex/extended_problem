/*
Array.prototype.map.call(document.getElementsByClassName('vert'), function(element) {
    var obj = JSON.parse(element.dataset.id.replace(/^.+type@(.+)@(.+)/g, '{"type":"$1", "block_id":"$2"}'))
    if (obj.type === 'video+block') {
        console.log(obj)
    }
});
*/

addGlobalStyle = function(){
    style = document.createElement('link');
    style.id = 'GLOBAL_STYLE_URFU'
    style.rel = 'stylesheet';
    style.href = 'https://openedu.urfu.ru/files/openprofession/global_style.css';
    style.type = 'text/css';
    document.head.appendChild(style);
}()

script = document.createElement('script');
script.id = 'pdfjs';
script.src = '//mozilla.github.io/pdf.js/build/pdf.js';
script.type = 'text/javascript'
document.head.appendChild(script);

var style = document.createElement("style")
style.id = "video_presentation";
var css = ".presentation-is-active{background: #171a1b !important;color: #0ea6ec !important;}"
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
if (!document.querySelector("style#video_presentation")) document.querySelector("head").appendChild(style);


// $( "#sequence-list li button.seq_video" ).each(function() {
$("#sequence-list li button.seq_video").click(function() {
    function checkVideo(){
        console.log("lol");
        if($("video")){
            clearInterval(checkVideotimer);    
            var info_array = [];
            Array.prototype.map.call(document.getElementsByClassName('vert'), function(element) {
            var obj = JSON.parse(element.dataset.id.replace(/^.+type@(.+)@(.+)/g, '{"type":"$1", "block_id":"$2"}'))
                var m = new Modification(obj);
                m.init();
                info_array.push(obj);
            });
        }
    }
    checkVideotimer = setInterval(checkVideo, 50);
});
// });



window.onload = function() {
    // console.log("PDFJS 1: ",PDFJS.compatibilityChecked);
    var info_array = [];
    Array.prototype.map.call(document.getElementsByClassName('vert'), function(element) {
        var obj = JSON.parse(element.dataset.id.replace(/^.+type@(.+)@(.+)/g, '{"type":"$1", "block_id":"$2"}'))
        var m = new Modification(obj);
        m.init();
        info_array.push(obj);
    });
    console.log("onload");
}

function Modification(obj) {
    this.init = function() {
        if (obj.type === 'video+block') {
            var uploadsURL = '/' + $$course_id.replace('course', 'asset') + '+type@asset+block@';
            var jsonURL = uploadsURL + obj.block_id + '.json';
            var presentationURL;
            var pdfInformation = {};

            $.getJSON(jsonURL, function(data) {
                pdfInformation = data;
                presentationURL = "https://courses.openprofession.ru" + uploadsURL + pdfInformation["pdf_name"]
                startPresentation();
            }).fail(function(jqXHR) {
                if (jqXHR.status == 404) {
                    console.error("JSON presentation file not found!");
                } else {
                    console.log("JSON download error!");
                }
            });

            function startPresentation() {
                $('#video_' + obj.block_id).find('.presentation-button').remove();
                $('#video_' + obj.block_id).find('.blockPresentation').remove();
                $('#video_' + obj.block_id).find('.presentation-load-error').remove();
                var divPresentation = document.createElement('div');
                divPresentation.classList.add('blockPresentation');
                $(divPresentation).css({
                    "height": "100%",
                    "width": "100%",
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px",
                    "background": "white",
                    "display": "none"
                });
                var buttonPresentation = document.createElement('button');
                buttonPresentation.classList.add('control');
                buttonPresentation.classList.add('presentation-button');
                buttonPresentation.innerHTML = '<span class="icon fa fa-picture-o"></span> Презентация';
                $(divPresentation).html('<canvas style="width:100%" id = "the_canvas"></canvas>');
                $('#' + obj.block_id).parent().append(divPresentation);
                $('#video_' + obj.block_id).find('.secondary-controls').append(buttonPresentation);

                PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
                    
                var pdfDoc = null,
                    pageNum = 1,
                    pageRendering = false,
                    pageNumPending = null,
                    canvas = $('#' + obj.block_id).parent().find('#the_canvas')[0],
                    ctx = canvas.getContext("2d");

                function renderPage(num) {
                    pageRendering = true;
                    pdfDoc.getPage(num).then(function(page) {
                        var viewport = page.getViewport(1);
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
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
                        })
                    })
                }

                function queueRenderPage(num) {
                    if (pageRendering) {
                        pageNumPending = num;
                    } else {
                        renderPage(num);
                    }
                }

                function renderPageFromTime(current_time) {
                    var array = pdfInformation["time_codes"].sort(function(a,b){return a.time - b.time}).filter(function(element) {
                        return element.time < current_time;
                    });
                    console.log("array: ", array);
                    if (array.length > 0) {
                        if (pageNum != array[array.length - 1].slide) {
                            pageNum = array[array.length - 1].slide;
                                console.log("lolo ", pageNum);

                            if(pageNum <= pdfDoc.numPages && pageNum >= 1){
                                queueRenderPage(pageNum);
                                console.log("pageNum 1: ", pageNum);
                            }
                            else{
                                console.log("why?");
                            }
                        }
                        else{
                            queueRenderPage(pageNum);
                            console.log("pageNum 2: ", pageNum);

                        }
                        
                    }
                    else{
                        console.log("pageNum 3: ", pageNum);
                        renderPage(1);
                    }
                    console.log(pageNum)
               }

               // var timeupdater = false;

               //  if(timeupdater){
               //      console.log("timeupdater есть");
               //      clearInterval(timeupdater);
               //  }
               //  else{
               //      console.log("timeupdater нет");
               //  }

               // $( "#sequence-list li button" ).click(function() {
               //  console.log("timeupdater удалили");
               //  clearInterval(timeupdater);
               // });

                 // console.log("PDFJS 2: ",PDFJS.compatibilityChecked);
                PDFJS.getDocument(presentationURL).then(function(pdfDoc_) {
                    pdfDoc = pdfDoc_;
                    // console.log("timeupdater",timeupdater);
                    // if ($('#' + obj.block_id).get(0).tagName.toLowerCase() == "iframe") { // Видео с ютуба                        
                    //     var video = YT.get(obj.block_id);
                    //     renderPageFromTime(video.getCurrentTime());
                    //     function updateTime(){
                    //         console.log("update");
                    //         renderPageFromTime(video.getCurrentTime());
                    //     }
                    //     timeupdater = setInterval(updateTime, 500);

                    // } else { 

                    // Видео с местного сервака                        
                        var videoObject = $('#' + obj.block_id).find('video')[0];
                        console.log("videoObject.currentTime: ", videoObject.currentTime);
                        renderPageFromTime(videoObject.currentTime);
                        videoObject.addEventListener('timeupdate', function() {
                            renderPageFromTime(this.currentTime);
                        });
                    // }

                })
                .catch((ex) => {
                    console.log("ex", ex);
                    var errorMessage = document.createElement('p');
                    errorMessage.classList.add('presentation-load-error');
                    $(errorMessage).html("Произошла ошибка загрузки презентации.<br>Пожалуйста, обратитесь в техническую поддержку");
                    $(errorMessage).css({
                        "font-size": "1.4em",
                        "position": "absolute",
                        "right": 0,
                        "bottom": "45%", 
                        "left": 0, 
                        "text-align": "center", 
                        "margin": "auto"
                    });
                    $(divPresentation).append(errorMessage);
                });

                buttonPresentation.addEventListener('click', function() {
                    $(divPresentation).toggle();
                    $(buttonPresentation).toggleClass('presentation-is-active');
                });
            }

        }
    }
}

// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 


/*
Array.prototype.map.call(document.getElementsByClassName('vert'), function(element) {
    var obj = JSON.parse(element.dataset.id.replace(/^.+type@(.+)@(.+)/g, '{"type":"$1", "block_id":"$2"}'))
    if (obj.type === 'video+block') {
        console.log(obj)
    }
});
*/

addGlobalStyle = function(){
    style = document.createElement('link');
    style.id = 'GLOBAL_STYLE_URFU'
    style.rel = 'stylesheet';
    style.href = 'https://openedu.urfu.ru/files/openprofession/global_style.css';
    style.type = 'text/css';
    document.head.appendChild(style);
}()

script = document.createElement('script');
script.id = 'pdfjs';
script.src = '//mozilla.github.io/pdf.js/build/pdf.js';
script.type = 'text/javascript'
document.head.appendChild(script);

var style = document.createElement("style")
style.id = "video_presentation";
var css = ".presentation-is-active{background: #171a1b !important;color: #0ea6ec !important;}"
css += ".presentation-button{width: 140px;}";
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
if (!document.querySelector("style#video_presentation")) document.querySelector("head").appendChild(style);


$("#sequence-list li button.seq_video").click(function() {
    function checkVideo(){
        if($("video")){
            clearInterval(checkVideotimer);    
            var info_array = [];
            Array.prototype.map.call(document.getElementsByClassName('vert'), function(element) {
            var obj = JSON.parse(element.dataset.id.replace(/^.+type@(.+)@(.+)/g, '{"type":"$1", "block_id":"$2"}'))
                var m = new Modification(obj);
                m.init();
                info_array.push(obj);
            });
        }
    }
    checkVideotimer = setInterval(checkVideo, 50);
});



window.onload = function() {
    var info_array = [];
    Array.prototype.map.call(document.getElementsByClassName('vert'), function(element) {
        var obj = JSON.parse(element.dataset.id.replace(/^.+type@(.+)@(.+)/g, '{"type":"$1", "block_id":"$2"}'))
        var m = new Modification(obj);
        m.init();
        info_array.push(obj);
    });
}

function Modification(obj) {
    this.init = function() {
        if (obj.type === 'video+block') {
            var uploadsURL = '/' + $$course_id.replace('course', 'asset') + '+type@asset+block@';
            var jsonURL = uploadsURL + obj.block_id + '.json';
            var presentationURL;
            var pdfInformation = {};

            $.getJSON(jsonURL, function(data) {
                pdfInformation = data;
                presentationURL = "https://courses.openprofession.ru" + uploadsURL + pdfInformation["pdf_name"]
                startPresentation();
            }).fail(function(jqXHR) {
                if (jqXHR.status == 404) {
                    console.error("JSON presentation file not found!");
                } else {
                    console.error("JSON download error!");
                }
            });

            function startPresentation() {
                $('#video_' + obj.block_id).find('.presentation-button').remove();
                $('#video_' + obj.block_id).find('.blockPresentation').remove();
                $('#video_' + obj.block_id).find('.presentation-load-error').remove();
                var divPresentation = document.createElement('div');
                divPresentation.classList.add('blockPresentation');
                $(divPresentation).css({
                    "height": "100%",
                    "width": "100%",
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px",
                    "background": "white",
                    "display": "none"
                });
                var buttonPresentation = document.createElement('button');
                buttonPresentation.classList.add('control');
                buttonPresentation.classList.add('presentation-button');
                buttonPresentation.innerHTML = '<span class="icon fa fa-picture-o"></span> Презентация';
                $(divPresentation).html('<canvas style="width:100%" id = "the_canvas"></canvas>');
                $('#' + obj.block_id).parent().append(divPresentation);
                $('#video_' + obj.block_id).find('.secondary-controls').append(buttonPresentation);

                PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
                    
                var pdfDoc = null,
                    pageNum = 1,
                    pageRendering = false,
                    pageNumPending = null,
                    canvas = $('#' + obj.block_id).parent().find('#the_canvas')[0],
                    ctx = canvas.getContext("2d");

                function renderPage(num) {
                    pageRendering = true;
                    pdfDoc.getPage(num).then(function(page) {
                        var viewport = page.getViewport(1);
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
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
                        })
                    })
                }

                function queueRenderPage(num) {
                    if (pageRendering) {
                        pageNumPending = num;
                    } else {
                        renderPage(num);
                    }
                }

                function renderPageFromTime(current_time) {
                    var array = pdfInformation["time_codes"].sort(function(a,b){return a.time - b.time}).filter(function(element) {
                        return element.time < current_time;
                    });
                    if (array.length > 0) {
                        if (pageNum != array[array.length - 1].slide) {
                            pageNum = array[array.length - 1].slide;
                            if(pageNum <= pdfDoc.numPages && pageNum >= 1){
                                queueRenderPage(pageNum);
                            }
                        }
                    }
                    else{
                        queueRenderPage(1);
                    }
               }
               
                PDFJS.getDocument(presentationURL).then(function(pdfDoc_) {
                    pdfDoc = pdfDoc_;
                    // Видео с местного сервака                        
                        var videoObject = $('#' + obj.block_id).find('video')[0];
                        renderPageFromTime(videoObject.currentTime);
                        videoObject.addEventListener('timeupdate', function() {
                            renderPageFromTime(this.currentTime);
                        });
                })
                .catch((ex) => {
                    console.log("Произошла ошибка: ", ex);
                    var errorMessage = document.createElement('p');
                    errorMessage.classList.add('presentation-load-error');
                    $(errorMessage).html("Произошла ошибка загрузки презентации.<br>Пожалуйста, обратитесь в техническую поддержку");
                    $(errorMessage).css({
                        "font-size": "1.4em",
                        "position": "absolute",
                        "right": 0,
                        "bottom": "45%", 
                        "left": 0, 
                        "text-align": "center", 
                        "margin": "auto"
                    });
                    $(divPresentation).append(errorMessage);
                });

                buttonPresentation.addEventListener('click', function() {
                    $(divPresentation).toggle();
                    $(buttonPresentation).toggleClass('presentation-is-active');

                    var text = $(buttonPresentation).text();
                    if (buttonPresentation.classList.contains('presentation-is-active')){
                        buttonPresentation.innerHTML = '<span class="icon fa fa-video-camera"></span> Видеолекция';
                    }
                    else{
                        buttonPresentation.innerHTML = '<span class="icon fa fa-picture-o"></span> Презентация';
                    }

                });
            }

        }
    }
}
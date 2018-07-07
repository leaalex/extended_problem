var video_player = document.getElementsByClassName('video-player')[0];
var video = video_player.getElementsByTagName('video')[0];
var presentation = video_player.getElementsByClassName('blockPresentation')[0];
var presentation_canvas = presentation.getElementsByTagName('canvas')[0];
var view_mode =  video_player.parentNode.getElementsByClassName("view-mode")[0];
var view_mode_button = view_mode.getElementsByClassName("view-mode-button")[0];
var background_color = "#191a1b";
video_player.parentNode.style.background = background_color;
video.style["pointer-events"] = "none";
var video_container = document.createElement("div");
var parent = video.parentNode;
parent.insertBefore(video_container, video);
video_container.appendChild(video);
video_container.classList.add("video-container");
parent.insertBefore(presentation, video_container);
video_player.style.background = background_color;

var currentMode = "video";
var video_size_koef = 0.3;

function show_hide_menu(event) {
  if (event.type == 'mouseover') {
    view_mode.classList.add("is-opened");
  }
  if (event.type == 'mouseout') {
    view_mode.classList.remove("is-opened");
  }
}

view_mode_options = view_mode.getElementsByClassName("view-mode-option");
for (var i=0; i < view_mode_options.length; i++) {
    view_mode_options[i].onclick = function(e){
    	for (var j=0; j < view_mode_options.length; j++) {
           view_mode_options[j].parentNode.classList.remove("view-mode-is-active");
		}
		view_mode_button.getElementsByClassName("view-mode-button-value")[0].innerHTML = e.target.innerHTML;
		e.target.parentNode.classList.add("view-mode-is-active");
		view_mode.classList.remove("is-opened");
		setViewMode(e.target.parentNode.dataset.viewMode);
	}
}

var video_presentation_observer = new MutationObserver(function(mutations) {
    set_video_presentation_size();
});

var presentation_observer = new MutationObserver(function(mutations) {
    set_presentation_size();
});

observerConfig = { attributes: true, attributeFilter: ['style'] };

setViewMode(currentMode);



function setViewMode(mode){
	    currentMode = mode;
		if(mode == "video"){
			enable_video_mode();
			$("body").css("overflow", "auto");
		}
		else if(mode == "presentation"){
			enable_presentation_mode();
			$("body").css("overflow", "auto");
		}
		else if(mode == "video_presentation"){
			enable_video_presentation_mode();

			$("body").css("overflow", "hidden");
			$(video_player.parentNode).on('mouseenter', function(event) {
			if(currentMode == "video_presentation"){
	        	$("body").css("overflow", "hidden");
	        }
	    }).on('mouseleave', function() {
	        $("body").css("overflow", "auto");
		});
		}
		else{
			enable_video_mode();
			$("body").css("overflow", "auto");
		}
}

function enable_video_mode(){

  video_presentation_observer.disconnect();

  var custom_top = (document.getElementsByClassName("video-wrapper")[0].clientHeight - video_container.parentNode.clientWidth * 0.562 - document.getElementsByClassName("video-controls")[0].clientHeight-10)/2

  console.log(custom_top);
  video.style.top = custom_top > 0 ? custom_top+"px": "0px";

  setElementStyle(presentation.parentNode, {"height": "100%"});
  setElementStyle(presentation, {"display": "none"});
  setElementStyle(video, {"transform": "none", "position": "" });
  setElementStyle(video_container, {"display": "block", "position": "", "width": "100%"});
}

function enable_presentation_mode(){

	video_presentation_observer.disconnect();
	set_presentation_size();
	presentation_observer.observe(video, observerConfig);

	var custom_top = (document.getElementsByClassName("video-wrapper")[0].clientHeight - video_container.parentNode.clientWidth * 0.562 - document.getElementsByClassName("video-controls")[0].clientHeight-10)/2
	console.log("set custom_top" + custom_top);
    setElementStyle(video_container, {"display": "block", "position": "", "width": "100%"});

	presentation_canvas.style.position = window.getComputedStyle(video, null).getPropertyValue("position");

    setElementStyle(presentation_canvas, {"transform": "none", "height": video.style.height, "position": window.getComputedStyle(video, null).getPropertyValue("position"), "width": "auto", "margin": video.style.margin});
	setElementStyle(video_container, {"display": "none"});
	setElementStyle(presentation, {"left": "0px", "display": "block", "text-align": "center", "position": window.getComputedStyle(video_container, null).getPropertyValue("position") });
    var custom_left = (document.getElementsByClassName("video-wrapper")[0].clientWidth - presentation_canvas.clientWidth)/2
	presentation_canvas.style.top = custom_top > 0 ? custom_top+"px": "0px";
	presentation_canvas.style.left = custom_left+"px";

}

function enable_video_presentation_mode(){

	setElementStyle(presentation, {"display": "block"});
	setElementStyle(video_container, {"position": "absolute", "display": "block", "height": "100%"});

    set_video_presentation_size(video_size_koef);

    presentation_observer.disconnect();

	video_presentation_observer.observe(video, observerConfig);

}

function setElementStyle(element, style_dict){
	Object.assign(element.style, style_dict);
}

function set_presentation_size(){
    var new_height = Math.ceil(video_container.parentNode.clientWidth * 0.5625);
    console.log(new_height);

    if (presentation.closest("div.video").classList.contains('video-fullscreen')){
    	setElementStyle(video, {"position": "absolute"});
    	setElementStyle(presentation_canvas,  {"left": video.style.left});
    }
    else{
    	setElementStyle(video, {"position": "static"});
    	setElementStyle(presentation_canvas,  {"left": "0px"});
    }
	
	
	video_container.parentNode.style = new_height+"px";
	presentation_canvas.style.position = window.getComputedStyle(video, null).getPropertyValue("position");
	console.log("set_presentation_size отработал");
    setElementStyle(presentation_canvas, {"height": video.style.height,  "width": "auto", "margin": video.style.margin, "top": video.style.top});
}

function set_video_presentation_size(koef=video_size_koef){
	
	console.log("observer отработал");

    var new_width = Math.ceil(video_container.parentNode.clientWidth * koef);
    var new_height = Math.ceil(video_container.parentNode.clientWidth * 0.5625);

    setElementStyle(video_container.parentNode,{"height": new_height + "px"});
    setElementStyle(video_container, {"left": "3%", "width": new_width + "px"});
    setElementStyle(video, {"width": "100%", "top": "46%", "left": "0px", "width": "100%", "margin": "auto", "position": "absolute", "transform": "translateY(-50%)"})
    setElementStyle(presentation_canvas,  { "left": "0px", "width": "100%","height":"auto","top": "46%", "display": "block", "position": "absolute", "transform": "translateY(-50%) perspective(250px) scale(0.9) rotate3d(0, 1, 0, -2deg)"})
    setElementStyle(presentation,  {"background": "#191a1b", "position": "absolute", "left": new_width + "px", "right": "0px", "width": "auto", "height": "100%"})

    video_size_koef = koef;
}


video_player.parentNode.addEventListener("mousewheel", ScrollVideoHandler, false);
function ScrollVideoHandler(e) {
	if(currentMode == "video_presentation"){
	    e = e || window.event;
	    var delta = e.deltaY || e.detail || e.wheelDelta;
	    
	    if(video_size_koef >= 0 && video_size_koef <= 1){
	        if (delta > 0){
	            video_size_koef -= 0.1;
	            if(video_size_koef == 0){ video_size_koef = 0.1}
	            video_size_koef = Number((video_size_koef).toFixed(1));
	        }
	        else{
	            video_size_koef += 0.1;
	            if (video_size_koef == 1){ video_size_koef = 0.9}
	            video_size_koef = Number((video_size_koef).toFixed(1));
	        }
	    }
	    set_video_presentation_size(video_size_koef);
	}
}
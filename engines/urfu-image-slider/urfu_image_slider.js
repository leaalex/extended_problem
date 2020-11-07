let settings = {
    activation_class:  "urfu-image-slider",
}

function createElement(tag, classList, attrs, children) {
    let element = document.createElement(tag);
    if (classList) element.className = classList;
    if (attrs) {
        for (let key in attrs) {
            element.setAttribute(key, attrs[key])
        }
    }
    if (children) {
        children.forEach(function (child) {
            element.appendChild(child)
        });
    }
    return element;
}

function ImageSliderApp(block) {

    let use_buttons = block.dataset.buttons !== 'false';
    let use_progress  = block.dataset.progress !== 'false';
    let next_btn_label = block.dataset.prevButton || "Назад";
    let prev_btn_label = block.dataset.nextButton || "Вперед";
    let block_width = block.getAttribute('width') || "auto";
    block.style["max-width"] = block_width === "100%" ? "auto" : block_width;

    let images = Array.from(block.querySelectorAll("img"));
    let current_image = 0;

    images.forEach((img, img_idx) =>{
        img.style.display = "none";
        img.style.width = "100%";
        img.onclick = function (){
            toNextElement();
        }
    });

    let buttons_container = createElement("div", `${settings.activation_class}-buttons-container`, {}, )
    let progress = createElement("div", `${settings.activation_class}-progress`, {}, )

    let prev_btn = createElement("button", `${settings.activation_class}-prev-btn`, {}, )
    prev_btn.innerHTML = next_btn_label;
    prev_btn.onclick = toPrevElement;

    let next_btn = createElement("button", `${settings.activation_class}-prev-btn`, {}, )
    next_btn.innerHTML = prev_btn_label;
    next_btn.onclick = toNextElement;

    function toNextElement(){
        images[current_image].style.display = "none";
        current_image = current_image === images.length-1 ? current_image : current_image + 1
        images[current_image].style.display = "block";
        buttonsDisabledEnabled();
    }
    function toPrevElement(){
        images[current_image].style.display = "none";
        current_image = current_image === 0 ? 0 : current_image-1
        images[current_image].style.display = "block";
        buttonsDisabledEnabled();
    }
    function buttonsDisabledEnabled(){
        next_btn.removeAttribute("disabled");
        prev_btn.removeAttribute("disabled");
        if (current_image === 0){
            prev_btn.setAttribute("disabled", "disabled");
        }
        if (current_image === images.length - 1){
            next_btn.setAttribute("disabled", "disabled");
        }
        progress.innerHTML = `${current_image+1}/${images.length}`;
    }
    buttonsDisabledEnabled();

    block.onmouseout = function(event) {
        document.onkeydown = undefined;
    };
    block.onmouseover = function(event) {
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:
                    toPrevElement()
                    break;
                case 39:
                    toNextElement();
                    break;
            }
        };
    };


    if (use_buttons){
        buttons_container.append(prev_btn);
        if (use_progress) buttons_container.append(progress);
        buttons_container.append(next_btn);
        block.append(buttons_container)
    }
    images[current_image].style.display = "block";
}

let apps = {
    tasks: ImageSliderApp
}

function appsActivation(selector, i) {
    let appBlocks = [];
    appBlocks = [...appBlocks, ...document.querySelectorAll(selector)]
    appBlocks.filter(block => {
        return block.dataset.status === undefined
    }).forEach(block => {
        new apps["tasks"](block)
        block.dataset.status = 'activate'
    })
    setTimeout(function () {
        appsActivation(selector, i)
    }, 200)

}

appsActivation(`.${settings.activation_class}`, 0)

css = `
    .${settings.activation_class} {
        border: 1px solid #c8c8c8;
        border-radius: 6px;
        padding: 6px;
        
        -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75);
    }
    .${settings.activation_class} .${settings.activation_class}-buttons-container{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
    }
    
    .${settings.activation_class}-prev-btn, ${settings.activation_class}-next-btn{
        margin: 0 10px;
       
    }
    
    .${settings.activation_class}-progress{
        margin: 0 10px;
    }
    
    `
let style = createElement("style", "", {type: 'text/css'})
style.innerHTML = css;
document.querySelector("head").appendChild(style);

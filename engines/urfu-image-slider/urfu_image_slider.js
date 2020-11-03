let settings = {
    activation_class:  "urfu-image-slider",
    wrapper_class: "urfu-image-slider"
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
    block.style.border = "1px solid"
    block.style.width = block.getAttribute('width') || "900px";
    let images = Array.from(block.querySelectorAll("img"));
    let current_image = 0;

    images.forEach((img, img_idx) =>{
        img.style.display = "none";
        img.style.width = "100%";
        img.onclick = function (){
            images[current_image].style.display = "none";
            current_image = img_idx === images.length - 1 ? 0 : img_idx+1
            images[current_image].style.display = "block";
        }
    });

    let prev_btn = createElement("button", "prev-btn", {}, )
    prev_btn.innerHTML = "Previous";
    prev_btn.onclick = function (){
        images[current_image].style.display = "none";
        current_image = current_image === 0 ? 0 : current_image-1
        images[current_image].style.display = "block";
    }

    let next_btn = createElement("button", "prev-btn", {}, )
    next_btn.innerHTML = "Next";
    next_btn.onclick = function (){
        images[current_image].style.display = "none";
        current_image = current_image === images.length-1 ? current_image : current_image + 1
        images[current_image].style.display = "block";
    }

    block.append(prev_btn);
    block.append(next_btn);
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

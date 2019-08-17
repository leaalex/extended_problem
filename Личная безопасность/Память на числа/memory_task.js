function MemoryTask(settings) {

    let data = settings.data;
    let element = settings.element;
    let student_state = {};

    let language = "ru";
    let labels = {
        ru: {
            start_label: "Начать"
        },
        en:{
            start_label: "Начать"
        }
    };

    let user_labels = labels[language];

    let MemoryTaskInit = {
        init: function () {
            console.log(data, element);
            this.buildStart();
        },

        buildStart: function () {
            let start_wrap = utils.create("div", {className: "start-wrapper"});
            let start_btn = utils.create("button", {className: "", text: user_labels.start_label});
            start_btn.onclick = function (evt) {
                console.log("Начали");
            };
            start_wrap.appendChild(start_btn);
            element.appendChild(start_wrap);
        }

    };

    let utils = {
        create: function (tag, {id, className, text, html, attr, style, data}, ...array) {
            let element = document.createElement(tag);
            if (id) element.id = id;
            if (className) element.className = className;
            if (text) element.innerText = text;
            if (html) element.innerHTML = html;
            if (attr) {
                for (let key in attr) {
                    element.setAttribute(key, attr[key])
                }
            }
            if (style) {
                for (let key in style) {
                    element.style[key] = style[key]
                }
            }
            if (data) {
                for (let key in data) {
                    element.dataset[key] = data[key]
                }
            }
            if (array) {
                array.forEach(function (child) {
                    element.appendChild(child)
                });
            }

            element.toggle = function (name) {
                this.classList.toggle(name)
            };
            element.add = function (name) {
                this.classList.add(name)
            };
            element.remove = function (name) {
                this.classList.remove(name)
            };

            return element
        },
    };

    MemoryTaskInit.init();
}

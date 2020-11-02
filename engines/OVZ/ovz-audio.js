//script src="/static/ovz-audio.js" type="text/javascript" data-static="/static/script" id="ovz_audio_script"
// div.task-wrapper - обертка для всего задания

let currentScript = document.querySelector("script#ovz_audio_script");

let settings = {
    static_path: currentScript.dataset.static.split("/").slice(0, -1).join("/") + "/",
    activation_class: "ovz-wrapper",
    audio_class: "ovz-audio",
    text_class: "ovz-text",
    default_tracks: {
        correct: "correct_track_02.mp3",
        incorrect: "incorrect_track_01.mp3",
        partially: "correct_track_02.mp3",
    },
    classes: {
        correct: ".notification.success.notification-submit",
        incorrect: ".notification.error.notification-submit"
    },
    font_size: "",
}

function checkAudiosExists(task_block) {
    function checkUrlExists(url) {
        let http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status !== 404;
    }

    task_block.querySelectorAll("audio").forEach(function (d) {
        if (checkUrlExists(d.src) === false) {
            alert(`Не можем найти файл ${d.src.split("/").slice(-1)[0]}. Убедитесь, что он загружен в "Файлы и загрузки"!`);
        }
    });

}

function focusOnNextElement() {
    let focusableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement) {
        let focusable = Array.from(document.querySelectorAll(focusableElements));
        let index = focusable.indexOf(document.activeElement);
        if (index > -1) {
            let nextElement = focusable[index + 1] || focusable[0];
            nextElement.focus();
        }
    }
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

// function SoundIndications(){
//     this.incorrect_track = new Audio()
//     this.correct_track = new Audio()
//     this.init = function (){
//         let correct_src = settings.static_path + settings.default_tracks.correct;
//         let incorrect_src = settings.static_path + settings.default_tracks.incorrect;
//         this.incorrect_track.src = incorrect_src;
//         this.correct_track.src = correct_src;
//     }
//     this.play_incorrect = function (){
//         this.incorrect_track.play();
//     }
//     this.play_correct = function (){
//         this.correct_track.play();
//     }
// }
//
// let sound_indication = new SoundIndications()
// sound_indication.init();

function AudioApp(block) {
    let audio_blocks = block.querySelectorAll(`.${settings.audio_class}:not([data-status="activate"])`);
    audio_blocks.forEach(function (audio_block) {
        let main_btn = createElement("button", `${settings.audio_class}-button`)
        let icon = createElement("span", `${settings.audio_class}-icon`);
        let icon_i = createElement("i", "fa fa-play");
        icon.append(icon_i);
        main_btn.append(icon);
        audio_block.childNodes.forEach(child_node => main_btn.append(child_node.cloneNode(true)))
        let hidden_audio = createElement("audio", "", {src: audio_block.dataset.src});
        main_btn.append(hidden_audio);

        hidden_audio.onpause = function () {
            icon_i.classList.add('fa-play')
            icon_i.classList.remove('fa-pause')
        }
        hidden_audio.onended = function () {
            icon_i.classList.add('fa-play')
            icon_i.classList.remove('fa-pause')
            // автофокус на следующий элемент
            // focusOnNextElement();
        }
        hidden_audio.onplay = function () {
            icon_i.classList.add('fa-pause')
            icon_i.classList.remove('fa-play')
        }
        audio_block.onclick = function () {
            if (hidden_audio.duration > 0 && !hidden_audio.paused) { // проигрывается, ставим на паузу
                hidden_audio.pause();
            } else { // на паузе, включаем
                Array.from(document.querySelectorAll("audio")).filter(a => a !== hidden_audio).forEach(x => {
                    x.pause();
                    x.currentTime = 0
                });
                hidden_audio.play();
            }
        }
        audio_block.innerHTML = "";
        audio_block.append(main_btn);
        audio_block.dataset.status = "activate";
    });

    /*
    * Звуковая индикация правильности/неправильности
    * */
    let correctness_src = "";
    let problem = block.closest(".problem");
    if (problem.querySelector(settings.classes.correct)) {
        let msg_block = problem.querySelector(settings.classes.correct).querySelector(".notification-message")
        let msg_text = (msg_block.textContent || msg_block.innerText || "").toLowerCase();
        if (msg_text.indexOf("частично верно") !== -1 || msg_text.indexOf("partially") !== -1) {
            correctness_src = settings.static_path + settings.default_tracks.partially;
        } else {
            correctness_src = settings.static_path + settings.default_tracks.correct;
            // sound_indication.play_correct()
        }
    }
    if (problem.querySelector(settings.classes.incorrect)) {
        // sound_indication.play_incorrect()
        correctness_src = settings.static_path + settings.default_tracks.incorrect;
    }
    let correctness_audio = createElement("audio", "", {autoplay: "autoplay", src: correctness_src});
    if (correctness_src) block.append(correctness_audio);

    if (problem.querySelector("button.show")){
        problem.querySelector("button.show").onclick = function () {
            const id = setInterval(() => {
                if (problem.querySelector("solution")) {
                    clearInterval(id);
                    block.removeAttribute("data-status");
                }
            }, 100)
        }
    }

    /*
    * Алерты если какой-то файл не может подтянуться
    * */
    checkAudiosExists(block);
}

let apps = {
    tasks: AudioApp
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
    .${settings.activation_class} p.answer {
        width: 20px;
        position: absolute;
        visibility:hidden !important;
    }
    
    .${settings.audio_class} button.${settings.audio_class}-button {
        background-color: #ffffff;
        border: none;
        padding: 0px 2px !important;
        font-weight: normal !important;
        margin: 0px 0px 0px !important;
        text-align: left !important;
        text-decoration: none;
        display: inherit !important;
        font-size: 1em;
        background-image: none !important;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
        border-radius: 0px !important;
    }

    .${settings.audio_class}{ width: fit-content; display: inline-block; }
    .${settings.audio_class}.bold button.${settings.audio_class}-button, .${settings.text_class}.bold { font-weight: bold !important; }
    .${settings.audio_class}.italic button.${settings.audio_class}-button, .${settings.text_class}.italic { font-style: italic !important; }
    .${settings.audio_class} .${settings.audio_class}-icon:hover{ color: blue; }
    .${settings.audio_class} .${settings.audio_class}-icon i.fa{ font-style: normal !important; margin-right: 5px !important; width: 16px; }

    .problem{ padding-top: 0px !important; }
    .div.problem .action{ margin-top: 0px !important; }
    .indicator-container{ display:none !important; }
    .course-wrapper .vert-mod h3 {margin-top: 0px !important; }
    `
let style = createElement("style", "", {type: 'text/css'})
style.innerHTML = css;
document.querySelector("head").appendChild(style);

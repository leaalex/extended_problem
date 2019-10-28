function Simulator(settings) {

    this.html_element = create('div', {className: "simulator-container"});
    settings.element.appendChild(this.html_element);

    let messages = settings.messages;
    this.options = settings.options || {};

    let user_state = {
        things: [],
        path: [],
    };

    let things = settings.things || [];

    let use_things = things.length > 0;
    let images_src = settings.images_src || "";
    let max_things = this.options.max_things ? this.options.max_things : things.length;
    let first_msg = settings.first_msg || "msg_1";
    let choice_thing_text = this.options.choice_thing_text || "";
    let things_grid_class = this.options.things_grid || "fifths";
    let introduction_text = this.options.introduction_text || "";
    let out_of_turn = settings.out_of_turn || undefined;
    let debug_mode = settings.debug ? settings.debug : false;
    let edx_mode = settings.edx_mode ? settings.edx_mode : false;

    let start_game_btn_label = "Начать симуляцию";
    let next_btn_label = "Далее";

    let answer = {};

    let save_button = $(".save.problem-action-btn", $(this.html_element).closest(".xblock"));
    let submit_button = $(".submit.btn-brand", $(this.html_element).closest(".xblock"));

    $(submit_button).removeAttr("disabled");

    console.log(submit_button);

    this.init = function () {
        if (out_of_turn) {
            if (Object.keys(messages).includes(out_of_turn)) {
                first_msg = out_of_turn;
                this.createGame();
            } else {
                log("Указано приоритетное сообщение: " + out_of_turn + ". Но его нет в ключах сообщений.");
                this.createIntroduction();
            }
        } else {
            this.createIntroduction();
        }

    };

    this.createThingChoice = function () {
        this.clear_html();

        let things_choice_container = create("div", {className: "things-choice-container"});

        let create_game_btn = addEvent(create('button', {
            className: "start-button",
            html: start_game_btn_label,
            attr: {'disabled':'disabled'}
        }), 'click', this.createGame.bind(this));

        let things_count_label = create('span', {html: max_things});
        let things_count_msg = create('p', {
            html: "Можно взять вещей: ",
            style: {'display': max_things === things.length ? "none" : "block"}
        });

        things_count_msg.appendChild(things_count_label);

        let choice_container_wrap = create('div', {className: ""});
        let choice_container = create('div', {className: "choice-container " + things_grid_class});

        things.forEach(function (thing) {
            choice_container.appendChild(create('div', {className: "thing-container"},
                create('label', {className: "thing-checkbox"},
                    create('div', {},
                        create("img", {className: 'thing-img', attr: {src: images_src + ( edx_mode ? "" :'things/') + thing.image_src}}),
                        addEvent(create('input', {
                            id: "think_choice_" + thing.name,
                            attr: {type: "checkbox", name: "think_choice", value: thing.name}
                        }), 'click', (event) => {

                            if (event.target.checked) {
                                if (max_things > user_state.things.length) {
                                    event.target.parentNode.parentNode.classList.add("thing-checkbox-checked");
                                    user_state.things.push(thing);
                                } else {
                                    event.target.checked = false;
                                    alert("Можно взять вещей: " + max_things);
                                }
                            } else {
                                let index = user_state.things.indexOf(thing);
                                if (index > -1) {
                                    user_state.things.splice(index, 1);
                                    event.target.parentNode.parentNode.classList.remove("thing-checkbox-checked");
                                }
                            }
                            if (user_state.things.length > 0) {
                                create_game_btn.removeAttribute("disabled");
                            } else {
                                create_game_btn.setAttribute("disabled", "disabled");
                            }

                            things_count_label.innerText = max_things - user_state.things.length;

                        }),
                        create('i', {className: "fa fa-check hidden-element"}),),
                    create("div", {className: 'thing-title', html: thing.html}),
                )
            ))
        });

        if (choice_thing_text.length > 0) {
            things_choice_container.appendChild(create('h2', {html: "Есть возможность взять вещей .."}));
            things_choice_container.appendChild(create('div', {
                className: "introduction-text",
                html: choice_thing_text
            }));
        }

        choice_container_wrap.appendChild(choice_container);

        things_choice_container.appendChild(things_count_msg);
        things_choice_container.appendChild(choice_container_wrap);
        things_choice_container.appendChild(create_game_btn);

        this.html_element.appendChild(things_choice_container);

    };

    this.createIntroduction = function () {

        this.clear_html();

        let introduction_container = create("div", {className: "introduction-container"}, create("h2", {text: "Что случилось?"}), create("div", {
            className: "introduction-text",
            html: introduction_text
        }));

        let create_game_btn = addEvent(create('button', {
                className: "start-button",
                html: use_things ? next_btn_label : start_game_btn_label,
                style: {'display': 'block'}
            }), 'click',
            () => {
                if (use_things) {
                    this.createThingChoice();
                } else {
                    this.createGame();
                }
            }
        );

        introduction_container.appendChild(create_game_btn);

        this.html_element.appendChild(introduction_container);


    };

    this.createGame = function () {
        this.clear_html();

        let game_container = create("div", {className: "game-container"});
        let game_wrapper = create("div", {className: "game-wrapper"});

        // console.log(user_state.things)

        if (use_things && user_state.things.length > 0) setTimeout(() => {
            game_container.appendChild(this.createUserThingsBlock())
        }, 2000);

        Message.curr_msg_id = first_msg;
        Message.img = "";
        game_container.appendChild(game_wrapper);
        this.html_element.appendChild(game_container);

        setTimeout(() => {
            new Message(first_msg, messages[first_msg], game_wrapper)
        }, 1000);
    };

    this.createUserThingsBlock = function () {
        let list_container = create('div', {className: 'user-things-container'},);
        list_container.appendChild(create("p", {html: "Ваши вещи:"}));
        user_state.things.forEach(function (thing) {

            list_container.appendChild(create("div", {
                className: "user-things-container-item",
                html: "\u25CB " + thing.html
            }));
        });
        return list_container;
    };

    function Choice(msg_id, id, choice, html_element) {
        this.id = id;
        this.next_id = choice.next_id;
        this.text = choice.text;
        // this.comment = choice.comment;
        this.html = create('button', {attr: {type: "radio", value: id, name: "before_" + this.next_id}});
        this.html.innerHTML = this.text;

        this.comment = choice.comment || undefined;

        this.html.onclick = function () {

            if (Message.curr_msg_id === msg_id) {

                if (this.comment) {
                    new Message(msg_id, {
                        type: "comment",
                        text: this.comment,
                        comment: this.comment,
                        next_id: this.next_id
                    }, html_element);
                } else {
                    Message.curr_msg_id = this.next_id;
                    console.log("messages[this.next_id]: ", messages[this.next_id].final);
                    if (messages[this.next_id].final !== true){
                        new Message(this.next_id, messages[this.next_id], html_element);
                    }
                    else{
                        // Message.curr_msg_id = this.next_id;
                        $(settings.element).css('opacity', 0);
                        user_state.path.push(this.next_id);
                        answer.setJSON({answer: {"user_state": user_state, "current_msg": this.next_id}});
                        $(submit_button).trigger('click');
                    }
                }
            }
        }.bind(this);

        this.html.onmouseover = function () {
            console.log(this.next_id);
        }.bind(this)

    }

    function Message(id, settings, html_element) {

        console.log("Creating message with id: ", id);

        var id = id;
        this.id = id;
        this.type = settings.type || "text";
        this.final = settings.final || false;
        this.text = settings.text;

        this.next_id = this.final ? undefined : settings.next_id;
        this.image = settings.image || undefined;
        this.choices = [];

        Object.defineProperty(this, "is_choice", {
            get: function () {
                return this.type === 'choice';
            }
        });
        Object.defineProperty(this, "is_text", {
            get: function () {
                return this.type === 'text';
            }
        });
        Object.defineProperty(this, "is_comment", {
            get: function () {
                return this.type === 'comment';
            }
        });

        this.get_class_list = function () {
            let class_list = "msg-block";
            class_list += this.is_choice ? " choice" : "";
            class_list += this.is_text ? " text" : "";
            class_list += this.is_comment ? " comment" : "";

            class_list += this.final ? (settings.success !== undefined) ? " msg-final success-" + settings.success : "msg-final" : "";

            return class_list;
        };

        if (settings.choices) {
            this.choices = settings.choices.map(function (ch, index) {

                let choice_id = id + "_choice_" + index;

                if (typeof (ch.next_id) == "object") {

                    if (user_state.things.map((item) => item.name).some(r => ch.next_id.condition.includes(r))) {
                        ch.next_id = ch.next_id["yes"]["next_id"];
                    } else {
                        ch.next_id = ch.next_id["no"]["next_id"];
                    }
                }
                return new Choice(id, choice_id, ch, html_element)
            })
        }

        this.html = create('div', {id: id, className: this.get_class_list()});

        let msg_controls = create("div", {className: "message-controls"});

        msg_controls.appendChild(create('div', {html: this.text, className: 'msg-text'}));

        if (this.image) {
            Message.img = images_src + this.image;
        }

        let msg_img = create("img", {className: "message-image", attr: {"src": Message.img}});

        if (this.is_choice) {
            // let choice_container = create('div',{className: 'msg-options-container'});
            // this.choices.forEach(function (item) {
            //     choice_container.append(item.html)
            // });
            // this.html.append(choice_container);

        } else if (this.is_text) {
            if (!this.final) {
                this.html.onclick = function () {
                    if (Message.curr_msg_id != this.next_id) {
                        Message.curr_msg_id = this.next_id;
                        new Message(this.next_id, messages[this.next_id], html_element);
                    }
                }.bind(this);
            }
        } else if (this.is_comment) {
            this.choices = [new Choice(id, "", {text: next_btn_label, next_id: this.next_id}, html_element)];
            msg_controls.appendChild(create('span', {className: 'tip tip-down'}));
        } else {
        }

        if (this.choices.length > 0) {

            let count_class = "default";

            if (this.choices.length === 1) count_class = "ones";
            if (this.choices.length === 2) count_class = "halfs";
            if (this.choices.length === 3) count_class = "thirds";
            if (this.choices.length === 4) count_class = "fourths";
            if (this.choices.length === 5) count_class = "fifths";

            let choice_container = create('div', {className: 'msg-options-container ' + count_class});

            this.choices.forEach(function (item) {

                choice_container.append(item.html)
            });
            msg_controls.append(choice_container);
        }

        this.html.appendChild(msg_img);
        this.html.appendChild(msg_controls);

        html_element.innerHTML = "";
        setTimeout(() => {
            html_element.append(this.html);
        }, 500);

        if(!this.is_comment){
            user_state.path.push(this.id);
        }

        answer.setJSON({answer: {"user_state": user_state, "current_msg": id}});

        console.log(user_state);

        if(this.final){
            // console.log("click submit trigger");
            // $(submit_button).trigger('click');
        }else{
            // console.log("click save trigger");
            $(save_button).trigger('click');
        }
    }

    // console.log(save_button);

    this.clear_html = function () {
        this.html_element.innerHTML = "";
    };

    function log(msg, type) {
        /*
        * msg - выводимое сообщение
        * type - тип console.* (debug, info, log, warn, error)
        */
        if (debug_mode) {
            switch (type) {
                case 'debug':
                    console.debug(msg);
                    break;
                case 'info':
                    console.info(msg);
                    break;
                case 'log':
                    console.log(msg);
                    break;
                case 'warn':
                    console.warn(msg);
                    break;
                case 'error':
                    console.error(msg);
                    break;
                default:
                    console.log(msg);
            }
        }
    }

    function Answer(elementField) {
        this.elementField = elementField;
        this.fieldValue = "";
        this.fieldObject = {};
        this.get = function() {
            this.fieldValue = elementField.value;
            return this.fieldValue;
        };
        this.set = function(value) {
            if (value == undefined) value = this.fieldValue;
            elementField.value = value;
        };
        this.getJSON = function() {
            if (this.isJsonString(this.get())) this.fieldObject = JSON.parse(this.get());
            return this.fieldObject;
        };
        this.setJSON = function(object) {
            if (object == undefined) object = this.fieldObject;
            this.set(JSON.stringify(object))
        };
        this.isJsonString = function(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        };
    };

    function create(tag, {id, className, text, html, attr, style, data}, ...array) {
        var element = document.createElement(tag);
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
    }

    function addEvent(element, event, action) {
        element.addEventListener(event, action)
        return element
    }

    // this.init();
    if(edx_mode){
        if (settings.input.querySelector("input[type='text']")) {

            answer = new Answer(settings.input.querySelector("input[type='text']"));

            // answer = new Answer(document.querySelector("#simulator_input").querySelector("input[type='text']"));

            if (settings.input.parentNode.parentNode.querySelector(".message")) {
                settings.input.parentNode.parentNode.querySelector(".message").classList.add("hidden");
            }

            settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");

            if(answer.get()){
                let curr_msg = answer.getJSON()["answer"]["current_msg"];
                first_msg = curr_msg;
                user_state = answer.getJSON()["answer"]["user_state"];
                user_state.path = user_state.path.slice(0, -1);
                this.createGame();
            }else{
                this.init();
            }
        }



    }
    else{
        images_src = "images/";
        this.init();
    }

};


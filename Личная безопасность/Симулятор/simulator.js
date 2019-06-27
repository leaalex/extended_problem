function Simulator(settings) {

    this.html_element = create('div', {className: "simulator-container"});
    settings.element.appendChild(this.html_element);

    let messages = settings.messages;
    this.options = settings.options || {};

    let things = settings.things || [];
    let use_things = things.length > 0;
    let images_src = settings.images_src || "";
    let max_things = this.options.max_things ? this.options.max_things : things.length;

    let user_state = {
        things: [],
    };


    this.init = function () {
        console.log(things);
        if (use_things) {
            this.createThingChoice();
        } else {
            this.createGame();
        }

    };

    this.createThingChoice = function () {

        let create_game_btn = addEvent(create('button', {
            className: "start-button",
            html: 'я все выбрал, давайте дальше',
            style: {'display': 'none'}
        }), 'click', this.createGame.bind(this))

        let things_count_label = create('span', {html: max_things});
        let things_count_msg = create('p', {
            html: "Можно взять вещей: ",
            style: {'display': max_things === things.length ? "none" : "block"}
        });

        things_count_msg.appendChild(things_count_label);

        let choice_container = create('div', {className: "choice-container " + "fifths"});

        things.forEach(function (thing) {
            choice_container.appendChild(create('div', {className: "thing-container"},
                create('label', {className: "thing-checkbox"},
                    create("img", {className: 'thing-img', attr: {src: images_src + thing.image_src}}),
                    addEvent(create('input', {
                        id: "think_choice_" + thing.name,
                        attr: {type: "checkbox", name: "think_choice", value: thing.name}
                    }), 'click', (event) => {
                        // console.log(event)
                        // console.log(max_things, user_state.things.length)

                        if (event.target.checked) {
                            if (max_things > user_state.things.length) {
                                event.target.parentNode.classList.add("thing-checkbox-checked");
                                user_state.things.push(thing);
                            } else {
                                event.target.checked = false;
                                alert("Можно взять вещей: " + max_things);
                            }
                        } else {
                            let index = user_state.things.indexOf(thing);
                            if (index > -1) {
                                user_state.things.splice(index, 1);
                                event.target.parentNode.classList.remove("thing-checkbox-checked");
                            }
                        }
                        if (user_state.things.length > 0) {
                            create_game_btn.style.display = "block";
                        } else {
                            create_game_btn.style.display = "none";
                        }

                        things_count_label.innerText = max_things - user_state.things.length;
                        // console.log(user_state);

                    }),
                    create('i', {className: "fa fa-check hidden"}),
                    create("p", {className: '', html: thing.html}),
                )
            ))
        });

        this.html_element.appendChild(create('p', {html: "Наберите себе вещей"}));



        // things.forEach((item) => {
        //     choice_container.appendChild(item);
        // });
        this.html_element.appendChild(things_count_msg);
        this.html_element.appendChild(choice_container);
        this.html_element.appendChild(create_game_btn);

    };

    this.createGame = function () {
        // console.log("keke new game", this);
        this.clear_html();
        // this.html_element.appendChild(create("p", {html: "я игра"}));
        // this.html_element.appendChild(create("p", {html: ""}));

        // console.log(user_state);
        let game_wrapper = create("div", {className: "game-wrapper"});

        if(use_things) this.html_element.appendChild(this.createUserThingsBlock());

        let first_msg_id = "msg_1";
        Message.curr_msg_id = first_msg_id;

        // this.html_element = html_element;

        new Message(first_msg_id, messages[first_msg_id], game_wrapper);

        this.html_element.appendChild(game_wrapper);

    };


    this.createUserThingsBlock = function () {
        let list_container = create('div', {className: 'user-things-container'},);
        list_container.appendChild(create("p", {html: "Ваши вещи:"}));
        user_state.things.forEach(function (thing) {

            list_container.appendChild(create("div", {className:"user-things-container-item", html: thing.html }));

        });
        return list_container;
    };


    function Choice(msg_id, id, choice, html_element) {
        this.id = id;
        this.next_id = choice.next_id;
        this.text = choice.text;
        // this.comment = choice.comment;
        this.html = create('button', {attr:{type: "radio", value: id, name: "before_" + this.next_id}});
        this.html.innerHTML = this.text;

        this.html.onclick = function () {
            if (Message.curr_msg_id == msg_id){
                Message.curr_msg_id = this.next_id;
                console.log(this.next_id)
                // if(this.comment){
                //     new Message(undefined, {type: "comment", text: this.comment.text, comment: this.comment, next_id: this.next_id}, html_element);
                // }else{
                    new Message(this.next_id, messages[this.next_id], html_element);
                // }
            }
        }.bind(this);
    }

    function Message(id, settings, html_element) {
        var id = id;
        let message_block = create("div", {});
        this.id = id;
        this.type = settings.type || "text";
        this.final = settings.final || false;
        this.text = settings.text;

        console.log(settings);

        // typeof(settings.next_id) == "object" ? console.log(settings.next_id.condition, user_state.things)
        // condition

        // ;

        this.next_id = this.final ? undefined : settings.next_id;
        this.show_delay = settings.show_delay || 1000;
        // this.comment = settings.comment || undefined;
        this.image = settings.image || undefined;


        Object.defineProperty(this, "is_choice", {
            get: function() {
                return this.type === 'choice';
            }
        });
        Object.defineProperty(this, "is_text", {
            get: function() {
                return this.type === 'text';
            }
        });

        let success_class = (settings.success !== undefined) ? "success-"+settings.success: "";
        if (settings.choices) {
            this.choices = settings.choices.map(function (ch, index) {

                if(typeof(ch.next_id) == "object"){

                    // console.log(user_state.things.map((item)=>item.name), ch.next_id.condition)

                    if(user_state.things.map((item)=>item.name).some(r=> ch.next_id.condition.includes(r))){
                        // console.log(true)
                        ch.next_id = ch.next_id["yes"];
                    }
                    else{
                        ch.next_id = ch.next_id["no"];
                        // console.log(false)
                    }
                        // )
                }

                // ? console.log(settings.next_id.condition, user_state.things)
                // console.log(ch)

                return new Choice(id, id + "_choice_" + index, ch, html_element)
            })
        }

        this.html = create('div', {id:id, className: ' msg-block '+ this.type + ' ' + success_class} );
        this.html.appendChild(create('div', {text: this.text, className: 'msg-text'}));
            // .innerHTML = this.text;

        setTimeout(()=>{this.html.style.opacity = 1;}, 500);

        if(this.image){
            html_element.style.backgroundImage = "url('" + images_src + this.image + "')";
        }

        console.log(this);

        if(this.is_choice){
            let choice_container = create('div',{className: 'msg-options-container'});
            this.choices.forEach(function (item) {
                // console.log()
                choice_container.append(item.html)
            });
            this.html.append(choice_container);

        }
        else if(this.is_text){
            if (!this.final) {
                this.html.onclick = function () {
                    if (Message.curr_msg_id != this.next_id) {
                        Message.curr_msg_id = this.next_id;
                        new Message(this.next_id, messages[this.next_id], html_element);
                    }
                }.bind(this);
            }
        }
        else{}
        // message_block = this.html;
        html_element.innerHTML = "";
        // html_element.innerHTML = this.html;
        html_element.append(this.html);
    }


    this.clear_html = function () {
        this.html_element.innerHTML = "";
        // .html("");
    };

    function create(tag, {id, className, text, html, attr, style, data}, ...array) {
        var element = document.createElement(tag);
        if (id) element.id = id;
        if (className) element.className = className;
        if (text) element.innerText = text;
        if (html) element.innerText = html;
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
        }
        element.add = function (name) {
            this.classList.add(name)
        }
        element.remove = function (name) {
            this.classList.remove(name)
        }

        return element
    }

    function addEvent(element, event, action) {
        element.addEventListener(event, action)
        return element
    }

    this.init();

};


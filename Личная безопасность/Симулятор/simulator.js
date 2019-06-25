function Simulator(settings) {

    this.html_element = create('div', {className: "simulator-container"});
    settings.element.appendChild(this.html_element);

    this.messages = settings.messages;
    let things = settings.things || [];
    this.options = settings.options || {};

    let max_things = this.options.max_things ? this.options.max_things : things.length;

    let user_state = {
        things: [],
        // things: [{
        //     name: "more",
        //     html: "Море синее",
        //     image_src: "images/400x400.png",
        // },
        //     {
        //         name: "chebureki",
        //         html: "Чебуреки",
        //         image_src: "images/400x400.png",
        //     }]
        // ["water_bottle", "matches"],
    };


    this.init = function () {
        console.log(things);
        if (things.length > 0) {
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
                    create("img", {className: 'thing-img', attr: {src: thing.image_src}}),
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
        this.html_element.appendChild(create("p", {html: "я игра"}));
        // this.html_element.appendChild(create("p", {html: ""}));

        console.log(user_state);
        this.html_element.appendChild(this.createUserThingsBlock());
    };


    this.createUserThingsBlock = function () {

        let list_container = create('div', {className: 'user-things-container'},);
        list_container.appendChild(create("p", {html: "Ваши вещи:"}));
        user_state.things.forEach(function (thing) {

            list_container.appendChild(create("div", {className:"user-things-container-item", html: thing.html }));

        });
    // );
        //
        // console.log("ololo");


        return list_container;

    };


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


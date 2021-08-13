function HistoricalMaps(settings) {

    element = settings.element;
    svg = element.querySelector("svg")
    let selected_countries = [];

    function Answer(elementField) {
        this.elementField = elementField;
        this.fieldValue = "";
        this.fieldObject = {};
        this.get = function () {
            this.fieldValue = elementField.value;
            return this.fieldValue;
        };
        this.set = function (value) {
            if (value === undefined) value = this.fieldValue;
            elementField.value = value;
        };
        this.getJSON = function () {
            if (this.isJsonString(this.get())) this.fieldObject = JSON.parse(this.get());
            return this.fieldObject;
        };
        this.setJSON = function (object) {
            if (object === undefined) object = this.fieldObject;
            this.set(JSON.stringify(object))
        };
        this.isJsonString = function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        };
    };

    let answer = undefined;
    if(settings.input) {
        if (settings.input.querySelector("input[type='text']")) {
            answer = new Answer(settings.input.querySelector("input[type='text']"));
            // settings.input.classList.add("hidden");
            // answer.elementField.classList.add("hidden");
            if (answer.get()) {
                selected_countries = answer.getJSON()["answer"];
            }
        }
    }

    let HistoricalMapsInit = {
        init: function () {
            let countries = svg.querySelectorAll("#granicy > g")
            countries.forEach(function(country){
                country.dataset.country = utils.transliterate(country.id)
                // console.log(country.id, country.dataset.country)
            })
            let title_block = element.querySelector(".country-title")
            title_block.style.display = "none"
            title_block.onmouseover = function (event) {title_block.style.display = "none"}
            countries.forEach(function(country){
                // console.log(country.id, )
                if (selected_countries.includes(country.dataset.country)) country.classList.add("selected")
                country.onmouseover = function (event) {
                    country.classList.add("hovered")
                    title_block.style.display = "block"
                    title_block.innerHTML = country.id
                    title_block.style.left = event.offsetX + 20 + 'px'
                    title_block.style.top = event.offsetY - 20 + 'px'
                }
                country.onmouseleave = function (event) {
                    country.classList.remove("hovered")
                    title_block.style.display = "none"
                }
                country.onclick = function (event) {
                    if (country.classList.contains("selected")){
                        country.classList.remove("selected")
                        const index = selected_countries.indexOf(country.dataset.country);
                        if (index > -1) {
                            selected_countries.splice(index, 1);
                        }
                        answer.setJSON({answer: selected_countries});
                    }
                    else{
                        country.classList.add("selected")
                        selected_countries.push(country.dataset.country)
                        answer.setJSON({answer: selected_countries});
                    }
                }
            })
        },

        build_state(){

        },

    };
    let utils = {
        transliterate: function (str) {
            var ru = {
                'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
                'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
                'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
                'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
                'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
                'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
            }, n_str = [];
            str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');
            for ( var i = 0; i < str.length; ++i ) {
                n_str.push(
                    ru[ str[i] ]
                    || ru[ str[i].toLowerCase() ] == undefined && str[i]
                    || ru[ str[i].toLowerCase() ].toUpperCase()
                );
            }
            return n_str.join('');
        }
    };

    HistoricalMapsInit.init();

}

function HistoricalMaps(settings){

    svg = settings.svg;
    settings.element.appendChild(svg);

    let first_selected = undefined;

    let connections = [];

    /*
    {
        from: "",
        to: "",

    }
    */

    let HistoricalMapsInit = {
        init: function () {
            console.log(settings);
            this.test_filling();

            this.create_city_events();

        },

        test_filling: function(){
            let cities = svg.querySelector("#Города").children;
            for (let i = 0; i < cities.length; i++) {
                cities[i].classList.add("city");
                cities[i].id = `city_${i}`;
            }

            let putin = svg.querySelector("#Из_воряг_в_греки").children;
            for (let i = 0; i < putin.length; i++) {
                putin[i].classList.add("hidden");
            }
        },

        create_city_events: function(){


            let cities = svg.querySelectorAll(".city");
            // console.log();

            for (let i = 0; i < cities.length; i++) {

                cities[i].onclick = function(){
                    if(!first_selected){
                        first_selected = cities[i];
                        first_selected.classList.add("first-selected");
                    }
                    else{
                        let new_connection = {
                            from: first_selected.id,
                            to: cities[i].id
                        };


                        if(svg.querySelector(`#path_${new_connection.from}__${new_connection.to}`)){
                            svg.querySelector(`#path_${new_connection.from}__${new_connection.to}`).classList.remove("hidden");
                            connections.push(new_connection);
                        }
                        else{
                            if(svg.querySelector(`#path_${new_connection.to}__${new_connection.from}`)){
                                svg.querySelector(`#path_${new_connection.to}__${new_connection.from}`).classList.remove("hidden");
                                connections.push(new_connection);
                            }
                            else{
                                console.log("Нет такого пути")
                            }
                        }

                        first_selected.classList.remove("first-selected");
                        first_selected = undefined;
                    }

                    // console.log(connections);
                }


            }

            let roads = svg.querySelectorAll(".path");

            for (let j = 0; j < roads.length; j++){
                roads[j].onclick = function () {
                    let ids = roads[j].id.replace("path_", "").split("__",);

                    // console.log(connections.filter(item=>(item.from===ids[0] && item.to===ids[1])) , connections.filter(item=>(item.from===ids[1] && item.to===ids[0])))

                    let ll = connections.filter(item=>((item.from===ids[0] && item.to===ids[1]) || (item.from===ids[1] && item.to===ids[0]))) ;

                    console.log(ll);
                    // console.log(ids);
                    // if (connections.filter())
                    console.log(connections.indexOf(ll), connections)

                }
            }

            svg.onclick = function(e){
            // console.log(e.target);
                if(first_selected && !e.target.classList.contains("city")){
                    first_selected.classList.remove("first-selected");
                    first_selected = undefined;
                }
            };

        },



    };

    HistoricalMapsInit.init();

}

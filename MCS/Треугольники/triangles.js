function TrianglesTask(user_settings) {

    let user_data = {
        side_1: 0,
        h_1: 0,
        S_1: 0,
        side_2: 0,
        h_2: 0,
        S_2: 0,
        side_3: 0,
        h_3: 0,
        S_3: 0,
        S_avg: 0,
    };

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
            this.set(JSON.stringify(object));
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
    let correctness = undefined;

    if (user_settings.input) {
        if (user_settings.input.querySelector("input[type='text']")) {

            answer = new Answer(user_settings.input.querySelector("input[type='text']"));
            if (user_settings.input.parentNode.parentNode.querySelector(".message")) {
                user_settings.input.parentNode.parentNode.querySelector(".message").classList.add("hidden");
            }

            user_settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");

            if (answer.get()) {
                if (user_settings.input.parentNode.parentNode.querySelector("span.message")) {
                    correctness = JSON.parse(user_settings.input.parentNode.parentNode.querySelector("span.message").innerHTML);
                }
            }
        }
    }

    let TrianglesTaskInit = {
        init: function () {

            if (answer) {
                if (answer.get()) {
                    user_data = answer.getJSON()["answer"];
                }
            }

            new Vue({
                el: "#triangles_task",
                template: `
                <div>

                    <div>
                        <h2>Расчет 1</h2>
                        <table>
                        <tr>
                            <td><label>Основание 1 \\( (a_1) \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.side_1" type="number" class="triangles-input"></td>
                        </tr><tr>
                        
                           <td> <label>Высота 1 \\( (h_1) \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.h_1" type="number" class="triangles-input"></td>
                        </tr>
                        <tr>
                            <td><label>Площадь 1 \\( S_1 \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.S_1" type="number" class="triangles-input" :class="get_correctness_class('S_1')"></td>
                         </tr>
                         </table>
                    </div>
                    <div>
                        <h2>Расчет 2</h2>
                        <table>
                        <tr>
                            <td><label>Основание 2 \\( (a_2) \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.side_2" type="number" class="triangles-input"></td>
                        </tr><tr>
                        
                           <td> <label>Высота 2 \\( (h_2) \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.h_2" type="number" class="triangles-input"></td>
                        </tr>
                        <tr>
                            <td><label>Площадь 2 \\( S_2 \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.S_2" type="number" class="triangles-input" :class="get_correctness_class('S_2')"></td>
                         </tr>
                         </table>
                    </div>
                    <div>
                        <h2>Расчет 3</h2>
                        <table>
                        <tr>
                            <td><label>Основание 3 \\( (a_3) \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.side_3" type="number" class="triangles-input"></td>
                        </tr><tr>
                        
                           <td> <label>Высота 3 \\( (h_3) \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.h_3" type="number" class="triangles-input"></td>
                        </tr>
                        <tr>
                            <td><label>Площадь 3 \\( S_3 \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.S_3" type="number" class="triangles-input" :class="get_correctness_class('S_3')"></td>
                         </tr>
                         </table>
                    </div>
                    
                    
                    <div>
                        <h2>Расчет среднего значения площади</h2>
                        <table>
                        <tr>
                        <tr>
                            <td><label>Среднее значение площади =</label></td>
                            <td><input @input="remove_class(event)" @change="set_answer" v-model.number="user_data.S_avg" type="number" class="triangles-input" :class="get_correctness_class('S_avg')"></td>
                         </tr>
                         </table>
                    </div>
                    
                    </div>
<!--                    <div>-->
<!--                        <h2>Расчет 1</h2>-->
<!--                        <div class="input-block">-->
<!--                            <label>Основание 1 \\( a_1 \\)</label>-->
<!--                            <input @change="set_answer" v-model.number="user_data.side_1" type="number" class="triangles-input">-->
<!--                        </div>-->
<!--                        <div class="input-block">-->
<!--                            <label>Высота 1 \\( h_2 \\)</label>-->
<!--                            <input @change="set_answer" v-model.number="user_data.h_1" type="number" class="triangles-input">-->
<!--                        </div>-->
<!--                        <div class="input-block">-->
<!--                            <label>Площадь 1 \\( S_1 \\)</label>-->
<!--                            <input @change="set_answer" v-model.number="user_data.S_1" type="number" class="triangles-input" :class="get_correctness_class('S_1')">-->
<!--                         </div>-->
<!--                    </div>-->

                `,
                data: {
                    user_data: user_data,
                },
                methods:{
                    set_answer: function(event){
                        event.target.classList.remove('correct');
                        event.target.classList.remove('incorrect');
                        Object.keys(user_data).forEach(
                            item=>user_data[item] = this.parseNumber(user_data[item])
                        );
                        console.log(user_data)
                        answer.setJSON({answer: this.user_data});
                    },

                    parseNumber(str_num){
                        let str_num_arr = str_num.toString().replace(" ", "").replace(",", ".").split('.');
                        let return_num = str_num_arr.length > 1 ? (str_num_arr[0] + '.' + str_num_arr.slice(1).join('')) : str_num_arr[0];
                        if (isNaN(parseFloat(return_num))){
                            return 0;
                        }
                        else{
                            return parseFloat(return_num);
                        }
                    },

                    get_correctness_class(elem){
                        if (correctness != undefined){
                            console.log(elem, correctness[elem])
                            if (correctness[elem]){
                                return "correct"
                            }
                            else{
                                return "incorrect"
                            }
                        }
                    },
                }

            })
        }
    };

    TrianglesTaskInit.init();
}

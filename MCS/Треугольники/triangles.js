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
        S_err: 0,
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
                        <h2>Шаг 1</h2>
                        
                        <p>Ваша задача начертить треугольник на листе бумаги и провести измерение трех высот: высота 1, высота 2, высота 3 и соответствующих трех оснований: основание 1, основание 2, основание 3. По приведенной формуле рассчитать площадь треугольника: площадь 1, площадь 2, площадь 3. Все значения занести в поля ввода данных.</p>
                        <p><i>Числовые значения должны быть в <strong>сантиметрах</strong> с точностью до <strong>первого</strong> десятичного знака, целое значение отделяется от дробного только точкой!</i></p>
                        <table>
                        <tr>
                            <td><label>Основание 1 \\( (a_1) \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.side_1" type="number" class="triangles-input"></td>
                        </tr>
                        <tr>
                           <td> <label>Высота 1 \\( (h_1) \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.h_1" type="number" class="triangles-input"></td>
                        </tr>
                        <tr>
                            <td><label>Площадь 1 \\( S_1 \\) =</label></td>
                            <td><input @change="set_answer" v-model.number="user_data.S_1" type="number" class="triangles-input" :class="get_correctness_class('S_1')"></td>
                         </tr>
                         </table>
                    </div>
                    <hr>
                    <div>
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
                    <hr>
                    <div>
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
                    <p>Обратите внимание треугольник один, а значения площади в каждом из трех случаев несколько отличаются. Значит каждый расчет содержит погрешность (неопределённость).</p> 
                    <p>Можно ли оценить эту погрешность и как?</p>
                    <p>Оказывается, можно и делается это так! Далее приводится упрощенный расчет погрешности.</p>
                    </div>
                    <div>
                        <h2>Шаг 2</h2>
                       <p>Нужно подсчитать среднее значение площади треугольника из трех полученных значений по формуле:</p> 
                      \\[  S_{ср} = \\frac{S_1 + S_2 + S_3}{3} = ? \\] 
                        <p>Сделайте это и значение занесите в соответствующее поле.</p>  
                        <p><i>Числовые значения должны быть в <strong>см.</strong> с точностью до <strong>второго</strong> десятичного знака, целое значение отделяется от дробного только точкой!</p>
                        <table>
                        <tr>
                        <tr>
                            <td><label>Среднее значение площади =</label></td>
                            <td><input @input="remove_class(event)" @change="set_answer" v-model.number="user_data.S_avg" type="number" class="triangles-input" :class="get_correctness_class('S_avg')"></td>
                         </tr>
                         </table>
                    </div>
                    
                    <div>
                        <h2>Шаг 3</h2>
                        
                        <p>Найти разницу между каждым значением рассчитанной площади и средним значением площади <i>(без учета знака, ведь в каких-то случаях частное значение площади будет меньше среднего, в каких-то – больше)</i></p>
                        <p>Разница 1 = \\(S_1 – S_{ср} = ?\\)</p>
                        <p>Разница 2 = \\(S_2 – S_{ср} = ?\\)</p>
                        <p>Разница 3 = \\(S_3 – S_{ср} = ?\\)</p>
                        <p><i>Числовые значения площади должны быть в <strong>квадратных сантиметрах</strong> с точностью до <strong>второго</strong> десятичного знака, целое значение отделяется от дробного только точкой!</i></p>

                    </div>
                    
                    <div>
                        <h2>Шаг 4</h2>                    
                        <p>Найти среднее значение трех подсчитанных разниц.</p>
                        <p>Разница средняя = (Разница 1+ Разница 2+ Разница 3)/3=?</p>
                        <p>Сделайте это и значение занесите в соответствующее поле.</p>
                        <p><i>Числовые значения должны быть в <strong>квадратных сантиметрах</strong> с точностью до <strong>второго</strong> десятичного знака, целое значение отделяется от дробного только точкой!</i></p>

                        <table>
                        <tr>
                        <tr>
                            <td><label>Погрешность измерения площади =</label></td>
                            <td><input @input="remove_class(event)" @change="set_answer" v-model.number="user_data.S_err" type="number" class="triangles-input" :class="get_correctness_class('S_err')"></td>
                         </tr>
                         </table>
                         
                         <p>Полученное значение и будет грубо оцененной  погрешностью определения площади треугольника \\( \\Delta S \\).</p>

                         <p>Тогда площадь треугольника, измеренная Вами, будет выглядеть следующим образом:</p>
                        \\[ S = S_{ср}  \\pm \\Delta S (см^{2}) \\]
                    </div>
                    <div>
                        <h2>Вывод</h2> 
                        <p>Любое измерение и построенные на нем расчеты содержат погрешность. </p>
                    </div>                    
                    <div>
                        <h2>Вопросы к зачету</h2> 
                        <ol>
                            <li>Что такое прямые и косвенные измерения? Какие измерения проводили Вы?</li>
                            <li>Какие причины приводят к возникновению погрешностей измерения?</li>
                            <li>Объясните, как Вы проводили измерения площади?</li>
                        </ol>
                    </div>
                    
                    <div v-if="message.length != 0" class="triangles-comment">
                        {{message}}
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
                    message: ""
                },
                methods:{
                    set_answer: function(event){
                        event.target.classList.remove('correct');
                        event.target.classList.remove('incorrect');
                        this.message = "";
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
                            if (correctness[elem]){
                                return "correct"
                            }
                            else{
                                return "incorrect"
                            }
                        }
                    },
                },

                mounted(){
                    if (correctness != undefined){
                        this.message = correctness["comment"]
                    }
                },

            })
        }
    };

    TrianglesTaskInit.init();
}

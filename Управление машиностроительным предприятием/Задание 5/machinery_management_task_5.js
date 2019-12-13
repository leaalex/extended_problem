function MachineryManagement5(user_settings) {

    let settings = user_settings.data;

    console.log(settings);

    let user_data = {};

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

    // correctness = {"used_equipment_table_1": [[true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true]], "used_equipment_table_2": [[true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true]], "used_equipment_table_3": [true, false, true, true, true, true, true], "used_employees": [true, true, true, true, true, true, true, true], "used_employees_table_3": [true, true, true, true, true, true, true, true], "used_employees_table_2": [[true, true, false], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true]], "used_employees_table_1": [[true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true], [true, true, true]], "used_equipment": [true, true, true, true, true, true, true]}

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

    let MachineryManagementInit = {
        init: function () {

            user_data.used_equipment = new Array(settings.companion_data.used_equipment_len).fill(0);
            user_data.used_equipment = user_data.used_equipment.map(el=> {return {equipment: "", table_1: Array(3).fill(0), table_2: Array(3).fill(0), table_3: 0}});

            user_data.used_employees = new Array(settings.companion_data.used_employees_len).fill(0);
            user_data.used_employees = user_data.used_employees.map(el=> {return {profession_rank: "", table_1: Array(3).fill(0), table_2: Array(3).fill(0), table_3: 0}});

            // let lol = {"answer":{"used_equipment":[{"equipment":"equipment_1","table_1":[5,6,0],"table_2":[3334,2000,0],"table_3":2},{"equipment":"equipment_3","table_1":[0,0,43],"table_2":[0,0,21500],"table_3":46},{"equipment":"equipment_2","table_1":[16,48,102],"table_2":[10667,16000,51000],"table_3":22},{"equipment":"equipment_7","table_1":[15,19,0],"table_2":[10000,6334,0],"table_3":5},{"equipment":"equipment_5","table_1":[22,30,0],"table_2":[14667,10000,0],"table_3":7},{"equipment":"equipment_11","table_1":[16,18,32],"table_2":[10667,6000,16000],"table_3":10},{"equipment":"equipment_6","table_1":[8,11,78],"table_2":[5334,3667,39000],"table_3":14}],"used_employees":[{"profession_rank":"turner_3","table_1":[16,48,0],"table_2":[10667,16000,12],"table_3":14},{"profession_rank":"turner_2","table_1":[0,0,6],"table_2":[0,0,3000],"table_3":2},{"profession_rank":"grinder_3","table_1":[8,11,34],"table_2":[5334,3667,17000],"table_3":13},{"profession_rank":"grinder_4","table_1":[22,30,44],"table_2":[14667,10000,22000],"table_3":23},{"profession_rank":"milling_3","table_1":[16,18,32],"table_2":[10667,6000,16000],"table_3":17},{"profession_rank":"milling_4","table_1":[15,19,0],"table_2":[10000,6334,0],"table_3":9},{"profession_rank":"turner_4","table_1":[0,0,139],"table_2":[0,0,69500],"table_3":35},{"profession_rank":"carver_2","table_1":[5,6,0],"table_2":[3334,2000,0],"table_3":3}]}}
            //
            // user_data = lol["answer"];
            if (answer.get()) {
                user_data = answer.getJSON()["answer"];
            }

            new Vue({
                template: `
                <div>
                    <div>
                        <p>На будущий рабочий год был подготовлен следующий план производства и реализации продукции:</p>
                        <ul>
                            <li>первое изделие – {{companion_data.products_count[0]}} шт.</li>
                            <li>второе изделие – {{companion_data.products_count[1]}} шт.</li>
                            <li>третье изделие – {{companion_data.products_count[2]}} шт.</li>
                        </ul>
                        <p>Вместе с этим имеются следующие исходные данные.</p>
                        <p>Таблица 1. Данные по выпускаемым изделиям</p>
                        <table>
                            <tr>
                                <th colspan="2">Выпускаемые изделия</th>
                                <th>первое</th>
                                <th>второе</th>
                                <th>третье</th>
                            </tr>
                            <tr>
                                <th colspan="2">Номенклатурный номер изделия</th>
                                <th>{{manufactured_products[0].product_num}}</th>
                                <th>{{manufactured_products[1].product_num}}</th>
                                <th>{{manufactured_products[2].product_num}}</th>
                            </tr>
                            <tr>
                                <th rowspan="3">Опреция 1</th>
                                <td>Шифр модели оборудования</td>
                                <td>{{manufactured_products[0].operations.operation_1.model}}</td>
                                <td>{{manufactured_products[1].operations.operation_1.model}}</td>
                                <td>{{manufactured_products[2].operations.operation_1.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td>{{manufactured_products[0].operations.operation_1.time}}</td>
                                <td>{{manufactured_products[1].operations.operation_1.time}}</td>
                                <td>{{manufactured_products[2].operations.operation_1.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td>{{manufactured_products[0].operations.operation_1.rank}}</td>
                                <td>{{manufactured_products[1].operations.operation_1.rank}}</td>
                                <td>{{manufactured_products[2].operations.operation_1.rank}}</td>
                            </tr>
                            
                            
                            <tr>
                                <th rowspan="3">Опреция 2</th>
                                <td>Шифр модели оборудования</td>
                                <td>{{manufactured_products[0].operations.operation_2.model}}</td>
                                <td>{{manufactured_products[1].operations.operation_2.model}}</td>
                                <td>{{manufactured_products[2].operations.operation_2.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td>{{manufactured_products[0].operations.operation_2.time}}</td>
                                <td>{{manufactured_products[1].operations.operation_2.time}}</td>
                                <td>{{manufactured_products[2].operations.operation_2.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td>{{manufactured_products[0].operations.operation_2.rank}}</td>
                                <td>{{manufactured_products[1].operations.operation_2.rank}}</td>
                                <td>{{manufactured_products[2].operations.operation_2.rank}}</td>
                            </tr>
                            <tr>
                                <th rowspan="3">Опреция 3</th>
                                <td>Шифр модели оборудования</td>
                                <td>{{manufactured_products[0].operations.operation_3.model}}</td>
                                <td>{{manufactured_products[1].operations.operation_3.model}}</td>
                                <td>{{manufactured_products[2].operations.operation_3.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td>{{manufactured_products[0].operations.operation_3.time}}</td>
                                <td>{{manufactured_products[1].operations.operation_3.time}}</td>
                                <td>{{manufactured_products[2].operations.operation_3.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td>{{manufactured_products[0].operations.operation_3.rank}}</td>
                                <td>{{manufactured_products[1].operations.operation_3.rank}}</td>
                                <td>{{manufactured_products[2].operations.operation_3.rank}}</td>
                            </tr>
                            <tr>
                                <th rowspan="3">Опреция 4</th>
                                <td>Шифр модели оборудования</td>
                                <td>{{manufactured_products[0].operations.operation_4.model}}</td>
                                <td>{{manufactured_products[1].operations.operation_4.model}}</td>
                                <td>{{manufactured_products[2].operations.operation_4.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td>{{manufactured_products[0].operations.operation_4.time}}</td>
                                <td>{{manufactured_products[1].operations.operation_4.time}}</td>
                                <td>{{manufactured_products[2].operations.operation_4.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td>{{manufactured_products[0].operations.operation_4.rank}}</td>
                                <td>{{manufactured_products[1].operations.operation_4.rank}}</td>
                                <td>{{manufactured_products[2].operations.operation_4.rank}}</td>
                            </tr>
                            <tr>
                                <th rowspan="3">Опреция 5</th>
                                <td>Шифр модели оборудования</td>
                                <td>{{manufactured_products[0].operations.operation_5.model}}</td>
                                <td>{{manufactured_products[1].operations.operation_5.model}}</td>
                                <td>{{manufactured_products[2].operations.operation_5.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td>{{manufactured_products[0].operations.operation_5.time}}</td>
                                <td>{{manufactured_products[1].operations.operation_5.time}}</td>
                                <td>{{manufactured_products[2].operations.operation_5.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td>{{manufactured_products[0].operations.operation_5.rank}}</td>
                                <td>{{manufactured_products[1].operations.operation_5.rank}}</td>
                                <td>{{manufactured_products[2].operations.operation_5.rank}}</td>
                            </tr>
                            <tr>
                                <th rowspan="3">Опреция 6</th>
                                <td>Шифр модели оборудования</td>
                                <td>{{manufactured_products[0].operations.operation_6.model}}</td>
                                <td>{{manufactured_products[1].operations.operation_6.model}}</td>
                                <td>{{manufactured_products[2].operations.operation_6.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td>{{manufactured_products[0].operations.operation_6.time}}</td>
                                <td>{{manufactured_products[1].operations.operation_6.time}}</td>
                                <td>{{manufactured_products[2].operations.operation_6.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td>{{manufactured_products[0].operations.operation_6.rank}}</td>
                                <td>{{manufactured_products[1].operations.operation_6.rank}}</td>
                                <td>{{manufactured_products[2].operations.operation_6.rank}}</td>
                            </tr>
                        </table>
                        
                        <p>Таблица 2. Общие данные по используемому оборудованию</p>
                        <table>
                            <tr>
                                <th>Шифр</th>
                                <th>Наименование оборудования</th>
                                <th>Модель</th>
                                <th>Профессия рабочего</th>
                            </tr>
                            <tr v-for="equipment in equipments">
                                    <td>{{equipment.equipment_num}}</td>
                                    <td>{{equipment.equipment_title}}</td>
                                    <td>{{equipment.equipment_model}}</td>
                                    <td>{{employees[equipment.profession].title}}</td>
                                </tr>
                        </table>
                        
                        <p>Таблица 3. Стандартные параметры режимов работы рабочих и оборудования:</p>
                        <table>
                            <tr>
                                <th>Показатели режима работы</th>
                                <th>Единица персонала</th>
                                <th>Единица оборудования</th>
                            </tr>
                            <tr>
                                <td>Часов в смене</td>
                                <td>{{companion_data.emp_hours}}</td>
                                <td>{{companion_data.equ_hours}}</td>
                            </tr>
                            <tr>
                                <td>Смен в дне</td>
                                <td>{{companion_data.emp_workdays}}</td>
                                <td>{{companion_data.equ_workdays}}</td>
                            </tr>
                            <tr>
                                <td>Дней в месяце</td>
                                <td>{{companion_data.emp_days}}</td>
                                <td>{{companion_data.equ_days}}</td>
                            </tr>
                            <tr>
                                <td>Месяцев в году</td>
                                <td>{{companion_data.emp_month}}</td>
                                <td>{{companion_data.equ_month}}</td>
                            </tr>
                            <tr>
                                <td>Часов в году</td>
                                <td>{{companion_data.emp_year_h}}</td>
                                <td>{{companion_data.equ_year_h}}</td>
                            </tr>
                        </table>
                        
                        <p>Предполагается, что предприятие будет работать при двухсменном режиме работы. Плановый коэффициент загрузки оборудования – <strong>{{companion_data.load_coeff*100}} %</strong>. Плановый коэффициент выполнения норм времени – <strong>{{companion_data.time_coeff}}</strong>.</p>
                    </div>

                    <div>
                    <h2>1. Определение перечня требуемого оборудования</h2>
                    <p>Для определения перечня используемого оборудования достаточно обратиться к таблице 4, взять столбец «шифр оборудования» и удалить из него все повторяющиеся значения.</p>
                    <p>Определённый перечень необходимо внести в таблицу ниже. Для этого следует в столбце «Шифр» сверху вниз поочерёдно в каждой ячейке выбрать нужный номер из всплывающего списка.</p> 
                    
                    
                    <table>
                        <tr>
                            <th>Шифр</th>
                            <th>Модель</th>
                            <th>Навание</th>
                        </tr>
                        <tr v-for="e_n in array_0_n(companion_data.used_equipment_len)">
                            <td :class="get_correctness_class('used_equipment', e_n)">
                                <select v-model="user_data.used_equipment[e_n].equipment" @change="set_answer" class="many-correctness">
                                    <option value="">Выберите оборудование</option>
                                    <option v-for="op in equipments" :value="'equipment_'+op.equipment_num" v-html="op.equipment_num" :disabled="user_data.used_equipment.map(l=>l.equipment).includes('equipment_'+op.equipment_num)"></option>
                                </select>
                            </td>
                            <td :class="get_correctness_class('used_equipment', e_n)">
                                    <template v-if="user_data.used_equipment[e_n].equipment">
                                    {{get_equipment(user_data.used_equipment[e_n].equipment.replace("equipment_", "")).equipment_model}}
                                    </template>
                            </td>
                            <td :class="get_correctness_class('used_equipment', e_n)">
                            <template v-if="user_data.used_equipment[e_n].equipment">
                                    {{get_equipment(user_data.used_equipment[e_n].equipment.replace("equipment_", "")).equipment_title}}
                                    </template>                            
                            </td>
                        </tr>
                    </table>
                    </div>

                    <div>

                        <h2>2. Определение перечня требуемых профессий с разрядами</h2>
                        <p>Для определения перечня требуемых профессий с разрядами необходимо также обратиться к таблице 4, построчно объединить значения из её столбцов «профессия» и «разряд» и затем удалить из полученного результата все повторяющиеся значения.</p>
                        <p>Определённый перечень необходимо внести в таблицу ниже. Для этого следует в столбце «Профессия и разряд» сверху вниз поочерёдно в каждой ячейке выбрать нужное значение из всплывающего списка.</p>
                        
                        <table>
                            <tr>
                                <th>Профессия и разряд</th>
                            </tr>
                            <tr v-for="(e_u, index) in user_data.used_employees">
                                <td :class="get_correctness_class('used_employees', index)">
                                   <select v-model="e_u.profession_rank" @change="set_answer">
                                        <option value="">Выберите работника</option>
                                        <option v-for="(value,index1) in all_professions" :value="value.id" v-html="value.title"  :disabled="user_data.used_employees.map(l=>l.profession_rank).includes(value.id)" ></option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    
                    </div>
                    
                    <div>
                        <h2>3. Поэтапный расчёт потребного количества оборудования</h2>
                        <p>Этап 1. Определение по каждой выбранной модели оборудования штучного времени на каждый вид выпускаемого изделия</p>
                        
                        <table>
                            <tr>
                                <th rowspan="2">Шифр</th>
                                <th rowspan="2">Модель</th>
                                <th colspan="3">Штучное время на 1 изделие, мин</th>
                            </tr>
                            <tr>
                                <th>{{manufactured_products[0].product_num}}</th>
                                <th>{{manufactured_products[1].product_num}}</th>
                                <th>{{manufactured_products[2].product_num}}</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_equipment">
                                <template v-if="!el.equipment">
                                    <td colspan="5" style="text-align: center;">Выберите оборудование для этой позиции</td>
                                </template>
                                
                                <template v-else>
                                    <td>
<!--                                        <template v-if="el.equipment">-->
                                            {{get_equipment(el.equipment).equipment_num}}
<!--                                        </template>-->
                                    </td>
                                    <td>
<!--                                        <template v-if="el.equipment">-->
                                            {{get_equipment(el.equipment).equipment_model}}
<!--                                        </template>-->
                                    </td>
                                
                                    <td :class="get_correctness_class('used_equipment_table_1', index, 0)"><input type="number" v-model.number="el.table_1[0]" @change="set_answer" /></td>
                                    <td :class="get_correctness_class('used_equipment_table_1', index, 1)"><input type="number" v-model.number="el.table_1[1]" @change="set_answer" /></td>
                                    <td :class="get_correctness_class('used_equipment_table_1', index, 2)"><input type="number" v-model.number="el.table_1[2]" @change="set_answer"  /></td>
                                </template>
                                
                            </tr>
                        </table>
                    </div>
                    
                    <div>
                        <p>Этап 2. Определение по каждой выбранной модели оборудования общей загрузки на годовой объём работ</p>
                        
                        <table>
                            <tr>
                                <th rowspan="2">Шифр</th>
                                <th rowspan="2">Модель</th>
                                <th colspan="4">Общее время на годовой объём, час</th>
                            </tr>
                            <tr>
                                <th>{{manufactured_products[0].product_num}}</th>
                                <th>{{manufactured_products[1].product_num}}</th>
                                <th>{{manufactured_products[2].product_num}}</th>
                                <th>ИТОГО</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_equipment">
                                <template v-if="!el.equipment">
                                    <td colspan="6" style="text-align: center;">Выберите оборудование для этой позиции</td>
                                </template>
                                
                                <template v-else>
                                <td>
<!--                                    <template v-if="el.equipment">-->
                                        {{get_equipment(el.equipment).equipment_num}}
<!--                                    </template>-->
                                </td>
                                <td>

<!--                                    <template v-if="el.equipment">-->
                                        {{get_equipment(el.equipment).equipment_model}}
<!--                                    </template>-->
                                </td>
                            
                                <td :class="get_correctness_class('used_equipment_table_2', index, 0)"><input type="number" v-model.number="el.table_2[0]" @change="set_answer"/></td>
                                <td :class="get_correctness_class('used_equipment_table_2', index, 1)"><input type="number" v-model.number="el.table_2[1]" @change="set_answer"/></td>
                                <td :class="get_correctness_class('used_equipment_table_2', index, 2)"><input type="number" v-model.number="el.table_2[2]" @change="set_answer"/></td>
                                <td>
                                    {{ el.table_2[0] + el.table_2[1] + el.table_2[2] }}
                                </td>
                                </template>
                            </tr>
                        </table>
                    </div>
                    
                    <div>
                        <p>Этап 3. Определение по каждой выбранной модели оборудования его потребного количества</p>
                        
                        <table>
                            <tr>
                                <th>Шифр</th>
                                <th>Модель</th>
                                <th>Общее время на годовой объём, час</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_equipment">
                               <template v-if="!el.equipment">
                                    <td colspan="3" style="text-align: center;">Выберите оборудование для этой позиции</td>
                                </template>
                                
                                <template v-else>
                                    <td>
<!--                                        <template v-if="el.equipment">-->
                                            {{get_equipment(el.equipment).equipment_num}}
<!--                                        </template>-->
                                    </td>
                                    <td>
    
<!--                                        <template v-if="el.equipment">-->
                                            {{get_equipment(el.equipment).equipment_model}}
<!--                                        </template>-->
                                    </td>
                                
                                    <td :class="get_correctness_class('used_equipment_table_3', index)"><input type="number" v-model.number="el.table_3" @change="set_answer"/></td>
                                </template>
                            </tr>
                        </table>
                    </div>
                    
                    <div>
                        <h2>4. Поэтапный расчёт потребного количества персонала</h2>
                        <p>Этап 1. Определение по каждой выбранной профессии с разрядом штучного времени на каждый вид выпускаемого изделия</p>
                        
                        <table>
                            <tr>
                                <th rowspan="2">Профессия и разряд</th>
                                <th colspan="3">Штучное время на 1 изделие, мин</th>
                            </tr>
                            <tr>
                                <th>{{manufactured_products[0].product_num}}</th>
                                <th>{{manufactured_products[1].product_num}}</th>
                                <th>{{manufactured_products[2].product_num}}</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_employees">
                                <template v-if="!all_professions[el.profession_rank]">
                                    <td colspan="4" style="text-align: center;">Выберите профессию для этой позиции</td>
                                </template>
                                
                                <template v-else>
                                    <td>
<!--                                        <template v-if="all_professions[el.profession_rank]">-->
                                            {{all_professions[el.profession_rank].title}}
<!--                                        </template>-->
                                    </td>
                                    <td :class="get_correctness_class('used_employees_table_1', index, 0)"><input type="number" v-model.number="el.table_1[0]" @change="set_answer"/></td>
                                    <td :class="get_correctness_class('used_employees_table_1', index, 1)"><input type="number" v-model.number="el.table_1[1]" @change="set_answer"/></td>
                                    <td :class="get_correctness_class('used_employees_table_1', index, 2)"><input type="number" v-model.number="el.table_1[2]" @change="set_answer"/></td>
                                    </template>
                            </tr>
                        </table>
                    </div>
                                        
                    <div>
                        <p>Этап 2. Определение по каждой выбранной профессии с разрядом общей загрузки на годовой объём работ</p>
                        
                        <table>
                            <tr>
                                <th rowspan="2">Профессия и разряд</th>
                                <th colspan="4">Общее время на годовой объём, час</th>
                            </tr>
                            <tr>
                                <th>{{manufactured_products[0].product_num}}</th>
                                <th>{{manufactured_products[1].product_num}}</th>
                                <th>{{manufactured_products[2].product_num}}</th>
                                <th>ИТОГО</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_employees">
                                <template v-if="!all_professions[el.profession_rank]">
                                    <td colspan="5" style="text-align: center;">Выберите профессию для этой позиции</td>
                                </template>
                                
                                <template v-else>
                                    <td>
<!--                                        <template v-if="all_professions[el.profession_rank]">-->
                                            {{all_professions[el.profession_rank].title}}
<!--                                        </template>-->
                                    </td>
                                    <td :class="get_correctness_class('used_employees_table_2', index, 0)"><input type="number" v-model.number="el.table_2[0]" @change="set_answer" :disabled="!el.profession_rank" /></td>
                                    <td :class="get_correctness_class('used_employees_table_2', index, 1)"><input type="number" v-model.number="el.table_2[1]" @change="set_answer" :disabled="!el.profession_rank" /></td>
                                    <td :class="get_correctness_class('used_employees_table_2', index, 2)"><input type="number" v-model.number="el.table_2[2]" @change="set_answer" :disabled="!el.profession_rank" /></td>
                                    <td> {{ el.table_2[0] + el.table_2[1] + el.table_2[2] }}</td>
                                </template>
                            </tr>
                        </table>
                    </div>
                                        
                    <div>
                        <p>Этап 3. Определение по каждой выбранной профессии с разрядом её потребного количества</p>
                        
                        <table>
                            <tr>
                                <th>Профессия и разряд</th>
                                <th>Потребное количество персонала, единиц</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_employees">
                                <template v-if="!all_professions[el.profession_rank]">
                                    <td colspan="2" style="text-align: center;">Выберите профессию для этой позиции</td>
                                </template>
                                
                                <template v-else>
                                <td>
<!--                                    <template v-if="all_professions[el.profession_rank]">-->
                                        {{all_professions[el.profession_rank].title}}
<!--                                    </template>-->
                                </td>
                                <td :class="get_correctness_class('used_employees_table_3', index)"><input type="number" v-model.number="el.table_3" @change="set_answer" :disabled="!el.profession_rank" /></td>
                                </template>
                            </tr>
                        </table>
                    </div>
                </div>
                `,
                el: '#machinery_management_task_5_text',
                data: {
                    companion_data: settings.companion_data,
                    manufactured_products: settings.manufactured_products,
                    equipments: settings.equipments,
                    employees: settings.employees,
                    user_data: user_data,
                    ranks: [2, 3, 4],
                },
                methods: {
                    array_0_n: function (n) {
                        return Array.from(Array(n).keys())
                    },
                    get_equipment(num){
                        if (typeof num == 'string'){
                            num = num.replace("equipment_","");
                        }
                        let filtered_get_equipment = this.equipments.filter(e=>e.equipment_num === parseInt(num));
                        if (filtered_get_equipment.length > 0){
                            return filtered_get_equipment[0];
                        }
                        else return undefined;
                    },
                    set_answer: function(event){
                        if (event) {
                            if (event.target.classList.contains("many-correctness")) {
                                let children = event.target.parentNode.parentNode.children;
                                for (let i = 0; i < children.length; i++) {
                                    children[i].classList.remove('correct');
                                    children[i].classList.remove('incorrect');
                                }
                            } else {
                                event.target.parentNode.classList.remove('correct');
                                event.target.parentNode.classList.remove('incorrect');
                            }
                        }
                        // event.target.parentNode.parentNode.children.classList.remove("incorrect");
                        answer.setJSON({answer: this.user_data});
                        console.log(JSON.stringify({answer: this.user_data}));
                        // answer.setJSON({answer: this.user_data});
                    },
                    show_correctness(){
                        if (correctness) {
                            // console.log(correctness)
                        }
                    },
                    get_correctness_class(table, num, sub_num){
                        // console.log(sub_num)
                        if (correctness) {
                            if (sub_num == undefined){
                                if(correctness[table][num]){
                                    return 'correct'
                                }
                                else{
                                    return 'incorrect'
                                }
                            }
                            else {
                                if(correctness[table][num][sub_num]){
                                    return 'correct'
                                }
                                else{
                                    return 'incorrect'
                                }
                            }
                        }
                    },

                },
                computed: {
                    all_professions: function () {
                        let all_emp = {};
                        Object.keys(this.employees).forEach(e=> {
                            this.ranks.forEach(r=>{
                                all_emp[e + "_" + r] = {
                                    id: e + "_" + r,
                                    title: this.employees[e].title + " " + r + " разряда",
                                }
                            });
                        });
                        return all_emp;
                    }


                },
                beforeMount() {
                    this.set_answer();
                },
                mounted(){
                    this.show_correctness();
                },


            })

        }
    };

    let utils = {
        fill_array: function (size, obj) {
            let array = [];
            for (let i = 0; i < size; i++) {
                array.push({...obj});
            }
            return array;
        }
    };

    MachineryManagementInit.init();
}

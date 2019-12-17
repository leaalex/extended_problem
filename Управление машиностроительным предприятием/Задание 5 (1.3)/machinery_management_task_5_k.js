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

            if (answer) {
                if (answer.get()) {
                    user_data = answer.getJSON()["answer"];
                }
            }

            new Vue({
                template: `
                <div id="machinery_management_task_5_block">
                    <div>
                        <h2>Исходные данные:</h2>
                        <p>На будущий рабочий год был подготовлен следующий план производства и реализации продукции:</p>
                        <ul>
                            <li>первое изделие – {{companion_data.products_count[0]}} шт.</li>
                            <li>второе изделие – {{companion_data.products_count[1]}} шт.</li>
                            <li>третье изделие – {{companion_data.products_count[2]}} шт.</li>
                        </ul>
                        <p>Вместе с этим имеются следующие исходные данные.</p>

                        <table class="source-table" id="source_table_1">
                            <caption>Таблица 1. Данные по выпускаемым изделиям</caption>
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
                                <th rowspan="3" >Опреция 1</th>
                                <td>Шифр модели оборудования</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_1.model}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_1.model}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_1.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_1.time}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_1.time}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_1.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_1.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_1.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_1.rank}}</td>
                            </tr>
                            
                            
                            <tr>
                                <th rowspan="3">Опреция 2</th>
                                <td>Шифр модели оборудования</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_2.model}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_2.model}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_2.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_2.time}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_2.time}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_2.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_2.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_2.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_2.rank}}</td>
                            </tr>
                            <tr>
                                <th rowspan="3">Опреция 3</th>
                                <td>Шифр модели оборудования</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_3.model}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_3.model}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_3.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_3.time}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_3.time}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_3.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_3.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_3.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_3.rank}}</td>
                            </tr>
                            <tr>
                                <th rowspan="3">Опреция 4</th>
                                <td>Шифр модели оборудования</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_4.model}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_4.model}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_4.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_4.time}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_4.time}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_4.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_4.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_4.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_4.rank}}</td>
                            </tr>
                            <tr>
                                <th rowspan="3">Опреция 5</th>
                                <td>Шифр модели оборудования</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_5.model}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_5.model}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_5.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_5.time}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_5.time}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_5.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_5.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_5.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_5.rank}}</td>
                            </tr>
                            <tr>
                                <th rowspan="3">Опреция 6</th>
                                <td>Шифр модели оборудования</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_6.model}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_6.model}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_6.model}}</td>
                            </tr>
                            <tr>
                                <td>Штучно-калькуляционное время, мин</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_6.time}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_6.time}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_6.time}}</td>
                            </tr>
                            <tr>
                                <td>Разряд работы</td>
                                <td class="centered-cell">{{manufactured_products[0].operations.operation_6.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[1].operations.operation_6.rank}}</td>
                                <td class="centered-cell">{{manufactured_products[2].operations.operation_6.rank}}</td>
                            </tr>
                        </table>
                        
                        <table class="source-table" id="source_table_2">
                            <caption>Таблица 2. Общие данные по используемому оборудованию</caption>
                            <tr>
                                <th>Шифр</th>
                                <th>Наименование оборудования</th>
                                <th>Модель</th>
                                <th>Профессия рабочего</th>
                            </tr>
                            <tr v-for="equipment in equipments">
                                    <td class="centered-cell"><strong>{{equipment.equipment_num}}</strong></td>
                                    <td>{{equipment.equipment_title}}</td>
                                    <td class="centered-cell">{{equipment.equipment_model}}</td>
                                    <td class="centered-cell">{{employees[equipment.profession].title}}</td>
                                </tr>
                        </table>
                        
                        <table class="source-table" id="source_table_3">
                            <caption>Таблица 3. Стандартные параметры режимов работы рабочих и оборудования:</caption>
                            <tr>
                                <th>Показатели режима работы</th>
                                <th>Единица персонала</th>
                                <th>Единица оборудования</th>
                            </tr>
                            <tr>
                                <td>Часов в смене</td>
                                <td class="centered-cell">{{companion_data.emp_hours}}</td>
                                <td class="centered-cell">{{companion_data.equ_hours}}</td>
                            </tr>
                            <tr>
                                <td>Смен в дне</td>
                                <td class="centered-cell">{{companion_data.emp_workdays}}</td>
                                <td class="centered-cell">{{companion_data.equ_workdays}}</td>
                            </tr>
                            <tr>
                                <td>Дней в месяце</td>
                                <td class="centered-cell">{{companion_data.emp_days}}</td>
                                <td class="centered-cell">{{companion_data.equ_days}}</td>
                            </tr>
                            <tr>
                                <td>Месяцев в году</td>
                                <td class="centered-cell">{{companion_data.emp_month}}</td>
                                <td class="centered-cell">{{companion_data.equ_month}}</td>
                            </tr>
                            <tr>
                                <td>Часов в году</td>
                                <td class="centered-cell">{{companion_data.emp_year_h}}</td>
                                <td class="centered-cell">{{companion_data.equ_year_h}}</td>
                            </tr>
                        </table>
                        
                        <p>Предполагается, что предприятие будет работать при двухсменном режиме работы. Плановый коэффициент загрузки оборудования – \\({{companion_data.load_coeff*100}} \ \\% \\). Плановый коэффициент выполнения норм времени – \\({{companion_data.time_coeff}}\\).</p>
                    
                        <h2>Задание:</h2>
                        <ol>
                            <li>Определить перечень требуемого оборудования</li>
                            <li>Определить перечень требуемых профессий с разрядами</li>
                            <li>Рассчитать потребное количество оборудования</li>
                            <li>Рассчитать потребное количество персонала</li>
                        </ol>
                         
                    </div>

                    <div>
                        
                        <h2>Решение:</h2>
                        
                    <div>
                    <h2>1. Определение перечня требуемого оборудования</h2>
                    <p>Определённый перечень необходимо <strong>внести в таблицу ниже</strong>. Для этого следует в столбце <strong>«Шифр»</strong> сверху вниз поочерёдно в каждой ячейке выбрать нужный номер из всплывающего списка.</p> 
                    
                    
                    <table class="problem-table">
                        <tr>
                            <th style="width: 200px;">Шифр</th>
                            <th style="width: 130px;">Модель</th>
                            <th>Навание</th>
                        </tr>
                        <tr v-for="e_n in array_0_n(companion_data.used_equipment_len)">
                            <td :class="get_correctness_class('used_equipment', e_n)" class="select-cell">
                                <select v-model="user_data.used_equipment[e_n].equipment" @change="set_answer" class="many-correctness">
                                    <option value="">Выберите оборудование</option>
                                    <option v-for="op in equipments" :value="'equipment_'+op.equipment_num" v-html="op.equipment_num" :disabled="user_data.used_equipment.map(l=>l.equipment).includes('equipment_'+op.equipment_num)"></option>
                                </select>
                            </td>
                            <td :class="get_correctness_class('used_equipment', e_n)" class="centered-cell auto-calculated-cell">
                                    <template v-if="user_data.used_equipment[e_n].equipment">
                                    {{get_equipment(user_data.used_equipment[e_n].equipment.replace("equipment_", "")).equipment_model}}
                                    </template>
                            </td>
                            <td :class="get_correctness_class('used_equipment', e_n)" class="auto-calculated-cell">
                            <template v-if="user_data.used_equipment[e_n].equipment">
                                    {{get_equipment(user_data.used_equipment[e_n].equipment.replace("equipment_", "")).equipment_title}}
                                    </template>                            
                            </td>
                        </tr>
                    </table>
                    </div>

                    <div>

                        <h2>2. Определение перечня требуемых профессий с разрядами</h2>
                        <p>Определённый перечень необходимо <strong>внести в таблицу ниже</strong>. Для этого следует в столбце <strong>«Профессия и разряд»</strong> сверху вниз поочерёдно в каждой ячейке выбрать нужное значение из всплывающего списка.</p>
                        
                        <table class="problem-table" style="width: 220px !important;">
                            <tr>
                                <th>Профессия и разряд</th>
                            </tr>
                            <tr v-for="(e_u, index) in user_data.used_employees">
                                <td :class="get_correctness_class('used_employees', index)" class="select-cell">
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
                        <h3><strong>Этап 1.</strong> Определение по каждой выбранной модели оборудования штучного времени на каждый вид выпускаемого изделия</h3>
                        
                        <div class="problem-hint-block">
                            <p>Для выполнения данного этапа следует <strong>заполнить таблицу ниже</strong>.</p>
                        </div>
                        
                        <table id="problem_table_1" class="problem-table">
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
                                    <td colspan="5" class="empty-employee">{{select_equipment_label}}</td>
                                </template>
                                
                                <template v-else>
                                    <td class="auto-calculated-cell centered-cell">
<!--                                        <template v-if="el.equipment">-->
                                            {{get_equipment(el.equipment).equipment_num}}
<!--                                        </template>-->
                                    </td>
                                    <td class="auto-calculated-cell centered-cell">
<!--                                        <template v-if="el.equipment">-->
                                            {{get_equipment(el.equipment).equipment_model}}
<!--                                        </template>-->
                                    </td>
                                
                                    <td :class="get_correctness_class('used_equipment_table_1', index, 0)" class="input-cell"><input type="number" v-model.number="el.table_1[0]" @change="set_answer" /></td>
                                    <td :class="get_correctness_class('used_equipment_table_1', index, 1)" class="input-cell"><input type="number" v-model.number="el.table_1[1]" @change="set_answer" /></td>
                                    <td :class="get_correctness_class('used_equipment_table_1', index, 2)" class="input-cell"><input type="number" v-model.number="el.table_1[2]" @change="set_answer"  /></td>
                                </template>
                                
                            </tr>
                        </table>
                    </div>
                    
                    <div>
                        <h3><strong>Этап 2.</strong> Определение по каждой выбранной модели оборудования общей загрузки на годовой объём работ</h3>
                        
                        <div class="problem-hint-block">
                            <p>Для выполнения данного этапа следует <strong>заполнить таблицу ниже</strong>.</p>
                        </div>
                        
                        <table id="problem_table_2" class="problem-table">
                            <tr>
                                <th rowspan="2">Шифр</th>
                                <th rowspan="2">Модель</th>
                                <th colspan="4">Общее время на годовой объём, час</th>
                            </tr>
                            <tr>
                                <th>{{manufactured_products[0].product_num}}</th>
                                <th>{{manufactured_products[1].product_num}}</th>
                                <th>{{manufactured_products[2].product_num}}</th>
                                <th style="width: 100px;">ИТОГО</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_equipment">
                                <template v-if="!el.equipment">
                                    <td colspan="6" class="empty-employee">{{select_equipment_label}}</td>
                                </template>
                                
                                <template v-else>
                                <td class="auto-calculated-cell centered-cell">
<!--                                    <template v-if="el.equipment">-->
                                        {{get_equipment(el.equipment).equipment_num}}
<!--                                    </template>-->
                                </td>
                                <td class="auto-calculated-cell centered-cell">

<!--                                    <template v-if="el.equipment">-->
                                        {{get_equipment(el.equipment).equipment_model}}
<!--                                    </template>-->
                                </td>
                            
                                <td :class="get_correctness_class('used_equipment_table_2', index, 0)" class="input-cell"><input type="number" v-model.number="el.table_2[0]" @change="set_answer"/></td>
                                <td :class="get_correctness_class('used_equipment_table_2', index, 1)" class="input-cell"><input type="number" v-model.number="el.table_2[1]" @change="set_answer"/></td>
                                <td :class="get_correctness_class('used_equipment_table_2', index, 2)" class="input-cell"><input type="number" v-model.number="el.table_2[2]" @change="set_answer"/></td>
                                <td class="auto-calculated-cell centered-cell">
                                    <strong>{{ el.table_2[0] + el.table_2[1] + el.table_2[2] }}</strong>
                                </td>
                                </template>
                            </tr>
                        </table>
                    </div>
                    
                    <div>
                        <h3><strong>Этап 3.</strong> Определение по каждой выбранной модели оборудования его потребного количества</h3>
                        
                        <div class="problem-hint-block">
                            <p>Для выполнения данного этапа следует <strong>заполнить таблицу ниже</strong>.</p>
                            <p>После заполнения последней таблицы расчёт потребного количества оборудования считается законченным.</p>       
                        </div>
                        <table id="problem_table_3" class="problem-table">
                            <tr>
                                <th>Шифр</th>
                                <th>Модель</th>
                                <th>Общее время на годовой объём, час</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_equipment">
                               <template v-if="!el.equipment">
                                    <td colspan="3" class="empty-employee">{{select_equipment_label}}</td>
                                </template>
                                
                                <template v-else>
                                    <td class="auto-calculated-cell centered-cell">
<!--                                        <template v-if="el.equipment">-->
                                            {{get_equipment(el.equipment).equipment_num}}
<!--                                        </template>-->
                                    </td>
                                    <td class="auto-calculated-cell centered-cell">
    
<!--                                        <template v-if="el.equipment">-->
                                            {{get_equipment(el.equipment).equipment_model}}
<!--                                        </template>-->
                                    </td>
                                
                                    <td :class="get_correctness_class('used_equipment_table_3', index)" class="input-cell"><input type="number" v-model.number="el.table_3" @change="set_answer"/></td>
                                </template>
                            </tr>
                        </table>
                    </div>
                    
                    <div>
                        <h2>4. Поэтапный расчёт потребного количества персонала</h2>
                        <h3><strong>Этап 1.</strong> Определение по каждой выбранной профессии с разрядом штучного времени на каждый вид выпускаемого изделия</h3>
                        
                        <div class="problem-hint-block">
                            <p>Для выполнения данного этапа следует <strong>заполнить таблицу ниже</strong>.</p>
                        </div>
                        
                        <table id="problem_table_4" class="problem-table">
                            <tr>
                                <th rowspan="2" style="width: 200px;">Профессия и разряд</th>
                                <th colspan="3">Штучное время на 1 изделие, мин</th>
                            </tr>
                            <tr>
                                <th>{{manufactured_products[0].product_num}}</th>
                                <th>{{manufactured_products[1].product_num}}</th>
                                <th>{{manufactured_products[2].product_num}}</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_employees">
                                <template v-if="!all_professions[el.profession_rank]">
                                    <td colspan="4" class="empty-equipment">{{select_employee_label}}</td>
                                </template>
                                
                                <template v-else>
                                    <td class="auto-calculated-cell centered-cell">
<!--                                        <template v-if="all_professions[el.profession_rank]">-->
                                            {{all_professions[el.profession_rank].title}}
<!--                                        </template>-->
                                    </td>
                                    <td :class="get_correctness_class('used_employees_table_1', index, 0)" class="input-cell"><input type="number" v-model.number="el.table_1[0]" @change="set_answer"/></td>
                                    <td :class="get_correctness_class('used_employees_table_1', index, 1)" class="input-cell"><input type="number" v-model.number="el.table_1[1]" @change="set_answer"/></td>
                                    <td :class="get_correctness_class('used_employees_table_1', index, 2)" class="input-cell"><input type="number" v-model.number="el.table_1[2]" @change="set_answer"/></td>
                                    </template>
                            </tr>
                        </table>                        
                    </div>
                                        
                    <div>
                        <h3><strong>Этап 2.</strong> Определение по каждой выбранной профессии с разрядом общей загрузки на годовой объём работ</h3>
                        
                        <div class="problem-hint-block">
                            <p>Для выполнения данного этапа следует <strong>заполнить таблицу ниже</strong>.</p>
                        </div>
                        
                        <table id="problem_table_5" class="problem-table">
                            <tr>
                                <th rowspan="2" style="width: 200px;">Профессия и разряд</th>
                                <th colspan="4">Общее время на годовой объём, час</th>
                            </tr>
                            <tr>
                                <th>{{manufactured_products[0].product_num}}</th>
                                <th>{{manufactured_products[1].product_num}}</th>
                                <th>{{manufactured_products[2].product_num}}</th>
                                <th style="width: 100px;">ИТОГО</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_employees">
                                <template v-if="!all_professions[el.profession_rank]">
                                    <td colspan="5" class="empty-equipment">{{select_employee_label}}</td>
                                </template>
                                
                                <template v-else>
                                    <td class="auto-calculated-cell centered-cell">
<!--                                        <template v-if="all_professions[el.profession_rank]">-->
                                            {{all_professions[el.profession_rank].title}}
<!--                                        </template>-->
                                    </td>
                                    <td :class="get_correctness_class('used_employees_table_2', index, 0)" class="input-cell"><input type="number" v-model.number="el.table_2[0]" @change="set_answer" :disabled="!el.profession_rank" /></td>
                                    <td :class="get_correctness_class('used_employees_table_2', index, 1)" class="input-cell"><input type="number" v-model.number="el.table_2[1]" @change="set_answer" :disabled="!el.profession_rank" /></td>
                                    <td :class="get_correctness_class('used_employees_table_2', index, 2)" class="input-cell"><input type="number" v-model.number="el.table_2[2]" @change="set_answer" :disabled="!el.profession_rank" /></td>
                                    <td class="auto-calculated-cell centered-cell"> 
                                        <strong>
                                            {{ el.table_2[0] + el.table_2[1] + el.table_2[2] }}
                                        </strong>
                                    </td>
                                </template>
                            </tr>
                        </table>
                    </div>
                                        
                    <div>
                        <h3><strong>Этап 3.</strong> Определение по каждой выбранной профессии с разрядом её потребного количества</h3>
                        
                        <div class="problem-hint-block">
                            <p>Для выполнения данного этапа следует <strong>заполнить таблицу ниже</strong>.</p>
                        </div>
                        <table id="problem_table_6" class="problem-table">
                            <tr>
                                <th style="width: 200px;">Профессия и разряд</th>
                                <th>Потребное количество персонала, единиц</th>
                            </tr>
                            <tr v-for="(el, index) in user_data.used_employees">
                                <template v-if="!all_professions[el.profession_rank]">
                                    <td colspan="2" class="empty-equipment">{{select_employee_label}}</td>
                                </template>
                                
                                <template v-else>
                                <td class="auto-calculated-cell centered-cell">
<!--                                    <template v-if="all_professions[el.profession_rank]">-->
                                        {{all_professions[el.profession_rank].title}}
<!--                                    </template>-->
                                </td>
                                <td :class="get_correctness_class('used_employees_table_3', index)" class="input-cell"><input type="number" v-model.number="el.table_3" @change="set_answer" :disabled="!el.profession_rank" /></td>
                                </template>
                            </tr>
                        </table>
                        <p>После заполнения последней таблицы расчёт потребного количества персонала считается законченным.</p>
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
                    select_equipment_label: "Выберите оборудование для этой позиции!",
                    select_employee_label: "Выберите профессию для этой позиции!",
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
                    },
                    get_table_4: function () {
                        let products = [];
                        let num_titles = ["первое", "второе", "третье"];
                        this.manufactured_products.forEach((product, product_index)=>{
                            Object.keys(product.operations).sort().forEach((operation,operation_index)=>{
                                let operation_num = "Операция "+ (operation_index + 1);
                                products.push([
                                    num_titles[product_index],
                                    operation_num,
                                    product.operations[operation].model,
                                    this.employees[product.operations[operation].profession].title,
                                    product.operations[operation].rank,
                                    product.operations[operation].time,
                                ]);
                            });
                        });

                        return products;
                    },


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

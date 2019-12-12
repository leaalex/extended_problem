function MachineryManagement5(user_settings) {

    let settings = user_settings.data;

    console.log(settings);

    let user_data = {};

    let MachineryManagementInit = {
        init: function () {

            user_data.used_equipment = new Array(settings.companion_data.used_equipment_len).fill(0);
            user_data.used_equipment = user_data.used_equipment.map(el=> {return {equipment: "", table_1: Array(3).fill(0), table_2: Array(3).fill(0), table_3: 0}});

            user_data.used_employees = new Array(settings.companion_data.used_employees_len).fill(0);
            user_data.used_employees = user_data.used_employees.map(el=> {return {profession: "", rank: "", table_1: Array(3).fill(0), table_2: Array(3).fill(0), table_3: 0}});


            user_data = {"used_equipment":[{"equipment":"equipment_1","table_1":[1,2,3],"table_2":[22,23,24],"table_3":43},{"equipment":"equipment_2","table_1":[4,5,6],"table_2":[25,26,27],"table_3":44},{"equipment":"equipment_3","table_1":[7,8,9],"table_2":[28,29,30],"table_3":45},{"equipment":"equipment_5","table_1":[10,11,12],"table_2":[31,32,33],"table_3":46},{"equipment":"equipment_6","table_1":[13,14,15],"table_2":[34,35,36],"table_3":47},{"equipment":"equipment_7","table_1":[16,17,18],"table_2":[37,38,39],"table_3":48},{"equipment":"equipment_12","table_1":[19,20,21],"table_2":[40,41,41],"table_3":49}],"used_employees":[{"profession":"carver","rank":2,"table_1":[0,0,0],"table_2":[0,0,0],"table_3":0},{"profession":"turner","rank":2,"table_1":[0,0,0],"table_2":[0,0,0],"table_3":0},{"profession":"turner","rank":3,"table_1":[0,0,0],"table_2":[0,0,0],"table_3":0},{"profession":"turner","rank":4,"table_1":[0,0,0],"table_2":[0,0,0],"table_3":0},{"profession":"milling","rank":3,"table_1":[0,0,0],"table_2":[0,0,0],"table_3":0},{"profession":"milling","rank":4,"table_1":[0,0,0],"table_2":[0,0,0],"table_3":0},{"profession":"grinder","rank":3,"table_1":[0,0,0],"table_2":[0,0,0],"table_3":0},{"profession":"grinder","rank":4,"table_1":[0,0,0],"table_2":[0,0,0],"table_3":0}]}


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
                            <td>
                                <select v-model="user_data.used_equipment[e_n].equipment" @change="set_answer">
                                    <option value="">Выберите оборудование</option>
                                    
                                    <option v-for="op in equipments" :value="'equipment_'+op.equipment_num" v-html="op.equipment_num" :disabled="user_data.used_equipment.map(l=>l.equipment).includes('equipment_'+op.equipment_num)"></option>
                                </select>
                            </td>
                            <td>
                                    <template v-if="user_data.used_equipment[e_n].equipment">
                                    {{get_equipment(user_data.used_equipment[e_n].equipment.replace("equipment_", "")).equipment_model}}
                                    </template>
                            </td>
                            <td>
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
                            <th>Профессия</th>
                            <th>Разряд</th>
                        </tr>
                        <tr v-for="(e_u, index) in user_data.used_employees" >
                            <td>
                               <select v-model="e_u.profession" @change="set_answer">
                                    <option value="">Выберите профессию</option>
                                    <option v-for="(emp, index) in employees" :value="emp.id" v-html="emp.title"></option>
                                </select>
                            </td>
                            <td>
                               <select v-model="e_u.rank" @change="set_answer">
                                    <option value="">Выберите разряд</option>
                                    <option v-for="value in [2,3,4]" :value="value" v-html="value" ></option>
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
                                <td>
                                    <template v-if="el.equipment">
                                        {{get_equipment(el.equipment).equipment_num}}
                                    </template>
                                </td>
                                <td>

                                    <template v-if="el.equipment">
                                        {{get_equipment(el.equipment).equipment_model}}
                                    </template>
                                </td>
                            
                                <td><input type="number" v-model.number="el.table_1[0]" @change="set_answer" /></td>
                                <td><input type="number" v-model.number="el.table_1[1]" @change="set_answer" /></td>
                                <td><input type="number" v-model.number="el.table_1[2]" @change="set_answer"  /></td>
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
                                <td>
                                    <template v-if="el.equipment">
                                        {{get_equipment(el.equipment).equipment_num}}
                                    </template>
                                </td>
                                <td>

                                    <template v-if="el.equipment">
                                        {{get_equipment(el.equipment).equipment_model}}
                                    </template>
                                </td>
                            
                                <td><input type="number" v-model.number="el.table_2[0]" @change="set_answer" /></td>
                                <td><input type="number" v-model.number="el.table_2[1]" @change="set_answer" /></td>
                                <td><input type="number" v-model.number="el.table_2[2]" @change="set_answer" /></td>
                                <td>
                                    {{ el.table_2[0] + el.table_2[1] + el.table_2[2] }}
                                </td>
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
                                <td>
                                    <template v-if="el.equipment">
                                        {{get_equipment(el.equipment).equipment_num}}
                                    </template>
                                </td>
                                <td>

                                    <template v-if="el.equipment">
                                        {{get_equipment(el.equipment).equipment_model}}
                                    </template>
                                </td>
                            
                                <td><input type="number" v-model.number="el.table_3" @change="set_answer" /></td>
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
                                <td>
                                    <template v-if="employees[el.profession] && el.rank">
                                        {{employees[el.profession].title}} {{el.rank}} разряда
                                    </template>
                                </td>
                                <td><input type="number" v-model.number="el.table_1[0]" @change="set_answer" /></td>
                                <td><input type="number" v-model.number="el.table_1[1]" @change="set_answer" /></td>
                                <td><input type="number" v-model.number="el.table_1[2]" @change="set_answer" /></td>
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
                                <td>
                                    <template v-if="employees[el.profession] && el.rank">
                                        {{employees[el.profession].title}} {{el.rank}} разряда
                                    </template>
                                    
                                </td>
                            
                                <td><input type="number" v-model.number="el.table_2[0]" @change="set_answer" /></td>
                                <td><input type="number" v-model.number="el.table_2[1]" @change="set_answer" /></td>
                                <td><input type="number" v-model.number="el.table_2[2]" @change="set_answer" /></td>
                                <td> {{ el.table_2[0] + el.table_2[1] + el.table_2[2] }}</td>
    
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
                                <td>
                                    <template v-if="employees[el.profession] && el.rank">
                                        {{employees[el.profession].title}} {{el.rank}} разряда
                                    </template>
                                </td>
                                <td><input type="number" v-model.number="el.table_3" @change="set_answer" /></td>
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
                    set_answer: function(){
                        console.log(JSON.stringify({answer: this.user_data}));
                        // answer.setJSON({answer: this.user_data});
                    },

                },
                computed: {

                }


            })

        }
    };

    let utils = {
        zeros: function (dimensions) {
            let array = [];
            for (let i = 0; i < dimensions[0]; ++i) {
                array.push(dimensions.length === 1 ? 0 : this.zeros(dimensions.slice(1)));
            }
            return array;
        },
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

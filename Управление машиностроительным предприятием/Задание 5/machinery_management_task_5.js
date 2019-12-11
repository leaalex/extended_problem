function MachineryManagement5(user_settings) {

    let settings = user_settings.data;

    console.log(settings);

    let user_data = {};

    let MachineryManagementInit = {
        init: function () {

            user_data.used_equipment = utils.fill_array(settings.companion_data.used_equipment_len, "");
            user_data.used_employees = utils.fill_array(settings.companion_data.used_employees_len, "");

            console.log(user_data.used_employees);

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
                                <td colspan="2">выпускаемые изделия</td>
                                <td>первое</td>
                                <td>второе</td>
                                <td>третье</td>
                            </tr>
                            <tr>
                                <td colspan="2">номенклатурный номер изделия</td>
                                <td>{{manufactured_products[0].product_num}}</td>
                                <td>{{manufactured_products[1].product_num}}</td>
                                <td>{{manufactured_products[2].product_num}}</td>
                            </tr>
                            <tr>
                                <td rowspan="3">Опреция 1</td>
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
                                <td rowspan="3">Опреция 2</td>
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
                                <td rowspan="3">Опреция 3</td>
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
                                <td rowspan="3">Опреция 4</td>
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
                                <td rowspan="3">Опреция 5</td>
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
                                <td rowspan="3">Опреция 6</td>
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
                                <th>профессия рабочего</th>
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
                                <th>показатели режима работы</th>
                                <th>единица персонала</th>
                                <th>единица оборудования</th>
                            </tr>
                            <tr>
                                <td>часов в смене</td>
                                <td>{{companion_data.emp_hours}}</td>
                                <td>{{companion_data.equ_hours}}</td>
                            </tr>
                            <tr>
                                <td>смен в дне</td>
                                <td>{{companion_data.emp_workdays}}</td>
                                <td>{{companion_data.equ_workdays}}</td>
                            </tr>
                            <tr>
                                <td>дней в месяце</td>
                                <td>{{companion_data.emp_days}}</td>
                                <td>{{companion_data.equ_days}}</td>
                            </tr>
                            <tr>
                                <td>месяцев в году</td>
                                <td>{{companion_data.emp_month}}</td>
                                <td>{{companion_data.equ_month}}</td>
                            </tr>
                            <tr>
                                <td>часов в году</td>
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
                                <select v-model="user_data.used_equipment[e_n]" @change="test_method">
                                    <option value="">Выберите оборудование</option>
                                    <option v-for="op in equipments" :value="'equipment_'+op.equipment_num" v-html="op.equipment_num" :disabled="user_data.used_equipment.includes('equipment_'+op.equipment_num)"></option>
                                </select>
                            </td>
                            <td>
                                    <template v-if="user_data.used_equipment[e_n]">
                                    {{get_equipment(user_data.used_equipment[e_n].replace("equipment_", "")).equipment_model}}
                                    </template>
                            </td>
                            <td>
                            <template v-if="user_data.used_equipment[e_n]">
                                    {{get_equipment(user_data.used_equipment[e_n].replace("equipment_", "")).equipment_title}}
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
                    <tr v-for="e_n_i in array_0_n(companion_data.used_employees_len)" >
                        <td>
                               <select v-model="user_data.used_employees[e_n_i]" @change="test_method">
                                    <option value="">Выберите профессию</option>
                                    <option v-for="(emp, index) in get_all_employees()"  v-bind:value="emp.name" v-html="emp.title" :disabled="user_data.used_employees.includes(emp.name)"></option>
                                </select>
                        </td>
                        <td>
<!--                           <select v-model="user_data.used_employees[e_n].rank" @change="test_method">-->
<!--                                <option value="">Выберите разряд</option>-->
<!--                                <option v-for="value in [2,3,4]" :value="value" v-html="value" ></option>-->
<!--                            </select>-->
                        </td>
                    </tr>
                    </table>
                    
                    </div>
                    
                    <div>
                    <h2>3. Поэтапный расчёт потребного количества оборудования</h2>
                    <p>Этап 1. Определение по каждой выбранной модели оборудования штучного времени на каждый вид выпускаемого изделия</p>
                    
                    <table>
                        <tr>
                            <td rowspan="2">Шифр</td>
                            <td rowspan="2">Модель</td>
                            <td colspan="3">Штучное время на 1 изделие, мин</td>
                        </tr>
                        <tr>
                            <td>{{manufactured_products[0].product_num}}</td>
                            <td>{{manufactured_products[1].product_num}}</td>
                            <td>{{manufactured_products[2].product_num}}</td>
                        </tr>
                        <tr v-for="e_n in array_0_n(companion_data.used_equipment_len)">
                            <td>
                                <template v-if="user_data.used_equipment[e_n]">
                                    {{get_equipment(user_data.used_equipment[e_n]).equipment_num}}
                                </template>
                            </td>
                            <td>
                                <template v-if="user_data.used_equipment[e_n]">
                                    {{get_equipment(user_data.used_equipment[e_n]).equipment_model}}
                                </template>
                            </td>
                        
                            <td>input</td>
                            <td>input</td>
                            <td>input</td>
                        
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
                    test_method: function () {
                        console.log(user_data)
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

                    get_all_employees: function () {
                        let all_emp = [];
                        let tmp_emp = this.employees;
                        Object.keys(this.employees).forEach(function (emp) {
                            all_emp.push({"name": emp + "_2", title: tmp_emp[emp].title + " 2 разряда"});
                            all_emp.push({"name": emp + "_3", title: tmp_emp[emp].title + " 3 разряда"});
                            all_emp.push({"name": emp + "_4", title: tmp_emp[emp].title + " 4 разряда"});
                        });
                        return all_emp;
                    }
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
                array.push(obj);
            }
            return array;
        }
    };

    MachineryManagementInit.init();
}

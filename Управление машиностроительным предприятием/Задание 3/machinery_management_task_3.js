function MachineryManagement3(user_settings) {

    let settings = user_settings.data;

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
    // console.log(user_settings.input);
    answer = new Answer(user_settings.input.querySelector("textarea"));

    // operations.forEach((item,idx)=>{ if(idx>0) { pairs.push([operations[idx-1].id,item.id ]) } })

    let MachineryManagementInit = {
        init: function () {
            user_data.tact = 0;
            user_data.periods = utils.zeros([settings.periods_len]);
            user_data.workplaces = settings.workplaces.map(function (item) {
                return {
                    type: "",
                    congestion: 0,
                    employee: "",
                    work_time: "",
                    op_start: 0,
                    op_end: 0,
                }
            });
            user_data.operations_pairs = settings.operations_pairs.map(function (item) {
                let return_object = {
                    dynamic_value: 0,
                    changes: utils.zeros([settings.periods_len]),
                    dynamics: utils.zeros([settings.periods_len]),
                };
                return_object.pair = [];
                return_object.pair.push({
                    id: item[0],
                    KPPM: utils.zeros([settings.periods_len]),
                    out: utils.zeros([settings.periods_len]),
                });
                return_object.pair.push({
                    id: item[1],
                    KPPM: utils.zeros([settings.periods_len]),
                    out: utils.zeros([settings.periods_len]),
                });
                return return_object
            });

            user_data = {"tact": 1.6, "periods": [45, 120, 75],"workplaces": [{"type": "operation_1","congestion": 100,"employee": "employee_1","work_time": 240,"op_start": 0,"op_end": 240}, {"type": "operation_1","congestion": 18.75,"employee": "employee_2","work_time": 45,"op_start": 0,"op_end": 45}, {"type": "operation_2","congestion": 68.75,"employee": "employee_3","work_time": 165,"op_start": 0,"op_end": 165}, {"type": "operation_3","congestion": 100,"employee": "employee_4","work_time": 240,"op_start": 0,"op_end": 240}, {"type": "operation_3","congestion": 31.25,"employee": "employee_3","work_time": 75,"op_start": 165,"op_end": 75}, {"type": "operation_4","congestion": 81.25,"employee": "employee_2","work_time": 195,"op_start": 45,"op_end": 195}],"operations_pairs": [{"dynamic_value": 45,"changes": [6.459, -45.933, 37.13],"dynamics": [51.459, 5.526, 42.656],"pair": [{"id": "operation_1","KPPM": [2, 1, 1],"out": [47.368, 63.158, 39.47]}, {"id": "operation_2", "KPPM": [1, 1, 0], "out": [40.909, 109.091, 2.34]}]}, {"dynamic_value": 0,"changes": [40.909, 51.948, -71.429],"dynamics": [40.909, 92.857, 21.428],"pair": [{"id": "operation_2","KPPM": [1, 1, 0],"out": [40.909, 109.091, 0]}, {"id": "operation_3", "KPPM": [0, 1, 2], "out": [0, 57.143, 71.429]}]}, {"dynamic_value": 19,"changes": [21.429, -35.165, 13.737],"dynamics": [40.429, 5.264, 19.001],"pair": [{"id": "operation_3","KPPM": [1, 1, 2],"out": [21.429, 57.143, 71.429]}, {"id": "operation_4", "KPPM": [0, 1, 1], "out": [0, 92.308, 57.692]}]}]};
            //
            // user_data = { "tact": 0, "periods": [ 80, 20, 20, 60, 60 ], "workplaces": [ { "type": "operation_1", "congestion": 100, "employee": "employee_7", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_1", "congestion": 33.33, "employee": "employee_5", "work_time": 80, "op_start": 0, "op_end": 80 }, { "type": "operation_2", "congestion": 100, "employee": "employee_8", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_2", "congestion": 41.67, "employee": "employee_6", "work_time": 100, "op_start": 0, "op_end": 100 }, { "type": "operation_3", "congestion": 100, "employee": "employee_9", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_3", "congestion": 8.33, "employee": "employee_6", "work_time": 20, "op_start": 100, "op_end": 120 }, { "type": "operation_4", "congestion": 100, "employee": "employee_10", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_4", "congestion": 100, "employee": "employee_11", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_4", "congestion": 66.67, "employee": "employee_5", "work_time": 160, "op_start": 80, "op_end": 240 }, { "type": "operation_5", "congestion": 100, "employee": "employee_12", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_5", "congestion": 100, "employee": "employee_13", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_5", "congestion": 25, "employee": "employee_6", "work_time": 60, "op_start": 120, "op_end": 180 } ], "operations_pairs": [ { "dynamic_value": 11, "changes": [ 5.882, -11.029, 0.735, 2.206, 2.206 ], "dynamics": [ 16.882, 5.853, 6.588, 8.794, 11 ], "pair": [ { "id": "operation_1", "KPPM": [ 2, 1, 1, 1, 1 ], "out": [ 100, 12.5, 12.5, 37.5, 37.5 ] }, { "id": "operation_2", "KPPM": [ 2, 2, 1, 1, 1 ], "out": [ 94.1176, 23.5294, 11.7647, 35.29411, 35.29411 ] } ] }, { "dynamic_value": 6, "changes": [ 32.579, 8.145, -19.005, -10.86, -10.86 ], "dynamics": [ 38.579, 46.724, 27.719, 16.859, 5.999 ], "pair": [ { "id": "operation_2", "KPPM": [ 2, 2, 1, 1, 1 ], "out": [ 94.117647058823, 23.5294117647, 11.764705882, 35.2941176, 35.2941176 ] }, { "id": "operation_3", "KPPM": [ 1, 1, 2, 1, 1 ], "out": [ 61.538461, 15.384615, 30.76923, 46.15384615, 46.15384615 ] } ] }, { "dynamic_value": 5, "changes": [ 11.538, -3.365, 12.019, -10.096, -10.096 ], "dynamics": [ 16.538, 13.173, 25.192, 15.096, 5 ], "pair": [ { "id": "operation_3", "KPPM": [ 1, 1, 2, 1, 1 ], "out": [ 61.538461538, 15.384615384, 30.76923, 46.15384615, 46.15384615 ] }, { "id": "operation_4", "KPPM": [ 2, 3, 3, 3, 3 ], "out": [ 50, 18.75, 18.75, 56.25, 56.25 ] } ] }, { "dynamic_value": 17, "changes": [ -9.259, 3.935, 3.935, -10.417, 11.806 ], "dynamics": [ 7.741, 11.676, 15.611, 5.194, 17 ], "pair": [ { "id": "operation_4", "KPPM": [ 2, 3, 3, 3, 3 ], "out": [ 50, 18.75, 18.75, 56.25, 56.25 ] }, { "id": "operation_5", "KPPM": [ 2, 2, 2, 3, 2 ], "out": [ 59.2592592, 14.81481481, 14.81481481, 66.666666, 44.44444 ] } ] } ] }

            Vue.component('apexchart', VueApexCharts);

            new Vue({

                template: `
                    <div>
                        <div class="problem-block">
                            <div class="problem-block-wording">
                                    <h2>Условия задачи</h2>
                                <p><strong>Операции:</strong></p>
                                <ul>
                                    <li v-for="operation in operations">
                                        <p>#{{ operation.weight + 1 }} - <strong>{{ operation.title }}</strong> - {{ operation.duration }} мин.</p>
                                    </li>
                                </ul>
                                <p>N<sub>выпуска</sub> = <strong> {{companion_data.N_out}}</strong> штук в месяц</p>
                                <p>1 месяц =<strong> {{companion_data.month}}</strong> рабочий день</p>
                                <p>1 рабочий день =<strong> {{companion_data.work_day}}</strong> смены</p>
                                <p>1 смена =<strong> {{companion_data.work_shift}}</strong> часов</p>
                                <p>Период оборота линии (ПОЛ) =<strong> {{companion_data.half_shift}}</strong> смены</p>
                                <!--<p>Такт =<strong> {{round_num(companion_data.tact)}}</strong> мин./шт.</p>-->
                            </div>
                        </div>
<!--                        <p>{{user_data}}</p>-->
                        <div class="problem-block">
                            <div class="problem-block-wording">
                                <h2>Задание 1</h2>
                            </div>
             
                            <div class="problem-block-task">
                            <div id="tact_value">
                            <p>Время такта = <input class="tact-input" v-model.number="user_data.tact" @change="validate_tact" type="number"> мин./шт. <i>(округлить до <strong>десятых</strong>)</i></p>
                            </div>
                            <p><strong>Цветовая индикация:</strong></p>
                            <ul>
                            <li>Имя работника выделено <span style="color:green">зеленым</span> цветом - работник имеет оптимальную загрузку - 100 процентов рабочего времени.</li>
                            <li>Имя работника выделено <span style="color:red">красным</span> цветом - работник загружен более чем на 100 процентов, что <strong>является недопустимой ситуацией.</strong></li>
                            <li>Имя работника выделено <span style="color:orange">оранжевым</span> цветом - работник загружен менее чем на 100 процентов, что может являться нормальной ситуацией.</li>
                            </ul>
                                <div style="/*display: flex*/">
                                    <div>
                                        <table  class="problem-table problem-table-1" id="workplaces_table">
                                            <tr>
                                                <th>Операция</th>
<!--                                                <th>Нужное кол-во опраций</th>-->
                                                <th>№ РМ</th>
                                                <th>Загрузка РМ, %</th>
                                                <th>Рабочий</th>
<!--                                                <th>Загрузка рабочего</th>-->
                                                <th>Рабочее время</th> <!-- Раб. вр. Рабочее время -->
                                                <th>Начало графика</th> <!-- Нач. гр. Начало графика -->
                                                <th>Конец графика</th> <!-- Кон. гр. Конец графика -->
                                            </tr>
                                            <tr v-for="(workplace,ind) in user_data.workplaces">
                                                <td class="input-cell">
                                                    <select v-model="workplace.type" @change="set_answer">
                                                        <option value="">Нет операции</option>
                                                        <option v-for="op in operations" :value="op.id" v-html="op.title"></option>
                                                    </select>
                                                </td>
<!--                                                <td>        -->
<!--                                                            <div v-if="user_data.workplaces.every(elem => elem.type != '')">-->
<!--                                                                <div v-if="user_data.workplaces.filter(w => (workplace.type!='' && w.type==workplace.type)).length == workplaces.filter(w_t=>w_t == workplace.type).length">Норм</div>-->
<!--                                                                <div v-else-if="user_data.workplaces.filter(w => (workplace.type!='' && w.type==workplace.type)).length < workplaces.filter(w_t=>w_t == workplace.type).length">Слишком мало</div>-->
<!--                                                                <div v-else-if="user_data.workplaces.filter(w => (workplace.type!='' && w.type==workplace.type)).length > workplaces.filter(w_t=>w_t == workplace.type).length">Слишком много</div>-->
<!--                                                            </div>-->
<!--                                                </td>-->
                                                <td class="auto-calculated-cell center-cell">{{calculate_workplace_num(workplace, ind)}}</td>
                                                <td :class="{'percentage-greater-than': workplace.congestion > 100, 'percentage-less-than': workplace.congestion < 0}" class="input-cell">
                                                    <input type="number" v-model.number="workplace.congestion" @change="validate_congestion"  :disabled="!workplace.type /*|| !workplace.employee*/">
                                                </td>
                                                <td :class="get_employee_class(workplace.employee)">
                                                    <select class="input-cell" v-model="workplace.employee" @change="set_answer">
                                                        <option value="">Нет рабочего</option>
                                                        <option v-for="emp in employees" :value="emp.id" v-html="emp.title"></option> <!-- :disabled="employee_is_full(emp.id)"-->
                                                    </select>
                                                </td>
<!--                                                <td>-->
<!--                                                -->
<!--                                                    <div v-if="workplace.employee!=''">-->
<!--                                                        <div v-if="user_data.workplaces.filter(wp => wp.employee == workplace.employee).map(m=>m.congestion).reduce((a, b) => a + b, 0) == 100" class="congestion-full"> Полная</div>-->
<!--                                                        <div v-else-if="user_data.workplaces.filter(wp => wp.employee == workplace.employee).map(m=>m.congestion).reduce((a, b) => a + b, 0) > 100" class="congestion-high">Перегруз</div>-->
<!--                                                        <div v-else-if="user_data.workplaces.filter(wp => wp.employee == workplace.employee).map(m=>m.congestion).reduce((a, b) => a + b, 0) < 100" class="congestion-low">Недозагруз</div>-->
<!--                                                    </div>-->
<!--                                                    <div v-else>-->
<!--                                                        нет рабочего-->
<!--                                                    </div>-->
<!--                                                </td>-->
                                                <td class="auto-calculated-cell">
                                                    {{ workplace.work_time }}
                                                </td>
                
                                                <td class="auto-calculated-cell">
                                                    {{ workplace.op_start }}
                                                </td>
                                                <td class="auto-calculated-cell">
                                                    {{ workplace.op_end }}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div style="">
                                            <apexchart style="margin:0 auto; width: fit-content;" :height="first_graphic_options.chart.height" :width="first_graphic_options.chart.width" :options="first_graphic_options" :series="get_graphic_data"></apexchart>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                        <div class="problem-block">
                            <div class="problem-block-wording">
                                <h2>Задание 2</h2>
                            </div>
                
                            <div class="problem-block-task">
                                <div>
                                    <p>Значение страхового запаса: <strong>{{companion_data.safety_stock}}</strong>.</p>
<!--                                    <p>Нижний край графика должен быть: больше или равен <strong>{{companion_data.safety_stock}}</strong>; меньше <strong>{{companion_data.safety_stock + 1}}</strong></p>-->
                                </div>
                                <p><strong>Периодов неизменной работы (ПНР): {{periods_len}}</strong></p>
                                <table class="problem-table" id="periods_table">
                                    <tr>
                                        <th v-for="n in array_0_n(periods_len)">Период {{n+1}}</th>
                                        <th>Сумма периодов</th>
                                    </tr>
                                    <tr>
                                        <td v-for="n in array_0_n(periods_len)" class="input-cell"><input v-model.number="user_data.periods[n]" @change="validate_period" type="number"></td>
                                        <td :class="{ 'student-correct-input': user_data.periods.reduce((a, b) => a + b, 0) == companion_data.max_time}" class="auto-calculated-cell" style="text-align: center;">
<!--                                        v-if="user_data.periods.every(elem => elem > 0)"-->
<!--                                               <div>{{user_data.periods}}</div>-->
<!--                                            <div class="">-->
                                                <template v-if="user_data.periods.every(p=>!isNaN(parseFloat(p)))">
                                                {{ user_data.periods.reduce((a, b) => a + b, 0) }}
                                                </template>
<!--                                            </div>-->
                                        </td>
                                    </tr>
                                </table>
                
                                <div v-for="(op,index) in operations_pairs" class="operation-pair-wrap">
                                    <div class="operation-pair-table">
<!--                                        {{index+1}}-->
                                        <h3>Пара операций {{index+1}}: {{get_operation_by_id(op[0]).title}} - {{get_operation_by_id(op[1]).title}}</h3>
                                        <div><strong>{{get_operation_by_id(op[0]).title}}</strong> - {{get_operation_by_id(op[0]).duration}} мин.</div>
                                        <div><strong>{{get_operation_by_id(op[1]).title}}</strong> - {{get_operation_by_id(op[1]).duration}} мин.</div>
                
                                        <table class="problem-table problem-table-2" :id="'operations_pairs_table_' + index">
                                            <tr >
                                                <th colspan="2"></th><th v-for="n in array_0_n(periods_len)">Период {{n+1}} ({{user_data.periods[n]}})</th>
                                            </tr>
                                            <tr >
                                                <td colspan="2" class="title-cell">Кол-во работающих рабочих мест 1</td><td class="input-cell" v-for="n in array_0_n(periods_len)"><input @change="validate_KPPM" v-model.number="user_data.operations_pairs[index].pair[0].KPPM[n]" type="number"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="title-cell">Кол-во работающих рабочих мест 2</td><td class="input-cell" v-for="n in array_0_n(periods_len)"><input @change="validate_KPPM" v-model.number="user_data.operations_pairs[index].pair[1].KPPM[n]" type="number"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="title-cell">выход 1</td><td class="input-cell" v-for="n in array_0_n(periods_len)"><input @change="validate_out" @input="calculate_change" v-model.number="user_data.operations_pairs[index].pair[0].out[n]" type="number"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="title-cell">выход 2</td><td class="input-cell" v-for="n in array_0_n(periods_len)"><input @change="validate_out" @input="calculate_change" v-model.number="user_data.operations_pairs[index].pair[1].out[n]" type="number"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="title-cell">изменение</td>
                                                <td v-for="n in array_0_n(periods_len)" class="auto-calculated-cell">
                                                    {{user_data.operations_pairs[index].changes[n]}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="title-cell" style="">Динамика</td>
                                                <td class="input-cell"><input v-model.number="user_data.operations_pairs[index].dynamic_value" @input="calculate_change" type="number"></td>
                                                <td v-for="n in array_0_n(periods_len)" class="auto-calculated-cell">
                                                    {{user_data.operations_pairs[index].dynamics[n]}}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                
                                    <div class="operation-pair-graphic">
                                        <div>
                                            <apexchart style="margin:0 auto; width: fit-content;" :height="second_graphic_options.chart.height" :width="second_graphic_options.chart.width" :options="second_graphic_options" :series="get_second_graphic_data(index)"></apexchart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                        </div>
                    </div>
                `,
                el: '#machinery_management_task_3_text',
                data: {
                    companion_data: settings.companion_data,
                    operations: settings.operations,
                    workplaces: settings.workplaces,
                    employees: settings.employees,
                    operations_pairs: settings.operations_pairs,
                    periods_len: settings.periods_len,
                    user_data: user_data,
                    first_graphic_options: {
                        chart: {
                            fontFamily: 'monospace',
                            width: '800px',
                            height: '350px',
                            // defaultLocale: 'ru',
                            background: '#fff',
                            type: 'rangeBar',
                            toolbar: {
                                show: false,
                            },
                            // locales: [{
                            //     name: 'ru',
                            //     options: {
                            //         toolbar: {
                            //             show: false,
                            //             "exportToSVG": "Скачать как SVG",
                            //             "exportToPNG": "Скачать как PNG",
                            //             "menu": "Меню",
                            //         }
                            //     }
                            // }]
                        },
                        plotOptions: {
                            bar: {
                                horizontal: true,
                            }
                        },
                        xaxis: {
                            min: 0,
                            max: settings.companion_data.max_time,
                            tickAmount: settings.companion_data.max_time / (settings.companion_data.max_time / settings.companion_data.work_shift),
                            range: settings.companion_data.max_time,
                        },
                    },
                    second_graphic_options: {
                        chart: {
                            fontFamily: 'monospace',
                            background: '#fff',
                            type: 'line',
                            width: '800px',
                            height: '350px',
                            toolbar: {
                                show: false
                            }
                        },
                        tooltip: {
                            enabled: false,
                        },
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontSize: '14px',
                                colors: ['#000000'],
                            },
                        },
                        markers: {
                            size: 6,
                            shape: "square"
                        },
                        yaxis: {
                            title: {
                                text: 'Динамика'
                            },
                            labels: {
                                formatter: (value) => {
                                    return value
                                },
                            }
                        },
                        grid: {
                            padding: {
                                top: 10,
                                right: 40,
                                bottom: 10,
                                left: 10
                            },
                        }
                    },
                },

                methods: {
                    get_employee_class(emp){
                        if(emp==="")return "";

                        let sum_employee_work_time = user_data.workplaces.filter(wp => wp.employee === emp).map(m=>m.work_time).reduce((a, b) => a + b, 0);

                        if (sum_employee_work_time === this.companion_data.max_time){
                            return 'congestion-full'
                        }
                        else if (sum_employee_work_time > this.companion_data.max_time){
                            return 'congestion-high';

                        }
                        else{
                            return 'congestion-low';
                        }

            },


                    array_0_n: function (n) {
                        return Array.from(Array(n).keys())
                    },
                    get_operation_by_id(id) {
                        return this.operations.filter(item => item.id === id)[0];
                    },
                    round_num(num, d) {
                        return parseFloat(parseFloat(num).toFixed(d || 3));
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
                    calculate_workplace_num(workplace, ind) {
                        // let value = "";
                        let returnValue = "";
                        if (workplace.type !== "") {
                            let value = this.user_data.workplaces.slice(0, ind).filter(item => item.type === workplace.type).length + 1;
                            returnValue = (this.get_operation_by_id(workplace.type).weight + 1) + "."  + value;
                        }
                        return returnValue;
                    },
                    validate_congestion: function () {
                        this.user_data.workplaces.forEach((wp)=>{
                            // wp.congestion = (wp.congestion === "" || isNaN(wp.congestion)) ? 0 : parseFloat(wp.congestion);
                            wp.congestion = this.parseNumber(wp.congestion);
                        });
                        this.set_answer();
                    },
                    validate_tact: function (){
                        // console.log("this.parseNumber(this.user_data.tact): ", this.parseNumber(this.user_data.tact));
                        this.user_data.tact = this.parseNumber(this.user_data.tact);
                        this.set_answer()
                    },

                    validate_period: function (){
                        this.user_data.periods = this.user_data.periods.map((period)=>{
                            return this.parseNumber(period);
                        });
                        this.set_answer();
                    },

                    validate_KPPM: function(){
                        this.user_data.operations_pairs.forEach((ch, index) => {
                            console.log("ch.pair[0].KPPM: ", ch.pair[0].KPPM);
                            ch.pair[0].KPPM = ch.pair[0].KPPM.map(item => this.parseNumber(item));
                            ch.pair[1].KPPM = ch.pair[1].KPPM.map(item => this.parseNumber(item));
                        });
                        this.set_answer();
                    },

                    validate_out: function(){
                        this.user_data.operations_pairs.forEach((ch, index) => {
                            console.log("ch.pair[0].KPPM: ", ch.pair[0].KPPM);
                            ch.pair[0].out = ch.pair[0].out.map(item => this.parseNumber(item));
                            ch.pair[1].out = ch.pair[1].out.map(item => this.parseNumber(item));
                        });
                        this.set_answer();
                    },

                    set_answer: function(){
                        console.log("SET ANSWER");
                        answer.setJSON({answer: this.user_data});
                    },

                    calculate_change: function (event) {

                        this.user_data.operations_pairs.forEach((ch, index) => {
                            ch.dynamic_value = ch.dynamic_value === "" ? 0 : ch.dynamic_value;
                            ch.changes = ch.pair[0].out.map((num, idx) => {
                                return this.round_num(num - ch.pair[1].out[idx])
                            });
                            let last_dynamics = ch.dynamic_value;
                            ch.dynamics = ch.dynamics.map((num, idx) => {
                                let res = ch.changes[idx] + last_dynamics;
                                last_dynamics = res;
                                return this.round_num(res);
                            });
                        });

                        this.set_answer();
                    },
                    get_second_graphic_data: function (data_index) {
                        let graphic_data = [this.user_data.operations_pairs[data_index].dynamic_value].concat(this.user_data.operations_pairs[data_index].dynamics);
                        // console
                        return [{
                            data: graphic_data
                        }]
                    },
                },
                beforeMount() {
                    // this.calculate_change();
                    this.set_answer();
                },
                computed: {
                    get_graphic_data: function () {
                        this.user_data.workplaces.forEach((wp, idx) => {
                            wp.work_time = this.round_num(wp.congestion * this.companion_data.max_time / 100, 1);
                            let prev_operations = this.user_data.workplaces.slice(0, idx).filter(sl => {
                                return sl.employee === wp.employee
                            });
                            if (wp.employee !== "" && wp.type !== "") {
                                wp.op_start = prev_operations.length === 0 ? 0 : prev_operations.map(l => l.work_time).reduce((pv, cv) => pv + cv);
                                wp.op_end = wp.op_start + wp.work_time;
                            }
                            else {
                                wp.op_start = 0;
                                wp.op_end = 0;
                            }
                        });
                        let g_d = [];
                        this.user_data.workplaces.forEach(function (item) {
                                g_d.push({
                                    x: item.employee === "" ? "" : settings.employees[item.employee].title,
                                    y: [item.op_start, item.op_end]
                                })
                        });
                        // console.log("KEKEKEKEK")

                        return [{data: g_d,},];
                    },

                },

            });
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
    };

    MachineryManagementInit.init();
}

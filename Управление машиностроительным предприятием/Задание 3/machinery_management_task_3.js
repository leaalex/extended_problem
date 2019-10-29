function MachineryManagement3(user_settings) {

    let settings = user_settings.data;

    let user_data = {};

    // operations.forEach((item,idx)=>{ if(idx>0) { pairs.push([operations[idx-1].id,item.id ]) } })

    let MachineryManagementInit = {
        init: function () {
            user_data.tact = 0;
            user_data.periods = utils.zeros([settings.periods_len]);
            user_data.workplaces = utils.zeros([settings.workplaces_len]).map(function (item) {
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

            // user_data = {"tact": 0,"periods": [45, 120, 75],"workplaces": [{"type": "operation_1","congestion": 100,"employee": "employee_1","work_time": 240,"op_start": 0,"op_end": 240}, {"type": "operation_1","congestion": 18.75,"employee": "employee_2","work_time": 45,"op_start": 0,"op_end": 45}, {"type": "operation_2","congestion": 68.75,"employee": "employee_3","work_time": 165,"op_start": 0,"op_end": 165}, {"type": "operation_3","congestion": 100,"employee": "employee_4","work_time": 240,"op_start": 0,"op_end": 240}, {"type": "operation_3","congestion": 31.25,"employee": "employee_3","work_time": 75,"op_start": 165,"op_end": 75}, {"type": "operation_4","congestion": 81.25,"employee": "employee_2","work_time": 195,"op_start": 45,"op_end": 195}],"operations_pairs": [{"dynamic_value": 45,"changes": [6.459, -45.933, 37.13],"dynamics": [51.459, 5.526, 42.656],"pair": [{"id": "operation_1","KPPM": [2, 1, 1],"out": [47.368, 63.158, 39.47]}, {"id": "operation_2", "KPPM": [1, 1, 0], "out": [40.909, 109.091, 2.34]}]}, {"dynamic_value": 0,"changes": [40.909, 51.948, -71.429],"dynamics": [40.909, 92.857, 21.428],"pair": [{"id": "operation_2","KPPM": [1, 1, 0],"out": [40.909, 109.091, 0]}, {"id": "operation_3", "KPPM": [0, 1, 2], "out": [0, 57.143, 71.429]}]}, {"dynamic_value": 19,"changes": [21.429, -35.165, 13.737],"dynamics": [40.429, 5.264, 19.001],"pair": [{"id": "operation_3","KPPM": [1, 1, 2],"out": [21.429, 57.143, 71.429]}, {"id": "operation_4", "KPPM": [0, 1, 1], "out": [0, 92.308, 57.692]}]}]};

            // user_data = { "tact": 0, "periods": [ 80, 20, 20, 60, 60 ], "workplaces": [ { "type": "operation_1", "congestion": 100, "employee": "employee_7", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_1", "congestion": 33.33, "employee": "employee_5", "work_time": 80, "op_start": 0, "op_end": 80 }, { "type": "operation_2", "congestion": 100, "employee": "employee_8", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_2", "congestion": 41.67, "employee": "employee_6", "work_time": 100, "op_start": 0, "op_end": 100 }, { "type": "operation_3", "congestion": 100, "employee": "employee_9", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_3", "congestion": 8.33, "employee": "employee_6", "work_time": 20, "op_start": 100, "op_end": 120 }, { "type": "operation_4", "congestion": 100, "employee": "employee_10", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_4", "congestion": 100, "employee": "employee_11", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_4", "congestion": 66.67, "employee": "employee_5", "work_time": 160, "op_start": 80, "op_end": 240 }, { "type": "operation_5", "congestion": 100, "employee": "employee_12", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_5", "congestion": 100, "employee": "employee_13", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_5", "congestion": 25, "employee": "employee_6", "work_time": 60, "op_start": 120, "op_end": 180 } ], "operations_pairs": [ { "dynamic_value": 11, "changes": [ 5.882, -11.029, 0.735, 2.206, 2.206 ], "dynamics": [ 16.882, 5.853, 6.588, 8.794, 11 ], "pair": [ { "id": "operation_1", "KPPM": [ 2, 1, 1, 1, 1 ], "out": [ 100, 12.5, 12.5, 37.5, 37.5 ] }, { "id": "operation_2", "KPPM": [ 2, 2, 1, 1, 1 ], "out": [ 94.1176, 23.5294, 11.7647, 35.29411, 35.29411 ] } ] }, { "dynamic_value": 6, "changes": [ 32.579, 8.145, -19.005, -10.86, -10.86 ], "dynamics": [ 38.579, 46.724, 27.719, 16.859, 5.999 ], "pair": [ { "id": "operation_2", "KPPM": [ 2, 2, 1, 1, 1 ], "out": [ 94.117647058823, 23.5294117647, 11.764705882, 35.2941176, 35.2941176 ] }, { "id": "operation_3", "KPPM": [ 1, 1, 2, 1, 1 ], "out": [ 61.538461, 15.384615, 30.76923, 46.15384615, 46.15384615 ] } ] }, { "dynamic_value": 5, "changes": [ 11.538, -3.365, 12.019, -10.096, -10.096 ], "dynamics": [ 16.538, 13.173, 25.192, 15.096, 5 ], "pair": [ { "id": "operation_3", "KPPM": [ 1, 1, 2, 1, 1 ], "out": [ 61.538461538, 15.384615384, 30.76923, 46.15384615, 46.15384615 ] }, { "id": "operation_4", "KPPM": [ 2, 3, 3, 3, 3 ], "out": [ 50, 18.75, 18.75, 56.25, 56.25 ] } ] }, { "dynamic_value": 17, "changes": [ -9.259, 3.935, 3.935, -10.417, 11.806 ], "dynamics": [ 7.741, 11.676, 15.611, 5.194, 17 ], "pair": [ { "id": "operation_4", "KPPM": [ 2, 3, 3, 3, 3 ], "out": [ 50, 18.75, 18.75, 56.25, 56.25 ] }, { "id": "operation_5", "KPPM": [ 2, 2, 2, 3, 2 ], "out": [ 59.2592592, 14.81481481, 14.81481481, 66.666666, 44.44444 ] } ] } ] }

            Vue.component('apexchart', VueApexCharts);

            new Vue({

                template: `
                    <div>
                        <div class="problem-conditions">
                            <p>Операции:</p>
                            <ul>
                                <li v-for="operation in operations">
                                    {{ operation.title }} - <strong>{{ operation.duration }} </strong> мин
                                </li>
                            </ul>
                            <p>N<sub>выпуска</sub> = <strong> {{companion_data.N_out}}</strong> шт в мес</p>
                            <p>1 месяц =<strong> {{companion_data.month}}</strong> рабочий день</p>
                            <p>1 рабочий день =<strong> {{companion_data.work_day}}</strong> смены</p>
                            <p>1 смена =<strong> {{companion_data.work_shift}}</strong> часов</p>
                            <p>ПОЛ =<strong> {{companion_data.half_shift}}</strong> смены</p>
                            <p>Такт =<strong> {{round_num(companion_data.tact)}}</strong> мин/шт</p>
                        </div>
<!--                        <p>{{user_data}}</p>-->
                        <div class="problem-block">
                            <div class="problem-block-wording">
                                <p>Задание 1</p>
                            </div>
                
                            <div class="problem-block-task">
                                <div style="display: flex">
                                    <div>
                                        <table>
                                            <tr>
                                                <th>Операция</th>
                                                <th>№ РМ</th>
                                                <th>Загрузка РМ, %</th>
                                                <th>Рабочий</th>
                                                <th>Рабочее время</th>
                                                <th>Начало графика</th>
                                                <th>Конец графика</th>
                                            </tr>
                                            <tr v-for="(workplace,ind) in user_data.workplaces">
                                                <td>
                                                    <select v-model="workplace.type">
                                                        <option value="">Нет операции</option>
                                                        <option v-for="op in operations" :value="op.id">{{op.title}}</option>
                                                    </select>
                                                </td>
                                                <td class="auto-calculated-cell">{{calculate_workplace_num(workplace, ind)}}</td>
                                                <td>
                                                    <input type="number" v-model.number="workplace.congestion"  :disabled="!workplace.type /*|| !workplace.employee*/">
                                                </td>
                                                <td>
                                                    <select v-model="workplace.employee" >
                                                        <option value="">Нет рабочего</option>
                                                        <option v-for="emp in employees" :value="emp.id">{{emp.title}}</option> <!-- :disabled="employee_is_full(emp.id)"-->
                                                    </select>
                                                </td>
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
                                    <div>
                                        <apexchart width="500" :options="first_graphic_options" :series="get_graphic_data"></apexchart>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                        <div class="problem-block">
                            <div class="problem-block-wording">
                                <p>Задание 2</p>
                            </div>
                
                            <div class="problem-block-task">
                                                <div>
                                                    <p>Значение страхового запаса: <strong>{{companion_data.safety_stock}}</strong>.</p>
                                                    <p>Нижний край графика должен быть: больше или равен <strong>{{companion_data.safety_stock}}</strong>; меньше <strong>{{companion_data.safety_stock + 1}}</strong></p>
                                                </div>
                                <p>Получилось периодов: <strong>{{periods_len}}</strong></p>
                                <table>
                                    <tr>
                                        <td >Период неизменной работы - ПНР</td>
                                        <td v-for="n in array_0_n(periods_len)">Период {{n+1}}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td v-for="n in array_0_n(periods_len)"><input v-model.number="user_data.periods[n]" type="number"></td>
                                    </tr>
                                </table>
                
                                <div v-for="(op,index) in operations_pairs" class="operation-pair-wrap">
                                    <div class="operation-pair-table">
                                        <h3>Пара {{index+1}}:</h3>
                                        <div>{{get_operation_by_id(op[0]).title}} - {{get_operation_by_id(op[0]).duration}}</div>
                                        <div>{{get_operation_by_id(op[1]).title}} - {{get_operation_by_id(op[1]).duration}}</div>
                
                                        <table>
                                            <tr >
                                                <td colspan="2"></td><td v-for="n in array_0_n(periods_len)">Период {{n+1}} ({{user_data.periods[n]}})</td>
                                            </tr>
                                            <tr >
                                                <td colspan="2">КРРМ 1</td><td v-for="n in array_0_n(periods_len)"><input v-model.number="user_data.operations_pairs[index].pair[0].KPPM[n]" type="number"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">КРРМ 2</td><td v-for="n in array_0_n(periods_len)"><input v-model.number="user_data.operations_pairs[index].pair[1].KPPM[n]" type="number"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">выход 1</td><td v-for="n in array_0_n(periods_len)"><input @input="calculate_change" v-model.number="user_data.operations_pairs[index].pair[0].out[n]" type="number"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">выход 2</td><td v-for="n in array_0_n(periods_len)"><input @input="calculate_change" v-model.number="user_data.operations_pairs[index].pair[1].out[n]" type="number"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">изменение</td>
                                                <td v-for="n in array_0_n(periods_len)" class="auto-calculated-cell">
                                                    {{user_data.operations_pairs[index].changes[n]}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Динамика</td>
                                                <td><input v-model.number="user_data.operations_pairs[index].dynamic_value" @input="calculate_change" type="number"></td>
                                                <td v-for="n in array_0_n(periods_len)" class="auto-calculated-cell">
                                                    {{user_data.operations_pairs[index].dynamics[n]}}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                
                                    <div class="operation-pair-graphic">
                                        <div>
                                            <apexchart width="500" :options="second_graphic_options" :series="get_second_graphic_data(index)"></apexchart>
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
                    workplaces_len: settings.workplaces_len,
                    employees: settings.employees,
                    operations_pairs: settings.operations_pairs,
                    periods_len: settings.periods_len,
                    user_data: user_data,
                    first_graphic_options: {
                        chart: {
                            defaultLocale: 'ru',
                            background: '#fff',
                            // height: 350,
                            // width: "200px",
                            type: 'rangeBar',
                            locales: [{
                                name: 'ru',
                                options: {
                                    toolbar: {
                                        "exportToSVG": "Скачать как SVG",
                                        "exportToPNG": "Скачать как PNG",
                                        "menu": "Меню",
                                    }
                                }
                            }]
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
                            background: '#fff',
                            type: 'line',
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
                    // employee_is_full:function(emp_id){
                    //     let used_wp = this.user_data.workplaces.filter(wp=>wp.employee === emp_id);
                    //     if (used_wp.length) {
                    //         let congestion_sum = used_wp.map(l => l.congestion).reduce((pv, cv) => pv + cv);
                    //         return congestion_sum >= 100;
                    //     }
                    //     return false;
                    // },
                    array_0_n: function (n) {
                        return Array.from(Array(n).keys())
                    },
                    get_operation_by_id(id) {
                        return this.operations.filter(item => item.id === id)[0];
                    },
                    round_num(num, d) {
                        return parseFloat(parseFloat(num).toFixed(d || 3));
                    },
                    calculate_workplace_num(workplace, ind) {
                        let value = "";
                        if (workplace.type !== "") {
                            value = this.user_data.workplaces.slice(0, ind).filter(item => item.type === workplace.type).length + 1;
                        }
                        return value;
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
                        console.log(JSON.stringify(user_data));
                    },
                    get_second_graphic_data: function (data_index) {
                        let graphic_data = [this.user_data.operations_pairs[data_index].dynamic_value].concat(this.user_data.operations_pairs[data_index].dynamics);
                        return [{
                            data: graphic_data
                        }]
                    },
                },
                beforeMount() {
                    // this.calculate_change();
                },
                computed: {
                    get_graphic_data: function () {
                        this.user_data.workplaces.forEach((wp, idx) => {
                            wp.work_time = this.round_num(wp.congestion * this.companion_data.max_time / 100, 1);
                            let prev_operations = this.user_data.workplaces.slice(0, idx).filter(sl => {
                                return sl.employee === wp.employee
                            });
                            wp.op_start = prev_operations.length === 0 ? 0 : prev_operations.map(l => l.work_time).reduce((pv, cv) => pv + cv);
                            wp.op_end = wp.op_start + wp.work_time;
                        });
                        let g_d = [];
                        this.user_data.workplaces.forEach(function (item) {
                            if (item.employee !== "" && item.type !== "") {
                                g_d.push({
                                    x: settings.employees[item.employee].title,
                                    y: [item.op_start, item.op_end]
                                })
                            } else {
                                g_d.push({
                                    x: "",
                                    y: [0, 0]
                                })
                            }
                        });
                        return [{data: g_d},];
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

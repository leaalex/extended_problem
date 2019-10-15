function MachineryManagement3(user_settings) {

    let settings = user_settings.data;

    console.log(settings);

    let user_data = {};

    let program_data = {};

    let MachineryManagementInit = {
        init: function () {
            user_data.tact = 0;
            user_data.periods = utils.zeros([settings.periods_len]);

            user_data.workplaces = utils.zeros([settings.workplaces_len]).map(function (item) {
                return {
                    type: "",
                    // workplace_num: "",
                    congestion: 0,
                    employee: "",
                    work_time: "",
                    op_start: 0,
                    op_end: 0,
                }
            });

            user_data.operations_pairs = settings.operations_pairs.map(function (item) {
                let return_object = {dynamic_value: 0,};
                // return_object.change = utils.zeros([settings.periods_len]);
                // return_object.zero_dynamic = utils.zeros([settings.periods_len]);
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

            user_data = { "tact": 0, "periods": [ 10, 12, 23 ], "workplaces": [ { "type": "operation_1", "congestion": 100, "employee": "employee_1", "work_time": 240, "op_start": 0, "op_end": 240 }, { "type": "operation_1", "congestion": 18.75, "employee": "employee_2", "work_time": 45, "op_start": 0, "op_end": 45 }, { "type": "operation_2", "congestion": 0, "employee": "employee_3", "work_time": "", "op_start": 0, "op_end": 165 }, { "type": "operation_3", "congestion": 0, "employee": "employee_4", "work_time": "", "op_start": 0, "op_end": 240 }, { "type": "operation_3", "congestion": 0, "employee": "employee_3", "work_time": "", "op_start": 165, "op_end": 240 }, { "type": "operation_4", "congestion": 0, "employee": "employee_2", "work_time": 45, "op_start": 45, "op_end": 240 } ], "operations_pairs": [ { "dynamic_value": 45, "pair": [ { "id": "operation_1", "KPPM": [ 2, 1, 1 ], "out": [ 47.368, 63.158, 39.474 ] }, { "id": "operation_2", "KPPM": [ 1, 1, 0 ], "out": [ 40.909, 109.091, 0 ] } ] }, { "dynamic_value": 0, "pair": [ { "id": "operation_2", "KPPM": [ 1, 1, 0 ], "out": [ 0, 0, 0 ] }, { "id": "operation_3", "KPPM": [ 0, 0, 0 ], "out": [ 0, 0, 0 ] } ] }, { "dynamic_value": 0, "pair": [ { "id": "operation_3", "KPPM": [ 0, 0, 0 ], "out": [ 0, 0, 0 ] }, { "id": "operation_4", "KPPM": [ 0, 0, 0 ], "out": [ 0, 0, 0 ] } ] } ] }

            console.log(user_data);
            Vue.component('apexchart', VueApexCharts)

            new Vue({

                template: `
            <div>
                <div>
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
                    <p>Такт =<strong> {{companion_data.tact}}</strong> мин/шт</p>
                </div>
                 
                <p>{{user_data}}</p>
                <div>
                    <table>
                        <tr>
                            <th>опер</th>
                            <th>№ РМ</th>
                            <th>загр РМ</th>
                            <th>рабочие</th>
                            <th>раб время</th>
                            <th>Начало графика</th>
                            <th>Конец графика</th>
                        </tr>
                        <tr v-for="(workplace,ind) in user_data.workplaces">
                            <td>
                                <select v-model="workplace.type" >
                                    <option value="">Нет операции</option>
                                    <option v-for="op in operations" v-bind:value="op.id">{{op.title}}</option>
                                </select>
                            </td>
                            <td>{{calculate_workplace_num(workplace, ind)}}</td>
                            <td><input type="number" v-model.number="workplace.congestion"></td>
                            <td>
                                <select v-model="workplace.employee" >
                                    <option value="">Нет рабочего</option>
                                    <option v-for="emp in employees" v-bind:value="emp.id">{{emp.title}}</option>
                                </select>
                            </td>
                            <td><input type="number" v-model.number="workplace.work_time"></td>
                            <td><input type="number" v-model.number="workplace.op_start"></td>
                            <td><input type="number" v-model.number="workplace.op_end"></td>
                        </tr>
                    </table>
                    
<!--  <template>-->
        <div>
            <apexchart width="500" :options="options" :series="get_graphic_data"></apexchart>
        </div>
    </template>
  
                </div>
              
                <div>
                
                <div>
                <p>страховой запас: <strong>{{companion_data.safety_stock}}</strong></p>
                <p>нижний край графика должен быть:</p>
                <p>больше равно <strong>{{companion_data.safety_stock}}</strong></p>
                <p>Меньше <strong>{{companion_data.safety_stock+1}}</strong></p>
                </div>
                
                <table>
                    <tr>
                    <td>Периоды</td>
                    <td v-for="n in array_0_n(periods_len)">Период {{n+1}}</td>
                    </tr>
                    <tr>
                    <td></td>
                    <td v-for="n in array_0_n(periods_len)"><input v-model.number="user_data.periods[n]" type="number"></td>
                    </tr>
                </table>
                                               
                <div v-for="(op,index) in operations_pairs">
                    <div>Пара {{index+1}}:</div>
                    <div>{{get_operation_by_id(op[0]).title}} - {{get_operation_by_id(op[0]).duration}}</div>
                    <div>{{get_operation_by_id(op[1]).title}} - {{get_operation_by_id(op[1]).duration}}</div>
               
                    <table>
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
                     <td v-for="n in array_0_n(periods_len)">
                        {{round_num(user_data.operations_pairs[index].pair[0].out[n]-user_data.operations_pairs[index].pair[1].out[n])}}
                     </td>
                    </tr>
                    <tr>
                    <td>Динамика</td>
                    <td><input v-model.number="user_data.operations_pairs[index].dynamic_value" @input="calculate_change" type="number"></td>
                    <td v-for="n in array_0_n(periods_len)">
                        <template>
                                    {{changes[index][n]}}
<!--                                {{round_num(user_data.operations_pairs[index].pair[0].out[n]-user_data.operations_pairs[index].pair[1].out[n] + user_data.operations_pairs[index].dynamic_value)}}-->
                        </template>
<!--                        <template v-else>-->
<!--                                         -->
<!--                        </template>-->
                    </td>
                    </tr>
                    </table>
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
                    options: {
                        chart: {
                            height: 350,
                            type: 'rangeBar',

                        },
                        plotOptions: {
                            bar: {
                                horizontal: true,
                            }
                        },
                        yaxis: {

                        },
                        xaxis: {
                            min: 0,
                            max: 240,
                            tickAmount: 8,
                            range: 240,
                            // floating: false,
                        },
                    },

                    changes: utils.zeros([settings.operations_pairs.length, settings.periods_len]),

                },

                methods: {
                    array_0_n: function (n) {
                        return Array.from(Array(n).keys())
                    },
                    get_operation_by_id(id) {
                        return this.operations.filter(item => item.id === id)[0];
                    },
                    console_user_data() {
                        console.log(this.user_data);
                    },
                    round_num(num, d){
                        // console.log(num, typeof num)
                        return parseFloat(num).toFixed(d || 3);
                    },
                    calculate_workplace_num(workplace, ind){
                        let value = "";
                        if(workplace.type !== ""){
                            value = this.user_data.workplaces.slice(0,ind).filter(item=>item.type === workplace.type).length + 1;
                        }
                        return value;
                    },
                    set_value(){

                    },
                    calculate_change: function(event){
                        // console.log(this.operations_pairs);

                        if(event) {

                            console.log(event.target.value, user_data);
                            event.target.value = 0
                        }
                        // let tmp_changes = [];

                        this.operations_pairs.forEach((ch,index)=>{
                            this.array_0_n(this.periods_len).forEach((sub_ch,sub_index)=>{
                                if(sub_index === 0){
                                    this.changes[index][0] = this.round_num(parseFloat(this.user_data.operations_pairs[index].dynamic_value) + (parseFloat(user_data.operations_pairs[index].pair[0].out[0]) - parseFloat(user_data.operations_pairs[index].pair[1].out[0])));
                                }
                                else{
                                    this.changes[index][sub_index] = this.round_num(parseFloat(this.changes[index][sub_index-1]) + (parseFloat(user_data.operations_pairs[index].pair[0].out[sub_index]) - parseFloat(user_data.operations_pairs[index].pair[1].out[sub_index])));
                                }
                                // this.changes[index][2] = this.changes[index][1] + (user_data.operations_pairs[index].pair[0].out[2] - user_data.operations_pairs[index].pair[1].out[2] )
                            });
                        });
                        // console.log(user_data.operations_pairs);
                    },
                },
                beforeMount(){
                    this.calculate_change()
                },
                computed: {
                    get_graphic_data:function(){
                        let g_d = [];
                        this.user_data.workplaces.forEach(function (item) {
                            // console.log("fdfdf", item.type);
                            if(item.employee !== "" && item.type !== "") {
                                g_d.push( {
                                    x: settings.employees[item.employee].title,
                                    y: [item.op_start, item.op_end]
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

function MachineryManagement2(settings) {
    settings.data = settings.data.reverse().map(function (x, index) {
        x.height = 1;
        x.width = settings.init_width;
        x.x = 0;
        delete x.duration;
        let calc_help = (Math.ceil((index + 1) / settings.area_height)) - 1;
        x.x = calc_help * settings.init_width;
        x.y = settings.area_height - 1 - index;
        if (settings.area_height <= index) {
            x.y = settings.area_height - (index - settings.area_height * calc_help + 1);
        }Нет работы
        return x;
    });

    let correctness = undefined;
    let answer = undefined;

    if (settings.input) {
        if (settings.input.querySelector("input[type='text']")) {


            answer = new Answer(settings.input.querySelector("input[type='text']"));
            if (settings.input.parentNode.parentNode.querySelector(".message")) {
                settings.input.parentNode.parentNode.querySelector(".message").classList.add("hidden");
            }

            settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");

            if (answer.get()) {
                let l = answer.getJSON()["answer"];
                settings.data = Object.keys(l).map(item => {
                    return l[item]
                });
                if (settings.input.parentNode.parentNode.querySelector("span.message")) {
                    correctness = JSON.parse(settings.input.parentNode.parentNode.querySelector("span.message").innerHTML);
                }
            }
        }
    }

    settings.data_obj = settings.data.reduce((acc, cur) => ({...acc, [cur.id]: cur}), {});
    answer.setJSON({"answer": settings.data_obj});

    new Vue({
        el: '#three_task',
        template: `
            <tree
              :data="treeData"
              :options="treeOptions"
            />`,
        data: function () {

            let structure = settings.structure;
            structure.state = { expanded: true };

            function rec_add_title(struct) {
                struct.new_title = struct.title +  " (длит. - " + struct.duration + " дн.)";
                if(struct.children){
                    struct.children.forEach(function (item, i){
                        rec_add_title(struct.children[i]);
                    });
                }
            }

            rec_add_title(structure);

            return {
                treeData: structure,
                treeOptions: {
                    propertyNames: {
                        text: 'new_title',
                    }
                }
            }
        },
        methods: {
            onNodeSelected(node) {
                console.log(node.text)
            }
        }
    });

    // new Vue({
    //     el: '#tt',
    //     template: `
    //    <div class="task_title">
    //         <span>Длительность процесса изготовления, обработки и сборки деталей, узлов, агрегатов и изделия, дн.:</span>
    //         <span v-for="(m, m_i) in get_data.machines"><span style="font-weight: bold">{{m.title}}</span> – {{m.duration}}; </span>
    //         <span v-for="(a, a_i) in get_data.aggregates"><span style="font-weight: bold">{{a.title}}</span> – {{a.duration}}; </span>
    //         <span v-for="(n, n_i) in get_data.nodes"><span style="font-weight: bold">{{n.title}}</span> – {{n.duration}}; </span>
    //         <span v-for="(d, m_i) in get_data.details"><span style="font-weight: bold">{{d.title}}</span> – {{d.duration}}; </span>
    //     </div>
    //    `,
    //     data: {
    //         source: settings.student_default_data,
    //     },
    //     methods: {},
    //     computed: {
    //         get_data: function () {
    //             let static_data = this.source;
    //             return {
    //                 machines: static_data.filter(l => l.type === 'machine'),
    //                 aggregates: static_data.filter(l => l.type === 'aggregate'),
    //                 nodes: static_data.filter(l => l.type === 'node'),
    //                 details: static_data.filter(l => l.type === 'detail'),
    //             }
    //         },
    //         default_data: function () {
    //             return this.source;
    //         }
    //     }
    // });

    new Vue({
        template: `<div class='task_table' v-bind:style="areaStyle" >
        <template v-for="item in items">
            <vue-draggable-resizable :w="pixel_step*item.width" :x="pixel_step*item.x" :y="pixel_step*item.y"
                                     :h="pixel_step*item.height" @dragging="onDrag" @resizing="onResize"
                                     @activated="onActivated(item.id)" @deactivated="onDeactivated"
                                     :minHeight="pixel_step" :minWidth="pixel_step" :grid=[pixel_step,pixel_step]
                                     :parent="true"
                                     :z="z_indexes[item.type]"
                                     v-bind:class="[item.type, 'machine-element']" v-bind:id="item.id">
                <div class="title-wrapper">
                    <div class="title-size" v-if="1 < item.width" v-html="item.width"></div>
                    <div class="title-size" v-else v-html="item.width"></div>
                    <div class="title" v-if="2 < item.width" v-html="item.title"></div>
                    <div class="title" v-else v-html="getLastWord(item.title)"></div>
                </div>
            </vue-draggable-resizable>
        </template>
        <div class="dividing-line" v-bind:style="dividingLineLeft"></div>
    </div>`,
        el: '#t1',
        data: {
            data_obj: settings.data_obj,
            pixel_step: settings.pixel_step,
            items: settings.data,
            current_element: undefined,
            z_indexes: {machine: 1, aggregate: 10, node: 20, detail: 30},
            extra_cells_count: settings.extra_cells_count,

        },
        methods: {
            onResize: function (x, y, width, height) {
                this.width = width;
                this.height = height;
                this.x = x;
                this.y = y;
                this.data_obj[this.current_element].x = this.x / this.pixel_step;
                this.data_obj[this.current_element].y = this.y / this.pixel_step;
                this.data_obj[this.current_element].width = this.width / this.pixel_step;
                this.data_obj[this.current_element].height = this.height / this.pixel_step;
                answer.setJSON({"answer": this.data_obj});
            },
            onDrag: function (x, y) {
                this.x = x;
                this.y = y;
                this.data_obj[this.current_element].x = this.x / this.pixel_step;
                this.data_obj[this.current_element].y = this.y / this.pixel_step;
                answer.setJSON({"answer": this.data_obj});
            },
            onActivated(id) {
                this.current_element = id;
            },
            onDeactivated() {
                this.current_element = undefined;
            },
            getLastWord(l) {
                let l_arr = l.split(" ").slice();
                return 1 < l_arr.length ? l_arr[l_arr.length - 1] : l.slice(0, 3) + ".";
            },
        },
        computed: {
            areaStyle: function () {
                return {
                    height: this.pixel_step * settings.area_height + "px",
                    width: this.pixel_step * (settings.area_width + this.extra_cells_count + 2) + "px",
                    background: `linear-gradient(-90deg, rgba(0, 0, 0, 0.25) 1px, transparent 1px) 0% 0% / ${this.pixel_step}px ${this.pixel_step}px, linear-gradient(rgba(0, 0, 0, 0.25) 1px, transparent 1px) 0% 0% / ${this.pixel_step}px ${this.pixel_step}px`,
                    position: "relative",
                    border: "1px solid #e6e6e6",
                }
            },
            dividingLineLeft: function () {
                return {
                    left: ((this.extra_cells_count + 1) * this.pixel_step - 2) + "px",
                }
            }
        }
    });

    new Vue({
        template: `<div class="x_axis_labels" v-bind:style="xLabelsStyle">
    <template v-for="(item,index) in values">
        <vue-draggable-resizable class="axis-label" :resizable="false" :draggable="false" :w="pixel_step"
                                 :h="pixel_step" :x="index*pixel_step" :y="0" :grid=[pixel_step,pixel_step]
                                 :parent="true">
            <div class="label" v-if="index > (extra_cells_count)" v-html="item"></div>
        </vue-draggable-resizable>
    </template>
    </div>`,
        el: '#t2',
        data: {
            pixel_step: settings.pixel_step,
            extra_cells_count: settings.extra_cells_count,
            area_width: settings.area_width,
            values: Array.from({length: (settings.area_width + settings.extra_cells_count + 2)}, (v, k) => k + 1).reverse(),
        },
        methods: {},
        computed: {
            xLabelsStyle: function () {
                return {
                    height: this.pixel_step + "px",
                    width: this.pixel_step * (this.area_width + this.extra_cells_count + 2) + "px",
                    background: `linear-gradient(-90deg, rgba(0, 0, 0, 0.25) 1px, transparent 1px) 0% 0% / ${this.pixel_step}px ${this.pixel_step}px, linear-gradient(rgba(0, 0, 0, 0.25) 1px, transparent 1px) 0% 0% / ${this.pixel_step}px ${this.pixel_step}px`,
                    position: "relative",
                }
            },
        }
    });

    if (correctness) {
        new Vue({
            el: "#hb",
            template: `<div class="help_block" v-if="correctness.length > 0">
                    <p>Обратите внимание на следующие элементы: 
                    <template v-for="(item,index) in correctness">
                        <span style="text-transform: lowercase;font-weight: bold" >{{data_obj[item].title}}<template v-if="index!=correctness.length-1"  style="text-transform: lowercase;font-weight: bold">, </template> <template v-else>.</template></span>
                    </template>
                    </p>
                </div>`,
            data: {
                correctness: correctness,
                data_obj: settings.data_obj,
            },
            methods: {},
            computed: {},
        });

    }

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

}

function MachineryManagement2Answer(settings) {
    new Vue({
        template: `
<div style="width: fit-content;margin: auto;">
<div class='task_table' v-bind:style="areaStyle" >
        <template v-for="item in items">
            <vue-draggable-resizable :resizable="false" :draggable="false" :w="pixel_step*item.width" :x="pixel_step*item.x" :y="pixel_step*item.y"
                                     :h="pixel_step*item.height":grid=[pixel_step,pixel_step]
                                     :parent="true"
                                     :z="z_indexes[item.type]"
                                     v-bind:class="[item.type, 'machine-element', 'answer-item']" >
                <div class="title-wrapper">
                    <div class="title-size" v-if="1 < item.width" v-html="item.width"></div>
                    <div class="title-size" v-else v-html="item.width"></div>
                    <div class="title" v-if="2 < item.width" v-html="item.title"></div>
                    <div class="title" v-else v-html="getLastWord(item.title)"></div>
                </div>
            </vue-draggable-resizable>
        </template>
            </div>
            
        <div class="x_axis_labels" v-bind:style="xLabelsStyle">
        <template v-for="(val,index) in values">
            <vue-draggable-resizable class="axis-label" :resizable="false" :draggable="false" :w="pixel_step" :h="pixel_step" :x="index*pixel_step" :y="0" :grid=[pixel_step,pixel_step] :parent="true" >
                <div class="label" v-html="val"></div>
            </vue-draggable-resizable>
        </template>
        </div>
            </div>
`,
        el: '#MachineryManagement2_answer_container',
        data: {
            pixel_step: settings.pixel_step,
            items: settings.data,
            z_indexes: {machine: 1, aggregate: 10, node: 20, detail: 30},
            values: Array.from({length: (settings.area_width)}, (v, k) => k + 1).reverse(),
            area_width: settings.area_width,
        },
        methods: {
            getLastWord(l) {
                let l_arr = l.split(" ").slice();
                return 1 < l_arr.length ? l_arr[l_arr.length - 1] : l.slice(0, 3) + ".";
            },
        },
        computed: {
            areaStyle: function () {
                return {
                    height: this.pixel_step * (settings.area_height) + "px",
                    width: this.pixel_step * (settings.area_width) + "px",
                    background: `linear-gradient(-90deg, rgba(0, 0, 0, 0.25) 1px, transparent 1px) 0% 0% / ${this.pixel_step}px ${this.pixel_step}px, linear-gradient(rgba(0, 0, 0, 0.25) 1px, transparent 1px) 0% 0% / ${this.pixel_step}px ${this.pixel_step}px`,
                    position: "relative",
                    border: "1px solid #e6e6e6",
                }
            },
            xLabelsStyle: function () {
                return {
                    height: this.pixel_step + "px",
                    width: this.pixel_step * (this.area_width) + "px",
                    background: `linear-gradient(-90deg, rgba(0, 0, 0, 0.25) 1px, transparent 1px) 0% 0% / ${this.pixel_step}px ${this.pixel_step}px, linear-gradient(rgba(0, 0, 0, 0.25) 1px, transparent 1px) 0% 0% / ${this.pixel_step}px ${this.pixel_step}px`,
                    position: "relative",
                }
            },

        }
    });
}

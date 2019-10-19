
function EvacuationPlan(settings) {

    let element = settings.element;
    let badges = settings.badges;
    const img_path = settings.img_path;
    const background_img = settings.background_img;
    let width = settings.area_width; // in px
    let height = settings.area_height; // in px'
    let delay = settings.delay;

    let badge_height = settings.badge_height ;
    let components_zone_height = badge_height * 3.5;

    let answer = undefined;

    let student_state = [];

    let state = {answer: student_state, complete: false };

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

    let save_button = $(".save.problem-action-btn", $(element).closest(".xblock"));
    let submit_button = $(".submit.btn-brand", $(element).closest(".xblock"));

    $(submit_button).hide();

    console.log(save_button);
    console.log(submit_button);
    console.log(settings);


    if (settings.input) {
        if (settings.input.querySelector("input[type='text']")) {
            answer = new Answer(settings.input.querySelector("input[type='text']"));
            // console.log(answer)
            // if (settings.input.parentNode.parentNode.querySelector(".message")) {
            //     settings.input.parentNode.parentNode.querySelector(".message").classList.add("hidden");
            // }

            settings.input.classList.add("hidden");
            answer.elementField.classList.add("hidden");

            if (answer.get()) {
                state = answer.getJSON();

                console.log(state);

                student_state = state.answer;
                // if (settings.input.parentNode.parentNode.querySelector("span.message")) {
                    // correctness = JSON.parse(settings.input.parentNode.parentNode.querySelector("span.message").innerHTML);
                // }
            }
        }
    }

    let badges_object = {};

    let badges_types_1 = badges.filter(t=>t.size_type === 1).map((badge, idx) => {
        let w = badge_height * 2 ;
        badges_object[badge.id] = {w: w, h: badge_height};
        let default_y = (height + badge_height/2);
        let default_x = ((w+badge_height/2) * idx) + badge_height/2;
        let components_count = badge.avail_count || 5;
        return range(0, components_count).map((l, l_idx)=>{
            return  {
                id: badge.id + "_" + idx + "_" + l_idx,
                class: badge.id,
                w: w,
                h: badge_height,
                default_y: default_y,
                default_x: default_x,
                current_y: default_y,
                current_x: default_x,
                text: badge.id
            }
        });
    });

    let badges_types_2 = badges.filter(t=>t.size_type === 2).map((badge, idx) => {

        let w = badge_height;

        badges_object[badge.id] = {w: w, h: badge_height};
        let default_y = (height + badge_height*2);
        let default_x =  ((w+badge_height/2) * idx) + badge_height/2;

        let components_count = badge.avail_count || 5;
        return range(0, components_count).map((l, l_idx)=>{
            return  {
                id: badge.id + "_" + idx + "_" + l_idx,
                class: badge.id,
                w: badge_height,
                h: badge_height,
                default_y: default_y,
                default_x: default_x,
                current_y: default_y,
                current_x: default_x,
                text: badge.id
            }
        });
    });

    let badges_types = badges_types_1.concat(badges_types_2);

    let correct_state = settings.correct_answer;


    function range (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }



    new Vue({
        el: '#evacuation_plan_block',
        template: `
<div :style="instructionStyle" style="border: 1px solid " >
    
    <div v-if="instruction_visible" :style="instructionStyle" class="instruction-block"> 
        <div class="instruction-content">
            <div class="instruction-text">
                <p><strong>Кейс:</strong> после нажатия кнопки «Начать» вам будет представлен план эвакуации из торгового центра, на котором размещены как обязательные значки, так и дополнительные, информационные. </p>
                <p>У вас есть 10 секунд с момента нажатия кнопки «Начать», чтобы смотреть на картинку и запоминать расположение значков.</p>
                <p><strong>Задание:</strong> </p>
                <p>разместить на чистом шаблоне только те значки, которые обязательно должны быть указаны на плане эвакуации. Время для размещения значков не ограничено.</p>
            </div>    
            <div class="start-button">
                <button v-on:click="startTask">Начать</button>
            </div>
        </div>
    </div>


<div v-bind:style="areaStyle">
            
            <template v-if="correct_answer_visible">
               <vue-draggable-resizable v-for="(corr_comp, corr_index) in correct_state" 
               :z="9" 
               :draggable="false" 
               :parent="true" 
               :resizable="false" 
               :x="corr_comp.current_x" 
               :y="corr_comp.current_y" 
               :class="[corr_comp.class, 'badge']"
               :w="badges_object[corr_comp.class].w"
               :h="badges_object[corr_comp.class].h">
               <div class="badge-img" :style="badgeBackground(corr_comp.class)"></div>
               </vue-draggable-resizable>
         </template>
         
            <template v-if="task_visible" v-for="(components_group, index_0) in components">

                <vue-draggable-resizable v-for="(component, index_1) in components_group" 
                :id="component.id" 
                :z="9" 
                :draggable="index_1 != 0 && can_draggable"  
                :class="[component.class, 'badge', { 'active-badge ': (can_draggable && index_1 != 0) }, { 'badge-disabled ': index_1 == 0 }, {'badge-dragging':(can_draggable && dragging && index_1 != 0)}, {preview:!can_draggable}]" 
                :parent="true" 
                :resizable="false" 
                :x="component.current_x" 
                :y="component.current_y" 
                :w="component.w" 
                :h="component.h" 
                @dragging="onDrag" 
                @dragstop="onDragStop"
                @activated="onActivated(index_0, index_1)" 
                @deactivated="onDeactivated">
                <div class="badge-img" :style="badgeBackground(component.class)"></div>
                
                <template v-if="component.current_y + badge_height < height && can_draggable && can_draggable">
                    <div @click="removeComponent(index_0, index_1)" class="remove-btn" ></div>
                </template>
                </vue-draggable-resizable>

            </template>

         
        <div v-if="task_visible" class="components-zone" :style="componentsZoneHeight"></div>
    
    </div>

<!--    <div v-if="can_draggable == false" class="components-zone-hider" :style="componentsZoneHeight"></div>-->
    


     </div>
        `,
        data: {
            badges_object: badges_object,
            used_elements: [],
            current_element: undefined,
            components: badges_types,
            height: height,
            width: width,
            dragging: false,
            can_draggable: true,
            currentField: {},
            badge_height: badge_height,
            components_zone_height: components_zone_height,
            student_state: student_state,
            correct_state: correct_state,
            // show_instruction: false,
            // instruction_visible:false,

            state: state,

            instruction_visible:false,
            correct_answer_visible: false,
            task_visible: false,

            show_correct_delay: delay,
            badges_object: badges_object,
        },
        mounted() {
            // console.log("this.student_state: ", this.student_state);
            if(this.state.complete){
                this.can_draggable = false;
                this.task_visible = true;
                this.build_state(this.student_state);
                // this.correct_answer_visible = true;
                $(submit_button).show();
            }
            else{
                this.instruction_visible = true;
                // this.startTask();
            }

        },
        methods: {

            startTask(){
                this.instruction_visible = false;
                this.correct_answer_visible = true;
                setTimeout(() => {
                    this.correct_answer_visible = false;
                    this.task_visible = true;
                    answer.setJSON({answer: this.used_elements, complete: true});
                    $(submit_button).show();
                    // $(save_button).trigger('click');
                    }, this.show_correct_delay * 1000);

            },

            removeComponent(index_0, index_1) {
                // if (confirm('Удалить элемент со схемы?')) {
                    this.components[index_0][index_1].current_x = this.components[index_0][index_1].default_x;
                    this.components[index_0][index_1].current_y = this.components[index_0][index_1].default_y;
                    this.get_used_components();
                    // }
                // else {}
            },
            onDrag: function (x, y) {
                console.log("onDrag");
                this.components[this.currentIndex_0][this.currentIndex_1].current_x = x;
                this.components[this.currentIndex_0][this.currentIndex_1].current_y = y;
                this.currentField.current_x = x;
                this.currentField.current_y = y;
                this.dragging = true;
            },
            onDragStop: function(x,y){
                console.log("onDragStop");

                if(y + this.badge_height > height){
                    this.components[this.currentIndex_0][this.currentIndex_1].current_x = this.components[this.currentIndex_0][this.currentIndex_1].default_x;
                    this.components[this.currentIndex_0][this.currentIndex_1].current_y = this.components[this.currentIndex_0][this.currentIndex_1].default_y;
                }
                this.dragging = false;
                // console.log(x,y)
                this.get_used_components();
            },

            setDefaultState: function(){
                this.components.forEach((comp_group)=>{
                    comp_group.forEach((comp)=>{
                        comp.current_x = comp.default_x;
                        comp.current_y = comp.default_y;
                    });
                });
            },

            onActivated(ind_0, ind_1) {
                console.log('onActivated');
                this.currentIndex_0 = ind_0;
                this.currentIndex_1 = ind_1;
                this.dragging = true;
            },
            onDeactivated() {
                this.dragging = false;
                // this.current_element = undefined;
            },

            get_used_components(){
                this.used_elements = [];
                let answer_arr = [];
                this.components.forEach((group) => {
                    this.used_elements = this.used_elements.concat(group.filter(component=>{return (component.current_y + this.badge_height) < height }));
                });

                this.used_elements.forEach((element)=>{
                    answer_arr.push({
                        // id: element.id,
                        class: element.class,
                        center_y: element.current_y + element.h / 2,
                        center_x: element.current_x + element.w / 2,
                        current_x: element.current_x,
                        current_y: element.current_y,
                    })
                });
                // console.log()
                answer.setJSON({answer: answer_arr, complete: true});
                // console.log(JSON.stringify(answer));
            },

            badgeBackground: function (badge_class) {
                return {"background-image": `url(${img_path}${badge_class}.svg)`}
            },

            build_state(state){
                if(state.length) {
                    let unique_badges = state.map(item => item.class);
                    unique_badges = unique_badges.filter(function (item, pos) {
                        return unique_badges.indexOf(item) === pos;
                    });
                    let u_b_obj = {};
                    unique_badges.forEach((u_b) => {
                        u_b_obj[u_b] = {
                            u_b_len: state.filter(s => s.class === u_b).length,
                        };
                    });
                    this.components.forEach((b_t) => {
                        if (unique_badges.includes(b_t[0].class)) {
                            range(0, u_b_obj[b_t[0].class].u_b_len - 1).forEach((item, ind) => {
                                state.filter(ts => ts.class === b_t[ind].class).forEach((l, l_ind) => {
                                    b_t[b_t.length - 1 - l_ind].current_x = l.current_x;
                                    b_t[b_t.length - 1 - l_ind].current_y = l.current_y;
                                });
                            });
                        }
                    });
                }
            },

        },

        computed: {
            areaStyle: function () {
                return {
                    height: this.height + (this.task_visible ? this.components_zone_height : 0) + "px",
                    width: this.width + "px",
                    background: `url(${img_path}${background_img})`,
                    "background-position": "top center",
                    "background-repeat": "no-repeat",
                    "background-size": "contain",
                    position: "relative",
                    // border: "1px solid #e6e6e6",
                }
            },
            instructionStyle: function(){
                return {
                    height: this.height + (this.task_visible ? this.components_zone_height : 0) + "px",
                    width: this.width + "px",
                }
            },
            componentsZoneHeight: function () {
                return {
                    height: (this.components_zone_height) + "px",
                }
            }

        }
    })

}

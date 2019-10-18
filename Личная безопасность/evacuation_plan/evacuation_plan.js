function EvacuationPlan(settings) {

    let element = settings.element;
    let badges = settings.badges;
    const img_path = settings.img_path;
    const background_img = settings.background_img;
    let width = 800; // in px
    let height = 600; // in px

    let badge_height = 40;
    let components_zone_height = badge_height * 3.5;

    // let components_count = 1;
    console.log(badges);

    let badges_types_1 = badges.filter(t=>t.size_type === 1).map((badge, idx) => {

        let w = badge_height * 1.875;
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

    let correct_state = [{"class":"badge_07","center_y":59,"center_x":420.5,"current_x":383,"current_y":39},{"class":"badge_07","center_y":462,"center_x":421.5,"current_x":384,"current_y":442},{"class":"badge_08","center_y":104,"center_x":775,"current_x":755,"current_y":84},{"class":"badge_08","center_y":302,"center_x":775,"current_x":755,"current_y":282},{"class":"badge_08","center_y":104,"center_x":24,"current_x":4,"current_y":84},{"class":"badge_08","center_y":508,"center_x":25,"current_x":5,"current_y":488}];

    let student_state = [{"class":"badge_05","center_y":458,"center_x":420.5,"current_x":383,"current_y":438},{"class":"badge_07","center_y":172,"center_x":418.5,"current_x":381,"current_y":152},{"class":"badge_07","center_y":327,"center_x":415.5,"current_x":378,"current_y":307},{"class":"badge_08","center_y":105,"center_x":776,"current_x":756,"current_y":85},{"class":"badge_08","center_y":251,"center_x":510,"current_x":490,"current_y":231},{"class":"badge_08","center_y":509,"center_x":26,"current_x":6,"current_y":489},{"class":"badge_08","center_y":248,"center_x":331,"current_x":311,"current_y":228},{"class":"badge_11","center_y":254,"center_x":420,"current_x":400,"current_y":234}];

    function range (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    new Vue({
        el: '#evacuation_plan_block',
        template: `
<div :style="instructionStyle">
<transition name="fade">
    <div v-if="instruction_visible" :style="instructionStyle" class="instruction-block"> 
        <div class="instruction-content">
            <div class="instruction-text">
                <p>Предлагаю показать следующим образом:</p>
                <p>Термины даны врзаброс, их надо перетащить на картинку в соответствующую зону.</p>
                
                <p>Картинка -  здание античного храма, где:</p>
                <p>Стереобат:</p>
                <p>Верхняя ступень подписана “базис”</p>
                <p>Нижняя ступень разделена на 2 части, в которые надо поместить элементы из “базиса”. Порядок - любой, строгого соответствия нет.</p>
            
            </div>    
            <div class="start-button">
                <button v-on:click="showCorrect">Начать</button>
            </div>
        </div>
    </div>
</transition>

<div v-if="instruction_visible === false" v-bind:style="areaStyle">
            <template v-for="(components_group, index_0) in components">
    
            <vue-draggable-resizable v-for="(component, index_1) in components_group" :id="component.id" :draggable="index_1 != 0 && can_draggable" :parent="true" :resizable="false" :x="component.current_x" :y="component.current_y" :w="component.w" :h="component.h" @dragging="onDrag" @dragstop="onDragStop" @activated="onActivated(index_0, index_1)" @deactivated="onDeactivated">
            <div :class="[component.class, 'badge', { 'badge-disabled': index_1 == 0 }, {'badge-dragging':(can_draggable && dragging && index_1 != 0)}, {preview:!can_draggable}]" :style="badgeBackground(component.class)"></div>
                    <template v-if="component.current_y + badge_height < height && can_draggable && can_draggable">
                        <div @click="removeComponent(index_0, index_1)" class="remove-btn" ></div>
                    </template>
            </vue-draggable-resizable>
            
</template>
                  
    <div class="components-zone" :style="componentsZoneHeight"></div>

<transition name="fade">
    <div v-if="can_draggable == false" class="components-zone-hider" :style="componentsZoneHeight"></div>
    </transition>
    
     </div>

     </div>
        `,
        data: {
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
            show_instruction: true,
            instruction_visible:false,
            show_correct_delay: 3,
        },
        mounted() {
            // this.setDefaultState();
            if (this.show_instruction){
                this.instruction_visible = true;
            }

        },
        methods: {

            showCorrect(){
                this.can_draggable = false;
                this.instruction_visible = false;
                console.log("this.instruction_visible: ", this.instruction_visible);
                this.build_state(this.correct_state);
                setTimeout(() => {
                    this.setDefaultState();
                    this.can_draggable = true;
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
                this.components[this.currentIndex_0][this.currentIndex_1].current_x = x;
                this.components[this.currentIndex_0][this.currentIndex_1].current_y = y;
                this.currentField.current_x = x;
                this.currentField.current_y = y;
                this.dragging = true;
            },
            onDragStop: function(x,y){
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
                let answer = [];
                this.components.forEach((group) => {
                    this.used_elements = this.used_elements.concat(group.filter(component=>{return (component.current_y + this.badge_height) < height }));
                });

                this.used_elements.forEach((element)=>{
                    answer.push({
                        // id: element.id,
                        class: element.class,
                        center_y: element.current_y + element.h / 2,
                        center_x: element.current_x + element.w / 2,
                        current_x: element.current_x,
                        current_y: element.current_y,
                    })
                });
                // console.log()
                console.log(JSON.stringify(answer));
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
                    height: this.height + this.components_zone_height + "px",
                    width: this.width + "px",
                    background: `url(${img_path}${background_img})`,
                    "background-position": "top center",
                    "background-repeat": "no-repeat",
                    "background-size": "contain",
                    position: "relative",
                    border: "1px solid #e6e6e6",
                }
            },
            instructionStyle: function(){
                return {
                    height: this.height + this.components_zone_height + "px",
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

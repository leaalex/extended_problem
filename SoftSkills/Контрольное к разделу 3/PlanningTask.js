function PlanningTask(settings) {

    settings.tasks_obj = settings.tasks.reduce((acc, cur) => ({...acc, [cur.id]: cur}), {});
    settings.tasks = settings.tasks.sort(() => Math.random() - 0.5);

    new Vue({
        template: `<div class='task_table' v-bind:style="areaStyle" >
        <template v-for="(day,index) in days">
            <vue-draggable-resizable  :resizable="false" :draggable="false" :w="x_pixel_step*2+1"
                                     :h="y_pixel_step" :x="(first_column_size*2)+ (index)*(x_pixel_step*2)" :y="0" :grid=[x_pixel_step,y_pixel_step]
                                     :parent="true" class="day-label">
                <div class="label" v-html="day.title"></div>
            </vue-draggable-resizable>
            </template>
        </div>
        `,
        el: '#y_xis',
        data: {
            x_pixel_step: settings.x_pixel_step,
            y_pixel_step: settings.y_pixel_step,
            first_column_size: settings.first_column_size || settings.x_pixel_step,
            days: settings.days,
        },
        methods: {},
        computed: {
            areaStyle: function () {
                return {
                    height: this.y_pixel_step + "px",
                    width: this.x_pixel_step * (settings.area_width) + "px",
                    "min-width": this.x_pixel_step * (settings.area_width) + "px",
                    position: "relative",
                    "margin-bottom": "-1px",
                    "margin-left": "-1px"
                }
            },
        }
    });
    new Vue({
        template: `<div class='task_table' v-bind:style="areaStyle" >
            <template v-for="(time,index) in times">
                <vue-draggable-resizable :resizable="false" :draggable="false" :w="first_column_size*2"
                                         :h="y_pixel_step+1" :x="0" :y="(index)*(y_pixel_step)" :grid=[x_pixel_step,y_pixel_step]
                                         :parent="true" class="time-label">
                    <div class="label" v-html="time.title"></div>
                </vue-draggable-resizable>
               </template>
            </div>
        `,
        el: '#x_axis',
        data: {
            x_pixel_step: settings.x_pixel_step,
            y_pixel_step: settings.y_pixel_step,
            first_column_size: settings.first_column_size || settings.x_pixel_step,
            free_rows: settings.free_rows,
            times: settings.times,
        },
        computed: {
            areaStyle: function () {
                return {
                    height: this.y_pixel_step * this.times.length + "px",
                    width: this.first_column_size * 2 + "px",
                    "min-width": this.first_column_size * 2 + "px",
                    position: "relative",
                }
            }
        }
    });
    new Vue({
        template: `
<div class='task_table' v-bind:style="areaStyle" >
<div class="dividing-line" v-bind:style="{left: -1 + 'px'}"></div>
     
             
              <template v-for="item in fixed_tasks">
            <vue-draggable-resizable :resizable="false" :draggable="false"  :w="x_pixel_step*item.width" :x="(2*x_pixel_step)*item.x" :y="y_pixel_step*item.y"
                                     :h="y_pixel_step*item.height" :grid=[x_pixel_step,y_pixel_step]
                                     :parent="true" class="task fixed-task">
                    <div class="title" v-html="item.title"></div>
            </vue-draggable-resizable>
        </template>
        
        
      <template v-for="(item,item_index) in tasks">
            <vue-draggable-resizable :w="x_pixel_step*item.width" :x="(2*x_pixel_step)*item.x" :y="y_pixel_step*item.y"
                                     :h="y_pixel_step*item.height"
                                     :minHeight="y_pixel_step" :minWidth="x_pixel_step" :grid=[x_pixel_step,y_pixel_step]
                                     :maxWidth="x_pixel_step*2" :maxHeight="times.length*y_pixel_step" @dragging="onDrag" @resizing="onResize"
                                     @activated="onActivated(item.id)" @deactivated="onDeactivated"
                                     :parent="true" :style="{background: getBackground(item_index), 'z-index': current_element == item.id ? 999 : 1}" class="task active-task"  v-bind:id="item.id">
                    <div class="title" v-if="2 > item.width && 2 > item.height && item.title.length >29 " v-html="item.title.slice(0,28) + '...'"></div>
                    <div class="title" v-else v-html="item.title"></div>
                    
                    <div class="title-size" v-if="item.height > 1" v-html="'Длит. ' + item.height + ' ч.'"></div>
            </vue-draggable-resizable>
        </template>
       
    </div>
`,
        el: '#t1',
        data: {
            tasks_obj: settings.tasks_obj,
            x_pixel_step: settings.x_pixel_step,
            y_pixel_step: settings.y_pixel_step,
            items: settings.data,
            free_rows: settings.free_rows,
            settings: settings,
            first_column_size: settings.first_column_size,
            extra_cells_count: settings.extra_cells_count,
            days: settings.days,
            times: settings.times,
            tasks: settings.tasks,
            fixed_tasks: settings.fixed_tasks,
            current_element: undefined,
        },
        methods: {
            onResize: function (x, y, width, height) {
                this.width = width;
                this.height = height;
                this.x = x;
                this.y = y;
                this.tasks_obj[this.current_element].x = this.x / this.x_pixel_step;
                this.tasks_obj[this.current_element].y = this.y / this.y_pixel_step;
                this.tasks_obj[this.current_element].width = this.width / this.x_pixel_step;
                this.tasks_obj[this.current_element].height = this.height / this.y_pixel_step;
                // answer.setJSON({"answer": this.tasks_obj});
            },
            onDrag: function (x, y) {
                this.x = x;
                this.y = y;
                this.tasks_obj[this.current_element].x = this.x / this.pixel_step;
                this.tasks_obj[this.current_element].y = this.y / this.pixel_step;
                // answer.setJSON({"answer": this.tasks_obj});
            },
            onActivated(id) {
                this.current_element = id;
            },
            onDeactivated() {
                this.current_element = undefined;
            },
            getBackground: function(idx){
                let background_colors = [
                    // "#ea5e3df5",
                    "#4a5ab1f5",
                    "#2d8631f5",
                    // "#dc8400f5",
                    "#009688f5"]
                if (background_colors.length > idx)
                    return background_colors[idx];
                else{
                    return background_colors[idx % background_colors.length]
                }
            },
        },
        computed: {

            areaStyle: function () {
                return {
                    height: this.y_pixel_step * settings.area_height + (this.y_pixel_step * this.free_rows) + "px",
                    width: this.x_pixel_step * (settings.area_width) + "px",
                    "min-width": this.x_pixel_step * (settings.area_width) + "px",
                    background: `linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / ${this.x_pixel_step}px ${this.y_pixel_step}px, linear-gradient(rgba(0, 0, 0, 0.99) 1px, transparent 1px) 0% 0% / ${this.x_pixel_step}px ${this.y_pixel_step}px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / ${this.x_pixel_step}px ${this.y_pixel_step/2}px, linear-gradient(-90deg, rgba(0, 0, 0, 0.99) 1px, transparent 1px) 0% 0% / ${this.x_pixel_step*2}px ${this.y_pixel_step}px`,
                    position: "relative",
                }
            },
            dividingLineLeft: function () {
                return {
                    left: ((this.extra_cells_count + 1) * this.pixel_step - 2) + "px",
                }
            }
        }
    });
}

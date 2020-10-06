function Chart(element, config) {
    function createElementSVG(name, id, classList, attributes) {
        var NS = "http://www.w3.org/2000/svg";
        var element = document.createElementNS(NS, name);
        if (id) element.id = id;

        if (classList) element.classList.add(classList);
        if (attributes) {
            for (attribute in attributes) {
                element.setAttribute(attribute, attributes[attribute])
            }
        }
        return element;
    };
function createTextSVG(x, y, text, attributes) {
    var NS = "http://www.w3.org/2000/svg";
    var textObject = document.createElementNS(NS, "text");
    var textObject = createElementSVG("text", null, null, {
        x: x,
        y: y
    });
    if (attributes) {
        for (attribute in attributes) {
            textObject.setAttribute(attribute, attributes[attribute])
        }
    }
    var textNode = document.createTextNode(text);
    textObject.appendChild(textNode);
    return textObject;
}
function setAttributes(element, attrs) {
        for (var key in attrs) {
            element.setAttribute(key, attrs[key]);
        }
        return element;
    };

let data = config.chart.data;

// let data = [
//     {x: 3, y:0.37},
//     {x: 6, y:0.12},
//     {x: 9, y:0.21},
//     {x: 12, y:0.25},
//     {x: 15, y:0.05},
// ]

// data = [
//     {x: 5, y:16},
//     {x: 10, y:38},
//     {x: 15, y:29},
//     {x: 20, y:12},
//     {x: 25, y:5},
// ]

// data = [
//     {x:2,y:22},
//     {x:4,y:13},
//     {x:6,y:38},
//     {x:8,y:30},
//     {x:10,y:7}
// ]

let chart_type = config.chart.type || "line" // line || bar
// chart_type = "line" // line || bar

let SVG_height = config.base.height || 480;
let SVG_width = config.base.width || 480;
let background_color = config.base.background.color || "white";
let background_stroke = config.base.background.stroke || "white";
let background_stroke_width = config.base.background.stroke_width || 0;

let margins = config.chart.margin || 60;
let arrow_margin = config.chart.padding || 60; // отступ от края графика

let font_size = config.base.font_size;
let axis_near_zero = config.axis.before_zero;
let num_width = font_size * 0.642; // 9
let num_height = font_size * 0.714; // 10

let hide_indexes = {}
if (Object.keys(config.hide_indexes).includes("x")){
    hide_indexes.x = config.hide_indexes.x;
} else{
    hide_indexes.x = {};
}
if (Object.keys(config.hide_indexes).includes("y")){
    hide_indexes.y = config.hide_indexes.y;
} else{
    hide_indexes.y = {};
}

let axis_labels = {
            x: {
                text: config.axis.labels.x.text || "",
                size: config.axis.labels.x.size ||  20,
            },
            y: {
                text: config.axis.labels.y.text || "",
                size: config.axis.labels.y.size || 20,
            }
}

let axis_style = {
    color: config.axis.style.color || "black",
    size: config.axis.style.size || 2.3,
}

let line_style = {
    color: config.chart.style.color || "black",
    size: config.chart.style.size || 2.2,
}

let point_style = {
    color: config.chart.points.style.color || "black",
    size: config.chart.points.style.size || 4,
}

let projection_style = {
    color: config.chart.projection.style.color || "black",
    size: config.chart.projection.style.size || 1,
    dasharray: config.chart.projection.style.dasharray || "6 3",
}

let nick_size = config.axis.nick_size || 8;

let show_projection = true;

if (config.chart.projection) {
    if (config.chart.projection.show === false) {
        show_projection = false;
    }
}

let svg = createElementSVG('svg', "time_line_svg", null, {
    "viewbox": '0 0 ' + SVG_width + ' ' + SVG_height,
    "width": SVG_width,
    "height": SVG_height,
});

let background = createElementSVG('rect', null, 'chart-background', {
    "x": "0",
    "y": "0",
    "width": SVG_width,
    "height": SVG_height,
    "fill": background_color,
    "stroke": background_stroke,
    'stroke-width': background_stroke_width,
});

let axis_arrow = createElementSVG('marker', 'x-axis-marker' , null, {
    "markerWidth": "10",
    "markerHeight": "10",
    "refX": "0.5",
    "refY": "3",
    "orient": "auto",
    "markerUnits": "strokeWidth"
});
axis_arrow.innerHTML = '<path d="M-3,0 L-3,6 L6,3 z" fill="' + (axis_style.color || "black") + '" />';
svg.append(axis_arrow);

let y_axis = createElementSVG('line', null, 'items-zone-line', {
    "x1": margins,
    "y1": SVG_height - margins + axis_near_zero,
    "x2": margins,
    "y2": margins,
    "stroke": axis_style.color || "black",
    "stroke-width": axis_style.size || 2,
    "marker-end": "url(#x-axis-marker)",

});
let x_axis = createElementSVG('line', null, 'items-zone-line', {
    "x1": margins - axis_near_zero,
    "y1": SVG_height - margins,
    "x2": SVG_width - margins,
    "y2": SVG_height - margins,
    "stroke": axis_style.color || "black",
    "stroke-width": axis_style.size || 2,
    "marker-end": "url(#x-axis-marker)",
});

let x_axis_label = createElementSVG('foreignObject', null, 'axis-label', {
    "x": SVG_width - margins,
    "y": SVG_height - margins,
    "width": "100%",
    "height":(font_size * 2) + "px",
});
x_axis_label.innerHTML = '<div style="font-size:' + font_size + 'px">' + axis_labels.x.text + '</div>'

let y_axis_label = createElementSVG('foreignObject', null, 'axis-label', {
    "x": margins - axis_labels.y.size - 6,
    "y": margins,
    "width": "100%",
    "height":(font_size * 2) + "px",
});
y_axis_label.innerHTML = '<div style="font-size:' + font_size + 'px">' + axis_labels.y.text + '</div>'

let zero_label = createTextSVG(margins - num_width-4, SVG_height - margins + num_height + 4, "0", {"class":"zero-label", "font-size": font_size + "px",})

svg.append(background);
svg.append(zero_label)
svg.append(x_axis);
svg.append(y_axis);
svg.append(x_axis_label)
svg.append(y_axis_label)

let graphic_group = createElementSVG('g', "graphic_group", null, {});

let defs =  createElementSVG('defs', "", null, {});
defs.innerHTML = `<pattern id="pattern_yPourJ" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)"><line x1="0" y="0" x2="0" y2="7" stroke="#868686" stroke-width="2" /></pattern>`

svg.append(defs)

if (chart_type === "line"){
    let prev_point = {}
    let points_group = createElementSVG('g', null, "points-group", {});
    let lines_group = createElementSVG('g', null, "lines-group", {});
    data.forEach(function (point, index, points_arr){
        let free_space_x = SVG_width - (2*margins) - arrow_margin;
        let free_space_y = SVG_height - (2*margins) - arrow_margin;

        let point_x = (margins) + (free_space_x/Math.max(...points_arr.map(function(p){return p.x})) * point.x)
        let point_y = (SVG_height - margins) - (free_space_y/Math.max(...points_arr.map(function(p){return p.y})) * point.y);

        let to_x_projection = createElementSVG('line', null, 'projection', {
            "x1": point_x,
            "y1": point_y + point_style.size,
            "x2": point_x,
            "y2": SVG_height - margins,
            "stroke": projection_style.color || "black",
            "stroke-dasharray": projection_style.dasharray || 3,
            "stroke-width": projection_style.size || 1.3,
        });

        let to_y_projection = createElementSVG('line', null, 'projection', {
            "x1": point_x - point_style.size,
            "y1": point_y,
            "x2": margins,
            "y2": point_y,
            "stroke": projection_style.color || "black",
            "stroke-dasharray": projection_style.dasharray || 3,
            "stroke-width": projection_style.size || 1.3,
        });

        let x_nick = createElementSVG('line', null, 'nick', {
            "x1": point_x,
            "y1": SVG_height - margins - nick_size/2,
            "x2": point_x,
            "y2": SVG_height - margins + nick_size/2,
            "stroke": axis_style.color,
            "stroke-width": axis_style.size*1.2,
        });

        let y_nick = createElementSVG('line', null, 'nick', {
            "x1": margins + nick_size/2,
            "y1": point_y,
            "x2": margins - nick_size/2,
            "y2": point_y,
            "stroke": axis_style.color,
            "stroke-width": axis_style.size*1.2,
        });

        if (index !== points_arr.length && index !== 0){
            let line1 = createElementSVG('line', null, 'graphic-line', {
                "x1": point_x,
                "y1": point_y,
                "x2": prev_point.x,
                "y2": prev_point.y,
                "stroke": line_style.color || "black",
                "stroke-width": line_style.size || 1.5,
            });
            lines_group.append(line1)
        }
        let graphic_point_group = createElementSVG('g', null, "graphic-point-group", {});

        let graphic_point = createElementSVG('circle', null, 'graphic-point', {
            "r": point_style.size,
            "cx": point_x,
            "cy": point_y,
            "fill": point_style.color || "black",
        });

        prev_point = {
            x: point_x,
            y: point_y
        }

        svg.append(x_nick)
        svg.append(y_nick)

        graphic_point_group.append(graphic_point);

        if (show_projection) {
            graphic_point_group.append(to_x_projection);
            graphic_point_group.append(to_y_projection);
        }




        points_group.append(graphic_point_group)
        let x_label_text =  point.x.toString();
        if (Object.keys(hide_indexes.x).includes(index.toString())) {
            x_label_text = hide_indexes.y[index].replace_with;
        }
        let label_x = createTextSVG(point_x -  ((x_label_text).toString().replace(".","").length * num_width/3), SVG_height - margins + num_height + 4 + nick_size/2, x_label_text, {"class":"axis-label", "font-size": font_size + "px",});
        graphic_group.append(label_x);

        let y_label_text =  point.y.toString();
        if (Object.keys(hide_indexes.y).includes(index.toString())) {
            y_label_text = hide_indexes.y[index].replace_with;
        }
        let label_y = createTextSVG(margins - ((y_label_text).toString().replace(".", "").length * num_width) - 4 - nick_size/2, point_y + num_height / 2, y_label_text, {"class":"axis-label", "font-size": font_size + "px",});
        graphic_group.append(label_y);
    });
    graphic_group.append(lines_group);
    graphic_group.append(points_group);
}
else{
    let prev_point = {}
    data.forEach(function (point, index, points_arr){
        let free_space = SVG_width - (2*margins) - arrow_margin;
        let bar_step = (free_space/Math.max(...points_arr.map(function(p){return p.x})))
        let bar_y = SVG_height - margins - (free_space/Math.max(...points_arr.map(function(p){return p.y})) * point.y);

        let bar_group = createElementSVG('g', null, "bar-group", {});

        let bar = createElementSVG('rect', null, 'chart-bar', {
            "x": margins + (index == 0 ? 0: bar_step * points_arr[index - 1].x ),
            "y": bar_y,
            "width": index == 0 ? bar_step * (point.x - 0) : bar_step * (point.x - points_arr[index - 1].x),
            "height": (free_space/Math.max(...points_arr.map(function(p){return p.y})) * point.y),
            "stroke": line_style.color || "black",
            "fill":"url(#pattern_yPourJ)",
            "stroke-width": line_style.size || 2,
        });



        let to_y_projection = createElementSVG('line', null, 'projection', {
            "x1": margins + (index == 0 ? 0: bar_step * points_arr[index - 1].x ),
            "y1": bar_y,
            "x2": margins,
            "y2": bar_y,
            "stroke": projection_style.color || "black",
            "stroke-dasharray": projection_style.dasharray || 3,
            "stroke-width": projection_style.size || 1.3,
        });

        let y_nick = createElementSVG('line', null, 'nick', {
            "x1": margins + nick_size/2,
            "y1": bar_y,
            "x2": margins - nick_size/2,
            "y2": bar_y,
            "stroke": axis_style.color,
            "stroke-width": axis_style.size*1.2,
        });


        let y_label_text =  point.y.toString();
        if (Object.keys(hide_indexes.y).includes(index.toString())) {
            y_label_text = hide_indexes.y[index].replace_with;
        }
        let label_y = createTextSVG(margins - ((y_label_text).toString().replace(".", "").length * num_width) - 4- nick_size/2, bar_y + num_height / 2, y_label_text, {"class":"axis-label", "font-size": font_size + "px",})
        graphic_group.append(label_y)

        let x_label_text =  point.x.toString();
        if (Object.keys(hide_indexes.x).includes(index.toString())) {
            x_label_text = hide_indexes.x[index].replace_with;
        }
        let label_x = createTextSVG(margins + (bar_step * point.x) - ((x_label_text).toString().replace(".", "").length * num_width)/2, SVG_height - margins + num_height + 4 + nick_size/2, x_label_text, {"class":"axis-label", "font-size": font_size + "px",})
        graphic_group.append(label_x)

        bar_group.append(bar)
        if (show_projection) {
            bar_group.append(to_y_projection);
        }
        graphic_group.append(bar_group);
        svg.append(y_nick)
    });
}

    let css = `
        .graphic-point-group .graphic-point:hover{
            r: ${point_style.size * 1.6};
            cursor: pointer;
        }
        .graphic-point-group .graphic-point:hover ~ .projection{
            stroke: black;
            stroke-width: ${projection_style.size * 2.2};
        }
        
        .bar-group .chart-bar:hover{
             cursor: pointer;
             stroke-width: ${line_style.size * 1.3};
        }
        .bar-group .chart-bar:hover ~ .projection{
            stroke: black;
            stroke-width: ${projection_style.size * 2.2};
        }
        .axis-label, zero-label{
            -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                 -khtml-user-select: none; /* Konqueror HTML */
                   -moz-user-select: none; /* Old versions of Firefox */
                    -ms-user-select: none; /* Internet Explorer/Edge */
                        user-select: none;
        }
    `
    let style = document.createElement("style")
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.querySelector("head").appendChild(style);

svg.append(graphic_group);

element.append(svg)
}

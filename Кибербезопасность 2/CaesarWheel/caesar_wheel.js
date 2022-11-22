let box = document.querySelector("#caesarCipherWheel")
// (function() {
    var init, rotate, start, stop,
        active = false,
        angle = parseFloat(localStorage.getItem('caesar_wheel_rotate')) || 0,
        rotation = 0,
        startAngle = 0,
        center = {
            x: 0,
            y: 0
        },
        slices_count = 33,
        R2D = 180 / Math.PI,
    rot = box.querySelector('#outer_circle')
    // rot = box.querySelector('#inner_circle_background')
    shift_count = document.querySelector('#step_angle')
    shift_count.querySelector('text').style.textAnchor = "middle"
    shift_count.querySelector('text').removeAttribute("transform")
    shift_count.querySelector('text').setAttribute("x", "50%")
    shift_count.querySelector('text').setAttribute("y", "50%")
    shift_count.querySelector('tspan').removeAttribute("x")
    shift_count.querySelector('tspan').removeAttribute("y")
    shift_count.querySelector('tspan').style.alignmentBaseline = "central"
    shift_count.querySelector('tspan').style.userSelect = "none"

    rot.style.cursor = 'move'
    rot.style.transformOrigin = 'center'

    init = function() {
        rot.addEventListener("mousedown", start, false)
        $(document).bind('mousemove', function(event) {
            if (active === true) {
                event.preventDefault()
                rotate(event)
            }
        })
        $(document).bind('mouseup', function(event) {
            event.preventDefault()
            stop(event)
        })
    }

    start = function(e) {
        e.preventDefault()
        let bb = this.getBoundingClientRect(),
            t = bb.top,
            l = bb.left,
            h = bb.height,
            w = bb.width,
            x, y
        center = {
            x: l + (w / 2),
            y: t + (h / 2)
        }
        x = e.clientX - center.x
        y = e.clientY - center.y
        startAngle = R2D * Math.atan2(y, x)
        return active = true
    }
    //
    rotate = function(e) {
        e.preventDefault()
        let x = e.clientX - center.x
        let y = e.clientY - center.y
        let d = R2D * Math.atan2(y, x)
        rotation = d - startAngle

        const new_angle = (angle + rotation) - Math.floor((angle + rotation)/360) * 360
        const step_angle = Math.round((new_angle) / (360/slices_count)) * (360/slices_count)
        const shift_count_text = Math.round(step_angle/(360/slices_count)) == slices_count ? 0 : Math.round(step_angle/(360/slices_count))
        shift_count.querySelector('tspan').textContent = shift_count_text

        if (2 > Math.abs((angle + rotation) - step_angle)) {
            return rot.style.webkitTransform = "rotate(" + (step_angle) + "deg)"
        } else {
            return rot.style.webkitTransform = "rotate(" + (new_angle) + "deg)"
        }
    }

    stop = function() {
        // console.log('stop')
        let step_angle = Math.round((angle + rotation) / (360/slices_count)) * (360/slices_count)
        step_angle = step_angle - Math.floor(step_angle/360) * 360
        localStorage.setItem('caesar_wheel_rotate',  step_angle.toString());
        shift_count.querySelector('tspan').textContent = Math.round(step_angle/(360/slices_count))
        rot.style.webkitTransform = "rotate(" + (step_angle) + "deg)";
        rotation = 0
        angle = step_angle;

        return active = false;
    };

    init()
    stop()

// }).call(this)
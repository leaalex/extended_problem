let sourceSVG = {
    getButtons: function () {
        return new DOMParser().parseFromString(_source_svg_buttons, "text/html").querySelector("svg");
    },

    getTask: function () {
        return new DOMParser().parseFromString(_source_svg_task, "text/html").querySelector("svg");
    },

    // getRemoveBtn: function () {
    //     return new DOMParser().parseFromString(_source_svg_task, "text/html").querySelector("svg");
    //
    // }

};

// let _source_svg_remove_btn = `<path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>`;

let _source_svg_task = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 23.0.6, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" id="Слой_1" data-name="Слой 1" viewBox="0 0 756.76 578.95"><g><line x1="86.85" y1="277.04" x2="86.85" y2="271.96" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="4"/><polyline points="702.48 509.38 702.48 576.95 86.85 576.95 86.85 291.33" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="4"/><polyline points="344.09 291.33 344.09 448.33 702.48 448.33 702.48 502.24" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="4"/><line x1="344.09" y1="271.54" x2="344.09" y2="277.04" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="4"/><polyline points="702.48 39.37 702.48 125.13 344.09 125.13 344.09 257.25" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="4"/><polyline points="86.85 257.67 86.85 2 702.48 2 702.48 30.86" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="4"/><line x1="299.57" y1="377.97" x2="344.09" y2="377.97" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="193.32" y1="377.97" x2="285.28" y2="377.97" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="86.85" y1="377.97" x2="169.85" y2="377.97" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="153.91" y1="366.09" x2="153.91" y2="377.97" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="86.85 339.5 153.91 339.5 153.91 351.8" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="278.13" y1="377.97" x2="278.13" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="285.28" y1="514.29" x2="277.03" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="321.56" y1="514.29" x2="299.57" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="366.63" y1="514.29" x2="335.85" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="419.4" y1="514.29" x2="380.92" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="452.38" y1="514.29" x2="433.69" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="486.46" y1="514.29" x2="466.67" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="518.34" y1="514.29" x2="500.75" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="552.42" y1="514.29" x2="532.63" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="591.99" y1="514.29" x2="566.71" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="626.07" y1="514.29" x2="606.29" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="656.85" y1="514.29" x2="640.36" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="682.14" y1="514.29" x2="671.15" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="702.48" y1="514.29" x2="696.43" y2="514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="315.51" y1="514.29" x2="315.51" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="346.29" y1="514.29" x2="346.29" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="411.15" y1="514.29" x2="411.15" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="477.11" y1="514.29" x2="477.11" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="508.99" y1="514.29" x2="508.99" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="541.97" y1="514.29" x2="541.97" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="577.15" y1="514.29" x2="577.15" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="614.53" y1="514.29" x2="614.53" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="651.91" y1="514.29" x2="651.91" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="656.86 497.8 651.91 497.8 651.91 448.33" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="682.14" y1="497.8" x2="671.15" y2="497.8" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="702.48" y1="497.8" x2="696.43" y2="497.8" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="676.09" y1="514.29" x2="676.09" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="676.09" y1="448.33" x2="676.09" y2="497.8" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><path d="M604.19,462.07" transform="translate(-21.55 -13.74)" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="566.71 493.4 582.65 493.4 582.65 448.33" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="500.75" y1="493.4" x2="552.42" y2="493.4" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="466.67" y1="493.4" x2="486.46" y2="493.4" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="433.69" y1="493.4" x2="452.38" y2="493.4" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="406.75 448.33 406.75 493.4 419.4 493.4" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="508.99" y1="493.4" x2="508.99" y2="448.33" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="477.11" y1="448.33" x2="477.11" y2="493.4" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="440.83" y1="448.33" x2="440.83" y2="493.4" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="118.18 514.29 118.18 548.37 165.45 548.37 165.45 514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="199.53 514.29 199.53 548.37 246.8 548.37 246.8 514.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="281.98" y1="189.99" x2="344.09" y2="189.99" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="86.85" y1="189.99" x2="267.69" y2="189.99" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="150.61" y1="72.7" x2="150.61" y2="2" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="150.61" y1="189.99" x2="150.61" y2="85.02" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="261.64" y1="2" x2="261.64" y2="189.99" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="122.58 94.34 202.28 94.34 202.28 109.73 150.61 109.73" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="86.85" y1="94.34" x2="108.28" y2="94.34" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="130.27" y1="31.68" x2="150.61" y2="31.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="86.85 31.68 108.28 31.68 115.98 31.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="202.28" y1="2" x2="202.28" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="654.66" y1="105.34" x2="662.9" y2="105.34" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="616.73 125.49 616.73 105.34 640.37 105.34" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="662.9 87.6 662.9 80.05 702.48 80.05" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="662.9" y1="125.49" x2="662.9" y2="97.2" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line y1="303.22" x2="86.85" y2="303.22" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line y1="246.05" x2="86.85" y2="246.05" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="285.28" y1="448.33" x2="278.13" y2="448.33" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="361.77" y1="448.33" x2="299.57" y2="448.33" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="267.69" y1="125.13" x2="86.85" y2="125.13" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="364.76" y1="125.13" x2="281.98" y2="125.13" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="179.19" y1="60.02" x2="179.19" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="179.19" y1="2" x2="179.19" y2="46.09" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="303.42" y1="2" x2="303.42" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="341.89" y1="2" x2="341.89" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="406.76" y1="83.42" x2="406.76" y2="125.49" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="406.76" y1="2" x2="406.76" y2="70.29" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="598.59 65.76 610.13 65.76 610.13 80.05 631.02 80.05 631.02 105.34" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="568.91" y1="65.76" x2="584.3" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="534.83" y1="65.76" x2="554.62" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="478.76" y1="65.76" x2="520.54" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="449.08" y1="65.76" x2="464.47" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="382.02" y1="65.76" x2="434.79" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="336.95" y1="65.76" x2="367.73" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="281.98" y1="65.76" x2="322.66" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="255.6" y1="65.76" x2="267.69" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="173.15" y1="65.76" x2="241.3" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="150.61" y1="65.76" x2="158.85" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="662.9" y1="2" x2="662.9" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="434.79" y1="42.68" x2="406.76" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="464.47" y1="42.68" x2="449.08" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="520.54" y1="42.68" x2="478.76" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="554.62" y1="42.68" x2="534.83" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="584.3" y1="42.68" x2="568.91" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="613.35" y1="42.68" x2="598.59" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="640.36" y1="42.68" x2="624.15" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="702.48" y1="42.68" x2="654.66" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="616.73" y1="2" x2="616.73" y2="19.59" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><polyline points="606.84 42.13 606.84 19.59 631.02 19.59 631.02 42.13" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="576.05" y1="2" x2="576.05" y2="42.13" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="541.97" y1="2" x2="541.97" y2="42.13" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="487.09" y1="2" x2="487.09" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="456.23" y1="2" x2="456.23" y2="42.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="677.19" y1="74.56" x2="677.19" y2="80.05" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="677.19" y1="57.13" x2="677.19" y2="65.76" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="677.19" y1="42.68" x2="677.19" y2="47.77" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="702.48" y1="61.36" x2="677.19" y2="61.36" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="1.1" y1="245.78" x2="1.1" y2="303.22" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="5.26" y1="245.78" x2="5.26" y2="303.22" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="13.58" y1="245.78" x2="13.58" y2="303.22" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="21.91" y1="245.78" x2="21.91" y2="303.22" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="9.42" y1="245.78" x2="9.42" y2="303.22" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="17.75" y1="245.78" x2="17.75" y2="303.22" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="26.07" y1="245.78" x2="26.07" y2="303.22" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="30.23" y1="245.78" x2="30.23" y2="303.22" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="117.93" y1="514.62" x2="86.85" y2="514.62" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="117.93" y1="518.78" x2="86.85" y2="518.78" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="117.93" y1="527.1" x2="86.85" y2="527.1" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="117.93" y1="535.43" x2="86.85" y2="535.43" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="117.93" y1="522.94" x2="86.85" y2="522.94" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="117.93" y1="531.26" x2="86.85" y2="531.26" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="117.93" y1="539.59" x2="86.85" y2="539.59" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="117.93" y1="543.75" x2="86.85" y2="543.75" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="278.43" y1="514.62" x2="247.35" y2="514.62" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="278.43" y1="518.78" x2="247.35" y2="518.78" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="278.43" y1="527.1" x2="247.35" y2="527.1" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="278.43" y1="535.43" x2="247.35" y2="535.43" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="278.43" y1="522.94" x2="247.35" y2="522.94" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="278.43" y1="531.26" x2="247.35" y2="531.26" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="278.43" y1="539.59" x2="247.35" y2="539.59" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="278.43" y1="543.75" x2="247.35" y2="543.75" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="200.08" y1="514.1" x2="165.49" y2="514.1" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="200.08" y1="518.26" x2="165.49" y2="518.26" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="200.08" y1="526.59" x2="165.49" y2="526.59" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="200.08" y1="534.91" x2="165.49" y2="534.91" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="200.08" y1="522.42" x2="165.49" y2="522.42" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="200.08" y1="530.75" x2="165.49" y2="530.75" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="200.08" y1="539.07" x2="165.49" y2="539.07" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="200.08" y1="543.23" x2="165.49" y2="543.23" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="218.03" y1="548.14" x2="218.03" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="222.19" y1="548.14" x2="222.19" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="230.51" y1="548.14" x2="230.51" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="238.84" y1="548.14" x2="238.84" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="226.35" y1="548.14" x2="226.35" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="234.68" y1="548.14" x2="234.68" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="243" y1="548.14" x2="243" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="247.16" y1="548.14" x2="247.16" y2="576.95" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="117.99" y1="548.83" x2="117.99" y2="577.64" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="122.15" y1="548.83" x2="122.15" y2="577.64" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="130.47" y1="548.83" x2="130.47" y2="577.64" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="138.8" y1="548.83" x2="138.8" y2="577.64" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="126.31" y1="548.83" x2="126.31" y2="577.64" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="134.64" y1="548.83" x2="134.64" y2="577.64" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="142.96" y1="548.83" x2="142.96" y2="577.64" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="147.12" y1="548.83" x2="147.12" y2="577.64" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="431.22" y1="245.13" x2="344.37" y2="245.13" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="431.22" y1="302.3" x2="344.37" y2="302.3" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="430.12" y1="302.57" x2="430.12" y2="245.13" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="425.96" y1="302.57" x2="425.96" y2="245.13" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="417.63" y1="302.57" x2="417.63" y2="245.13" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="409.31" y1="302.57" x2="409.31" y2="245.13" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="421.8" y1="302.57" x2="421.8" y2="245.13" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="413.47" y1="302.57" x2="413.47" y2="245.13" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="405.15" y1="302.57" x2="405.15" y2="245.13" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="400.99" y1="302.57" x2="400.99" y2="245.13" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="322.11" y1="45.97" x2="281.43" y2="45.97" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="324.3" y1="31.68" x2="283.63" y2="31.68" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="323.21" y1="17.39" x2="282.53" y2="17.39" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="756.35" y1="24.81" x2="702.07" y2="24.81" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="756.35" y1="48.06" x2="702.07" y2="48.06" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="755.25" y1="48.17" x2="755.25" y2="24.81" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="751.06" y1="48.17" x2="751.06" y2="24.81" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="742.7" y1="48.17" x2="742.7" y2="24.81" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="734.34" y1="48.17" x2="734.34" y2="24.81" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="746.88" y1="48.17" x2="746.88" y2="24.81" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="738.52" y1="48.17" x2="738.52" y2="24.81" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="730.16" y1="48.17" x2="730.16" y2="24.81" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="725.98" y1="48.17" x2="725.98" y2="24.81" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="684.68" y1="42.68" x2="684.68" y2="29.38" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="680.49" y1="42.68" x2="680.49" y2="29.38" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="676.31" y1="42.68" x2="676.31" y2="29.38" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="685.78" y1="17.39" x2="685.78" y2="1.9" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="681.59" y1="17.39" x2="681.59" y2="1.9" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="677.41" y1="17.39" x2="677.41" y2="1.9" fill="none" stroke="#020608" stroke-miterlimit="10"/><rect x="675.54" y="16.84" width="10.99" height="12.09" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="676.09" y1="16.88" x2="662.9" y2="16.88" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="676.09" y1="21.07" x2="662.9" y2="21.07" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="676.09" y1="25.25" x2="662.9" y2="25.25" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="702.48" y1="20.18" x2="687.09" y2="20.18" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="702.48" y1="24.36" x2="687.09" y2="24.36" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="702.48" y1="28.55" x2="687.09" y2="28.55" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="368.04" y1="553.85" x2="368.04" y2="574.76" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="376.36" y1="553.85" x2="376.36" y2="574.76" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="384.69" y1="553.85" x2="384.69" y2="574.76" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="372.2" y1="553.85" x2="372.2" y2="574.76" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="380.52" y1="553.85" x2="380.52" y2="574.76" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="388.85" y1="553.85" x2="388.85" y2="574.76" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="389.97" y1="552.72" x2="410.88" y2="552.72" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="389.97" y1="544.39" x2="410.88" y2="544.39" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="389.97" y1="536.07" x2="410.88" y2="536.07" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="389.97" y1="548.56" x2="410.88" y2="548.56" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="389.97" y1="540.23" x2="410.88" y2="540.23" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="389.97" y1="531.91" x2="410.88" y2="531.91" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="347.1" y1="552.72" x2="367.18" y2="552.72" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="347.1" y1="544.39" x2="367.18" y2="544.39" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="347.1" y1="536.07" x2="367.18" y2="536.07" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="347.1" y1="548.56" x2="367.18" y2="548.56" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="347.1" y1="540.23" x2="367.18" y2="540.23" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="347.1" y1="531.91" x2="367.18" y2="531.91" fill="none" stroke="#020608" stroke-miterlimit="10"/><rect x="366.63" y="530.23" width="23.09" height="23.09" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="756.76" y1="494.11" x2="702.48" y2="494.11" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="756.76" y1="517.36" x2="702.48" y2="517.36" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="755.66" y1="517.48" x2="755.66" y2="494.11" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="751.48" y1="517.48" x2="751.48" y2="494.11" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="743.11" y1="517.48" x2="743.11" y2="494.11" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="734.75" y1="517.48" x2="734.75" y2="494.11" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="747.29" y1="517.48" x2="747.29" y2="494.11" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="738.93" y1="517.48" x2="738.93" y2="494.11" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="730.57" y1="517.48" x2="730.57" y2="494.11" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="726.39" y1="517.48" x2="726.39" y2="494.11" fill="none" stroke="#020608" stroke-miterlimit="10"/><line x1="291.21" y1="167.45" x2="291.21" y2="125.13" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/><line x1="291.21" y1="189.99" x2="291.21" y2="178.99" fill="none" stroke="#020608" stroke-miterlimit="10" stroke-width="2"/></g></svg>
`;

let _source_svg_buttons = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 23.0.4, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 80 40" enable-background="new 0 0 80 40" xml:space="preserve">
<g id="btn_x5F_13">
	<rect x="-40" y="-20" fill="#5D745A" width="80" height="40"/>
	<g>
		<polygon fill="#FFFFFF" points="-16.4,12.3 -16,4.9 -16.3,4.1 -20,0 -18.4,-2.4 -18.3,-0.3 -17.4,0.6 -11.3,0.3 -11.3,-1.2
			-16.2,-1.4 -15.9,-6.2 -19.4,-8.4 -23.5,-8.1 -24.2,-7.9 -28.2,-3.5 -27.1,-2.3 -23,-6 -21,-5.9 -23.8,-0.9 -24,-0.1 -23.6,5.8
			-29.5,6.2 -29.5,7.9 -22.1,8.3 -20.9,7.2 -20.8,3.6 -18.5,5.6 -18.1,12.3 		"/>
		<path fill="#FFFFFF" d="M-15.6-7.6c-1.8,0.4-3.3-1.1-2.9-2.9c0.2-0.8,0.9-1.5,1.7-1.7c1.8-0.4,3.3,1.1,2.9,2.9
			C-14.1-8.5-14.8-7.8-15.6-7.6z"/>
	</g>
	<rect x="15.7" y="-13.1" fill="#FFFFFF" width="12.2" height="26.2"/>
	<g>

			<rect x="-7.7" y="-0.5" transform="matrix(0.7259 -0.6877 0.6877 0.7259 -0.2665 1.1045)" fill="#FFFFFF" width="18" height="2.8"/>
		<g>
			<polygon fill="#FFFFFF" points="1.9,-5 7.3,-4.8 7.1,0.6 9.5,-1.7 9.6,-7.1 4.2,-7.2 			"/>
		</g>
	</g>
</g>
<g id="btn_x5F_12">
	<rect x="-40" y="-20" fill="#5D745A" width="80" height="40"/>
	<g>
		<polygon fill="#FFFFFF" points="-16.4,12.3 -16,4.9 -16.3,4.1 -20,0 -18.4,-2.4 -18.3,-0.3 -17.4,0.6 -11.3,0.3 -11.3,-1.2
			-16.2,-1.4 -15.9,-6.2 -19.4,-8.4 -23.5,-8.1 -24.2,-7.9 -28.2,-3.5 -27.1,-2.3 -23,-6 -21,-5.9 -23.8,-0.9 -24,-0.1 -23.6,5.8
			-29.5,6.2 -29.5,7.9 -22.1,8.3 -20.9,7.2 -20.8,3.6 -18.5,5.6 -18.1,12.3 		"/>
		<path fill="#FFFFFF" d="M-15.6-7.6c-1.8,0.4-3.3-1.1-2.9-2.9c0.2-0.8,0.9-1.5,1.7-1.7c1.8-0.4,3.3,1.1,2.9,2.9
			C-14.1-8.5-14.8-7.8-15.6-7.6z"/>
	</g>
	<rect x="15.7" y="-13.1" fill="#FFFFFF" width="12.2" height="26.2"/>
	<g>
		<rect x="-7.1" y="-1.4" fill="#FFFFFF" width="16" height="2.8"/>
		<g>
			<polygon fill="#FFFFFF" points="4.4,-3.8 8.2,0 4.4,3.8 7.6,3.8 11.5,0 7.6,-3.8 			"/>
		</g>
	</g>
</g>
<g id="btn_x5F_11">
	<rect x="-40" y="-20" fill="#5D745A" width="80" height="40"/>
	<g>
		<polygon fill="#FFFFFF" points="-16.4,12.3 -16,4.9 -16.3,4.1 -20,0 -18.4,-2.4 -18.3,-0.3 -17.4,0.6 -11.3,0.3 -11.3,-1.2
			-16.2,-1.4 -15.9,-6.2 -19.4,-8.4 -23.5,-8.1 -24.2,-7.9 -28.2,-3.5 -27.1,-2.3 -23,-6 -21,-5.9 -23.8,-0.9 -24,-0.1 -23.6,5.8
			-29.5,6.2 -29.5,7.9 -22.1,8.3 -20.9,7.2 -20.8,3.6 -18.5,5.6 -18.1,12.3 		"/>
		<path fill="#FFFFFF" d="M-15.6-7.6c-1.8,0.4-3.3-1.1-2.9-2.9c0.2-0.8,0.9-1.5,1.7-1.7c1.8-0.4,3.3,1.1,2.9,2.9
			C-14.1-8.5-14.8-7.8-15.6-7.6z"/>
	</g>
	<rect x="15.7" y="-13.1" fill="#FFFFFF" width="12.2" height="26.2"/>
	<g>
		<rect x="-0.1" y="-9" transform="matrix(0.7259 -0.6877 0.6877 0.7259 0.3689 0.853)" fill="#FFFFFF" width="2.8" height="18"/>
		<g>
			<polygon fill="#FFFFFF" points="7.1,0.6 7,6 1.6,5.9 3.8,8.2 9.2,8.4 9.3,2.9 			"/>
		</g>
	</g>
</g>
<g id="btn_x5F_10">
	<rect x="-40" y="-20" fill="#5D745A" width="80" height="40"/>
	<g>
		<polygon fill="#FFFFFF" points="16.4,12.3 16,4.9 16.3,4.1 20,0 18.4,-2.4 18.3,-0.3 17.4,0.6 11.3,0.3 11.3,-1.2 16.2,-1.4
			15.9,-6.2 19.4,-8.4 23.5,-8.1 24.2,-7.9 28.2,-3.5 27.1,-2.3 23,-6 21,-5.9 23.8,-0.9 24,-0.1 23.6,5.8 29.5,6.2 29.5,7.9
			22.1,8.3 20.9,7.2 20.8,3.6 18.5,5.6 18.1,12.3 		"/>
		<path fill="#FFFFFF" d="M15.6-7.6c1.8,0.4,3.3-1.1,2.9-2.9c-0.2-0.8-0.9-1.5-1.7-1.7c-1.8-0.4-3.3,1.1-2.9,2.9
			C14.1-8.5,14.8-7.8,15.6-7.6z"/>
	</g>
	<rect x="-27.9" y="-13.1" fill="#FFFFFF" width="12.2" height="26.2"/>
	<g>

			<rect x="-2.6" y="-8.1" transform="matrix(0.6877 -0.7259 0.7259 0.6877 -1.0348 -0.6325)" fill="#FFFFFF" width="2.8" height="18"/>
		<g>
			<polygon fill="#FFFFFF" points="-1.9,-5 -7.3,-4.8 -7.1,0.6 -9.5,-1.7 -9.6,-7.1 -4.2,-7.2 			"/>
		</g>
	</g>
</g>
<g id="btn_x5F_9">
	<rect x="-40" y="-20" fill="#5D745A" width="80" height="40"/>
	<g>
		<polygon fill="#FFFFFF" points="16.4,12.3 16,4.9 16.3,4.1 20,0 18.4,-2.4 18.3,-0.3 17.4,0.6 11.3,0.3 11.3,-1.2 16.2,-1.4
			15.9,-6.2 19.4,-8.4 23.5,-8.1 24.2,-7.9 28.2,-3.5 27.1,-2.3 23,-6 21,-5.9 23.8,-0.9 24,-0.1 23.6,5.8 29.5,6.2 29.5,7.9
			22.1,8.3 20.9,7.2 20.8,3.6 18.5,5.6 18.1,12.3 		"/>
		<path fill="#FFFFFF" d="M15.6-7.6c1.8,0.4,3.3-1.1,2.9-2.9c-0.2-0.8-0.9-1.5-1.7-1.7c-1.8-0.4-3.3,1.1-2.9,2.9
			C14.1-8.5,14.8-7.8,15.6-7.6z"/>
	</g>
	<rect x="-27.9" y="-13.1" fill="#FFFFFF" width="12.2" height="26.2"/>
	<g>
		<rect x="-8.9" y="-1.4" fill="#FFFFFF" width="16" height="2.8"/>
		<g>
			<polygon fill="#FFFFFF" points="-4.4,-3.8 -8.2,0 -4.4,3.8 -7.6,3.8 -11.5,0 -7.6,-3.8 			"/>
		</g>
	</g>
</g>
<g id="btn_x5F_8">
	<rect x="-40" y="-20" fill="#5D745A" width="80" height="40"/>
	<g>
		<polygon fill="#FFFFFF" points="16.4,12.3 16,4.9 16.3,4.1 20,0 18.4,-2.4 18.3,-0.3 17.4,0.6 11.3,0.3 11.3,-1.2 16.2,-1.4
			15.9,-6.2 19.4,-8.4 23.5,-8.1 24.2,-7.9 28.2,-3.5 27.1,-2.3 23,-6 21,-5.9 23.8,-0.9 24,-0.1 23.6,5.8 29.5,6.2 29.5,7.9
			22.1,8.3 20.9,7.2 20.8,3.6 18.5,5.6 18.1,12.3 		"/>
		<path fill="#FFFFFF" d="M15.6-7.6c1.8,0.4,3.3-1.1,2.9-2.9c-0.2-0.8-0.9-1.5-1.7-1.7c-1.8-0.4-3.3,1.1-2.9,2.9
			C14.1-8.5,14.8-7.8,15.6-7.6z"/>
	</g>
	<rect x="-27.9" y="-13.1" fill="#FFFFFF" width="12.2" height="26.2"/>
	<g>

			<rect x="-10.2" y="-1.4" transform="matrix(0.6877 -0.7259 0.7259 0.6877 -0.3653 -0.9223)" fill="#FFFFFF" width="18" height="2.8"/>
		<g>
			<polygon fill="#FFFFFF" points="-7.1,0.6 -7,6 -1.6,5.9 -3.8,8.2 -9.2,8.4 -9.3,2.9 			"/>
		</g>
	</g>
</g>
<g id="btn_x5F_7">
	<rect x="-40" y="-20" fill="#5D745A" width="80" height="40"/>
	<g>
		<path fill="#FFFFFF" d="M-25.9-1.4h3.9c1.1,0,1.8,0.1,2.3,0.3s0.8,0.5,1.1,1s0.4,1.1,0.4,1.7c0,0.6-0.1,1.1-0.4,1.6
			c-0.3,0.5-0.6,0.8-1,1c0.6,0.2,1,0.6,1.4,1.1c0.3,0.5,0.5,1.1,0.5,1.8c0,0.9-0.2,1.6-0.6,2.2c-0.4,0.6-0.9,1-1.5,1.1
			c-0.4,0.1-1.3,0.1-2.8,0.1h-3.3V-1.4z M-23.9,0.6v2.8h1.3c0.8,0,1.3,0,1.5,0c0.3-0.1,0.6-0.2,0.8-0.4c0.2-0.2,0.3-0.5,0.3-0.9
			c0-0.4-0.1-0.6-0.2-0.9c-0.2-0.2-0.3-0.4-0.6-0.4s-0.9-0.1-1.9-0.1H-23.9z M-23.9,5.4v3.2h1.8c0.8,0,1.3,0,1.6-0.1
			c0.2-0.1,0.4-0.2,0.6-0.5c0.2-0.2,0.2-0.6,0.2-0.9c0-0.4-0.1-0.7-0.2-1s-0.4-0.4-0.7-0.5c-0.3-0.1-0.8-0.1-1.7-0.1H-23.9z"/>
		<path fill="#FFFFFF" d="M-15.9,10.6v-12h2v4.8h2.8c1,0,1.9,0.3,2.5,1C-8.1,5.1-7.8,5.9-7.8,7c0,0.9-0.2,1.7-0.7,2.4
			c-0.5,0.7-1.4,1.1-2.6,1.1H-15.9z M-14,5.4v3.2h2.1c0.5,0,0.9,0,1.2-0.1c0.2-0.1,0.5-0.2,0.6-0.5C-9.9,7.7-9.8,7.4-9.8,7
			c0-1.1-0.7-1.6-2-1.6H-14z M-6.2,10.6v-12h2v12H-6.2z"/>
		<path fill="#FFFFFF" d="M-3.3,10.6l3.4-6.2L-3-1.4h2.3l1.9,3.6l2-3.6h2.3L2.4,4.4l3.4,6.2H3.4L1.2,6.5l-2.2,4.1H-3.3z"/>
		<path fill="#FFFFFF" d="M6.4,4.7c0-1.4,0.2-2.6,0.6-3.5s1-1.6,1.7-2.1s1.5-0.7,2.5-0.7c1.4,0,2.5,0.5,3.4,1.6
			c0.9,1.1,1.3,2.6,1.3,4.6c0,2-0.5,3.6-1.4,4.7c-0.8,1-1.9,1.5-3.3,1.5c-1.4,0-2.5-0.5-3.4-1.5C6.9,8.2,6.4,6.6,6.4,4.7z M8.4,4.6
			C8.4,6,8.7,7,9.2,7.7c0.5,0.7,1.2,1,1.9,1c0.8,0,1.4-0.3,1.9-1C13.6,7,13.9,6,13.9,4.6c0-1.4-0.2-2.4-0.7-3.1c-0.5-0.7-1.2-1-2-1
			c-0.8,0-1.5,0.3-2,1C8.7,2.2,8.4,3.2,8.4,4.6z"/>
		<path fill="#FFFFFF" d="M25,8.6h0.8v4.6h-1.6v-2.6h-6.2v2.6h-1.6V8.6h0.8c0.3-0.8,0.6-1.8,0.7-3c0.2-1.2,0.3-3,0.3-5.3v-1.6H25
			V8.6z M23.1,0.7h-2.9c0,3.5-0.3,6.2-0.8,7.9h3.7V0.7z"/>
	</g>
	<g>
		<path fill="#FFFFFF" d="M-23.6-6.7h-0.3v-1.2c0.9,0,1.3-0.3,1.3-1.2c0-0.3-0.1-0.5-0.3-0.7C-23-9.9-23.2-10-23.5-10
			c-0.5,0-0.9,0.3-1,1l-1.2-0.4c0.3-1.3,1-1.9,2.3-1.9c0.7,0,1.2,0.2,1.6,0.6c0.4,0.4,0.6,0.9,0.6,1.4c0,0.7-0.3,1.3-1,1.8
			c0.8,0.4,1.3,1,1.3,1.9c0,0.7-0.2,1.3-0.6,1.7c-0.4,0.4-1,0.6-1.8,0.6c-0.7,0-1.2-0.1-1.6-0.4s-0.7-0.8-0.9-1.5l1.2-0.5
			c0.1,0.4,0.3,0.7,0.5,0.9c0.2,0.1,0.4,0.2,0.8,0.2c0.4,0,0.6-0.1,0.8-0.3c0.2-0.2,0.3-0.4,0.3-0.8c0-0.3-0.1-0.6-0.3-0.8
			C-22.9-6.6-23.2-6.7-23.6-6.7z"/>
		<path fill="#FFFFFF" d="M-14.2-3.4h-1.4l-0.6-1.7h-2.5l-0.5,1.7h-1.4l2.5-7.7h1.4L-14.2-3.4z M-16.5-6.5l-0.9-2.9l-0.9,2.9H-16.5z
			"/>
		<path fill="#FFFFFF" d="M-12.2-3.4h-1.3v-7.7h5.1v7.7h-1.3v-6.4h-2.5V-3.4z"/>
		<path fill="#FFFFFF" d="M-1.4-3.4h-1.4l-0.6-1.7h-2.5l-0.5,1.7h-1.4l2.5-7.7H-4L-1.4-3.4z M-3.8-6.5l-0.9-2.9l-0.9,2.9H-3.8z"/>
		<path fill="#FFFFFF" d="M3.3-6.3l1.2,0.5C4.3-4.9,4-4.3,3.6-3.9c-0.4,0.4-1,0.6-1.7,0.6c-0.8,0-1.5-0.3-2-1C-0.7-5-1-6-1-7.2
			c0-1.3,0.3-2.3,0.9-3.1c0.5-0.6,1.2-1,2.1-1c0.7,0,1.3,0.2,1.8,0.7C4.1-10.2,4.4-9.7,4.5-9L3.3-8.6C3.2-9.1,3-9.4,2.8-9.6
			C2.5-9.8,2.2-9.9,1.9-9.9c-0.5,0-0.8,0.2-1.1,0.6c-0.3,0.4-0.4,1.1-0.4,2c0,1,0.1,1.7,0.4,2.1s0.7,0.6,1.1,0.6
			c0.3,0,0.6-0.1,0.9-0.4C3-5.3,3.2-5.7,3.3-6.3z"/>
		<path fill="#FFFFFF" d="M5.6-3.4v-7.7h1.3v3h2.5v-3h1.3v7.7H9.4v-3.4H6.9v3.4H5.6z"/>
		<path fill="#FFFFFF" d="M12-3.4v-7.7h1.3v3.1h1.8c0.7,0,1.2,0.2,1.6,0.7c0.4,0.4,0.6,1,0.6,1.7c0,0.6-0.2,1.1-0.5,1.6
			c-0.3,0.5-0.9,0.7-1.7,0.7H12z M13.3-6.8v2h1.3c0.4,0,0.6,0,0.8-0.1c0.2,0,0.3-0.2,0.4-0.3C15.9-5.3,16-5.5,16-5.7
			c0-0.7-0.4-1-1.3-1H13.3z M18.3-3.4v-7.7h1.3v7.7H18.3z"/>
		<path fill="#FFFFFF" d="M20.8-3.4v-7.7H22V-6l2.6-5.1h1.3v7.7h-1.2v-5l-2.6,5H20.8z M24.1-13.2h0.6c0,0.5-0.2,0.9-0.4,1.1
			c-0.2,0.3-0.6,0.4-0.9,0.4s-0.7-0.1-0.9-0.4c-0.2-0.3-0.4-0.6-0.4-1.1h0.6c0,0.5,0.3,0.8,0.8,0.8S24.1-12.7,24.1-13.2z"/>
	</g>
</g>
<g id="btn_x5F_6">
	<rect x="-20" y="-20" fill="#5D745A" width="40" height="40"/>
	<g>
		<rect x="-9" y="-13.1" fill="#FFFFFF" width="17.7" height="26.2"/>
		<g>
			<polygon fill="#FFFFFF" points="1.3,13.4 0.9,6.6 -0.7,5.1 -0.9,8.1 -2.2,9.5 -10.1,9 -10.1,6.7 -4.2,6.4 -4.6,0.7 -4.3,-0.2
				-1.8,-4.8 -3.2,-4.9 -7.3,-1.1 -8.9,-2.6 -4.6,-7.3 -3.8,-7.6 0.4,-7.9 4.1,-5.6 3.9,-0.9 8.7,-0.7 8.7,1.4 2.3,1.7 1.2,0.6
				1.1,-0.7 0.1,0.8 3.7,4.8 4.1,5.7 3.6,13.4 			"/>
			<path fill="#FFFFFF" d="M3.5-7.2c-0.8,0-1.6-0.4-2.1-1c-0.5-0.7-0.7-1.5-0.5-2.3c0.2-0.9,1-1.7,1.9-1.9c0.2-0.1,0.4-0.1,0.7-0.1
				c0.8,0,1.6,0.4,2.1,1s0.7,1.5,0.5,2.3c-0.2,0.9-1,1.7-1.9,1.9C4-7.2,3.7-7.2,3.5-7.2z"/>
			<path fill="#FFFFFF" d="M4.1-7.6c-1.8,0.4-3.3-1.1-2.9-2.9c0.2-0.8,0.9-1.5,1.7-1.7c1.8-0.4,3.3,1.1,2.9,2.9
				C5.6-8.5,4.9-7.8,4.1-7.6z"/>
		</g>
		<g>
			<polygon fill="#5D745A" points="3.3,13.1 3.8,5.8 3.4,4.9 -0.3,0.8 1.4,-1.6 1.5,0.5 2.4,1.4 8.4,1.1 8.4,-0.4 3.6,-0.6
				3.8,-5.4 0.4,-7.5 -3.7,-7.3 -4.4,-7 -8.5,-2.6 -7.3,-1.5 -3.3,-5.2 -1.3,-5.1 -4,-0.1 -4.3,0.8 -3.8,6.6 -9.8,7 -9.8,8.7
				-2.4,9.2 -1.2,8 -1,4.4 1.2,6.4 1.6,13.1 			"/>
			<path fill="#5D745A" d="M4.1-7.6c-1.8,0.4-3.3-1.1-2.9-2.9c0.2-0.8,0.9-1.5,1.7-1.7c1.8-0.4,3.3,1.1,2.9,2.9
				C5.6-8.5,4.9-7.8,4.1-7.6z"/>
		</g>
		<polygon fill="#FFFFFF" points="-12.7,17.3 5,17.3 8.7,13.1 -9,13.1 		"/>
		<polygon fill="#5D745A" points="-1.9,16.5 1.6,13.1 3.3,13.1 0.7,16.5 		"/>
	</g>
</g>
<g id="btn_x5F_5">
	<rect x="-20" y="-20" fill="#D4145A" width="40" height="40"/>
	<g>
		<path fill="#FFFFFF" d="M7.6,13.3c-0.5,0.2-1,0.4-1.7,0.6c-0.3,0.1-0.5,0.1-0.8,0.2c-1.1,0.2-2,0.3-2.8,0.3C0,12.2-3.3,8.7-6,3.7
			C-8.7-1.4-9.9-6-10.4-9.1c0.2-0.6,0.6-1.5,1.4-2.3c0.5-0.6,1.1-1,1.6-1.3c0.2-0.1,0.4-0.2,0.6-0.3c0.6,0.7,1.5,1.8,2.1,3.4
			c0.7,1.6,0.9,3,1,3.9c-0.1,0.1-0.4,0.2-0.5,0.4c-0.1,0.1-0.2,0.2-0.3,0.3c-0.3,0.4-0.4,0.9-0.3,1.5C-4.8-1.4-3,1.7-2.7,2.2
			c0,0,0.9,1.5,2.1,3.1c0,0,0.7,0.9,2,1.7c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.1,0,0.1,0c0.1,0,0.2,0,0.3,0c0.4,0,0.7-0.2,0.9-0.3
			c0.8,0.5,2,1.4,3,2.9C6.9,11.1,7.4,12.4,7.6,13.3z"/>
		<path fill="#FFFFFF" d="M10.4,11.2c-0.1,0.2-0.2,0.4-0.6,0.8c-0.8,0.7-1.6,1-1.6,1s-0.7-2.1-1.6-3.5c-1.1-1.5-3-2.9-3-2.9
			s0.4-0.3,0.7-0.5C5.3,5.5,6.5,5.7,7,5.8c1.1,0.9,1.9,1.8,2.4,2.4c0.1,0.2,0.7,0.9,1,1.9C10.5,10.6,10.5,10.9,10.4,11.2z"/>
		<path fill="#FFFFFF" d="M-0.7-8.9c0,0.6-0.1,0.9-0.2,1c-0.2,0.4-0.4,0.6-0.8,1c-0.3,0.3-0.6,0.5-1,0.6c-0.2,0.1-0.6,0.2-0.6,0.2
			s-0.3-2.4-1-3.9c-0.7-1.5-2.1-3.4-2.1-3.4s0.7-0.6,1.5-0.8c0.7-0.2,1.3-0.1,1.6-0.1c0.5,0.5,1.6,1.7,2.2,3.3
			C-0.9-10.6-0.6-9.8-0.7-8.9z"/>
	</g>
</g>
<g id="btn_x5F_4">
	<rect x="-20" y="-20" fill="#D4145A" width="40" height="40"/>
	<path fill="#FFFFFF" d="M0.6-10.5V-12l0.9,0c0.5,0,0.9-0.4,0.9-0.9c0-0.5-0.4-0.9-0.9-0.9H0.6v-0.5h-2.9v0.5H-3l-4.9,3.4v2H-7v-1.3
		l4.1-2.2l0.6,0v1.4C-4.1-10-5.4-8.3-5.4-6.3v20.6h9.2V-6.3C3.8-8.3,2.5-10,0.6-10.5z"/>
</g>
<g id="btn_x5F_3">
	<rect x="-20" y="-20" fill="#D4145A" width="40" height="40"/>
	<g>
		<path fill="#FFFFFF" d="M-9.7,4.9L-9.7,4.9c-0.5,0-1-0.4-1-1v-16.3c0-0.5,0.4-1,1-1l0,0c0.5,0,1,0.4,1,1V4
			C-8.8,4.5-9.2,4.9-9.7,4.9z"/>
		<path fill="#FFFFFF" d="M-11.3,8.7h-1.9v-21c0-0.5,0.4-1,1-1l0,0c0.5,0,1,0.4,1,1V8.7z"/>
		<path fill="#FFFFFF" d="M-7.2,4.9L-7.2,4.9c-0.5,0-1-0.4-1-1v-16.3c0-0.5,0.4-1,1-1l0,0c0.5,0,1,0.4,1,1V4
			C-6.2,4.5-6.6,4.9-7.2,4.9z"/>
		<path fill="#FFFFFF" d="M-4.6,4.9L-4.6,4.9c-0.5,0-1-0.4-1-1v-16.3c0-0.5,0.4-1,1-1l0,0c0.5,0,1,0.4,1,1V4
			C-3.6,4.5-4.1,4.9-4.6,4.9z"/>
		<path fill="#FFFFFF" d="M-2,4.9L-2,4.9c-0.5,0-1-0.4-1-1v-16.3c0-0.5,0.4-1,1-1l0,0c0.5,0,1,0.4,1,1V4C-1.1,4.5-1.5,4.9-2,4.9z"/>
		<path fill="#FFFFFF" d="M-0.4,5.9L-0.4,5.9v-20.2l0,0c0.7,0,1.3,0.6,1.3,1.3V4.6C0.8,5.3,0.3,5.9-0.4,5.9z"/>
		<path fill="#FFFFFF" d="M-13.9,5.9h-1.3v-18.9c0-0.7,0.6-1.3,1.3-1.3l0,0V5.9z"/>
		<rect x="-13.5" y="8.9" fill="#FFFFFF" width="2.4" height="0.7"/>
		<polygon fill="#FFFFFF" points="-11.8,14.3 -12.8,14.3 -13.3,9.7 -11.3,9.7 		"/>
		<path fill="#FFFFFF" d="M10.9-9.1c-0.2,0-0.4,0-0.6,0c-0.2,0-0.4,0-0.6,0c-2.2,0.3-4,2-4.3,4.3h-5.6v1.3h5.6c0.3,2.2,2,4,4.3,4.3
			c0.2,0,0.4,0,0.6,0c0.2,0,0.4,0,0.6,0c2.4-0.3,4.3-2.4,4.3-4.9C15.2-6.7,13.3-8.8,10.9-9.1z M14-4.8h-3.1v-3.1
			C12.5-7.7,13.7-6.4,14-4.8z M9.6-7.9v3.1H6.5C6.8-6.4,8-7.7,9.6-7.9z M6.5-3.5h3.1v3.1C8-0.7,6.8-1.9,6.5-3.5z M10.9-0.4v-3.1H14
			C13.7-1.9,12.5-0.7,10.9-0.4z"/>
	</g>
</g>
<g id="btn_x5F_2">
	<rect x="-20" y="-20" fill="#D4145A" width="40" height="40"/>
	<g>
		<rect x="-13.1" y="-3.8" fill="#FFFFFF" width="26.2" height="7.7"/>
		<rect x="-3.8" y="-13.1" fill="#FFFFFF" width="7.7" height="26.2"/>
	</g>
</g>
<g id="btn_x5F_1">
	<rect x="-20" y="-20" fill="#D4145A" width="40" height="40"/>
	<rect x="-13.1" y="-13.1" fill="#FFFFFF" width="26.2" height="26.2"/>
	<circle fill="#D4145A" cx="0" cy="0" r="11.8"/>
	<circle fill="#FFFFFF" cx="0" cy="0" r="5"/>
</g>
</svg>`;

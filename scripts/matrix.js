const fs = require("fs");

const WIDTH = 1200;
const HEIGHT = 400;

const terminal = `
$ booting...

Welcome to......
techfatcat's profile......
loading contributions.......

Entering contribution view...

[████████████████████] 100%
`;

let svg = `<?xml version="1.0" encoding="UTF-8"?>

<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 ${WIDTH} ${HEIGHT}"
width="${WIDTH}"
height="${HEIGHT}">

<style>

@keyframes showTerminal{
0%,40%{opacity:1;}
45%,95%{opacity:0;}
100%{opacity:1;}
}

@keyframes showHeatmap{
0%,40%{opacity:0;}
45%,95%{opacity:1;}
100%{opacity:0;}
}

@keyframes blink{
50%{opacity:0;}
}

text{
font-family:Consolas,monospace;
}

.terminal{
animation:showTerminal 8s linear infinite;
}

.heatmap{
animation:showHeatmap 8s linear infinite;
}

.cursor{
animation:blink .8s infinite;
}

</style>

<rect width="100%" height="100%" fill="#050505"/>

<g class="terminal">

<rect
x="80"
y="40"
width="1040"
height="320"
rx="10"
fill="#111"
stroke="#00ff41"
stroke-width="2"/>

<text
x="120"
y="90"
fill="#00ff41"
font-size="24"
xml:space="preserve">

<tspan x="120" dy="0">$ booting...</tspan>

<tspan x="120" dy="40"></tspan>

<tspan x="120" dy="40">Welcome to......</tspan>
<tspan x="120" dy="40">techfatcat's profile......</tspan>
<tspan x="120" dy="40">loading contributions.......</tspan>

<tspan x="120" dy="40"></tspan>

<tspan x="120" dy="40">Entering contribution view...</tspan>

<tspan x="120" dy="50">[████████████████████] 100%</tspan>

<tspan
class="cursor"
x="120"
dy="40">█</tspan>

</text>

</g>

<g class="heatmap">

<rect
x="180"
y="70"
width="840"
height="260"
rx="10"
fill="#0d1117"
stroke="#30363d"/>

`;

const rows = 7;
const cols = 53;

const colors = [
"#161b22",
"#0e4429",
"#006d32",
"#26a641",
"#39d353"
];

for(let r=0;r<rows;r++){

    for(let c=0;c<cols;c++){

        const x = 205 + c*15;
        const y = 95 + r*30;

        const color = colors[Math.floor(Math.random()*colors.length)];

        svg += `
<rect
x="${x}"
y="${y}"
width="11"
height="11"
rx="2"
fill="${color}"/>`;

    }

}

svg += `

</g>

</svg>
`;

fs.mkdirSync("output",{recursive:true});

fs.writeFileSync("output/matrix.svg",svg);

console.log("Terminal Heatmap Generated");

const fs = require("fs");

const svg = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="1200"
    height="400"
    viewBox="0 0 1200 400">

    <rect
        width="100%"
        height="100%"
        fill="#000000"/>

    <text
        x="50%"
        y="50%"
        fill="#00ff66"
        font-size="48"
        font-family="monospace"
        dominant-baseline="middle"
        text-anchor="middle">

        Hello Matrix
    </text>

</svg>
`;

fs.mkdirSync("output", { recursive: true });

fs.writeFileSync("output/matrix.svg", svg);

console.log("Matrix SVG generated!");

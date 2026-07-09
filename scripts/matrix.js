const fs = require("fs");

const WIDTH = 1200;
const HEIGHT = 400;

const COLS = 70;
const ROWS = 28;

const chars =
  "アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>";

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

let text = "";

for (let c = 0; c < COLS; c++) {
  const x = c * 17 + 10;

  const duration = (Math.random() * 6 + 6).toFixed(2);

  const delay = (-Math.random() * duration).toFixed(2);

  text += `<g>
      <animateTransform
          attributeName="transform"
          type="translate"
          from="0,-420"
          to="0,420"
          dur="${duration}s"
          begin="${delay}s"
          repeatCount="indefinite"/>\n`;

  for (let r = 0; r < ROWS; r++) {
    const y = r * 18;

    const opacity = Math.max(0.08, 1 - r / ROWS);

    text += `
      <text
          x="${x}"
          y="${y}"
          fill="#00ff66"
          opacity="${opacity}"
          font-size="16"
          font-family="monospace"
          filter="url(#glow)">
          ${randomChar()}
      </text>`;
  }

  text += `</g>`;
}

const svg = `
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 ${WIDTH} ${HEIGHT}"
width="${WIDTH}"
height="${HEIGHT}">

<defs>

<filter id="glow">

<feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>

<feMerge>

<feMergeNode in="coloredBlur"/>

<feMergeNode in="SourceGraphic"/>

</feMerge>

</filter>

</defs>

<rect
width="100%"
height="100%"
fill="#000000"/>

${text}

<rect
width="100%"
height="100%"
fill="url(#fade)"
opacity=".08"/>

</svg>
`;

fs.mkdirSync("output", { recursive: true });

fs.writeFileSync("output/matrix.svg", svg);

console.log("Matrix Rain Generated");

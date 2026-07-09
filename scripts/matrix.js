const fs = require("fs");

const WIDTH = 1200;
const HEIGHT = 400;

const chars =
  "アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>";

const COLS = 70;
const FONT_SIZE = 16;
const COL_WIDTH = WIDTH / COLS;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function pick() {
  return chars[Math.floor(Math.random() * chars.length)];
}

let svg = `<?xml version="1.0" encoding="UTF-8"?>

<svg
xmlns="http://www.w3.org/2000/svg"
width="${WIDTH}"
height="${HEIGHT}"
viewBox="0 0 ${WIDTH} ${HEIGHT}">

<defs>

<filter id="glow">

<feGaussianBlur stdDeviation="2" result="blur"/>

<feMerge>
<feMergeNode in="blur"/>
<feMergeNode in="SourceGraphic"/>
</feMerge>

</filter>

</defs>

<rect width="100%" height="100%" fill="black"/>
`;

for (let c = 0; c < COLS; c++) {
  const x = c * COL_WIDTH + 5;

  const duration = rand(5, 12).toFixed(2);

  const delay = (-rand(0, duration)).toFixed(2);

  svg += `
<g>

<animateTransform
attributeName="transform"
type="translate"
values="0,-450;0,450"
dur="${duration}s"
begin="${delay}s"
repeatCount="indefinite"/>

`;

  for (let r = 0; r < 35; r++) {
    const y = r * FONT_SIZE + 10;

    let color = "#00aa33";

    if (r === 0)
      color = "#ffffff";
    else if (r < 4)
      color = "#88ff88";
    else if (r < 10)
      color = "#00ff66";

    svg += `
<text
x="${x}"
y="${y}"
font-size="${FONT_SIZE}"
font-family="monospace"
fill="${color}"
filter="url(#glow)">
${pick()}
</text>
`;
  }

  svg += `
</g>
`;
}

svg += `
</svg>
`;

fs.mkdirSync("output", { recursive: true });

fs.writeFileSync("output/matrix.svg", svg);

console.log("Matrix Rain Generated");

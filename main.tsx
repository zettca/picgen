/** @jsx h */
import { h } from "https://deno.land/x/htm@0.2.0/mod.ts";

type Params = {
  height?: number;
  width?: number;
};
const generateSvg = (params: Params) => {
  const {
    width = 200,
    height = 200,
    color: textColor = "#333",
    text: textParam,
    font = "sans-serif",
    bg: bgColor = "#ddd",
  } = params || {};

  const text = textParam ?? `${width} x ${height}`
  const textStyle = "font-size:1.2rem; dominant-baseline:central;";
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={[0, 0, width, height].join(" ")}
    >
      <rect width={width} height={height} fill={bgColor} />
      <text fill={textColor} x={width/2} y={height/2} font-family={font} text-anchor="middle" style={textStyle}>
        {text}
      </text>
    </svg>
  );
};

Deno.serve((req) => {
  const { searchParams } = new URL(req.url);
  const params = Object.fromEntries(searchParams.entries());

  const body = generateSvg(params);
  const headers = {
    "Content-Type": "image/svg+xml"
  };

  return new Response(body, { headers });
});

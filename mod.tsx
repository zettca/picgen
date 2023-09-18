/** @jsx h */
import { h, renderToString } from "https://deno.land/x/jsx@v0.1.5/mod.ts";

/** Parameters to configure SVG generation */
export type GenerateParams = {
  /** width of the image */
  width?: number;
  /** height of the image */
  height?: number;
  /** color of the text */
  color?: string;
  /** image text content. defaults to {width}x{height} */
  text?: string;
  /** font family of the text content */
  font?: string;
  /** background color */
  bgcolor?: string;
};

/** Generates an SVG image for the passed params */
export const generate = async (params: GenerateParams = {}) => {
  const width = params.width || 200;
  const height = params.height || width;
  const text = params.text ?? `${width} x ${height}`;

  const font = params.font ?? "sans-serif";
  const color = params.color ?? "currentColor";
  const bgColor = params.bgcolor ?? "currentColor";
  const bgFilter = params.bgcolor ? undefined : "invert(0.8)";

  return await renderToString(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={[0, 0, width, height].join(" ")}
      style="color-scheme: light dark"
    >
      <rect width={width} height={height} fill={bgColor} filter={bgFilter} />
      <text
        fill={color}
        x={width / 2}
        y={height / 2}
        font-family={font}
        text-anchor="middle"
        font-size="1.2rem"
        dominant-baseline="central"
      >
        {text}
      </text>
    </svg>,
  );
};

/** Generates an SVG image in data URL format */
export const generateUrl = async (params: GenerateParams = {}) => {
  const svgString = await generate(params);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

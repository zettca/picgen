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

const escapeXml = (str: string) =>
  str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

/** Generates an SVG image for the passed params */
export const generate = async (params: GenerateParams = {}) => {
  const width = params.width || 200;
  const height = params.height || width;
  const text = params.text ?? `${width} x ${height}`;

  const font = params.font ?? "sans-serif";
  const color = params.color ?? "currentColor";
  const bgColor = params.bgcolor ?? "currentColor";
  const bgFilter = params.bgcolor ? "" : `filter="invert(0.8)"`;

  // all values may come from untrusted query params
  const [w, h, t, f, c, bg] = [width, height, text, font, color, bgColor].map(
    (value) => escapeXml(String(value)),
  );

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="color-scheme: light dark">
  <rect width="${w}" height="${h}" fill="${bg}" ${bgFilter} />
  <text fill="${c}" x="${Number(width) / 2}" y="${Number(height) / 2}" font-family="${f}" text-anchor="middle" font-size="1.2rem" dominant-baseline="central">${t}</text>
</svg>`.trim();
};

/** Generates an SVG image in data URL format */
export const generateUrl = async (params: GenerateParams = {}) => {
  const svgString = await generate(params);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * The tab favicon. Outline of the same triangle path as DeltaMark, on a
 * transparent background so it's just the mark in the tab strip rather than
 * a dark tile. Stroke is far heavier than DeltaMark's own 1.6 -- at 24-unit
 * viewBox that weight disappears once a browser downsamples this to a
 * physical 16px tab icon, so it has to be bold well past what looks right
 * at the sizes DeltaMark actually renders at elsewhere on the page.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3.4 21.2 20.6H2.8L12 3.4Z"
            stroke="#a8c5b4"
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * The tab favicon. Same triangle path as DeltaMarkSolid, same two brand
 * colours as everywhere else on the page -- this file is the one place that
 * mark gets redrawn instead of reused, since favicon generation runs through
 * Satori rather than plain React.
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
          background: "#090a0f",
        }}
      >
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
          <path d="M12 3.4 21.2 20.6H2.8L12 3.4Z" fill="#a8c5b4" />
        </svg>
      </div>
    ),
    { ...size },
  );
}

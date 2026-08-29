import { ImageResponse } from "next/og";

// The site served no favicon at all — /favicon.ico, /icon.png and /apple-icon.png
// all 404'd, so every tab and bookmark showed the browser's blank default.
export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
                    background: "#050505",
                    color: "#00FF94",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    fontFamily: "monospace",
                }}
            >
                S
            </div>
        ),
        size
    );
}

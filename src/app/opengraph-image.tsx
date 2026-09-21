import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const alt = `${site.name} — Mechanical Engineer. Technical Lead. Builder of precise physical systems.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, drawn rather than photographed: eggshell field, a datum scale
 * down the left edge, the name set large, and a single orange registration
 * mark. No dependency on an image asset that does not exist yet.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f4f1eb",
          color: "#151515",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {/* Datum rail */}
        <div
          style={{
            width: 88,
            height: "100%",
            borderRight: "1px solid rgba(21,21,21,0.18)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 0",
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                width: i % 2 === 0 ? 22 : 12,
                height: 1,
                backgroundColor: "#a9a69d",
                alignSelf: "flex-end",
              }}
            />
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "62px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 34, height: 3, backgroundColor: "#e24e12" }} />
            <div
              style={{
                fontSize: 19,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#5d5d56",
              }}
            >
              Mechanical Engineer · Boston, MA
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 104,
                lineHeight: 1,
                letterSpacing: -4,
                fontWeight: 600,
              }}
            >
              {site.name}
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 33,
                lineHeight: 1.28,
                letterSpacing: -0.8,
                color: "#3b3b38",
                maxWidth: 840,
              }}
            >
              Technical lead and builder of precise physical systems — motion,
              measurement, testing, iteration.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              borderTop: "1px solid rgba(21,21,21,0.18)",
              paddingTop: 22,
              fontSize: 19,
              letterSpacing: 3.5,
              textTransform: "uppercase",
              color: "#5d5d56",
              gap: 26,
            }}
          >
            <span>R&amp;D</span>
            <span style={{ color: "#a9a69d" }}>/</span>
            <span>Product Development</span>
            <span style={{ color: "#a9a69d" }}>/</span>
            <span>Motion Systems</span>
            <span style={{ color: "#a9a69d" }}>/</span>
            <span>Validation</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

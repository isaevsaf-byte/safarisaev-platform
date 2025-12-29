"use client";

export function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(115, 115, 115, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(115, 115, 115, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  );
}


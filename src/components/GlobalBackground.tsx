/**
 * Site-wide blueprint backdrop — one shared blue grid behind every section,
 * so Hero, About, Projects, Videos, Services, Testimonials and Contact all
 * read as the same page.
 */
export default function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 -z-50 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px),
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(135deg, #0a33e0 0%, #0b3bf0 100%)
        `,
        backgroundSize: "80px 80px, 80px 80px, 16px 16px, 16px 16px, 100% 100%",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(5,13,43,0.35), transparent 45%), radial-gradient(circle at 0% 100%, rgba(5,13,43,0.3), transparent 45%)",
        }}
      />
    </div>
  );
}

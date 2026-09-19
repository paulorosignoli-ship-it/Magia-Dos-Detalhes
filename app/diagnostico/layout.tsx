export default function DiagnosticoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen star-field">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 py-10 sm:py-16">{children}</div>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { DiagnosticProvider } from "@/context/DiagnosticContext";

export const metadata: Metadata = {
  title: "Raio-X da Experiência do Cliente · Magia dos Detalhes",
  description:
    "Descubra onde sua empresa pode estar perdendo clareza, consistência, encantamento ou oportunidades de recompra.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body><DiagnosticProvider>{children}</DiagnosticProvider></body>
    </html>
  );
}

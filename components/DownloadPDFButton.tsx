"use client";
import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DiagnosticPDF } from "./DiagnosticPDF";
import type { DiagnosticResult, ContextAnswers, Lead, AnswerRecord } from "@/lib/types";
export default function DownloadPDFButton({ result, context, lead, answers }: { result: DiagnosticResult; context: ContextAnswers; lead?: Lead; answers: AnswerRecord[] }) {
  const [mounted,setMounted]=useState(false);
  useEffect(()=>setMounted(true),[]);
  if (!mounted) return <button disabled className="inline-flex items-center gap-2 rounded-full border border-gold/40 text-gold px-5 py-3 text-sm opacity-60">Preparando PDF…</button>;
  const safeName=(lead?.name??"diagnostico").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-").toLowerCase();
  return <PDFDownloadLink document={<DiagnosticPDF result={result} context={context} lead={lead} answers={answers}/>} fileName={`raio-x-experiencia-cliente-${safeName}.pdf`} className="inline-flex items-center gap-2 rounded-full bg-gold text-navy-deep font-semibold px-5 py-3 text-sm tracking-wide hover:bg-cream transition">
    {({loading})=>loading?"Gerando PDF…":<><span aria-hidden>↓</span> Baixar resultado em PDF</>}
  </PDFDownloadLink>;
}

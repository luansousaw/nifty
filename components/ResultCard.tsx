"use client";

import { useState } from "react";

export function ResultCard({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4"><h3 className="font-extrabold">{title}</h3><span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700">Pronto</span></div>
      <div className="aspect-[4/3] bg-zinc-100"><img src={url} alt={`Criativo ${title} da Aracar Veículos`} className="h-full w-full object-contain" /></div>
      <div className="grid grid-cols-3 gap-2 p-4 text-xs font-bold">
        <button onClick={copy} className="rounded-xl border border-black/10 px-2 py-3 hover:bg-zinc-50">{copied ? "Copiada!" : "Copiar URL"}</button>
        <a href={url} target="_blank" rel="noreferrer" className="rounded-xl border border-black/10 px-2 py-3 text-center hover:bg-zinc-50">Abrir ↗</a>
        <a href={`/api/download?url=${encodeURIComponent(url)}`} className="rounded-xl bg-black px-2 py-3 text-center text-white hover:bg-aracar-red">Baixar ↓</a>
      </div>
    </article>
  );
}

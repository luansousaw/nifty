"use client";

import { FormEvent, useState } from "react";
import { ResultCard } from "./ResultCard";
import type { GenerateResult, VehicleInput } from "@/types";

const empty: VehicleInput = { marcaModelo: "", ano: "", cilindrada: "", combustivel: "", valor: "" };
const fields = [
  ["marcaModelo", "Marca e modelo", "Volkswagen New Beetle"], ["ano", "Ano", "2009"],
  ["cilindrada", "Cilindrada", "2.0"], ["combustivel", "Combustível", "Gasolina"], ["valor", "Valor", "54900"],
] as const;

export function VehicleForm() {
  const [form, setForm] = useState(empty);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Falha ao gerar os criativos.");
      setResult(data);
      setTimeout(() => document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) { setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado."); }
    finally { setLoading(false); }
  }
  function clear() { setForm(empty); setResult(null); setError(""); }

  return (
    <div className="mx-auto -mt-6 max-w-7xl px-5 sm:-mt-8 sm:px-8">
      <section className="rounded-3xl bg-white p-6 shadow-panel sm:p-9">
        <div className="flex flex-col justify-between gap-3 border-b border-black/10 pb-6 sm:flex-row sm:items-end">
          <div><p className="mb-2 text-xs font-extrabold uppercase tracking-[.18em] text-aracar-red">Novo criativo</p><h2 className="text-2xl font-black tracking-tight">Dados do veículo</h2></div>
          <p className="text-xs text-black/45">Todos os campos são obrigatórios</p>
        </div>
        <form onSubmit={submit} className="mt-7">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {fields.map(([name, label, placeholder]) => <label key={name} className={name === "marcaModelo" ? "lg:col-span-2" : ""}><span className="mb-2 block text-xs font-bold">{label}</span><input required maxLength={100} inputMode={name === "ano" || name === "valor" ? "numeric" : "text"} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder} className="h-12 w-full rounded-xl border border-black/15 bg-zinc-50 px-4 text-sm outline-none transition placeholder:text-black/25 focus:border-aracar-red focus:bg-white focus:ring-4 focus:ring-red-50" /></label>)}
          </div>
          {error && <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{error}</div>}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button disabled={loading} className="h-12 rounded-xl bg-aracar-red px-7 text-sm font-extrabold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-wait disabled:opacity-60">{loading ? "Organizando dados…" : "Gerar Criativos →"}</button>
            <button type="button" onClick={clear} disabled={loading} className="h-12 rounded-xl border border-black/10 px-6 text-sm font-bold hover:bg-zinc-50">Limpar</button>
          </div>
        </form>
      </section>
      {result && <section id="resultados" className="py-14 sm:py-20">
        <div className="mb-7"><p className="mb-2 text-xs font-extrabold uppercase tracking-[.18em] text-aracar-red">Geração concluída</p><h2 className="text-3xl font-black tracking-tight">Seus criativos</h2></div>
        <div className="mb-7 grid overflow-hidden rounded-2xl bg-black text-white sm:grid-cols-2">
          {[['CARRO', result.carro], ['VALORCARRO', result.valorCarro]].map(([label,value]) => <div key={label} className="border-white/10 p-5 first:border-b sm:first:border-b-0 sm:first:border-r"><span className="text-[10px] font-bold tracking-[.2em] text-white/40">{label}</span><p className="mt-1 font-bold">{value}</p></div>)}
        </div>
        <div className="grid gap-6 lg:grid-cols-2"><ResultCard title="Modelo 01" url={result.model1Url}/><ResultCard title="Modelo 02" url={result.model2Url}/></div>
      </section>}
    </div>
  );
}

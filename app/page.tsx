import { VehicleForm } from "@/components/VehicleForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="grid-noise bg-aracar-dark text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aracar-red text-lg font-black italic">A</div>
            <div><p className="text-base font-extrabold tracking-tight">ARACAR</p><p className="text-[10px] font-semibold tracking-[.22em] text-white/50">VEÍCULOS</p></div>
          </div>
          <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/70">Nifty Studio</span>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-9 sm:px-8 sm:pb-20 sm:pt-14">
          <div className="mb-5 h-1 w-12 rounded-full bg-aracar-red" />
          <h1 className="max-w-3xl text-4xl font-black tracking-[-.04em] sm:text-6xl">Criativos que colocam<br/><span className="text-aracar-red">seu estoque em movimento.</span></h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-base">Informe os dados do veículo. Nós organizamos o conteúdo e entregamos duas peças prontas para compartilhar.</p>
        </div>
      </header>
      <VehicleForm />
      <footer className="mx-auto flex max-w-7xl justify-between px-5 py-8 text-xs text-black/40 sm:px-8"><span>Aracar Veículos</span><span>Criativos oficiais • Nifty Images</span></footer>
    </main>
  );
}

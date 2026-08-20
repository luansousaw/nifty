import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cleanText, normalizePrice } from "@/lib/format";
import { buildNiftyUrls } from "@/lib/nifty";
import { organizeVehicle } from "@/lib/openai";

export const runtime = "nodejs";

const schema = z.object({
  marcaModelo: z.string().trim().min(2).max(100),
  ano: z.string().trim().regex(/^\d{4}$/),
  cilindrada: z.string().trim().min(1).max(20),
  combustivel: z.string().trim().min(2).max(30),
  valor: z.string().trim().min(1).max(30),
});
const hits = new Map<string, { count: number; reset: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const entry = hits.get(ip);
  if (entry && entry.reset > now && entry.count >= 10)
    return NextResponse.json({ error: "Muitas tentativas. Aguarde um minuto." }, { status: 429 });
  hits.set(ip, !entry || entry.reset <= now ? { count: 1, reset: now + 60_000 } : { ...entry, count: entry.count + 1 });

  try {
    const raw = schema.parse(await request.json());
    const input = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, cleanText(value)])) as typeof raw;
    input.valor = normalizePrice(input.valor);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    let fields;
    try { fields = await organizeVehicle(input, controller.signal); } finally { clearTimeout(timeout); }
    if (!fields.carro.includes(input.ano)) throw new Error("O texto gerado não contém o ano informado");
    return NextResponse.json({ ...fields, ...buildNiftyUrls(fields.carro, fields.valorCarro) });
  } catch (error) {
    const invalid = error instanceof z.ZodError;
    const message = invalid ? "Revise os campos informados." : error instanceof Error && error.name === "AbortError" ? "A geração demorou demais. Tente novamente." : "Não foi possível gerar os criativos. Tente novamente.";
    console.error("generate_error", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: message }, { status: invalid ? 400 : 502 });
  }
}

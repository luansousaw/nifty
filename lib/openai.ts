import { z } from "zod";
import type { VehicleInput } from "@/types";

const responseSchema = z.object({
  carro: z.string().min(3).max(80),
  valorCarro: z.string().regex(/^R\$\s?\d{1,3}(?:\.\d{3})*$/),
});

export async function organizeVehicle(input: VehicleInput, signal: AbortSignal) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY não configurada");

  const prompt = `Você é um organizador de dados para templates automotivos da Nifty Images.
Retorne SOMENTE JSON válido com as chaves "carro" e "valorCarro".
Regras: carro técnico, objetivo e compacto; deve conter obrigatoriamente modelo e ano; idealmente 25–30 caracteres e no máximo 7 palavras. Prioridade: modelo, ano, marca, motorização, combustível, versão curta. Não use adjetivos, emojis, frases comerciais ou texto promocional. Se faltar espaço, remova versão longa, reduza combustível e priorize motor curto, mas nunca remova modelo e ano. Não invente dados. Gasolina pode virar Gas.
valorCarro deve incluir R$, não ter decimais e usar ponto como separador de milhar brasileiro.
Entrada: ${JSON.stringify(input)}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Você formata dados automotivos com precisão e responde apenas JSON." },
        { role: "user", content: prompt },
      ],
    }),
    signal,
  });

  if (!response.ok) throw new Error(`OpenAI respondeu com status ${response.status}`);
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("Resposta vazia da OpenAI");
  try {
    return responseSchema.parse(JSON.parse(content));
  } catch {
    throw new Error("A OpenAI retornou dados em formato inválido");
  }
}

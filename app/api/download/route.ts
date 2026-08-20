import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const value = request.nextUrl.searchParams.get("url");
  if (!value) return NextResponse.json({ error: "URL ausente" }, { status: 400 });
  let url: URL;
  try { url = new URL(value); } catch { return NextResponse.json({ error: "URL inválida" }, { status: 400 }); }
  if (url.protocol !== "https:" || url.hostname !== "img1.niftyimages.com" || !url.pathname.startsWith("/-uvh/"))
    return NextResponse.json({ error: "Origem não permitida" }, { status: 403 });
  const upstream = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!upstream.ok || !upstream.body) return NextResponse.json({ error: "Imagem indisponível" }, { status: 502 });
  return new NextResponse(upstream.body, { headers: { "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg", "Content-Disposition": "attachment; filename=aracar-criativo.jpg", "Cache-Control": "private, max-age=300" } });
}

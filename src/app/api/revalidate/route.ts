import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * On-demand revalidation endpoint untuk webhook Strapi.
 *
 * POST /api/revalidate?secret=<REVALIDATE_SECRET>
 * Body (opsional):
 *   {
 *     "path": "/id",
 *     "paths": ["/id", "/en"],
 *     "type": "page"        // atau "layout" untuk revalidate seluruh subtree
 *   }
 *
 * Bila body kosong, default revalidate ke root locale ("/id" dan "/en").
 */
export async function POST(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  const provided =
    req.nextUrl.searchParams.get("secret") ??
    req.headers.get("x-revalidate-secret");

  if (!expected || provided !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    path?: string;
    paths?: string[];
    type?: "page" | "layout";
  } = {};
  try {
    body = (await req.json()) as typeof body;
  } catch {
    body = {};
  }

  const paths = [
    ...(body.path ? [body.path] : []),
    ...(Array.isArray(body.paths) ? body.paths : []),
  ];

  if (paths.length === 0) {
    paths.push("/id", "/en");
  }

  const type = body.type;
  for (const p of paths) {
    if (type) revalidatePath(p, type);
    else revalidatePath(p);
  }

  return NextResponse.json({
    ok: true,
    revalidated: { paths, type: type ?? "page" },
    timestamp: Date.now(),
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST /api/revalidate?secret=... untuk memicu revalidation",
  });
}

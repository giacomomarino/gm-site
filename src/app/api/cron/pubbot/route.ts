import { NextRequest, NextResponse } from "next/server";
import existingPublications from "@/app/publications.json";
import { commitFileIfChanged } from "@/lib/github";
import {
  fetchPubmedPublications,
  mergePublications,
  serializePublications,
  type PublicationsData,
} from "@/lib/pubbot";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PUBLICATIONS_PATH = "src/app/publications.json";

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const fetched = await fetchPubmedPublications();
    const merged = mergePublications(
      existingPublications as PublicationsData,
      fetched
    );
    const serialized = serializePublications(merged);
    const commit = await commitFileIfChanged(
      PUBLICATIONS_PATH,
      serialized,
      "chore(pubbot): update publications from PubMed"
    );

    return NextResponse.json({
      ok: true,
      fetched: fetched.publications.length,
      total: merged.publications.length,
      commit,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("pubbot cron failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

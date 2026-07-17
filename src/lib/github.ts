const GITHUB_API = "https://api.github.com";

function githubHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function commitFileIfChanged(
  path: string,
  content: string,
  message: string
): Promise<{ committed: boolean; reason: string }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO ?? "giacomomarino/gm-site";

  if (!token) {
    return { committed: false, reason: "GITHUB_TOKEN is not configured" };
  }

  const [owner, repoName] = repo.split("/");
  if (!owner || !repoName) {
    return { committed: false, reason: "GITHUB_REPO must be in owner/repo format" };
  }

  const getRes = await fetch(
    `${GITHUB_API}/repos/${owner}/${repoName}/contents/${path}`,
    { headers: githubHeaders(token) }
  );

  if (!getRes.ok) {
    throw new Error(`Failed to read ${path} from GitHub: ${getRes.status}`);
  }

  const existing = await getRes.json();
  const existingContent = Buffer.from(existing.content, "base64").toString("utf-8");

  if (existingContent === content) {
    return { committed: false, reason: "no changes" };
  }

  const putRes = await fetch(
    `${GITHUB_API}/repos/${owner}/${repoName}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        ...githubHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString("base64"),
        sha: existing.sha,
      }),
    }
  );

  if (!putRes.ok) {
    const errorBody = await putRes.text();
    throw new Error(`Failed to commit ${path}: ${putRes.status} ${errorBody}`);
  }

  return { committed: true, reason: "committed" };
}

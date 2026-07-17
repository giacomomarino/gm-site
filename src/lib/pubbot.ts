export interface Publication {
  title: string;
  journal: string;
  date: string;
  type: string;
  author: string;
  doi: string | null;
  pmid: string | null;
  pmc: string | null;
  contributors: string[];
  source: string;
  grade: string;
}

export interface PublicationsData {
  publications: Publication[];
}

interface ESummaryArticle {
  title?: string;
  fulljournalname?: string;
  pubdate?: string;
  pubtype?: string[];
  authors?: { name: string }[];
  articleids?: { idtype: string; value: string }[];
}

function formatEsummaryDate(pubdate: string): string {
  const match = pubdate.trim().match(/^(\d{4})\s+(\w{3})(?:\s+(\d{1,2}))?/);
  if (!match) return pubdate;

  const [, year, month, day] = match;
  if (day) return `${year}-${month}-${day.padStart(2, "0")}`;
  return `${year}-${month}`;
}

export function parsePublicationDate(dateStr: string): Date {
  const formats = [
    /^(\d{4})-(\d{2})-(\d{2})$/,
    /^(\d{4})-(\w{3})-(\d{2})$/,
    /^(\d{4})-(\w{3})$/,
    /^(\d{4})$/,
  ];

  const monthMap: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const isoMatch = dateStr.match(formats[0]);
  if (isoMatch) {
    return new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]));
  }

  const fullMatch = dateStr.match(formats[1]);
  if (fullMatch) {
    return new Date(Number(fullMatch[1]), monthMap[fullMatch[2]], Number(fullMatch[3]));
  }

  const monthMatch = dateStr.match(formats[2]);
  if (monthMatch) {
    return new Date(Number(monthMatch[1]), monthMap[monthMatch[2]], 1);
  }

  const yearMatch = dateStr.match(formats[3]);
  if (yearMatch) {
    return new Date(Number(yearMatch[1]), 0, 1);
  }

  return new Date(0);
}

export async function fetchPubmedPublications(
  term = "Giacomo B Marino"
): Promise<PublicationsData> {
  const esearchUrl = new URL(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
  );
  esearchUrl.searchParams.set("db", "pubmed");
  esearchUrl.searchParams.set("term", term);
  esearchUrl.searchParams.set("retstart", "0");
  esearchUrl.searchParams.set("retmax", "50");
  esearchUrl.searchParams.set("sort", "pub+date");
  esearchUrl.searchParams.set("retmode", "json");

  const esearchResponse = await fetch(esearchUrl);
  if (!esearchResponse.ok) {
    throw new Error(`PubMed esearch failed: ${esearchResponse.status}`);
  }

  const esearchJson = await esearchResponse.json();
  const pmids: string[] = esearchJson?.esearchresult?.idlist ?? [];

  if (pmids.length === 0) {
    return { publications: [] };
  }

  const esummaryUrl = new URL(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
  );
  esummaryUrl.searchParams.set("db", "pubmed");
  esummaryUrl.searchParams.set("id", pmids.join(","));
  esummaryUrl.searchParams.set("retmode", "json");

  const esummaryResponse = await fetch(esummaryUrl);
  if (!esummaryResponse.ok) {
    throw new Error(`PubMed esummary failed: ${esummaryResponse.status}`);
  }

  const esummaryJson = await esummaryResponse.json();
  const publications: Publication[] = [];

  for (const pmid of pmids) {
    const article = esummaryJson?.result?.[pmid] as ESummaryArticle | undefined;
    if (!article?.title) continue;

    const contributors = (article.authors ?? [])
      .map((author) => author.name)
      .filter(Boolean);

    const author =
      contributors.find((name) => name.includes("Marino")) ??
      contributors[0] ??
      "Unknown";

    let doi: string | null = null;
    let pmc: string | null = null;
    for (const id of article.articleids ?? []) {
      if (id.idtype === "doi") doi = id.value;
      if (id.idtype === "pmc") pmc = id.value;
    }

    publications.push({
      title: article.title,
      journal: article.fulljournalname ?? "",
      date: article.pubdate ? formatEsummaryDate(article.pubdate) : "",
      type: article.pubtype?.[0] ?? "Journal Article",
      author,
      doi,
      pmid,
      pmc,
      contributors,
      source: "Giacomo Marino",
      grade: "Preferred source (of 2)",
    });
  }

  return { publications };
}

export function mergePublications(
  existing: PublicationsData,
  incoming: PublicationsData
): PublicationsData {
  const data: PublicationsData = {
    publications: [...existing.publications],
  };

  const existingDois = new Set(
    data.publications.map((pub) => pub.doi).filter((doi): doi is string => Boolean(doi))
  );

  for (const pub of incoming.publications) {
    if (pub.doi && !existingDois.has(pub.doi)) {
      data.publications.push(pub);
      existingDois.add(pub.doi);
    }
  }

  const titleToPub = new Map<string, Publication>();
  for (const pub of data.publications) {
    const title = pub.title.toLowerCase().replace(/\./g, "");
    const existingPub = titleToPub.get(title);

    if (!existingPub) {
      titleToPub.set(title, pub);
      continue;
    }

    const currentIsBiorxiv = pub.journal.toLowerCase().includes("biorxiv");
    const existingIsBiorxiv = existingPub.journal.toLowerCase().includes("biorxiv");

    if (currentIsBiorxiv && !existingIsBiorxiv) {
      continue;
    }

    if (!currentIsBiorxiv && existingIsBiorxiv) {
      titleToPub.set(title, pub);
      continue;
    }

    if (parsePublicationDate(pub.date) > parsePublicationDate(existingPub.date)) {
      titleToPub.set(title, pub);
    }
  }

  const publications = Array.from(titleToPub.values()).sort(
    (a, b) => parsePublicationDate(b.date).getTime() - parsePublicationDate(a.date).getTime()
  );

  return { publications };
}

export function serializePublications(data: PublicationsData): string {
  return `${JSON.stringify(data, null, 4)}\n`;
}

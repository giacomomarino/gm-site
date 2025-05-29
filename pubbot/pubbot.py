import requests
import xml.etree.ElementTree as ET
import json
from datetime import datetime

def fetch_pubmed_publications(term="Giacomo B Marino", page=2):
    # Pagination math
    retstart = 1
    retmax = 50

    # Step 1: ESearch to get PMIDs
    esearch_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
    params = {
        "db": "pubmed",
        "term": term,
        "retstart": retstart,
        "retmax": retmax,
        "sort": "pub+date",
        "retmode": "json"
    }
    esearch_response = requests.get(esearch_url, params=params).json()
    pmids = esearch_response["esearchresult"]["idlist"]

    if not pmids:
        return {"publications": []}

    # Step 2: EFetch to get details
    efetch_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"
    efetch_params = {
        "db": "pubmed",
        "id": ",".join(pmids),
        "retmode": "xml"
    }
    efetch_response = requests.get(efetch_url, params=efetch_params)
    root = ET.fromstring(efetch_response.content)

    publications = []
    for article in root.findall(".//PubmedArticle"):
        try:
            article_data = article.find("MedlineCitation/Article")
            title = article_data.findtext("ArticleTitle")
            journal = article_data.findtext("Journal/Title")
            pub_date_elem = article_data.find("Journal/JournalIssue/PubDate")
            date_parts = [pub_date_elem.findtext(tag) for tag in ("Year", "Month", "Day")]
            date = "-".join(filter(None, date_parts))
            if len(date_parts) == 1:
                date += "-01-01"

            authors = article_data.find("AuthorList")
            contributors = []
            for author in authors.findall("Author"):
                last = author.findtext("LastName")
                initials = author.findtext("Initials")
                if last and initials:
                    contributors.append(f"{last} {initials}")

            author_str = next((a for a in contributors if "Marino" in a), contributors[0] if contributors else "Unknown")

            pub_type = article_data.findtext("PublicationTypeList/PublicationType")
            article_ids = article.find("PubmedData/ArticleIdList")

            doi = pmid = pmc = None
            for id_elem in article_ids.findall("ArticleId"):
                id_type = id_elem.attrib.get("IdType")
                if id_type == "doi":
                    doi = id_elem.text
                elif id_type == "pubmed":
                    pmid = id_elem.text
                elif id_type == "pmc":
                    pmc = id_elem.text

            publications.append({
                "title": title,
                "journal": journal,
                "date": date,
                "type": pub_type,
                "author": author_str,
                "doi": doi,
                "pmid": pmid,
                "pmc": pmc,
                "contributors": contributors,
                "source": "Giacomo Marino",
                "grade": "Preferred source (of 2)"
            })

        except Exception as e:
            print("Error parsing article:", e)
            continue

    return {"publications": publications}


# Example usage:
pubs = fetch_pubmed_publications()

with open('src/app/publications.json', 'r') as f:
    data = json.load(f)

    # Combine publications from both sources, using DOI as unique identifier
    existing_dois = {pub["doi"] for pub in data["publications"] if pub["doi"]}
    
    # Only add publications that don't already exist
    for pub in pubs["publications"]:
        if pub["doi"] not in existing_dois:
            data["publications"].append(pub)
            existing_dois.add(pub["doi"])
    
    # Sort publications by date, most recent first
    def parse_date(date_str):
        try:
            return datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            try:
                return datetime.strptime(date_str, "%Y-%b-%d")
            except ValueError:
                # Handle dates with only year and month
                return datetime.strptime(date_str, "%Y-%b")
    
    # Remove bioRxiv versions if a published version exists
    title_to_pub = {}
    for pub in data["publications"]:
        title = pub["title"].lower().replace(".", "")  # Normalize title for comparison
        if title not in title_to_pub:
            title_to_pub[title] = pub
        else:
            # If we find a duplicate, keep the non-bioRxiv version
            existing_pub = title_to_pub[title]
            current_is_biorxiv = "biorxiv" in pub.get("journal", "").lower()
            existing_is_biorxiv = "biorxiv" in existing_pub.get("journal", "").lower()
            
            # Keep the non-biorxiv version if one exists
            if current_is_biorxiv and not existing_is_biorxiv:
                continue  # Skip this biorxiv version
            elif not current_is_biorxiv and existing_is_biorxiv:
                title_to_pub[title] = pub  # Replace biorxiv with published version
            else:
                # If both are biorxiv or both are not biorxiv, keep the most recent
                if parse_date(pub["date"]) > parse_date(existing_pub["date"]):
                    title_to_pub[title] = pub
    
    # Update publications list with deduplicated entries
    data["publications"] = list(title_to_pub.values())
    
    # Sort the deduplicated list
    data["publications"].sort(key=lambda x: parse_date(x["date"]), reverse=True)

print(len(pubs["publications"]))

with open('src/app/publications.json', 'w') as f:
    json.dump(data, f, indent=4)

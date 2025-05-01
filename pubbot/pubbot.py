#%%
from scholarly import scholarly
import ast
import json

# Retrieve the author's data, fill-in, and print
# Get an iterator for the author results
search_query = scholarly.search_author('Giacomo B Marino')
first_author_result = next(search_query)
author = scholarly.fill(first_author_result )
scholarly.pprint(author)

# Take a closer look at the first publication
first_publication = author['publications']
print(first_publication[0])

# Remove the json.loads since the data is already a dictionary
parsed_data = first_publication[0]

#%%
print(parsed_data.keys())
# Step 2: Extract key components
summary = {
    "name": parsed_data["name"],
    "affiliation": parsed_data["affiliation"],
    "email_domain": parsed_data["email_domain"],
    "citations": {
        "total": parsed_data["citedby"],
        "last_5_years": parsed_data["citedby5y"],
        "per_year": parsed_data["cites_per_year"]
    },
    "indices": {
        "h_index": parsed_data["hindex"],
        "h_index_5y": parsed_data["hindex5y"],
        "i10_index": parsed_data["i10index"],
        "i10_index_5y": parsed_data["i10index5y"]
    },
    "coauthors": [
        {
            "name": c["name"],
            "affiliation": c["affiliation"],
            "scholar_id": c["scholar_id"]
        } for c in parsed_data.get("coauthors", [])
    ],
    "publications": [
        {
            "title": pub["bib"]["title"],
            "year": pub["bib"]["pub_year"],
            "citations": pub["num_citations"],
            "citation_str": pub["bib"]["citation"]
        } for pub in parsed_data.get("publications", [])
    ]
}

# Step 3: Optionally pretty print the result
print(json.dumps(summary, indent=2))

# Step 4: Save the summary to a JSON file
with open('author_summary.json', 'w') as f:
    json.dump(summary, f, indent=2)

print("Author summary saved to author_summary.json")


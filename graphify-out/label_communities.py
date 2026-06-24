import sys, json
from graphify.build import build_from_json
from graphify.cluster import score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from pathlib import Path

extraction = json.loads(Path('graphify-out/.graphify_extract.json').read_text(encoding="utf-8"))
detection  = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding="utf-8"))
analysis   = json.loads(Path('graphify-out/.graphify_analysis.json').read_text(encoding="utf-8"))

G = build_from_json(extraction, root='.', directed=False)
communities = {int(k): v for k, v in analysis['communities'].items()}
cohesion = {int(k): v for k, v in analysis['cohesion'].items()}
tokens = {'input': extraction.get('input_tokens', 0), 'output': extraction.get('output_tokens', 0)}

# Generate labels programmatically
labels = {}
for cid, nodes in communities.items():
    if cid == 0:
        labels[cid] = "Graphify Integration"
    elif cid == 1:
        labels[cid] = "ESLint & Project Structure Rules"
    elif cid == 2:
        labels[cid] = "PNPM Workspace Configuration"
    else:
        node_name = nodes[0]
        if "products" in node_name:
            labels[cid] = f"Product Domain ({node_name.split('_')[-1]})"
        elif "stripe" in node_name:
            labels[cid] = f"Stripe Billing ({node_name.split('_')[-1]})"
        elif "subscription" in node_name:
            labels[cid] = f"Subscription Domain ({node_name.split('_')[-1]})"
        elif "cache" in node_name:
            labels[cid] = f"Cache Operations ({node_name.split('_')[-1]})"
        elif "permissions" in node_name:
            labels[cid] = f"Permissions Checks ({node_name.split('_')[-1]})"
        elif "ui_" in node_name:
            labels[cid] = f"UI Component ({node_name.split('_')[-1]})"
        elif "components_" in node_name:
            labels[cid] = f"App Component ({node_name.split('_')[-1]})"
        else:
            parts = node_name.split('_')
            labels[cid] = " ".join([p.capitalize() for p in parts[-2:]])

# Regenerate questions with real community labels
questions = suggest_questions(G, communities, labels)

report = generate(G, communities, cohesion, labels, analysis['gods'], analysis['surprises'], detection, tokens, '.', suggested_questions=questions)
Path('graphify-out/GRAPH_REPORT.md').write_text(report, encoding="utf-8")
Path('graphify-out/.graphify_labels.json').write_text(json.dumps({str(k): v for k, v in labels.items()}, ensure_ascii=False), encoding="utf-8")
print('Report updated with community labels')

import difflib

def github_style_diff(old: str, new: str):
    old_lines = old.splitlines()
    new_lines = new.splitlines()

    diff = []

    d = difflib.ndiff(old_lines, new_lines)

    for line in d:
        if line.startswith("- "):
            diff.append({
                "type": "removed",
                "old": line[2:],
                "new": ""
            })
        elif line.startswith("+ "):
            diff.append({
                "type": "added",
                "old": "",
                "new": line[2:]
            })
        elif line.startswith("  "):
            diff.append({
                "type": "unchanged",
                "old": line[2:],
                "new": line[2:]
            })

    return diff
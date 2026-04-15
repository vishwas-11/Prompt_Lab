def simple_diff(old: str, new: str):
    old_words = set(old.split())
    new_words = set(new.split())

    added = list(new_words - old_words)
    removed = list(old_words - new_words)

    return {
        "added": added,
        "removed": removed
    }
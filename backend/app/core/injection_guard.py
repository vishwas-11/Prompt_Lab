import re

#  Known attack patterns
INJECTION_PATTERNS = [
    r"ignore previous instructions",
    r"disregard system prompt",
    r"reveal system prompt",
    r"show hidden instructions",
    r"act as .* without restrictions",
    r"bypass .* safety",
    r"you are now .*",
]


def detect_injection(text: str):
    text_lower = text.lower()

    for pattern in INJECTION_PATTERNS:
        if re.search(pattern, text_lower):
            return True, pattern

    return False, None
def parse_resume_text(raw_text: str) -> str:
    if not raw_text:
        return ""
    # Clean whitespace, remove empty lines
    lines = [line.strip() for line in raw_text.splitlines() if line.strip()]
    return "\n".join(lines)

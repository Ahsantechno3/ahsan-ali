"""Light theme primary swap — sirf className strings ke andar:
- base #C6FF00 / rgba(198,255,0)  ->  #89FF00 / rgba(137,255,0) + dark: twin (original)
- base #5c8400 / #7fb800 (light-side text/icon colors) -> #458000
dark: wale tokens bilkul nahi chhede jate.
Excluded: PortraitVisual.tsx, Logo.tsx (haath se honge), scenes.
"""
import re
import pathlib

EXCLUDE = {"PortraitVisual.tsx", "Logo.tsx", "LaptopOrbitScene.tsx"}
CLASS_RE = re.compile(r'className=\{?("[^"]*"|`[^`]*`)\}?')
TOKEN_RE = re.compile(r"\S+")


def transform_token(tok: str) -> str:
    if "dark:" in tok:
        return tok
    if "#5c8400" in tok or "#7fb800" in tok:
        return tok.replace("#5c8400", "#458000").replace("#7fb800", "#458000")
    if "#C6FF00" in tok or "198,255,0" in tok:
        base = tok.replace("#C6FF00", "#89FF00").replace("198,255,0", "137,255,0")
        return base + " dark:" + tok
    return tok


def process_file(path: pathlib.Path) -> bool:
    text = path.read_text()
    changed = False

    def repl(m: re.Match) -> str:
        nonlocal changed
        s = m.group(1)
        inner = s[1:-1]
        new_inner = TOKEN_RE.sub(lambda t: transform_token(t.group(0)), inner)
        if new_inner != inner:
            changed = True
        return m.group(0).replace(s, s[0] + new_inner + s[0])

    new_text = CLASS_RE.sub(repl, text)
    if changed:
        path.write_text(new_text)
    return changed


for p in sorted(pathlib.Path("components").glob("*.tsx")):
    if p.name in EXCLUDE:
        print("skip ", p.name)
        continue
    print("done " if process_file(p) else "same ", p.name)

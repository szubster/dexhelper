import re

with open("src/components/__tests__/StorageGrid.test.tsx", "r") as f:
    content = f.read()

search_pattern = r"""// Check box pokemon\n  await expect\.element\(page\.getByText\('Charmander'\)\)\.toBeInTheDocument\(\);\n  await expect\.element\(page\.getByText\('BLUE'\)\)\.toBeInTheDocument\(\);\n\}\);"""
replace_code = """// Check box pokemon
  await expect.element(page.getByText('Charmander')).toBeInTheDocument();
  await expect.element(page.getByText('BLUE')).toBeInTheDocument();

  // Click navigation
  const btn = page.getByText('Bulbasaur');
  await btn.click();
});"""

content = re.sub(search_pattern, replace_code, content)

with open("src/components/__tests__/StorageGrid.test.tsx", "w") as f:
    f.write(content)

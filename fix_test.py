import re

with open('src/components/__tests__/SearchAndFilters.test.tsx', 'r') as f:
    content = f.read()

content = content.replace("[ FILTER_PARAMETERS ]", "[ PARAMETER_MATRIX ]")

with open('src/components/__tests__/SearchAndFilters.test.tsx', 'w') as f:
    f.write(content)

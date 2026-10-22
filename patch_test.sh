#!/bin/bash
sed -i "s/await expect.element(page.getByText('\\\\[BLUE\\\\]')).toBeInTheDocument();/await expect.element(page.getByText('[BLUE]')).toBeInTheDocument();/g" src/components/__tests__/StorageGrid.test.tsx
sed -i "s/await expect.element(page.getByText('\\\\[GREEN\\\\]')).toBeInTheDocument();/await expect.element(page.getByText('[GREEN]')).toBeInTheDocument();/g" src/components/__tests__/StorageGrid.test.tsx

# Properly escape the selectors
sed -i "s/const skull = container.querySelector('.text-red-500\\\\[BLUE\\\\]\/50');/const skull = container.querySelector('.text-red-500\\\\\/50');/g" src/components/__tests__/StorageGrid.test.tsx
sed -i "s/container.querySelector(\n    '.border-red-500.shadow-\\\\[BLUE\\\\]\\\\[0_0_8px_rgba\\\\[BLUE\\\\](239\\\\[BLUE\\\\],68\\\\[BLUE\\\\],68\\\\[BLUE\\\\],0\\\\[BLUE\\\\].8\\\\[BLUE\\\\])\\\\[BLUE\\\\]\\]',/container.querySelector('.border-red-500.shadow-\\\\[0_0_8px_rgba\\\\(239\\\\,68\\\\,68\\\\,0\\\\.8\\\\)\\\\]')/g" src/components/__tests__/StorageGrid.test.tsx

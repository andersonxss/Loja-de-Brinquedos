#!/bin/bash
echo "Iniciando aplicação..."
npm install
npm run typeorm -- -d src/data-source.ts migration:run
npm run dev
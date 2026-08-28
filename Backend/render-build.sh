#!/usr/bin/env bash
set -o errexit
export PUPPETEER_CACHE_DIR=/opt/render/project/.cache/puppeteer
npm install
npx puppeteer browsers install chrome
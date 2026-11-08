#!/bin/bash
# Dipanggil Vercel lewat "ignoreCommand" di vercel.json (dibatasi 256 karakter, jadi
# logikanya ditaruh di sini). Exit 0 = lewati build, exit 1 = jalankan build.

# Branch selain main nggak pernah di-deploy.
[ "$VERCEL_GIT_COMMIT_REF" != "main" ] && exit 0

# Commit sebelumnya nggak diketahui (clone dangkal / deploy pertama): build saja.
if [ -z "$VERCEL_GIT_PREVIOUS_SHA" ] || ! git cat-file -e "$VERCEL_GIT_PREVIOUS_SHA^{commit}" 2>/dev/null; then
  exit 1
fi

# Build cuma kalau ada perubahan di luar folder yang juga di-skip .vercelignore.
git diff --quiet "$VERCEL_GIT_PREVIOUS_SHA" HEAD -- . \
  ':(exclude)pipeline' ':(exclude)social' ':(exclude).github' \
  ':(exclude).hallmark' ':(exclude)*.md' ':(exclude).vercelignore'

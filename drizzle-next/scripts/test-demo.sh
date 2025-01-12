DRIZZLE_NEXT_PATH="$HOME/code/drizzle-next/index.ts"

drizzle-next() {
    tsx "$DRIZZLE_NEXT_PATH" "$@"
}

# rm -rf ~/code/drizzle-next-demo
# cd ~/code
# drizzle-next new drizzle-next-demo -p pnpm --latest
cd ~/code/drizzle-next-demo
drizzle-next init -p pnpm --latest \
    --db-dialect sqlite \
    -pk cuid2 \
    --auth-solution authjs \
    --auth-providers credentials \
    --admin \
    --pluralize \
    --no-install
# pnpm add @faker-js/faker
# cp ~/code/drizzle-next-env/.env.local.sqlite .env.local
# cp ~/code/drizzle-next/templates/test-demo/scripts/load-fake-data.ts.hbs scripts/load-fake-data.ts
cp ~/code/drizzle-next/templates/test-demo/app/page.tsx.hbs app/page.tsx
cp ~/code/drizzle-next/templates/test-demo/app/\(admin\)/admin/page.tsx.hbs app/\(admin\)/admin/page.tsx
cp ~/code/drizzle-next/templates/test-demo/app/\(private\)/dashboard/page.tsx.hbs app/\(private\)/dashboard/page.tsx
# drizzle-next add tiptap
drizzle-next scaffold -a admin category -c name:text
drizzle-next scaffold -a admin post -c category_id:references_select title:text published_at:timestamp content:text_tiptap
drizzle-next scaffold -a private todo -c title:text completed:boolean
drizzle-next scaffold -a private note -c title:text content:text_tiptap
# drizzle-next add stripe
# npm run generate
# npm run migrate
# npx tsx scripts/create-user.ts test@example.com 12345678
# npx tsx scripts/grant-admin.ts test@example.com
# npx tsx scripts/create-price.ts
# npx tsx scripts/load-fake-data.ts
# npm run build
# npm run start
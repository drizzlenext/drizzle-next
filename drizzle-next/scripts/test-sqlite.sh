DRIZZLE_NEXT_PATH="$HOME/code/drizzle-next/drizzle-next/index.ts"

drizzle_next() {
    tsx "$DRIZZLE_NEXT_PATH" "$@"
}
alias drizzle-next="drizzle_next"
rm -rf ~/code/demo-sqlite
cd ~/code
pnpm create next-app@latest demo-sqlite --typescript --eslint --tailwind --app --no-src-dir --no-import-alias --turbopack
cd ~/code/demo-sqlite
drizzle-next init --package-manager pnpm \
    --db-dialect sqlite \
    --latest \
    --no-src-dir
# cp ~/code/drizzle-next-env/.env.sqlite .env
drizzle-next scaffold private_scaffold -c text_type:text integer_type:integer real_type:real boolean_type:boolean file_type:file timestamp_type:timestamp
drizzle-next scaffold public_scaffold -c text_type:text integer_type:integer real_type:real boolean_type:boolean file_type:file timestamp_type:timestamp
drizzle-next scaffold category -c name:text
drizzle-next scaffold post -c category_id:references_select title:text likes:integer published_at:timestamp content:text
npx drizzle-kit generate
npx drizzle-kit migrate
npx tsx scripts/create-user.ts user@example.com pw
npx tsx scripts/create-user.ts admin@example.com pw
npx tsx scripts/grant-admin.ts admin@example.com
pnpm add -D @faker-js/faker
npm run build
# npm run start
npm run dev
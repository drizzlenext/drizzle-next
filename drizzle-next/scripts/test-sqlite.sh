DRIZZLE_NEXT_PATH="$HOME/code/drizzle-next/drizzle-next/index.ts"

drizzle_next() {
    tsx "$DRIZZLE_NEXT_PATH" "$@"
}
alias drizzle-next="drizzle_next"
rm -rf ~/code/demo-sqlite
cd ~/code
pnpm create next-app@latest demo-sqlite --typescript --eslint --tailwind --app --no-src-dir --no-import-alias --turbopack
cd ~/code/demo-sqlite
drizzle-next init -p pnpm --latest \
    --db-dialect sqlite \
    -pk nanoid \
    --auth-solution authjs \
    --auth-providers github,google,postmark,nodemailer,credentials \
    --no-admin \
    --pluralize
cp ~/code/drizzle-next-env/.env.local.sqlite .env.local
cp ~/code/drizzle-next/drizzle-next/templates/test-scripts/load-fake-data.ts.hbs scripts/load-fake-data.ts
drizzle-next add tiptap
drizzle-next scaffold -a private private_scaffold -c text_type:text integer_type:integer real_type:real boolean_type:boolean file_type:file timestamp_type:timestamp
drizzle-next scaffold -a public public_scaffold -c text_type:text integer_type:integer real_type:real boolean_type:boolean file_type:file timestamp_type:timestamp
drizzle-next scaffold -a private category -c name:text
drizzle-next scaffold -a private post -c category_id:references_select title:text likes:integer published_at:timestamp content:text_tiptap
# drizzle-next add stripe
npx drizzle-kit generate
npx drizzle-kit migrate
npx tsx scripts/create-user.ts user@example.com pw
npx tsx scripts/create-user.ts admin@example.com pw
# npx tsx scripts/grant-admin.ts admin@example.com
# npx tsx scripts/create-price.ts
npm run build
npm run start
DRIZZLE_NEXT_PATH="$HOME/code/drizzle-next/drizzle-next/index.ts"

drizzle_next() {
    tsx "$DRIZZLE_NEXT_PATH" "$@"
}
alias drizzle-next="drizzle_next"

PGPASSWORD=postgres dropdb -p 5432 -U postgres demo
PGPASSWORD=postgres createdb -p 5432 -U postgres demo
rm -rf ~/code/demo-postgresql
cd ~/code
pnpm create next-app@latest demo-postgresql --typescript --eslint --tailwind --app --no-src-dir --no-import-alias --turbopack
cd demo-postgresql
drizzle-next init --package-manager pnpm \
    --db-dialect postgresql \
    --pk-strategy auto_increment \
    --no-auth \
    --no-admin \
    --latest \
    --framework all
cp ~/code/drizzle-next-env/.env.postgresql .env
drizzle-next add tiptap
drizzle-next scaffold public_scaffold -c integer_type:integer smallint_type:smallint bigint_type:bigint serial_type:serial bigserial_type:bigserial boolean_type:boolean text_type:text varchar_type:varchar char_type:char numeric_type:numeric decimal_type:decimal real_type:real double_precision_type:doublePrecision json_type:json jsonb_type:jsonb time_type:time timestamp_type:timestamp: date_type:date file_type:file
drizzle-next scaffold category -c name:text
drizzle-next scaffold post -c category_id:references_select title:text likes:integer published_at:timestamp content:text_tiptap
npx drizzle-kit generate
npx drizzle-kit migrate
npm run build
# npm run start
npm run dev
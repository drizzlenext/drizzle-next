DRIZZLE_NEXT_PATH="$HOME/code/drizzle-next/drizzle-next/index.ts"
RESET=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --reset) 
            RESET=true 
            shift ;;  # Shift removes the current argument
        *) 
            echo "Unknown option: $1" 
            exit 1 ;;  # Exit for unknown options
    esac
done

drizzle_next() {
    tsx "$DRIZZLE_NEXT_PATH" "$@"
}
alias drizzle-next="drizzle_next"

if [ "$RESET" = true ]; then
PGPASSWORD=postgres dropdb -p 5432 -U postgres drizzle_demo
PGPASSWORD=postgres createdb -p 5432 -U postgres drizzle_demo
rm -rf ~/code/demo-postgresql
fi

cd ~/code

if [ "$RESET" = true ]; then
pnpm create next-app@latest demo-postgresql --typescript --eslint --tailwind --app --src-dir --no-import-alias --turbopack
fi

cd demo-postgresql

if [ "$RESET" = true ]; then
drizzle-next init --package-manager pnpm \
    --db-dialect postgresql \
    --pk-strategy cuid2 \
    --auth \
    --admin \
    --latest
pnpm i -D prettier prettier-plugin-tailwindcss
pnpm i ../drizzle-next/drizzle-admin
else
drizzle-next init --package-manager pnpm \
    --db-dialect postgresql \
    --pk-strategy cuid2 \
    --auth \
    --admin \
    --latest \
    --no-install
fi

# cp ~/code/drizzle-next-env/.env.postgresql .env
cp ~/code/drizzle-next/common/templates/test-scripts/.prettierrc.hbs .prettierrc
drizzle-next scaffold admin_scaffold -c integer_type:integer smallint_type:smallint bigint_type:bigint serial_type:serial bigserial_type:bigserial boolean_type:boolean text_type:text varchar_type:varchar char_type:char numeric_type:numeric decimal_type:decimal real_type:real double_precision_type:doublePrecision json_type:json jsonb_type:jsonb time_type:time timestamp_type:timestamp: date_type:date file_type:file
drizzle-next scaffold private_scaffold -c text_field:text integer_field:integer real_field:real decimal_field:decimal boolean_field:boolean file_field:file timestamp_field:timestamp
drizzle-next scaffold public_scaffold -c text_field:text integer_field:integer real_field:real decimal_field:decimal boolean_field:boolean file_field:file timestamp_field:timestamp
drizzle-next scaffold category -c name:text
drizzle-next scaffold post -c category_id:references_select title:text likes:integer published_at:timestamp content:text

if [ "$RESET" = true ]; then
npx drizzle-kit generate
npx drizzle-kit migrate
npx tsx scripts/create-user.ts user@example.com pw
npx tsx scripts/create-user.ts admin@example.com pw
npx tsx scripts/grant-admin.ts admin@example.com
fi

sed -i 's/next dev --turbopack/next dev/' package.json

npm run build
npm run dev
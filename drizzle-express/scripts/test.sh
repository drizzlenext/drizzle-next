DRIZZLE_EXPRESS_PATH="$HOME/code/drizzle-next/drizzle-express/index.ts"
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

drizzle_express() {
    tsx "$DRIZZLE_EXPRESS_PATH" "$@"
}
alias drizzle-express="drizzle_express"

if [ "$RESET" = true ]; then
rm -rf ~/code/demo-drizzle-express
PGPASSWORD=postgres dropdb -p 5432 -U postgres demo
PGPASSWORD=postgres createdb -p 5432 -U postgres demo
fi

cd ~/code

if [ "$RESET" = true ]; then
mkdir demo-drizzle-express
fi

cd demo-drizzle-express
npm init -y

if [ "$RESET" = true ]; then
drizzle-express init --package-manager pnpm \
    --db-dialect postgresql \
    --pk-strategy cuid2 \
    --latest
else
drizzle-express init --package-manager pnpm \
    --db-dialect postgresql \
    --pk-strategy cuid2 \
    --latest \
    --no-install
fi

cp ~/code/drizzle-next-env/.env.postgresql .env
cp ~/code/drizzle-next/common/templates/test-scripts/.prettierrc.hbs .prettierrc
drizzle-express scaffold admin_scaffold -c integer_type:integer smallint_type:smallint bigint_type:bigint serial_type:serial bigserial_type:bigserial boolean_type:boolean text_type:text varchar_type:varchar char_type:char numeric_type:numeric decimal_type:decimal real_type:real double_precision_type:doublePrecision json_type:json jsonb_type:jsonb time_type:time timestamp_type:timestamp: date_type:date file_type:file
drizzle-express scaffold private_scaffold -c text_field:text integer_field:integer real_field:real decimal_field:decimal boolean_field:boolean file_field:file timestamp_field:timestamp
drizzle-express scaffold public_scaffold -c text_field:text integer_field:integer real_field:real decimal_field:decimal boolean_field:boolean file_field:file timestamp_field:timestamp
drizzle-express scaffold category -c name:text
drizzle-express scaffold post -c category_id:references_select title:text likes:integer published_at:timestamp content:text_tiptap

if [ "$RESET" = true ]; then
npx drizzle-kit generate
npx drizzle-kit migrate
fi

npm run dev
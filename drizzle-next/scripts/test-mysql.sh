DRIZZLE_NEXT_PATH="$HOME/code/drizzle-next/drizzle-next/index.ts"

drizzle_next() {
    tsx "$DRIZZLE_NEXT_PATH" "$@"
}
alias drizzle-next="drizzle_next"
mysqlsh.exe -u root -e "drop database drizzle_demo;" --sql
mysqlsh.exe -u root -e "create database drizzle_demo;" --sql
rm -rf ~/code/demo-mysql
cd ~/code
pnpm create next-app@latest demo-mysql --typescript --eslint --tailwind --app --src-dir --no-import-alias --turbopack
cd demo-mysql
drizzle-next init --package-manager pnpm \
    --db-dialect mysql \
    --pk-strategy uuidv7 \
    --auth \
    --admin \
    --no-pluralize \
    --latest
# cp ~/code/drizzle-next-env/.env.mysql .env
pnpm i ../drizzle-next/drizzle-admin
drizzle-next scaffold admin_scaffold -c int_type:int tinyint_type:tinyint smallint_type:smallint mediumint_type:mediumint bigint_type:bigint real_type:real decimal_type:decimal double_type:double float_type:float char_type:char varchar_type:varchar text_type:text boolean_type:boolean date_type:date datetime_type:datetime time_type:time year_type:year timestamp_type:timestamp json_type:json file_type:file
drizzle-next scaffold private_scaffold -c text_field:text integer_field:int real_field:real decimal_field:decimal boolean_field:boolean file_field:file timestamp_field:timestamp
drizzle-next scaffold public_scaffold -c text_field:text integer_field:int real_field:real decimal_field:decimal boolean_field:boolean file_field:file timestamp_field:timestamp
drizzle-next scaffold category -c name:varchar
drizzle-next scaffold post -c category_id:references_select title:varchar likes:int published_at:timestamp content:text
npx drizzle-kit generate
npx drizzle-kit migrate
npx tsx scripts/create-user.ts user@example.com pw
npx tsx scripts/create-user.ts admin@example.com pw
npx tsx scripts/grant-admin.ts admin@example.com

sed -i 's/next dev --turbopack/next dev/' package.json

npm run build
npm run dev
# npm run start
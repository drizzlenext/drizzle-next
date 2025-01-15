DRIZZLE_NEXT_PATH="$HOME/code/drizzle-next/drizzle-next/index.ts"

drizzle_next() {
    tsx "$DRIZZLE_NEXT_PATH" "$@"
}
alias drizzle-next="drizzle_next"
mysqlsh.exe -u root -e "drop database demo;" --sql
mysqlsh.exe -u root -e "create database demo;" --sql
rm -rf ~/code/demo-mysql
cd ~/code
pnpm create next-app@latest demo-mysql --typescript --eslint --tailwind --app --no-src-dir --no-import-alias --turbopack
cd demo-mysql
drizzle-next init -p pnpm --latest \
    --db-dialect mysql \
    -pk uuidv7 \
    --auth-solution authjs \
    --auth-providers github,google,postmark,nodemailer,credentials \
    --admin \
    --no-pluralize
cp ~/code/drizzle-next-env/.env.mysql .env
drizzle-next add tiptap
drizzle-next scaffold -a admin admin_scaffold -c int_type:int tinyint_type:tinyint smallint_type:smallint mediumint_type:mediumint bigint_type:bigint real_type:real decimal_type:decimal double_type:double float_type:float char_type:char varchar_type:varchar text_type:text boolean_type:boolean date_type:date datetime_type:datetime time_type:time year_type:year timestamp_type:timestamp json_type:json file_type:file
drizzle-next scaffold -a private private_scaffold -c text_field:text integer_field:int real_field:real decimal_field:decimal boolean_field:boolean file_field:file timestamp_field:timestamp
drizzle-next scaffold -a public public_scaffold -c text_field:text integer_field:int real_field:real decimal_field:decimal boolean_field:boolean file_field:file timestamp_field:timestamp
drizzle-next scaffold -a admin category -c name:varchar
drizzle-next scaffold -a admin post -c category_id:references_select title:varchar likes:int published_at:timestamp content:text_tiptap
# drizzle-next add stripe 
npx drizzle-kit generate
npx drizzle-kit migrate
npx tsx scripts/create-user.ts user@example.com pw
npx tsx scripts/create-user.ts admin@example.com pw
npx tsx scripts/grant-admin.ts admin@example.com
# npx tsx scripts/create-price.ts
npm run build
npm run start
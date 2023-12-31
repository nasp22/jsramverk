#reset database
if [ $# -eq 0 ]; then
    DB_FILE="trains"
else
    DB_FILE="$1"
fi

$(> db/"$DB_FILE".sqlite)
cat db/migrate.sql | sqlite3 db/"$DB_FILE".sqlite

if [ $# -eq 1 ]; then
    cat db/$DB_FILE.sql | sqlite3 db/"$DB_FILE".sqlite
fi
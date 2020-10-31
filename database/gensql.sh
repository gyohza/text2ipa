#! sh

DICT=https://raw.githubusercontent.com/Alexir/CMUdict/master/cmudict-0.7b

SQLFILE=arpadict.sql

cat > $SQLFILE << -sql

DROP DATABASE IF EXISTS arparef;

CREATE DATABASE arparef;

USE arparef;

DROP TABLE IF EXISTS wordarpa;

CREATE TABLE wordarpa (	
	word varchar(128) NOT NULL,
	arpa varchar(512) NOT NULL,
	CONSTRAINT uc_pronunc UNIQUE (word, arpa)
);

-sql

curl -X GET $DICT \
| iconv -c -t iso-8859-1//TRANSLIT \
| grep -a '^[A-Z]' \
| sed -r "s/'/\\\'/g" \
| sed -r "s/^([A-Z][A-Z0-9\\/'._-]*)(\([0-9]+\))?\s\s+([A-Z]{1,2}[0-2]?(\s[A-Z]{1,2}[0-2]?)*)$/('\1', '\3'),/g" \
| tr -d '\n' \
| sed -r "s/((\([^)]+\),){0,63})(\([^)]+\)),/INSERT INTO wordarpa VALUES \1\3;\n\n/g" \
>> $SQLFILE
#! node

const mysql = require('mysql');

function textToArpa(tokens, callback) {

  const conn = mysql.createConnection({
    host: 'localhost', user: 'root', database: 'arparef',
  });

  const query = 'SELECT w.word, p.arpabet FROM '
    + 'words w, pronunciations p WHERE '
    + `w.word IN (${tokens.map(v => mysql.escape(v)).join()}) `
    + 'AND w.id = p.word_id';
  
  conn.connect(err => {
    if (err) console.error(err);
    conn.query(query, (err, res) => {
      if (err) console.error(err);
      const dict = res.reduce((acc, v) => {
        acc[v.word] = [...(acc[v.word] || []), v.arpabet];
        return acc;
      }, {});
      const arpas = tokens.map(
        v => (dict[v.toUpperCase()] || [])[0]
          || v.toUpperCase().replace(/^([A-Z]\S+)$/, '[[$1]]')
      );
      conn.end();
      return callback(arpas);
    });
  });

}

exports = textToArpa;

process.stdin.on('data', data => 
  textToArpa(data.toString().split(/\s/), arr => 
    process.stdout.write(arr.join('\n'))));
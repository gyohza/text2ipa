#! node

function detokenize(tokens) {
  const text = tokens.join(' ');

  const regex = new RegExp(
    [
      '((?<=^|\\s)["\'([{]+)\\s', // prependices
      '\\s([.,:;?!"\')\\]}]+(?=$|\\s))', // appendices
      '(s)s+|^s|s$',
    ].join('|'),
    'g'
  );

  return text.replace(regex, '$1$2$3').trim();
}

module.exports = detokenize;

process.stdin.on('data', data =>
  process.stdout.write(detokenize(data.toString().split('\n')))
);

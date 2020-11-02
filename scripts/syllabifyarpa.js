#! node

function sillabify(arpaWords) {
  const vowels = [
    'A(A|E|H|O|W|XR?|Y)',
    'E(H|R|Y)',
    'I(H|X|Y)',
    'O(W|Y)',
    'U(H|W|X)',
  ].join('|');

  const onsets = [
    'S( ([MN]|K( [RW])?|P( [LR])?|[TF]( R)?))?',
    '([DT]|TH)( [WR])?',
    'K( [WRL])?',
    '[PFBG]( [RL])?',
    'SH( R)?',
    `([LMQRVYZ]|CH|D[HX]|E[LMN]|HH|JH|NX?|WH?)`,
  ].join('|');

  const regex = new RegExp(`\\b(((${onsets}) )?(${vowels})[0-2]?)`, 'g');

  return arpaWords.map(arpa => arpa.replace(regex, '/$1'));
}

module.exports = sillabify;

process.stdin.on('data', data =>
  process.stdout.write(sillabify(data.toString().split('\n')).join('\n'))
);

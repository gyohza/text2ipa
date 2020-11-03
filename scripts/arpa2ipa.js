#! node

function arpaToIpa(arpaWords) {
  const phonemes = {
    AA: 'ɑ',
    AE: 'æ',
    AH: 'ʌ',
    AO: 'ɔ',
    AW: 'aʊ',
    AX: 'ə',
    AXR: 'ɚ',
    AY: 'aɪ',
    EH: 'ɛ',
    ER: 'ɝ',
    EY: 'eɪ',
    IH: 'ɪ',
    IX: 'ɨ',
    IY: 'i',
    OW: 'oʊ',
    OY: 'ɔɪ',
    UH: 'ʊ',
    UW: 'u',
    UX: 'ʉ',
    B: 'b',
    CH: 'tʃ',
    D: 'd',
    DH: 'ð',
    DX: 'ɾ',
    EL: 'l̩',
    EM: 'm̩',
    EN: 'n̩',
    F: 'f',
    G: 'ɡ',
    HH: 'h',
    JH: 'dʒ',
    K: 'k',
    L: 'l',
    M: 'm',
    N: 'n',
    NG: 'ŋ',
    NX: 'ɾ̃',
    P: 'p',
    Q: 'ʔ',
    R: 'ɹ',
    S: 's',
    SH: 'ʃ',
    T: 't',
    TH: 'θ',
    V: 'v',
    W: 'w',
    WH: 'ʍ',
    Y: 'j',
    Z: 'z',
    ZH: 'ʒ',
  };

  const stresses = {
    0: '.',
    1: 'ˈ',
    2: 'ˌ',
  };

  const ipaWords = arpaWords.map(arpa =>
    arpa
      .replace(
        /\/([^\/\n]+)([0-2])/g,
        (m, onset, digit) => `${stresses[digit] || ''}${onset}`
      )
      .replace(
        /\b([A-Z]{1,2})(\s|\b)/g,
        (m, chars) => phonemes[chars] || `{{${arpa}}}`
      )
      .replace(/^\./g, '')
  );

  return ipaWords;
}

module.exports = arpaToIpa;

process.stdin.on('data', data =>
  process.stdout.write(arpaToIpa(data.toString().split('\n')).join('\n'))
);

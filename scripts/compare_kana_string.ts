/* 
Compares two kana strings.
Just like in a conventional dictionary, 
the comparison first ignores diacritics (dakuten and handakuten) and the difference between the small kana and the large kana are also discredited.
After that, the comparison sorts the diacritics later than the non-diacritics; small kana are sorted earlier than the large kana.
 */
export function compare_kana_string(s1: string, s2: string): 0 | 1 | -1 {
  // Replace the diacritics and the small kana with the large kana.
  const replacer = (s: string) => s
    .replace(/ガ/g, 'カ').replace(/ギ/g, 'キ').replace(/グ/g, 'ク').replace(/ゲ/g, 'ケ').replace(/ゴ/g, 'コ')
    .replace(/ザ/g, 'サ').replace(/ジ/g, 'シ').replace(/ズ/g, 'ス').replace(/ゼ/g, 'セ').replace(/ゾ/g, 'ソ')
    .replace(/ダ/g, 'タ').replace(/ヂ/g, 'チ').replace(/ヅ/g, 'ツ').replace(/デ/g, 'テ').replace(/ド/g, 'ト')
    .replace(/バ/g, 'ハ').replace(/ビ/g, 'ヒ').replace(/ブ/g, 'フ').replace(/ベ/g, 'ヘ').replace(/ボ/g, 'ホ')
    .replace(/パ/g, 'ハ').replace(/ピ/g, 'ヒ').replace(/プ/g, 'フ').replace(/ペ/g, 'ヘ').replace(/ポ/g, 'ホ')
    .replace(/ァ/g, 'ア').replace(/ィ/g, 'イ').replace(/ゥ/g, 'ウ').replace(/ェ/g, 'エ').replace(/ォ/g, 'オ')
    .replace(/ャ/g, 'ヤ').replace(/ュ/g, 'ユ').replace(/ョ/g, 'ヨ')
    .replace(/ㇳ/g, 'ト').replace(/ㇰ/g, 'ク').replace(/ㇽ/g, 'ル').replace(/ㇲ/g, 'ス').replace(/ㇷ゚/g, 'プ')
    ;

  const t1 = replacer(s1);
  const t2 = replacer(s2);

  if (t1 < t2) {
    return -1;
  } else if (t1 > t2) {
    return 1;
  } else {
    // If the strings are equal, we can *almost* compare the original strings with JavaScript's `<`.
    // However, since Unicode ordering has inconsistencies:
    // - the small kana in the Unicode block Katakana comes earlier than the large kana
    // - the small kana in the Unicode block Katakana Phonetic Extensions comes later than the large kana
    // we have to compare the original strings character by character.
    for (let i = 0; i < s1.length; i++) {
      const comparison = compare_single_similar_kana(s1[i], s2[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    return 0;
  }
}

function which_block(s: string): "Katakana" | "Katakana Phonetic Extensions" | "Others" {
  if ("\u30a0" <= s && s <= "\u30ff") {
    return "Katakana";
  } else if ("\u31f0" <= s && s <= "\u31ff") {
    return "Katakana Phonetic Extensions";
  } else {
    return "Others";
  }
}

// compare_kana_string("ガ", "カ") // 1
// compare_kana_string("カ", "ガ") // -1
// compare_kana_string("カ", "カ") // 0
// compare_kana_string("ㇳ", "ト") // -1
function compare_single_similar_kana(s1: string, s2: string): 0 | 1 | -1 {
  // Since Unicode ordering has inconsistencies:
  // - the small kana in the Unicode block Katakana comes earlier than the large kana
  // - the small kana in the Unicode block Katakana Phonetic Extensions comes later than the large kana
  // we have to write a custom comparison function.
  if (which_block(s1) === "Others" || which_block(s2) === "Others") {
    throw new Error(`The strings must be kana. Got \`${s1}\` and \`${s2}\`.`);
  }

  if (which_block(s1) === which_block(s2)) {
    return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
  } else {
    return which_block(s1) === "Katakana Phonetic Extensions" ? -1 : 1;
  }
}

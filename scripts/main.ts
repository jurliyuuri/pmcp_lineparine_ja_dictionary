import { compare_kana_string } from "./compare_kana_string.ts";

const test_cases = [
  ["ail", "アイㇽ"],
  ["belpic", "ベㇽピㇲ"],
  ["cetkaik", "セㇳカイㇰ"],
  ["nip", "ニㇷ゚"],
  ["kinpit", "キンピㇳ"],
  ["lauzait", "ラウツァイㇳ"],
  ["lukupit", "ルクピㇳ"],
  ["cepkulante", "セㇷ゚クランテ"],
];

const KANA_TABLE = {
  'p': { 'a': 'パ', 'i': 'ピ', 'u': 'プ', 'e': 'ペ', 'o': 'ポ', '': 'ㇷ゚' },
  'b': { 'a': 'バ', 'i': 'ビ', 'u': 'ブ', 'e': 'ベ', 'o': 'ボ', '': null },
  'm': { 'a': 'マ', 'i': 'ミ', 'u': 'ム', 'e': 'メ', 'o': 'モ', '': null },
  'k': { 'a': 'カ', 'i': 'キ', 'u': 'ク', 'e': 'ケ', 'o': 'コ', '': 'ㇰ' },
  'l': { 'a': 'ラ', 'i': 'リ', 'u': 'ル', 'e': 'レ', 'o': 'ロ', '': 'ㇽ' },
  'n': { 'a': 'ナ', 'i': 'ニ', 'u': 'ヌ', 'e': 'ネ', 'o': 'ノ', '': 'ン' },
  'c': { 'a': 'サ', 'i': 'スィ', 'u': 'ス', 'e': 'セ', 'o': 'ソ', '': 'ㇲ' },
  'x': { 'a': 'シャ', 'i': 'シ', 'u': 'シュ', 'e': 'シェ', 'o': 'ショ', '': null },
  'z': { 'a': 'ツァ', 'i': 'ツィ', 'u': 'ツ', 'e': 'ツェ', 'o': 'ツォ', '': null },
  'ź': { 'a': 'チャ', 'i': 'チ', 'u': 'チュ', 'e': 'チェ', 'o': 'チョ', '': null },
  't': { 'a': 'タ', 'i': 'ティ', 'u': 'トゥ', 'e': 'テ', 'o': 'ト', '': 'ㇳ' },
  'd': { 'a': 'ダ', 'i': 'ディ', 'u': 'ドゥ', 'e': 'デ', 'o': 'ド', '': null },
  'j': { 'a': 'ヤ', 'i': 'イィ', 'u': 'ユ', 'e': 'イェ', 'o': 'ヨ', '': null },
  'w': { 'a': 'ワ', 'i': 'ウィ', 'u': 'ウゥ', 'e': 'ウェ', 'o': 'ウォ', '': null },
  '': { 'a': 'ア', 'i': 'イ', 'u': 'ウ', 'e': 'エ', 'o': 'オ', '': '' },
};

function to_kana(str: string): string {
  const whole_word = str;
  const MONOSYLLABLE = /^([pbmklncxzźtdjw]?)([aeiou])([ptkcln](?![aeiou])|)/;
  let ans = "";

  while (str != "") {
    const [syll, onset, vowel, coda] = str.match(MONOSYLLABLE) ?? (() => { throw new Error(`In word "${whole_word}"\nCannot read off a syllable from the beginning of the substring "${str}"`) })();

    ans += KANA_TABLE[onset][vowel] + KANA_TABLE[coda][""];
    str = str.slice(syll.length);
  }
  return ans;
}

test_cases.forEach(([pmcp, kana]) => {
  console.assert(to_kana(pmcp) === kana, to_kana(pmcp), kana)
});

import { dict } from '../2_cleansed_assets/pmcf_dict.ts';

import pmcf_2023_11 from "../2_cleansed_assets/pmcf_2023_11.json" with { type: "json" };

import pmcp_2023_4_5_words from "../2_cleansed_assets/pmcp_2023_4_5_words.json" with { type: "json" };

const words: string[] = [
  /* pmcf_dict 由来のもの */
  ...dict.words.map(a => a.entry.form),
  ...pmcf_2023_11.map(a => a.語),
  ...pmcp_2023_4_5_words
];

console.log(JSON.stringify(words));

const kana_words = words.flatMap(form => {
  const normalized_entry = form.replace(/\./g, " ").replace(/[-*]/g, "").toLowerCase().replace(/^e /, "")
  if (normalized_entry === "textel" || normalized_entry === "jujojit") { return []; }
  return [normalized_entry.split(" ").map(to_kana).join("・")];
});

const kana_words_unique = [...new Set(kana_words)];

kana_words_unique.sort(compare_kana_string);

console.log(JSON.stringify(kana_words_unique));

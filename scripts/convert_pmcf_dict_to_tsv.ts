// Run with
// deno run --allow-write .\scripts\convert_pmcf_dict_to_tsv.ts

import { EtymologyEqualToMeaning, EtymologySeparateFromMeaning, LinzklarTranslation, Tag } from "../2_cleansed_assets/__OTM_TYPE.ts";
import { dict } from "../2_cleansed_assets/pmcf_dict.ts";

function tagToJapanese(pos: Tag): string {
    return {
        "ftlexest": "名詞",
        "kraftan": "形容詞",
        "fastarkraftona": "前置助動詞",
        "pestarkraftona": "後置助動詞",
        "kraftanix": "前置詞",
        "krackrafi'a": "間投詞",
        "kranti'a": "接続詞",
    }[pos];
}

const list = dict.words.map(w => {
    const [word_form, asterisk] = w.entry.form[0] === "*" ? [w.entry.form.slice(1), "TRUE"] : [w.entry.form, ""];
    const part_of_speech = w.tags.map(tagToJapanese);

    // "farteven ad kante" と "farteven" & "kante" を相補分布にしている。
    // ということで、一旦型をゆるめ、
    const translations: (EtymologyEqualToMeaning | LinzklarTranslation |
        EtymologySeparateFromMeaning)[] = w.translations;

    const linzklar_list: string[] = [];

    let 意味_理: string | undefined = undefined;
    let 語源_理: string | undefined = undefined;

    for (const tr of translations) {
        if (tr.title === "linzklar") {
            linzklar_list.push(...tr.forms);
        } else if (tr.title === "farteven ad kante") {
            if (語源_理) {
                throw new Error(`Duplicate detected: at word ${word_form}, found "${語源_理}" and "${tr.forms.join(", ")}"`);
            }
            if (意味_理) {
                throw new Error(`Duplicate detected: at word ${word_form}, found "${意味_理}" and "（左に同じ）"`);
            }
            意味_理 = "（左に同じ）";
            語源_理 = tr.forms.join(", ");
        } else if (tr.title === "farteven") {
            if (語源_理) {
                throw new Error(`Duplicate detected: at word ${word_form}, found "${語源_理}" and "${tr.forms.join(", ")}"`);
            }
            語源_理 = tr.forms.join(", ");
        } else if (tr.title === "kante") {
            if (意味_理) {
                throw new Error(`Duplicate detected: at word ${word_form}, found "${意味_理}" and "${tr.forms.join(", ")}"`);
            }
            意味_理 = tr.forms.join(", ");
        }
    }

    return { word_form, asterisk, part_of_speech, 意味_理, 語源_理 };
});

const encoder = new TextEncoder();
const data = encoder.encode(
    ["語", "アスタリスク", "品詞", "意味（理）", "語源（理）"].join("\t") + "\n" +
    list.map(line => [line.word_form, line.asterisk, line.part_of_speech, line.意味_理 ?? "", line.語源_理 ?? ""].join("\t")).join("\n")
);

Deno.writeFileSync("pmcf_dict.tsv", data);

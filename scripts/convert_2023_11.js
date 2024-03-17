const fs = require("fs");
import d2023_11 from "../1_primary_resources/d2023_11.json" with { type: "json" };

fs.writeFileSync(
    "../2_cleansed_asset/pmcf_2023_11.json",
    JSON.stringify(d2023_11.slice(1).map(
        ([語, 品詞, 語ソース, 推定執筆日, 議論ソース, 日本語意味, リパライン語意味, リパライン語語源, 語源の和訳, 備考や案件]) => {
            if (リパライン語意味 === "（左に同じ）") {
                return { 語: 語.toLowerCase(), 品詞, 語ソース, 推定執筆日, 議論ソース, 日本語意味, "farteven ad kante": リパライン語語源, 備考や案件 };
            } else {
                return { 語: 語.toLowerCase(), 品詞, 語ソース, 推定執筆日, 議論ソース, 日本語意味, "farteven": リパライン語意味, "kante": リパライン語語源, 語源の和訳, 備考や案件 };
            }
        }), null, 2
    )
);

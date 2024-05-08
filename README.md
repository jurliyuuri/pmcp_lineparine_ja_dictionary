# pmcp_lineparine_ja_dictionary / 東島通商語・リパライン語・日本語辞書

これはリパライン語と日本語による東島通商語の辞書を錬成するためのプロジェクトです。

詳細は [README_old.md](./docs/README_old.md) と [作業ログ.md](./docs/作業ログ.md) をお読みください。

なお、今は労力が

- Google スプレッドシート 「[【ついにやる】東島通商語の蒐集【bixe】](https://docs.google.com/spreadsheets/d/1XjlK42tfTCrBegQUiv974qlC1XqrnNUbp43UJx1Qv8w/edit#gid=0)」
- それをもとにした[東島通商語コーパス検索システム「ビシェ」](https://github.com/sozysozbot/bixe)
- Google スプレッドシート 「[東島通商語の辞書的データを全部乗せよう](https://docs.google.com/spreadsheets/d/1Eo2VcfflWTTtJhMyeFNxQ0pDtkHETSKKM1yuVtVrnQs/edit#gid=0)」

に集中していっているので、そちらも参考のこと。

## フォルダ構成

### `scripts/`

このプロジェクト内で発動する様々なスクリプトの住処

### `docs/`

このプロジェクトそのものに関するドキュメントの住処

### `1_primary_resources/`

一次資料が雑多に格納されるフォルダ

### `2_cleansed_assets/`

`1_primary_resources/` を清めたもの。基本的に手動でいじらないように。

### `9_build_artifacts/`

`2_cleansed_assets/` をもとに組み上げたビルド成果物。

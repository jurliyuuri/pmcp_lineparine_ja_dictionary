export type Tag = "ftlexest" | "kraftanix" | "krackrafi'a" | "kraftan" | "kranti'a" | "fastarkraftona" | "pestarkraftona";
export type TranslationFKJoined = { title: "farteven ad kante", forms: string[] };
export type TranslationFKSeparate = { title: "farteven" | "kante", forms: string[] };
export type LinzklarTranslation = { title: "linzklar", forms: string[] };
export type Content = { title: "nefisna" | "harda kraxaiun", text: string };

export type Word = {
  entry: { id: number, form: string },
  translations:
  (TranslationFKJoined | LinzklarTranslation)[] |
  (TranslationFKSeparate | LinzklarTranslation)[],
  tags: Tag[],
  contents: Content[],
  variations: [],
  relations: [],
};

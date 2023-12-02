export type Tag = "ftlexest" | "kraftanix" | "krackrafi'a" | "kraftan" | "kranti'a" | "fastarkraftona" | "pestarkraftona";
export type EtymologyEqualToMeaning = { title: "farteven ad kante", forms: string[] };
export type EtymologySeparateFromMeaning = { title: "farteven" | "kante", forms: string[] };
export type LinzklarTranslation = { title: "linzklar", forms: string[] };
export type Content = { title: "nefisna" | "harda kraxaiun", text: string };

export type Word = {
  entry: { id: number, form: string },
  translations:
  (EtymologyEqualToMeaning | LinzklarTranslation)[] |
  (EtymologySeparateFromMeaning | LinzklarTranslation)[],
  tags: Tag[],
  contents: Content[],
  variations: [],
  relations: [],
};

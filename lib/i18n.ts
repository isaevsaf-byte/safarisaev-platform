import en from "@/dictionaries/en.json";
import ru from "@/dictionaries/ru.json";

export type Locale = "en" | "ru";

const dictionaries = {
  en,
  ru,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}


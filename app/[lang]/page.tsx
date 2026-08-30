import { redirect } from "next/navigation";
import { isLocale, localeParams } from "@/lib/locale";

type Props = { params: { lang: string } };

export const dynamicParams = false;

export async function generateStaticParams() {
    return localeParams();
}

// The home page keeps the clean root URL, so /en and /ru on their own are not
// pages — they send you there rather than 404ing.
export default function LocaleRoot({ params }: Props) {
    if (!isLocale(params.lang)) redirect("/");
    redirect("/");
}

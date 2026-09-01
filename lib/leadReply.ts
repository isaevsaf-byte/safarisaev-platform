import type { Locale } from "@/lib/i18n";
import { TEARDOWN_PRICE } from "@/lib/pricing";

/**
 * The automatic first reply to a form submission.
 *
 * A lead used to land in Formspree and wait for a human. The gap between "I sent
 * something" and "somebody read it" is where interest cools, so this closes it in
 * seconds: it confirms the thing arrived, says what happens next and by when, and
 * leaves one useful thing behind. A person still replies properly afterwards.
 *
 * It never carries a tracking pixel and never goes anywhere except the address
 * that was typed into the form.
 */

export type LeadSource =
    | "homepage-audit-protocol"
    | "efficiency-index"
    | "ai-velocity-index"
    | "teardown"
    | "supply-chain-monitor";

export const LEAD_SOURCES: LeadSource[] = [
    "homepage-audit-protocol",
    "efficiency-index",
    "ai-velocity-index",
    "teardown",
    "supply-chain-monitor",
];

export function isLeadSource(value: string): value is LeadSource {
    return (LEAD_SOURCES as string[]).includes(value);
}

type Reply = { subject: string; lines: string[] };

const REPLIES: Record<LeadSource, Record<Locale, Reply>> = {
    "homepage-audit-protocol": {
        en: {
            subject: "Your audit request has arrived",
            lines: [
                "Thanks for the request. It reached me and I read every one myself.",
                "I will come back within one working day with either a first read on where your money is most likely leaking, or the two or three questions I need answered before I can say anything useful.",
                "If it is urgent, reply to this email and it goes straight to my inbox.",
            ],
        },
        ru: {
            subject: "Заявка на аудит получена",
            lines: [
                "Спасибо за заявку. Она дошла, и я читаю каждую сам.",
                "В течение рабочего дня вернусь либо с первым прочтением, где у вас вероятнее всего утекают деньги, либо с двумя-тремя вопросами, без ответов на которые сказать что-то полезное нельзя.",
                "Если срочно — просто ответьте на это письмо, оно придёт мне напрямую.",
            ],
        },
    },

    "efficiency-index": {
        en: {
            subject: "Your efficiency report",
            lines: [
                "Your report should have downloaded in the browser. If it did not, reply here and I will send the file.",
                "One thing worth knowing about the number it gave you: it is an estimate built from ten questions, not an audit. It is meant to tell you whether the problem is worth looking at, not how big it is exactly.",
                `If you want the exact version, the paid teardown maps the actual manual steps in one of your processes and prices the fix: safarisaev.ai/en/offer/teardown, ${TEARDOWN_PRICE}, credited against a build.`,
            ],
        },
        ru: {
            subject: "Ваш отчёт по эффективности",
            lines: [
                "Отчёт должен был скачаться в браузере. Если нет — ответьте на это письмо, пришлю файл.",
                "Про цифру, которую он вам дал, честно: это оценка по десяти вопросам, а не аудит. Она нужна, чтобы понять, стоит ли вообще смотреть в эту сторону, а не чтобы узнать точный размер потерь.",
                `Если нужна точная версия — платный разбор размечает реальные ручные шаги в одном вашем процессе и оценивает стоимость исправления: safarisaev.ai/ru/offer/teardown, ${TEARDOWN_PRICE}, засчитывается в счёт сборки.`,
            ],
        },
    },

    "ai-velocity-index": {
        en: {
            subject: "Your AI Velocity report",
            lines: [
                "Your report should have downloaded in the browser. If it did not, reply here and I will send the file.",
                "The archetype it gave you is the easy half. The hard half is picking the one thing to change next, and that depends on what your week actually looks like.",
                "If you tell me what you spend the most time on, I will tell you whether it is worth automating and roughly what that takes. No charge for the answer.",
            ],
        },
        ru: {
            subject: "Ваш отчёт AI Velocity",
            lines: [
                "Отчёт должен был скачаться в браузере. Если нет — ответьте на это письмо, пришлю файл.",
                "Архетип, который он выдал, это лёгкая половина. Тяжёлая — выбрать одну вещь, которую менять следующей, и она зависит от того, как реально выглядит ваша неделя.",
                "Напишите, на что уходит больше всего времени, и я скажу, стоит ли это автоматизировать и чего примерно потребует. За ответ денег не беру.",
            ],
        },
    },

    teardown: {
        en: {
            subject: "Teardown brief received",
            lines: [
                "Got your brief. I will read it properly and come back within one working day with a time that suits you and an invoice.",
                "Nothing to prepare before the call. No data room, no system access, no documents. Ninety minutes of talking through how the work actually happens is enough.",
                "The map follows within three working days of the call, and the fee comes off in full if you go on to have any of it built.",
            ],
        },
        ru: {
            subject: "Бриф на разбор получен",
            lines: [
                "Бриф получен. Прочитаю внимательно и в течение рабочего дня вернусь с удобным временем и счётом.",
                "Готовиться к созвону не нужно. Ни дата-рума, ни доступов, ни документов. Полутора часов разговора о том, как работа происходит на самом деле, достаточно.",
                "Карта придёт в течение трёх рабочих дней после созвона, а стоимость разбора целиком вычитается, если потом закажете сборку.",
            ],
        },
    },

    "supply-chain-monitor": {
        en: {
            subject: "Walkthrough request received",
            lines: [
                "Thanks for the interest. I will come back within one working day to arrange a walkthrough.",
                "In the meantime the running board is open at cpo-watchtower.co.uk. It runs on a sample supply base, so click a supplier or a region and it will behave exactly as it would with yours.",
                "Worth knowing before we speak: the setup is the real work, mapping your suppliers, your buying regions and the companies you watch. The monthly charge afterwards is small.",
            ],
        },
        ru: {
            subject: "Запрос на демонстрацию получен",
            lines: [
                "Спасибо за интерес. В течение рабочего дня вернусь, чтобы договориться о показе.",
                "Пока можно открыть работающую панель: cpo-watchtower.co.uk. Она крутится на демонстрационной базе поставок, так что кликните поставщика или регион — вести себя будет ровно так же, как на вашей.",
                "Что стоит знать до разговора: настоящая работа в настройке, размётке ваших поставщиков, регионов закупок и круга наблюдаемых компаний. Ежемесячная плата после неё небольшая.",
            ],
        },
    },
};

const SIGN_OFF: Record<Locale, string> = {
    en: "Safar Isaev\nsafarisaev.ai",
    ru: "Сафар Исаев\nsafarisaev.ai",
};

const AUTOMATIC_NOTE: Record<Locale, string> = {
    en: "This confirmation was sent automatically. Replying reaches a person.",
    ru: "Это подтверждение отправлено автоматически. Ответ на него придёт человеку.",
};

export function buildReply(source: LeadSource, locale: Locale) {
    const reply = REPLIES[source][locale];
    const text = [...reply.lines, "", SIGN_OFF[locale], "", AUTOMATIC_NOTE[locale]].join("\n\n");

    // Plain markup on purpose: no images, no tracking pixel, nothing to load.
    const html = [
        ...reply.lines.map((line) => `<p style="margin:0 0 16px">${escapeHtml(line)}</p>`),
        `<p style="margin:24px 0 0">${escapeHtml(SIGN_OFF[locale]).replace(/\n/g, "<br>")}</p>`,
        `<p style="margin:24px 0 0;color:#737373;font-size:13px">${escapeHtml(AUTOMATIC_NOTE[locale])}</p>`,
    ].join("");

    return {
        subject: reply.subject,
        text,
        html: `<div style="font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:1.6;color:#171717;max-width:560px">${html}</div>`,
    };
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

import { legalEntity } from "@/lib/legal";

export type TermsBlock = {
    heading: string;
    body?: string[];
    bullets?: string[];
    /** Rendered as an accent panel — used for the "this is not medical advice" warning. */
    emphasis?: boolean;
};

export type TermsContent = {
    eyebrow: string;
    title: string;
    subtitle: string;
    updatedLabel: string;
    updated: string;
    providerLabel: string;
    legalLinkLabel: string;
    privacyLinkLabel: string;
    sections: TermsBlock[];
    contactHeading: string;
    contactBody: string;
};

/** Date the terms text last changed. Update whenever the wording changes. */
const LAST_UPDATED_EN = "6 September 2026";
const LAST_UPDATED_RU = "6 сентября 2026";

export const APP_NAME_EN = "Kalorii (Калории)";
export const APP_NAME_RU = "Калории (Kalorii)";

export const termsContent: Record<"en" | "ru", TermsContent> = {
    en: {
        eyebrow: "// Terms of Use",
        title: `${APP_NAME_EN} — Terms of Use`,
        subtitle: `These terms are an agreement between you and ${legalEntity.name} for the use of the ${APP_NAME_EN} mobile application. By using the app you accept them. If you do not accept them, do not use the app.`,
        updatedLabel: "Last updated",
        updated: LAST_UPDATED_EN,
        providerLabel: "Provider",
        legalLinkLabel: "Full company details",
        privacyLinkLabel: "Privacy Policy",
        contactHeading: "Contact",
        contactBody: `Questions about these terms: ${legalEntity.email}. Postal address and registration details are on our legal information page.`,
        sections: [
            {
                heading: "Who you are agreeing with",
                body: [
                    `${APP_NAME_EN} is operated by ${legalEntity.name}, a private limited company registered in ${legalEntity.jurisdiction} under company number ${legalEntity.companyNumber}, with its registered office at ${legalEntity.registeredOffice.join(", ")}.`,
                ],
            },
            {
                heading: "What Kalorii is",
                body: [
                    "Kalorii is a diary. It records your weight, what you eat, your measurements and your activity, and it estimates a daily energy target from the numbers you give it.",
                ],
            },
            {
                heading: "It is not medical advice",
                emphasis: true,
                body: [
                    "Kalorii is not a medical device and does not give medical advice. Its calculations are estimates based on published formulas, and energy expenditure varies between people by more than any formula captures. Nothing in the app is a diagnosis, a treatment, or a substitute for advice from a doctor or a dietitian.",
                    "If you have a medical condition, are pregnant, are under 18, or have a history of an eating disorder, speak to a healthcare professional before changing how you eat.",
                    "Calorie estimates made from a photograph or a description are produced by an automated model and are approximate. Treat them as a starting figure, not a measurement.",
                ],
            },
            {
                heading: "Your account and your data",
                body: [
                    "Most of what you record stays on your phone. Cloud sync and signing in are optional, and what is transmitted and why is set out in our Privacy Policy, which forms part of these terms.",
                    "You are responsible for the accuracy of what you enter, and for keeping access to your device. You may export your diary and delete your cloud copy from inside the app at any time.",
                ],
            },
            {
                heading: "Subscriptions",
                body: ["Some features require a paid subscription."],
                bullets: [
                    "The price, the billing period and what is included are shown in the app before you buy.",
                    "Payment is taken by Apple or Google, not by us. We never see your card details.",
                    "Subscriptions renew automatically at the end of each period unless you cancel at least 24 hours before it ends.",
                    "Cancel through the store, not through us: iOS Settings → your name → Subscriptions, or Google Play → Payments and subscriptions. Deleting the app does not cancel a subscription.",
                    "Refunds are handled by Apple or Google under their own policies.",
                    "We may change prices. A change never applies to a period you have already paid for, and you will be told before a renewal at a new price.",
                ],
            },
            {
                heading: "What you may not do",
                body: [
                    "Use the app to break the law; try to bypass the limits on paid features; attempt to obtain other people's data; or automate requests to our servers beyond ordinary use of the app.",
                ],
            },
            {
                heading: "Availability",
                body: [
                    "We aim to keep the service running but do not promise it will be uninterrupted. Features may change or be withdrawn. Where a change materially reduces what a paid subscription provides, you may cancel and seek a refund from the store.",
                ],
            },
            {
                heading: "Liability",
                body: [
                    "The app is provided as it is. To the extent the law allows, we are not liable for indirect or consequential loss, or for any decision you make about your health based on what the app shows.",
                    "Nothing here limits liability that cannot lawfully be limited, including for death or personal injury caused by negligence, or for fraud. If you are a consumer, your statutory rights are unaffected.",
                ],
            },
            {
                heading: "Ending this agreement",
                body: [
                    "You may stop using the app at any time. We may suspend access if these terms are broken.",
                ],
            },
            {
                heading: "Governing law",
                body: [
                    `These terms are governed by the law of ${legalEntity.jurisdiction}. If you are a consumer resident elsewhere, you keep the protections of the mandatory law of your country of residence.`,
                ],
            },
            {
                heading: "Changes",
                body: [
                    "We may update these terms. Material changes will be announced in the app before they take effect, and the date at the top will change.",
                ],
            },
        ],
    },
    ru: {
        eyebrow: "// Условия использования",
        title: `${APP_NAME_RU} — Условия использования`,
        subtitle: `Эти условия — соглашение между тобой и ${legalEntity.name} об использовании мобильного приложения «${APP_NAME_RU}». Пользуясь приложением, ты принимаешь эти условия. Не согласен — не пользуйся.`,
        updatedLabel: "Обновлено",
        updated: LAST_UPDATED_RU,
        providerLabel: "Оператор",
        legalLinkLabel: "Реквизиты компании",
        privacyLinkLabel: "Политика приватности",
        contactHeading: "Контакт",
        contactBody: `Вопросы по этим условиям: ${legalEntity.email}. Почтовый адрес и регистрационные данные — на странице с реквизитами.`,
        sections: [
            {
                heading: "С кем ты заключаешь соглашение",
                body: [
                    `Приложение «${APP_NAME_RU}» управляется компанией ${legalEntity.name}, зарегистрированной в Англии и Уэльсе под номером ${legalEntity.companyNumber}, юридический адрес: ${legalEntity.registeredOffice.join(", ")}.`,
                ],
            },
            {
                heading: "Что такое «Калории»",
                body: [
                    "Это дневник. Он записывает твой вес, еду, замеры и активность и рассчитывает дневную норму энергии по числам, которые ты в него ввёл.",
                ],
            },
            {
                heading: "Это не медицинский совет",
                emphasis: true,
                body: [
                    "Приложение не является медицинским изделием и не даёт медицинских советов. Его расчёты — оценки по опубликованным формулам, а реальный расход энергии у разных людей расходится сильнее, чем это способна учесть любая формула. Ничто в приложении не является диагнозом, лечением или заменой консультации врача или диетолога.",
                    "Если у тебя есть заболевание, ты беременна, тебе меньше 18 или в прошлом было расстройство пищевого поведения — поговори с врачом, прежде чем менять питание.",
                    "Оценка калорий по фотографии или описанию делается автоматической моделью и является приблизительной. Это отправная цифра, а не измерение.",
                ],
            },
            {
                heading: "Аккаунт и данные",
                body: [
                    "Почти всё, что ты записываешь, остаётся на телефоне. Облачная синхронизация и вход в аккаунт — по желанию. Что и зачем передаётся, описано в Политике приватности, которая является частью этих условий.",
                    "Ты отвечаешь за достоверность того, что вводишь, и за доступ к своему устройству. Выгрузить дневник и удалить облачную копию можно в самом приложении в любой момент.",
                ],
            },
            {
                heading: "Подписка",
                body: ["Часть возможностей требует платной подписки."],
                bullets: [
                    "Цена, период и состав подписки показаны в приложении до покупки.",
                    "Оплату принимают Apple или Google, а не мы. Данные карты к нам не попадают.",
                    "Подписка продлевается автоматически в конце каждого периода, если не отменить её минимум за 24 часа до окончания.",
                    "Отменять нужно в магазине, а не у нас: Настройки iOS → твоё имя → Подписки, либо Google Play → Платежи и подписки. Удаление приложения подписку не отменяет.",
                    "Возвраты — по правилам Apple или Google.",
                    "Цены могут меняться. Изменение никогда не применяется к уже оплаченному периоду, и о продлении по новой цене мы предупредим заранее.",
                ],
            },
            {
                heading: "Чего делать нельзя",
                body: [
                    "Использовать приложение в нарушение закона; обходить ограничения платных функций; пытаться получить чужие данные; автоматизировать обращения к нашим серверам сверх обычного использования.",
                ],
            },
            {
                heading: "Доступность",
                body: [
                    "Мы стараемся, чтобы сервис работал, но не обещаем работу без перерывов. Функции могут меняться или исчезать. Если изменение существенно уменьшает то, за что заплачено, подписку можно отменить и запросить возврат в магазине.",
                ],
            },
            {
                heading: "Ответственность",
                body: [
                    "Приложение предоставляется как есть. В пределах, допустимых законом, мы не отвечаем за косвенные убытки и за решения о своём здоровье, принятые на основании того, что показало приложение.",
                    "Ничто здесь не ограничивает ответственность, которую нельзя ограничить по закону, включая ответственность за смерть или вред здоровью по неосторожности и за мошенничество. Права потребителя, установленные законом, сохраняются.",
                ],
            },
            {
                heading: "Прекращение",
                body: [
                    "Ты можешь перестать пользоваться приложением в любой момент. Мы можем ограничить доступ при нарушении этих условий.",
                ],
            },
            {
                heading: "Применимое право",
                body: [
                    "К этим условиям применяется право Англии и Уэльса. Если ты потребитель и живёшь в другой стране, за тобой сохраняются защиты, установленные императивными нормами твоей страны.",
                ],
            },
            {
                heading: "Изменения",
                body: [
                    "Условия могут обновляться. О существенных изменениях мы сообщим в приложении до их вступления в силу, и дата вверху изменится.",
                ],
            },
        ],
    },
};

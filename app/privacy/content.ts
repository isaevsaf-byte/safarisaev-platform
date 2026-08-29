import { legalEntity } from "@/lib/legal";

export type PrivacyBlock = {
    heading: string;
    body?: string[];
    bullets?: string[];
    /** Rendered as an accent panel — used for the "never leaves the app" guarantees. */
    emphasis?: boolean;
};

export type PrivacyContent = {
    eyebrow: string;
    title: string;
    subtitle: string;
    updatedLabel: string;
    updated: string;
    controllerLabel: string;
    legalLinkLabel: string;
    sections: PrivacyBlock[];
    contactHeading: string;
    contactBody: string;
};

/** Date the policy text last changed. Update whenever the wording changes. */
const LAST_UPDATED_EN = "29 August 2026";
const LAST_UPDATED_RU = "29 августа 2026";

export const APP_NAME_EN = "Kalorii (Калории)";
export const APP_NAME_RU = "Калории (Kalorii)";

export const privacyContent: Record<"en" | "ru", PrivacyContent> = {
    en: {
        eyebrow: "// Privacy Policy",
        title: `${APP_NAME_EN} — Privacy Policy`,
        subtitle: `${APP_NAME_EN} is a nutrition and weight tracking app published by ${legalEntity.name}. This policy explains what the app records, what stays on your phone, and what leaves it. Your health data stays on your device unless you turn on a feature that needs to send it.`,
        updatedLabel: "Last updated",
        updated: LAST_UPDATED_EN,
        controllerLabel: "Data controller",
        legalLinkLabel: "Full company details",
        contactHeading: "Contact",
        contactBody: `Questions about this policy, or a request to exercise any of the rights above: ${legalEntity.email}. Postal address and registration details are on our legal information page.`,
        sections: [
            {
                heading: "Who we are",
                body: [
                    `${APP_NAME_EN} is operated by ${legalEntity.name}, a private limited company registered in ${legalEntity.jurisdiction} under company number ${legalEntity.companyNumber}, with its registered office at ${legalEntity.registeredOffice.join(", ")}. We are the data controller for the personal data described here.`,
                    `You can reach us at ${legalEntity.email}.`,
                ],
            },
            {
                heading: "Your health data stays on your device",
                emphasis: true,
                body: [
                    "Everything you record in the app — weight, food entries, body measurements, body fat percentage, strength sets and journal notes — is written to a local SQLite database on your phone. By default it is not transmitted anywhere. It stays on the device, and removing the app removes it.",
                    "The sections below describe the specific cases where data does leave the device. Each one is either something you switch on yourself, or something you trigger by asking the app to do it.",
                ],
            },
            {
                heading: "Cloud sync (optional, off unless you enable it)",
                body: [
                    "If you turn on cloud sync, your records are sent over an encrypted HTTPS connection and stored on Cloudflare infrastructure, tied to your app installation or, if you have signed in, to your Apple account.",
                    "This exists so you can restore your history on a new phone. You can delete the cloud copy from inside the app at any time; deleting it does not touch the copy on your device.",
                ],
            },
            {
                heading: "Calorie estimation from photos and text",
                body: [
                    "When you ask the app to estimate a meal, the photo or the text description you provide is sent to our server and passed on to the Anthropic API, which returns the estimate to the app.",
                    "Neither the photo nor the description is stored on our server after the response is returned. We keep a simple per-installation request counter to limit abuse of the service; it records how many requests were made, never what they contained.",
                ],
            },
            {
                heading: "Sign in with Apple (optional)",
                body: [
                    "Signing in is optional; the app works without an account. If you do sign in, we receive an identifier from Apple. Our server converts it into a hashed account identifier and stores only that hash — the original Apple identifier is not stored. If Apple provides your email address, we do not store it.",
                ],
            },
            {
                heading: "Apple Health (optional)",
                body: [
                    "Only if you grant permission, the app reads your weight and body fat percentage from Apple Health, and writes weigh-ins you record back to it. This exchange happens on your device, under Apple's permission system, and you can withdraw it at any time in iOS Settings. We do not receive a copy of your Apple Health data.",
                ],
            },
            {
                heading: "Product analytics",
                body: [
                    "The app does not send product analytics to any third-party analytics service. Coarse usage signals — that the app was opened, that an entry was logged — are recorded only on the device and are not transmitted anywhere.",
                    "The app does not use session replay or screen recording.",
                ],
            },
            {
                heading: "Data that never goes to analytics",
                emphasis: true,
                bullets: [
                    "Your weight, and any change in it",
                    "Food names or descriptions of what you ate",
                    "Calorie figures",
                    "Body fat percentage and body measurements",
                    "Strength training entries",
                    "Journal notes",
                ],
                body: [
                    "No analytics leaves the app today. If a product analytics service is added later, none of the above will ever be part of what is sent, and this policy and the app's App Store privacy details will be updated before it is switched on.",
                    "The restriction is enforced in the app's code by a catalogue of permitted event properties, not by policy alone: any property that is not on the list is dropped before an event can be sent.",
                ],
            },
            {
                heading: "Subscriptions",
                body: [
                    "Subscriptions are handled through RevenueCat and Apple. Your payment details are processed by Apple; the app never sees them. We receive the subscription status needed to unlock paid features.",
                ],
            },
            {
                heading: "Crash reports",
                body: [
                    "If the app crashes, technical diagnostic information about the crash is sent to Sentry so the fault can be fixed. Crash reports do not include your health data.",
                ],
            },
            {
                heading: "Legal bases for processing",
                bullets: [
                    "Performance of a contract — operating the app's core functionality, including cloud sync and subscriptions once you use them.",
                    "Your explicit consent — health data you choose to send off the device: cloud sync, calorie estimation from a photo or description, and Apple Health access. You can withdraw consent by turning the feature off, and by deleting the cloud copy from within the app.",
                    "Our legitimate interests — crash reporting, so that faults in the app can be found and fixed.",
                ],
            },
            {
                heading: "How long we keep data",
                body: [
                    "Data on your device stays until you delete it or remove the app. A cloud sync copy is kept until you delete it from within the app. Photos and descriptions sent for calorie estimation are not retained after the response. Crash reports are kept no longer than is necessary for the purposes described above.",
                ],
            },
            {
                heading: "Your rights",
                body: [
                    "Under the UK GDPR and the EU GDPR you have the right to access your personal data, to have inaccurate data corrected, to have data erased, to receive a copy in a portable format, to restrict or object to certain processing, and to withdraw consent at any time.",
                    "Two of these are built into the app rather than being a promise on paper: you can export your entire history to a JSON file from within the app, and you can delete your cloud copy from within the app. For anything else, write to us and we will act on your request.",
                    "You also have the right to complain to a supervisory authority — in the United Kingdom, the Information Commissioner's Office (ico.org.uk).",
                ],
            },
            {
                heading: "Children",
                body: [
                    "The app is not intended for children under 13, and we do not knowingly collect personal data from them. If you believe a child has provided us with personal data, contact us and we will delete it.",
                ],
            },
            {
                heading: "No advertising",
                body: [
                    "The app shows no advertising, uses no advertising identifiers, and takes part in no ad networks. We do not sell your personal data and we do not share it for advertising or profiling.",
                ],
            },
            {
                heading: "Changes to this policy",
                body: [
                    "If this policy changes, the updated version is published on this page with a new date at the top. Material changes affecting how your data is handled will also be surfaced in the app.",
                ],
            },
        ],
    },
    ru: {
        eyebrow: "// Политика конфиденциальности",
        title: `${APP_NAME_RU} — Политика конфиденциальности`,
        subtitle: `${APP_NAME_RU} — приложение для учёта питания и веса, издатель — ${legalEntity.name}. Здесь описано, что приложение записывает, что остаётся на телефоне, а что его покидает. Данные о здоровье остаются на устройстве, пока вы сами не включите функцию, которой нужно их отправить.`,
        updatedLabel: "Последнее обновление",
        updated: LAST_UPDATED_RU,
        controllerLabel: "Оператор данных",
        legalLinkLabel: "Полные реквизиты компании",
        contactHeading: "Контакт",
        contactBody: `Вопросы по этой политике и обращения по любому из перечисленных прав: ${legalEntity.email}. Почтовый адрес и регистрационные данные — на странице реквизитов.`,
        sections: [
            {
                heading: "Кто мы",
                body: [
                    `${APP_NAME_RU} принадлежит ${legalEntity.name} — частной компании с ограниченной ответственностью, зарегистрированной в Англии и Уэльсе под номером ${legalEntity.companyNumber}, юридический адрес: ${legalEntity.registeredOffice.join(", ")}. Мы являемся оператором персональных данных, описанных здесь.`,
                    `Связаться с нами: ${legalEntity.email}.`,
                ],
            },
            {
                heading: "Данные о здоровье остаются на устройстве",
                emphasis: true,
                body: [
                    "Всё, что вы записываете в приложении — вес, записи о еде, замеры тела, процент жира, силовые подходы и заметки дневника — сохраняется в локальную базу SQLite на телефоне. По умолчанию эти данные никуда не передаются. Они остаются на устройстве, и удаление приложения удаляет их.",
                    "Ниже описаны конкретные случаи, когда данные всё же покидают устройство. Каждый из них вы либо включаете сами, либо запускаете, попросив приложение что-то сделать.",
                ],
            },
            {
                heading: "Облачная синхронизация (по желанию, выключена по умолчанию)",
                body: [
                    "Если вы включаете облачную синхронизацию, ваши записи передаются по защищённому соединению HTTPS и хранятся на инфраструктуре Cloudflare, привязанные к установке приложения или, если вы вошли в аккаунт, к вашему Apple ID.",
                    "Это нужно, чтобы восстановить историю на новом телефоне. Облачную копию можно удалить прямо из приложения в любой момент; на копию, которая лежит на устройстве, это не влияет.",
                ],
            },
            {
                heading: "Оценка калорий по фото и тексту",
                body: [
                    "Когда вы просите приложение оценить блюдо, фотография или текстовое описание отправляются на наш сервер и оттуда в Anthropic API, который возвращает оценку в приложение.",
                    "Ни фотография, ни описание не сохраняются на нашем сервере после того, как ответ возвращён. Мы ведём простой счётчик запросов на установку, чтобы ограничить злоупотребление сервисом; он фиксирует количество запросов, но никогда — их содержимое.",
                ],
            },
            {
                heading: "Вход через Apple (по желанию)",
                body: [
                    "Вход необязателен, приложение работает и без аккаунта. Если вы входите, мы получаем идентификатор от Apple. Наш сервер превращает его в хэш и хранит только этот хэш — исходный идентификатор Apple не сохраняется. Если Apple передаёт ваш адрес электронной почты, мы его не сохраняем.",
                ],
            },
            {
                heading: "Apple Health (по желанию)",
                body: [
                    "Только с вашего явного разрешения приложение читает вес и процент жира из Apple Health и записывает туда сделанные взвешивания. Этот обмен происходит на устройстве, в рамках системы разрешений Apple, и разрешение можно отозвать в любой момент в настройках iOS. Копию ваших данных Apple Health мы не получаем.",
                ],
            },
            {
                heading: "Продуктовая аналитика",
                body: [
                    "Приложение не передаёт продуктовую аналитику никаким сторонним сервисам. Грубые признаки использования — что приложение открыли, что сделали запись — фиксируются только на устройстве и никуда не отправляются.",
                    "Запись экрана и запись сессий не используются.",
                ],
            },
            {
                heading: "Что никогда не попадёт в аналитику",
                emphasis: true,
                bullets: [
                    "Ваш вес и его изменения",
                    "Названия блюд и описания того, что вы ели",
                    "Значения калорий",
                    "Процент жира и замеры тела",
                    "Записи о силовых тренировках",
                    "Заметки дневника",
                ],
                body: [
                    "Сегодня аналитика не покидает приложение вовсе. Если аналитический сервис будет подключён позже, ничего из перечисленного в отправляемые данные не войдёт, а эта политика и сведения о приватности в App Store будут обновлены до того, как он заработает.",
                    "Ограничение реализовано в коде приложения каталогом разрешённых свойств событий, а не только политикой: любое свойство, которого нет в списке, отбрасывается до того, как событие может быть отправлено.",
                ],
            },
            {
                heading: "Подписки",
                body: [
                    "Подписки обрабатываются через RevenueCat и Apple. Платёжные данные обрабатывает Apple; приложение их не видит. Мы получаем только статус подписки, необходимый для открытия платных функций.",
                ],
            },
            {
                heading: "Отчёты о сбоях",
                body: [
                    "Если приложение падает, технические сведения о сбое отправляются в Sentry, чтобы ошибку можно было исправить. Отчёты о сбоях не содержат ваших данных о здоровье.",
                ],
            },
            {
                heading: "Правовые основания обработки",
                bullets: [
                    "Исполнение договора — работа основных функций приложения, включая облачную синхронизацию и подписки, когда вы ими пользуетесь.",
                    "Ваше явное согласие — данные о здоровье, которые вы решаете отправить с устройства: облачная синхронизация, оценка калорий по фото или описанию, доступ к Apple Health. Согласие можно отозвать, выключив функцию и удалив облачную копию из приложения.",
                    "Наш законный интерес — отчёты о сбоях, чтобы находить и исправлять ошибки в приложении.",
                ],
            },
            {
                heading: "Сколько мы храним данные",
                body: [
                    "Данные на устройстве хранятся, пока вы их не удалите или не удалите приложение. Облачная копия хранится, пока вы не удалите её из приложения. Фотографии и описания, отправленные для оценки калорий, после ответа не сохраняются. Отчёты о сбоях хранятся не дольше, чем необходимо для целей, описанных выше.",
                ],
            },
            {
                heading: "Ваши права",
                body: [
                    "По UK GDPR и GDPR вы имеете право на доступ к своим персональным данным, на исправление неточных данных, на удаление, на получение копии в переносимом формате, на ограничение обработки и возражение против неё, а также на отзыв согласия в любой момент.",
                    "Два из этих прав встроены в приложение, а не обещаны на бумаге: всю историю можно выгрузить в файл JSON прямо из приложения, а облачную копию — удалить оттуда же. По остальным обращениям напишите нам, и мы их исполним.",
                    "Вы также вправе подать жалобу в надзорный орган — в Великобритании это Information Commissioner's Office (ico.org.uk).",
                ],
            },
            {
                heading: "Дети",
                body: [
                    "Приложение не предназначено для детей младше 13 лет, и мы намеренно не собираем их персональные данные. Если вы считаете, что ребёнок передал нам такие данные, напишите нам, и мы их удалим.",
                ],
            },
            {
                heading: "Без рекламы",
                body: [
                    "Приложение не показывает рекламу, не использует рекламные идентификаторы и не участвует в рекламных сетях. Мы не продаём ваши персональные данные и не передаём их для рекламы или профилирования.",
                ],
            },
            {
                heading: "Изменения политики",
                body: [
                    "Если политика меняется, обновлённая версия публикуется на этой странице с новой датой вверху. О существенных изменениях, влияющих на обращение с вашими данными, мы также сообщим в приложении.",
                ],
            },
        ],
    },
};

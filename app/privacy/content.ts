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
const LAST_UPDATED_EN = "6 September 2026";
const LAST_UPDATED_RU = "6 сентября 2026";

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
                heading: "Barcode scanning (only when you scan one)",
                body: [
                    "When you scan a product barcode, your phone asks Open Food Facts — a public, community-run food database — about that product. The barcode and your device's IP address reach Open Food Facts. Nothing about you, your weight or your diary does. If you never scan a barcode, this request never happens.",
                ],
            },
            {
                heading: "Sign in with Apple (optional)",
                body: [
                    "Signing in is optional; the app works without an account. If you do sign in, we receive an identifier from Apple. Our server converts it into a hashed account identifier and stores only that hash — the original Apple identifier is not stored. If Apple provides your email address, we do not store it.",
                ],
            },
            {
                heading: "Apple Health and Health Connect (optional)",
                body: [
                    "Only if you grant permission, the app reads your weight and body fat percentage from Apple Health on iPhone, or from Health Connect on Android, and writes your weigh-ins back so they are not trapped in this one app.",
                    "This exchange happens entirely on your device, under the platform's own permission system, and we never receive a copy. You can withdraw the permission at any time in iOS Settings or in Health Connect.",
                ],
            },
            {
                heading: "Product analytics",
                body: [
                    "To understand how the app is used — whether people finish onboarding, which way they log meals, where they stop — the app sends a small set of product events to PostHog, our analytics provider, on its European Union hosting.",
                    "What is sent is limited to event names and coarse properties: that the app was opened, that an entry was logged and by which input method, which onboarding step was completed, the interface language, which mode you switched to, that a paywall was shown, and that you opened the cravings screen, roughly what time of day it was and how it ended.",
                    "Events are grouped under an identifier generated at random on your device. It is deliberately separate from the identifier the app uses with our own server, so the two sets of records cannot be joined, and it is connected neither to your Apple account nor to your email address.",
                    "We do not use PostHog's SDK. The app posts the events itself, which means the vendor's automatic capture of taps and screens, and session replay, are not merely switched off — they are absent.",
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
                    "None of the above reaches analytics. The app's code carries a catalogue of the properties each event may contain, and any property outside it is dropped before the event is sent — the restriction is a structure in the code, covered by a test, not a promise in this text.",
                    "Posting the events ourselves rather than through the vendor's SDK is what keeps that catalogue the only door: nothing gets the opportunity to add to what it allowed.",
                ],
            },
            {
                heading: "Subscriptions",
                body: [
                    "Subscriptions are handled through RevenueCat, with Apple on iPhone and Google Play on Android. Your payment details are handled by Apple or Google and never reach us; we receive only whether a subscription is active.",
                ],
            },
            {
                heading: "Problem reports (your choice) and crash reports (automatic)",
                body: [
                    "When you send a problem report from Settings, we receive what you wrote, along with the app version and build, your platform and OS version, your device model, your language and the mode you are in. You may attach a screenshot: it is shown to you before anything is sent, and you can remove it. A screenshot of this app is a picture of your weight and what you ate, so it is never attached without you seeing it first.",
                    "If the app crashes, a report is sent automatically, because a crash nobody reports is a crash nobody fixes. It carries the error and the technical stack only — never a screenshot and nothing from your diary. Crash diagnostics also go to Sentry, on its European Union hosting, so the fault can be traced.",
                    "Reports reach a private team channel on Telegram and are kept on our Cloudflare backend for 90 days, after which they are deleted automatically.",
                ],
            },
            {
                heading: "Legal bases for processing",
                bullets: [
                    "Performance of a contract — operating the app's core functionality, including cloud sync and subscriptions once you use them.",
                    "Your explicit consent — health data you choose to send off the device: cloud sync, calorie estimation from a photo or description, and Apple Health or Health Connect access. You can withdraw consent by turning the feature off, and by deleting the cloud copy from within the app.",
                    "Our legitimate interests — product analytics limited to the coarse events described above, and crash reporting, so that the app can be improved and kept working.",
                ],
            },
            {
                heading: "How long we keep data",
                body: [
                    "Data on your device stays until you delete it or remove the app. A cloud sync copy is kept until you delete it from within the app. Photos and descriptions sent for calorie estimation are not retained after the response. Problem and crash reports are kept for 90 days and then deleted automatically. Analytics events are kept no longer than is necessary for the purposes described above.",
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
                heading: "Сканирование штрихкодов (только когда вы сканируете)",
                body: [
                    "Когда вы сканируете штрихкод товара, телефон спрашивает о нём Open Food Facts — публичную базу продуктов, которую ведёт сообщество. Наружу уходит штрихкод и IP-адрес устройства. Ничего о вас, вашем весе и дневнике — нет. Если вы не сканируете штрихкоды, этот запрос не происходит никогда.",
                ],
            },
            {
                heading: "Вход через Apple (по желанию)",
                body: [
                    "Вход необязателен, приложение работает и без аккаунта. Если вы входите, мы получаем идентификатор от Apple. Наш сервер превращает его в хэш и хранит только этот хэш — исходный идентификатор Apple не сохраняется. Если Apple передаёт ваш адрес электронной почты, мы его не сохраняем.",
                ],
            },
            {
                heading: "Apple Health и Health Connect (по желанию)",
                body: [
                    "Только с вашего явного разрешения приложение читает вес и процент жира из Apple Health на iPhone или из Health Connect на Android и записывает ваши взвешивания обратно, чтобы они не оставались запертыми в одном приложении.",
                    "Этот обмен целиком происходит на устройстве, в рамках системы разрешений самой платформы, и копию мы не получаем. Разрешение можно отозвать в любой момент в настройках iOS или в Health Connect.",
                ],
            },
            {
                heading: "Продуктовая аналитика",
                body: [
                    "Чтобы понимать, как приложением пользуются — доходят ли до конца онбординга, каким способом записывают еду, где останавливаются, — приложение отправляет небольшой набор продуктовых событий в PostHog, нашему аналитическому сервису, на его хостинге в Европейском союзе.",
                    "Отправляются только имена событий и грубые свойства: что приложение открыли, что сделали запись и каким способом ввода, какой шаг онбординга завершён, какой язык интерфейса выбран, на какой режим переключились, что показали экран подписки, а также что вы открыли экран тяги, примерно в какое время суток и чем это закончилось.",
                    "События группируются по идентификатору, который случайно генерируется на вашем устройстве. Он намеренно отделён от идентификатора, который приложение использует с нашим собственным сервером, поэтому два набора записей нельзя соединить; с вашим аккаунтом Apple и адресом почты он не связан.",
                    "Мы не используем SDK PostHog. Приложение отправляет события само, поэтому автоматический сбор нажатий и экранов, а также запись сессий не просто выключены — их нет.",
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
                    "Ничего из перечисленного в аналитику не попадает. В коде приложения есть каталог свойств, которые может содержать каждое событие, и любое свойство вне этого каталога отбрасывается до отправки — ограничение является конструкцией в коде, покрытой тестом, а не обещанием в этом тексте.",
                    "Именно потому, что приложение отправляет события само, а не через SDK сервиса, каталог остаётся единственной дверью: ничто не получает возможности добавить что-то сверх разрешённого.",
                ],
            },
            {
                heading: "Подписки",
                body: [
                    "Подписки обрабатываются через RevenueCat: на iPhone — вместе с Apple, на Android — вместе с Google Play. Платёжные данные обрабатывают Apple или Google, к нам они не попадают; мы получаем только то, активна подписка или нет.",
                ],
            },
            {
                heading: "Отчёты о проблемах (по вашему решению) и о падениях (автоматически)",
                body: [
                    "Когда вы отправляете отчёт из Настроек, к нам приходит написанный вами текст, а вместе с ним версия и сборка приложения, платформа и версия ОС, модель телефона, язык и текущий режим. Можно приложить скриншот: он показывается вам до отправки, и его можно убрать. Скриншот этого приложения — это изображение вашего веса и того, что вы ели, поэтому он никогда не прикладывается без вашего ведома.",
                    "Если приложение падает, отчёт уходит автоматически — о падении, о котором никто не сообщил, никто и не узнает. В нём только текст ошибки и техническая трассировка: ни скриншота, ни чего-либо из дневника. Диагностика падений также уходит в Sentry, на его хостинг в Европейском союзе, чтобы ошибку можно было проследить.",
                    "Отчёты попадают в приватный канал команды в Telegram и хранятся на нашем бэкенде в Cloudflare 90 дней, после чего удаляются автоматически.",
                ],
            },
            {
                heading: "Правовые основания обработки",
                bullets: [
                    "Исполнение договора — работа основных функций приложения, включая облачную синхронизацию и подписки, когда вы ими пользуетесь.",
                    "Ваше явное согласие — данные о здоровье, которые вы решаете отправить с устройства: облачная синхронизация, оценка калорий по фото или описанию, доступ к Apple Health или Health Connect. Согласие можно отозвать, выключив функцию и удалив облачную копию из приложения.",
                    "Наш законный интерес — продуктовая аналитика в рамках описанных выше грубых событий и отчёты о сбоях, чтобы приложение можно было улучшать и поддерживать в работоспособном состоянии.",
                ],
            },
            {
                heading: "Сколько мы храним данные",
                body: [
                    "Данные на устройстве хранятся, пока вы их не удалите или не удалите приложение. Облачная копия хранится, пока вы не удалите её из приложения. Фотографии и описания, отправленные для оценки калорий, после ответа не сохраняются. Отчёты о проблемах и падениях хранятся 90 дней и затем удаляются автоматически. События аналитики хранятся не дольше, чем необходимо для целей, описанных выше.",
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

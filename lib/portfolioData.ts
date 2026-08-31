import type { Locale } from "@/lib/i18n";
import { WEBSITE_FROM_PRICE } from "@/lib/pricing";

/**
 * Single source of truth for /portfolio and /portfolio/[slug].
 *
 * Localised strings live inside each entry (`{ en, ru }`) instead of two parallel
 * arrays — the old shape duplicated slug/url/featured per language and had already
 * started to drift.
 *
 * Everything in a `caseStudy` block is either observable on the live site or
 * supplied directly by Safar. `outcome`, `metrics` and `testimonial` are optional
 * on purpose: they render only when there is a real number or a real quote to put
 * there. Do not invent them.
 */

type Localised = Record<Locale, string>;

export interface CaseFact {
    label: Localised;
    value: Localised;
}

export interface CaseStudy {
    /** Opening paragraph — what the site had to do. */
    lede: Localised;
    /** What Safar's involvement was. */
    role: Localised;
    /** What actually shipped. Verifiable against the live site. */
    built: Localised[];
    /** Spec sheet shown alongside the narrative. */
    facts: CaseFact[];
    /** Honest observation or open item. Rendered in a muted block. */
    note?: Localised;
    /** Real client words only. */
    testimonial?: {
        quote: Localised;
        author: Localised;
    };
    /** Fill in when there is a measured result. Renders only when present. */
    outcome?: Localised;
    metrics?: { value: string; label: Localised }[];
}

export interface PortfolioProject {
    slug: string;
    name: string;
    url: string;
    category: Localised;
    description: Localised;
    /** Verified from HTTP headers / markup. Leave empty rather than guessing. */
    stack: string[];
    /** Year the site went live. Fill in as you confirm each one. */
    year?: string;
    /** Optional local screenshot at /public/portfolio/<file>. Falls back to thum.io. */
    image?: string;
    featured?: boolean;
    caseStudy: CaseStudy;
}

export interface PortfolioTool {
    slug: string;
    name: string;
    href: string;
    /** External tools open in a new tab; internal ones route inside the app. */
    external: boolean;
    /** Internal links that need the active locale segment, e.g. /en/efficiency-index */
    localisedHref?: boolean;
    category: Localised;
    description: Localised;
    status: Localised;
}

/** Every site here was designed and built by Safar end to end. */
const SOLO_ROLE: Localised = {
    en: "Designed and built end to end: direction, copy, design, build, deploy.",
    ru: "Сделан целиком: направление, тексты, дизайн, разработка, деплой.",
};

/** Re-exported so existing imports keep working; the value lives in lib/pricing.ts. */
export { WEBSITE_FROM_PRICE };

export const projects: PortfolioProject[] = [
    {
        slug: "beautasy",
        name: "Beautasy Atelier",
        url: "https://beautasy.co.uk/atelier",
        category: { en: "Beauty", ru: "Бьюти" },
        description: {
            en: "Southampton alterations atelier with published prices and online booking",
            ru: "Ателье в Саутгемптоне: открытый прайс и запись онлайн",
        },
        stack: ["Next.js", "Vercel"],
        featured: true,
        caseStudy: {
            lede: {
                en: "Every alterations customer arrives with the same two questions and most atelier websites answer neither: how much, and how long. This one publishes the price list and the turnaround times, which removes the phone call that was standing between a visitor and a booking.",
                ru: "Каждый клиент ателье приходит с одними и теми же двумя вопросами, и большинство сайтов ателье не отвечают ни на один: сколько стоит и сколько ждать. Здесь опубликован прайс и сроки — это убирает звонок, который стоял между посетителем и записью.",
            },
            role: SOLO_ROLE,
            built: [
                {
                    en: "A published price guide with real figures per job. Shortening jeans £15.50, waist adjustment £22.00, zip replacement £18.00, grouped into denim, dresses, coats and home textiles.",
                    ru: "Опубликованный прайс с реальными цифрами по работам — подшив джинсов £15.50, талия £22.00, замена молнии £18.00 — сгруппированный по джинсам, платьям, верхней одежде и домашнему текстилю.",
                },
                {
                    en: "An honest caveat under the table: delicate fabrics and complex construction are quoted on inspection. It protects the atelier without hiding the numbers.",
                    ru: "Честная оговорка под таблицей: деликатные ткани и сложный крой считаются по осмотру. Это защищает ателье, не пряча цифры.",
                },
                {
                    en: "A three-step process written in the atelier's own voice, tea included: book or visit, fitting and pinning, collection.",
                    ru: "Процесс из трёх шагов — запись или визит, примерка и подколка, выдача — написанный голосом самого ателье, с чаем.",
                },
                {
                    en: "Three service tiers with stated turnaround: custom sewing 2–4 weeks, repairs 1–2 weeks, alterations by fitting.",
                    ru: "Три уровня услуг с указанными сроками: пошив на заказ 2–4 недели, ремонт 1–2 недели, подгонка по примерке.",
                },
                {
                    en: "A booking form that asks for service type and preferred date up front, so the first reply can be a confirmation rather than a question.",
                    ru: "Форма записи, которая сразу спрашивает тип услуги и удобную дату, чтобы первый ответ был подтверждением, а не вопросом.",
                },
                {
                    en: "Wired into the wider Beautasy shop with gift boxes, gift cards, worldwide shipping and free UK delivery over £50, so the atelier feeds the store and back.",
                    ru: "Связано с основным магазином Beautasy — подарочные боксы, сертификаты, доставка по миру, бесплатно по UK от £50 — так ателье питает магазин и наоборот.",
                },
            ],
            facts: [
                { label: { en: "Sector", ru: "Сектор" }, value: { en: "Atelier / retail", ru: "Ателье / ритейл" } },
                { label: { en: "Location", ru: "Город" }, value: { en: "Southampton, UK", ru: "Саутгемптон, UK" } },
                { label: { en: "Prices", ru: "Цены" }, value: { en: "Published", ru: "Открыты" } },
                { label: { en: "Hosting", ru: "Хостинг" }, value: { en: "Vercel", ru: "Vercel" } },
            ],
        },
    },
    {
        slug: "vedovec",
        name: "Vedovec",
        url: "https://vedovec.uz/en",
        category: { en: "Logistics", ru: "Логистика" },
        description: {
            en: "Customs broker in Uzbekistan: clearance, FEA consulting, certification",
            ru: "Таможенный брокер в Узбекистане — оформление, ВЭД-консалтинг, сертификация",
        },
        stack: ["Next.js", "RU / EN / UZ"],
        caseStudy: {
            lede: {
                en: "A customs broker's website has exactly one job: convince an importer their cargo will clear without penalties, adjustments or a week in a bonded warehouse. Vague promises do the opposite. So every service on this site carries a stated turnaround, and every case is written as challenge and result, not as praise.",
                ru: "У сайта таможенного брокера ровно одна задача: убедить импортёра, что груз пройдёт без штрафов, корректировок и недели на СВХ. Обтекаемые обещания работают против этого. Поэтому у каждой услуги здесь указан срок, а каждый кейс написан как задача и результат, а не как похвала.",
            },
            role: SOLO_ROLE,
            built: [
                {
                    en: "Three complete locales in Russian, English and Uzbek, each on its own route, not a widget bolted onto one language.",
                    ru: "Три полноценные локали — русская, английская и узбекская — каждая на своём маршруте, а не виджет-переключатель поверх одного языка.",
                },
                {
                    en: "Six services, each with an explicit duration: \"1–3 business days\" where the timeline is known, \"determined individually\" where it honestly is not.",
                    ru: "Шесть услуг, у каждой явный срок: «1–3 рабочих дня» там, где он известен, и «определяется индивидуально» там, где его честно нет.",
                },
                {
                    en: "A case library structured as Challenge → Result, tagged by sector (FMCG, dairy, confectionery, high-tech equipment), so a visitor can find their own cargo type.",
                    ru: "Библиотека кейсов в структуре «Задача → Результат» с тегами по отраслям — FMCG, молочка, кондитерка, высокотехнологичное оборудование — чтобы посетитель нашёл свой тип груза.",
                },
                {
                    en: "News and About sections, so regulatory changes have somewhere to live without a redesign.",
                    ru: "Разделы новостей и «О компании», чтобы изменения в регулировании было куда класть без переделки сайта.",
                },
                {
                    en: "Phone number in the header alongside a persistent request CTA. A broker's leads arrive by phone as often as by form.",
                    ru: "Телефон в шапке рядом с постоянной кнопкой заявки — к брокеру лиды приходят по телефону не реже, чем через форму.",
                },
            ],
            facts: [
                { label: { en: "Sector", ru: "Сектор" }, value: { en: "Customs brokerage", ru: "Таможенное оформление" } },
                { label: { en: "Languages", ru: "Языки" }, value: { en: "RU / EN / UZ", ru: "RU / EN / UZ" } },
                { label: { en: "Services", ru: "Услуг" }, value: { en: "6, each timed", ru: "6, каждая со сроком" } },
                { label: { en: "Hosting", ru: "Хостинг" }, value: { en: "Self-hosted nginx", ru: "Свой сервер, nginx" } },
            ],
            note: {
                en: "Open item: on the English route, one service still shows its duration in Uzbek, \"Muddatlar individual tarzda belgilanadi\". One missing translation key.",
                ru: "Открытый пункт: на английском маршруте у одной услуги срок всё ещё выводится по-узбекски — «Muddatlar individual tarzda belgilanadi». Один непереведённый ключ.",
            },
        },
    },
    {
        slug: "getwebpage",
        name: "GetWebPage",
        url: "https://getwebpage.co.uk",
        category: { en: "Web Studio", ru: "Веб-студия" },
        description: {
            en: `UK web studio — a serious site in 7 days, from ${WEBSITE_FROM_PRICE}`,
            ru: `Веб-студия в UK — рабочий сайт за 7 дней, от ${WEBSITE_FROM_PRICE}`,
        },
        stack: ["Next.js", "Vercel"],
        caseStudy: {
            lede: {
                en: "Small businesses do not avoid agencies because of price. They avoid them because nobody will say what the price is, when it lands, or what happens if they want to leave. GetWebPage is the same web work sold as a product: fixed tiers, fixed delivery, and full ownership transferred on day seven.",
                ru: "Малый бизнес избегает агентств не из-за цены. Он избегает их потому, что никто не называет цену, срок и что будет, если захочется уйти. GetWebPage — та же работа, проданная как продукт: фиксированные пакеты, фиксированный срок и полная передача прав на седьмой день.",
            },
            role: {
                en: "My own studio brand. Positioning, pricing model, copy, design and build.",
                ru: "Мой собственный бренд-студия: позиционирование, модель цен, тексты, дизайн и разработка.",
            },
            built: [
                {
                    en: `Four priced tiers — ${WEBSITE_FROM_PRICE} / £800 / £1,200 / £1,500+ — each with its own scope list and delivery window, so nobody has to request a quote to find out if they can afford it.`,
                    ru: `Четыре пакета с ценой — ${WEBSITE_FROM_PRICE} / £800 / £1 200 / £1 500+ — у каждого свой состав и срок, чтобы не приходилось запрашивать смету ради ответа «по карману ли».`,
                },
                {
                    en: "A three-step process block (Brief, Build, Launch) with the preview promised on day three, which is the moment clients actually worry about.",
                    ru: "Блок процесса из трёх шагов — бриф, сборка, запуск — с превью на третий день: именно этого момента клиенты и боятся.",
                },
                {
                    en: "Selected-work grid linking straight to live client sites, not to mockups.",
                    ru: "Сетка избранных работ со ссылками на живые клиентские сайты, а не на макеты.",
                },
                {
                    en: "An ownership block written directly against the objection agencies create: no monthly fees, no lock-in, domain and code transferred outright.",
                    ru: "Блок про владение, написанный прямо против возражения, которое создают агентства: без абонплаты, без привязки, домен и код передаются полностью.",
                },
                {
                    en: "Copy included in every tier and written from the client's brief. It is the line item most studios charge separately for and most clients dread.",
                    ru: "Тексты входят в каждый пакет и пишутся по брифу клиента — та строка сметы, которую студии обычно продают отдельно, а клиенты боятся больше всего.",
                },
                {
                    en: "A custom-brief form for anything outside the tiers, so complex work has a door that isn't the pricing table.",
                    ru: "Форма произвольного брифа для всего, что не влезает в пакеты, — чтобы у сложных задач была своя дверь помимо прайса.",
                },
            ],
            facts: [
                { label: { en: "Sector", ru: "Сектор" }, value: { en: "Web studio", ru: "Веб-студия" } },
                { label: { en: "Market", ru: "Рынок" }, value: { en: "UK small business", ru: "Малый бизнес UK" } },
                { label: { en: "Tiers", ru: "Пакетов" }, value: { en: "4, priced publicly", ru: "4, цены открыты" } },
                { label: { en: "Delivery", ru: "Срок" }, value: { en: "5–7 days", ru: "5–7 дней" } },
            ],
            testimonial: {
                quote: {
                    en: "Genuinely couldn't believe how fast it was. The site looks better than anything I've seen from agencies charging triple.",
                    ru: "Честно не верила, что так быстро. Сайт выглядит лучше всего, что я видела у агентств за тройную цену.",
                },
                author: {
                    en: "Beautasy studio owner · Southampton, UK",
                    ru: "Владелица студии Beautasy · Саутгемптон, Великобритания",
                },
            },
        },
    },
    {
        slug: "cpowatchtower",
        name: "CPO Watchtower",
        url: "https://cpo-watchtower.co.uk",
        category: { en: "Procurement", ru: "Закупки" },
        description: {
            en: "Supply-chain risk board: macro, peers and suppliers read together",
            ru: "Панель рисков цепочки поставок — макро, конкуренты и поставщики вместе",
        },
        stack: ["Next.js", "Vercel"],
        caseStudy: {
            lede: {
                en: "This is not a landing page. It is a running product. A procurement director's morning question is \"what changed and does it need me today?\", and answering it normally means four tabs and a Bloomberg terminal. Watchtower folds macro indicators, peer news and a supplier watchlist into one screen and commits to a position, with the reason attached.",
                ru: "Это не лендинг, а работающий продукт. Утренний вопрос директора по закупкам — «что изменилось и требует ли это меня сегодня», и обычно ответ собирается из четырёх вкладок и терминала. Watchtower сводит макро-показатели, новости по конкурентам и лист поставщиков в один экран и занимает позицию, приложив к ней обоснование.",
            },
            role: SOLO_ROLE,
            built: [
                {
                    en: "Three pillars on one screen: macro overview, peers and competitors, supplier watchlist. Each carries its own status, so a green overall never hides an amber part.",
                    ru: "Три опоры на одном экране — макро, конкуренты, лист поставщиков — у каждой свой статус, чтобы общий зелёный не прятал жёлтую часть.",
                },
                {
                    en: "A macro panel per buying region carrying inflation, policy rate and currency movement, each expandable into a written read of the conditions instead of a bare number.",
                    ru: "Макро-панель по каждому региону закупок с инфляцией, ставкой и движением валюты — каждая раскрывается в текстовую интерпретацию условий, а не в голую цифру.",
                },
                {
                    en: "A configurable supplier watchlist where every entry carries criticality, dependency level and country, plus the country risks that actually apply to it.",
                    ru: "Настраиваемый лист поставщиков, где у каждой позиции своя критичность, уровень зависимости и страна, плюс страновые риски, которые к ней реально применимы.",
                },
                {
                    en: "A written status summary that names its drivers and ends with one concrete next step and a deadline, not a colour and a shrug.",
                    ru: "Текстовое резюме статуса, которое называет причины и заканчивается одним конкретным следующим шагом со сроком, а не цветом и пожатием плеч.",
                },
                {
                    en: "A stability counter that reads \"status unchanged for 18h\", so a quiet board looks genuinely quiet rather than stale.",
                    ru: "Счётчик стабильности — «статус не менялся 18 ч» — чтобы спокойная панель читалась как реально спокойная, а не как зависшие данные.",
                },
                {
                    en: "Timestamped refresh and a visible build hash: you can always tell how old the picture is.",
                    ru: "Отметка времени обновления и видимый хеш сборки: всегда понятно, насколько картинка свежая.",
                },
            ],
            facts: [
                { label: { en: "Type", ru: "Тип" }, value: { en: "Live dashboard", ru: "Живой дашборд" } },
                { label: { en: "Watchlist", ru: "Лист поставщиков" }, value: { en: "Configurable", ru: "Настраиваемый" } },
                { label: { en: "Dataset", ru: "Данные" }, value: { en: "Sample", ru: "Демонстрационные" } },
                { label: { en: "Hosting", ru: "Хостинг" }, value: { en: "Vercel", ru: "Vercel" } },
            ],
            note: {
                en: "Technically the most substantial thing in the portfolio, and it used to be described in four words. The public board runs on a sample supplier and peer set. It is a working template, not anyone's live book of business. The geopolitical layer is still marked beta.",
                ru: "Технически самая серьёзная работа в портфолио, а описывалась она четырьмя словами. Публичная панель работает на демонстрационном наборе поставщиков и конкурентов — это рабочий шаблон, а не чья-либо живая база закупок. Геополитический слой пока помечен как бета.",
            },
        },
    },
    {
        slug: "bektothefuture",
        name: "Bek to the Future",
        url: "https://bektothefuture.com",
        category: { en: "Music", ru: "Музыка" },
        description: {
            en: "Tech House DJ personal brand and booking page",
            ru: "Личный бренд Tech House DJ и страница букинга",
        },
        stack: ["Vercel"],
        caseStudy: {
            lede: {
                en: "A DJ's website is a booking tool wearing a poster's clothes. A promoter needs the sound in ten seconds and the room history in thirty. The page is ordered exactly that way: hear it, believe it, book it.",
                ru: "Сайт диджея — это инструмент букинга в одежде афиши. Промоутеру нужен звук за десять секунд и история площадок за тридцать. Страница выстроена ровно в этом порядке: услышал, поверил, забукал.",
            },
            role: SOLO_ROLE,
            built: [
                {
                    en: "Identity written as a story rather than a bio: office professional by day, Bukhara roots, now a fixture in Tashkent nightlife.",
                    ru: "Идентичность написана историей, а не биографией: офисный профессионал днём, корни из Бухары, сейчас — постоянное имя в ночном Ташкенте.",
                },
                {
                    en: "Two audio embeds serving different needs: SoundCloud for mixes and originals, Mixcloud for broadcasts and full live sets.",
                    ru: "Два аудиоблока под разные задачи: SoundCloud для миксов и оригиналов, Mixcloud для эфиров и полных живых сетов.",
                },
                {
                    en: "Playlists sorted by occasion, not by genre alone: Focus Mode, Cafe & Bar Vibes, Late Night Drive. That is how a venue actually books music.",
                    ru: "Плейлисты разложены по поводу, а не только по жанру — Focus Mode, Cafe & Bar, Late Night Drive — именно так площадка и подбирает музыку.",
                },
                {
                    en: "A dated performance history carrying the names that do the convincing: Stihia Festival in Muynak, Gravity, Zevon, The Bar and Kultura in Tashkent, Luna Bar in Phu Quoc.",
                    ru: "История выступлений с датами и именами, которые и убеждают: Stihia Festival в Муйнаке, Gravity, Zevon, The Bar и Kultura в Ташкенте, Luna Bar на Фукуоке.",
                },
                {
                    en: "Gallery and a single direct bookings email, with no contact form standing between a promoter and a date.",
                    ru: "Галерея и один прямой email для букинга — никакой формы между промоутером и датой.",
                },
            ],
            facts: [
                { label: { en: "Sector", ru: "Сектор" }, value: { en: "Music / personal brand", ru: "Музыка / личный бренд" } },
                { label: { en: "Dates listed", ru: "Дат в афише" }, value: { en: "7 venues & festivals", ru: "7 площадок и фестивалей" } },
                { label: { en: "Audio", ru: "Аудио" }, value: { en: "SoundCloud + Mixcloud", ru: "SoundCloud + Mixcloud" } },
                { label: { en: "Hosting", ru: "Хостинг" }, value: { en: "Vercel", ru: "Vercel" } },
            ],
            testimonial: {
                quote: {
                    en: "We had zero online presence. Now we get bookings every day through the site. It paid for itself in the first week.",
                    ru: "У нас не было вообще никакого присутствия онлайн. Теперь букинги приходят через сайт каждый день. Он окупился за первую неделю.",
                },
                author: {
                    en: "DJ & music artist",
                    ru: "Диджей и музыкант",
                },
            },
        },
    },
    {
        slug: "safarisaev",
        name: "Safarisaev.ai",
        url: "https://safarisaev.ai",
        category: { en: "Consulting", ru: "Консалтинг" },
        description: {
            en: "This site: a consulting practice plus three live diagnostic tools",
            ru: "Этот сайт — консалтинговая практика и три живых диагностических инструмента",
        },
        stack: ["Next.js", "Vercel"],
        caseStudy: {
            lede: {
                en: "The site you are on. A consulting practice does not need a brochure. It needs something that qualifies a prospect before the first call. So the centre of this site is three tools a visitor can run alone, each ending in a result worth an email address.",
                ru: "Сайт, на котором вы находитесь. Консалтинговой практике не нужна брошюра — ей нужно то, что квалифицирует клиента до первого созвона. Поэтому в центре сайта три инструмента, которые посетитель проходит сам, и каждый заканчивается результатом, за который не жалко оставить почту.",
            },
            role: {
                en: "Everything: practice positioning, tool design, scoring models, PDF reports, build.",
                ru: "Всё: позиционирование практики, дизайн инструментов, модели скоринга, PDF-отчёты, разработка.",
            },
            built: [
                {
                    en: "Efficiency Index: ten procurement questions that score operational waste and turn it into a currency figure against the visitor's own revenue.",
                    ru: "Efficiency Index — десять вопросов по закупкам, которые считают операционные потери и переводят их в деньги от оборота самого посетителя.",
                },
                {
                    en: "AI Velocity Index: a second assessment with separate question sets for measuring yourself and for measuring your team.",
                    ru: "AI Velocity Index — вторая диагностика с раздельными наборами вопросов: для себя и для команды.",
                },
                {
                    en: "Cellar: an AI sourcing desk for fine wine, backed by an edge API route that returns a buy / hold / wait signal with market context.",
                    ru: "Cellar — AI-стол закупок вина на edge-роуте, который возвращает сигнал buy / hold / wait с рыночным контекстом.",
                },
                {
                    en: "Client-side PDF report generation with an embedded Cyrillic font, so a Russian-language result renders correctly without a server round-trip.",
                    ru: "Генерация PDF-отчётов на клиенте со встроенным кириллическим шрифтом — русский результат печатается корректно без обращения к серверу.",
                },
                {
                    en: "Full EN / RU throughout, with theme and language preference persisted across pages.",
                    ru: "Полные EN / RU по всему сайту, тема и язык сохраняются между страницами.",
                },
                {
                    en: "A public legal record page naming the operating company, its registration and its registered office.",
                    ru: "Публичная страница реквизитов с названием операционной компании, регистрацией и юридическим адресом.",
                },
            ],
            facts: [
                { label: { en: "Stack", ru: "Стек" }, value: { en: "Next.js 14 App Router", ru: "Next.js 14, App Router" } },
                { label: { en: "Tools", ru: "Инструментов" }, value: { en: "3, all live", ru: "3, все работают" } },
                { label: { en: "Languages", ru: "Языки" }, value: { en: "EN / RU", ru: "EN / RU" } },
                { label: { en: "Hosting", ru: "Хостинг" }, value: { en: "Vercel", ru: "Vercel" } },
            ],
        },
    },
    {
        slug: "silkbees",
        name: "Silk Bees",
        url: "https://silkbees.co.uk",
        category: { en: "AgriTech", ru: "АгроТех" },
        description: {
            en: "Wholesale beekeeping export from Uzbekistan to the UK",
            ru: "Оптовый экспорт продуктов пчеловодства из Узбекистана в Великобританию",
        },
        stack: ["Vercel"],
        caseStudy: {
            lede: {
                en: "A wholesale exporter selling live queen bees into the UK has to clear two doubts before anyone replies to an email: is the stock genuinely what you say it is, and will the paperwork survive customs. The site is built to answer both above the fold and put an enquiry one tap away.",
                ru: "Оптовому экспортёру, который поставляет живых пчеломаток в Великобританию, нужно снять два сомнения ещё до первого письма: действительно ли товар тот, за который его выдают, и переживёт ли документация таможню. Сайт отвечает на оба вопроса на первом экране и держит заявку в одно касание.",
            },
            role: SOLO_ROLE,
            built: [
                {
                    en: "One-page structure that follows a buyer's questions in order: story, products, why us, gallery, contact.",
                    ru: "Одностраничная структура, повторяющая порядок вопросов покупателя: история, продукты, почему мы, галерея, контакт.",
                },
                {
                    en: "Two product lines presented as separate spec blocks: Carpathian queen bees with an April–August dispatch window, and raw high-altitude wildflower honey.",
                    ru: "Два продукта как отдельные спеки — карпатские матки с окном отправки апрель–август и сырой высокогорный разнотравный мёд.",
                },
                {
                    en: "Compliance turned into a selling point instead of fine print: CITES, UK health certification, APHA export paperwork and lab certification shown as badges on each product.",
                    ru: "Комплаенс вынесен из мелкого шрифта в аргумент: CITES, британская ветеринарная сертификация, документы APHA и лабораторные протоколы стоят бейджами на каждом продукте.",
                },
                {
                    en: "Credibility numbers carried in the story block: 10,000 active colonies, third-generation family operation, 2,000 m altitude.",
                    ru: "Цифры доверия в блоке истории — 10 000 действующих семей, третье поколение семьи, высота 2 000 м.",
                },
                {
                    en: "Two enquiry paths side by side: WhatsApp for speed, a form for procurement departments that need a paper trail.",
                    ru: "Два пути заявки рядом: WhatsApp для скорости и форма для отделов закупок, которым нужен след в переписке.",
                },
            ],
            facts: [
                { label: { en: "Sector", ru: "Сектор" }, value: { en: "Wholesale export", ru: "Оптовый экспорт" } },
                { label: { en: "Market", ru: "Рынок" }, value: { en: "Uzbekistan → UK", ru: "Узбекистан → UK" } },
                { label: { en: "Format", ru: "Формат" }, value: { en: "Single page", ru: "Одна страница" } },
                { label: { en: "Hosting", ru: "Хостинг" }, value: { en: "Vercel", ru: "Vercel" } },
            ],
            note: {
                en: "Open item: the live site currently renders the text \"Place queens.jpg in media/images/\" where the product photography belongs. The image tags are still commented out in the markup. Three product shots would close it. Until then this is the weakest screenshot in the portfolio, and it is the featured one.",
                ru: "Открытый пункт: на живом сайте вместо фотографий продуктов выводится текст «Place queens.jpg in media/images/» — теги изображений всё ещё закомментированы в разметке. Закрывается тремя фотографиями. Пока это самый слабый скриншот в портфолио — и он же вынесен в featured.",
            },
        },
    },
];

/**
 * Tools built and run in-house. These are products, not client work, so they get
 * their own section — and it gives /cellar an entry point it never had.
 */
export const tools: PortfolioTool[] = [
    {
        slug: "efficiency-index",
        name: "Efficiency Index",
        href: "/efficiency-index",
        external: false,
        localisedHref: true,
        category: { en: "Diagnostic", ru: "Диагностика" },
        description: {
            en: "Ten questions that put a number on hidden operational waste, with a PDF report",
            ru: "Десять вопросов, которые оцифровывают скрытые операционные потери, с PDF-отчётом",
        },
        status: { en: "Live", ru: "Работает" },
    },
    {
        slug: "ai-velocity-index",
        name: "AI Velocity Index",
        href: "/ai-velocity-index",
        external: false,
        localisedHref: true,
        category: { en: "Diagnostic", ru: "Диагностика" },
        description: {
            en: "Scores how far you are from User to Architect, for yourself or your team",
            ru: "Оценивает путь от «Пользователя» до «Архитектора» — для себя или команды",
        },
        status: { en: "Live", ru: "Работает" },
    },
    {
        slug: "cellar",
        name: "Cellar",
        href: "/cellar",
        external: false,
        category: { en: "AI Agent", ru: "AI-агент" },
        description: {
            en: "Fine wine sourcing desk: name a wine, get a buy/hold/wait signal from live market context",
            ru: "Стол закупок вина — называете вино, получаете сигнал buy/hold/wait по рыночному контексту",
        },
        status: { en: "Beta", ru: "Бета" },
    },
    {
        slug: "getwebpage-tool",
        name: "GetWebPage",
        href: "https://getwebpage.co.uk",
        external: true,
        category: { en: "Productised service", ru: "Продуктовая услуга" },
        description: {
            en: `Fixed-scope website packages from ${WEBSITE_FROM_PRICE}, delivered in seven days`,
            ru: `Пакеты сайтов с фиксированным объёмом от ${WEBSITE_FROM_PRICE}, срок — семь дней`,
        },
        status: { en: "Live", ru: "Работает" },
    },
];

/** Screenshot fallback for projects without a local image. */
export function screenshotUrl(url: string) {
    return `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;
}

export function projectImage(project: PortfolioProject) {
    return project.image ? `/portfolio/${project.image}` : screenshotUrl(project.url);
}

export function getProject(slug: string) {
    return projects.find((project) => project.slug === slug);
}

/** Previous / next in portfolio order, wrapping at both ends. */
export function getNeighbours(slug: string) {
    const index = projects.findIndex((project) => project.slug === slug);
    if (index === -1) return { previous: undefined, next: undefined, index: -1 };
    return {
        previous: projects[(index - 1 + projects.length) % projects.length],
        next: projects[(index + 1) % projects.length],
        index,
    };
}

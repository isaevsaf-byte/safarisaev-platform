import { MetadataRoute } from 'next';
import { projects } from '@/lib/portfolioData';
import { LOCALES } from '@/lib/locale';

const baseUrl = 'https://safarisaev.ai';

/** A localised path emitted once per language, with alternates for each. */
function localised(
    path: string,
    priority: number,
    changeFrequency: 'monthly' | 'yearly' = 'monthly'
): MetadataRoute.Sitemap {
    const languages = Object.fromEntries(
        LOCALES.map((lang) => [lang, `${baseUrl}/${lang}${path}`])
    );
    return LOCALES.map((lang) => ({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: { languages },
    }));
}

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date();

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...localised('/portfolio', 0.8),
        ...projects.flatMap((project) => localised(`/portfolio/${project.slug}`, 0.7)),
        ...localised('/efficiency-index', 0.9),
        ...localised('/ai-velocity-index', 0.9),
        ...localised('/protocols', 0.7),
        ...localised('/resources', 0.7),
        ...localised('/intelligence', 0.7),
        {
            // Live tool, previously unreachable: no inbound link and no sitemap entry.
            url: `${baseUrl}/cellar`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/legal`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjects, getProject } from '@/data/projects';
import { dicts, basePath, type Locale } from '@/i18n/dict';
import ProjectView from '@/components/ProjectView';

const SITE_URL = 'https://abzalt1.dev';

// Shared by /projects/[slug] and /en/projects/[slug].
export function projectStaticParams(locale: Locale) {
    return getProjects(locale).map((p) => ({ slug: p.slug }));
}

export function projectMetadata(slug: string, locale: Locale): Metadata {
    const project = getProject(slug, locale);
    if (!project) return {};

    const name = project.titleLines.join(' ');
    const title = `${name} — ${dicts[locale].project.titleSuffix} | abzalt1.dev`;
    const path = `${basePath(locale)}/projects/${slug}`;
    const image = { url: `/og/${slug}.jpg`, width: 1200, height: 630, alt: name };
    // hreflang only for languages that actually list this case.
    const languages: Record<string, string> = { ru: `/projects/${slug}` };
    if (getProject(slug, 'en')) languages.en = `/en/projects/${slug}`;

    return {
        title,
        description: project.description,
        alternates: { canonical: path, languages },
        openGraph: {
            title,
            description: project.description,
            url: path,
            siteName: 'abzalt1.dev',
            locale: locale === 'en' ? 'en_US' : 'ru_RU',
            type: 'article',
            images: [image],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: project.description,
            creator: '@abzalt1',
            images: [image.url],
        },
    };
}

export function ProjectPageContent({ slug, locale }: { slug: string; locale: Locale }) {
    const project = getProject(slug, locale);
    if (!project) notFound();
    const url = `${SITE_URL}${basePath(locale)}/projects/${slug}`;

    // Ties the case to the Person/Service graph declared in the root layout.
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: project.titleLines.join(' '),
        description: project.description,
        genre: project.category,
        url,
        image: `${SITE_URL}/og/${slug}.jpg`,
        inLanguage: locale,
        creator: { '@id': `${SITE_URL}/#person` },
        keywords: project.stack.map((s) => s.name).join(', '),
        sameAs: project.link,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProjectView slug={slug} />
        </>
    );
}

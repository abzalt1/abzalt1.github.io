import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/data/projects';
import ProjectView from '@/components/ProjectView';

const SITE_URL = 'https://abzalt1.dev';

export const dynamicParams = false;

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};

    const name = project.titleLines.join(' ');
    const title = `${name} — кейс | abzalt1.dev`;
    const path = `/projects/${slug}`;
    const image = { url: `/og/${slug}.jpg`, width: 1200, height: 630, alt: name };

    return {
        title,
        description: project.description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description: project.description,
            url: path,
            siteName: 'abzalt1.dev',
            locale: 'ru_RU',
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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();

    // Ties the case to the Person/Service graph declared in the root layout.
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${SITE_URL}/projects/${slug}#work`,
        name: project.titleLines.join(' '),
        description: project.description,
        genre: project.category,
        url: `${SITE_URL}/projects/${slug}`,
        image: `${SITE_URL}/og/${slug}.jpg`,
        inLanguage: 'ru',
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

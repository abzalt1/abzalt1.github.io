import type { Metadata } from 'next';
import { projectStaticParams, projectMetadata, ProjectPageContent } from '@/components/projectPage';

export const dynamicParams = false;

export function generateStaticParams() {
    return projectStaticParams('en');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    return projectMetadata((await params).slug, 'en');
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    return <ProjectPageContent slug={(await params).slug} locale="en" />;
}

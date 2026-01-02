import Link from 'next/link';
import { getDevlogBySlug, getAllMiniCrmDevlogs } from '@/lib/devlogs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const devlogs = getAllMiniCrmDevlogs();
  return devlogs.map((devlog) => ({
    slug: devlog.slug,
  }));
}

export default async function DevlogPage({ params }: PageProps) {
  const { slug } = await params;
  const devlog = getDevlogBySlug(slug);

  if (!devlog) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={'/projects/mini-crm'} className="text-blue-600 hover:text-blue-700 underline">
          ← Back
        </Link>
      </div>

      <article className="prose max-w-none">
        {devlog.date && <p className="text-gray-600">{devlog.date}</p>}
        <MDXRemote source={devlog.content} />
      </article>
    </main>
  );
}

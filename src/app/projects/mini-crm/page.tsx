import Link from 'next/link';
import { getAllMiniCrmDevlogs } from '@/lib/devlogs';

export default function MiniCrmPage() {
  const devlogs = getAllMiniCrmDevlogs();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={'/'} className="text-blue-600 hover:text-blue-700 underline">
          Home
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">Mini CRM Devlogs</h1>
      
      {devlogs.length === 0 ? (
        <p>No devlogs yet.</p>
      ) : (
        <ul className="space-y-4">
          {devlogs.map((devlog) => (
            <li key={devlog.slug}>
              <Link
                href={`/projects/mini-crm/${devlog.slug}`}
                className="block p-4 border border-gray-200 rounded hover:bg-gray-50"
              >
                <h2 className="text-xl font-semibold mb-2">{devlog.title}</h2>
                {devlog.date && (
                  <p className="text-sm text-gray-600">{devlog.date}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

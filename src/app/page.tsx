import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="">
        <p>This site serves as my personal archive for learning in public and a mechanism for radical accountability. </p>
        <p>I use this space to document the honest build-process of my projects, capturing both the progress in my daily Devlogs and the technical lessons in my TIL (Today I Learned) posts.</p>
        <p>By making my work visible, I prioritize consistent output over perfection and ensure that every challenge solved is documented for the future.</p>
      </div>

      <div className="flex gap-4 my-4 ">
        <Link href={'/projects/mini-crm'} className="underline text-blue-500 hover:text-blue-600">
          Project Mini CRM - Devlog
        </Link>
        {/* <Link href={'/today-i-learned'} className="underline text-blue-500 hover:text-blue-600">
          TILs
        </Link> */}
      </div>
    </main>
  );
}

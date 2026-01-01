import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const devlogsDirectory = path.join(process.cwd(), 'src/content/devlogs/mini-crm');

export interface DevlogMetadata {
  title: string;
  date: string;
  tags: string[];
  slug: string;
}

export interface Devlog extends DevlogMetadata {
  content: string;
}

export function getAllMiniCrmDevlogs(): DevlogMetadata[] {
  if (!fs.existsSync(devlogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(devlogsDirectory);
  const mdFiles = fileNames.filter((name) => name.endsWith('.md'));

  const allDevlogs = mdFiles
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(devlogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      // Convert date to string if it's a Date object
      let dateString = '';
      if (data.date) {
        if (data.date instanceof Date) {
          dateString = data.date.toISOString().split('T')[0];
        } else {
          dateString = String(data.date);
        }
      }

      return {
        title: data.title || 'Untitled',
        date: dateString,
        tags: data.tags || [],
        slug,
      } as DevlogMetadata;
    })
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return allDevlogs;
}

export function getDevlogBySlug(slug: string): Devlog | null {
  const fullPath = path.join(devlogsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert date to string if it's a Date object
  let dateString = '';
  if (data.date) {
    if (data.date instanceof Date) {
      dateString = data.date.toISOString().split('T')[0];
    } else {
      dateString = String(data.date);
    }
  }

  return {
    title: data.title || 'Untitled',
    date: dateString,
    tags: data.tags || [],
    slug,
    content,
  };
}

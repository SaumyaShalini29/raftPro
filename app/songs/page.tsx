import { getTracks, getUniqueGenres, getUniqueMoods } from '@/lib/data';
import { SongsListClient } from '@/components/SongsListClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Songs | Indie Music Directory',
  description: 'Discover indie music tracks by genre, mood, and year. Browse our curated collection of independent artists.',
  openGraph: {
    title: 'Songs | Indie Music Directory',
    description: 'Discover indie music tracks by genre, mood, and year.',
    type: 'website',
  },
};

export default async function SongsPage() {
  const tracks = await getTracks();
  const genres = getUniqueGenres(tracks);
  const moods = getUniqueMoods(tracks);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Discover Indie Music
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Explore our collection of independent music tracks. Filter by genre and mood,
            search for your favorite artists, and discover your next favorite song.
          </p>
        </div>

        {/* Songs List with Filters */}
        <SongsListClient tracks={tracks} genres={genres} moods={moods} />
      </div>
    </main>
  );
}

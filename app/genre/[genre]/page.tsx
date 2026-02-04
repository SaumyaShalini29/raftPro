import { getTracks, getUniqueGenres } from '@/lib/data';
import { Track, Genre } from '@/lib/types';
import { SongCard } from '@/components/SongCard';
import { Metadata } from 'next';
import Link from 'next/link';

interface GenrePageProps {
  params: {
    genre: string;
  };
}

const genreDescriptions: Record<string, string> = {
  Indie: 'Independent artists breaking boundaries with creative, authentic sound. Discover emerging talent and unique perspectives.',
  Pop: 'Catchy melodies and infectious rhythms. Pop tracks that captivate and energize your day.',
  Rock: 'Powerful guitars and raw energy. Rock music that speaks to the soul.',
  'Lo-fi': 'Chill beats and nostalgic vibes. Perfect for studying, relaxing, or just unwinding.',
  Folk: 'Acoustic storytelling and traditional roots. Folk music with heart and history.',
  Alternative: 'Bold experimentation and genre-blending sounds. Music that challenges the norm.',
};

export async function generateStaticParams() {
  const tracks = await getTracks();
  const genres = getUniqueGenres(tracks);

  return genres.map((genre) => ({
    genre: genre.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: GenrePageProps): Promise<Metadata> {
  const { genre } = await params;
  const genreDecoded = decodeURIComponent(genre)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const tracks = await getTracks();
  const matchingTracks = tracks.filter((track: Track) => track.genre === genreDecoded);

  return {
    title: `${genreDecoded} Music | Indie Music Directory`,
    description: `Discover the best ${genreDecoded.toLowerCase()} indie music tracks. Browse ${matchingTracks.length} tracks from independent artists.`,
    openGraph: {
      title: `Best ${genreDecoded} Indie Music`,
      description: `Explore ${matchingTracks.length} ${genreDecoded.toLowerCase()} tracks from the Indie Music Directory.`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${genreDecoded} Music | Indie Music Directory`,
      description: `Discover ${matchingTracks.length} ${genreDecoded.toLowerCase()} indie music tracks.`,
    },
  };
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { genre } = await params;
  const tracks = await getTracks();

  const genreDecoded = decodeURIComponent(genre)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const matchingTracks = tracks.filter((track: Track) => track.genre === genreDecoded);
  const description = genreDescriptions[genreDecoded] || `Explore ${genreDecoded.toLowerCase()} indie music tracks.`;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <Link
          href="/songs"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mb-8 transition-colors group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to All Songs
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-semibold text-sm">
              Genre
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {matchingTracks.length} track{matchingTracks.length !== 1 ? 's' : ''}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Best {genreDecoded} Songs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Songs Grid */}
        {matchingTracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matchingTracks.map((track: Track) => (
              <SongCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <svg
              className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tracks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              We don't have any {genreDecoded.toLowerCase()} tracks yet.
            </p>
            <Link
              href="/songs"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Browse All Songs
            </Link>
          </div>
        )}

        {/* Exploration CTA */}
        {matchingTracks.length > 0 && (
          <div className="mt-16 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Explore More Genres
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Discover {genreDecoded.toLowerCase()} music across different moods or explore other genres.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/songs"
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
              >
                View All Songs
              </Link>
              <Link
                href="/mood"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Browse by Mood
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

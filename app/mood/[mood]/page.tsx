import { getTracks, getUniqueMoods } from '@/lib/data';
import { Track, Mood } from '@/lib/types';
import { SongCard } from '@/components/SongCard';
import { Metadata } from 'next';
import Link from 'next/link';

interface MoodPageProps {
  params: {
    mood: string;
  };
}

const moodDescriptions: Record<string, string> = {
  Chill: 'Relax and unwind with our curated collection of chill tracks. Perfect for background listening, studying, or simply taking a break.',
  Sad: 'Dive into emotional, introspective music that speaks to the heart. Songs for reflective moments and deep feelings.',
  Energetic: 'Get pumped up with high-energy tracks that inspire and motivate. Perfect for workouts, parties, or when you need an adrenaline boost.',
  Focus: 'Boost your productivity with focus-friendly tracks designed for concentration. Ideal for work, studying, or creative sessions.',
};

export async function generateStaticParams() {
  const tracks = await getTracks();
  const moods = getUniqueMoods(tracks);

  return moods.map((mood) => ({
    mood: mood.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: MoodPageProps): Promise<Metadata> {
  const { mood } = await params;
  const moodDecoded = decodeURIComponent(mood)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const tracks = await getTracks();
  const matchingTracks = tracks.filter((track: Track) => track.mood === moodDecoded);

  return {
    title: `${moodDecoded} Music | Indie Music Directory`,
    description: `Discover the best ${moodDecoded.toLowerCase()} indie music tracks. Browse ${matchingTracks.length} tracks to match your mood.`,
    openGraph: {
      title: `Best ${moodDecoded} Indie Music`,
      description: `Explore ${matchingTracks.length} ${moodDecoded.toLowerCase()} indie music tracks perfect for your mood.`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${moodDecoded} Music | Indie Music Directory`,
      description: `Discover ${matchingTracks.length} ${moodDecoded.toLowerCase()} indie music tracks.`,
    },
  };
}

export default async function MoodPage({ params }: MoodPageProps) {
  const { mood } = await params;
  const tracks = await getTracks();

  const moodDecoded = decodeURIComponent(mood)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const matchingTracks = tracks.filter((track: Track) => track.mood === moodDecoded);
  const description = moodDescriptions[moodDecoded] || `Explore ${moodDecoded.toLowerCase()} indie music tracks.`;

  const moodIcon: Record<string, string> = {
    Chill: '🧊',
    Sad: '💙',
    Energetic: '⚡',
    Focus: '🎯',
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 font-semibold text-sm">
              <span>{moodIcon[moodDecoded] || '🎵'}</span>
              Mood
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {matchingTracks.length} track{matchingTracks.length !== 1 ? 's' : ''}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Best {moodDecoded} Tracks
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
              We don't have any {moodDecoded.toLowerCase()} tracks yet.
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
              Explore More Moods
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Discover {moodDecoded.toLowerCase()} music across different genres or explore other moods.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/songs"
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
              >
                View All Songs
              </Link>
              <Link
                href="/genre"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Browse by Genre
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

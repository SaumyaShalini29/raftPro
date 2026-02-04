import { Metadata } from 'next';
import Link from 'next/link';
import tracks from '@/data/tracks.json';
import { SongCard } from '@/components/SongCard';
import { Track } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Indie Music Directory - Discover Independent Music',
  description:
    'Explore independent music tracks and artists based on genre, mood, and year. Discover your next favorite indie song.',
  openGraph: {
    title: 'Indie Music Directory',
    description:
      'Discover independent music tracks and artists based on genre, mood, and year.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Indie Music Directory',
      },
    ],
  },
};

// Helper to get featured tracks (first 6 sorted by year desc)
function getFeaturedTracks(): Track[] {
  return (tracks as Track[])
    .sort((a, b) => b.releaseYear - a.releaseYear)
    .slice(0, 6);
}

// Helper to get genres with counts
function getGenresWithCounts() {
  const genreMap = new Map<string, number>();
  (tracks as Track[]).forEach((track) => {
    genreMap.set(track.genre, (genreMap.get(track.genre) || 0) + 1);
  });
  return Array.from(genreMap.entries())
    .map(([genre, count]) => ({ genre, count }))
    .sort();
}

// Helper to get moods with counts
function getMoodsWithCounts() {
  const moodMap = new Map<string, number>();
  (tracks as Track[]).forEach((track) => {
    moodMap.set(track.mood, (moodMap.get(track.mood) || 0) + 1);
  });
  return Array.from(moodMap.entries())
    .map(([mood, count]) => ({ mood, count }))
    .sort();
}

const moodEmojis: Record<string, string> = {
  Chill: '🧊',
  Sad: '💙',
  Energetic: '⚡',
  Focus: '🎯',
};

export default function Home() {
  const featuredTracks = getFeaturedTracks();
  const genresWithCounts = getGenresWithCounts();
  const moodsWithCounts = getMoodsWithCounts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Discover Indie Music
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Explore independent music tracks across genres and moods. Find your next favorite song from emerging artists.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/songs"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              Browse All Songs
            </Link>
            <Link
              href="/mood/chill"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Explore by Mood
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-16 border-t border-gray-200 dark:border-slate-700 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {tracks.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Tracks</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {genresWithCounts.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Genres</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {moodsWithCounts.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Moods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tracks Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Featured Tracks
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Latest releases from our collection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredTracks.map((track) => (
            <SongCard key={track.id} track={track} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/songs"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
          >
            View all {tracks.length} tracks
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Browse by Genre Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Browse by Genre
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore music across different genres
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {genresWithCounts.map(({ genre, count }) => (
            <Link
              key={genre}
              href={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 p-8 border border-gray-200 dark:border-slate-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all"
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {genre}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {count} track{count !== 1 ? 's' : ''}
                </p>
                <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Mood Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Browse by Mood
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find music for every feeling
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {moodsWithCounts.map(({ mood, count }) => (
            <Link
              key={mood}
              href={`/mood/${mood.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 p-12 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all"
            >
              {/* Gradient background based on mood */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${
                mood === 'Chill'
                  ? 'bg-cyan-500'
                  : mood === 'Sad'
                    ? 'bg-indigo-500'
                    : mood === 'Energetic'
                      ? 'bg-yellow-500'
                      : 'bg-orange-500'
              }`} />

              <div className="relative z-10 flex items-center gap-4">
                <div className="text-6xl">{moodEmojis[mood] || '🎵'}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {mood}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {count} track{count !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <span className="absolute top-4 right-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Discover?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start exploring independent music curated just for you.
          </p>
          <Link
            href="/songs"
            className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-colors shadow-lg"
          >
            Browse Songs Now
          </Link>
        </div>
      </section>
    </div>
  );
}

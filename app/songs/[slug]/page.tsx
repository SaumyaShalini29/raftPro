import { getTracks, getTrackBySlug } from '@/lib/data';
import { Track } from '@/lib/types';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CoverImage from '@/components/CoverImage';

interface SongPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const tracks = (await getTracks()) as Track[];
  return tracks.map((track) => ({
    slug: track.slug,
  }));
}

export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = await getTrackBySlug(slug);

  if (!track) {
    return {
      title: 'Song Not Found',
    };
  }

  return {
    title: `${track.title} by ${track.artist} | Indie Music Directory`,
    description: `Listen to "${track.title}" by ${track.artist}. Genre: ${track.genre}, Mood: ${track.mood}, Released: ${track.releaseYear}.`,
    openGraph: {
      title: `${track.title} by ${track.artist}`,
      description: `Listen to "${track.title}" by ${track.artist}. Genre: ${track.genre}, Mood: ${track.mood}.`,
      type: 'music.song',
      images: [
        {
          url: track.coverImage,
          width: 300,
          height: 200,
          alt: `${track.title} cover`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${track.title} by ${track.artist}`,
      description: `Listen to "${track.title}" by ${track.artist}.`,
      images: [track.coverImage],
    },
  };
}

const genreColors: Record<string, { badge: string; light: string }> = {
  Indie: { badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', light: 'bg-blue-50 dark:bg-blue-950' },
  Pop: { badge: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200', light: 'bg-pink-50 dark:bg-pink-950' },
  Rock: { badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', light: 'bg-red-50 dark:bg-red-950' },
  'Lo-fi': { badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', light: 'bg-purple-50 dark:bg-purple-950' },
  Folk: { badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', light: 'bg-green-50 dark:bg-green-950' },
  Alternative: { badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200', light: 'bg-amber-50 dark:bg-amber-950' },
};

const moodColors: Record<string, string> = {
  Chill: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  Sad: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  Energetic: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Focus: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

const moodDescriptions: Record<string, string> = {
  Chill: 'Perfect for relaxing and unwinding.',
  Sad: 'Emotional and introspective vibes.',
  Energetic: 'High energy and uplifting.',
  Focus: 'Ideal for concentration and productivity.',
};

export default async function SongDetailPage({ params }: SongPageProps) {
  const { slug } = await params;
  const track = await getTrackBySlug(slug);

  if (!track) {
    notFound();
  }

  const genreColor = genreColors[track.genre] || genreColors.Indie;
  const moodColor = moodColors[track.mood] || moodColors.Chill;
  const moodDescription = moodDescriptions[track.mood];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
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
          Back to Songs
        </Link>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Image Section */}
          <div className="relative w-full h-80 sm:h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600">
            <CoverImage
              src={track.coverImage}
              alt={track.title}
              width={400}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Content Section */}
          <div className={`${genreColor.light} p-8 sm:p-12`}>
            {/* Title and Artist */}
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                {track.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                by <span className="text-gray-900 dark:text-white">{track.artist}</span>
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className={`text-sm font-bold px-4 py-2 rounded-full ${genreColor.badge}`}>
                {track.genre}
              </span>
              <span className={`text-sm font-bold px-4 py-2 rounded-full ${moodColor}`}>
                {track.mood}
              </span>
              <span className="text-sm font-bold px-4 py-2 rounded-full bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-gray-300">
                Released {track.releaseYear}
              </span>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-slate-700">
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                About This Track
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {moodDescription} A {track.genre.toLowerCase()} gem from {track.releaseYear}, perfect for anyone seeking quality independent music.
              </p>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Genre
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {track.genre}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Mood
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {track.mood}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Artist
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {track.artist}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Released
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {track.releaseYear}
                </p>
              </div>
            </div>

            {/* External Link Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={track.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
                Listen on Spotify
              </a>
              <Link
                href="/songs"
                className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Explore More
              </Link>
            </div>
          </div>
        </div>

        {/* Related Info */}
        <div className="mt-12 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            About This Collection
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This track is part of our curated Indie Music Directory—a discovery platform featuring independent artists and emerging talent across multiple genres and moods.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Discover more tracks by visiting our <Link href="/songs" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">full song collection</Link> or explore by <Link href="/genres" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">genre</Link> and <Link href="/moods" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">mood</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}

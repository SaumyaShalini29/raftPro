import Link from 'next/link';
import CoverImage from '@/components/CoverImage';
import { Track } from '@/lib/types';

interface SongCardProps {
  track: Track;
}

export function SongCard({ track }: SongCardProps) {
  const genreColors: Record<string, string> = {
    Indie: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Pop: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Rock: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Lo-fi': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Folk: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Alternative: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  };

  const moodColors: Record<string, string> = {
    Chill: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    Sad: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    Energetic: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Focus: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  };

  return (
    <Link href={`/songs/${track.slug}`}>
      <div className="group overflow-hidden rounded-lg shadow-md bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
        {/* Cover Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
          <CoverImage
            src={track.coverImage}
            alt={track.title}
            width={300}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            priority={false}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {track.title}
          </h3>

          {/* Artist */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
            {track.artist}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                genreColors[track.genre] || genreColors.Indie
              }`}
            >
              {track.genre}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                moodColors[track.mood] || moodColors.Chill
              }`}
            >
              {track.mood}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300">
              {track.releaseYear}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

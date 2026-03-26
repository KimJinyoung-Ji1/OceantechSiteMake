import Image from 'next/image';

interface OceanDividerProps {
  variant?: 1 | 2 | 3;
  height?: number;
  topColor?: string;
  bottomColor?: string;
}

const OCEAN_IMAGES = {
  1: '/images/ocean-waves.jpg',
  2: '/images/ocean-beach.jpg',
  3: '/images/ocean-aerial.jpg',
} as const;

const OCEAN_ALTS = {
  1: '해변 바다 풍경',
  2: '광활한 바다',
  3: '푸른 바다',
} as const;

export default function OceanDivider({
  variant = 1,
  height = 220,
  topColor = 'var(--background)',
  bottomColor = 'var(--background)',
}: OceanDividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <Image
        src={OCEAN_IMAGES[variant]}
        alt={OCEAN_ALTS[variant]}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Light cyan tint overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'rgba(3,233,248,0.15)' }}
      />

      {/* Fade from top section color into photo — longer, smoother */}
      <div
        className="absolute top-0 left-0 right-0 z-10"
        style={{
          height: '55%',
          background: `linear-gradient(to bottom, ${topColor} 0%, ${topColor}CC 15%, ${topColor}66 30%, transparent 55%)`,
        }}
      />

      {/* Fade from photo into bottom section color — longer, smoother */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: '55%',
          background: `linear-gradient(to top, ${bottomColor} 0%, ${bottomColor}CC 15%, ${bottomColor}66 30%, transparent 55%)`,
        }}
      />
    </div>
  );
}

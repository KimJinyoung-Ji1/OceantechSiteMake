import Image from 'next/image';

interface OceanDividerProps {
  variant?: 1 | 2 | 3;
  height?: number;
}

const OCEAN_IMAGES = {
  1: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
  2: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1920&q=80',
  3: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1920&q=80',
} as const;

const OCEAN_ALTS = {
  1: '해변 바다 풍경',
  2: '광활한 바다',
  3: '푸른 바다',
} as const;

export default function OceanDivider({ variant = 1, height = 220 }: OceanDividerProps) {
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
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-20 z-10"
        style={{ background: 'linear-gradient(to bottom, var(--background), transparent)' }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 z-10"
        style={{ background: 'linear-gradient(to top, var(--background), transparent)' }}
      />
      {/* Dark overlay for depth */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'rgba(2,16,151,0.18)' }}
      />
    </div>
  );
}

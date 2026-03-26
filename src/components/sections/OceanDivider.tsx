import Image from 'next/image';

interface OceanDividerProps {
  variant?: 1 | 2 | 3;
  height?: number;
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

export default function OceanDivider({ variant = 1, height = 220 }: OceanDividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      {/* SVG wave clip — top edge */}
      <svg
        className="absolute top-0 left-0 w-full z-20"
        style={{ height: '60px', display: 'block' }}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 Z"
          fill="var(--background)"
        />
      </svg>

      <Image
        src={OCEAN_IMAGES[variant]}
        alt={OCEAN_ALTS[variant]}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay for depth */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'rgba(12,114,135,0.22)' }}
      />

      {/* SVG wave clip — bottom edge */}
      <svg
        className="absolute bottom-0 left-0 w-full z-20"
        style={{ height: '60px', display: 'block' }}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 Z"
          fill="var(--background)"
        />
      </svg>
    </div>
  );
}

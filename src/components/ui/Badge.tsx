interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'gray';
  className?: string;
}

const variantStyles = {
  green: {
    style: { background: 'rgba(23, 233, 181, 0.12)', color: 'var(--secondary-700)', border: '1px solid rgba(23, 233, 181, 0.3)' },
  },
  blue: {
    style: { background: 'rgba(1, 104, 239, 0.1)', color: 'var(--primary-700)', border: '1px solid rgba(1, 104, 239, 0.2)' },
  },
  gray: {
    style: { background: 'var(--gray-100)', color: 'var(--gray-600)', border: '1px solid var(--gray-200)' },
  },
};

export default function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${className}`}
      style={variantStyles[variant].style}
    >
      {children}
    </span>
  );
}

import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: 'link';
  href: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
  children?: React.ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary: 'text-white font-semibold shadow-md hover:shadow-lg hover:brightness-110 active:scale-95',
  secondary: 'font-semibold shadow-md hover:shadow-lg hover:brightness-110 active:scale-95',
  outline: 'font-medium border-2 hover:shadow-md active:scale-95',
};

const variantInline: Record<Variant, React.CSSProperties> = {
  primary: { background: 'var(--primary-500)' },
  secondary: { background: 'var(--secondary-500)', color: 'var(--gray-900)' },
  outline: { borderColor: 'var(--primary-500)', color: 'var(--primary-500)' },
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
};

function getClasses(variant: Variant = 'primary', size: Size = 'md', className = '') {
  return `inline-flex items-center justify-center gap-2 transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '' } = props;
  const classes = getClasses(variant, size, className);
  const style = variantInline[variant];

  if (props.as === 'link') {
    const { href, target, rel, children } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  const { as: _as, href: _href, ...rest } = props as ButtonAsButton & { href?: never; as?: never };
  return (
    <button {...rest} className={classes} style={style} />
  );
}

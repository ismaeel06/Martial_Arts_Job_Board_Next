'use client';

import Link from 'next/link';

const Button = ({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-[#D88A22] text-white hover:bg-[#c07a1b] focus:ring-[#D88A22]/50 hover:shadow-lg hover:shadow-[#D88A22]/20 active:scale-95",
    secondary: "bg-transparent border-2 border-white text-white hover:border-[#D88A22] hover:text-[#D88A22] focus:ring-white/50 active:scale-95",
    outline: "bg-transparent border-2 border-[#D88A22] text-[#D88A22] hover:bg-[#D88A22]/10 focus:ring-[#D88A22]/30 active:scale-95",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300 active:scale-95",
  };
  
  const sizeClasses = {
    sm: "text-sm py-1.5 px-3 rounded-full",
    md: "py-2.5 px-5 rounded-full",
    lg: "text-lg py-3 px-7 rounded-full"
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
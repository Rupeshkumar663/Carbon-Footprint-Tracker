import React from "react";

interface CarbonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:"eco" | "outline" | "danger" | "glass";
  size?:"sm" | "md" | "lg";
  loading?:boolean;
  icon?:React.ReactNode;
  fullWidth?:boolean;
}

const sizeStyles = {
  sm:"px-4 py-1.5 text-sm",
  md:"px-6 py-2.5 text-base",
  lg:"px-8 py-3 text-lg",
};

const variantStyles = {
  eco:`
    bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
    text-white shadow-lg
    hover:shadow-green-500/50
  `,
  outline:`
    border border-green-500 text-green-400
    hover:bg-green-500 hover:text-black
  `,
  danger:`
    bg-gradient-to-r from-red-500 to-red-600
    text-white shadow-lg hover:shadow-red-500/50
  `,
  glass:`
    bg-white/10 backdrop-blur-md border border-white/20
    text-white hover:bg-white/20
  `,
};

const CarbonButton:React.FC<CarbonButtonProps> = ({
  children,
  variant = "eco",
  size = "md",
  loading = false,
  icon,
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={loading || props.disabled}
      className={`
        relative overflow-hidden
        rounded-2xl font-semibold
        transition-all duration-300 ease-in-out
        flex items-center justify-center gap-2
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" :""}
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        group
        ${className}
      `}
      {...props}
    >
      {/* Glow Effect Layer */}
      <span className="absolute inset-0 rounded-2xl bg-green-400 opacity-0 group-hover:opacity-10 transition duration-300 blur-xl" />

      {loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) :(
        <>
          {icon && <span className="text-lg">{icon}</span>}
          <span className="relative z-10">{children}</span>
        </>
      )}
    </button>
  );
};

export default CarbonButton;
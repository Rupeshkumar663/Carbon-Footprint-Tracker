import React from "react";
import { Loader2 } from "lucide-react";
interface CarbonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant?:| "eco"| "outline"| "danger"| "glass"| "dark";
  size?:| "sm"| "md"| "lg";

  loading?:boolean;
  icon?:React.ReactNode;
  fullWidth?:boolean;
}

const sizeStyles:Record<NonNullable<CarbonButtonProps["size"]>,string>={
  sm:"px-4 py-2 text-sm rounded-xl",
  md:"px-6 py-3 text-base rounded-2xl",
  lg:"px-6 sm:px-8 py-4 text-base sm:text-lg rounded-2xl",
};

const variantStyles:Record<NonNullable<CarbonButtonProps["variant"]>,string> ={
  eco: `bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-black shadow-[0_10px_30px_rgba(34,197,94,0.25)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.35)] hover:brightness-110`,
  outline: ` border border-green-500/30 bg-transparent text-green-400 hover:bg-green-500 hover:text-black hover:border-green-400`,
  danger: ` bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_10px_30px_rgba(239,68,68,0.25)] hover:shadow-[0_15px_40px_rgba(239,68,68,0.35)]`,
  glass:` bg-white/[0.05] backdrop-blur-xl border border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20`,
  dark:` bg-[#0B0B0B] border border-white/10 text-white hover:border-green-500/20 hover:bg-[#101010]`,
};

const CarbonButton:React.FC<CarbonButtonProps>=({
  children,
  variant="eco",
  size="md",
  loading=false,
  icon,
  fullWidth=false,
  className="",
  ...props
})=>{
  return (
    <button disabled={loading || props.disabled} aria-busy={loading} className={` relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-green-500/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className} `} {...props}>
      <span className=" absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500 bg-gradient-to-r from-white/5 to-transparent"/>
      <span className="relative z-10 flex items-center gap-2">
       {loading ? (
        <>
         <Loader2 size={18} className="animate-spin" />
         <span className="hidden sm:inline">Loading...</span>
        </>
      ):(
       <>
       {icon && <span className="text-lg">{icon}</span>}
       <span>{children}</span>
       </>
       )}
     </span>
    </button>
  );
};

export default CarbonButton;
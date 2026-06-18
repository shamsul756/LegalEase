import Link from "next/link";
import { FaBalanceScale } from 'react-icons/fa';

const Logo = () => {
    return (
      <Link href="/" className="group flex items-center gap-3 transition-all duration-300">
  {/* Icon Wrapper with Hover Glow and Rotate */}
  <div className="relative bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/30 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
    <FaBalanceScale className="text-xl" />
    {/* Subtle outer glow effect on hover */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
  </div>
  
  {/* Typography with enhanced gradient and letter-spacing */}
  <div className="flex flex-col">
    <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-white via-indigo-500 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:to-white transition-all duration-500">
      LegalEase
    </span>
  </div>
</Link>
    );
};

export default Logo;
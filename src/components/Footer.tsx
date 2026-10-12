import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200 py-4 px-4 print:hidden text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-700">
            ইউনিভার্সেল রশিদ ও ভাউচার জেনারেটর
          </span>{' '}
          · ফিলিপনগর জামায়াতে ইসলামী ও অন্যান্য শাখা
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/support-developer"
            className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-medium transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            Support Developer (Md Habibbur Rahman Parvez)
          </Link>
        </div>
      </div>
    </footer>
  );
};

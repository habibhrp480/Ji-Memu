import React from 'react';
import {
  Printer,
  Heart,
  FileText,
  Bookmark,
  Palette,
  Download,
  FileDown,
  Loader2,
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'editor' | 'support' | 'drafts';
  onSelectTab: (tab: 'editor' | 'support' | 'drafts') => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
  isDownloadingPdf?: boolean;
  onDownloadJpg: () => void;
  isDownloadingJpg?: boolean;
  onOpenTemplatesModal: () => void;
  draftsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onPrint,
  onDownloadPdf,
  isDownloadingPdf,
  onDownloadJpg,
  isDownloadingJpg,
  onOpenTemplatesModal,
  draftsCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-16">
        {/* Zone 1: Brand title, one line */}
        <button
          type="button"
          onClick={() => onSelectTab('editor')}
          className="flex items-center gap-2.5 text-left text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            ভাউ
          </div>
          <div>
            <div className="text-base font-bold text-emerald-950 tracking-tight leading-none">
              ভাউচার জেনারেটর
            </div>
            <div className="text-[11px] text-slate-500 font-normal mt-0.5">
              ফিলিপনগর জামায়াতে ইসলামী ও শাখা ভাউচার
            </div>
          </div>
        </button>

        {/* Zone 2: 4 clean single-line nav items */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => onSelectTab('editor')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'editor'
                ? 'text-emerald-900 font-bold border-b-2 border-emerald-900 py-1'
                : 'hover:text-slate-900 py-1'
            }`}
          >
            <FileText className="w-4 h-4" />
            ভাউচার এডিটর
          </button>

          {/* নমুনা ভাউচার - ওপেন ডিজাইন গ্যালারি */}
          <button
            type="button"
            onClick={onOpenTemplatesModal}
            className="whitespace-nowrap shrink-0 hover:text-emerald-900 transition-colors cursor-pointer flex items-center gap-1.5 py-1 text-slate-700"
          >
            <Palette className="w-4 h-4 text-emerald-800" />
            নমুনা ভাউচার ডিজাইন
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('drafts')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'drafts'
                ? 'text-emerald-900 font-bold border-b-2 border-emerald-900 py-1'
                : 'hover:text-slate-900 py-1'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            ড্রাফট সমূহ {draftsCount > 0 && `(${draftsCount})`}
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('support')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'support'
                ? 'text-emerald-900 font-bold border-b-2 border-emerald-900 py-1'
                : 'hover:text-slate-900 py-1'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            Support Developer
          </button>
        </nav>

        {/* Zone 3: Actions (PDF Download + JPG Download + Print) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile templates button */}
          <button
            type="button"
            onClick={onOpenTemplatesModal}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            title="নমুনা ভাউচার ডিজাইন"
          >
            <Palette className="w-4 h-4 text-emerald-800" />
          </button>

          {/* PDF Download Button (Super Crisp & Direct) */}
          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={isDownloadingPdf}
            className="px-2.5 sm:px-3 py-2 text-xs md:text-sm font-semibold text-emerald-950 hover:text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 sm:gap-1.5 cursor-pointer disabled:opacity-50"
            title="প্রিন্ট উপযোগী আসল PDF ফাইল হিসেবে ডাউনলোড করুন"
          >
            {isDownloadingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-900" />
            ) : (
              <FileDown className="w-4 h-4 text-emerald-900" />
            )}
            <span className="font-bold">PDF</span>
            <span className="hidden sm:inline">ডাউনলোড</span>
          </button>

          {/* JPG Download Button */}
          <button
            type="button"
            onClick={onDownloadJpg}
            disabled={isDownloadingJpg}
            className="px-2.5 sm:px-3 py-2 text-xs md:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 sm:gap-1.5 cursor-pointer disabled:opacity-50"
            title="ভাউচারটি JPG ছবি হিসেবে ডাউনলোড করুন"
          >
            {isDownloadingJpg ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-800" />
            ) : (
              <Download className="w-4 h-4 text-emerald-800" />
            )}
            <span>JPG</span>
            <span className="hidden sm:inline">ডাউনলোড</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={onPrint}
            className="px-3 sm:px-3.5 py-2 text-xs md:text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            title="প্রিন্ট বা PDF হিসেবে সেভ করুন"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট</span>
          </button>
        </div>
      </div>
    </header>
  );
};

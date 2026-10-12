import React from 'react';
import { TemplateTheme, VoucherTemplatePreset } from '../types/voucher';
import { Check, X, Palette, Sparkles } from 'lucide-react';

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTheme: TemplateTheme;
  onSelectTheme: (theme: TemplateTheme) => void;
}

export const templatePresets: VoucherTemplatePreset[] = [
  {
    id: 'classic-emerald',
    title: 'ক্লাসিক্যাল ইসলামিক এমারেল্ড (ডিফল্ট)',
    subtitle: 'অফিসিয়াল জামায়াতে ইসলামী স্ট্যান্ডার্ড',
    description:
      'ঐতিহ্যবাহী গাঢ় সবুজ ডাবল বর্ডার, ইসলামিক রুব এল হিজব প্রতীক, স্পষ্ট হিসাব বিবরণী ও অফিশিয়াল সিল ফ্রেম।',
    colorHex: '#064e3b',
    accentClass: 'bg-emerald-900 border-emerald-900 text-emerald-900',
  },
  {
    id: 'modern-slate',
    title: 'আধুনিক করপোরেট ও মিনিমালিস্ট স্লেট',
    subtitle: 'ক্লিন ও আধুনিক অ্যাকাউন্টস লেআউট',
    description:
      'মিনিমাল ডিপ স্লেট হেডার, সূক্ষ্ম হেয়ারলাইন বর্ডার, আধুনিক টাইপোগ্রাফি ও পরিচ্ছন্ন কর্পোরেট অ্যাকাউন্টিং লুক।',
    colorHex: '#1e293b',
    accentClass: 'bg-slate-900 border-slate-900 text-slate-900',
  },
  {
    id: 'royal-navy',
    title: 'রয়াল ইসলামিক নেভি ব্লু',
    subtitle: 'প্রিমিয়াম ডিপ ব্লু ও ক্লাসিক্যাল ফ্রেম',
    description:
      'রাজকীয় নেভি ব্লু ফিতা হেডার, সূক্ষ্ম জ্যামিতিক অলঙ্করণ ও সুষম প্রিমিয়াম অফিসিয়াল ভাবমূর্তি।',
    colorHex: '#0f172a',
    accentClass: 'bg-indigo-950 border-indigo-950 text-indigo-950',
  },
  {
    id: 'compact-memo',
    title: 'কম্প্যাক্ট ক্যাশ মেমো ও লেজার',
    subtitle: 'উচ্চ ঘনত্বের দ্রুত ভাউচার স্টাইল',
    description:
      'কম্প্যাক্ট রো স্পেসিং, হালকা গ্রিড লাইন, দ্রুত ভাউচার ভেরিফিকেশন ও কম কালি খরচের প্রিন্ট-বান্ধব লেআউট।',
    colorHex: '#334155',
    accentClass: 'bg-zinc-800 border-zinc-800 text-zinc-800',
  },
  {
    id: 'memo-5x8',
    title: '৫×৮ ইঞ্চি স্পেশাল ক্যাশ প্যাড (5" × 8")',
    subtitle: 'Width 5 inches × Height 8 inches কমপ্যাক্ট সাইজ',
    description:
      'স্বতন্ত্র ৫×৮ ইঞ্চি সাইজের ঐতিহ্যবাহী রশিদ প্যাড ফরম্যাট। দুই রঙের গোল্ড-টিয়াল কার্ভ হেডার, সূক্ষ্ম কর্নার ডেকোরেশন ও কমপ্যাক্ট হ্যান্ডি সাইজ।',
    colorHex: '#0f766e',
    accentClass: 'bg-teal-800 border-teal-800 text-teal-800',
  },
  {
    id: 'dual-5x8-a4',
    title: 'এক পাতায় ২ কপি (2 Vouchers per A4)',
    subtitle: 'অফিস কপি ও গ্রহীতা কপি (কাগজ সাশ্রয়ী ডাবল ভাউচার)',
    description:
      'একটি A4 পাতায় উপরে-নিচে বা পাশাপাশি ২টি ৫×৮ ভাউচার একসাথে প্রিন্ট হবে। মাঝখানে ✂ কাটার স্পষ্ট নির্দেশক দাগ এবং অফিস কপি ও গ্রাহক কপি আলাদা চিহ্নিত থাকবে। কাগজের অপচয় ৫০% হ্রাস পাবে।',
    colorHex: '#047857',
    accentClass: 'bg-emerald-800 border-emerald-800 text-emerald-800',
  },
];

export const TemplateGalleryModal: React.FC<TemplateGalleryModalProps> = ({
  isOpen,
  onClose,
  selectedTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs print:hidden">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-900 text-white flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                ভাউচার ডিজাইন লেআউট পছন্দ করুন
                <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">
                  ৬টি ডিজাইন (A4, ৫×৮ ও ২-কপি ডাবল)
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                যেকোনো ডিজাইনে ক্লিক করলেই আপনার বর্তমান ডেটাসহ A4 ভাউচার নতুন লুকে রূপান্তরিত হবে।
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templatePresets.map((preset) => {
            const isSelected = selectedTheme === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectTheme(preset.id);
                  onClose();
                }}
                className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  {/* Miniature Visual Header Mockup */}
                  <div className="mb-3 rounded-lg overflow-hidden border border-slate-200 p-2.5 bg-slate-50 flex flex-col gap-1.5">
                    <div
                      className="h-2 rounded-full w-24"
                      style={{ backgroundColor: preset.colorHex }}
                    />
                    <div className="flex justify-between items-center pt-1 border-b border-slate-200 pb-1">
                      <div className="h-2.5 bg-slate-300 rounded-sm w-32" />
                      <div className="h-2 bg-slate-200 rounded-sm w-10" />
                    </div>
                    <div className="grid grid-cols-3 gap-1 pt-1">
                      <div className="h-2 bg-slate-200 rounded-xs" />
                      <div className="h-2 bg-slate-200 rounded-xs" />
                      <div className="h-2 bg-slate-200 rounded-xs" />
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {preset.title}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {preset.subtitle}
                      </div>
                    </div>

                    {isSelected && (
                      <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {preset.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-400">
                    A4 Portrait প্রিন্ট রেডি
                  </span>
                  <button
                    type="button"
                    className={`font-semibold px-2.5 py-1 rounded-md transition-colors ${
                      isSelected
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? 'বর্তমান সক্রিয়' : 'নির্বাচন করুন'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-800" />
            ডিজাইন পরিবর্তন করলে আপনার টাইপ করা কোনো ডেটা মুছে যাবে না।
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

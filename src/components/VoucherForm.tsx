import React from 'react';
import {
  VoucherData,
  ExpenseItem,
  PaymentMethod,
  TemplateTheme,
} from '../types/voucher';
import {
  Plus,
  Trash2,
  Printer,
  RotateCcw,
  Sparkles,
  Save,
  Check,
  CreditCard,
  Smartphone,
  Building,
  User,
  Calendar,
  FileText,
  Palette,
  UserCheck,
  ShieldCheck,
  QrCode,
  Download,
  FileDown,
  Loader2,
  MessageSquare,
  Copy,
  Type,
  Scale,
  Upload,
} from 'lucide-react';
import { IslamicLogo } from './IslamicLogo';
import {
  formatBengaliCurrency,
  numberToBengaliWords,
} from '../utils/numberToBengaliWords';
import { BENGALI_FONTS } from '../utils/fontUtils';

interface VoucherFormProps {
  voucher: VoucherData;
  onChange: (updated: VoucherData) => void;
  onPrint: () => void;
  onDownloadPdf?: () => void;
  isDownloadingPdf?: boolean;
  onDownloadJpg?: () => void;
  isDownloadingJpg?: boolean;
  onReset: () => void;
  onLoadSample: () => void;
  onSaveDraft: () => void;
  onOpenTemplatesModal?: () => void;
  isDraftSaved?: boolean;
}

const expenseCategories = [
  'সভা ও সম্মেলন',
  'আপ্যায়ন ও খাবার',
  'যাতায়াত ও ভাড়া',
  'প্রচার ও প্রকাশনা',
  'অফিস স্টেশনারি ও মুদ্রণ',
  'ইউটিলিটি ও বিল',
  'ভাড়া ও মেরামত',
  'সাহায্য ও অনুদান',
  'অন্যান্য বিবিধ ব্যয়',
];

export const VoucherForm: React.FC<VoucherFormProps> = ({
  voucher,
  onChange,
  onPrint,
  onDownloadPdf,
  isDownloadingPdf,
  onDownloadJpg,
  isDownloadingJpg,
  onReset,
  onLoadSample,
  onSaveDraft,
  onOpenTemplatesModal,
  isDraftSaved,
}) => {
  const totalAmount = voucher.items.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  const handleBranchChange = (branch: string) => {
    onChange({
      ...voucher,
      branchName: branch,
    });
  };

  const handleItemChange = (
    index: number,
    field: keyof ExpenseItem,
    value: string | number
  ) => {
    const newItems = [...voucher.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'amount' ? (value === '' ? 0 : Number(value)) : value,
    };
    onChange({
      ...voucher,
      items: newItems,
    });
  };

  const addItem = () => {
    const newItem: ExpenseItem = {
      id: 'item_' + Date.now(),
      category: 'সভা ও সম্মেলন',
      description: '',
      amount: 0,
    };
    onChange({
      ...voucher,
      items: [...voucher.items, newItem],
    });
  };

  const removeItem = (index: number) => {
    const newItems = voucher.items.filter((_, i) => i !== index);
    onChange({
      ...voucher,
      items: newItems,
    });
  };

  const isPreparerNumberActive = voucher.preparerNumberEnabled !== false;
  const preparerNumberTypePresets = ['বিকাশ', 'নগদ', 'রকেট', 'ব্যাংক', 'অন্যান্য'];

  const currentTheme = voucher.templateTheme || 'classic-emerald';

  const isVerifierActive = voucher.verifierEnabled !== false;
  const isApproverActive = voucher.approverEnabled !== false;
  const isRemarksActive = voucher.remarksEnabled !== false;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            ভাউচারের তথ্য পূরণ করুন
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            তথ্য পরিবর্তনের সাথে সাথে ডানের A4 প্রিন্ট প্রিভিউতে তাৎক্ষণিক প্রতিফলিত হবে।
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Design Switcher Button */}
          {onOpenTemplatesModal && (
            <button
              type="button"
              onClick={onOpenTemplatesModal}
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Palette className="w-4 h-4" />
              নমুনা ডিজাইন
            </button>
          )}

          <button
            type="button"
            onClick={onSaveDraft}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isDraftSaved
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="ব্রাউজারে ড্রাফট সংরক্ষণ করুন"
          >
            {isDraftSaved ? (
              <>
                <Check className="w-4 h-4 text-white" />
                ড্রাফট সংরক্ষিত হয়েছে!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                ড্রাফট সেভ
              </>
            )}
          </button>

          {/* PDF Download Button */}
          {onDownloadPdf && (
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isDownloadingPdf}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-100/90 hover:bg-emerald-200 text-emerald-950 transition-colors cursor-pointer border border-emerald-300 shadow-2xs disabled:opacity-50"
              title="প্রিন্ট উপযোগী আসল PDF ফাইল হিসেবে ডাউনলোড করুন"
            >
              {isDownloadingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-900" />
              ) : (
                <FileDown className="w-3.5 h-3.5 text-emerald-900" />
              )}
              PDF ডাউনলোড
            </button>
          )}

          {/* JPG Download Button */}
          {onDownloadJpg && (
            <button
              type="button"
              onClick={onDownloadJpg}
              disabled={isDownloadingJpg}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-300 disabled:opacity-50"
              title="ভাউচারটি JPG ছবি হিসেবে ডাউনলোড করুন"
            >
              {isDownloadingJpg ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-800" />
              ) : (
                <Download className="w-3.5 h-3.5 text-emerald-800" />
              )}
              JPG ছবি
            </button>
          )}

          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
            title="ভাউচার সরাসরি প্রিন্ট করুন"
          >
            <Printer className="w-4 h-4" />
            প্রিন্ট
          </button>
        </div>
      </div>

      {/* 0. ডিজাইন লেআউট থিম সিলেক্টর বার */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-emerald-800" />
          <span className="text-xs font-semibold text-slate-800">
            বর্তমান ভাউচার লেআউট ডিজাইন:
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {(
            [
              { id: 'classic-emerald', label: 'ইসলামিক গ্রিন' },
              { id: 'modern-slate', label: 'মডার্ন স্লেট' },
              { id: 'royal-navy', label: 'রয়াল নেভি' },
              { id: 'compact-memo', label: 'কম্প্যাক্ট মেমো' },
              { id: 'memo-5x8', label: '৫×৮" প্যাড' },
              { id: 'dual-5x8-a4', label: 'A4 ২-কপি' },
            ] as { id: TemplateTheme; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ ...voucher, templateTheme: t.id })}
              className={`px-2 py-1 text-[11px] font-semibold rounded-md border text-center transition-colors cursor-pointer ${
                currentTheme === t.id
                  ? 'bg-emerald-900 border-emerald-900 text-white shadow-xs'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* বাংলা ফন্ট শৈলী নির্বাচক (SutonnyMJ, SolaimanLipi, Kalpurush ইত্যাদি) */}
      <div className="p-3 bg-amber-50/70 border border-amber-300/80 rounded-lg space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
            <Type className="w-4 h-4 text-amber-800" />
            বাংলা ফন্ট শৈলী (Bengali Font):
          </div>
          <span className="text-[10.5px] text-amber-900 bg-amber-100/90 border border-amber-300/60 px-2 py-0.5 rounded-full font-semibold">
            সক্রিয়: {BENGALI_FONTS.find((f) => f.id === (voucher.fontFamily || 'hind-siliguri'))?.name.split(' (')[0] || 'হিন্দ শিলিগুড়ি'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {BENGALI_FONTS.map((font) => {
            const isSelected = (voucher.fontFamily || 'hind-siliguri') === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => onChange({ ...voucher, fontFamily: font.id })}
                className={`p-2 rounded-md border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-900 border-amber-900 text-white shadow-xs'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="text-[11px] font-bold truncate">
                  {font.name.split(' (')[0]}
                </div>
                <div
                  className={`text-[9px] font-medium truncate mt-0.5 ${
                    isSelected ? 'text-amber-200' : 'text-slate-500'
                  }`}
                >
                  {font.id === 'sutonnymj' ? 'SutonnyMJ প্রেস' : font.badge}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-slate-600 leading-relaxed pt-0.5">
          💡 <strong className="text-amber-950">সুতোন্নি এমজে (SutonnyMJ):</strong> আপনার ডিভাইসে সুতোন্নি ফন্ট ইনস্টল থাকলে অবিকল মূল মেমো প্রেসের মতো রেন্ডার হবে। অন্য ডিভাইসেও স্বয়ংক্রিয় ব্যাকআপ ফন্টে লেখা নিখুঁতভাবে প্রদর্শিত হবে।
        </p>
      </div>

      {/* A4 ২-কপি (ডাবল ভাউচার) কনফিগারেশন প্যানেল */}
      {currentTheme === 'dual-5x8-a4' && (
        <div className="p-3.5 bg-emerald-50/80 border border-emerald-300 rounded-lg space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/80 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
              <Copy className="w-4 h-4 text-emerald-800" />
              A4 এক পাতায় ২-কপি সেটিংস (কাগজ সাশ্রয়ী ডাবল ভাউচার):
            </div>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-md border border-emerald-300 text-xs shadow-2xs">
              <button
                type="button"
                onClick={() =>
                  onChange({ ...voucher, dualCopyOrientation: 'portrait' })
                }
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                  (voucher.dualCopyOrientation || 'portrait') === 'portrait'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                উপরে-নিচে (Portrait)
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange({ ...voucher, dualCopyOrientation: 'landscape' })
                }
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                  voucher.dualCopyOrientation === 'landscape'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                পাশাপাশি (Landscape)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-emerald-950 mb-1">
                ১ম কপি লেবেল (উপরে / বামে):
              </label>
              <input
                type="text"
                value={voucher.dualCopyLabel1 ?? 'অফিস কপি'}
                onChange={(e) =>
                  onChange({ ...voucher, dualCopyLabel1: e.target.value })
                }
                placeholder="যেমন: অফিস কপি"
                className="w-full px-2.5 py-1.5 text-xs border border-emerald-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-emerald-950 mb-1">
                ২য় কপি লেবেল (নিচে / ডানে):
              </label>
              <input
                type="text"
                value={voucher.dualCopyLabel2 ?? 'গ্রহীতা কপি'}
                onChange={(e) =>
                  onChange({ ...voucher, dualCopyLabel2: e.target.value })
                }
                placeholder="যেমন: গ্রহীতা কপি"
                className="w-full px-2.5 py-1.5 text-xs border border-emerald-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px]">
            <span className="text-slate-600 font-medium">কুইক প্রিসেট:</span>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...voucher,
                  dualCopyLabel1: 'অফিস কপি',
                  dualCopyLabel2: 'গ্রহীতা কপি',
                })
              }
              className="px-2 py-0.5 bg-white hover:bg-emerald-100 border border-emerald-300 rounded text-emerald-900 font-semibold cursor-pointer shadow-2xs"
            >
              অফিস কপি + গ্রহীতা কপি
            </button>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...voucher,
                  dualCopyLabel1: 'অফিস কপি',
                  dualCopyLabel2: 'হিসাব কপি',
                })
              }
              className="px-2 py-0.5 bg-white hover:bg-emerald-100 border border-emerald-300 rounded text-emerald-900 font-semibold cursor-pointer shadow-2xs"
            >
              অফিস কপি + হিসাব কপি
            </button>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...voucher,
                  dualCopyLabel1: 'মূল কপি',
                  dualCopyLabel2: 'অনুলিপি',
                })
              }
              className="px-2 py-0.5 bg-white hover:bg-emerald-100 border border-emerald-300 rounded text-emerald-900 font-semibold cursor-pointer shadow-2xs"
            >
              মূল কপি + অনুলিপি
            </button>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...voucher,
                  dualCopyLabel1: 'গ্রাহক কপি',
                  dualCopyLabel2: 'ক্যাশ কপি',
                })
              }
              className="px-2 py-0.5 bg-white hover:bg-emerald-100 border border-emerald-300 rounded text-emerald-900 font-semibold cursor-pointer shadow-2xs"
            >
              গ্রাহক কপি + ক্যাশ কপি
            </button>
          </div>
        </div>
      )}

      {/* 1. প্রতিষ্ঠান ও শিরোনাম সেকশন */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5" />
          প্রতিষ্ঠানের শিরোনাম ও এলাকা
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              এলাকা / শাখা
            </label>
            <input
              type="text"
              value={voucher.branchName}
              onChange={(e) => handleBranchChange(e.target.value)}
              placeholder="যেমন: ফিলিপনগর"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              শিরোনাম হবে: “{voucher.branchName || 'ফিলিপনগর'} জামায়াতে ইসলামী ভাউচার”
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              সরাসরি কাস্টম শিরোনাম (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={voucher.customTitle || ''}
              onChange={(e) =>
                onChange({ ...voucher, customTitle: e.target.value })
              }
              placeholder="ডিফল্ট পরিবর্তন না করতে চাইলে ফাঁকা রাখুন"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        {/* রশিদের প্রতীক ও লোগো নির্বাচন / পরিবর্তন */}
        <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg space-y-2.5 mt-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/80 pb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
              <Scale className="w-4 h-4 text-emerald-800" />
              রশিদের অফিসিয়াল প্রতীক ও লোগো:
            </div>
            {voucher.customLogoUrl ? (
              <button
                type="button"
                onClick={() => onChange({ ...voucher, customLogoUrl: undefined })}
                className="text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                title="আপলোড করা ছবি মুছে জামায়াতে ইসলামীর প্রতীক ফিরিয়ে আনুন"
              >
                রিমুভ করে প্রতীক ফিরিয়ে আনুন
              </button>
            ) : (
              <span className="text-[10.5px] text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                সক্রিয়: {(voucher.logoVariant || 'emblem') === 'emblem' ? 'অফিসিয়াল মনোগ্রাম ও দাঁড়িপাল্লা' : 'খাঁটি দাঁড়িপাল্লা প্রতীক'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* ১. অফিসিয়াল মনোগ্রাম ও দাঁড়িপাল্লা */}
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...voucher,
                  logoVariant: 'emblem',
                  customLogoUrl: undefined,
                })
              }
              className={`p-2 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                !voucher.customLogoUrl && (voucher.logoVariant || 'emblem') === 'emblem'
                  ? 'bg-white border-emerald-800 ring-2 ring-emerald-800/20 shadow-xs'
                  : 'bg-white/80 border-slate-200 hover:border-emerald-300 hover:bg-white'
              }`}
            >
              <div className="w-10 h-10 shrink-0 flex items-center justify-center p-0.5 bg-emerald-50 rounded border border-emerald-200">
                <IslamicLogo className="w-9 h-9" variant="emblem" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 truncate">
                  অফিসিয়াল মনোগ্রাম
                </div>
                <div className="text-[10px] text-emerald-800 font-medium">
                  দাঁড়িপাল্লা ও আকিমুদ্দীন
                </div>
              </div>
            </button>

            {/* ২. খাঁটি দাঁড়িপাল্লা প্রতীক */}
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...voucher,
                  logoVariant: 'scales-only',
                  customLogoUrl: undefined,
                })
              }
              className={`p-2 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                !voucher.customLogoUrl && voucher.logoVariant === 'scales-only'
                  ? 'bg-white border-emerald-800 ring-2 ring-emerald-800/20 shadow-xs'
                  : 'bg-white/80 border-slate-200 hover:border-emerald-300 hover:bg-white'
              }`}
            >
              <div className="w-10 h-10 shrink-0 flex items-center justify-center p-0.5 bg-emerald-50 rounded border border-emerald-200">
                <IslamicLogo className="w-9 h-9" variant="scales-only" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 truncate">
                  দাঁড়িপাল্লা প্রতীক
                </div>
                <div className="text-[10px] text-emerald-800 font-medium">
                  নির্বাচনী ও সাংগঠনিক মূল
                </div>
              </div>
            </button>

            {/* ৩. কাস্টম ছবি / লোগো আপলোড */}
            <label
              className={`p-2 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                voucher.customLogoUrl
                  ? 'bg-white border-emerald-800 ring-2 ring-emerald-800/20 shadow-xs'
                  : 'bg-white/80 border-slate-200 hover:border-emerald-300 hover:bg-white'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const result = event.target?.result as string;
                    if (result) {
                      onChange({ ...voucher, customLogoUrl: result });
                    }
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <div className="w-10 h-10 shrink-0 flex items-center justify-center p-0.5 bg-emerald-50 rounded border border-emerald-200 overflow-hidden">
                {voucher.customLogoUrl ? (
                  <img
                    src={voucher.customLogoUrl}
                    alt="কাস্টম লোগো"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Upload className="w-5 h-5 text-emerald-800" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 truncate">
                  {voucher.customLogoUrl ? 'কাস্টম লোগো সক্রিয়' : 'অন্যান্য ছবি আপলোড'}
                </div>
                <div className="text-[10px] text-slate-500 font-medium truncate">
                  {voucher.customLogoUrl ? 'ক্লিক করে ছবি পরিবর্তন' : 'PNG / JPG ফাইল যুক্ত করুন'}
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* 2. ভাউচার নম্বর ও তারিখ */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          ভাউচার নম্বর ও তারিখ
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              সাপোর্টিং রশিদ / ভাউচার নং <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={voucher.voucherNo}
              onChange={(e) =>
                onChange({ ...voucher, voucherNo: e.target.value })
              }
              placeholder="যেমন: ১০১ বা FN-2026/01"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              তারিখ (ক্যালেন্ডার)
            </label>
            <input
              type="date"
              value={voucher.date}
              onChange={(e) => onChange({ ...voucher, date: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              ম্যানুয়াল তারিখ লেখা (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={voucher.manualDateText || ''}
              onChange={(e) =>
                onChange({ ...voucher, manualDateText: e.target.value })
              }
              placeholder="যেমন: ০৯ অক্টোবর ২০২৬"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>
      </div>

      {/* 3. খরচের তালিকা (আইটেমস) */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            খরচের তালিকা ও হিসাব ({voucher.items.length} টি খাত)
          </div>

          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            নতুন খাত যোগ করুন
          </button>
        </div>

        <div className="space-y-3">
          {voucher.items.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
              <p className="text-xs text-slate-500 mb-2.5">
                কোনো খরচের খাত যোগ করা নেই।
              </p>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                প্রথম খরচের খাত যোগ করুন
              </button>
            </div>
          ) : (
            voucher.items.map((item, index) => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                  <span>আইটেম #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded-sm cursor-pointer"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* খাত */}
                  <div className="md:col-span-4">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      খরচের খাত
                    </label>
                    <input
                      type="text"
                      list={`categories-${item.id}`}
                      value={item.category}
                      onChange={(e) =>
                        handleItemChange(index, 'category', e.target.value)
                      }
                      placeholder="খাত লিখুন বা বাছুন"
                      className="w-full px-2.5 py-1.5 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                    <datalist id={`categories-${item.id}`}>
                      {expenseCategories.map((cat) => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>

                  {/* বিবরণ */}
                  <div className="md:col-span-5">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      বিস্তারিত বিবরণ
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, 'description', e.target.value)
                      }
                      placeholder="যেমন: ওয়ার্ড প্রতিনিধি সভার নাস্তা ও চা"
                      className="w-full px-2.5 py-1.5 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  {/* টাকার পরিমাণ */}
                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      টাকার পরিমাণ (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.amount === 0 ? '' : item.amount}
                      onChange={(e) =>
                        handleItemChange(index, 'amount', e.target.value)
                      }
                      placeholder="০.০০"
                      className="w-full px-2.5 py-1.5 text-sm border border-slate-300 rounded-md bg-white text-right font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Auto Total & In words banner */}
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-emerald-950">
              সর্বমোট অটো যোগফল:
            </span>
            <span className="text-base font-bold text-emerald-900 tabular-nums">
              ৳ {formatBengaliCurrency(totalAmount)}
            </span>
          </div>
          <div className="text-xs text-emerald-900 flex items-start gap-1">
            <span className="font-semibold shrink-0">কথায়:</span>
            <span className="font-medium">
              {numberToBengaliWords(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* 4. প্রস্তুতকারীর নাম্বার ও মাধ্যম (বিকাশ, নগদ, রকেট, ব্যাংক ইত্যাদি - এডিটেবল ও রিমুভযোগ্য) */}
      <div
        className={`p-4 rounded-xl border transition-all space-y-3.5 ${
          isPreparerNumberActive
            ? 'border-slate-200 bg-slate-50/60'
            : 'border-dashed border-slate-300 bg-slate-50/30'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-800" />
            <div>
              <h3 className="text-xs font-bold text-slate-800">
                ৪. প্রস্তুতকারীর নাম্বার ও মাধ্যম
              </h3>
              <p className="text-[11px] text-slate-500">
                নগদ, বিকাশ, রকেট, ব্যাংক বা অন্যান্য প্রস্তুতকারীর নাম্বার
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onChange({
                ...voucher,
                preparerNumberEnabled: !isPreparerNumberActive,
                preparerNumberType:
                  !isPreparerNumberActive && !voucher.preparerNumberType
                    ? 'বিকাশ'
                    : voucher.preparerNumberType,
              })
            }
            className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 border ${
              isPreparerNumberActive
                ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 bg-white'
                : 'text-emerald-800 hover:text-emerald-950 bg-emerald-50 border-emerald-200'
            }`}
          >
            {isPreparerNumberActive ? (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                অপশনটি রিমুভ করুন
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                প্রস্তুতকারীর নাম্বার যুক্ত করুন
              </>
            )}
          </button>
        </div>

        {isPreparerNumberActive ? (
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* প্রস্তুতকারীর নাম্বার ফিল্ড */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  প্রস্তুতকারীর নাম্বার / একাউন্ট নং
                </label>
                <input
                  type="text"
                  value={voucher.preparerNumber || ''}
                  onChange={(e) =>
                    onChange({
                      ...voucher,
                      preparerNumber: e.target.value,
                    })
                  }
                  placeholder="যেমন: ০১৭১২-৩৪৫৬৭৮ বা হিসাব নম্বর"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* নাম্বারের ধরণ / মাধ্যম */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  সেটি কি নাম্বার? (নগদ, বিকাশ, রকেট, ব্যাংক ইত্যাদি)
                </label>
                <input
                  type="text"
                  value={voucher.preparerNumberType || ''}
                  onChange={(e) =>
                    onChange({
                      ...voucher,
                      preparerNumberType: e.target.value,
                    })
                  }
                  placeholder="যেমন: বিকাশ, নগদ, রকেট, ব্যাংক বা অন্যান্য"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            {/* দ্রুত সিলেক্ট করার বাটনসমূহ */}
            <div>
              <div className="text-[11px] text-slate-500 mb-1.5 font-medium">
                দ্রুত মাধ্যম নির্বাচন করুন:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {preparerNumberTypePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...voucher,
                        preparerNumberType: preset,
                      })
                    }
                    className={`px-2.5 py-1 text-xs rounded-md border transition-colors cursor-pointer ${
                      voucher.preparerNumberType === preset
                        ? 'bg-emerald-900 border-emerald-900 text-white font-medium shadow-2xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              💡 এই তথ্যটি ভাউচারে প্রস্তুতকারীর নাম্বার হিসেবে প্রদর্শিত হবে। না দেখাতে চাইলে উপরের <span className="font-semibold text-rose-600">"অপশনটি রিমুভ করুন"</span> বাটনে চাপ দিন।
            </p>
          </div>
        ) : (
          <div className="py-2 text-center text-xs text-slate-500">
            <span>প্রস্তুতকারীর নাম্বার অপশনটি বর্তমানে বাদ দেওয়া হয়েছে (ভাউচারে প্রদর্শিত হবে না)।</span>
          </div>
        )}
      </div>

      {/* 5. স্বাক্ষরকারী ব্যক্তিবর্গ (প্রস্তুতকারক, যাচাইকারী, অনুমোদনকারী - এডিটেবল ও রিমুভযোগ্য) */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            স্বাক্ষরকারী ব্যক্তিবর্গ (নাম, পদবী ও অপসারণ সুবিধা)
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            প্রয়োজন অনুযায়ী যাচাইকারী বা অনুমোদনকারী বাদ/যুক্ত করতে পারেন
          </span>
        </div>

        {/* 1) প্রস্তুতকারক (আবশ্যক) */}
        <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-800" />
              ১. প্রস্তুতকারকের তথ্য <span className="text-rose-500">*</span>
            </div>
            <span className="text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-sm">
              আবশ্যক স্বাক্ষর
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                স্বাক্ষর শিরোনাম / লেবেল
              </label>
              <input
                type="text"
                value={voucher.preparedByLabel || 'প্রস্তুতকারীর স্বাক্ষর'}
                onChange={(e) =>
                  onChange({ ...voucher, preparedByLabel: e.target.value })
                }
                placeholder="প্রস্তুতকারীর স্বাক্ষর"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                পূর্ণ নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={voucher.preparedBy}
                onChange={(e) =>
                  onChange({ ...voucher, preparedBy: e.target.value })
                }
                placeholder="যেমন: মোঃ আব্দুল্লাহ আল নোমান"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                পদবী (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={voucher.preparedByDesignation || ''}
                onChange={(e) =>
                  onChange({
                    ...voucher,
                    preparedByDesignation: e.target.value,
                  })
                }
                placeholder="যেমন: অফিস সম্পাদক / ক্যাশিয়ার"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>
        </div>

        {/* 2) যাচাইকারী / হিসাবরক্ষক (ঐচ্ছিক ও রিমুভযোগ্য) */}
        <div
          className={`p-3.5 rounded-lg border transition-colors space-y-3 ${
            isVerifierActive
              ? 'border-slate-200 bg-slate-50/50'
              : 'border-dashed border-slate-200 bg-slate-100/50 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-slate-700" />
              ২. যাচাইকারী / হিসাবরক্ষক
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...voucher,
                    verifierEnabled: !isVerifierActive,
                  })
                }
                className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  isVerifierActive
                    ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                    : 'text-emerald-800 hover:text-emerald-950 bg-emerald-50'
                }`}
              >
                {isVerifierActive ? (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    রিমুভ করুন
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    যাচাইকারী যুক্ত করুন
                  </>
                )}
              </button>
            </div>
          </div>

          {isVerifierActive ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  স্বাক্ষর শিরোনাম / লেবেল
                </label>
                <input
                  type="text"
                  value={voucher.verifierLabel || 'যাচাইকারী / হিসাবরক্ষক'}
                  onChange={(e) =>
                    onChange({ ...voucher, verifierLabel: e.target.value })
                  }
                  placeholder="যাচাইকারী / হিসাবরক্ষক"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  যাচাইকারীর নাম
                </label>
                <input
                  type="text"
                  value={voucher.verifierName || ''}
                  onChange={(e) =>
                    onChange({ ...voucher, verifierName: e.target.value })
                  }
                  placeholder="যেমন: হাফেজ মো: ইব্রাহিম খলিল"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  পদবী (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={voucher.verifierDesignation || ''}
                  onChange={(e) =>
                    onChange({
                      ...voucher,
                      verifierDesignation: e.target.value,
                    })
                  }
                  placeholder="যেমন: অর্থ সম্পাদক / হিসাবরক্ষক"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 italic">
              * রশিদের প্রিন্ট কপি থেকে যাচাইকারীর স্বাক্ষর ব্লক বাদ রাখা হয়েছে।
            </div>
          )}
        </div>

        {/* 3) অনুমোদনকারী / সভাপতি (ঐচ্ছিক ও রিমুভযোগ্য) */}
        <div
          className={`p-3.5 rounded-lg border transition-colors space-y-3 ${
            isApproverActive
              ? 'border-slate-200 bg-slate-50/50'
              : 'border-dashed border-slate-200 bg-slate-100/50 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
              ৩. অনুমোদনকারী / সভাপতি
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...voucher,
                    approverEnabled: !isApproverActive,
                  })
                }
                className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  isApproverActive
                    ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                    : 'text-emerald-800 hover:text-emerald-950 bg-emerald-50'
                }`}
              >
                {isApproverActive ? (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    রিমুভ করুন
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    অনুমোদনকারী যুক্ত করুন
                  </>
                )}
              </button>
            </div>
          </div>

          {isApproverActive ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  স্বাক্ষর শিরোনাম / লেবেল
                </label>
                <input
                  type="text"
                  value={voucher.approverLabel || 'অনুমোদনকারী / সভাপতি'}
                  onChange={(e) =>
                    onChange({ ...voucher, approverLabel: e.target.value })
                  }
                  placeholder="অনুমোদনকারী / সভাপতি"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  অনুমোদনকারীর নাম
                </label>
                <input
                  type="text"
                  value={voucher.approverName || ''}
                  onChange={(e) =>
                    onChange({ ...voucher, approverName: e.target.value })
                  }
                  placeholder="যেমন: মাওলানা মোঃ ফজলুর রহমান"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  পদবী (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={voucher.approverDesignation || ''}
                  onChange={(e) =>
                    onChange({
                      ...voucher,
                      approverDesignation: e.target.value,
                    })
                  }
                  placeholder="যেমন: সভাপতি / আমীর"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 italic">
              * রশিদের প্রিন্ট কপি থেকে অনুমোদনকারীর স্বাক্ষর ব্লক বাদ রাখা হয়েছে।
            </div>
          )}
        </div>

        {/* বিশেষ মন্তব্য / অনুমোদনের লাইন (রিমুভযোগ্য) */}
        <div
          className={`p-3.5 rounded-lg border transition-colors space-y-3 ${
            isRemarksActive
              ? 'border-slate-200 bg-slate-50/50'
              : 'border-dashed border-slate-200 bg-slate-100/50 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-800" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  মন্তব্য / রেফারেন্স লাইন (রিমুভযোগ্য)
                </span>
                <span className="text-[11px] text-slate-500 block">
                  ভাউচারের নিচে অনুমোদিত ও পরিশোধিত মন্তব্য প্রদর্শন বা অপসারণ
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isRemarksActive && (
                <span className="text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-sm">
                  প্রদর্শিত হচ্ছে
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  if (isRemarksActive) {
                    onChange({
                      ...voucher,
                      remarksEnabled: false,
                    });
                  } else {
                    onChange({
                      ...voucher,
                      remarksEnabled: true,
                      remarks:
                        voucher.remarks && voucher.remarks.trim()
                          ? voucher.remarks
                          : 'মাসিক বায়তুলমাল হিসাব নিকাশ অনুযায়ী অনুমোদিত ও পরিশোধিত।',
                    });
                  }
                }}
                className={`text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                  isRemarksActive
                    ? 'text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200'
                    : 'text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300'
                }`}
              >
                {isRemarksActive ? (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    রিমুভ করুন
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    মন্তব্য লাইন যুক্ত করুন
                  </>
                )}
              </button>
            </div>
          </div>

          {isRemarksActive ? (
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={voucher.remarks ?? ''}
                  onChange={(e) =>
                    onChange({ ...voucher, remarks: e.target.value })
                  }
                  placeholder="যেমন: মাসিক বায়তুলমাল হিসাব নিকাশ অনুযায়ী অনুমোদিত ও পরিশোধিত।"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 pr-16"
                />
                {voucher.remarks && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...voucher, remarks: '' })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-rose-600 px-1.5 py-0.5 rounded hover:bg-slate-100"
                    title="মন্তব্য মুছুন"
                  >
                    ক্লিয়ার
                  </button>
                )}
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                <span className="text-slate-400 text-[10.5px]">দ্রুত বাক্য নির্বাচন:</span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...voucher,
                      remarks: 'মাসিক বায়তুলমাল হিসাব নিকাশ অনুযায়ী অনুমোদিত ও পরিশোধিত।',
                    })
                  }
                  className="px-2 py-0.5 bg-white border border-slate-200 hover:border-emerald-700 hover:text-emerald-800 rounded text-slate-600 transition-colors cursor-pointer text-[10.5px]"
                >
                  মাসিক বায়তুলমাল হিসাব নিকাশ অনুযায়ী অনুমোদিত ও পরিশোধিত।
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...voucher,
                      remarks: 'ক্যাশ মেমো ও বিল ভাউচার সংবলিত মূল কপি।',
                    })
                  }
                  className="px-2 py-0.5 bg-white border border-slate-200 hover:border-emerald-700 hover:text-emerald-800 rounded text-slate-600 transition-colors cursor-pointer text-[10.5px]"
                >
                  ক্যাশ মেমো ও বিল ভাউচার সংবলিত মূল কপি
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 italic">
              * রশিদের প্রিন্ট ও মেমো কপি থেকে "মন্তব্য: মাসিক বায়তুলমাল হিসাব নিকাশ অনুযায়ী অনুমোদিত ও পরিশোধিত।" লাইনটি বাদ রাখা হয়েছে।
            </div>
          )}
        </div>

        {/* QR Code জেনারেটর অপশন */}
        <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                ভাউচার যাচাইকরণ QR কোড
              </span>
              <span className="text-[11px] text-slate-500 block">
                রশিদের নিচে ভাউচার নং ({voucher.voucherNo || '---'}), তারিখ ও মোট টাকা (৳{formatBengaliCurrency(totalAmount)}) সংবলিত QR কোড প্রিন্ট হবে।
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={voucher.showQrCode !== false}
              onChange={(e) =>
                onChange({ ...voucher, showQrCode: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-800"></div>
          </label>
        </div>
      </div>

      {/* Footer Quick Actions */}
      <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            নমুনা ডেটা লোড
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            রিসেট / নতুন
          </button>
        </div>

        {/* Quick Export / Print from form bottom */}
        <div className="flex items-center gap-2">
          {onDownloadPdf && (
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isDownloadingPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-emerald-100 hover:bg-emerald-200 text-emerald-950 transition-colors cursor-pointer border border-emerald-300 disabled:opacity-50"
            >
              {isDownloadingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-900" />
              ) : (
                <FileDown className="w-3.5 h-3.5 text-emerald-900" />
              )}
              PDF
            </button>
          )}

          {onDownloadJpg && (
            <button
              type="button"
              onClick={onDownloadJpg}
              disabled={isDownloadingJpg}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-300 disabled:opacity-50"
            >
              {isDownloadingJpg ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-800" />
              ) : (
                <Download className="w-3.5 h-3.5 text-emerald-800" />
              )}
              JPG
            </button>
          )}

          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            প্রিন্ট
          </button>
        </div>
      </div>
    </div>
  );
};

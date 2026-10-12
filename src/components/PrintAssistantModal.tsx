import React from 'react';
import {
  Printer,
  FileDown,
  Download,
  ExternalLink,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { VoucherData } from '../types/voucher';

interface PrintAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: VoucherData;
  onDownloadPdf: () => void;
  isDownloadingPdf: boolean;
  onDownloadJpg: () => void;
  isDownloadingJpg: boolean;
  onRetryPrint: () => void;
}

export const PrintAssistantModal: React.FC<PrintAssistantModalProps> = ({
  isOpen,
  onClose,
  voucher,
  onDownloadPdf,
  isDownloadingPdf,
  onDownloadJpg,
  isDownloadingJpg,
  onRetryPrint,
}) => {
  if (!isOpen) return null;

  const is5x8 = voucher.templateTheme === 'memo-5x8';
  const isDual = voucher.templateTheme === 'dual-5x8-a4';
  const sizeLabel = isDual
    ? 'A4 ডাবল পেজ (এক পাতায় ২-কপি)'
    : is5x8
    ? '৫" × ৮" মেমোপ্যাড সাইজ'
    : 'স্ট্যান্ডার্ড A4 সাইজ';

  const handleOpenStandalone = () => {
    try {
      window.open(window.location.href, '_blank');
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs print:hidden animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white flex items-center justify-center shadow-xs">
              <Printer className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ভাউচার প্রিন্ট ও ডাউনলোড সহায়তা
              </h3>
              <p className="text-xs text-slate-500">
                {sizeLabel} ভাউচার
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Alert */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">টিপস: ব্রাউজার প্রিভিউ পরিবেশে প্রিন্ট ডায়ালগ</span>
            আইফ্রেম বা প্রিভিউ ব্রাউজারে নিরাপত্তা কারণে সরাসরি সিস্টেম প্রিন্ট ডায়ালগ ব্লক থাকলে নিচের <strong>PDF ডাউনলোড</strong> ব্যবহার করুন। এটি ১০০% প্রিন্ট-রেডি ফাইল তৈরি করে।
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {/* Option 1: PDF Download (Recommended) */}
          <div className="p-3.5 rounded-xl border-2 border-emerald-600 bg-emerald-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                <FileDown className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-emerald-950">
                    PDF ডাউনলোড করুন
                  </span>
                  <span className="text-[10px] bg-emerald-700 text-white font-bold px-1.5 py-0.2 rounded-xs">
                    প্রস্তাবিত
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-0.5">
                  নিখুঁত {is5x8 ? '৫"×৮"' : 'A4'} পেপার সাইজ ও কালারসহ সুপার ক্লিয়ার প্রিন্ট ফাইল।
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isDownloadingPdf}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isDownloadingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  তৈরি হচ্ছে...
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  PDF ডাউনলোড
                </>
              )}
            </button>
          </div>

          {/* Option 2: JPG Download */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800">
                  JPG ছবি ডাউনলোড
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  মোবাইল গ্যালারি বা হোয়াটসঅ্যাপে দ্রুত শেয়ার করার জন্য।
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onDownloadJpg}
              disabled={isDownloadingJpg}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isDownloadingJpg ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  তৈরি হচ্ছে...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  JPG ডাউনলোড
                </>
              )}
            </button>
          </div>

          {/* Option 3: Retry Browser Print */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800">
                  ব্রাউজার প্রিন্ট ডায়ালগ
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  সরাসরি প্রিন্টার নির্বাচন করতে ব্রাউজার প্রিন্ট উইন্ডো খুলুন।
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onRetryPrint}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              প্রিন্ট চেষ্টা করুন
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
          <button
            type="button"
            onClick={handleOpenStandalone}
            className="text-slate-600 hover:text-emerald-900 inline-flex items-center gap-1 font-medium cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            পূর্ণ উইন্ডোতে খুলুন
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { VoucherData } from '../types/voucher';
import {
  toBengaliNumber,
  formatBengaliCurrency,
} from '../utils/numberToBengaliWords';
import { Trash2, FolderOpen, ArrowLeft, Plus } from 'lucide-react';

interface DraftsManagerProps {
  drafts: VoucherData[];
  onLoadDraft: (draft: VoucherData) => void;
  onDeleteDraft: (id: string) => void;
  onBack: () => void;
  onNewVoucher: () => void;
}

export const DraftsManager: React.FC<DraftsManagerProps> = ({
  drafts,
  onLoadDraft,
  onDeleteDraft,
  onBack,
  onNewVoucher,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 print:hidden">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:text-emerald-950 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          এডিটরে ফিরে যান
        </button>

        <button
          type="button"
          onClick={onNewVoucher}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          নতুন ভাউচার তৈরি
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <h1 className="text-xl font-bold text-slate-900">
            সংরক্ষিত ভাউচার ড্রাফটসমূহ ({toBengaliNumber(drafts.length)} টি)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            আপনার ব্রাউজারের লোকাল স্টোরেজে সংরক্ষিত ভাউচারগুলির তালিকা। যেকোনো সময় আবার লোড বা প্রিন্ট করতে পারবেন।
          </p>
        </div>

        {drafts.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium">কোন সংরক্ষিত ড্রাফট পাওয়া যায়নি।</p>
            <p className="text-xs text-slate-400 mt-1">
              ভাউচার তৈরির সময় “ড্রাফট সেভ” বাটনে চাপলে এখানে জমা হবে।
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {drafts.map((draft) => {
              const totalAmount = draft.items.reduce(
                (sum, item) => sum + (Number(item.amount) || 0),
                0
              );
              const title =
                draft.customTitle ||
                `${draft.branchName || 'ফিলিপনগর'} জামায়াতে ইসলামী ভাউচার`;

              return (
                <div
                  key={draft.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 px-3 rounded-lg transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        {title}
                      </h3>
                      <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm">
                        নং: {toBengaliNumber(draft.voucherNo || '---')}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span>তারিখ: {draft.manualDateText || draft.date}</span>
                      <span>·</span>
                      <span>
                        মোট টাকা: ৳ {formatBengaliCurrency(totalAmount)}
                      </span>
                      <span>·</span>
                      <span>খাত সংখ্যা: {toBengaliNumber(draft.items.length)} টি</span>
                      <span>·</span>
                      <span>প্রস্তুতকারী: {draft.preparedBy || '—'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onLoadDraft(draft)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      লোড করুন
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteDraft(draft.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

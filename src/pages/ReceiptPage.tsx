import { useState } from 'react';
import { Edit3, Eye, FileText, Printer, Sparkles } from 'lucide-react';

export default function ReceiptPage() {
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[1700px] mx-auto px-3 sm:px-6 py-4 md:py-6">
      {/* Mobile View Toggle Bar (Only visible on small screens) */}
      <div className="lg:hidden flex items-center justify-between bg-white p-1.5 rounded-xl border border-slate-200 mb-4 shadow-2xs print:hidden">
        <button
          type="button"
          onClick={() => setMobileView('form')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            mobileView === 'form'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          ফর্ম এডিটর (Left Panel)
        </button>

        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            mobileView === 'preview'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          A4 প্রিভিউ (Right Panel)
        </button>
      </div>

      {/* Desktop Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Form Editor Placeholder */}
        <section
          aria-label="ভাউচার ফর্ম প্যানেল"
          className={`lg:col-span-5 space-y-4 print:hidden ${
            mobileView === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-800" />
                ভাউচার তথ্য ইনপুট (Form Panel)
              </h2>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-md">
                Part-1 Placeholder
              </span>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-1">
                  পরবর্তী পর্বে (Part-2 ও Part-3) যা যুক্ত হবে:
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600">
                  <li>এলাকা/শাখা নির্বাচন (ডিফল্ট: ফিলিপনগর)</li>
                  <li>সাপোর্টিং রশিদ/ভাউচার নং ও স্বয়ংক্রিয় তারিখ</li>
                  <li>খরচের তালিকা (খাত, বিবরণ, অংক - যোগ ও ডিলিট)</li>
                  <li>স্বয়ংক্রিয় যোগফল ও বাংলায় কথায় কনভার্সন (...টাকা মাত্র)</li>
                  <li>পেমেন্ট মাধ্যম (নগদ/বিকাশ/রকেট/ব্যাংক ও শর্তযুক্ত তথ্য)</li>
                  <li>প্রস্তুতকারকের নাম ও স্বাক্ষরকারীর তথ্য</li>
                </ul>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  টেস্ট প্রিন্ট ডায়ালগ
                </button>
                <span className="text-xs text-slate-400">
                  Two-panel আর্কিটেকচার সক্রিয় রয়েছে
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Live A4 Preview Placeholder */}
        <section
          aria-label="A4 প্রিন্ট প্রিভিউ প্যানেল"
          className={`lg:col-span-7 flex flex-col items-center ${
            mobileView === 'form' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Preview Toolbar */}
          <div className="w-full max-w-[210mm] mb-3 flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs print:hidden">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-800" />
              লাইভ A4 প্রিন্ট প্রিভিউ (Right Panel)
            </span>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              প্রিন্ট
            </button>
          </div>

          {/* A4 Container Placeholder */}
          <div className="w-full flex justify-center overflow-x-auto py-2">
            <div
              id="printable-voucher"
              className="print-voucher-area w-[210mm] min-h-[297mm] bg-white text-slate-900 p-[12mm] border border-slate-300 print:border-none print:shadow-none shadow-xl flex flex-col justify-between box-border"
            >
              <div className="border-2 border-emerald-900 p-6 flex-1 flex flex-col justify-between text-center">
                <div>
                  <div className="text-xs text-slate-500 mb-1">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                  <h1 className="text-2xl font-bold text-emerald-900">
                    ফিলিপনগর জামায়াতে ইসলামী ভাউচার
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    বাংলাদেশ জামায়াতে ইসলামী · অফিসিয়াল ব্যয় ও ক্যাশ ভাউচার
                  </p>
                </div>

                <div className="py-12 text-slate-400 border border-dashed border-slate-300 rounded-lg p-6">
                  <Sparkles className="w-8 h-8 text-emerald-700 mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-semibold text-slate-700">
                    A4 Portrait প্রিন্ট লেআউট সক্রিয়
                  </p>
                  <p className="text-xs mt-1">
                    পরবর্তী পার্টে এখানে ডায়নামিক খরচের টেবিল, বাংলা কথায় অংক এবং পেন সাইন ব্লক রেন্ডার হবে।
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 text-xs text-slate-600 pt-6 border-t border-slate-200">
                  <div>
                    <div className="border-b border-dashed border-slate-400 h-8 mb-1" />
                    প্রস্তুতকারীর স্বাক্ষর
                  </div>
                  <div>
                    <div className="border-b border-dashed border-slate-400 h-8 mb-1" />
                    যাচাইকারীর স্বাক্ষর
                  </div>
                  <div>
                    <div className="border-b border-dashed border-slate-400 h-8 mb-1" />
                    অনুমোদনকারীর স্বাক্ষর
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

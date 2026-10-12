import { useState, useEffect, useRef } from 'react';
import { VoucherData } from './types/voucher';
import { getTodayISODate } from './utils/dateUtils';
import { Navbar } from './components/Navbar';
import { VoucherForm } from './components/VoucherForm';
import { VoucherPreview } from './components/VoucherPreview';
import { SupportDeveloper } from './components/SupportDeveloper';
import { DraftsManager } from './components/DraftsManager';
import { TemplateGalleryModal } from './components/TemplateGalleryModal';
import { PrintAssistantModal } from './components/PrintAssistantModal';
import {
  downloadVoucherPdf,
  downloadVoucherJpg,
  isRunningInIframe,
} from './utils/voucherExport';
import {
  Printer,
  Eye,
  Edit3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Heart,
  HelpCircle,
  Palette,
  CheckCircle2,
  Download,
  FileDown,
  Loader2,
  Type,
} from 'lucide-react';

const STORAGE_KEY_CURRENT = 'universal_voucher_current_v2';
const STORAGE_KEY_DRAFTS = 'universal_voucher_drafts_v2';

const sampleVoucherData: VoucherData = {
  id: 'voucher_sample_1',
  templateTheme: 'classic-emerald',
  fontFamily: 'hind-siliguri',
  logoVariant: 'emblem',
  branchName: 'ফিলিপনগর',
  customTitle: '',
  voucherNo: '১০১',
  date: getTodayISODate(),
  manualDateText: '',
  fiscalYear: '২০২৫-২০২৬',
  items: [
    {
      id: 'item_1',
      category: 'সভা ও সম্মেলন',
      description: 'মাসিক দায়িত্বশীল ও সুধী সমাবেশের আপ্যায়ন (চা, বিস্কুট ও ফলমূল)',
      amount: 2450,
    },
    {
      id: 'item_2',
      category: 'প্রচার ও প্রকাশনা',
      description: 'দাওয়াতি লিফলেট, রমজান ক্যালেন্ডার ও পরিচিতি বুকলেট ফটোকপি',
      amount: 1200,
    },
    {
      id: 'item_3',
      category: 'অফিস স্টেশনারি',
      description: 'বাইতুলমাল রশিদ বই, রেজিস্টার খাতা ও অফসেট পেপার ক্রয়',
      amount: 850,
    },
    {
      id: 'item_4',
      category: 'যাতায়াত ও ভাড়া',
      description: 'থানা প্রতিনিধি বৈঠকে যোগদান ও যোগাযোগের যাতায়াত ভাড়া',
      amount: 500,
    },
  ],
  preparerNumberEnabled: true,
  preparerNumberType: 'বিকাশ',
  preparerNumber: '০১৭১২-৩৪৫৬৭৮',
  preparedBy: 'মুহাম্মদ আব্দুল্লাহ আল মামুন',
  preparedByLabel: 'প্রস্তুতকারীর স্বাক্ষর',
  preparedByDesignation: 'অফিস সম্পাদক',

  verifierEnabled: true,
  verifierLabel: 'যাচাইকারী / হিসাবরক্ষক',
  verifierName: 'হাফেজ মো: ইব্রাহিম খলিল',
  verifierDesignation: 'অর্থ সম্পাদক',

  approverEnabled: true,
  approverLabel: 'অনুমোদনকারী / সভাপতি',
  approverName: 'মাওলানা মোঃ ফজলুর রহমান',
  approverDesignation: 'আমীর / সভাপতি',

  showQrCode: true,
  remarksEnabled: true,
  remarks: 'মাসিক বায়তুলমাল হিসাব নিকাশ অনুযায়ী অনুমোদিত ও পরিশোধিত।',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<'editor' | 'support' | 'drafts'>('editor');
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDownloadingJpg, setIsDownloadingJpg] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const [voucher, setVoucher] = useState<VoucherData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return sampleVoucherData;
  });

  const [drafts, setDrafts] = useState<VoucherData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DRAFTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [sampleVoucherData];
  });

  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const voucherPrintRef = useRef<HTMLDivElement>(null);

  // Auto-save current voucher
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(voucher));
    } catch {
      // ignore
    }
  }, [voucher]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Smart Print Handler (works directly and provides assistant if inside an iframe)
  const handlePrint = (forceDirect: boolean = false) => {
    // 1. If on other tabs, return to editor
    if (currentTab !== 'editor') {
      setCurrentTab('editor');
    }

    // 2. If mobile is in 'form' view, switch to 'preview' so DOM is actively rendered
    if (mobileView !== 'preview') {
      setMobileView('preview');
    }

    // 3. Temporarily reset zoom so dimensions are 1:1
    const prevZoom = zoomLevel;
    if (prevZoom !== 1) {
      setZoomLevel(1);
    }

    const inIframe = isRunningInIframe();

    // 4. Give browser time to settle DOM layout before print
    setTimeout(() => {
      try {
        window.focus();
        window.print();
      } catch (err) {
        console.warn('Standard window.print call encountered issue:', err);
      } finally {
        if (prevZoom !== 1) {
          setTimeout(() => {
            setZoomLevel(prevZoom);
          }, 800);
        }
      }

      // If running inside an iframe (like AI Studio preview sandbox where print modals are blocked),
      // or if direct print fails, open the helpful assistant modal with 1-click PDF download
      if (inIframe && !forceDirect) {
        setIsPrintModalOpen(true);
      } else {
        showToast('প্রিন্ট উইন্ডো সক্রিয় করা হয়েছে।');
      }
    }, 150);
  };

  // Global Ctrl+P / Cmd+P shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTab, mobileView, zoomLevel]);

  // High-Resolution & Crisp PDF Download Handler
  const handleDownloadPdf = async () => {
    if (currentTab !== 'editor') {
      setCurrentTab('editor');
    }
    if (mobileView !== 'preview') {
      setMobileView('preview');
    }

    setIsDownloadingPdf(true);
    showToast('উচ্চ রেজ্যুলেশনের আসল PDF তৈরি হচ্ছে, অপেক্ষা করুন...');

    // Save current zoom, reset to 1 for crisp 1:1 capture
    const prevZoom = zoomLevel;
    if (prevZoom !== 1) {
      setZoomLevel(1);
      await new Promise((r) => setTimeout(r, 120));
    }

    const node = document.getElementById('printable-voucher');
    if (!node) {
      setIsDownloadingPdf(false);
      showToast('ভাউচার প্রিভিউ খুঁজে পাওয়া যায়নি।');
      if (prevZoom !== 1) setZoomLevel(prevZoom);
      return;
    }

    try {
      await downloadVoucherPdf(node, voucher);
      showToast('ভাউচারটি PDF ফাইল হিসেবে সফলভাবে ডাউনলোড হয়েছে!');
      if (isPrintModalOpen) {
        setIsPrintModalOpen(false);
      }
    } catch (err) {
      console.error('Failed to generate PDF document:', err);
      showToast('PDF ফাইল তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsDownloadingPdf(false);
      if (prevZoom !== 1) {
        setZoomLevel(prevZoom);
      }
    }
  };

  // High-Resolution JPG Download Handler
  const handleDownloadJpg = async () => {
    if (currentTab !== 'editor') {
      setCurrentTab('editor');
    }
    if (mobileView !== 'preview') {
      setMobileView('preview');
    }

    setIsDownloadingJpg(true);
    showToast('উচ্চ রেজ্যুলেশনের JPG তৈরি হচ্ছে, অপেক্ষা করুন...');

    // Save current zoom, reset to 1 for crisp capture
    const prevZoom = zoomLevel;
    if (prevZoom !== 1) {
      setZoomLevel(1);
      await new Promise((r) => setTimeout(r, 120));
    }

    const node = document.getElementById('printable-voucher');
    if (!node) {
      setIsDownloadingJpg(false);
      showToast('ভাউচার প্রিভিউ খুঁজে পাওয়া যায়নি।');
      if (prevZoom !== 1) setZoomLevel(prevZoom);
      return;
    }

    try {
      await downloadVoucherJpg(node, voucher);
      showToast('ভাউচারটি JPG ছবি হিসেবে সফলভাবে ডাউনলোড হয়েছে!');
      if (isPrintModalOpen) {
        setIsPrintModalOpen(false);
      }
    } catch (err) {
      console.error('Failed to generate JPG image:', err);
      showToast('JPG ফাইল তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsDownloadingJpg(false);
      if (prevZoom !== 1) {
        setZoomLevel(prevZoom);
      }
    }
  };

  // Reset form to clean voucher
  const handleReset = () => {
    if (window.confirm('আপনি কি নতুন ভাউচার শুরু করতে চান? বর্তমান এন্ট্রি পরিষ্কার হবে।')) {
      const newVoucher: VoucherData = {
        id: 'voucher_' + Date.now(),
        templateTheme: voucher.templateTheme || 'classic-emerald',
        branchName: voucher.branchName || 'ফিলিপনগর',
        customTitle: '',
        voucherNo: '',
        date: getTodayISODate(),
        manualDateText: '',
        items: [
          {
            id: 'item_' + Date.now(),
            category: 'সভা ও সম্মেলন',
            description: '',
            amount: 0,
          },
        ],
        preparerNumberEnabled: true,
        preparerNumberType: 'বিকাশ',
        preparerNumber: '',
        preparedBy: '',
        preparedByLabel: 'প্রস্তুতকারীর স্বাক্ষর',
        preparedByDesignation: '',

        verifierEnabled: true,
        verifierLabel: 'যাচাইকারী / হিসাবরক্ষক',
        verifierName: '',
        verifierDesignation: '',

        approverEnabled: true,
        approverLabel: 'অনুমোদনকারী / সভাপতি',
        approverName: '',
        approverDesignation: '',

        showQrCode: true,
        remarksEnabled: true,
        remarks: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setVoucher(newVoucher);
      setIsDraftSaved(false);
      showToast('নতুন ভাউচার শিট তৈরি করা হয়েছে।');
    }
  };

  // Load sample data
  const handleLoadSample = () => {
    setVoucher(sampleVoucherData);
    setIsDraftSaved(false);
    setCurrentTab('editor');
    showToast('নমুনা ভাউচার ডেটা লোড হয়েছে।');
  };

  // Save current to drafts list
  const handleSaveDraft = () => {
    const updatedDrafts = [
      { ...voucher, updatedAt: new Date().toISOString() },
      ...drafts.filter((d) => d.id !== voucher.id),
    ];
    setDrafts(updatedDrafts);
    try {
      localStorage.setItem(STORAGE_KEY_DRAFTS, JSON.stringify(updatedDrafts));
    } catch {
      // ignore
    }
    setIsDraftSaved(true);
    showToast('ভাউচারটি সফলভাবে ড্রাফট তালিকায় সংরক্ষণ করা হয়েছে!');
    setTimeout(() => setIsDraftSaved(false), 2500);
  };

  // Load selected draft
  const handleLoadDraft = (draft: VoucherData) => {
    setVoucher(draft);
    setCurrentTab('editor');
    showToast('নির্বাচিত ড্রাফট লোড করা হয়েছে।');
  };

  // Delete draft
  const handleDeleteDraft = (id: string) => {
    if (window.confirm('আপনি কি এই ড্রাফটটি মুছে ফেলতে চান?')) {
      const updatedDrafts = drafts.filter((d) => d.id !== id);
      setDrafts(updatedDrafts);
      try {
        localStorage.setItem(STORAGE_KEY_DRAFTS, JSON.stringify(updatedDrafts));
      } catch {
        // ignore
      }
      showToast('ড্রাফট মুছে ফেলা হয়েছে।');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* 1. Header Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onPrint={() => handlePrint()}
        onDownloadPdf={handleDownloadPdf}
        isDownloadingPdf={isDownloadingPdf}
        onDownloadJpg={handleDownloadJpg}
        isDownloadingJpg={isDownloadingJpg}
        onOpenTemplatesModal={() => setIsTemplateModalOpen(true)}
        draftsCount={drafts.length}
      />

      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-950 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top duration-200 print:hidden border border-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Template Gallery Modal */}
      <TemplateGalleryModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        selectedTheme={voucher.templateTheme || 'classic-emerald'}
        onSelectTheme={(theme) => {
          setVoucher((prev) => ({ ...prev, templateTheme: theme }));
          showToast('ভাউচার ডিজাইন লেআউট পরিবর্তন করা হয়েছে!');
        }}
      />

      {/* Print & Export Assistant Modal */}
      <PrintAssistantModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        voucher={voucher}
        onDownloadPdf={handleDownloadPdf}
        isDownloadingPdf={isDownloadingPdf}
        onDownloadJpg={handleDownloadJpg}
        isDownloadingJpg={isDownloadingJpg}
        onRetryPrint={() => handlePrint(true)}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1">
        {/* TAB 1: Support Developer Page */}
        {currentTab === 'support' && (
          <SupportDeveloper onBack={() => setCurrentTab('editor')} />
        )}

        {/* TAB 2: Drafts Manager */}
        {currentTab === 'drafts' && (
          <DraftsManager
            drafts={drafts}
            onLoadDraft={handleLoadDraft}
            onDeleteDraft={handleDeleteDraft}
            onBack={() => setCurrentTab('editor')}
            onNewVoucher={handleReset}
          />
        )}

        {/* TAB 3: Voucher Editor & Live A4 Preview */}
        {currentTab === 'editor' && (
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
                ফর্ম এডিটর
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
                {voucher.templateTheme === 'dual-5x8-a4'
                  ? 'A4 ২-কপি প্রিভিউ'
                  : voucher.templateTheme === 'memo-5x8'
                  ? '৫"×৮" প্রিভিউ'
                  : 'A4 ভাউচার প্রিভিউ'}
              </button>
            </div>

            {/* Desktop Two-Panel Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT PANEL: Form Editor (5 cols on 12-col grid) */}
              <div
                className={`lg:col-span-5 space-y-4 print:hidden ${
                  mobileView === 'preview' ? 'hidden lg:block' : 'block'
                }`}
              >
                <VoucherForm
                  voucher={voucher}
                  onChange={setVoucher}
                  onPrint={() => handlePrint()}
                  onDownloadPdf={handleDownloadPdf}
                  isDownloadingPdf={isDownloadingPdf}
                  onDownloadJpg={handleDownloadJpg}
                  isDownloadingJpg={isDownloadingJpg}
                  onReset={handleReset}
                  onLoadSample={handleLoadSample}
                  onSaveDraft={handleSaveDraft}
                  onOpenTemplatesModal={() => setIsTemplateModalOpen(true)}
                  isDraftSaved={isDraftSaved}
                />

                {/* Helpful instructions card */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-emerald-800" />
                    ব্যবহার সহায়িকা ও টিপস:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
                    <li>
                      <strong>PDF ডাউনলোড:</strong> ১০০% প্রিন্ট-রেডি ফাইল পেতে "PDF ডাউনলোড" করুন। এটি সরাসরি প্রিন্টার থেকে নিখুঁতভাবে প্রিন্ট করা যাবে।
                    </li>
                    <li>
                      <strong>JPG ডাউনলোড:</strong> মোবাইলে সংরক্ষণ বা হোয়াটসঅ্যাপে শেয়ারের জন্য সরাসরি উচ্চ রেজ্যুলেশনের JPG ছবি ডাউনলোড করুন।
                    </li>
                    <li>
                      <strong>এক পাতায় ২ কপি:</strong> কাগজের অপচয় কমাতে "A4 ২-কপি" নির্বাচন করুন। একই A4 কাগজে অফিস কপি ও গ্রহীতা কপি একসাথে প্রিন্ট হবে।
                    </li>
                  </ul>
                </div>
              </div>

              {/* RIGHT PANEL: Live A4 Preview (7 cols on 12-col grid) */}
              <div
                className={`lg:col-span-7 flex flex-col items-center print-area-wrapper ${
                  mobileView === 'form' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                {/* Preview Toolbar */}
                <div
                  className={`w-full ${
                    voucher.templateTheme === 'dual-5x8-a4' &&
                    voucher.dualCopyOrientation === 'landscape'
                      ? 'max-w-[297mm]'
                      : 'max-w-[210mm]'
                  } mb-3 flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs print:hidden`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-800" />
                      {voucher.templateTheme === 'dual-5x8-a4'
                        ? 'লাইভ A4 ২-কপি (ডাবল) প্রিভিউ'
                        : voucher.templateTheme === 'memo-5x8'
                        ? 'লাইভ ৫" × ৮" প্যাড প্রিভিউ'
                        : 'লাইভ A4 প্রিন্ট প্রিভিউ'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsTemplateModalOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      <Palette className="w-3 h-3" />
                      লেআউট
                    </button>

                    {/* Font Selector in Toolbar */}
                    <div className="flex items-center gap-1 bg-amber-50/80 border border-amber-300/80 px-2 py-0.5 rounded-md text-[11px]">
                      <Type className="w-3 h-3 text-amber-800 shrink-0" />
                      <select
                        value={voucher.fontFamily || 'sutonnymj'}
                        onChange={(e) =>
                          setVoucher((prev) => ({
                            ...prev,
                            fontFamily: e.target.value as any,
                          }))
                        }
                        className="bg-transparent border-none text-[11px] font-bold text-amber-950 focus:outline-none cursor-pointer pr-1"
                        title="বাংলা ফন্ট নির্বাচন (SutonnyMJ সহ)"
                      >
                        <option value="sutonnymj">সুতোন্নি এমজে (SutonnyMJ)</option>
                        <option value="hind-siliguri">হিন্দ শিলিগুড়ি (Hind Siliguri)</option>
                        <option value="solaimanlipi">সোলাইমান লিপি (SolaimanLipi)</option>
                        <option value="kalpurush">কালপুরুষ (Kalpurush)</option>
                        <option value="tiro-bangla">তিরো বাংলা (Tiro Bangla)</option>
                      </select>
                    </div>

                    <span className="text-[11px] text-slate-400">
                      (স্কেল: {Math.round(zoomLevel * 100)}%)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Zoom Out */}
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="ছোট করুন"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>

                    {/* Reset Zoom */}
                    <button
                      type="button"
                      onClick={() => setZoomLevel(0.85)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="স্বাভাবিক আকার"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    {/* Zoom In */}
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.min(1.2, z + 0.1))}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="বড় করুন"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    <div className="h-4 w-px bg-slate-200 mx-1" />

                    {/* JPG Download in preview toolbar */}
                    <button
                      type="button"
                      onClick={handleDownloadJpg}
                      disabled={isDownloadingJpg}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer disabled:opacity-50"
                      title="ভাউচারটি JPG হিসেবে ডাউনলোড করুন"
                    >
                      {isDownloadingJpg ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-800" />
                      ) : (
                        <Download className="w-3.5 h-3.5 text-emerald-800" />
                      )}
                      JPG
                    </button>

                    {/* PDF Download in preview toolbar */}
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      disabled={isDownloadingPdf}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-100/90 hover:bg-emerald-200 text-emerald-950 text-xs font-bold border border-emerald-300 transition-colors cursor-pointer disabled:opacity-50"
                      title="ভাউচারটি প্রিন্ট-রেডি আসল PDF হিসেবে ডাউনলোড করুন"
                    >
                      {isDownloadingPdf ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-900" />
                      ) : (
                        <FileDown className="w-3.5 h-3.5 text-emerald-900" />
                      )}
                      PDF
                    </button>

                    {/* Print in preview toolbar */}
                    <button
                      type="button"
                      onClick={() => handlePrint()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      title="সরাসরি প্রিন্ট করুন"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      প্রিন্ট
                    </button>
                  </div>
                </div>

                {/* Printable Container Viewport */}
                <div className="w-full flex justify-center overflow-x-auto py-2 print-preview-container print:overflow-visible">
                  <VoucherPreview
                    ref={voucherPrintRef}
                    voucher={voucher}
                    zoom={zoomLevel}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-4 px-4 print:hidden text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-700">
              ইউনিভার্সেল রশিদ ও ভাউচার জেনারেটর
            </span>{' '}
            · ফিলিপনগর জামায়াতে ইসলামী ও অন্যান্য সাংগঠনিক শাখা
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentTab('support')}
              className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-medium cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              Support Developer: পারভেজ (০১৭০০৯৬৬২৩৯)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

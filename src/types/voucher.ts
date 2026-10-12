export interface ExpenseItem {
  id: string;
  category: string; // খরচের খাত (e.g. সভা/সম্মেলন, আপ্যায়ন, প্রচারপত্র, ইত্যাদি)
  description: string; // বিবরণ
  amount: number; // টাকা
}

export type PaymentMethod = 'নগদ' | 'বিকাশ' | 'রকেট' | 'ব্যাংক' | 'অন্যান্য';

export interface PaymentInfo {
  method: PaymentMethod;
  transactionId?: string; // ট্রানজেকশন আইডি (বিকাশ/রকেট/অন্যান্য)
  bankName?: string; // ব্যাংকের নাম
  accountNo?: string; // অ্যাকাউন্ট নং
  chequeNo?: string; // চেক নং
  notes?: string; // অতিরিক্ত মন্তব্য
}

export type TemplateTheme =
  | 'classic-emerald'
  | 'modern-slate'
  | 'royal-navy'
  | 'compact-memo'
  | 'memo-5x8'
  | 'dual-5x8-a4';

export type BengaliFontFamily =
  | 'sutonnymj'
  | 'solaimanlipi'
  | 'kalpurush'
  | 'tiro-bangla'
  | 'hind-siliguri';

export interface VoucherTemplatePreset {
  id: TemplateTheme;
  title: string;
  subtitle: string;
  description: string;
  colorHex: string;
  accentClass: string;
}

export interface VoucherData {
  id: string;
  templateTheme?: TemplateTheme;
  fontFamily?: BengaliFontFamily; // বাংলা ফন্ট শৈলী
  customLogoUrl?: string; // ব্যবহারকারীর আপলোডকৃত নিজস্ব লোগো বা প্রতীক
  logoVariant?: 'emblem' | 'scales-only'; // বাংলাদেশ জামায়াতে ইসলামী প্রতীক শৈলী ('emblem' = মনোগ্রাম ও দাঁড়িপাল্লা, 'scales-only' = দাঁড়িপাল্লা প্রতীক)
  branchName: string; // এলাকা/শাখা (ডিফল্ট: ফিলিপনগর)
  customTitle?: string; // অপশনাল কাস্টম শিরোনাম
  voucherNo: string; // সাপোর্টিং ভাউচার নং / রশিদ নং
  date: string; // তারিখ (YYYY-MM-DD or formatted)
  manualDateText?: string; // ম্যানুয়াল তারিখ এডিট
  fiscalYear?: string; // অর্থবছর (e.g. ২০২৫-২০২৬)
  items: ExpenseItem[];

  // প্রস্তুতকারীর নাম্বার ও মাধ্যম (বিকাশ, নগদ, রকেট, ব্যাংক ইত্যাদি - এডিটেবল ও রিমুভযোগ্য)
  preparerNumberEnabled?: boolean;
  preparerNumberType?: string; // যেমন: বিকাশ, নগদ, রকেট, ব্যাংক, অন্যান্য (বা কাস্টম)
  preparerNumber?: string; // প্রস্তুতকারীর নাম্বার / হিসাব নং

  payment?: PaymentInfo; // পূর্বের ডাটা কম্প্যাটিবিলিটির জন্য

  // প্রস্তুতকারক
  preparedBy: string; // প্রস্তুতকারকের পূর্ণ নাম
  preparedByLabel?: string; // যেমন: "প্রস্তুতকারীর স্বাক্ষর"
  preparedByDesignation?: string; // প্রস্তুতকারকের পদবী

  // যাচাইকারী / হিসাবরক্ষক (এডিটেবল ও রিমুভযোগ্য)
  verifierEnabled?: boolean;
  verifierLabel?: string; // যেমন: "যাচাইকারী / হিসাবরক্ষক"
  verifierName?: string;
  verifierDesignation?: string;

  // অনুমোদনকারী / সভাপতি (এডিটেবল ও রিমুভযোগ্য)
  approverEnabled?: boolean;
  approverLabel?: string; // যেমন: "অনুমোদনকারী / সভাপতি"
  approverName?: string;
  approverDesignation?: string;

  // QR Code অপশন (ভাউচার নং, তারিখ ও সর্বমোট টাকা)
  showQrCode?: boolean;

  // বিশেষ মন্তব্য (এডিটেবল ও রিমুভযোগ্য)
  remarksEnabled?: boolean;
  remarks?: string; // বিশেষ দ্রষ্টব্য

  // এক পাতায় ২ কপি (A4 ডাবল ভাউচার) অপশন
  dualCopyOrientation?: 'portrait' | 'landscape'; // 'portrait' = উপরে-নিচে, 'landscape' = পাশাপাশি
  dualCopyLabel1?: string; // প্রথম কপির শিরোনাম (ডিফল্ট: 'অফিস কপি')
  dualCopyLabel2?: string; // দ্বিতীয় কপির শিরোনাম (ডিফল্ট: 'গ্রহীতা কপি')

  createdAt: string;
  updatedAt: string;
}

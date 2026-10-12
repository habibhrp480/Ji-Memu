import { BengaliFontFamily } from '../types/voucher';

export interface BengaliFontOption {
  id: BengaliFontFamily;
  name: string;
  badge: string;
  description: string;
  previewText: string;
  fontFamily: string;
}

export const BENGALI_FONTS: BengaliFontOption[] = [
  {
    id: 'hind-siliguri',
    name: 'হিন্দ শিলিগুড়ি (Hind Siliguri)',
    badge: 'ডিফল্ট ও ক্রিস্টাল ক্লিয়ার',
    description: 'সর্বাধুনিক ওয়েব ও স্ক্রিন-রেডি স্পষ্ট, ঝকঝকে ও অত্যন্ত তীক্ষ্ণ বাংলা ফন্ট',
    previewText: 'ক্যাশ ভাউচার প্যাড',
    fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  {
    id: 'sutonnymj',
    name: 'সুতোন্নি এমজে (SutonnyMJ)',
    badge: 'ঐচ্ছিক প্রেস ও মেমো',
    description: 'প্রেস ও পুরনো ক্যাশ মেমোর ক্লাসিক ফন্ট (পিসিতে সুতোন্নি থাকলে কার্যকর)',
    previewText: 'ক্যাশ ভাউচার প্যাড',
    fontFamily:
      "'SutonnyMJ', 'SutonnyMJ Unicode', 'SutonnyBanglaOMJ', 'SolaimanLipi', 'Kalpurush', 'Tiro Bangla', 'Noto Serif Bengali', 'Hind Siliguri', serif",
  },
  {
    id: 'solaimanlipi',
    name: 'সোলাইমান লিপি (SolaimanLipi)',
    badge: 'জনপ্রিয় প্রকাশনা',
    description: 'মার্জিত বাংলা প্রকাশনা ও অফসেট প্রিন্ট ফন্ট',
    previewText: 'ক্যাশ ভাউচার প্যাড',
    fontFamily: "'SolaimanLipi', 'Kalpurush', 'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
  },
  {
    id: 'kalpurush',
    name: 'কালপুরুষ (Kalpurush)',
    badge: 'অফিসিয়াল ফর্ম',
    description: 'অফিসিয়াল ফর্ম, রেজিস্টার ও অ্যাকাউন্টিং ফন্ট',
    previewText: 'ক্যাশ ভাউচার প্যাড',
    fontFamily: "'Kalpurush', 'SolaimanLipi', 'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
  },
  {
    id: 'tiro-bangla',
    name: 'তিরো বাংলা (Tiro Bangla)',
    badge: 'সেরিফ ও প্রেস',
    description: 'ঐতিহ্যবাহী মেমো প্যাডের ধাতব টাইপ স্টাইল',
    previewText: 'ক্যাশ ভাউচার প্যাড',
    fontFamily: "'Tiro Bangla', 'Noto Serif Bengali', 'SolaimanLipi', serif",
  },
];

export function getBengaliFontFamily(font?: BengaliFontFamily): string {
  switch (font) {
    case 'hind-siliguri':
      return "'Hind Siliguri', 'Noto Sans Bengali', -apple-system, BlinkMacSystemFont, sans-serif";
    case 'sutonnymj':
      return "'SutonnyMJ', 'SutonnyMJ Unicode', 'SutonnyBanglaOMJ', 'SolaimanLipi', 'Kalpurush', 'Tiro Bangla', 'Noto Serif Bengali', 'Hind Siliguri', serif";
    case 'solaimanlipi':
      return "'SolaimanLipi', 'Kalpurush', 'Hind Siliguri', 'Noto Sans Bengali', sans-serif";
    case 'kalpurush':
      return "'Kalpurush', 'SolaimanLipi', 'Hind Siliguri', 'Noto Sans Bengali', sans-serif";
    case 'tiro-bangla':
      return "'Tiro Bangla', 'Noto Serif Bengali', 'SolaimanLipi', serif";
    case 'hind-siliguri':
    default:
      return "'Hind Siliguri', 'Noto Sans Bengali', sans-serif";
  }
}

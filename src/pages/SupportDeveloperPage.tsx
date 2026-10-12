import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  Send,
  ExternalLink,
  Copy,
  Check,
  Heart,
  User,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export default function SupportDeveloperPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const developerInfo = {
    name: 'Md Habibbur Rahman Parvez',
    title: 'Full-Stack Software Engineer & UI/UX Designer',
    phone: '01700966239',
    email: 'dydhabibit@gmail.com',
    facebook: 'https://facebook.com/habiurrahman.habibur',
    facebookHandle: 'habiurrahman.habibur',
    telegram: 'https://t.me/Habibfrp',
    telegramHandle: '@Habibfrp',
    paymentMethods: ['bKash', 'Nagad', 'Rocket'],
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 print:hidden">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:text-emerald-950 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        ভাউচার জেনারেটরে ফিরে যান
      </Link>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner with emerald gradient */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-white shrink-0 shadow-md">
              <User className="w-10 h-10 text-emerald-200" />
            </div>

            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 text-emerald-100 text-xs font-medium mb-2 backdrop-blur-xs">
                <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
                Support Developer
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {developerInfo.name}
              </h1>
              <p className="text-emerald-100 text-sm mt-1">
                {developerInfo.title}
              </p>
              <p className="text-emerald-200/80 text-xs mt-2 max-w-xl leading-relaxed">
                এই ইউনিভার্সেল রশিদ/ভাউচার ওয়েব অ্যাপটি উন্মুক্ত ও বিনামূল্যে ব্যবহারের জন্য তৈরি করা হয়েছে।
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 1. Payment / Support Options */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              হাদিয়া / ডোনেশন / সাপোর্ট (Payment Details)
            </h2>
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-950">
                      পার্সোনাল নম্বর:
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-900 tracking-wider">
                      {developerInfo.phone}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs text-slate-600 font-medium">উপলব্ধ মাধ্যম:</span>
                    {developerInfo.paymentMethods.map((method) => (
                      <span
                        key={method}
                        className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-white border border-emerald-300 text-emerald-900 shadow-2xs"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(developerInfo.phone, 'phone')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
                  >
                    {copiedKey === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        কপি হয়েছে
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        নম্বর কপি
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${developerInfo.phone}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    কল দিন
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Direct Contacts Grid */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              যোগাযোগের সরাসরি মাধ্যম
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Direct */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-slate-500">
                      মোবাইল নম্বর
                    </span>
                    <span className="text-sm font-bold text-slate-900 font-mono">
                      {developerInfo.phone}
                    </span>
                  </div>
                </div>
                <a
                  href={`tel:${developerInfo.phone}`}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  কল
                </a>
              </div>

              {/* Email Direct */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-blue-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="block text-xs font-medium text-slate-500">
                      ইমেইল (Gmail)
                    </span>
                    <span className="text-sm font-semibold text-slate-900 truncate">
                      {developerInfo.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(developerInfo.email, 'email')}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="কপি করুন"
                  >
                    {copiedKey === 'email' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`mailto:${developerInfo.email}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
                  >
                    মেইল
                  </a>
                </div>
              </div>

              {/* Facebook */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100/70 text-indigo-800 flex items-center justify-center shrink-0">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-slate-500">
                      ফেসবুক প্রোফাইল
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {developerInfo.facebookHandle}
                    </span>
                  </div>
                </div>
                <a
                  href={developerInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-800 hover:bg-indigo-100 transition-colors"
                >
                  ভিজিট
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Telegram */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-100/70 text-sky-800 flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-slate-500">
                      টেলিগ্রাম আইডি
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {developerInfo.telegramHandle}
                    </span>
                  </div>
                </div>
                <a
                  href={developerInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 transition-colors"
                >
                  মেসেজ
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

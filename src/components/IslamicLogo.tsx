import React, { useId } from 'react';

export interface IslamicLogoProps {
  className?: string;
  customLogoUrl?: string;
  variant?: 'emblem' | 'scales-only';
}

/**
 * বাংলাদেশ জামায়াতে ইসলামী অফিসিয়াল প্রতীক ও লোগো উপাদান
 * - 'emblem': পূর্ণাঙ্গ সিলমোহর (দাঁড়িপাল্লা, আল-কুরআন, 'আকিমুদ্দীন' ও 'বাংলাদেশ জামায়াতে ইসলামী' খচিত)
 * - 'scales-only': সুনির্দিষ্ট দাঁড়িপাল্লা প্রতীক (নির্বাচনী ও সাংগঠনিক মূল প্রতীক)
 */
export function IslamicLogo({
  className = 'w-14 h-14',
  customLogoUrl,
  variant = 'emblem',
}: IslamicLogoProps) {
  const reactId = useId();
  const safeId = reactId.replace(/[^a-zA-Z0-9]/g, '');
  const topArcId = `bji-top-arc-${safeId}`;
  const botArcId = `bji-bot-arc-${safeId}`;

  // ব্যবহারকারীর আপলোডকৃত নিজস্ব লোগো থাকলে তা রেন্ডার করা হবে
  if (customLogoUrl) {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={customLogoUrl}
          alt="বাংলাদেশ জামায়াতে ইসলামী প্রতীক"
          className="w-full h-full object-contain drop-shadow-2xs"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // ১. খাঁটি দাঁড়িপাল্লা প্রতীক (Scales of Justice Standalone)
  if (variant === 'scales-only') {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 select-none ${className}`}
        title="বাংলাদেশ জামায়াতে ইসলামী প্রতীক (দাঁড়িপাল্লা)"
      >
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* সূক্ষ্ম বৃত্তাকার ব্যাকগ্রাউন্ড বাবল */}
          <circle cx="80" cy="80" r="76" fill="#f0fdf4" stroke="#047857" strokeWidth="2" />
          <circle cx="80" cy="80" r="72" fill="none" stroke="#d97706" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* দাঁড়িপাল্লার ঝুলন্ত শীর্ষ রিং ও ফিনিয়াল */}
          <circle cx="80" cy="24" r="5" fill="none" stroke="#065f46" strokeWidth="2.5" />
          <path d="M 80 18 L 80 29" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" />

          {/* মূল উল্লম্ব দণ্ড (Vertical Shaft) */}
          <path d="M 80 29 L 80 128" stroke="#065f46" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 79 32 L 79 126" stroke="#044e39" strokeWidth="1.2" />

          {/* কাঁটা / ব্যালেন্স পয়েন্টার (Pointer Needle) */}
          <path d="M 78 52 L 80 34 L 82 52 Z" fill="#b45309" stroke="#78350f" strokeWidth="0.8" />
          <circle cx="80" cy="52" r="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />

          {/* অনুভূমিক মূল দণ্ড (Horizontal Balance Beam) */}
          <path
            d="M 28 52 C 45 49 65 52 80 52 C 95 52 115 49 132 52"
            stroke="#065f46"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          {/* দণ্ডের দুই প্রান্তের হুক / রিং */}
          <circle cx="28" cy="52" r="3" fill="#d97706" stroke="#065f46" strokeWidth="1.5" />
          <circle cx="132" cy="52" r="3" fill="#d97706" stroke="#065f46" strokeWidth="1.5" />

          {/* বাম পাল্লার ৩টি রশি / শিকল */}
          <line x1="28" y1="53" x2="16" y2="86" stroke="#065f46" strokeWidth="1.2" />
          <line x1="28" y1="53" x2="28" y2="87" stroke="#065f46" strokeWidth="1.2" />
          <line x1="28" y1="53" x2="40" y2="86" stroke="#065f46" strokeWidth="1.2" />

          {/* বাম বাটি / পাল্লা (Left Pan) */}
          <path
            d="M 14 86 Q 28 89 42 86 C 42 101 14 101 14 86 Z"
            fill="#044e39"
            stroke="#065f46"
            strokeWidth="1.5"
          />
          {/* বাটির ওপরের বর্ডার সোনালী রিম */}
          <path d="M 14 86 Q 28 89 42 86" stroke="#fbbf24" strokeWidth="1.5" fill="none" />

          {/* ডান পাল্লার ৩টি রশি / শিকল */}
          <line x1="132" y1="53" x2="120" y2="86" stroke="#065f46" strokeWidth="1.2" />
          <line x1="132" y1="53" x2="132" y2="87" stroke="#065f46" strokeWidth="1.2" />
          <line x1="132" y1="53" x2="144" y2="86" stroke="#065f46" strokeWidth="1.2" />

          {/* ডান বাটি / পাল্লা (Right Pan) */}
          <path
            d="M 118 86 Q 132 89 146 86 C 146 101 118 101 118 86 Z"
            fill="#044e39"
            stroke="#065f46"
            strokeWidth="1.5"
          />
          {/* বাটির ওপরের বর্ডার সোনালী রিম */}
          <path d="M 118 86 Q 132 89 146 86" stroke="#fbbf24" strokeWidth="1.5" fill="none" />

          {/* দাঁড়িপাল্লার মজবুত বেদী / স্ট্যান্ড */}
          <path
            d="M 64 135 L 74 126 L 86 126 L 96 135 Z"
            fill="#065f46"
            stroke="#044e39"
            strokeWidth="1.5"
          />
          <rect x="58" y="135" width="44" height="6" rx="2" fill="#044e39" />
          <line x1="60" y1="135" x2="100" y2="135" stroke="#fbbf24" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // ২. পূর্ণাঙ্গ বাংলাদেশ জামায়াতে ইসলামী প্রতীক ও সিলমোহর (Official Crest & Emblem)
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none ${className}`}
      title="বাংলাদেশ জামায়াতে ইসলামী প্রতীক"
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xs"
      >
        <defs>
          {/* শীর্ষ বৃত্তাকার লেখার জন্য পাথ */}
          <path
            id={topArcId}
            d="M 23 80 A 57 57 0 0 1 137 80"
            fill="none"
          />
          {/* পাদদেশীয় বৃত্তাকার লেখার জন্য পাথ */}
          <path
            id={botArcId}
            d="M 21 82 A 59 59 0 0 0 139 82"
            fill="none"
          />
        </defs>

        {/* বাইরের গাঢ় সবুজ বৃত্ত */}
        <circle cx="80" cy="80" r="78" fill="#034834" />
        <circle cx="80" cy="80" r="76" stroke="#047857" strokeWidth="2" />

        {/* সোনালী মার্জিন রিং */}
        <circle cx="80" cy="80" r="73" fill="none" stroke="#d97706" strokeWidth="1.6" />
        {/* সূক্ষ্ম মুক্তার মালা / ডটেড রিং */}
        <circle
          cx="80"
          cy="80"
          r="69.5"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="0.9"
          strokeDasharray="2.5 2"
        />

        {/* ভেতরের সাদা মূল ক্যানভাস ডিস্ক */}
        <circle
          cx="80"
          cy="80"
          r="53.5"
          fill="#ffffff"
          stroke="#d97706"
          strokeWidth="1.4"
        />

        {/* শীর্ষ আরবী ক্যালিগ্রাফি: أَقِيمُوا الدِّينَ (আকিমুদ্দীন) */}
        <text className="font-bold select-none">
          <textPath
            href={`#${topArcId}`}
            startOffset="50%"
            textAnchor="middle"
            fill="#fef08a"
            fontSize="10.8"
            fontWeight="bold"
            letterSpacing="0.04em"
            style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
          >
            أَقِيمُوا الدِّينَ
          </textPath>
        </text>

        {/* দুই পাশের শোভাময় সোনালী তারকা */}
        <polygon
          points="17,80 19,83 22,83 19.5,85 20.5,88 17,86 13.5,88 14.5,85 12,83 15,83"
          fill="#fbbf24"
        />
        <polygon
          points="143,80 145,83 148,83 145.5,85 146.5,88 143,86 139.5,88 140.5,85 138,83 141,83"
          fill="#fbbf24"
        />

        {/* নিচের বৃত্তাকার বাংলা লেখা: বাংলাদেশ জামায়াতে ইসলামী */}
        <text className="font-bold select-none">
          <textPath
            href={`#${botArcId}`}
            startOffset="50%"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="8"
            fontWeight="700"
            letterSpacing="0.02em"
            style={{ fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif" }}
          >
            বাংলাদেশ জামায়াতে ইসলামী
          </textPath>
        </text>

        {/* ব্যাকগ্রাউন্ডে প্রভাতী সূর্যের স্নিগ্ধ সোনালী আলোকরশ্মি */}
        <g opacity="0.45">
          <line x1="80" y1="80" x2="80" y2="35" stroke="#fef08a" strokeWidth="1" />
          <line x1="80" y1="80" x2="60" y2="40" stroke="#fef08a" strokeWidth="0.8" />
          <line x1="80" y1="80" x2="100" y2="40" stroke="#fef08a" strokeWidth="0.8" />
          <line x1="80" y1="80" x2="45" y2="55" stroke="#fef08a" strokeWidth="0.8" />
          <line x1="80" y1="80" x2="115" y2="55" stroke="#fef08a" strokeWidth="0.8" />
        </g>

        {/* ----------------- দাঁড়িপাল্লা (Scales of Justice) ----------------- */}
        {/* শীর্ষ রিং ও পয়েন্টার */}
        <circle cx="80" cy="40" r="3.2" fill="none" stroke="#044e39" strokeWidth="1.4" />
        <line x1="80" y1="36" x2="80" y2="44" stroke="#044e39" strokeWidth="1.5" />

        {/* মূল উল্লম্ব স্তম্ভ */}
        <line x1="80" y1="44" x2="80" y2="101" stroke="#034834" strokeWidth="2.4" />

        {/* ব্যালেন্স সূচক কাঁটা (Vertical Pointer) */}
        <path d="M 78.5 53 L 80 44 L 81.5 53 Z" fill="#b45309" />
        <circle cx="80" cy="53" r="2.8" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />

        {/* অনুভূমিক সুষম ব্যালেন্স বার */}
        <path
          d="M 44 53 C 56 50.5 70 53 80 53 C 90 53 104 50.5 116 53"
          stroke="#034834"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* দণ্ডের দুই প্রান্তের সোনালী নব */}
        <circle cx="44" cy="53" r="1.8" fill="#d97706" />
        <circle cx="116" cy="53" r="1.8" fill="#d97706" />

        {/* বাম বাটির ৩টি ঝুলন্ত সূক্ষ্ম রশি */}
        <line x1="44" y1="54" x2="35" y2="79" stroke="#044e39" strokeWidth="0.8" />
        <line x1="44" y1="54" x2="44" y2="80" stroke="#044e39" strokeWidth="0.8" />
        <line x1="44" y1="54" x2="53" y2="79" stroke="#044e39" strokeWidth="0.8" />

        {/* বাম বাটি / পাল্লা */}
        <path
          d="M 34 79 Q 44 81.5 54 79 C 54 91 34 91 34 79 Z"
          fill="#044e39"
          stroke="#034834"
          strokeWidth="1.1"
        />
        <path d="M 34 79 Q 44 81.5 54 79" stroke="#fbbf24" strokeWidth="1.1" fill="none" />

        {/* ডান বাটির ৩টি ঝুলন্ত সূক্ষ্ম রশি */}
        <line x1="116" y1="54" x2="107" y2="79" stroke="#044e39" strokeWidth="0.8" />
        <line x1="116" y1="54" x2="116" y2="80" stroke="#044e39" strokeWidth="0.8" />
        <line x1="116" y1="54" x2="125" y2="79" stroke="#044e39" strokeWidth="0.8" />

        {/* ডান বাটি / পাল্লা */}
        <path
          d="M 106 79 Q 116 81.5 126 79 C 126 91 106 91 106 79 Z"
          fill="#044e39"
          stroke="#034834"
          strokeWidth="1.1"
        />
        <path d="M 106 79 Q 116 81.5 126 79" stroke="#fbbf24" strokeWidth="1.1" fill="none" />

        {/* -------------- উন্মুক্ত পবিত্র কুরআন শরীফ (Holy Quran Motif) -------------- */}
        {/* রেহাল / বুক স্ট্যান্ড */}
        <path
          d="M 68 112 L 80 104 L 92 112"
          stroke="#92400e"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line x1="71" y1="110" x2="89" y2="110" stroke="#b45309" strokeWidth="1.5" />

        {/* উন্মুক্ত কুরআনের বাম পৃষ্ঠা */}
        <path
          d="M 67 98 C 72 95 77 96 80 99 L 80 108 C 77 105 72 104 67 107 Z"
          fill="#ffffff"
          stroke="#044e39"
          strokeWidth="0.9"
        />
        {/* উন্মুক্ত কুরআনের ডান পৃষ্ঠা */}
        <path
          d="M 93 98 C 88 95 83 96 80 99 L 80 108 C 83 105 88 104 93 107 Z"
          fill="#ffffff"
          stroke="#044e39"
          strokeWidth="0.9"
        />
        {/* কুরআনের মাঝের বাঁধাই রেখা ও সোনালী বুকমার্ক */}
        <line x1="80" y1="99" x2="80" y2="108" stroke="#d97706" strokeWidth="1" />
        <path d="M 80 108 L 81.5 113 L 80 112 L 78.5 113 Z" fill="#d97706" />

        {/* পৃষ্ঠার ভেতরের সূক্ষ্ম টেক্সট রেখা */}
        <line x1="69" y1="100.5" x2="77" y2="99" stroke="#047857" strokeWidth="0.6" opacity="0.8" />
        <line x1="69" y1="102.5" x2="77" y2="101" stroke="#047857" strokeWidth="0.6" opacity="0.8" />
        <line x1="69" y1="104.5" x2="77" y2="103" stroke="#047857" strokeWidth="0.6" opacity="0.8" />

        <line x1="83" y1="99" x2="91" y2="100.5" stroke="#047857" strokeWidth="0.6" opacity="0.8" />
        <line x1="83" y1="101" x2="91" y2="102.5" stroke="#047857" strokeWidth="0.6" opacity="0.8" />
        <line x1="83" y1="103" x2="91" y2="104.5" stroke="#047857" strokeWidth="0.6" opacity="0.8" />
      </svg>
    </div>
  );
}

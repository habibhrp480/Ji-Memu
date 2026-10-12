import { forwardRef } from 'react';
import { VoucherData, TemplateTheme } from '../types/voucher';
import { IslamicLogo } from './IslamicLogo';
import {
  toBengaliNumber,
  formatBengaliCurrency,
  numberToBengaliWords,
} from '../utils/numberToBengaliWords';
import { formatToBengaliDate } from '../utils/dateUtils';
import { QRCodeSVG } from 'qrcode.react';
import { getBengaliFontFamily } from '../utils/fontUtils';

interface VoucherPreviewProps {
  voucher: VoucherData;
  customLogoUrl?: string;
  zoom?: number;
}

export const VoucherPreview = forwardRef<HTMLDivElement, VoucherPreviewProps>(
  ({ voucher, customLogoUrl, zoom = 1 }, ref) => {
    const activeFontFamily = getBengaliFontFamily(voucher.fontFamily);
    const totalAmount = voucher.items.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );

    const title =
      voucher.customTitle?.trim() ||
      `${voucher.branchName?.trim() || 'ফিলিপনগর'} জামায়াতে ইসলামী ভাউচার`;

    const displayDate = voucher.manualDateText?.trim()
      ? voucher.manualDateText
      : formatToBengaliDate(voucher.date);

    const showQr = voucher.showQrCode !== false;
    const qrContent = `রশিদ / ভাউচার নং: ${toBengaliNumber(voucher.voucherNo || '---')}
তারিখ: ${displayDate}
সর্বমোট টাকা: ৳ ${toBengaliNumber(totalAmount)}/- (${numberToBengaliWords(totalAmount)})
শাখা: ${voucher.branchName || 'ফিলিপনগর'} জামায়াতে ইসলামী
প্রস্তুতকারী: ${voucher.preparedBy || '---'}`;

    const theme: TemplateTheme = voucher.templateTheme || 'classic-emerald';

    // Signatories list
    const isVerifierActive = voucher.verifierEnabled !== false;
    const isApproverActive = voucher.approverEnabled !== false;
    const isPreparerNumberActive =
      voucher.preparerNumberEnabled !== false &&
      Boolean(voucher.preparerNumber?.trim() || voucher.preparerNumberType?.trim());
    const isRemarksActive =
      voucher.remarksEnabled !== false &&
      Boolean(voucher.remarks && voucher.remarks.trim());

    const signatories = [
      {
        id: 'preparedBy',
        label: voucher.preparedByLabel || 'প্রস্তুতকারীর স্বাক্ষর',
        name: voucher.preparedBy || '—',
        designation: voucher.preparedByDesignation,
      },
      ...(isVerifierActive
        ? [
            {
              id: 'verifier',
              label: voucher.verifierLabel || 'যাচাইকারী / হিসাবরক্ষক',
              name: voucher.verifierName || '—',
              designation: voucher.verifierDesignation,
            },
          ]
        : []),
      ...(isApproverActive
        ? [
            {
              id: 'approver',
              label: voucher.approverLabel || 'অনুমোদনকারী / সভাপতি',
              name: voucher.approverName || '—',
              designation: voucher.approverDesignation,
            },
          ]
        : []),
    ];

    // ==========================================
    // SPECIAL 5" x 8" (Width 5in, Height 8in) DESIGN
    // ==========================================
    if (theme === 'memo-5x8') {
      const gridCols5x8 =
        signatories.length === 3
          ? 'grid-cols-3'
          : signatories.length === 2
          ? 'grid-cols-2 max-w-[320px] mx-auto'
          : 'grid-cols-1 max-w-[160px] mx-auto';

      return (
        <div
          className="print:m-0 print:p-0 flex justify-center items-start print-scale-reset"
          style={{
            transform: zoom !== 1 ? `scale(${zoom})` : undefined,
            transformOrigin: 'top center',
          }}
        >
          {/* 5" x 8" Voucher Pad Sheet */}
          <div
            ref={ref}
            id="printable-voucher"
            className="print-voucher-area voucher-5x8 w-[5in] min-h-[8in] max-h-[8in] bg-white text-slate-900 p-4 border border-slate-300 print:border-none print:shadow-none shadow-xl flex flex-col justify-between box-border overflow-hidden relative"
            style={{
              fontFamily: activeFontFamily,
            }}
          >
            {/* Vintage Islamic Filigree Borders */}
            <div className="absolute inset-[3.5mm] border-2 border-teal-900 pointer-events-none p-0.5">
              <div className="w-full h-full border border-amber-600/50" />
            </div>

            <div className="relative z-10">
              {/* Bismillah */}
              <div className="text-center mb-1">
                <span className="text-xs font-semibold text-teal-950 font-serif">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
              </div>

              {/* Header Lockup */}
              <div className="flex items-center justify-between border-b-2 border-teal-900 pb-2">
                <div className="w-12 shrink-0 flex items-center justify-start">
                  <IslamicLogo
                    className="w-11 h-11"
                    customLogoUrl={voucher.customLogoUrl || customLogoUrl}
                    variant={voucher.logoVariant || 'emblem'}
                  />
                </div>

                <div className="text-center flex-1 px-1.5">
                  <h1 className="text-base font-bold text-teal-950 leading-tight">
                    {title}
                  </h1>
                  <p className="text-[9.5px] text-slate-600 font-medium">
                    বাংলাদেশ জামায়াতে ইসলামী · আয় ও ব্যয় ভাউচার
                  </p>
                  <div className="mt-1 inline-block bg-teal-900 text-amber-200 text-[9.5px] font-bold px-2.5 py-0.5 rounded-xs shadow-2xs">
                    ক্যাশ ও ব্যয় ভাউচার / CASH VOUCHER
                  </div>
                </div>

                <div className="w-12 shrink-0 text-right">
                  <div className="inline-block border border-teal-800 text-[9px] px-1.5 py-0.5 font-bold text-teal-900 bg-teal-50/50 tabular-nums">
                    নং: {toBengaliNumber(voucher.voucherNo || '---')}
                  </div>
                </div>
              </div>

              {/* Voucher No & Date Row (Never breaks across lines on download or print) */}
              <div className="flex items-center justify-between gap-2 py-1 px-2.5 bg-teal-50/70 border-b border-teal-800 text-xs mt-1">
                <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                  <span className="font-semibold text-teal-950 text-[11px] shrink-0 whitespace-nowrap">
                    ভাউচার নং:
                  </span>
                  <span className="font-bold text-slate-900 text-[11px] tabular-nums shrink-0 whitespace-nowrap px-1.5 py-0.5 bg-white/90 rounded border border-teal-800/30 shadow-2xs">
                    {toBengaliNumber(voucher.voucherNo || '---')}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1.5 shrink-0 whitespace-nowrap ml-auto">
                  <span className="font-semibold text-teal-950 text-[11px] shrink-0 whitespace-nowrap">
                    তারিখ:
                  </span>
                  <span className="font-semibold text-slate-900 text-[11px] tabular-nums shrink-0 whitespace-nowrap px-2 py-0.5 bg-white/95 rounded border border-teal-800/30 shadow-2xs inline-block">
                    {displayDate}
                  </span>
                </div>
              </div>
            </div>

            {/* EXPENSE TABLE (Tailored for 5" width) */}
            <div className="my-2 flex-1 flex flex-col justify-start relative z-10">
              <table className="w-full border-collapse border border-teal-900 text-[10px]">
                <thead>
                  <tr className="bg-teal-900 text-amber-100 font-semibold">
                    <th className="border border-teal-800 px-1.5 py-1 w-7 text-center">
                      ক্র.
                    </th>
                    <th className="border border-teal-800 px-2 py-1 text-left">
                      খরচের খাত ও বিস্তারিত বিবরণ
                    </th>
                    <th className="border border-teal-800 px-2 py-1 w-20 text-right">
                      টাকা (৳)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {voucher.items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="border border-slate-300 py-4 text-center text-slate-400 text-[10px]"
                      >
                        কোনো খরচের আইটেম নেই।
                      </td>
                    </tr>
                  ) : (
                    voucher.items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={
                          index % 2 === 0 ? 'bg-white' : 'bg-teal-50/20'
                        }
                      >
                        <td className="border border-slate-300 px-1 py-1 text-center font-medium align-top w-7">
                          {toBengaliNumber(index + 1)}
                        </td>
                        <td className="border border-slate-300 px-2 py-1 leading-tight align-top">
                          <div className="font-bold text-teal-950 text-[10.5px]">
                            {item.category || '—'}
                          </div>
                          {item.description && (
                            <div className="text-[9px] text-slate-600 mt-0.5 whitespace-pre-line">
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td className="border border-slate-300 px-2 py-1 text-right font-bold text-slate-900 tabular-nums text-[10.5px] align-top whitespace-nowrap w-20">
                          {formatBengaliCurrency(Number(item.amount) || 0)}
                        </td>
                      </tr>
                    ))
                  )}

                  {/* Total Row */}
                  <tr className="bg-teal-100/70 font-bold border-t-2 border-teal-900">
                    <td
                      colSpan={2}
                      className="border border-teal-900 px-2 py-1 text-right text-teal-950 font-bold text-[11px]"
                    >
                      সর্বমোট পরিশোধিত টাকা:
                    </td>
                    <td className="border border-teal-900 px-2 py-1 text-right text-teal-950 text-[11px] font-bold tabular-nums whitespace-nowrap">
                      {formatBengaliCurrency(totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* In Words Banner */}
              <div className="mt-1.5 p-1.5 bg-amber-50/60 border border-amber-300/80 text-[9.5px] flex items-start gap-1 text-amber-950">
                <span className="font-bold shrink-0">কথায়:</span>
                <span className="font-semibold leading-relaxed underline decoration-dotted decoration-amber-700">
                  {numberToBengaliWords(totalAmount)}
                </span>
              </div>

              {/* Preparer Number Details (Removable) */}
              {isPreparerNumberActive && (
                <div className="mt-1.5 p-1.5 bg-slate-50 border border-slate-200 text-[9px] flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-semibold text-slate-700">
                    প্রস্তুতকারীর নাম্বার:
                  </span>
                  {voucher.preparerNumberType && (
                    <span className="bg-teal-900 text-white px-1.5 py-0.5 rounded-xs font-bold text-[8.5px]">
                      {voucher.preparerNumberType}
                    </span>
                  )}
                  {voucher.preparerNumber && (
                    <span className="font-semibold text-slate-900 text-[9.5px] tabular-nums">
                      {voucher.preparerNumber}
                    </span>
                  )}
                </div>
              )}

              {/* Special Remarks (Removable) */}
              {isRemarksActive && (
                <div className="mt-1 text-[8.5px] text-slate-500 italic px-0.5">
                  মন্তব্য: {voucher.remarks}
                </div>
              )}
            </div>

            {/* SIGNATURES SECTION (Tailored for 5" width) */}
            <div className="relative z-10 pt-4 pb-1">
              <div className={`grid ${gridCols5x8} gap-2 text-center text-[9px]`}>
                {signatories.map((sig) => (
                  <div key={sig.id} className="flex flex-col items-center">
                    <div className="w-full border-b border-dashed border-teal-900/80 h-7 mb-1" />
                    <span className="font-bold text-slate-900 leading-none">
                      {sig.name}
                    </span>
                    <span className="text-[8px] text-slate-600 font-medium mt-0.5">
                      {sig.label}
                    </span>
                    {sig.designation && (
                      <span className="text-[7.5px] text-slate-500">
                        ({sig.designation})
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Footer Notice & QR Code */}
              <div className="mt-3 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  {showQr && (
                    <div className="p-0.5 bg-white border border-slate-300 rounded-xs shrink-0 shadow-2xs">
                      <QRCodeSVG
                        value={qrContent}
                        size={38}
                        level="M"
                        includeMargin={false}
                      />
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-teal-950 block leading-tight">
                      ভাউচার কিউআর কোড
                    </span>
                    <span className="text-[7.5px] text-slate-400 block leading-tight">
                      যাচাইকৃত মূল কপি
                    </span>
                  </div>
                </div>

                <div className="text-right text-[8px]">
                  <span>
                    মুদ্রণ: {toBengaliNumber(new Date().toLocaleDateString('bn-BD'))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ==========================================
    // SPECIAL A4 2-COPY DUAL VOUCHER (এক পাতায় ২ কপি)
    // ==========================================
    if (theme === 'dual-5x8-a4') {
      const isLandscape = voucher.dualCopyOrientation === 'landscape';
      const label1 = voucher.dualCopyLabel1?.trim() || 'অফিস কপি';
      const label2 = voucher.dualCopyLabel2?.trim() || 'গ্রহীতা কপি';

      const gridCols =
        signatories.length === 3
          ? 'grid-cols-3'
          : signatories.length === 2
          ? 'grid-cols-2 max-w-[320px] mx-auto'
          : 'grid-cols-1 max-w-[160px] mx-auto';

      const renderDualCard = (copyLabel: string, copyIndex: 1 | 2) => {
        const isFirst = copyIndex === 1;
        const badgeColor = isFirst
          ? 'bg-teal-900 text-amber-200 border-teal-800'
          : 'bg-amber-800 text-white border-amber-900';

        return (
          <div
            className={`relative flex flex-col justify-between bg-white text-slate-900 p-2.5 box-border overflow-hidden ${
              isLandscape ? 'w-[143mm] h-[202mm]' : 'w-full h-[142mm]'
            }`}
            style={{
              fontFamily: activeFontFamily,
            }}
          >
            {/* Vintage Islamic Double Border */}
            <div className="absolute inset-[2mm] border-2 border-teal-900 pointer-events-none p-0.5">
              <div className="w-full h-full border border-amber-600/50" />
            </div>

            {/* Content Top */}
            <div className="relative z-10">
              {/* Topmost bar: Bismillah and Copy Badge */}
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-teal-800/30 text-[8.5px]">
                <span className="font-semibold text-teal-950 font-serif">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
                <span
                  className={`px-2 py-0.5 rounded-xs font-bold uppercase tracking-normal border shadow-2xs ${badgeColor}`}
                >
                  {copyLabel}
                </span>
              </div>

              {/* Header Lockup */}
              <div className="flex items-center justify-between border-b-2 border-teal-900 pb-1.5">
                <div className="w-10 shrink-0 flex items-center justify-start">
                  <IslamicLogo
                    className="w-9 h-9"
                    customLogoUrl={voucher.customLogoUrl || customLogoUrl}
                    variant={voucher.logoVariant || 'emblem'}
                  />
                </div>

                <div className="text-center flex-1 px-1">
                  <h1 className="text-sm font-bold text-teal-950 leading-tight">
                    {title}
                  </h1>
                  <p className="text-[8.5px] text-slate-600 font-medium">
                    বাংলাদেশ জামায়াতে ইসলামী · আয় ও ব্যয় ভাউচার
                  </p>
                  <div className="mt-0.5 inline-block bg-teal-900 text-amber-200 text-[8.5px] font-bold px-2 py-0.5 rounded-xs shadow-2xs">
                    ক্যাশ ও ব্যয় ভাউচার / CASH VOUCHER
                  </div>
                </div>

                <div className="w-10 shrink-0 text-right">
                  <div className="inline-block border border-teal-800 text-[8.5px] px-1 py-0.5 font-bold text-teal-900 bg-teal-50/50 tabular-nums">
                    নং: {toBengaliNumber(voucher.voucherNo || '---')}
                  </div>
                </div>
              </div>

              {/* Voucher No & Date Row (Never breaks across lines on download or print) */}
              <div className="flex items-center justify-between gap-1.5 py-1 px-2 bg-teal-50/70 border-b border-teal-800 text-[9.5px] mt-0.5">
                <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
                  <span className="font-semibold text-teal-950 shrink-0 whitespace-nowrap text-[9.5px]">
                    ভাউচার নং:
                  </span>
                  <span className="font-bold text-slate-900 tabular-nums shrink-0 whitespace-nowrap px-1 py-0.2 bg-white/90 rounded border border-teal-800/30 text-[9.5px]">
                    {toBengaliNumber(voucher.voucherNo || '---')}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1 shrink-0 whitespace-nowrap ml-auto">
                  <span className="font-semibold text-teal-950 shrink-0 whitespace-nowrap text-[9.5px]">
                    তারিখ:
                  </span>
                  <span className="font-semibold text-slate-900 tabular-nums shrink-0 whitespace-nowrap px-1.5 py-0.2 bg-white/95 rounded border border-teal-800/30 text-[9.5px] inline-block">
                    {displayDate}
                  </span>
                </div>
              </div>
            </div>

            {/* EXPENSE TABLE */}
            <div className="my-1 flex-1 flex flex-col justify-start relative z-10">
              <table className="w-full border-collapse border border-teal-900 text-[9px]">
                <thead>
                  <tr className="bg-teal-900 text-amber-100 font-semibold">
                    <th className="border border-teal-800 px-1 py-0.5 w-6 text-center">
                      ক্র.
                    </th>
                    <th className="border border-teal-800 px-1.5 py-0.5 text-left">
                      খরচের খাত ও বিস্তারিত বিবরণ
                    </th>
                    <th className="border border-teal-800 px-1.5 py-0.5 w-18 text-right">
                      টাকা (৳)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {voucher.items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="border border-slate-300 py-2 text-center text-slate-400 text-[9px]"
                      >
                        কোনো খরচের আইটেম নেই।
                      </td>
                    </tr>
                  ) : (
                    voucher.items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={
                          index % 2 === 0 ? 'bg-white' : 'bg-teal-50/20'
                        }
                      >
                        <td className="border border-slate-300 px-1 py-0.5 text-center font-medium align-top w-6">
                          {toBengaliNumber(index + 1)}
                        </td>
                        <td className="border border-slate-300 px-1.5 py-0.5 leading-tight align-top">
                          <div className="font-bold text-teal-950 text-[9.5px]">
                            {item.category || '—'}
                          </div>
                          {item.description && (
                            <div className="text-[8px] text-slate-600 mt-0.5 whitespace-pre-line">
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td className="border border-slate-300 px-1.5 py-0.5 text-right font-bold text-slate-900 tabular-nums text-[9.5px] align-top whitespace-nowrap w-18">
                          {formatBengaliCurrency(Number(item.amount) || 0)}
                        </td>
                      </tr>
                    ))
                  )}

                  {/* Total Row */}
                  <tr className="bg-teal-100/70 font-bold border-t-2 border-teal-900">
                    <td
                      colSpan={2}
                      className="border border-teal-900 px-1.5 py-0.5 text-right text-teal-950 font-bold text-[9.5px]"
                    >
                      সর্বমোট পরিশোধিত টাকা:
                    </td>
                    <td className="border border-teal-900 px-1.5 py-0.5 text-right text-teal-950 text-[9.5px] font-bold tabular-nums whitespace-nowrap">
                      {formatBengaliCurrency(totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* In Words Banner */}
              <div className="mt-1 p-1 bg-amber-50/60 border border-amber-300/80 text-[8.5px] flex items-start gap-1 text-amber-950">
                <span className="font-bold shrink-0">কথায়:</span>
                <span className="font-semibold leading-relaxed underline decoration-dotted decoration-amber-700">
                  {numberToBengaliWords(totalAmount)}
                </span>
              </div>

              {/* Preparer Number Details (Removable) */}
              {isPreparerNumberActive && (
                <div className="mt-1 p-1 bg-slate-50 border border-slate-200 text-[8px] flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                  <span className="font-semibold text-slate-700">
                    প্রস্তুতকারীর মাধ্যম:
                  </span>
                  {voucher.preparerNumberType && (
                    <span className="bg-teal-900 text-white px-1 py-0.5 rounded-xs font-bold text-[7.5px]">
                      {voucher.preparerNumberType}
                    </span>
                  )}
                  {voucher.preparerNumber && (
                    <span className="font-semibold text-slate-900 text-[8.5px] tabular-nums">
                      {voucher.preparerNumber}
                    </span>
                  )}
                </div>
              )}

              {/* Special Remarks (Removable) */}
              {isRemarksActive && (
                <div className="mt-0.5 text-[8px] text-slate-500 italic px-0.5">
                  মন্তব্য: {voucher.remarks}
                </div>
              )}
            </div>

            {/* SIGNATURES SECTION */}
            <div className="relative z-10 pt-2 pb-0.5">
              <div className={`grid ${gridCols} gap-2 text-center text-[8.5px]`}>
                {signatories.map((sig) => (
                  <div key={sig.id} className="flex flex-col items-center">
                    <div className="w-full border-b border-dashed border-teal-900/80 h-5 mb-0.5" />
                    <span className="font-bold text-slate-900 leading-none">
                      {sig.name}
                    </span>
                    <span className="text-[7.5px] text-slate-600 font-medium mt-0.5">
                      {sig.label}
                    </span>
                    {sig.designation && (
                      <span className="text-[7px] text-slate-500">
                        ({sig.designation})
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Footer Notice & QR Code */}
              <div className="mt-2 pt-1 border-t border-slate-200 flex items-center justify-between text-[7.5px] text-slate-500">
                <div className="flex items-center gap-1">
                  {showQr && (
                    <div className="p-0.5 bg-white border border-slate-300 rounded-xs shrink-0 shadow-2xs">
                      <QRCodeSVG
                        value={qrContent}
                        size={28}
                        level="M"
                        includeMargin={false}
                      />
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-teal-950 block leading-tight">
                      ভাউচার কিউআর কোড
                    </span>
                    <span className="text-[7px] text-slate-400 block leading-tight">
                      যাচাইকৃত {copyLabel}
                    </span>
                  </div>
                </div>

                <div className="text-right text-[7.5px] shrink-0 whitespace-nowrap">
                  <span>
                    মুদ্রণ: {toBengaliNumber(new Date().toLocaleDateString('bn-BD'))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      };

      return (
        <div
          className="print:m-0 print:p-0 flex justify-center items-start print-scale-reset"
          style={{
            transform: zoom !== 1 ? `scale(${zoom})` : undefined,
            transformOrigin: 'top center',
          }}
        >
          {/* Dual 2-in-1 A4 Sheet */}
          <div
            ref={ref}
            id="printable-voucher"
            className={`print-voucher-area ${
              isLandscape
                ? 'voucher-dual-landscape w-[297mm] min-h-[210mm] max-h-[210mm] flex-row'
                : 'voucher-dual-portrait w-[210mm] min-h-[297mm] max-h-[297mm] flex-col'
            } bg-white text-slate-900 p-[3mm] border border-slate-300 print:border-none print:shadow-none shadow-xl flex justify-between box-border overflow-hidden relative`}
            style={{
              fontFamily: activeFontFamily,
            }}
          >
            {/* Copy 1 (e.g. অফিস কপি) */}
            {renderDualCard(label1, 1)}

            {/* Perforated Cutting Line Separator */}
            {isLandscape ? (
              <div className="mx-1 flex flex-col items-center justify-between text-slate-400 text-[8px] select-none px-0.5 h-full">
                <div className="flex-1 border-r border-dashed border-slate-400" />
                <span className="py-2.5 [writing-mode:vertical-rl] rotate-180 text-slate-600 font-bold bg-slate-50 border border-dashed border-slate-300 rounded px-0.5 py-2 flex items-center gap-1 shadow-2xs">
                  ✂ কেটে আলাদা করুন (Cut Here) ✂
                </span>
                <div className="flex-1 border-r border-dashed border-slate-400" />
              </div>
            ) : (
              <div className="my-1 flex items-center justify-between text-slate-400 text-[8.5px] select-none py-0.5 w-full">
                <div className="flex-1 border-b border-dashed border-slate-400" />
                <span className="px-3 font-mono flex items-center gap-1 text-slate-600 font-bold bg-slate-50 border border-dashed border-slate-300 rounded px-2.5 py-0.5 shadow-2xs">
                  ✂ কেটে আলাদা করার দাগ (Tear / Cut Here) ✂
                </span>
                <div className="flex-1 border-b border-dashed border-slate-400" />
              </div>
            )}

            {/* Copy 2 (e.g. গ্রহীতা কপি) */}
            {renderDualCard(label2, 2)}
          </div>
        </div>
      );
    }

    // ==========================================
    // STANDARD A4 PORTRAIT THEMES
    // ==========================================
    const themeStyles = {
      'classic-emerald': {
        outerBorder: 'border-2 border-emerald-900',
        innerBorder: 'border border-emerald-800/40',
        headerText: 'text-emerald-900',
        badgeBg: 'bg-emerald-900 text-white',
        metaBg: 'bg-emerald-50/60 border-emerald-800',
        metaLabel: 'text-emerald-950',
        tableHeader: 'bg-emerald-900 text-white border-emerald-800',
        tableBorder: 'border-emerald-900',
        totalRowBg: 'bg-emerald-100/60 text-emerald-950 border-emerald-900',
        wordsUnderline: 'decoration-emerald-700',
        paymentBadge: 'bg-emerald-800 text-white',
      },
      'modern-slate': {
        outerBorder: 'border-2 border-slate-900',
        innerBorder: 'border border-slate-400/30',
        headerText: 'text-slate-900',
        badgeBg: 'bg-slate-900 text-white',
        metaBg: 'bg-slate-100/70 border-slate-800',
        metaLabel: 'text-slate-950',
        tableHeader: 'bg-slate-900 text-white border-slate-700',
        tableBorder: 'border-slate-800',
        totalRowBg: 'bg-slate-100 text-slate-950 border-slate-900',
        wordsUnderline: 'decoration-slate-700',
        paymentBadge: 'bg-slate-800 text-white',
      },
      'royal-navy': {
        outerBorder: 'border-2 border-indigo-950',
        innerBorder: 'border border-indigo-800/40',
        headerText: 'text-indigo-950',
        badgeBg: 'bg-indigo-950 text-white',
        metaBg: 'bg-indigo-50/70 border-indigo-900',
        metaLabel: 'text-indigo-950',
        tableHeader: 'bg-indigo-950 text-white border-indigo-900',
        tableBorder: 'border-indigo-950',
        totalRowBg: 'bg-indigo-100/60 text-indigo-950 border-indigo-950',
        wordsUnderline: 'decoration-indigo-800',
        paymentBadge: 'bg-indigo-900 text-white',
      },
      'compact-memo': {
        outerBorder: 'border-2 border-zinc-800',
        innerBorder: 'border border-zinc-400/40',
        headerText: 'text-zinc-900',
        badgeBg: 'bg-zinc-800 text-white',
        metaBg: 'bg-zinc-100/70 border-zinc-700',
        metaLabel: 'text-zinc-900',
        tableHeader: 'bg-zinc-800 text-white border-zinc-700',
        tableBorder: 'border-zinc-800',
        totalRowBg: 'bg-zinc-100 text-zinc-950 border-zinc-800',
        wordsUnderline: 'decoration-zinc-700',
        paymentBadge: 'bg-zinc-800 text-white',
      },
    }[theme];

    const gridColsClass =
      signatories.length === 3
        ? 'grid-cols-3'
        : signatories.length === 2
        ? 'grid-cols-2 max-w-xl mx-auto'
        : 'grid-cols-1 max-w-xs mx-auto';

    return (
      <div
        className="print:m-0 print:p-0 flex justify-center items-start print-scale-reset"
        style={{
          transform: zoom !== 1 ? `scale(${zoom})` : undefined,
          transformOrigin: 'top center',
        }}
      >
        {/* A4 Container */}
        <div
          ref={ref}
          id="printable-voucher"
          className="print-voucher-area w-[210mm] min-h-[297mm] max-h-[297mm] bg-white text-slate-900 p-[10mm] border border-slate-300 print:border-none print:shadow-none shadow-xl rounded-none flex flex-col justify-between box-border overflow-hidden relative"
          style={{
            fontFamily: activeFontFamily,
          }}
        >
          {/* Inner Decorative Double Border */}
          <div
            className={`absolute inset-[5mm] ${themeStyles.outerBorder} pointer-events-none p-1`}
          >
            <div className={`w-full h-full ${themeStyles.innerBorder}`} />
          </div>

          {/* MAIN CONTENT WRAPPER */}
          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* 1. HEADER SECTION */}
            <div>
              {/* Bismillah calligraphy text */}
              <div className="text-center mb-1">
                <span className="text-sm font-medium text-slate-900 font-serif">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
                <p className="text-[11px] text-slate-600 font-normal">
                  (বিস্‌মিল্লাহির রাহ্‌মানির রাহীম)
                </p>
              </div>

              {/* Title & Logo Block */}
              <div
                className={`flex items-center justify-between border-b-2 ${themeStyles.tableBorder} pb-3 mt-1`}
              >
                {/* Left Logo */}
                <div className="w-20 shrink-0 flex items-center justify-start">
                  <IslamicLogo
                    className="w-16 h-16"
                    customLogoUrl={voucher.customLogoUrl || customLogoUrl}
                    variant={voucher.logoVariant || 'emblem'}
                  />
                </div>

                {/* Center Organization & Voucher Heading */}
                <div className="text-center flex-1 px-2">
                  <h1
                    className={`text-2xl font-bold ${themeStyles.headerText} leading-tight`}
                  >
                    {title}
                  </h1>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    বাংলাদেশ জামায়াতে ইসলামী · সাংগঠনিক ও প্রাতিষ্ঠানিক ব্যয় বিবরণী
                  </p>
                  <div
                    className={`mt-1.5 inline-block ${themeStyles.badgeBg} text-xs font-semibold px-4 py-0.5 rounded-sm shadow-xs`}
                  >
                    ব্যয় ও ডেবিট ভাউচার
                  </div>
                </div>

                {/* Right Placeholder/Seal/SL block */}
                <div className="w-20 shrink-0 text-right text-xs">
                  <div
                    className={`inline-block border ${themeStyles.tableBorder} text-[11px] px-2 py-0.5 font-medium ${themeStyles.headerText}`}
                  >
                    মূল কপি
                  </div>
                </div>
              </div>

              {/* Metadata Bar (Voucher No & Date - Never breaks across lines) */}
              <div
                className={`flex items-center justify-between gap-4 py-2 px-3 ${themeStyles.metaBg} border-b text-sm mt-1`}
              >
                <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                  <span className={`font-semibold ${themeStyles.metaLabel} shrink-0 whitespace-nowrap`}>
                    ভাউচার / রশিদ নং:
                  </span>
                  <span className="font-bold text-slate-900 tabular-nums shrink-0 whitespace-nowrap px-2 py-0.5 bg-white/90 rounded border border-slate-300 shadow-2xs">
                    {toBengaliNumber(voucher.voucherNo || '---')}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1.5 shrink-0 whitespace-nowrap ml-auto">
                  <span className={`font-semibold ${themeStyles.metaLabel} shrink-0 whitespace-nowrap`}>
                    তারিখ:
                  </span>
                  <span className="font-semibold text-slate-900 tabular-nums shrink-0 whitespace-nowrap px-2.5 py-0.5 bg-white/95 rounded border border-slate-300 shadow-2xs inline-block">
                    {displayDate}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. EXPENSE TABLE SECTION */}
            <div className="my-3 flex-1 flex flex-col justify-start">
              <table
                className={`w-full border-collapse border ${themeStyles.tableBorder} text-xs`}
              >
                <thead>
                  <tr className={`${themeStyles.tableHeader} font-semibold`}>
                    <th className="border px-2 py-1.5 w-12 text-center">
                      ক্র.নং
                    </th>
                    <th className="border px-3 py-1.5 w-44 text-left">
                      খরচের খাত
                    </th>
                    <th className="border px-3 py-1.5 text-left">
                      বিস্তারিত বিবরণ
                    </th>
                    <th className="border px-3 py-1.5 w-36 text-right">
                      টাকার পরিমাণ (৳)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {voucher.items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="border border-slate-300 py-6 text-center text-slate-400 text-xs"
                      >
                        কোনো খরচের আইটেম যোগ করা হয়নি।
                      </td>
                    </tr>
                  ) : (
                    voucher.items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                        }
                      >
                        <td className="border border-slate-300 px-2 py-2 text-center font-medium align-top w-12">
                          {toBengaliNumber(index + 1)}
                        </td>
                        <td className="border border-slate-300 px-3 py-2 font-medium text-slate-900 align-top break-words w-44">
                          {item.category || '—'}
                        </td>
                        <td className="border border-slate-300 px-3 py-2 text-slate-700 whitespace-pre-line leading-relaxed align-top break-words">
                          {item.description || '—'}
                        </td>
                        <td className="border border-slate-300 px-3 py-2 text-right font-semibold text-slate-900 tabular-nums align-top whitespace-nowrap w-36">
                          {formatBengaliCurrency(Number(item.amount) || 0)}
                        </td>
                      </tr>
                    ))
                  )}

                  {/* TOTAL ROW */}
                  <tr
                    className={`${themeStyles.totalRowBg} font-bold border-t-2`}
                  >
                    <td
                      colSpan={3}
                      className="border border-current px-3 py-2 text-right font-bold text-sm"
                    >
                      সর্বমোট পরিশোধযোগ্য টাকা:
                    </td>
                    <td className="border border-current px-3 py-2 text-right text-sm font-bold tabular-nums whitespace-nowrap">
                      {formatBengaliCurrency(totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Amount in words banner (কথায়) */}
              <div className="mt-2.5 p-2.5 bg-slate-50 border border-slate-300 text-xs flex items-start gap-2">
                <span className={`font-bold ${themeStyles.headerText} shrink-0`}>
                  কথায় (সর্বমোট):
                </span>
                <span
                  className={`font-semibold text-slate-800 leading-relaxed underline decoration-dotted ${themeStyles.wordsUnderline}`}
                >
                  {numberToBengaliWords(totalAmount)}
                </span>
              </div>

              {/* Preparer Number Box (Removable) */}
              {isPreparerNumberActive && (
                <div className="mt-2.5 p-2 bg-white border border-slate-300 text-xs">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-semibold text-slate-700">
                      প্রস্তুতকারীর নাম্বার:
                    </span>
                    {voucher.preparerNumberType && (
                      <span
                        className={`inline-block ${themeStyles.paymentBadge} px-2 py-0.5 rounded-xs font-semibold text-[11px]`}
                      >
                        {voucher.preparerNumberType}
                      </span>
                    )}
                    {voucher.preparerNumber && (
                      <span className="font-semibold text-slate-900 text-xs tabular-nums">
                        {voucher.preparerNumber}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Remarks/Note (Removable) */}
              {isRemarksActive && (
                <div className="mt-1 text-[11px] text-slate-600 italic px-1">
                  মন্তব্য: {voucher.remarks}
                </div>
              )}
            </div>

            {/* 3. DYNAMIC SIGNATURE SECTION */}
            <div className="pt-8 pb-3">
              <div className={`grid ${gridColsClass} gap-6 text-center text-xs`}>
                {signatories.map((sig) => (
                  <div key={sig.id} className="flex flex-col items-center">
                    <div className="w-40 border-b border-dashed border-slate-700 h-10 mb-1" />
                    <span className="font-bold text-slate-900">
                      {sig.name}
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium">
                      {sig.label}
                    </span>
                    {sig.designation && (
                      <span className="text-[10px] text-slate-500">
                        ({sig.designation})
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer Notice & QR Code Verification */}
              <div className="mt-5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                <div className="flex items-center gap-3">
                  {showQr && (
                    <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-300 rounded-sm shrink-0 shadow-2xs">
                      <QRCodeSVG
                        value={qrContent}
                        size={52}
                        level="M"
                        includeMargin={false}
                      />
                      <div className="flex flex-col text-[9px] leading-tight text-slate-700">
                        <span className="font-bold text-slate-900">
                          ভাউচার কিউআর কোড
                        </span>
                        <span className="text-slate-600">
                          নং: {toBengaliNumber(voucher.voucherNo || '---')}
                        </span>
                        <span className="font-semibold text-emerald-950">
                          মোট: ৳{toBengaliNumber(totalAmount)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="font-medium text-slate-700 block">
                      রশিদটি কম্পিউটার প্রিন্টেড ও অফিসিয়াল ব্যবহারের জন্য প্রস্তুত।
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">
                      স্মার্টফোন ক্যামেরা বা যেকোনো কিউআর স্ক্যানার দিয়ে স্ক্যান করে তথ্য যাচাই করুন।
                    </span>
                  </div>
                </div>

                <div className="text-right text-[10px] shrink-0 whitespace-nowrap">
                  <span>
                    প্রিন্ট তারিখ: {toBengaliNumber(new Date().toLocaleDateString('bn-BD'))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VoucherPreview.displayName = 'VoucherPreview';

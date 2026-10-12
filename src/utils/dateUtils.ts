import { toBengaliNumber } from './numberToBengaliWords';

const bengaliMonths = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

export function getTodayISODate(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Converts ISO date (YYYY-MM-DD) to Bengali formatted date: "০৯ অক্টোবর ২০২৬"
 */
export function formatToBengaliDate(isoDateString: string): string {
  if (!isoDateString) return '';
  try {
    const parts = isoDateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      const dayBn = toBengaliNumber(day);
      const monthBn = bengaliMonths[monthIndex] || '';
      const yearBn = toBengaliNumber(year);

      return `${dayBn} ${monthBn} ${yearBn}`;
    }
  } catch {
    // fallback
  }
  return toBengaliNumber(isoDateString);
}

/**
 * Converts ISO date (YYYY-MM-DD) to DD/MM/YYYY in Bengali digits
 */
export function formatToBengaliShortDate(isoDateString: string): string {
  if (!isoDateString) return '';
  const parts = isoDateString.split('-');
  if (parts.length === 3) {
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return toBengaliNumber(`${day}/${month}/${year}`);
  }
  return toBengaliNumber(isoDateString);
}

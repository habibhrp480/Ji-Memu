/**
 * Utility to convert numbers to Bengali digits and Bengali words (কথায়)
 */

const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string): string {
  if (num === undefined || num === null || num === '') return '০';
  const str = num.toString();
  return str.replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
}

export function formatBengaliCurrency(amount: number): string {
  if (isNaN(amount) || amount === 0) return '০.০০';
  
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const [integerPart, decimalPart] = absAmount.toFixed(2).split('.');

  // Format with South Asian comma separator: 12,34,567
  let lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  
  const formattedBn = toBengaliNumber(formattedInteger) + (decimalPart && decimalPart !== '00' ? '.' + toBengaliNumber(decimalPart) : '/-');
  return (isNegative ? '-' : '') + formattedBn;
}

const words0To99: { [key: number]: string } = {
  0: 'শূন্য',
  1: 'এক',
  2: 'দুই',
  3: 'তিন',
  4: 'চার',
  5: 'পাঁচ',
  6: 'ছয়',
  7: 'সাত',
  8: 'আট',
  9: 'নয়',
  10: 'দশ',
  11: 'এগারো',
  12: 'বারো',
  13: 'তেরো',
  14: 'চৌদ্দ',
  15: 'পনেরো',
  16: 'ষোলো',
  17: 'সতেরো',
  18: 'আঠারো',
  19: 'উনিশ',
  20: 'বিশ',
  21: 'একুশ',
  22: 'বাইশ',
  23: 'তেইশ',
  24: 'চব্বিশ',
  25: 'পঁচিশ',
  26: 'ছাব্বিশ',
  27: 'সাতাশ',
  28: 'আঠাশ',
  29: 'উনত্রিশ',
  30: 'ত্রিশ',
  31: 'একত্রিশ',
  32: 'বত্রিশ',
  33: 'তেত্রিশ',
  34: 'চৌত্রিশ',
  35: 'পঁয়ত্রিশ',
  36: 'ছত্রিশ',
  37: 'সাঁইত্রিশ',
  38: 'আটত্রিশ',
  39: 'উনচল্লিশ',
  40: 'চল্লিশ',
  41: 'একচল্লিশ',
  42: 'বিয়াল্লিশ',
  43: 'তেতাল্লিশ',
  44: 'চুয়াল্লিশ',
  45: 'পঁয়তাল্লিশ',
  46: 'ছেচল্লিশ',
  47: 'সাতচল্লিশ',
  48: 'আটচল্লিশ',
  49: 'উনপঞ্চাশ',
  50: 'পঞ্চাশ',
  51: 'একান্ন',
  52: 'বায়ান্ন',
  53: 'তিপ্পান্ন',
  54: 'চুয়ান্ন',
  55: 'পঞ্চান্ন',
  56: 'ছাপ্পান্ন',
  57: 'সাতান্ন',
  58: 'আটান্ন',
  59: 'উনষাট',
  60: 'ষাট',
  61: 'একষট্টি',
  62: 'বাষট্টি',
  63: 'তেষট্টি',
  64: 'চৌষট্টি',
  65: 'পঁয়ষট্টি',
  66: 'ছেষট্টি',
  67: 'সাতষট্টি',
  68: 'আটষট্টি',
  69: 'উনসত্তর',
  70: 'সত্তর',
  71: 'একাত্তর',
  72: 'বাহাত্তর',
  73: 'তিয়াত্তর',
  74: 'চুয়াত্তর',
  75: 'পঁচাত্তর',
  76: 'ছিয়াত্তর',
  77: 'সাতাত্তর',
  78: 'আটাত্তর',
  79: 'উনআশি',
  80: 'আশি',
  81: 'একাশি',
  82: 'বিরাশি',
  83: 'তিরাশি',
  84: 'চুরাশি',
  85: 'পঁচাশি',
  86: 'ছিয়াশি',
  87: 'সাতাশি',
  88: 'অষ্টআশি',
  89: 'উননব্বই',
  90: 'নব্বই',
  91: 'একানব্বই',
  92: 'বানব্বই',
  93: 'তিরানব্বই',
  94: 'চুরানব্বই',
  95: 'পঁচানব্বই',
  96: 'ছিয়ানব্বই',
  97: 'সাতানব্বই',
  98: 'আটানব্বই',
  99: 'নিরানব্বই',
};

// Fix 18
words0To99[18] = 'আঠারো';

function convertChunk(n: number): string {
  if (n === 0) return '';
  const parts: string[] = [];

  const crores = Math.floor(n / 10000000);
  n %= 10000000;

  const lakhs = Math.floor(n / 100000);
  n %= 100000;

  const thousands = Math.floor(n / 1000);
  n %= 1000;

  const hundreds = Math.floor(n / 100);
  n %= 100;

  if (crores > 0) {
    parts.push(`${convertChunk(crores)} কোটি`);
  }
  if (lakhs > 0) {
    parts.push(`${words0To99[lakhs]} লক্ষ`);
  }
  if (thousands > 0) {
    parts.push(`${words0To99[thousands]} হাজার`);
  }
  if (hundreds > 0) {
    parts.push(`${words0To99[hundreds]} শত`);
  }
  if (n > 0) {
    parts.push(words0To99[n]);
  }

  return parts.join(' ').trim();
}

/**
 * Converts a numeric amount to Bengali words ending with "টাকা মাত্র"
 * Example: 1500 -> "এক হাজার পাঁচ শত টাকা মাত্র"
 */
export function numberToBengaliWords(amount: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'শূন্য টাকা মাত্র';
  }

  const rounded = Math.round(amount * 100) / 100;
  if (rounded === 0) {
    return 'শূন্য টাকা মাত্র';
  }

  const intPart = Math.floor(Math.abs(rounded));
  const decimalPart = Math.round((Math.abs(rounded) - intPart) * 100);

  let resultWords = '';

  if (intPart === 0) {
    resultWords = 'শূন্য';
  } else {
    resultWords = convertChunk(intPart);
  }

  let fullText = `${resultWords} টাকা`;

  if (decimalPart > 0) {
    const paisaWords = words0To99[decimalPart] || convertChunk(decimalPart);
    fullText += ` ${paisaWords} পয়সা`;
  }

  fullText += ' মাত্র';

  return fullText.trim();
}

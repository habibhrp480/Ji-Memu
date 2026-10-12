import jsPDF from 'jspdf';
import { toJpeg, toCanvas, toPng } from 'html-to-image';
import { VoucherData } from '../types/voucher';
import { BENGALI_FONT_EMBED_CSS } from './bengaliFontEmbed';

/**
 * Clean filename generator based on voucher metadata
 */
export function getVoucherBaseFilename(voucher: VoucherData, extension: string): string {
  const branch = (voucher.branchName?.trim() || 'ফিলিপনগর').replace(/[\s/\\:]/g, '_');
  const no = (voucher.voucherNo?.trim() || '১০১').replace(/[\s/\\:]/g, '_');
  const is5x8 = voucher.templateTheme === 'memo-5x8';
  const isDual = voucher.templateTheme === 'dual-5x8-a4';
  const prefix = isDual ? 'A4_২কপি_ভাউচার' : is5x8 ? 'ক্যাশ_মেমো_৫x৮' : 'ভাউচার';
  return `${prefix}_${branch}_${no}.${extension}`;
}

/**
 * Capture DOM node to high-resolution JPEG Data URL
 * Uses embedded Base64 Hind Siliguri Bengali fonts with full OpenType ligatures & conjuncts.
 * This guarantees fonts stay exactly in their intended positions without scrambling or shifting.
 */
export async function captureVoucherDataUrl(node: HTMLElement): Promise<string> {
  // Ensure browser font engine has completed all initial font layout
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font readiness errors
    }
  }

  // Small delay to allow any pending DOM text layout to settle completely
  await new Promise((resolve) => setTimeout(resolve, 80));

  const computedWidth = node.offsetWidth || node.clientWidth;

  const fullFontEmbedCSS = `${BENGALI_FONT_EMBED_CSS}
@font-face { font-family: 'SutonnyMJ'; src: local('SutonnyMJ'), local('SutonnyMJ Bold'), local('SutonnyMJ Unicode'), local('SutonnyBanglaOMJ'); font-display: swap; }
@font-face { font-family: 'SolaimanLipi'; src: local('SolaimanLipi'), local('Kalpurush'); font-display: swap; }
@font-face { font-family: 'Kalpurush'; src: local('Kalpurush'), local('SolaimanLipi'); font-display: swap; }
`;

  const captureOptions = {
    quality: 1.0,
    pixelRatio: 3, // 300+ DPI ultra-sharp HD rendering: prevents any blurriness on Bengali fonts and table borders
    backgroundColor: '#ffffff',
    fontEmbedCSS: fullFontEmbedCSS,
    skipFonts: false, // Ensure Base64 Bengali font is embedded directly into the SVG
    cacheBust: true,
    style: {
      transform: 'none',
      transformOrigin: 'top left',
      margin: '0',
      width: computedWidth ? `${computedWidth}px` : undefined,
      minWidth: computedWidth ? `${computedWidth}px` : undefined,
    },
  };

  try {
    return await toJpeg(node, captureOptions);
  } catch (err) {
    console.warn('toJpeg primary capture failed, falling back to toPng:', err);
    try {
      return await toPng(node, captureOptions);
    } catch (errPng) {
      console.warn('toPng failed, falling back to toCanvas:', errPng);
      const canvas = await toCanvas(node, {
        backgroundColor: '#ffffff',
        fontEmbedCSS: fullFontEmbedCSS,
        skipFonts: false,
        pixelRatio: 2,
      });
      return canvas.toDataURL('image/jpeg', 0.95);
    }
  }
}

/**
 * Download high-resolution JPG image
 */
export async function downloadVoucherJpg(
  voucherNode: HTMLElement,
  voucher: VoucherData
): Promise<void> {
  const dataUrl = await captureVoucherDataUrl(voucherNode);
  const filename = getVoucherBaseFilename(voucher, 'jpg');

  // Convert to Blob for reliable cross-browser download
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.download = filename;
  link.href = blobUrl;
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }, 2500);
}

/**
 * Download high-quality, print-ready PDF
 * Exact physical print dimensions:
 * - 5x8 Memo pad: 5 in x 8 in
 * - A4 standard: 210 mm x 297 mm
 */
export async function downloadVoucherPdf(
  voucherNode: HTMLElement,
  voucher: VoucherData
): Promise<void> {
  const is5x8 = voucher.templateTheme === 'memo-5x8';
  const isDual = voucher.templateTheme === 'dual-5x8-a4';
  const isLandscape = isDual && voucher.dualCopyOrientation === 'landscape';

  const dataUrl = await captureVoucherDataUrl(voucherNode);
  const filename = getVoucherBaseFilename(voucher, 'pdf');

  let pdf: jsPDF;
  if (is5x8) {
    pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [5, 8],
      compress: true,
    });
    pdf.addImage(dataUrl, 'JPEG', 0, 0, 5, 8, undefined, 'SLOW');
  } else if (isLandscape) {
    pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    pdf.addImage(dataUrl, 'JPEG', 0, 0, 297, 210, undefined, 'SLOW');
  } else {
    pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'SLOW');
  }

  // Trigger download directly
  pdf.save(filename);
}

/**
 * Checks whether current window is embedded in an iframe (e.g. AI Studio preview)
 */
export function isRunningInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

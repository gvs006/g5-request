// Small theme sanitization/normalization utilities

const HEX_SHORT = /^#([0-9a-f]{3})$/i;
const HEX_FULL = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i; // #rrggbb or #rrggbbaa
const RGBA = /^rgba\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/i;

function expandShortHex(h: string) {
  const m = HEX_SHORT.exec(h);
  if (!m) return h;
  const s = m[1];
  return `#${s[0]}${s[0]}${s[1]}${s[1]}${s[2]}${s[2]}`;
}

function isValidColor(str: unknown) {
  if (typeof str !== 'string') return false;
  const s = str.trim();
  if (HEX_SHORT.test(s) || HEX_FULL.test(s) || RGBA.test(s)) return true;
  return false;
}

function normalizeColor(str: unknown) {
  if (typeof str !== 'string') return undefined;
  const s = str.trim();
  if (HEX_SHORT.test(s)) return expandShortHex(s);
  if (HEX_FULL.test(s)) return s;
  if (RGBA.test(s)) return s;
  return undefined;
}

function normalizeSize(val: unknown) {
  if (typeof val === 'number') return `${val}px`;
  if (typeof val === 'string') {
    const s = val.trim();
    if (/^[0-9]+$/.test(s)) return `${s}px`;
    return s;
  }
  return undefined;
}

export type ThemeInput = { [k: string]: unknown };

export function sanitizeTheme(inTheme: ThemeInput) {
  if (!inTheme || typeof inTheme !== 'object') return {};
  const allowed = [
    'card_bg','title_bg','text','muted','tag_bg','tag_fg','code_bg','code_fg','progress_bg','progress_color','card_width','card_gap'
  ];
  const out: Record<string, string> = {};
  for (const k of allowed) {
    const v = (inTheme as any)[k];
    if (k === 'card_width' || k === 'card_gap') {
      const sv = normalizeSize(v);
      if (sv) out[k] = sv;
    } else {
      const cv = normalizeColor(v);
      if (cv) out[k] = cv;
    }
  }
  return out;
}

export default { sanitizeTheme, normalizeColor, normalizeSize, isValidColor };

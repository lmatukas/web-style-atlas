import { brotliDecompressSync } from 'node:zlib';

export const LITHUANIAN = 'ĄČĘĖĮŠŲŪŽąčęėįšųūž';
const tags = 'cmap head hhea hmtx maxp name OS/2 post cvt fpgm glyf loca prep CFF VORG EBDT EBLC gasp hdmx kern LTSH PCLT VDMX vhea vmtx BASE GDEF GPOS GSUB EBSC JSTF MATH CBDT CBLC COLR CPAL SVG sbix acnt avar bdat bloc bsln cvar fdsc feat fmtx fvar gvar hsty just lcar mort morx opbd prop trak Zapf Silf Glat Gloc Feat Sill'.split(' ');
// WOFF2's cmap is untransformed; outlines need not be reconstructed to inspect
// actual glyph coverage. Bound Brotli expansion and reject malformed containers.
export function missingGlyphs(bytes, sample = LITHUANIAN) {
  const bad = () => { throw new Error('invalid WOFF2 font or Unicode cmap'); };
  try {
    if (bytes.toString('ascii', 0, 4) !== 'wOF2' || bytes.readUInt32BE(8) !== bytes.length) bad();
    let cursor = 48, offset = 0, cmap;
    const uint = () => {
      let value = 0;
      for (let i = 0; i < 5; i++) {
        const b = bytes[cursor++];
        if (b === undefined || (i === 0 && b === 0x80) || value > 0x1ffffff) bad();
        value = value * 128 + (b & 127);
        if (!(b & 128)) return value;
      }
      bad();
    };
    const count = bytes.readUInt16BE(12);
    if (!count || count > 128) bad();
    for (let i = 0; i < count; i++) {
      const flags = bytes[cursor++], index = flags & 63;
      const tag = index === 63 ? bytes.toString('ascii', cursor, cursor += 4) : tags[index];
      const original = uint(), version = flags >> 6;
      const transformed = ['glyf', 'loca'].includes(tag) ? version !== 3 : version !== 0;
      const length = transformed ? uint() : original;
      if (tag === 'cmap') { if (transformed) bad(); cmap = { offset, length }; }
      offset += length;
      if (offset > 16 * 1024 * 1024) bad();
    }
    if (!cmap) bad();
    const compressed = bytes.readUInt32BE(20);
    if (cursor + compressed > bytes.length) bad();
    const decoded = brotliDecompressSync(bytes.subarray(cursor, cursor + compressed), { maxOutputLength: 16 * 1024 * 1024 });
    if (decoded.length !== offset) bad();
    const table = decoded.subarray(cmap.offset, cmap.offset + cmap.length);
    const maps = [];
    for (let i = 0; i < table.readUInt16BE(2); i++) {
      const record = 4 + 8 * i, platform = table.readUInt16BE(record), encoding = table.readUInt16BE(record + 2);
      if (platform === 0 || (platform === 3 && [1, 10].includes(encoding))) maps.push(table.readUInt32BE(record + 4));
    }
    const glyph = (start, point) => {
      const format = table.readUInt16BE(start);
      if (format === 12) {
        const groups = table.readUInt32BE(start + 12);
        if (groups > table.length / 12) bad();
        for (let i = 0; i < groups; i++) {
          const p = start + 16 + i * 12, first = table.readUInt32BE(p), last = table.readUInt32BE(p + 4);
          if (point >= first && point <= last) return table.readUInt32BE(p + 8) + point - first;
        }
      } else if (format === 4 && point <= 65535) {
        const n = table.readUInt16BE(start + 6) / 2, ends = start + 14, starts = ends + 2 * n + 2, deltas = starts + 2 * n, ranges = deltas + 2 * n;
        for (let i = 0; i < n; i++) if (point >= table.readUInt16BE(starts + 2 * i) && point <= table.readUInt16BE(ends + 2 * i)) {
          const delta = table.readInt16BE(deltas + 2 * i), range = table.readUInt16BE(ranges + 2 * i);
          const value = range ? table.readUInt16BE(ranges + 2 * i + range + 2 * (point - table.readUInt16BE(starts + 2 * i))) : point;
          return value ? (value + delta) & 65535 : 0;
        }
      }
      return 0;
    };
    if (!maps.length) bad();
    return [...sample].filter(char => !maps.some(map => glyph(map, char.codePointAt(0))));
  } catch (error) { throw new Error('invalid WOFF2 font or Unicode cmap', { cause: error }); }
}

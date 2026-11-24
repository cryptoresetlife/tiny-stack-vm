// Tiny stack VM (make.fun ISA v1). Table T, indexed by opcode: char code - 48 = pops | 4 if it pushes net +1 | imm << 3; ' ' = unknown.
const f = require('fs');
const T = '0<T15263        222222212221222 222             @AA@0           12              1141';
const I = '/input/', O = '/output/';
for (const d of f.readdirSync(I)) {
  const P = f.readFileSync(I + d + '/program.bin'), Q = f.readFileSync(I + d + '/input.bin'), N = P.length;
  const S = new Int32Array(257), M = new Int32Array(256), C = [];
  let o = '', k = 0, s = 0, c = 0, j = 0;
  const x = (() => {
    for (;;) {
      if (k++ >= 1e6) return 10;
      const p = P[c];
      if (p == null) return 9;
      const t = T.charCodeAt(p) - 48;
      if (!(t >= 0)) return 5;
      const m = t >> 3;
      if (c + m >= N) return 9;
      if (s < (t & 3)) return 2;
      if (t & 4 && s > 255) return 3;
      const b = S[s - 1], a = S[s - 2], e = S[s - 3], u = P[c + 1] | P[c + 2] << 8;
      let n = c + m + 1;
      s -= t & 3;
      if (p > 15 && p < 35) {
        if (p > 18 && p < 23 && !b) return 4;
        S[s++] = [a + b, a - b, Math.imul(a, b), a / b, a % b, (a >>> 0) / (b >>> 0), (a >>> 0) % (b >>> 0), -b, a & b, a | b, a ^ b, ~b, a << b, a >> b, a >>> b, 0, a == b, a < b, a >>> 0 < b >>> 0][p - 16];
      } else switch (p) {
        case 0: return 0;
        case 1: S[s++] = u << 24 >> 24; break;
        case 2: S[s++] = u | P[c + 3] << 16 | P[c + 4] << 24; break;
        case 4: S[s++] = b; S[s++] = b; break;
        case 5: S[s++] = b; S[s++] = a; break;
        case 6: S[s++] = a; S[s++] = b; S[s++] = a; break;
        case 7: S[s++] = a; S[s++] = b; S[s++] = e; break;
        case 48: n += u << 16 >> 16; break;
        case 49: b || (n += u << 16 >> 16); break;
        case 50: b && (n += u << 16 >> 16); break;
        case 51: if (C.length > 63) return 7; C.push(n); n = u; break;
        case 52: if (!C.length) return 8; n = C.pop(); break;
        case 64: if (b >>> 0 > 255) return 6; S[s++] = M[b]; break;
        case 65: if (b >>> 0 > 255) return 6; M[b] = a; break;
        case 80: { const r = o + b; if (r.length > 65536) return 11; o = r; break; }
        case 81: if (o.length > 65535) return 11; o += String.fromCharCode(b & 255); break;
        case 82: S[s++] = Q[j++] ?? -1; break;
        case 83: return b & 255;
      }
      c = n;
    }
  })();
  f.mkdirSync(O + d);
  f.writeFileSync(O + d + '/stdout.bin', o, 'latin1');
  f.writeFileSync(O + d + '/exit.txt', '' + x);
}

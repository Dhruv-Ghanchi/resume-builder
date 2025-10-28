// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for the Jest (jsdom) environment.
// Some dependencies (for example jspdf -> fast-png -> iobuffer) expect these globals.
if (typeof TextEncoder === 'undefined' || typeof TextDecoder === 'undefined') {
  try {
    // Node's util module exposes TextEncoder/TextDecoder in newer versions
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
  } catch (e) {
    // Minimal, dependency-free shim using Buffer. Good enough for tests that need UTF-8 encoding/decoding.
    /* eslint-disable no-global-assign */
    global.TextEncoder = class TextEncoder {
      encode(str = '') {
        return Uint8Array.from(Buffer.from(String(str), 'utf8'));
      }
    };

    global.TextDecoder = class TextDecoder {
      decode(buf) {
        // Accept ArrayBuffer, Uint8Array, Buffer
        if (buf && buf.buffer instanceof ArrayBuffer) buf = new Uint8Array(buf.buffer);
        return Buffer.from(buf).toString('utf8');
      }
    };
    /* eslint-enable no-global-assign */
  }
}
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import mockDocument from './mockDocument';

if (
  typeof document === 'undefined' ||
  typeof document.implementation === 'undefined'
) {
  global.document = mockDocument();
}

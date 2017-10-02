/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import { originalDocument } from './mockDocument';

export default function resetDocument() {
  global.document = originalDocument;
}

/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import parse5 from 'parse5';

const defaultAdapter = parse5.treeAdapters.default;

export const originalDocument = global.document;

export const interweaveAdapter = {
  ...defaultAdapter,
  createElement(...args) {
    return {
      ...defaultAdapter.createElement(...args),
      nodeType: 2,
    };
  },
  createTextNode(...args) {
    return {
      ...defaultAdapter.createTextNode(...args),
      nodeType: 3,
    };
  },
  createCommentNode(...args) {
    return {
      ...defaultAdapter.createCommentNode(...args),
      nodeType: 8,
    };
  },
};

export default function mockDocument() {
  return {
    implementation: {
      createHTMLDocument(title = '') {
        const doc = parse5.parse(
          `<!DOCTYPE html><html><head><title>${title}</title></head><body></body></html>`,
          {
            treeAdapter: interweaveAdapter,
          },
        );

        // Extract the body from #document[0] -> html[1] -> head[0] -> body[1]
        doc.body = doc.childNodes[1].childNodes[1]; // eslint-disable-line

        // Define a fake innerHTML setter
        Object.defineProperty(doc.body, 'innerHTML', {
          set(markup) {
            this.childNodes = parse5.parseFragment(markup, {
              treeAdapter: interweaveAdapter,
            }).childNodes;
          },
        });

        return doc;
      },
    },
  };
}

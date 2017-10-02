import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Interweave from '../../interweave/src/Interweave';
import mockDocument from '../src/mockDocument';
import resetDocument from '../src/resetDocument';
import { HrefFilter, CodeTagMatcher } from '../../../tests/mocks';

describe('Interweave (with SSR)', () => {
  beforeEach(() => {
    global.document = mockDocument();
  });

  afterEach(() => {
    resetDocument();
  });

  it('renders basic HTML', () => {
    const actual = ReactDOMServer.renderToStaticMarkup(
      <Interweave content="This is <b>bold</b>." />,
    );

    expect(actual).toBe('<span class="interweave">This is <b class="interweave">bold</b>.</span>');
  });

  it('strips HTML', () => {
    const actual = ReactDOMServer.renderToStaticMarkup(
      <Interweave content="This is <b>bold</b>." noHtml />,
    );

    expect(actual).toBe('<span class="interweave interweave--no-html">This is bold.</span>');
  });

  it('supports filters', () => {
    const actual = ReactDOMServer.renderToStaticMarkup(
      <Interweave
        filters={[new HrefFilter()]}
        content={'Foo <a href="foo.com">Bar</a> Baz'}
      />,
    );

    expect(actual).toBe('<span class="interweave">Foo <a href="bar.net" class="interweave">Bar</a> Baz</span>');
  });

  it('supports matchers', () => {
    const actual = ReactDOMServer.renderToStaticMarkup(
      <Interweave
        matchers={[new CodeTagMatcher('b', '1')]}
        content="Foo [b] Bar Baz"
      />,
    );

    expect(actual).toBe('<span class="interweave">Foo <span class="interweave">B</span> Bar Baz</span>');
  });
});

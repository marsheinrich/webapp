import { EzHtml } from '../../../ezlibrary/helpers/EzHtml';
import { EzBadParamException } from '../../../ezlibrary/exceptions/EzBadParamException.js';

describe('EzHtml', () => {
    describe('template', () => {
        test('returns a string with proper formatting', () => {
            const result = EzHtml.template`<h1> Hello! </h1>`;
            expect(result).toEqual('<h1> Hello! </h1>');
        });
        test('handles extra spaces and line feeds correctly', () => {
            const result = EzHtml.template`<div>  This is a test   </div>`.replace(/\s+/g, ' ').trim();
            expect(result).toEqual('<div> This is a test </div>');
        });

        test('handles numeric and boolean values correctly', () => {
            const result = EzHtml.template`<p>  ${5} ${true}      </p>`;
            expect(result).toEqual('<p> 5 true </p>');
        });

        test('handles empty strings correctly', () => {
            const result = EzHtml.template``;
            expect(result).toEqual('');
        });

        test('handles null values correctly', () => {
            const result = EzHtml.template`<span> ${null !== null ? null : 'null'} </span>`;
            expect(result).toEqual('<span> null </span>');
        });

        test('returns the value with one space in front, once space at end', () => {
            const result = EzHtml.template`<h1>Hello!</h1>`.trim();
            expect(result).toEqual(' <h1>Hello!</h1> '.trim());
        });
    });

    describe('build', () => {
        test('returns a string with proper formatting', () => {
            const result = EzHtml.build`<h1> Hello! </h1>\n`;
            expect(result).toEqual('<h1> Hello! </h1>\n');
        });

        test('handles extra spaces and line feeds correctly', () => {
            const result = EzHtml.build`<h1>  This is a test  </h1>`.trim();
            expect(result).toEqual('<h1> This is a test </h1>'.trim());
        });

        test('handles numeric and boolean values correctly', () => {
            const result = EzHtml.build`<p> ${5} ${true} </p>`.trim();
            expect(result).toEqual('<p> 5 true </p>'.trim());
        });

        test('handles empty strings correctly', () => {
            const result = EzHtml.build``;
            expect(result).toEqual('');
        });

        test('handles null values correctly', () => {
            const result = EzHtml.build`<span>${null} </span>`.trim();
            expect(result).toEqual('<span> </span>');
        });
    });

    describe('buildId', () => {
        test('removes spaces and line feeds and returns the trimmed value', () => {
            const result = EzHtml.buildId`   <h1>   Hello!    </h1>\n   `;
            expect(result).toEqual('<h1>Hello!</h1>');
        });

        test('handles numeric and boolean values correctly', () => {
            const result = EzHtml.buildId`  ${5} ${true}  \n\r\t  `;
            expect(result).toEqual('5true');
        });

        test('handles empty strings correctly', () => {
            const result = EzHtml.buildId``;
            expect(result).toEqual('');
        });

        test('handles null values correctly', () => {
            const result = EzHtml.buildId`${null}`;
            expect(result).toEqual('');
        });

        test('handles line feeds correctly', () => {
            const result = EzHtml.buildId`\n<div>\nHello!\n</div>\n`;
            expect(result).toEqual('<div>Hello!</div>');
        });
    });

    describe('div', () => {
        test('builds an HTML div element with the provided id and no optional attributes or inner HTML', () => {
            const result = EzHtml.div('myDivId');
            expect(result).toEqual('<div id="myDivId"></div>');
        });

        test('builds an HTML div element with the provided id, optional attributes, and inner HTML', () => {
            const optionalAttributes = ['class="container"', 'style="background-color: #fff;"'];
            const innerHtml = '<p>Hello, world!</p>';
            const result = EzHtml.div('myDivId', optionalAttributes, innerHtml);
            expect(result).toEqual('<div id="myDivId" class="container" style="background-color: #fff;"><p>Hello, world!</p></div>');
        });

        test('throws an error when id parameter is not provided', () => {
            expect(() => {
                EzHtml.div();
            }).toThrow(new EzBadParamException('id', EzHtml, EzHtml.a));
        });

        test('handles null or undefined optionalAttributes and innerHtml parameters', () => {
            const result1 = EzHtml.div('myDivId', null, null).trim();
            expect(result1).toEqual('<div id="myDivId"></div>');

            const result2 = EzHtml.div('myDivId', undefined, undefined).trim();
            expect(result2).toEqual('<div id="myDivId"></div>');
        });
    });

    describe('a', () => {
        test('builds an HTML a element with the provided id, href, optional attributes, and inner HTML', () => {
            const optionalAttributes = ['class="btn"', 'target="_blank"'];
            const innerHtml = 'Click me';
            const result = EzHtml.a('myLinkId', 'https://example.com', optionalAttributes, innerHtml);
            expect(result).toEqual('<a id="myLinkId" href="https://example.com" class="btn" target="_blank">Click me</a>');
        });
        test('throws an error when id parameter is not provided', () => {
            expect(() => {
                EzHtml.a();
            }).toThrow('A valid id parameter value is required');
        });

        test('sets default href value when href parameter is not provided', () => {
            const result = EzHtml.a('myLinkId', null, null, 'Click me');
            expect(result).toEqual('<a id="myLinkId" href="#">Click me</a>');
        });

        test('throws an error when innerHtml parameter is not provided', () => {
            expect(() => {
                EzHtml.a(null, 'https://example.com');
            }).toThrow('A valid id parameter value is required');
        });
    });

    describe('button', () => {
        test('generates a button with required ID', () => {
            const id = 'myButton';
            const expectedOutput = `<button id="${id}"></button>`;
            const result = EzHtml.button(id);

            expect(result).toEqual(expectedOutput);
        });

        test('generates a button with ID, classes, and title', () => {
            const id = 'myButton';
            const classes = 'btn btn-primary';
            const title = 'Click me';
            const expectedOutput = `<button id="myButton" class="btn btn-primary" title="Click me"></button>`;

            const result = EzHtml.button(id, classes, title);

            expect(result).toEqual(expectedOutput);
        });

        test('generates a button with ID and content', () => {
            const id = 'myButton';
            const content = 'This is a button';
            const expectedOutput = `<button id="${id}">${content}</button>`;
            const result = EzHtml.button(id, '', '', '', '', content);
            expect(result).toEqual(expectedOutput);
        });

        test('handles undefined optional parameters', () => {
            const id = 'myButton';
            const expectedOutput = `<button id="${id}"></button>`;
            const result = EzHtml.button(id, undefined, undefined, undefined, undefined);
            expect(result).toEqual(expectedOutput);
        });

        test('handles empty strings for optional parameters', () => {
            const id = 'myButton';
            const expectedOutput = `<button id="${id}"></button>`;
            const result = EzHtml.button(id, '', '', '', []);
            expect(result).toEqual(expectedOutput);
        });
    });

    describe('attributeArrayToElementAttributes', () => {
        test('returns an empty string when attributes array is empty', () => {
            const result = EzHtml.attributeArrayToElementAttributes([]);
            expect(result).toEqual('');
        });

        test('returns a string with single attribute', () => {
            const attributes = ['class="myClass"'];
            const result = EzHtml.attributeArrayToElementAttributes(attributes);
            expect(result).toEqual('class="myClass"');
        });

        test('returns a string with multiple attributes', () => {
            const attributes = ['class="myClass"', 'id="myId"', 'onclick="myFunction()"'];
            const result = EzHtml.attributeArrayToElementAttributes(attributes);
            expect(result).toEqual('class="myClass" id="myId" onclick="myFunction()"');
        });

        test('ignores empty or undefined attributes', () => {
            const attributes = ['class="myClass"', '', 'id="myId"', undefined, null];
            const result = EzHtml.attributeArrayToElementAttributes(attributes);
            expect(result).toEqual('class="myClass" id="myId"');
        });

        test('returns an empty string when all attributes are empty or undefined', () => {
            const attributes = ['', undefined, null];
            const result = EzHtml.attributeArrayToElementAttributes(attributes);
            expect(result).toEqual('');
        });
    });
    describe('simpleEncodeHtml', () => {
        test('returns an empty string for an empty input', () => {
            const value = '';
            expect(EzHtml.simpleEncodeHtml(value)).toEqual('');
        });

        test('encodes basic HTML characters', () => {
            const value = '<&" >';
            const expected = '&lt;&amp;&quot; &gt;';
            expect(EzHtml.simpleEncodeHtml(value)).toEqual(expected);
        });

        test('preserves non-special characters', () => {
            const value = 'This is a normal string.';
            expect(EzHtml.simpleEncodeHtml(value)).toEqual(value);
        });

        test('encodes characters within other encoded entities', () => {
            const value = 'Encoded string: &lt;a&gt;';
            const expected = 'Encoded string: &amp;lt;a&amp;gt;';
            expect(EzHtml.simpleEncodeHtml(value)).toEqual(expected);
        });

        test('handles strings with a mix of encoded and non-encoded characters', () => {
            const value = 'Here is some <text>special</text> content.';
            const expected = 'Here is some &lt;text&gt;special&lt;/text&gt; content.';
            expect(EzHtml.simpleEncodeHtml(value)).toEqual(expected);
        });
    });
    describe('encodeHtml', () => {
        test('returns an empty string for an empty input', () => {
            const value = '';
            expect(EzHtml.encodeHtml(value)).toEqual('');
        });

        test('encodes basic HTML characters', () => {
            const value = '<&" >';
            const expected = '&lt;&amp;&quot; &gt;';
            expect(EzHtml.encodeHtml(value)).toEqual(expected);
        });

        test('preserves non-special characters', () => {
            const value = 'This is a normal string.';
            expect(EzHtml.encodeHtml(value)).toEqual(value);
        });

        test('encodes characters within other encoded entities', () => {
            const value = 'Encoded string: &lt;a&gt;';
            const expected = 'Encoded string: &amp;lt;a&amp;gt;';
            expect(EzHtml.encodeHtml(value)).toEqual(expected);
        });

        test('handles strings with a mix of encoded and non-encoded characters', () => {
            const value = 'Here is some <text>special</text> content.';
            const expected = 'Here is some &lt;text&gt;special&lt;/text&gt; content.';
            expect(EzHtml.encodeHtml(value)).toEqual(expected);
        });
    });
    describe('decodeHtml', () => {
        test('returns an empty string for an empty input', () => {
            const value = '';
            expect(EzHtml.decodeHtml(value)).toEqual('');
        });

        test('decodes basic HTML entities', () => {
            const value = '&lt; &amp; &quot; &gt;';
            const expected = '< & " >';
            expect(EzHtml.decodeHtml(value)).toEqual(expected);
        });

        test('preserves non-encoded characters', () => {
            const value = 'This is a normal string.';
            expect(EzHtml.decodeHtml(value)).toEqual(value);
        });

        test('handles invalid or incomplete entities', () => {
            const value = 'Encoded string: &#123; &incomplete';
            const expected = 'Encoded string: { &incomplete';
            expect(EzHtml.decodeHtml(value)).toEqual(expected);
        });

        test('decodes multiple entities within a string', () => {
            const value = 'Here is some &lt;b&gt;bold&lt;/b&gt; text.';
            const expected = 'Here is some <b>bold</b> text.';
            expect(EzHtml.decodeHtml(value)).toEqual(expected);
        });
    });
    describe('divStart getter', () => {
        test('returns a string with an open-ended starting div tag', () => {
            expect(EzHtml.divStart).toBe('<div ');
        });

        test('returns the same string across multiple calls', () => {
            const firstCall = EzHtml.divStart;
            const secondCall = EzHtml.divStart;
            expect(firstCall).toBe(secondCall);
        });

        test('is a read-only property', () => {
            expect(() => {
                EzHtml.divStart = 'foo';
            }).toThrowError(TypeError);
        });

        test('is consistent with the generated HTML', () => {
            const html = EzHtml.divStart + 'class="my-div"></div>';
            expect(html).toBe('<div class="my-div"></div>');
        });

        test('can be used in a template literal', () => {
            const html = `${EzHtml.divStart}id="my-div">Content</div>`;
            expect(html).toBe('<div id="my-div">Content</div>');
        });
    });
    describe('divEnd getter', () => {
        test('returns a string with the ending div tag', () => {
            expect(EzHtml.divEnd).toBe('</div>');
        });

        test('returns the same string across multiple calls', () => {
            const firstCall = EzHtml.divEnd;
            const secondCall = EzHtml.divEnd;
            expect(firstCall).toBe(secondCall);
        });

        test('is a read-only property', () => {
            expect(() => {
                EzHtml.divEnd = 'foo';
            }).toThrowError(TypeError);
        });

        test('completes a valid div tag', () => {
            const html = EzHtml.divStart + 'class="my-div">Content' + EzHtml.divEnd;
            expect(html).toBe('<div class="my-div">Content</div>');
        });

        test('can be used in various HTML contexts', () => {
            const html = `<p>Some text ${EzHtml.divEnd} and more text</p>`;
            expect(html).toBe('<p>Some text </div> and more text</p>');
        });
    });
    describe('aStart getter', () => {
        test('returns a string with the opening anchor tag', () => {
            expect(EzHtml.aStart).toBe('<a ');
        });

        test('returns the same string across multiple calls', () => {
            const firstCall = EzHtml.aStart;
            const secondCall = EzHtml.aStart;
            expect(firstCall).toBe(secondCall);
        });

        test('is a read-only property', () => {
            expect(() => {
                EzHtml.aStart = 'foo';
            }).toThrowError(TypeError);
        });

        test('can be used to start an anchor tag with attributes', () => {
            const href = 'https://www.example.com';
            const html = `${EzHtml.aStart}href="${href}">Link Text</a>`;
            expect(html).toBe(`<a href="https://www.example.com">Link Text</a>`);
        });

        test('can be used in template literals', () => {
            const href = 'https://www.example.com';
            const text = 'Click Here';
            const html = `<p>${EzHtml.aStart}href="${href}">${text}</a></p>`;
            expect(html).toBe(`<p><a href="https://www.example.com">Click Here</a></p>`);
        });
    });

    describe('aEnd getter', () => {
        test('returns a string with the closing anchor tag', () => {
            expect(EzHtml.aEnd).toBe('</a>');
        });

        test('returns the same string across multiple calls', () => {
            const firstCall = EzHtml.aEnd;
            const secondCall = EzHtml.aEnd;
            expect(firstCall).toBe(secondCall);
        });

        test('is a read-only property', () => {
            expect(() => {
                EzHtml.aEnd = 'foo';
            }).toThrowError(TypeError);
        });

        test('completes a valid anchor tag', () => {
            const href = 'https://www.example.com';
            const html = `${EzHtml.aStart}href="${href}">Link Text${EzHtml.aEnd}`;
            expect(html).toBe(`<a href="https://www.example.com">Link Text</a>`);
        });

        test('can be used in various HTML contexts', () => {
            const html = `<p>Some text ${EzHtml.aEnd} and more text</p>`;
            expect(html).toBe('<p>Some text </a> and more text</p>');
        });
    });
    describe('buttonStart getter', () => {
        test('returns a string with the opening button tag', () => {
            expect(EzHtml.buttonStart).toBe('<button ');
        });

        test('returns the same string across multiple calls', () => {
            const firstCall = EzHtml.buttonStart;
            const secondCall = EzHtml.buttonStart;
            expect(firstCall).toBe(secondCall);
        });

        test('is a read-only property', () => {
            expect(() => {
                EzHtml.buttonStart = 'foo';
            }).toThrowError(TypeError);
        });

        test('can be used to start a button tag with attributes', () => {
            const type = 'submit';
            const text = 'Click Me';
            const html = `${EzHtml.buttonStart}type="${type}">${text}</button>`;
            expect(html).toBe(`<button type="submit">Click Me</button>`);
        });

        test('can be used in template literals', () => {
            const type = 'button';
            const text = 'Do Something';
            const html = `<p>${EzHtml.buttonStart}type="${type}">${text}</button></p>`;
            expect(html).toBe(`<p><button type="button">Do Something</button></p>`);
        });
    });
    describe('buttonEnd getter', () => {
        test('returns a string with the closing button tag', () => {
            expect(EzHtml.buttonEnd).toBe('</button>');
        });

        test('returns the same string across multiple calls', () => {
            const firstCall = EzHtml.buttonEnd;
            const secondCall = EzHtml.buttonEnd;
            expect(firstCall).toBe(secondCall);
        });

        test('is a read-only property', () => {
            expect(() => {
                EzHtml.buttonEnd = 'foo';
            }).toThrowError(TypeError);
        });

        test('completes a valid button tag', () => {
            const type = 'submit';
            const text = 'Click Me';
            const html = `${EzHtml.buttonStart}type="${type}">${text}${EzHtml.buttonEnd}`;
            expect(html).toBe(`<button type="submit">Click Me</button>`);
        });

        test('can be used in various HTML contexts', () => {
            const html = `<p>Some text before ${EzHtml.buttonEnd} and more text</p>`;
            expect(html).toBe('<p>Some text before </button> and more text</p>');
        });
    });
});

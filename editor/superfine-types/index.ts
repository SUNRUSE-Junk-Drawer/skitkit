// Copyright © Jorge Bucaran <https://jorgebucaran.com>
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

declare module "superfine" {
  type HtmlOrSvgElementTagNameMap = HTMLElementTagNameMap &
    Pick<
      SVGElementTagNameMap,
      Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>
    >;

  export type Props<TTagName extends keyof HtmlOrSvgElementTagNameMap> = {
    readonly [TAttributeName in keyof HtmlOrSvgElementTagNameMap[TTagName]]?: HtmlOrSvgElementTagNameMap[TTagName][TAttributeName];
  } & {
    readonly key?: number | string;
  };

  type Node = ElementNode<keyof HtmlOrSvgElementTagNameMap> | TextNode;
  type Children = ReadonlyArray<Node>;

  type ElementNode<TTagName extends keyof HtmlOrSvgElementTagNameMap> = {
    readonly tag: TTagName;
    readonly props: Props<TTagName>;
    readonly key: undefined | string;
    readonly children: Children;
    readonly type: undefined;
    readonly node: unknown;
  };

  type TextNode = {
    readonly tag: string;
    readonly props: Record<string, never>;
    readonly key: undefined;
    readonly children: ReadonlyArray<never>;
    readonly type: 3;
    readonly node: unknown;
  };

  function h<TTagName extends keyof HtmlOrSvgElementTagNameMap>(
    type: TTagName,
    props: Props<TTagName>,
    children?: Children | Node
  ): ElementNode<TTagName>;

  function text(string: string): TextNode;

  function patch<TTagName extends keyof HtmlOrSvgElementTagNameMap>(
    node: HtmlOrSvgElementTagNameMap[TTagName],
    vdom: ElementNode<TTagName>
  ): void;
}

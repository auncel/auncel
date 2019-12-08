import { IRenderNode, NodeType } from '@feoj/common/types/domCore';
import { TTag } from '@feoj/common/types/element';
import { USER_STYLE_ID } from './const';

/**
 * 创建空的 RenderNode
 *
 * @export
 * @param {string} [tagName='div']
 * @returns {IRenderNode}
 */
export function createEmptyNode(tagName: TTag = 'div'): IRenderNode {
  return {
    attr: {},

    rect: { top: 0, left: 0, width: 0, height: 0 },

    tagName,
    nodeType: NodeType.ELEMENT_NODE,

    style: {},
  };
}

export function createTextNode(text = ''): IRenderNode {
  return {
    text,
    nodeType: NodeType.TEXT_NODE,
  };
}

export function isElement(elem: IRenderNode): boolean {
  return elem.nodeType === NodeType.ELEMENT_NODE;
}

// export function createHtmlTpl(stylesheet: string, fragment: string): string {
//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <title>Document</title>
//   <style>
//     .diff___rect {
//       border: 1px solid red;
//       position: absolute;
//     }
//   </style>
//   <style id="inject-style">
//     ${stylesheet}
//   </style>
// </head>

// <body>
// ${fragment}
// </body>

// </html>`;
// }

/**
 * 返回完整的 HTML 字符串
 * @param fragment HTML 片段
 * @param stylesheet css 片段
 */
export function createHTMLTpl(fragment: string, stylesheet: string): string {
  // 数组更美观
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <meta http-equiv="X-UA-Compatible" content="ie=edge">',
    '  <title>Document</title>',
    '  <link href="https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css" rel="stylesheet">',
    `  <style id="${USER_STYLE_ID}">`,
    `    ${stylesheet}`,
    '  </style>',
    '</head>',
    '<body>',
    `    ${fragment}`,
    '</body>',
    '</html>'].join('\n');
}

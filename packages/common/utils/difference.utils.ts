import { IRenderNode, NodeType } from '../types/domCore';

/**
 * 创建空的 RenderNode
 *
 * @export
 * @param {string} [tagName='div']
 * @returns {IRenderNode}
 */
export function createEmptyNode(tagName = 'div'): IRenderNode {
  return {
    attr: {},

    rect: [0, 0, 0, 0],

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

export function createHtmlTpl(stylesheet: string, fragment: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style> 
    .diff___rect {
      border: 1px solid red;
      position: absolute;
    }
  </style>
  <style id="inject-style">
    ${stylesheet}
  </style>
</head>

<body>
${fragment}
</body>

</html>`;
}

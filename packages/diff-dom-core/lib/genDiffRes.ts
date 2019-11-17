import { IDiffNode, RenderTree, DiffType } from "@feoj/common/types/difference.interface";

function getNodeLocation(node: IDiffNode) {
  const buff = [];

  while(node) {
    buff.unshift(node.location);
    node = node.parent;
  }
  return buff.join(' ');
}

function diffStyle(node: IDiffNode): string[]{
  const { exemplar, instance } = node.style;
  const diffReason = [];
  for (let property in exemplar ) {
    if (instance[property]) {
      // TODO: 更多的检查
      if (instance[property] !== exemplar[property]) {
        diffReason.push(
          `property incorrent. [${property}] expect: ${exemplar[property]}, actual: ${instance[property]}`
        );
      }
    } else {
      diffReason.push(`lost property ${property}`);
    }
  }
  return diffReason
}

/**
 * 只是位置信息的比较
 *
 * @export
 * @param {IDiffNode} root
 */
export function genDiffRes(root: IDiffNode) {
  const framgent = document.createDocumentFragment();  
  const diffLog = [];
  const stack: IDiffNode[] = [];
  stack.push(root);
  while(stack.length) {
    const node = stack.pop();
    if (node) {
      // diff type is rect
      if (node.type & DiffType.Rect) {
        const $rect = createRectEle(node.rect.instance);
        framgent.appendChild($rect);
      }

      if (node.type & DiffType.Style) {
        const logMsg = {
          location: getNodeLocation(node),
          difference: diffStyle(node),
        };
        diffLog.push(logMsg);
      }

      // push children to stack
      if (node.children) {
        node.children.forEach(child => {
          child.parent = node;
          stack.push(child);
        });
      }
    }
  }

  document.body.appendChild(framgent);
  return diffLog;
}

function createRectEle(rect: number[]) {
  const $rect = document.createElement('div');
  $rect.className = 'diff___rect';
  $rect.style.left = rect[0] + 'px'; 
  $rect.style.top = rect[1] + 'px'; 
  $rect.style.width = rect[2] + 'px'; 
  $rect.style.height = rect[3] + 'px';

  return $rect;
}
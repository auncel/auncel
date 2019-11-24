import { TTag, TAttributes } from './element';
import { TStyleProps } from './css';

export interface IDiffParam {
  stylesheet?: string;
  fragment: string;
}

export const STRICT_MODE = 0;

export const LOOSE_MODE = 1;

export type TDiffMode = typeof STRICT_MODE | typeof LOOSE_MODE;

export interface IDiffOption {
  mode: TDiffMode;
}

export enum NodeType {
  ELEMENT_NODE = 1, // 一个 元素 节点，例如 <p> 和 <div>。
  /** @deprecated  */
  ATTRIBUTE_NODE, // 元素的耦合属性 。在 DOM4 规范里Node 接口将不再实现这个元素属性。
  TEXT_NODE, // Element 或者 Attr 中实际的  文字
  /** @deprecated  */
  CDATA_SECTION_NODE, // 一个 CDATASection，例如 <!CDATA[[ … ]]>。
  /** @deprecated  */
  ENTITY_REFERENCE_NODE, // 一个 XML 实体引用节点。 在 DOM4 规范里被移除。
  PROCESSING_INSTRUCTION_NODE, // 一个用于XML文档的 ProcessingInstruction ，例如 <?xml-stylesheet ... ?> 声明。
  /** @deprecated  */
  ENTITY_NODE, // 一个 XML <!ENTITY ...>  节点。 在 DOM4 规范中被移除。
  COMMENT_NODE, // 一个 Comment 节点。
  DOCUMENT_NODE, // 一个 Document 节点。
  DOCUMENT_TYPE_NODE, // 描述文档类型的 DocumentType 节点。例如 <!DOCTYPE html>  就是用于 HTML5 的。
  DOCUMENT_FRAGMENT_NODE, // 一个 DocumentFragment 节点
  /** @deprecated  */
  NOTATION_NODE, // 一个 XML <!NOTATION ...> 节点。 在 DOM4 规范里被移除.
}


export type TNodeRect = [
  number?, // left
  number?, // top
  number?, // width
  number?, // height
];

export interface IRenderNode {
  /**
   * TODO: 完善 attribute
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Attribute_list
   */
  attr?: TAttributes;

  id?: string;
  className?: string;
  tagName?: TTag;
  nodeName?: string;
  nodeType: NodeType.ELEMENT_NODE | NodeType.TEXT_NODE;

  rect?: TNodeRect;

  dataset?: DOMStringMap;

  style?: TStyleProps;

  children?: IRenderNode[];
  text?: string; // for TEXT_NODE
}

export type TRenderTree = IRenderNode;

export type ValuesOf<T extends any[]>= T[number];

export enum DiffType {
  None = 0,
  // eslint-disable-next-line no-shadow
  NodeType = 1 << 0,
  Tag = 1 << 1, // element 和 text， element tag 不同
  Id = 1 << 2,
  ClassName = 1 << 3,
  Attr = 1 << 4,
  DataSet = 1 << 5,
  Style = 1 << 6,
  Rect = 1 << 7,
  Text = 1 << 8,
}

interface IDiffProp<T> {
  exemplar: T; // 参考答案
  instance: T;
}

export interface IDiffNode {
  type: number; // 差异类型，是 DiffType 的累加值
  location: string; // 为了方便日志输出

  tagName?: IDiffProp<string>;
  nodeType?: IDiffProp<NodeType>;

  id?: IDiffProp<string>;
  className?: IDiffProp<string>;

  style?: IDiffProp<TStyleProps>;
  attr?: IDiffProp<TAttributes>;
  rect?: IDiffProp<TNodeRect>;
  dataset?: IDiffProp<DOMStringMap>;

  children?: IDiffNode[];
  parent?: IDiffNode; // 生成 diff 结果时，用于获取生成节点路径

  text?: IDiffProp<string>;
}

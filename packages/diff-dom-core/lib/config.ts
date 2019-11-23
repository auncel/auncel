import { TCSSProperty } from '@feoj/common/types/css';
import { TTag } from '@feoj/common/types/element';

export interface IGenerateRenderTreeOptions {
  ignoreElement?: TTag[];
  CSSPropertWhiteList?: TCSSProperty[];
  CSSPropertBlackList?: TCSSProperty[];
  tagWhiteList?: TTag[];
  tagBlackList?: TTag[];
}

export const generateRenderTreeOption: IGenerateRenderTreeOptions = {
  ignoreElement: [
    'script', 'style',
  ],
  CSSPropertWhiteList: [

  ],
  // if keyword 'animation' means black all animation-* properties
  CSSPropertBlackList: [
    'transform', 'animation',
  ],
  tagBlackList: [
    'noscript', 'font', 'frameset', 'iframe', 'frame', 'canvas',
  ],
  tagWhiteList: [

  ],
};

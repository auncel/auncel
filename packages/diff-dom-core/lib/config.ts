/* eslint-disable no-param-reassign */
import { TCSSProperty } from '@feoj/common/types/css';
import { TTag } from '@feoj/common/types/element';

export interface IGenerateRenderTreeOptions {
  ignoreElement?: TTag[];
  CSSPropertWhiteList?: TCSSProperty[]; // 如果 length == 1，那就不生效
  CSSPropertBlackList?: TCSSProperty[];
  tagWhiteList?: TTag[]; // 出题者限制使用的标签
  tagBlackList?: TTag[]; // 如果 length == 1，那就不生效
  noChildElement?: TTag[];
}

export const generateRenderTreeOptions: IGenerateRenderTreeOptions = {
  ignoreElement: [
    'script', 'style',
  ],
  CSSPropertWhiteList: [],
  // if keyword 'animation' means black all animation-* properties
  CSSPropertBlackList: [
    'transform', 'animation',
  ],
  tagBlackList: [
    'noscript', 'font', 'frameset', 'iframe', 'frame', 'canvas',
  ],
  tagWhiteList: [],
  noChildElement: [
    'img', 'canvas', 'input', 'textarea', 'audio',
    'video', 'hr', 'embed', 'object', 'progress',
  ],
};

export function mergeWithDefaultConfig(
  config: IGenerateRenderTreeOptions,
): IGenerateRenderTreeOptions {
  Object.keys(generateRenderTreeOptions).forEach((option) => {
    if (typeof config[option] !== 'undefined') {
      if (Array.isArray(generateRenderTreeOptions[option])) {
        config[option] = [...generateRenderTreeOptions[option], ...config[option]];
      }
    } else {
      config[option] = generateRenderTreeOptions[option];
    }
  });
  return config;
}

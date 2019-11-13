
import { diff } from './diff';
import { writeFileSync } from 'fs';

const tree0 = {
  "attr": {},
  "rect": [
    8,
    32,
    784,
    56
  ],
  "tagName": "BODY",
  "nodeType": 1,
  "style": {
    "font-size": "16px",
    "font-style": "normal",
    "border-color": "rgb(0, 0, 0)",
    "background": "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
  },
  "id": "",
  "className": "",
  "children": [
    {
      "attr": {},
      "rect": [
        8,
        32,
        784,
        56
      ],
      "tagName": "H1",
      "nodeType": 1,
      "style": {
        "font-size": "48px",
        "font-style": "normal",
        "border-color": "rgb(0, 0, 0)",
        "background": "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
      },
      "id": "",
      "className": "",
      "children": [
        {
          "text": "欢迎使用 Markdown",
          "nodeType": 3
        }
      ]
    }
  ]
}
const tree1 = {
  "attr": {},
  "rect": [
    8,
    32,
    784,
    240
  ],
  "tagName": "BODY",
  "nodeType": 1,
  "style": {
    "font-size": "16px",
    "font-style": "normal",
    "border-color": "rgb(0, 200, 0)",
    "background": "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
  },
  "id": "",
  "className": "",
  "children": [
    {
      "attr": {},
      "rect": [
        8,
        32,
        784,
        240
      ],
      "tagName": "H1",
      "nodeType": 1,
      "style": {
        "font-size": "48px",
        "font-style": "normal",
        "border-color": "rgb(0, 0, 0)",
        "background": "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
      },
      "id": "",
      "className": "",
      "children": [
        {
          "text": "欢迎使用 Markdown",
          "nodeType": 3
        }
      ]
    }
  ]
}

const res = diff(tree0, tree1);

writeFileSync('res.json',JSON.stringify(res,null, 2) )
import { Injectable } from '@nestjs/common';
import { tokenize } from '@surpass/common/css/tokenize';
import { IToken } from '@surpass/common/css/token';

@Injectable()
export class HtmlService {
  public createHTML(fragment: string, styleSheet: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link href="https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css" rel="stylesheet">
  <style id="inject-style">
    ${styleSheet}
  </style>
</head>
<body>
    ${fragment}
</body>
</html>
`;
  }

  public getProperties(styleSheet: string): string[] {
    const tokens: IToken[] = tokenize(styleSheet);
    return tokens
      .filter(token => token.type === 'property') // TODO: remove magic string
      .map(token => token.value);
  }
}

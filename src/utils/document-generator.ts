/** @format */

import axios from "axios";
import * as cheerio from "cheerio";
import {MarkdownString} from "vscode";

export class HoverDocumentGenerator {
  static instance: HoverDocumentGenerator;

  async getDocument(componentName: string | undefined) {
    if (!componentName) {
      return;
    }
    const {data: document} = await axios.get(
      `http://element-plus.org/zh-CN/component/${componentName}`,
      {responseType: "document"}
    );
    const $ = cheerio.load(document);

    const apiContent = `<html>
                              <head>
                               ${$(`head`).children().filter((index ,ref)=>ref.name['name'] === 'meta').toString()}
                               </head>
                           <body >
                               ${$(`.vp-table`).toString()}
                           <body/>
                         </html>`;

    const markdown = new MarkdownString(apiContent);
    markdown.supportHtml = true;

    return markdown;
  }

  static getInstance(): HoverDocumentGenerator {
    if (!this.instance) {
      this.instance = new HoverDocumentGenerator();
    }
    return this.instance;
  }
}

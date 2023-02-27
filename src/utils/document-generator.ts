import axios from "axios";
import * as  cheerio from 'cheerio';
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown';


export class HoverDocumentGenerator {
  static instance: HoverDocumentGenerator;

  async getDocument(componentName:string | undefined) {
    if(!componentName) {return;};
     const {data: document} = await axios.get(`http://element-plus.org/zh-CN/component/${componentName}`,{responseType:'document'});
     const $ = cheerio.load(document);
     return NodeHtmlMarkdown.translate($(`.vp-table,[id^=${componentName}]`).contents().toString().replace('#',''));
  }

  static getInstance(): HoverDocumentGenerator {
    if (!this.instance) {
      this.instance = new HoverDocumentGenerator();
    }
    return this.instance;
  }
}

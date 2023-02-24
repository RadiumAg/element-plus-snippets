import path from "path";
import axios from "axios";

export class HoverDocumentGenerator {
  static instance: HoverDocumentGenerator;

  async getDocument(componentName:string | undefined) {
    if(!componentName) {return;};
     const {data: document} = await axios.get(`http://element-plus.org/zh-CN/component/${componentName}`);
     console.log(document);
  }

  static getInstance(): HoverDocumentGenerator {
    if (!this.instance) {
      this.instance = new HoverDocumentGenerator();
    }
    return this.instance;
  }
}

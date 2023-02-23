import {get} from 'axios';

export class HoverDocumentGenerator {
  static instance: HoverDocumentGenerator;

  async getDocument(){
    const document  = await get('http://element-plus.org/',{responseType:'document'}); 
  }


  static getInstance(): HoverDocumentGenerator {
    if (!this.instance) {
      this.instance = new HoverDocumentGenerator();
    }
    return this.instance;
  }
}

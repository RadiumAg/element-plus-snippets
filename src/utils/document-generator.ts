import path from 'path';
export class HoverDocumentGenerator {
  static instance: HoverDocumentGenerator;

  async getDocument(){
    // const document  = await axios.default.get('http://element-plus.org/',{responseType:'document'}); 
    console.log(path);
  }


  static getInstance(): HoverDocumentGenerator {
    if (!this.instance) {
      this.instance = new HoverDocumentGenerator();
    }
    return this.instance;
  }
}

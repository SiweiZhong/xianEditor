import Text from './Text'
export default class Tab extends Text {
  constructor (){
    super();
    
    this.value = '&nbsp&nbsp&nbsp&nbsp';
    this.real = '\x20\x20\x20\x20';
  }
}
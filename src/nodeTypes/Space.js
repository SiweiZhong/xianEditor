import Text from './Text'
export default class Space extends Text {
  constructor (){
    super();

    this.value = '&nbsp';
    this.real = '\x20';
  }
}
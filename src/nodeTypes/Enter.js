import Text from './Text'
export default class Enter extends Text {
  constructor (){
    super();
    this.name = 'br';
    this.value = '<br>';
    this.real = '\n';
  }
}
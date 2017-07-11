import Placeholder from './Placeholder'
export default class Text extends Placeholder {
  constructor (value){
    super();
    this.name = 'span';
    this.value = value;
    this.real = value;
    this.width = 0;
  }
}
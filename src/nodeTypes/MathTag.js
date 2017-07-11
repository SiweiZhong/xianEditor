import Group from './Group'
import * as nodeStyle from '../nodeStyle'

export default class MathTag extends Group {
  constructor (attrs={}){
    super();
    this.name = 'span';
    this.attrs = attrs;
    this.style = Object.assign({}, nodeStyle.mathTag);

    this.init()
  }
}
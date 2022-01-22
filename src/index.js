export {default as DropdownItem} from '../src/dropdown-item';
export {default as DropdownMenu} from '../src/dropdown-menu';

import DropdownItem from '../src/dropdown-item';
import DropdownMenu from '../src/dropdown-menu';


export default {
  install(Vue) {
    Vue.component('dropdown-item',DropdownItem)
    Vue.component('dropdown-menu',DropdownMenu)
  }
}
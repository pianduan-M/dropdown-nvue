### 适用于 uni-app nvue 页面 dropdown 组件

参考有赞 dropdown 组件修改





基础用法

```html
<dropdown-menu>  
  <dropdown-item value="{{ value1 }}" options="{{ option1 }}" />  
  <dropdown-item value="{{ value2 }}" options="{{ option2 }}" /> 
</dropdown-menu>
```





### DropdownMenu Props

| 参数                   | 说明                           | 类型      | 默认值    |
| :--------------------- | :----------------------------- | :-------- | :-------- |
| active-color           | 菜单标题和选项的选中态颜色     | *string*  | `#2878ff` |
| z-index                | 菜单栏 z-index 层级            | *number*  | `10`      |
| duration               | 动画时长，单位毫秒             | *number*  | `200`     |
| direction              | 菜单展开方向，可选值为 up      | *string*  | `down`    |
| overlay                | 是否显示遮罩层                 | *boolean* | `true`    |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单     | *boolean* | `true`    |
| close-on-click-outside | 是否在点击外部 menu 后关闭菜单 | *boolean* | `true`    |
| custom-style           | 自定义样式                     | object    | -         |

### DropdownItem Props

| 参数        | 说明                   | 类型               | 默认值         |
| :---------- | :--------------------- | :----------------- | :------------- |
| value       | 当前选中项对应的 value | *number \| string* | -              |
| title       | 菜单项标题             | *string*           | 当前选中项文字 |
| options     | 选项数组               | *Option[]*         | `[]`           |
| disabled    | 是否禁用菜单           | *boolean*          | `false`        |
| title-class | 标题额外类名           | *string*           | -              |
| popup-style | 自定义弹出层样式       |                    |                |

### DropdownItem Events

| 事件名 | 说明                          | 回调参数 |
| :----- | :---------------------------- | :------- |
| change | 点击选项导致 value 变化时触发 | value    |
| open   | 打开菜单栏时触发              | -        |
| close  | 关闭菜单栏时触发              | -        |
| opened | 打开菜单栏且动画结束后触发    | -        |
| closed | 关闭菜单栏且动画结束后触发    |          |

### DropdownItem 方法

| 方法名 | 说明                                                         | 参数           | 返回值 |
| :----- | :----------------------------------------------------------- | :------------- | :----- |
| toggle | 切换菜单展示状态，传`true`为显示，`false`为隐藏，不传参为取反 | show?: boolean | -      |

### Option 数据结构

| 键名  | 说明   | 类型               |
| :---- | :----- | :----------------- |
| text  | 文字   | *string*           |
| value | 标识符 | *number \| string* |

### DropdownItem 插槽

| 类名        | 说明               |
| :---------- | :----------------- |
| active-icon | 当前选中 icon 插槽 |


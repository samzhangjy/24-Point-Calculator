# 24点计算器

24点计算器是一款能够自动计算24点的智能计算器。它使用JavaScript编写，采用最先进的[NodeJS](https://nodejs.org/en/) + [Electron](https://www.electronjs.org/)开发。

```plain
WARNING: This documentation is written in the Markdown format and using the UTF-8 encoding.
```

## 算法设计

24点计算器使用枚举法循环实现枚举所有24点算式的生成。生成所有可能的算式后，程序又自动过滤掉了基本相同的算式，比如：`(1+2+3)+4`和`1+(2+3+4)`都会自动归并为`1+2+3+4`，实现去重。

各函数的说明如下所示。

```js
/**
 * 通过数字生成数字对象，如：
 * 
 * dataWrap(1)  // 生成1的对象
 * 
 * 会返回：
 * { m: '1', r: 1 }
 * 
 * @param  {...any} num 要生成的数字
 * @returns {object} 生成后的数字与字符串对象
 */
function dataWarp (...num) {
  // 省略代码
}

/**
 * 生成两个数所有可能的算式
 * 
 * 返回值示例：
 * 
 * calc(dataWrap(1), dataWrap(2)) 会返回：
 * 
 * [
 *    {
 *      m: '(1+2)',
 *      r: 3
 *    },
 *    {
 *      m: '(1-2)',
 *      r: -1
 *    },
 *    {
 *      m: '(2-1)',
 *      r: 1
 *    },
 *    {
 *      m: '(1*2)',
 *      r: 2
 *    },
 *    {
 *      m: '(1/2)',
 *      r: 0.5
 *    },
 *    {
 *      m: '(2/1)',
 *      r: 2
 *    }
 * ]
 * 
 * @param {object} a 由`dataWrap()`函数生成的数字对象
 * @param {object} b 由`dataWrap()`函数生成的数字对象
 * @returns {object} 所有算式的列表
 */
function calm (a,b) {
  // 省略代码
}

/**
 * 获取四个数的所有可能的算式。意义同上，略。
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 * @param {*} d 
 * @param {*} u 
 * @returns 
 */
function allCalm (a,b,c,d,u) {
  // 省略代码
}

/**
 * 获取四个数字的所有成立的24点算式，未过滤。
 * 
 * @param {Number} a 第一个数字
 * @param {Number} b 第二个数字
 * @param {Number} c 第三个数字
 * @param {Number} d 第四个数字
 * @returns {Array} 生成的所有成立的算式列表
 */
function get24 (a,b,c,d) {
  // 省略代码
}

/**
 * 判断运算符号是否同级
 * @param {String} op1 
 * @param {String} op2 
 * @returns {Boolean} 同级为true，不同级为false
 */
function sameLv (op1, op2) {
  // 省略代码
}

/**
 * 过滤由get24()函数生成的结果，去除近似算式。
 * @param {Array} res 由get24()函数生成的结果列表
 * @returns {Array} 过滤后的结果列表
 */
function filter (res) {
    // 省略代码
}

/**
 * 获取过滤后的24点结果。
 * @returns {Array} 24点所有过滤后的成立的算式列表。
 */
function getResult (a, b, c, d) {
  return filter(get24(a, b, c, d));
}
```

## UI设计

在UI方面，24点计算器使用[UIKit](https://getuikit.com/)这个CSS框架来进行构建。界面主要分为几个区域：

![区域划分](./docs/areas.png)

- 边框区：显示标题和关闭按钮。
- 结果区：显示计算结果，单击`展开`还可以查看全部结果。不展开时默认只显示前三个结果。
- 按键区：显示数字按钮。`1 11 12 13`这几个数字都被做成了纸牌的英文字母：`A J Q K`。
- 功能键区：从上到下依次是计算、清空和随机按钮。
  - 点击计算按钮将计算已经输入的四个数的算式结果，并展示在结果区
  - 点击清空按钮将清空当前输入的所有数字。
  - 点击随机按钮将随机四个数字，展示在结果区内，然后可以点击计算按钮计算这四个随机数的24点。

## 安装与使用

### 使用已经打包的可执行文件

请打开`out`文件夹，然后双击`24-Point-Calculator.exe`以打开。请勿删除文件夹内的任何文件，否则程序可能会无法正常运行。

### 从代码运行

#### 安装依赖

首先，请下载并安装[NodeJS](https://nodejs.org/en/)。您也可以从文件夹`extras`中打开`node-v14.16.0-x64.msi`进行安装。

然后，在终端内切换到存放24点计算器代码的文件夹，运行：

```bash
npm install
```

这将自动安装程序所需的所有依赖。这可能需要一些时间。

#### 运行

安装了依赖之后，执行：

```bash
npm run start
```

就可以运行24点计算器了。如果您想要自己打包程序的话，请执行：

```bash
npm run make
```

## 参考资源

### 参考资料

- UIKit官方文档 - <https://getuikit.com/>
- NodeJS官方文档 - <https://nodejs.org/en/docs/>
- ElectronJS官方文档 - <https://www.electronjs.org/docs>

### 引用他人资源

- UIKit - <https://getuikit.com/>
- NodeJS - <https://nodejs.org/>
- ElectronJS - <https://www.electronjs.org/>

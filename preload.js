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
  return num.map((a) => ({
      m: a+'',
      r: a
  }));
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
  var r = [
      {
          m: `(${a.m}+${b.m})`,
          r: a.r+b.r
      },
      {
          m: `(${a.m}-${b.m})`,
          r: a.r-b.r
      },
      {
          m: `(${b.m}-${a.m})`,
          r: b.r-a.r
      },
      {
          m: `(${a.m}*${b.m})`,
          r: a.r*b.r
      },
  ];
  a.r !== 0 && r.push({
      m: `(${b.m}/${a.m})`,
      r: b.r/a.r
  });
  b.r !== 0 && r.push({
      m: `(${a.m}/${b.m})`,
      r: a.r/b.r
  });
  return r;
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
  var s = [], t = [];
  calm(a,b).forEach((i) => {
      s = s.concat(calm(i, c));
      t = t.concat(calm(i, d));
  });
  s.forEach((i) => {
      u = u.concat(calm(i, d));
  });
  t.forEach((i) => {
      u = u.concat(calm(i, c));
  });
  return u;
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
  [a,b,c,d]= dataWarp(a,b,c,d);
  var result = [];
  allCalm(c,d,b,a,allCalm(b,d,a,c,allCalm(b,c,a,d,allCalm(a,d,b,c,allCalm(a,c,b,d,allCalm(a,b,c,d,[])))))).forEach((i) => {
      if (i.r === 24) {
          result.push(i.m.slice(1, i.m.length - 1));
      }
  });
  return result;
}

/**
 * 判断运算符号是否同级
 * @param {String} op1 
 * @param {String} op2 
 * @returns {Boolean} 同级为true，不同级为false
 */
function sameLv (op1, op2) {
  if (op1 == op2) return true;
  else if (op1 == '*' && op2 == '/' || op1 == '/' && op2 == '*') return true;
  else if (op1 == '+' && op2 == '-' || op1 == '-' && op2 == '+') return true;
  return false;
}

/**
 * 过滤由get24()函数生成的结果，去除近似算式。
 * @param {Array} res 由get24()函数生成的结果列表
 * @returns {Array} 过滤后的结果列表
 */
function filter (res) {
  var result = [], tmp = {};
  for (var i = 0; i < res.length; i++) {
      var s = res[i], op = [];
      for (var j = 0; j < s.length; j++) {
          if (isNaN(Number(s[j])) && s[j] != '(' && s[j] != ')') {
              op.push(s[j]);
          }
      }
      var allSame = true, firstTwoSame = op[0] == op[1];
      for (var j = 0; j < op.length; j++) {
          if (j != 0 && !sameLv(op[j], op[j - 1])) allSame = false;
      }
      if ((op[0] == op[1] && op[0] == op[2] && op[1] == op[2]) && op[0] != '*' && op[0] != '+')
          allSame = false, firstTwoSame = false;
      if (allSame && tmp[op[0]]) continue;
      else if (allSame) tmp[op[0]] = true;
      if (allSame) {
          var t = "";
          for (var j = 0; j < s.length; j++) {
              if (s[j] != '(' && s[j] != ')') t = t.concat(s[j]);
          }
          s = t;
      } else if (firstTwoSame) {
          var t = "", cnt = 0, j;
          for (j = 0; j < s.length; j++) {
              if (cnt == 2) break;
              if (s[j] != '(' && s[j] != ')') t = t.concat(s[j]);
              if (s[j] == '*' || s[j] == '/' || s[j] == '+' || s[j] == '-') cnt++;
          }
          t = t + s.slice(j), cnt = 0;
          for (j = 0; j < t.length; j++) {
              if (t[j] == '(' || t[j] == ')') cnt++;
          }
          var l = ['', '(', '((', '(((', '(((('];
          t = l[cnt] + t;
          s = t;
      }
      try {
        if (eval(s) != 24) continue;
      } catch (_) {
        continue
      }
      result.push(s);
  }
  return result;
}

/**
 * 获取过滤后的24点结果。
 * @returns {Array} 24点所有过滤后的成立的算式列表。
 */
function getResult (a, b, c, d) {
  return filter(get24(a, b, c, d));
}

////////////////////////////////////////////////////////////////

var num = [], titleText = ''
var title = null, explain = null, expand = null
var calc = false
const { ipcRenderer } = require('electron')
window.addEventListener('DOMContentLoaded', () => {
  title = document.getElementById('res')
  explain = document.getElementById('explain')
  expand = document.getElementById('expand')
  var windowTopBar = document.getElementById('appTopBar')
  windowTopBar.style.width = "calc(100% - 40px)"
  windowTopBar.style.height = "40px"
  windowTopBar.style.backgroundColor = "#eee"
  windowTopBar.style.position = "absolute"
  windowTopBar.style.top = windowTopBar.style.left = 0
  windowTopBar.style.webkitAppRegion = "drag"
  var closeBtn = document.getElementById('closeBtn')
})

function setTitleText(text) {
  title.innerText = text
}

function onNumButtonClick(n) {
  if (num.length > 3) return
  if (calc) titleText = '', calc = false
  num.push(n)
  if (titleText == '') titleText = String(n)
  else titleText = titleText + '  ' + String(n)
  setTitleText(titleText)
}

function onClear() {
  titleText = '输入四个数开始计算'
  num = []
  setTitleText(titleText)
  titleText = ''
  explain.style.display = "none"
  explain.innerText = ""
  expand.innerText = "展开"
}

function randomNum(minNum,maxNum){ 
  switch(arguments.length){ 
      case 1: 
          return parseInt(Math.random()*minNum+1,10); 
      break; 
      case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
      break; 
          default: 
              return 0; 
          break; 
  } 
} 

function onRandom() {
  onClear()
  num = [randomNum(1, 13), randomNum(1, 13), randomNum(1, 13), randomNum(1, 13)]
  titleText = String(num[0]) + ' ' + String(num[1]) + ' ' + String(num[2]) + ' ' + String(num[3])
  setTitleText(titleText)
}

function onCalc() {
  if (num.length != 4) return
  var result = getResult(num[0], num[1], num[2], num[3])
  num = [], calc = true
  setTitleText('无解')
  var txt = ''
  for (var i = 0; i < result.length; i++) {
    var flag = false
    for (var j = 0; j < result.length; j++) {
      if (i != j && result[i] == result[j] && i > j) flag = true
    }
    if (flag) continue
    if (i == 0) txt += result[i] + '\n'
    else txt += result[i] + '\n'
  }
  var res = result.slice(1, 4), txtExp = ''
  for (var i = 0; i < res.length; i++) {
    var flag = false
    for (var j = 0; j < res.length; j++) {
      if (i != j && result[i] == result[j] && i > j) flag = true
    }
    if (flag) continue
    txtExp += result[i] + '\n'
  }
  if (txtExp.trimStart() == '') return
  setTitleText(txtExp)
  explain.innerText = txt
  explain.style.display = "none"
}

function onExpand() {
  if (explain.style.display == 'none') {
    explain.style.display = ""
    expand.innerText = "收起"
  } else {
    explain.style.display = "none"
    expand.innerText = "展开"
  }
}

function onClose() {
  ipcRenderer.invoke('close')
}
  
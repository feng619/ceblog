const p14 = `
# #14 學習 React 前的預備知識

----------

這篇文章是寫給有意要學習 React 的人，內容會介紹重要的 ES6 語法，以及該語法實際在 React 使用的場景，建議確定文章內容的重點都能理解後再學習 React 會更好。

# 1. let & const


## ⭐️ 什麼是 let & const？

ES5 只有兩種聲明變量的方法：var 命令和 function 命令。ES6 除了添加 let 和 const 命令，還有另外兩種聲明變量的方法：import 命令和 class 命令。所以，ES6 一共有 6 種聲明變量的方法。


## ⭐️ 他們和 var 的異同？

**相同**


都支持使用逗號分隔聲明多重變量

    let a = 1, b = 2;
    const c = 3, d = 4;


都支持解構特性

    let { a, b } = { a: 1, b: 2 }
    const { a, b } = { a: 1, b: 2 }


**相異**


let ，const 與 class 聲明的全局變量不是全局對象的屬性
var 和 function 命令聲明的全局變量，依舊是全局對象的屬性

    var a = 1;
    window.a // 1
    
    
    let b = 2;
    window.b // undefined
    
    
    const C = 3;
    window.C // undefined
    
    
    function aa() { return 2 }
    window.aa() // 2



let 與 const 不允許重複聲明

    { // 報錯
      let a = 10;
      var a = 1;
    }
    { // 報錯
      let a = 10;
      let a = 1;
    }
    { // 報錯
      const A = 10;
      var A = 1;
    }


let 與 const 不允許宣告前使用（變量提升）

    console.log(a); // undefined
    var a = 1;
    
    console.log(b); // ReferenceError: b is not defined
    let b = 2;
    
    console.log(C); // ReferenceError: C is not defined
    const C = 3;



ES5 只有全局作用域和函數作用域，沒有塊級作用域
  而 let 與 const 聲明的變量擁有塊級作用域

    {
      var a = 1
      let b = 2;
      const C = 3;
    }
    a // 1
    b // ReferenceError: b is not defined
    C // ReferenceError: C is not defined

使用 let 內層代碼塊不受外層影響

    let n = 5;
    {
      let n = 10;
    }
    console.log(n); // 5

使用 var 內層代碼塊會覆蓋外層

    var n = 5;
    {
      var n = 10;
    }
    console.log(n); // 10

塊級作用域的出現，實際上使得獲得廣泛應用的立即執行函數表達式（IIFE）不再必要了

    // IIFE 寫法
    (function () {
      var tmp = ...;
      ...
    }());
    
    // 塊級作用域寫法
    {
      let tmp = ...;
      ...
    }



const 聲明一個只讀的常量。一旦聲明，常量的值就不能改變。

    const PI = 3.1415;
    PI // 3.1415
    
    PI = 3; // TypeError: Assignment to constant variable.




----------
# 2. arrow function


## ⭐️ 基本語法

ES6允許使用“箭頭”（=>）定義函數。

    var f = v => v;

上面的箭頭函數等同於：

    var f = function(v) {
      return v;
    };


    // 基本用法
    (param1, param2, …, paramN) => { statements } 
    
    // 單行且需要 return 時，可以不加大括號
    (param1, param2, …, paramN) => expression  // 等於 :  => { return expression; } 
    
    // 只有一個參數時, 括號才能不加:
    (singleParam) => { statements }
    singleParam => { statements }
    
    //若無參數, 就一定要加括號:
    () => { statements }



## ⭐️ 使用注意點


不可以當作構造函數，也就是說，不可以使用 new 命令，否則會拋出一個錯誤。
  
不可以使用 arguments 對象，該對象在函數體內不存在。如果要用，可以用 rest 參數代替。
  
    var aa = (...arg) => {
      console.log(arg)
    }
    aa(3, 4, 5)  // [3, 4, 5]
  
不可以使用 yield 命令，因此箭頭函數不能用作 Generator 函數。
  
函數體內的 this 對象，就是定義時所在的對象，而不是使用時的對象。
  
    var s2 = 0
    
    function Timer() {
      this.s1 = 0;
      this.s2 = 0;
      
      // 箭頭函數
      setInterval(() => this.s1++, 1000);
      // 普通函數
      setInterval(function () {
        this.s2++;
      }, 1000);
    }
    
    var timer = new Timer();
    
    setTimeout(() => console.log('s1: ', timer.s1), 3100);
    setTimeout(() => console.log('s2: ', timer.s2), 3100);
    
    // s1:  3
    // s2:  0
    window.s2
    // 10





----------
# 3. map


## ⭐️ 基本 map 用法
    [1, 2, 3].map( n => {
      console.log( n )
    });
    // 1
    // 2
    // 3



## ⭐️ 在 react 的應用場景
    class List extends Component {
      render() {
        return (
          <ul>
            {
              ['chien', 'dana'].map( cv => {
                return <li>{cv}</li>
              })
            }
          </ul>
        )
      }
    }

改寫：

    class List extends Component {
      renderList( cv ) {
        return <li>{cv}</li>
      }
    
      render() {
        return (
          <ul>
            {
              ['chien', 'dana'].map( this.renderList )
            }
          </ul>
        )
      }
    }





----------
# 4. module


## ⭐️ 關於模塊

模塊就是實現特定功能的一組方法。

歷史上，JavaScript 一直沒有模塊（module）體系，無法將一個大程序拆分成互相依賴的小文件，再用簡單的方法拼裝起來，這對開發大型的、覆雜的項目形成了巨大障礙。

在 ES6 之前，社區制定了一些模塊加載方案，最主要的有 CommonJS 和 AMD 兩種。前者用於服務器，後者用於瀏覽器。ES6 在語言標準的層面上，實現了模塊功能，而且實現得相當簡單，完全可以取代 CommonJS 和 AMD 規範，成為瀏覽器和服務器通用的模塊解決方案。


    // CommonJS 模塊  運行時加載
    let { stat, exists, readFile } = require('fs');


    // ES6 模塊  靜態加載
    import { stat, exists, readFile } from 'fs';




## ⭐️ 如何使用模塊？

模塊功能主要由兩個命令構成：export 和 import

- export 命令用於規定模塊的對外接口
- import 命令用於輸入其他模塊提供的功能

一個模塊就是一個獨立的文件。該文件內部的所有變量，外部無法獲取。如果你希望外部能夠讀取模塊內部的某個變量，就必須使用 export 關鍵字輸出該變量


    // aa.js
    var firstName = 'Michael';
    var lastName = 'Jackson';
    
    export {firstName, lastName};


使用 export 命令定義了模塊的對外接口以後，其他 JS 文件就可以通過 import 命令加載這個模塊

    // bb.js
    import {firstName, lastName} from './aa';
    
    export function setName() {
      return firstName + ' ' + lastName;
    }



    // cc.js
    import { setName } from './bb';
    
    console.log(setName())  //  Michael Jackson




## ⭐️ export default


- export default 命令用於指定模塊的默認輸出
- 一個模塊只能有一個默認輸出，因此 export default 命令只能使用一次
  所以，import命令後面才不用加大括號，因為只可能對應一個方法


    export default function crc32() { // 输出
      // ...
    }
    
    import crc32 from 'crc32'; // 输入
  
    export function crc32() { // 输出
      // ...
    };
    
    import {crc32} from 'crc32'; // 输入



如果想在一條 import 語句中，同時輸入默認方法和其他變量，可以寫成下面這樣。


    import React, { Component } from 'react';

對應上面代碼的 export 語句如下


    export default function () {
      // ···
    }
    
    export function Component() {
      // ···
    }




## ⭐️ 整體加載

除了指定加載某個輸出值，還可以使用整體加載，即用星號（*）指定一個對象，所有輸出值都加載在這個對象上面。


    // circle.js
    export function a() {
      // ...
    }
    
    export function b() {
      // ...
    }

現在，加載這個模塊


    // main.js
    import { a, b } from './circle';
    
    console.log( a() );
    console.log( b() );

上面寫法是逐一指定要加載的方法，整體加載的寫法如下


    import * as circle from './circle';
    
    console.log( circle.a() );
    console.log( circle.b() );





----------
# 5. class


## ⭐️ 基本語法

ES6 提供了更接近傳統語言的寫法，引入了 Class（類）這個概念，作為對象的模板。
通過 class 關鍵字，可以定義類。
基本上，ES6 的 class 可以看作只是一個語法糖，它的絕大部分功能，ES5 都可以做到，新的class寫法只是讓對象原型的寫法更加清晰、更像面向對象編程的語法而已。


    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    
      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    }




## ⭐️ constructor 與 super


    class ColorPoint extends Point {
      constructor(x, y, color) {
        super(x, y); // 調用父類的 constructor(x, y)
        this.color = color;
      }
    
      toString() {
        return this.color + ' ' + super.toString(); // 調用父類的 toString()
      }
    }




## ⭐️ React 中的使用場景


- 建立組件 繼承 React.Component
- 至少需要一個 render 函式


    import React from 'react';
    
    class Greeting extends React.Component {
      render() {
        return <div></div>;
      }
    }
    
    export default Greeting;




- 傳遞或不傳遞 props 到 super 的差異

傳遞：

    class MyComponent extends React.Component {    
        constructor(props) {
            super(props)
    
            console.log(this.props)
            // -> { icon: 'home', … }
        }
    }

不傳遞：

    class MyComponent extends React.Component {    
        constructor(props) {
            super()
    
            console.log(this.props)
            // -> undefined
    
            // Props parameter is still available
            console.log(props)
            // -> { icon: 'home', … }
        }
    
        render() {
            // No difference outside constructor
            console.log(this.props)
            // -> { icon: 'home', … }
        }
    }




## ⭐️ this.state 使用的場景


    class ColorPoint extends Point {
      constructor() {
        super();
        this.state = {
          text: 'Hello, world!'
        };
      }
    
      render() {
        return (
          <div>
            <h2>{this.state.text}</h2>
          </div>
        );
      }
    }




## ⭐️ 事件的處理


    class ColorPoint extends Point {
      constructor() {
        super();
        this.state = {
          text: 'Hello, world!'
        };
      }
    
      handleClick() {
        this.setState({ text: 'title changed!!' });
      }
    
      render() {
        return (
          <div>
            <h2>{this.state.text}</h2>
            <button onClick={this.handleClick.bind(this)}>click</button>
          </div>
        );
      }
    }





----------
# 參考文章

[ECMAScript 6 入门](http://es6.ruanyifeng.com/)
[[筆記] JavaScript ES6 中的箭頭函數（arrow function）及對 this 的影響](https://pjchender.blogspot.tw/2017/01/es6-arrow-function.html)
[What's the difference between “super()” and “super(props)” in React when using es6 classes?](https://stackoverflow.com/questions/30571875/whats-the-difference-between-super-and-superprops-in-react-when-using-e)

`;
export default p14;

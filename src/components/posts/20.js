const p20 = `
# #20 WHY React？

----------

搜尋網路上的多篇文章進行翻譯與歸納，探討 React 為何能在前端開發上佔據如此重要的地位。本文會探討 React 的重要特性，並比較 React 與其他前端框架的優劣。


# 1. Why React? 6 Reasons We Love It

[文章連結](https://blog.syncano.io/reactjs-reasons-why-part-1/)


## ☘️ 讓 js 更容易撰寫
  react 所使用的 jsx 語法，讓 HTML 可以融入 js，react 會用 JSXTransformer 再將 jsx 轉成 js 函式


## ☘️ 組件是網頁開發的未來
  react 讓你能輕易的創造組件，可以重用、組合或巢狀內嵌。


## ☘️ React 非常的高效
  react 特有的 virtual DOM 能夠存放你的組件，並且在更新 DOM 之前先計算哪些部分需要更新，並且只更新需要更新的部分，如此減少對真實 DOM 的操作，使得更新能夠非常的高效。


## ☘️ SEO 也讓人驚艷
  搜尋引擎通常不容易處理含有大量 js 的網頁應用。react 能夠在伺服器上運行，並將渲染後的網頁返回給瀏覽器，不需要借助 PhantomJS 等的幫助。


## ☘️ 還有獨門的開發者工具
  官方提供的 [React Chrome extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 能夠讓你就像查看一般 DOM 一樣地查看 virtual DOM，對除錯有極大的幫助


## ☘️ 臉書齁著這個專案
  react 是由臉書所創立，主要也由臉書維護。Instagram 與紐約時報等知名網站都是由 react 所製作。


## ☘️ 還能開發手機應用
  React Native 的寫法與結構與 React 大同小異，因此能讓 react 開發者快速建立能被 Android 與 iOS 支援的手機應用




----------
# 2. React 核心

react 的核心內容並不多，主要是下面這些：

- 虛擬dom對象(Virtual DOM)
- 虛擬dom差異化算法（diff algorithm）
- 單向數據流渲染（Data Flow）
- 組件生命周期
- 事件處理

參考連結：
[reactjs源码分析-上篇（首次渲染实现原理）](http://purplebamboo.github.io/2015/09/15/reactjs_source_analyze_part_one/)




----------
# 3. 全面理解 Virtual DOM

[文章連結](http://foio.github.io/virtual-dom/)


對 Actual DOM 操作的缺點：

- It's hard to keep track of changes
- It can be slow


Virtual DOM：
定義：用 javascript 物件表示的 DOM 結構，即為虛擬 DOM。
核心思想：對 Actual DOM 進行最小化的 DOM 操作。



## ☘️ 用 JS 表示 DOM 結構（虛擬 DOM）
  DOM 很慢，而 javascript 很快，用 javascript 對象可以很容易地表示 DOM 節點。
  DOM 節點包括標簽、屬性和子節點。
  虛擬 DOM 能夠透過調用其原型的 render 方法，產生一顆真實的 DOM 樹。

React.createElement 會創造 Virtual DOM 叫做 ReactElement 


    var root = React.createElement('div');
    ReactDOM.render(root, document.getElementById('example'));

JSX 會將 HTML 標籤轉換成 ReactElement。下面寫法和上面相等。


    var root = <div />;
    ReactDOM.render(root, document.getElementById('example'));




## ☘️ 比較兩顆虛擬 DOM 樹的差異

React 通過制定大膽的策略，將 O(n^3) 複雜度的問題轉換成 O(n) 複雜度的問題。
其中 n 是樹中節點的總數。

diff 算法的策略：


1. Web UI 中 DOM 節點跨層級的移動操作特別少，可以忽略不計。
2. 擁有相同類的兩個組件將會生成相似的樹形結構，擁有不同類的兩個組件將會生成不同的樹形結構。
3. 對於同一層級的一組子節點，它們可以通過唯一 id 進行區分。

基於以上三個前提策略，React 分別對 tree diff、component diff 以及 element diff 進行算法優化，事實也證明這三個前提策略是合理且準確的，它保證了整體界面構建的性能。




## ☘️ 對真實 DOM 進行最小化修改



參考連結：
[JSX and the Virtual DOM](https://www.fullstackreact.com/p/jsx-and-the-virtual-dom/)
[The difference between Virtual DOM and DOM](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)
[React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)




----------
# 4. 單向數據流

React 是單向數據流，從父節點傳遞到子節點（通過 props）。如果頂層的某個 props 改變了，React 會重渲染所有的子節點（未做性能優化）。嚴格意義上 React 只提供，也強烈建議使用這種數據交流方式。


參考連結：
[React 組件數據流 && 組件間溝通](https://segmentfault.com/a/1190000006831820)
[Flux - 為React打造的單向資料流架構](http://eddychang.me/blog/javascript/94-flux-concept.html)




----------
# 5. 組件生命週期

**Initialization**

![alt text](http://busypeoples.github.io/img/lifecycle_init.png)



**State Changes**

![alt text](http://busypeoples.github.io/img/lifecycle_state.png)



**Props Changes**

![alt text](http://busypeoples.github.io/img/lifecycle_props.png)



**Unmounting**

![alt text](http://busypeoples.github.io/img/lifecycle_unmount.png)



參考連結：
[Understanding the React Component Lifecycle](http://busypeoples.github.io/post/react-component-lifecycle/)




----------
# 6. 與其他框架的比較


## ☘️ React

優點：

顯著的性能提升，更快的更新。React 使用最新的數據創建新的虛擬 DOM 和修補機制，並高效地將其與以前的版本進行比較，創建一個最小的更新部分列表，使其與真正的 DOM 同步，而不是每次更改時重渲染整個網站。
特殊的 JSX 語法，一種 JavaScript 擴展語法，允許引用 HTML 並使用 HTML 標記語法來渲染子組件。
良好的代碼重用，適合 JavaScript 調試，完全基於組件的架構，容易導入組件，具有很少的依賴性。


缺點：

不是一個完整的框架，而是一個庫。
非常覆雜的視圖層。
很多人不喜歡JSX。
陡峭的學習曲線。
將 React 集成到傳統的 MVC 框架，如 Rails 中需要一些配置。




## ☘️ Angular

優點：

創建自定義的文檔對象模型（DOM）元素。
簡單的 UI 設計和更改。
在 HTML 文檔中創建輸入字段時，將為每個已渲染字段創建單獨的數據綁定。Angular 傾向於在重新渲染之前檢查頁面上的每個單個綁定字段的任何變化。
依賴註入。
簡單路由。
此框架利於 HTML 語法的擴展，並通過指令創建可重用的組件。
強大的模板構建解決方案。在 HTML 屬性中使用綁定表達式來驅動模板功能。Angular 的模板引擎對 DOM 有著深入的理解，且其結構良好的模板減少了創建結果頁面所需的代碼總量。
數據建模限於小數據模型的使用，以使代碼簡單易於測試。
在渲染靜態列表時速度快。
偉大的代碼重用（Angular 庫）。


缺點：

指令 API 的覆雜性。
對於具有許多交互元素的頁面，Angular 變得緩慢。
原始設計往往很慢。
由於許多 DOM 元素，性能方面有問題。
覆雜的第三方集成。
陡峭的學習曲線。
範圍很容易使用，但很難調試。
路由受限。




## ☘️ Vue

優點：

Vue.js 在可讀性、可維護性和趣味性之間做到了很好的平衡。Vue.js 處在 React 和 Angular 1 之間，而且如果你有仔細看 Vue 的指南，就會發現 Vue.js 從其它框架借鑒了很多設計理念。

Vue.js 從 React 那裏借鑒了組件化、prop、單向數據流、性能、虛擬渲染，並意識到狀態管理的重要性。

Vue.js 從 Angular 那裏借鑒了模板，並賦予了更好的語法，以及雙向數據綁定（在單個組件裏）。

從我們團隊使用 Vue.js 的情況來看，Vue.js 使用起來很簡單。它不強制使用某種編譯器，所以你完全可以在遺留代碼裏使用 Vue，並對之前亂糟糟的 jQuery 代碼進行改造。


缺點：


1. 最大的一個問題：模板的運行時錯誤描述不夠直觀，這個跟 Angular 1 有點類似。Vue.js 為 JS 代碼提供了很多有用的警告信息，例如當你試圖改變 prop 或不恰當地使用 data() 方法時，它會給出警告。這也是從 React 借鑒過來的比較好的方面。但對模板的運行時錯誤處理仍然是 Vue 的一個弱項，它的異常堆棧信息總是指向 Vue.js 的內部方法，不夠直觀。
2. 這個框架還很年輕，還沒有穩定的社區組件。大部分組件是為 Vue.js 1 創建的，對於新手來說有時候難以區分它們的版本。不過你可以在不使用其它第三方庫的前提下在 Vue 裏面完成很多事情，你可能需要一些 ajax 庫（如果你不關心同構應用，可以考慮 vue-resource）或者 vue-router，這在一定程度上平衡了 Vue 在組件方面存在的不足。
3. 社區軟件包裏的代碼有很多中文註釋，這一點也不奇怪，因為 Vue.js 在中國很流行（它的作者就是個中國人）。
4. Vue.js 是由一個人維護的項目，這個也算不上大問題，不過還是要考慮其它一些因素。尤雨溪是 Vue 的作者，他曾經在 Google 和 Meteor 工作，在那之後他創建了 Vue。Laravel 也曾經是一個單人項目，不過後來也很成功，但誰知道呢……


參考連結：
[我们为什么选择Vue.js而不是React - InfoQ](https://www.google.com.tw/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&uact=8&ved=0ahUKEwim_cKLkOXUAhVKoJQKHc8fCx0QFgg2MAM&url=http%3A%2F%2Fwww.infoq.com%2Fcn%2Fnews%2F2016%2F12%2Fwhy-Vue-js-no-react&usg=AFQjCNEdVFDH2p-vSUzea8ReMGdYyvPNAQ)
[JS 框架比较：AngularJS vs ReactJS vs EmberJS - WEB前端- 伯乐在线](https://www.google.com.tw/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwim_cKLkOXUAhVKoJQKHc8fCx0QFgguMAI&url=http%3A%2F%2Fweb.jobbole.com%2F89374%2F&usg=AFQjCNGIvoI-_H9MByQQYHSGRPd5fUd8NA)




----------
# 7. 排行榜


## ☘️ [State of Javascript 2016](https://medium.com/@sachagreif/the-state-of-javascript-front-end-frameworks-1a2d8a61510)

[官方連結](http://stateofjs.com/2016/frontend/)


![alt text](https://d2mxuefqeaa7sj.cloudfront.net/s_3961D04BF8C13D8EDBC81939C998251AD021805BEC0BB16B28599A45BA4F16E4_1498910767133_image.png)




## ☘️ [Trending Tech on Stack Overflow](https://insights.stackoverflow.com/survey/2016#technology-trending-tech-on-stack-overflow)


![alt text](https://d2mxuefqeaa7sj.cloudfront.net/s_3961D04BF8C13D8EDBC81939C998251AD021805BEC0BB16B28599A45BA4F16E4_1498911036590_image.png)


參考連結：
[Designers Learning JavaScript: Angular, React, or Vue? - Uxtools.co](https://www.google.com.tw/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiD8byogOjUAhXEFJQKHQRvCxMQFggkMAA&url=https%3A%2F%2Fblog.uxtools.co%2Fdesigners-learning-javascript-angular-react-or-vue-465509d848bb&usg=AFQjCNHk0QDYMVSk0-g02E5xBhfLGGGBDw)

`;
export default p20;

const p15 = `
# #15 create-react-app 開發環境建置

----------

為了方便新專案開發或是套件測試，需要一個為自己量身打造的前端專案起步包，本文章介紹我的起步包 ReactAppStarter 是如何基於 create-react-app 實作。

# 1. 使用 create-react-app 建立專案 ceblog


    create-react-app ceblog
    cd cdblog
    npm i


[create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-bootstrap)

- 必要的兩個檔案：public/index.html 與 public/index.html
- 只有 src 目錄底下的文件會被 webpack 處理，所以所有 js css 檔案都必須放置此目錄下
- 只有 public 目錄底下的文件能被 public/index.html 所使用





----------
# 2. 參考 reduxsimplestarter 的 package.json 的 dependencies / devDependencies
  安裝 redux react-router 到 ceblog

package.json

    "dependencies": {
      "react": "^15.5.4",
      "react-dom": "^15.5.4",
      "react-redux": "^5.0.5",
      "react-router": "^4.1.1",
      "redux": "^3.6.0"
    },
    "devDependencies": {
      "react-scripts": "1.0.7"
    }





----------
# 3. 安裝 [SASS](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)（依照 create-react-app 的[文件](https://github.com/facebookincubator/create-react-app)）

create-react-app 文件說，依循組件拆分的原則，其實不太需要用到 CSS preprocessors，但是如果有需要還是可以安裝


    Generally, we recommend that you don’t reuse the same CSS classes across different components. For example, instead of using a .Button CSS class in <AcceptButton> and <RejectButton> components, we recommend creating a <Button>component with its own .Button styles, that both <AcceptButton> and <RejectButton> can render (but not inherit).
    Following this rule often makes CSS preprocessors less useful, as features like mixins and nesting are replaced by component composition. You can, however, integrate a CSS preprocessor if you find it valuable. In this walkthrough, we will be using Sass, but you can also use Less, or another alternative.

❗️ create-react-app 文件沒有教如何自己設定編譯後的 CSS 要放去哪個目錄的方法

  可是可以根據以下文件，找到解法
  package.json 修改這句即可 "build-css": "node-sass-chokidar src/ -o src/style"

[sass](https://github.com/sass)/[node-sass](https://github.com/sass/node-sass) 文件說明

    Usage
    node-sass [options] <input> [output] Or: cat <input> | node-sass > output
    Example:
    node-sass src/style.scss dest/style.css
    Options:
        -w, --watch                Watch a directory or file
        -r, --recursive            Recursively watch directories or files
        -o, --output               Output directory
        -x, --omit-source-map-url  Omit source map URL comment from output
        -i, --indented-syntax      Treat data from stdin as sass code (versus scss)
        -q, --quiet                Suppress log output except on error
        -v, --version              Prints version info
        --output-style             CSS output style (nested | expanded | compact | compressed)
        --indent-type              Indent type for output CSS (space | tab)
        --indent-width             Indent width; number of spaces or tabs (maximum value: 10)
        --linefeed                 Linefeed style (cr | crlf | lf | lfcr)
        --source-comments          Include debug info in output
        --source-map               Emit source map
        --source-map-contents      Embed include contents in map
        --source-map-embed         Embed sourceMappingUrl as data URI
        --source-map-root          Base path, will be emitted in source-map as is
        --include-path             Path to look for imported files
        --follow                   Follow symlinked directories
        --precision                The amount of precision allowed in decimal numbers
        --error-bell               Output a bell character on errors
        --importer                 Path to .js file containing custom importer
        --functions                Path to .js file containing custom functions
        --help                     Print usage info


create-react-app 文件安裝

    npm install node-sass-chokidar --save-dev
    npm install --save-dev npm-run-all

並修改 package.json 即可使用 scss 檔案

    "scripts": {
      "build-css": "node-sass-chokidar src/scss -o src/style",
      "watch-css": "npm run build-css && node-sass-chokidar src/scss -o src/style --watch --recursive",
      "start-js": "react-scripts start",
      "start": "npm-run-all -p watch-css start-js",
      "build": "npm run build-css && react-scripts build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
    }

編譯後的資料夾結構如下

![alt text](https://d2mxuefqeaa7sj.cloudfront.net/s_A4DBA3AEAD7C1D6D73977C5C40F5A0E1FADD37CDEA50953D47B171EF859BFF9C_1496383384489_Screen+Shot+2017-06-02+at+2.02.45+PM.png)





----------
# 4. 安裝 [Bootstrap](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-bootstrap)（依照 create-react-app 的[文件](https://github.com/facebookincubator/create-react-app)）

照著 create-react-app 文件安裝

    npm install react-bootstrap --save
    npm install bootstrap@3 --save

在 src/index.js 引入這兩行即可

    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap/dist/css/bootstrap-theme.css';
    // Put any other imports below so that CSS from your
    // components takes precedence over default styles.

使用範例

    import React, { Component } from 'react';
    import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';
    class App extends Component {
      render() {
        return (
          <div>
            <Navbar inverse fixedTop>
              <Grid>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/">React App</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
              </Grid>
            </Navbar>
            <Jumbotron>
              <Grid>
                <h1>Welcome to React</h1>
                <p>
                  <Button
                    bsStyle="success"
                    bsSize="large"
                    href="http://react-bootstrap.github.io/components.html"
                    target="_blank">
                    View React Bootstrap Docs
                  </Button>
                </p>
              </Grid>
            </Jumbotron>
          </div>
        );
      }
    }
    export default App;





----------
# 5. 安裝 [Material-UI](http://www.material-ui.com/#/)


    npm install material-ui --save
    npm install --save react-tap-event-plugin

react-tap-event-plugin provides onTouchTap() to all React Components. It's a mobile-friendly onClick() alternative for components in Material-UI, especially useful for the buttons.


    import injectTapEventPlugin from 'react-tap-event-plugin';
    injectTapEventPlugin();

❗️ MUI 使用 Roboto 字體，需要引入該字體





----------
# 6. 安裝 [Eslint](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#displaying-lint-output-in-the-editor), Prettier, and [Flow](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-flow)

請看另外一篇文章 #16 ESLint, Prettier, and Flow





----------
# 7. 安裝 React Router

這個是 4.x 版本的 react-router-redux，只支援 react-router 2.x 和 3.x
有很詳盡的說明和範例，可惜了
[reactjs](https://github.com/reactjs)/[**react-router-redux**](https://github.com/reactjs/react-router-redux)

這個是 5.0.0 版本的 react-router-redux，支援 react-router 4.x
說明很簡陋，但是星星數量兩萬多，以下都是用這個版本實作
[ReactTraining](https://github.com/ReactTraining)/[**react-router**](https://github.com/ReactTraining/react-router)/[packages](https://github.com/ReactTraining/react-router/tree/master/packages)/[**react-router-redux**](https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux)/


查看官方[文件](https://reacttraining.com/react-router/web/guides/quick-start)，web 開發是使用  react-router-dom
[react-router](https://github.com/ReactTraining/react-router/blob/master/packages/react-router) The core of React Router
[react-router-dom](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom) DOM bindings for React Router

    In v4, react-router exports the core components and functions. react-router-dom exports DOM-aware components, like <Link> (which renders an <a>) and <BrowserRouter> (which interacts with the browser's window.history ).
    react-router-dom re-exports all of react-router's exports, so you only need to import from react-router-dom in your project.

安裝  react-router-dom

    npm install react-router-dom --save


一般情況來說 redux 和 router 可以一起運作
但是 [Redux Integration](https://reacttraining.com/react-router/web/guides/redux-integration) 章節說明以下情況會出現組件不更新的情況

1. The component is connected to redux via connect()(Comp).
2. The component is **not** a “route component”, meaning it is not rendered like so: <Route component={SomeConnectedThing}/>

為了能夠深度耦合兩個套件，需要使用 **react-router-redux**（這也是 [ReactTraining](https://github.com/ReactTraining) 他們家的）


安裝  react-router-redux / history

    npm install --save react-router-redux@next history


先照著 [**Usage**](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) ****的步驟設定好
再來測試如何使用官方說的換頁方式

    // Now you can dispatch navigation actions from anywhere!
    // store.dispatch(push('/foo'))


這篇文章要小心，建議不要參考
[How to use react-router-redux routeActions?](https://stackoverflow.com/questions/35196873/how-to-use-react-router-redux-routeactions)
因為 routeActions 已經不在新版的 react-router-redux 底下了
下行會報錯

    import { routeActions } from 'react-router-redux'

可見文章使用的是舊版的 react-router-redux 因此建議不要參考


如何在其他組件取得 store？ 使用 this.context
[Accessing the store without @connect-ing? #108](https://github.com/reactjs/react-redux/issues/108)

    class MyComponent {
      someMethod() {
        doSomethingWith(this.context.store);
      }
    }
    
    MyComponent.contextTypes = {
      store: React.PropTypes.object.isRequired
    };

測試確實可以換分頁了！

    <button onClick={() => this.context.store.dispatch(push('/port'))}> Home </button>


可是 chrome 出現警告
❗️ Warning: Accessing PropTypes via the main React package is deprecated. Use the ***prop***-***types package from npm instead***. 

安裝 [prop-types](https://www.npmjs.com/package/prop-types)

    npm install --save prop-types

修改如下，警告訊息消失！

    import PropTypes from 'prop-types';
    
    Home.contextTypes = {
      store: PropTypes.object.isRequired,
    };





----------
# 8. 其他

[feng619](https://github.com/feng619)/[react-app-starter](https://github.com/feng619/react-app-starter)

VSCode 設定檔

    {
      "editor.fontFamily": "Source Han Code JP, Menlo, Monaco, 'Courier New', monospace",
      "editor.fontSize": 15,
      "editor.tabSize": 2,
      "editor.insertSpaces": false,
      "editor.detectIndentation": false,
      "workbench.iconTheme": "material-icon-theme",
      "workbench.colorTheme": "Material Theme",
      "editor.formatOnSave": true,
      "flow.useNPMPackagedFlow": true,
      "javascript.validate.enable": false,
      "javascript.format.enable": true,
    }

`;
export default p15;

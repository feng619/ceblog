const p16 = `
# #16 **ESLint, Prettier, and Flow**

----------

這篇文章是從 #15 上一篇文章中抽離出來的一段，因為文字量大所以另成篇幅，這個主題也可以獨立閱讀，本文依照網路文章跟著實作而成。

# 安裝 vscode extensions
- [**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [**Prettier-ESLint**](https://marketplace.visualstudio.com/items?itemName=RobinMalfait.prettier-eslint-vscode)
- [**Flow Language Support**](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
- [**Babel ES6/ES7**](https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring)




----------
# 安裝 ESLint
    npm install babel-eslint --save-dev

touch .eslintrc 檔案，設定如下

![alt text](https://d2mxuefqeaa7sj.cloudfront.net/s_657061FBA8F1E699AF1C665986038FA3FE02AB1B765C5F0B4EDE775D37C8E384_1496401139566_image.png)



    {
      "parser": "babel-eslint",
      "extends": "airbnb",
      "plugins": [
        "react",
        "jsx-a11y",
        "import"
      ]
    }

因為 import 出現紅色底線的錯誤訊息 error  Parsing error: The keyword 'import' is reserved

為了解決這個問題
參照 #13 文章，安裝相關套件即可以看到 eslint 正常運作了
[eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

    ➜  cra03 npm info "eslint-config-airbnb@latest" peerDependencies
    
    { eslint: '^3.19.0',
      'eslint-plugin-jsx-a11y': '^5.0.1',
      'eslint-plugin-import': '^2.2.0',
      'eslint-plugin-react': '^7.0.1' }
    
    ➜  cra03 (
      export PKG=eslint-config-airbnb;
      npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
    )

下了上面那兩個指令之後，會自動產生適合的版本配置然後安裝，他會自動執行類似下面的指令：

    npm install --save-dev eslint-config-airbnb eslint@^#.#.# eslint-plugin-jsx-a11y@^#.#.# eslint-plugin-import@^#.#.# eslint-plugin-react@^#.#.#





----------
# 啟動 prettier

因為已經安裝了 Prettier-ESLint，因此只需要啟動他，讓他在每次存檔時都自動美化檔案格式

command + , 打開 vscode 設定檔，設定如下


    // Format a file on save. A formatter must be available, the file must not be auto-saved, and editor must not be shutting down.
    "editor.formatOnSave": true


> Disabling the default JavaScript formatter allows [**Prettier**](https://github.com/prettier/prettier) to handle our code formatting
    // Enable/disable default JavaScript formatter (For Prettier)
    "javascript.format.enable": false

可以去任何檔案測試是否存檔的時候，會重新整理美化格式




----------
# 安裝 Flow

[facebook](https://github.com/facebook)/[**flow**](https://github.com/facebook/flow)

需要全域安裝，才能在 CL 使用 flow 指令

    brew install flow

安裝

    npm install flow-bin babel-preset-flow --save-dev

touch .babelrc

    {
      "presets": [
        "react",
        "flow"
      ],
      "retainLines": true
    }

command + , 打開 vscode 設定檔，設定如下


    // Support using flow through your node_modules folder, WARNING: Checking this box is a security risk. When you open a project we will immediately run code contained within it.
    "flow.useNPMPackagedFlow": true,
    // Enable/disable JavaScript validation. (For Flow)
    "javascript.validate.enable": false


新增 package.json 的 scripts 指令

    "scripts": {
      "flow start": "flow start",
      "flow stop": "flow stop",
      "flow status": "flow status",
      "flow coverage": "flow coverage"
    }


❓ 輸入 npm run flow start 出現錯誤訊息如下，不明白為何指令無法使用

  可是過一會兒好像又生效了
    ERR! missing script: flow


❗️ 測試發現不用上面那四行也可以，直接使用官網介紹的指令：
flow / flow start / flow stop / flow status


輸入 flow start 出現正確訊息（輸入 flow stop 可以停止偵測）

    ➜  ceblog flow start
    Spawned flow server (pid=5049)
    Logs will go to /private/tmp/flow/zSUserszSwuchienzSDesktopzSMyPraczSceblog.log


表示已經開始偵錯了，在檔案第一行加上 // @flow 來標記需要偵錯的檔案

    The Flow server is running and will perform type checking on any file with a // @flow annotation at the top of the file.


測試以下程式碼，會發現 'b’ 出現紅色底線報錯，因為型別不吻合

    var add = (a: number, b) => a + b;
    add('b', 'c');

輸入 flow check 可以直接在終端機看到偵錯結果




----------
# 參考文章

[Configure ESLint, Prettier, and Flow in VS Code for React Development](https://hackernoon.com/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213)
[facebook](https://github.com/facebook)/[flow](https://github.com/facebook/flow)
[flow-bin](https://www.npmjs.com/package/flow-bin)
[flow 官網](https://flow.org/)

`;
export default p16;

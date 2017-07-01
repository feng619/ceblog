const p19 = `
# #19 webpack 入門導覽

----------

本篇文章是學習 Udemy 課程 Webpack 2: The Complete Developer's Guide 之後，將多篇筆記彙整起來的精簡的入門導覽版本。這篇文章不會詳細說明實作，將會著重於幫助讀者快速的理解重要的概念。


# 1. 為何需要使用 webpack?

過去與現今的網頁開發方式比較：

- server side template
  每次按按鈕都要重新跟伺服器拿資料，重新得到一個 HTML 再渲染頁面
- single page application
  按按鈕是用 js 控制生成新的畫面，越來越受歡迎
  server 端會傳遞送大量的 js 檔案到 client side 所以會需要 webpack

如果只有少量的 js 檔案，每個檔案的內容都高達幾千行，修改或尋找程式碼是很痛苦的
因此需要將大檔案切分成許多部件的小檔案管理（模組化）

很多小檔案的問題：

1. 檔案之間的依賴性和執行優先順序必須要處理
2. 下載許多小檔案時會影響網頁效能，尤其是手機

webpack 的核心就是要解決上述兩個問題：
將許多小檔案的 js 按照正確的執行順序組合成大的單一個檔案
webpack 編譯 ES6 和 SCSS 那些其實是附加的小功能而已




----------
# 2. 如何使用 webpack

安裝

    npm install --save-dev webpack@2.2.0-rc.0

在 package.json 檔案加上

    "scripts": {
      "build": "webpack"
    },

為何不直接在 CL 上面執行 webpack，還要這樣用 npm run build 拐彎抹角的執行 webpack 呢？
因為我們不建議將 webpack global 安裝，這樣在切換版本的時候會很痛苦，只需要將 webpack 安裝在專案裡面，用 scripts 呼叫即可




----------
# 3. webpack.config.js

webpack.config.js 是設定檔，每次執行時，webpack 會來看這個檔案，聽從設定檔的指引，設定內容會告訴 webpack 怎麼合併檔案


🌞 webpack 四個核心概念：入口(entry)、輸出(output)、loader、插件(plugins)。
webpack.config.js

    const config = {
      entry: {},
      output: {},
      module: {
        rules: []
      },
      plugins: []
    };
    module.exports = config;


至少要兩個屬性：entry 與 output
entry：進入點的檔案路徑，這個用相對路徑
output：設定輸出檔案的檔名與路徑，需用絕對路徑，可以用 nodejs 的幫助，確保可以跨作業系統保持正確

webpack.config.js

    const path = require('path');
    const config = {
      entry: "./src/index.js",
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
      }
    };
    module.exports = config;




----------
# 4. loaders

四大核心的第 3 個：loaders

## 🌞 處理 js 檔案

安裝

    npm install --save-dev babel-loader babel-core babel-preset-env

webpack.config.js 的 config

    const config = {
      entry: "./src/index.js",
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
      },
      module: {
        rules: [
          {
            use: "babel-loader",
            test: /\.js$/
          }
        ]
      }
    };

新增 .babelrc 在根目錄

    {
      "presets": "babel-preset-env"
    }




## 🌞 處理 css 檔案

安裝

    npm install --save-dev style-loader css-loader

webpack.config.js 的 config

    module: {
      rules: [
        {
          use: "babel-loader",
          test: /\.js$/
        },
        {
          use: ["style-loader", "css-loader"],
          test: /\.css$/
        }
      ]
    }

輸出結果是將 css 寫在 style 標籤內

![alt text](https://d2mxuefqeaa7sj.cloudfront.net/s_0F240E402596D7A8C0005737AA62BC5FF1F270544B2186F2E2451C5017BB08AC_1498022020307_Screen+Shot+2017-06-21+at+1.10.07+PM.png)


❓如何將 css 文字變成檔案，再用 link 標籤引入呢？

![alt text](https://d2mxuefqeaa7sj.cloudfront.net/s_0F240E402596D7A8C0005737AA62BC5FF1F270544B2186F2E2451C5017BB08AC_1498024119180_Screen+Shot+2017-06-21+at+1.48.29+PM.png)


安裝

    npm install --save-dev extract-text-webpack-plugin@2.0.0-beta.4
  

四大核心的第 4 個：plugins
webpack.config.js

    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    const config = {
      entry: "",
      output: {},
      module: {
        rules: [
          {
            use: "babel-loader",
            test: /\.js$/
          },
          {
            loader: ExtractTextPlugin.extract({
              loader: "css-loader"
            }),
            test: /\.css$/
          }
        ]
      },
      plugins: [new ExtractTextPlugin("style.css")]
    };
    module.exports = config;



## 🌞 處理 img 檔案

安裝

    npm install --save-dev image-webpack-loader url-loader

webpack.config.js 的 config

      module: {
        rules: [
          {
            use: "babel-loader",
            test: /\.js$/
          },
          {
            loader: ["style-loader", "css-loader"],
            test: /\.css$/
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: [
              {
                loader: "url-loader",
                options: { limit: 40000 }
              },
              "image-webpack-loader"
            ]
          }
        ]
      },


use 的順序一樣很重要，也是從右而左執行，第一個放物件只是因為要設定額外的選項而已

    {test: /\.css$/, loader: 'css-loader'}
    // 等同於
    {test: /\.css$/, use: 'css-loader'}
    // 等同於
    {test: /\.css$/, use: {
      loader: 'css-loader',
      options: {}
    }}


超出 limit 的檔案會被放在 build 資料夾裡面輸出
沒有超出 limit 的檔案會變成編碼 base64 文字，直接在 bundle.js 裡面被載入




----------
# 5. webpack 效能優化


## 🌞 代碼分離 code splitting

code splitting 要分成兩類的原因：
進入網頁時，檔案會被下載然後存在快取裡面，再次造訪時，只要有一樣的檔案，就不必重新下載
因為我們自己寫的程式往往會比第三方套件更新來得頻繁很多，所以分成這兩類，使用者就不必常常再次下載第三方套件的 js 檔案，從而省下頁面渲染的時間

![alt text](https://d2mxuefqeaa7sj.cloudfront.net/s_9426353E43568A3F86C8ECD19C29F7B48A2A5DAD4B440DADACC83E4FC2F1DFAD_1498205492039_Screen+Shot+2017-06-23+at+4.07.40+PM.png)



瀏覽器如何判斷快取裡的檔案和造訪網頁的檔案是否一樣？（如果一樣就不要再次下載）
靠的是檔名，也就是說，如果我們每次更新檔案，可是檔名不變，瀏覽器會認為檔案沒有更新，所以不會下載最新的檔案，為了避免這個問題，我們需要每次更新檔案時，都讓儲存的檔名稍有變動

      entry: {
        bundle: "./src/index.js",
        vendor: [ "react", "react-dom" ]
      },
      output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[chunkhash].js"
      },


這裡還需要解決一個問題，因為 bundle.js 更新的時候，vendor.js 也會被認為是更新了，為了避免這個狀況，需要產生第三份文件：manifest.js
manifest.js 會處理這個問題，讓瀏覽器更好地理解究竟 vendor.js 有沒有更新過

      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          names: ["vendor", "manifest"]
        })
      ]




----------
# 6. webpack-dev-server

[WEBPACK DEV SERVER](https://webpack.github.io/docs/webpack-dev-server.html)
使用 webpack-dev-server 套件，可以不用每次修改檔案後都要手動啟動 webpack，他會偵測我們每次更動的檔案，然後只更新我們有更動到的檔案去自動 build

安裝

    npm install --save-dev webpack-dev-server@2.2.0-rc.0

 
 webpack-dev-server 注意事項

- ctrl + c 關掉 server
- 如果更動 webpack.config.js 的話，需要手動重新啟動 webpack-dev-server
-  webpack-dev-server 只能用在開發，不能用在 production，因為 webpack-dev-server 會將檔案儲存在 memory，去 localhost:8080 時，網站資料是從 memory 取得的，而不是從 hard drive




----------
# 7. create-react-app 的 webpack.config.js

create-react-app 的 webpack 設定都在 react-scripts 套件中
[create-react-app](https://github.com/facebookincubator/create-react-app)/[packages](https://github.com/facebookincubator/create-react-app/tree/master/packages)/[react-scripts](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts)/

針對 development 和 production 有兩份不同的設定檔，以及 webpack-dev-server 的設定檔
[webpack.config.dev.js](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.dev.js)
[webpack.config.prod.js](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.prod.js)
[webpackDevServer.config.js](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpackDevServer.config.js)




----------
# 參考資料

[webpack 概念](https://doc.webpack-china.org/concepts/)
[[前端工具]Webpack2 手把手一起入門](https://dotblogs.com.tw/kinanson/2017/06/11/124206#6)

`;
export default p19;

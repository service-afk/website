# 高第理財顧問有限公司網站

專業的理財顧問諮詢平台，提供青年創業、房屋購置、就學助學等多元貸款方案資訊與規劃服務。

## 🚀 功能特色

- **貸款利息試算**：支援等額本息/等額本金兩種還款方式
- **Hero 快速試算**：首頁即可快速試算，自動連動詳細試算表
- **貸款比較表**：一覽各類貸款方案利率與額度
- **響應式設計 (RWD)**：完美支援桌面、平板、手機裝置
- **25 年+ 代書經驗**：專業信任指標

## � 安全特性

本網站已通過嚴格資安審查，達到 **100 分安全評分**：

| 安全措施              | 說明                                |
| --------------------- | ----------------------------------- |
| **CSP**               | 無 unsafe-inline，限制腳本/樣式來源 |
| **XSS 防護**          | 使用 textContent 替代 innerHTML     |
| **Clickjacking 防護** | X-Frame-Options: DENY               |
| **權限控制**          | Permissions-Policy 限制敏感 API     |
| **輸入驗證**          | 數值邊界驗證 + NaN 檢查             |
| **安全聯絡**          | .well-known/security.txt            |

## �📁 檔案結構

```text
website/
├── index.html              # 主頁面
├── styles.css              # 樣式表
├── main.js                 # JavaScript 邏輯
├── favicon.png             # 網站圖示 (透明背景)
├── robots.txt              # 搜尋引擎爬蟲設定
├── CNAME                   # GitHub Pages 自訂網域
├── .well-known/
│   └── security.txt        # 資安聯絡資訊
└── README.md               # 專案說明
```

## 🛠️ 技術棧

- **HTML5** - 語意化標籤
- **CSS3** - CSS Variables、Grid、Flexbox、動畫
- **JavaScript** - 原生 ES6+
- **字體** - Noto Sans TC (Google Fonts)

## 🖥️ 本地運行

直接用瀏覽器開啟 `index.html` 即可，或使用任意 HTTP 伺服器。

## ⚠️ 注意事項

- 網站目前設定為 **禁止搜尋引擎索引**（`robots.txt` + `<meta robots>`）
- 正式上線前請移除防爬蟲設定
- 確保部署於 HTTPS 環境

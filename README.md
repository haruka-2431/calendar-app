# カレンダー管理システム

本プロジェクトは、**ZeroPlus Webアプリケーションコース**の課題制作をベースに、実用性を高めるための**「カテゴリ別色分け機能」を独自に設計・実装**した作品です。

## 🌟 独自追加機能

スクールの基本カリキュラム（カレンダー表示・CRUD）に加え、以下の機能を自力で拡張しました。

- **カテゴリ分類機能**: 予定を「仕事」「プライベート」「その他」に分類して登録・編集可能。
- **動的バッジカラーの実装**: カテゴリに応じてカレンダー上のバッジ色を自動で切り替えるロジックを追加。DBのテーブル定義（categoryカラムの追加）から、APIの修正、フロントエンドのUI実装まで一貫して対応。

## 📸 画面イメージ

| マンスリービュー | 予定追加・編集 |
| :--- | :--- |
| ![マンスリービュー](docs/images/screenshot-calendar.png) | ![予定追加モーダル](docs/images/screenshot-modal.png) |
| 当日ハイライトとカテゴリ別の色分け表示 | daisyUIを活用した直感的な入力フォーム |

## ✨ 主な機能

- **カレンダー操作**: `date-fns` を使用。前月・翌月への切り替え、今日の日付の自動ハイライト。
- **フルセットCRUD**: Node.js(Express) + MySQL を使用した予定の作成・取得・更新・削除。
- **入力バリデーション**: タイトル未入力チェック、開始/終了時間の矛盾防止アラート。
- **非同期通信**: `Fetch API` を用いたページ遷移のないスムーズな操作感。

## 🛠️ 技術スタック

### Frontend
- **React 18** / **TypeScript**
- **TailwindCSS** / **daisyUI**
- **date-fns**
- **Vite**

### Backend
- **Node.js** / **Express**
- **MySQL** (mysql2)

## 📁 プロジェクト構成

```
.
├── backend/
│   └── app.js          # MySQL接続・CRUD処理の実装
└── frontend/
    └── src/
        ├── components/ # UIコンポーネント (Header, Body, Modal)
        ├── App.tsx     # 全体の状態管理・API通信ロジック
        └── main.tsx    # エントリーポイント
```

## 🚀 技術的な工夫と学び

### 1. 既存コードへの機能追加（DBからフロントまで）
既存のコードベースを読み解き、DBのテーブル定義（categoryカラムの追加）から、SQLクエリ、フロントエンドのUI実装までを一貫して修正しました。「既存のコードを理解し、拡張する」という実践的な開発経験を得ることができました。

### 2. TypeScriptによる堅牢な開発
`CalendarEvent` 型を厳密に定義することで、APIから取得したデータとUIコンポーネント間で発生しがちなデータの不整合を未然に防いでいます。

## セットアップ

### 事前準備
- Node.js
- MySQL 8.0

### データベース

```sql
CREATE DATABASE db_calendar_l18;
USE db_calendar_l18;

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME NOT NULL,
  category VARCHAR(50) DEFAULT 'personal'
);
```

### バックエンド起動

```bash
cd backend
npm install
node app.js
```

### フロントエンド起動

```bash
cd frontend
npm install
npm run dev
```

ブラウザで `http://localhost:8080` にアクセス

## 👤 制作

- **ZeroPlus Webアプリケーションコース** 課題制作
- **独自機能拡張**: 磯部晴香 ([@haruka-2431](https://github.com/haruka-2431))
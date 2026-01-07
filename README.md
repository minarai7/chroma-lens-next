# ChromaLens

ChromaLens は、画像をアップロードして **配色（カラーパレット）や色彩調和（カラー・ハーモニー）を分析する**  
フルスタック Web アプリケーションです。  
フロントエンドとバックエンドを分離した構成で、モダンな Web 開発の学習を目的として制作しました。

---

## 概要

- 画像をアップロードすると、色の分布やパレット、調和案を表示
- 過去にアップロードした画像を履歴として閲覧可能
- フロントエンドは Next.js、バックエンドは FastAPI を使用
- フロントエンドとバックエンドは HTTP API を介して通信

---

## ブランチ構成について

- **`main` ブランチ**
  - UI 言語：英語（EN）
  - 安定版・基本構成

- **`bilingual` ブランチ**
  - UI 言語：英語 / 日本語（簡易対応）
  - 画面左上のボタンで言語切り替え可能
  - 実験的・学習目的の実装

> ※ 多言語対応は最小限の実装であり、本格的な i18n（ルーティングベース等）は今後の改善項目です。

---

## 技術スタック

### フロントエンド
- Next.js（App Router）
- React
- CSS Modules
- fetch API

### バックエンド
- FastAPI（Python）
- ローカルファイル保存（`uploads/`）

### 開発環境
- Node.js
- Python

---

## アーキテクチャ概要

```
Browser
↓
Next.js（UI / ルーティング / 状態管理）
↓ fetch()
FastAPI（分析ロジック / API）
↓
静的ファイル配信（/uploads）
```

---

## ローカル実行方法

### フロントエンド

```bash
npm install
npm run dev
````

* 起動後： [http://localhost:3000](http://localhost:3000)

#### 環境変数（.env.local）

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

---

### バックエンド

```bash
cd backend
python -m venv .venv
pip install -r requirements.txt
fastapi dev main.py
```

* 起動後： [http://localhost:8000](http://localhost:000)

#### 環境変数（backend/.env）

```env
FRONTEND_ORIGIN=http://localhost:3000
```

---

## 主な API エンドポイント

* `POST /analyze`
  画像をアップロードし、分析結果を返却

* `GET /uploads`
  過去にアップロードされた画像の一覧を取得（新しい順）

* `GET /analysis/{file_id}`
  特定の分析結果を取得

* `/uploads/*`
  アップロードされた画像の静的配信

---

## 現在の制限事項

* 分析結果の永続化はメモリ上のみ（DB 未使用）
* 画像はローカルディスクに保存（開発用途）
* 認証・ユーザー管理機能は未実装
* 色解析ロジックはスタブ（今後実装予定）

---

## 今後の改善予定

* 色解析アルゴリズムの実装
* PostgreSQL によるデータ永続化
* 画像保存のクラウド化（S3 等）
* 本格的な多言語対応（i18n）
* 認証・ユーザー機能の追加

---

## 制作目的

本プロジェクトは、以下の学習を目的として制作しました。

* フロントエンド（Next.js）とバックエンド（FastAPI）の分離設計
* API 設計と HTTP 通信の理解
* 状態管理・非同期処理の実践
* 実務を意識したプロジェクト構成

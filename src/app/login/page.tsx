import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

// Next.jsのメタデータ機能
// これでSEO対策をする
export const metadata: Metadata = {
    title: 'ログイン | Todoアプリでやることを管理する',
    description: 'Todoアプリのログインページ。アカウントを持ってる人はログインお願いします。',
}

// ログインページのコンポーネント
// サーバーコンポーネントとして定義してるけど、クライアントコンポーネントのLoginFormも普通に使える
export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                {/* ヘッダー部分 */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">TodoApp</h1>
                    <p className="text-gray-600 mt-2">今日もタスクをやっつける</p>
                </div>

                {/* ログインフォーム */}
                <LoginForm />

                {/* フッター部分 */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>© 2025 TodoApp. 学習用アプリ</p>
                </div>
            </div>
        </main>
    )
}
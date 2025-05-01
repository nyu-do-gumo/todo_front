import { TodoList } from '@/components/todo/TodoList'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'

// ページのメタデータ設定～SEO対策もバッチリ👍
export const metadata: Metadata = {
    title: 'やることリスト | TodoApp',
    description: 'あなたのタスクを管理するTodoアプリ。やることリストでサクサク整理しよう！',
}

/**
 * Todo一覧ページ
 * ユーザーのタスク一覧と新規タスク追加ボタンを表示するよ
 */
export default function TodosPage() {
    return (
        <main className="container max-w-4xl mx-auto p-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold md:text-3xl">✅ やることリスト</h1>

                {/* 新規Todo追加ボタン */}
                <Button asChild className="gap-1">
                    <Link href="/todos/new" aria-label="新しいタスクを追加">
                        <Plus className="h-4 w-4" />
                        <span>新規タスク</span>
                    </Link>
                </Button>
            </div>

            {/* ここでTodoリスト表示するよ～ */}
            <TodoList />

            <footer className="mt-12 text-sm text-center text-gray-500">
                <p>完了したタスクはチェックボックスをクリックして管理しよう！</p>
            </footer>
            {/* トースト通知 */}
            <Toaster />
        </main>
    )
}
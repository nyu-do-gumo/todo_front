'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useTodoStore } from '@/store/todoStore'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

/**
 * Todoリストを表示するコンポーネント
 * テーブル形式でTodoアイテムを表示し、各アクションも提供する
 */
export function TodoList() {
    const [deletingId, setDeletingId] = useState<number | null>(null)

    // Zustandストアから状態とアクションを取得
    const {
        todos,
        isLoading,
        error,
        fetchTodos,
        toggleTodo,
        deleteTodo
    } = useTodoStore()

    // コンポーネントマウント時にTodo取得開始
    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    // Todoの完了状態を切り替える処理
    const handleToggle = async (id: number) => {
        try {
            await toggleTodo(id)
            toast('状態の更新の成功',{
                description: '状態を更新しました。'
            })
        } catch (err) {
            toast('状態の更新の失敗', {
                description: `更新の失敗 ${err instanceof Error ? err.message : '何かしらのエラー'}`
            })
        }
    }

    // Todo削除の処理
    const handleDelete = async (id: number) => {
        setDeletingId(id)
        try {
            await deleteTodo(id)
            toast('削除の実行',{
                description: '削除を実行しました。'
            })
        } catch (err) {
            toast('削除の失敗', {
                description: `削除の失敗 ${err instanceof Error ? err.message : '何かしらエラー'}`
            })
        } finally {
            setDeletingId(null)
        }
    }

    // ロード中の表示～⏳
    if (isLoading) {
        return (
            <div className="flex justify-center my-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    // エラー時の表示
    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-lg text-center my-4">
                <p className="text-red-500 mb-2">エラーの発生</p>
                <p className="text-sm text-red-700 mb-4">{error}</p>
                <Button
                    onClick={() => fetchTodos()}
                    variant="outline"
                    className="bg-white"
                >
                    再度実行する
                </Button>
            </div>
        )
    }

    // データない時の表示
    if (!todos || todos.length === 0) {
        return (
            <div className="text-center my-8 p-8 border border-dashed rounded-lg">
                <p className="text-gray-500">タスクがまだありません。</p>
                <p className="text-sm text-gray-400 mt-2">「タスク追加」ボタンから新しいタスクを追加して下さい</p>
            </div>
        )
    }

    return (
        <Table>
            <TableCaption>現在のタスク一覧</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">完了</TableHead>
                    <TableHead>タイトル</TableHead>
                    <TableHead className="w-[150px]">アクション</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todos.map((todo) => (
                    <TableRow key={todo.id} className={todo.completed ? 'bg-muted/30' : ''}>
                        <TableCell>
                            <Checkbox
                                checked={todo.completed}
                                onCheckedChange={() => handleToggle(todo.id)}
                                disabled={deletingId === todo.id}
                                aria-label={`${todo.title}を${todo.completed ? '未完了' : '完了'}にする`}
                            />
                        </TableCell>
                        <TableCell className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                            {todo.title}
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    asChild
                                >
                                    <Link href={`/todo/${todo.id}`} aria-label={`${todo.title}を編集する`}>
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                </Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            aria-label={`${todo.title}を削除する`}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                「{todo.title}」を削除すると元に戻せません。
                                                宜しいですか？
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>削除しない</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDelete(todo.id)}
                                                disabled={deletingId === todo.id}
                                                className="bg-red-500 hover:bg-red-700"
                                            >
                                                {deletingId === todo.id ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        削除中...
                                                    </>
                                                ) : (
                                                    '削除する'
                                                )}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
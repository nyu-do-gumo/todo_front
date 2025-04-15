'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import apiClient from '@/lib/api'
import axios from 'axios'

// バリデーションスキーマを作る
const loginSchema = z.object({
    email: z.string().email('メールアドレスの形式が違います'),
    password: z.string().min(8, 'パスワードは8文字以上が必須です')
})

// 型定義しとくと使いやすい
type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const login = useAuthStore((state) => state.login)

    // フォームの設定
    const loginForm = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    // ログイン処理の関数
    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)
        setError(null)

        try {
            // apiClientを使ってAPI叩く
            const response = await apiClient.post('/login', data)

            // axiosはレスポンスの構造が違うから注意！
            // dataプロパティに実際のレスポンスボディが入ってる
            const responseData = response.data

            // Zustandストアにユーザー情報とトークン保存
            login(responseData.user, responseData.token)

            // ログイン成功したらTodo一覧ページに飛ばすよ
            router.push('/todos')
        } catch (err) {
            // axiosのエラーハンドリングは少し違う
            if (axios.isAxiosError(err) && err.response) {
                // サーバーからのエラーレスポンスがある場合
                setError(err.response.data.message || 'ログイン失敗')
            } else {
                // ネットワークエラーなどの場合
                setError('何かしらエラーが発生')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">ログインする</CardTitle>
                <CardDescription>
                    アカウント情報を入力してください
                </CardDescription>
            </CardHeader>

            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>メールアドレス</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@email.com"
                                            type="email"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>パスワード</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="パスワードを入力"
                                            type="password"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ログイン中...
                                </>
                            ) : (
                                'ログインする'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-500">
                    アカウントが無い場合
                    <Link href="/register" className="text-blue-500 hover:underline ml-1">
                        登録からお願いします
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
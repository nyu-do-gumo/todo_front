import { create } from 'zustand';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  completed_at: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
};

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: number, title: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      // ここにAPIリクエスト実装する想定
      // const response = await fetch...

      // 仮データ
      const mockTodos: Todo[] = [
        {
          id: 1,
          title: "買い物に行く",
          completed: false,
          completed_at: null,
          user_id: 1,
          created_at: "2025-04-13T12:00:00.000000Z",
          updated_at: "2025-04-13T12:00:00.000000Z"
        },
        {
          id: 2,
          title: "掃除する",
          completed: false,
          completed_at: null,
          user_id: 1,
          created_at: "2025-04-13T12:05:00.000000Z",
          updated_at: "2025-04-13T12:05:00.000000Z"
        }
      ];

      set({ todos: mockTodos, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addTodo: async (title) => {
    // 実装は後回し
  },

  updateTodo: async (id, title) => {
    // 実装は後回し
  },

  toggleTodo: async (id) => {
    // 実装は後回し
  },

  deleteTodo: async (id) => {
    // 実装は後回し
  }
}));
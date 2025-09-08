// API service for Todo operations
const API_BASE_URL = '/api/todo';

export interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface CreateTodoRequest {
  title: string;
  isCompleted?: boolean;
}

export class TodoApiService {
  // Get all todos
  static async getTodos(): Promise<TodoItem[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }
    return response.json();
  }

  // Create a new todo
  static async createTodo(todo: CreateTodoRequest): Promise<TodoItem> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: todo.title,
        isCompleted: todo.isCompleted || false
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create todo: ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  // Toggle todo completion
  static async toggleTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle todo: ${response.statusText}`);
    }
  }

  // Delete a todo
  static async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete todo: ${response.statusText}`);
    }
  }
}

import { http, HttpResponse } from 'msw';

// Mock database that persists in memory
let mockTodos = [
  {
    id: 1,
    title: 'Mock Todo 1',
    isCompleted: false,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    title: 'Mock Todo 2',
    isCompleted: true,
    createdAt: '2024-01-02T00:00:00.000Z'
  }
];

export const handlers = [
  // GET /api/Todo - Get all todos (matching your actual API endpoint)
  http.get('https://localhost:7038/api/Todo', ({ request }) => {
    // Check for Authorization header (for JWT testing)
    const authHeader = request.headers.get('Authorization');
    if (authHeader && !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }
    return HttpResponse.json(mockTodos);
  }),

  // POST /api/Todo - Create new todo
  http.post('https://localhost:7038/api/Todo', async ({ request }) => {
    // Check for Authorization header (for JWT testing)
    const authHeader = request.headers.get('Authorization');
    if (authHeader && !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }
    
    const body = await request.json() as { title: string; isCompleted: boolean };
    
    const newTodo = {
      id: Date.now(),
      title: body.title,
      isCompleted: body.isCompleted || false,
      createdAt: new Date().toISOString()
    };
    
    mockTodos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  // PUT /api/Todo/:id - Toggle todo completion
  http.put('https://localhost:7038/api/Todo/:id', ({ request, params }) => {
    // Check for Authorization header (for JWT testing)
    const authHeader = request.headers.get('Authorization');
    if (authHeader && !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }
    
    const { id } = params;
    const todoId = Number(id);
    
    const todo = mockTodos.find(t => t.id === todoId);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
    }
    
    return HttpResponse.json(null, { status: 204 });
  }),

  // DELETE /api/Todo/:id - Delete todo
  http.delete('https://localhost:7038/api/Todo/:id', ({ request, params }) => {
    // Check for Authorization header (for JWT testing)
    const authHeader = request.headers.get('Authorization');
    if (authHeader && !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }
    
    const { id } = params;
    const todoId = Number(id);
    
    mockTodos = mockTodos.filter(t => t.id !== todoId);
    return HttpResponse.json(null, { status: 204 });
  }),
];

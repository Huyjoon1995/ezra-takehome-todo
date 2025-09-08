import { useState, useEffect, useMemo } from "react";
import { 
    Container, 
    Paper, 
    Typography, 
    Box,
    Divider
} from "@mui/material";
import type { Todo } from "./models/Todo";
import { useApiService } from "./services/apiService";
import { 
    TodoHeader, 
    TodoSearchAndFilter, 
    TodoInput, 
    TodoList 
} from "./components";

type Filter = 'all' | 'pending' | 'completed' | 'today' | 'thisWeek';

export const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [filter, setFilter] = useState<Filter>("all");
    const api = useApiService();

    // Load todos on component mount
    useEffect(() => {
        loadTodos();
    }, []);

    // Debounce Search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const loadTodos = async () => {
        try {
            const todosData = await api.get<Todo[]>('/Todo');
            setTodos(todosData);
        } catch (error) {
            setError("Failed to load todos");
            console.error("Error loading todos: ", error);
        }
    };

    const handleAddTodo = async() => {
        if (!newTodo.trim()) return;
        const tempId = Date.now();
        const todo: Todo = {
            id: tempId,
            title: newTodo.trim(),
            isCompleted: false,
            createdAt: new Date().toISOString(),
        };
        setTodos([...todos, todo]);
        setNewTodo("");
        try {
            const savedTodo = await api.post<Todo>('/Todo', {
                title: todo.title,
                isCompleted: todo.isCompleted
            });
            setTodos((prev) => prev.map((t) => (t.id === tempId ? savedTodo : t)));
        } catch (error) {
            setTodos((prev) => prev.filter((t) => t.id !== tempId));
            setError("Failed to add todo item. Please try again.");
            console.error("Error adding todo item: ", error);
        }
    }

    const handleToggleTodo = async (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ));
        try {
            await api.put(`/Todo/${id}`);
            console.log(`Successfully updated the status of the todo with id: ${id}`);
        } catch (error) {
            setError("Failed to update the status of todo item. Please try again.");
            console.error(`Error updating the status of todo item from server: ${error}`);
        }
    };

    const handleDeleteTodo = async(id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
        try {
            await api.delete(`/Todo/${id}`);
            console.log(`Successfully deleted the todo with id: ${id}`);
        } catch (error) {
            setError("Failed to delete todo item. Please try again.");
            console.error(`Error deleting todo item from server: ${error}`);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddTodo();
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const completedCount = todos.filter(todo => todo.isCompleted).length;
    const totalCount = todos.length;

    const displayedTodos = useMemo(() => {
        const today = new Date
        let filtered = todos.filter((todo) => {
            const createdDate = new Date(todo.createdAt);
            switch (filter) {
                case 'pending':
                    return !todo.isCompleted;
                case 'completed':
                    return todo.isCompleted;
                case 'today':
                    return createdDate.toDateString() === today.toDateString();
                case 'thisWeek': {
                    const startOfWeek = new Date(today);
                    startOfWeek.setDate(today.getDate() - today.getDay());
                    const endOfWeek = new Date(startOfWeek);
                    endOfWeek.setDate(startOfWeek.getDate() + 6);
                    return createdDate >= startOfWeek && createdDate <= endOfWeek;
                }

                case 'all':
                default:
                    return true;
            }
        });

        if (debouncedQuery.length > 0) {
            filtered = filtered.filter((todo) => todo.title.toLowerCase().includes(debouncedQuery.toLowerCase()));
        }

        return filtered;
    }, [todos, debouncedQuery, filter]);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper 
                data-testid="todo-app"
                elevation={8}
                sx={{ 
                    p: 4,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                <TodoHeader 
                    totalCount={totalCount}
                    completedCount={completedCount}
                />

                <TodoSearchAndFilter
                    query={query}
                    filter={filter}
                    onSearchChange={handleSearch}
                    onFilterChange={setFilter}
                />

                <TodoInput
                    newTodo={newTodo}
                    onTodoChange={setNewTodo}
                    onAddTodo={handleAddTodo}
                    onKeyPress={handleKeyPress}
                />

                <Divider sx={{ mb: 2 }} />

                {error && (
                    <Box 
                        sx={{ 
                            mb: 2, 
                            p: 2, 
                            backgroundColor: 'error.light', 
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'error.main'
                        }}
                    >
                        <Typography variant="body2" color="error.dark">
                            {error}
                        </Typography>
                    </Box>
                )}

                <TodoList
                    todos={displayedTodos}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    completedCount={completedCount}
                    totalCount={totalCount}
                />
            </Paper>
        </Container>
    );
};
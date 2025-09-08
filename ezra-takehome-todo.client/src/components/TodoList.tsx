import { List, Box, Fade } from "@mui/material";
import type { Todo } from "../models/Todo";
import { TodoItem } from "./TodoItem";
import { EmptyState } from "./EmptyState";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    completedCount: number;
    totalCount: number;
}

export const TodoList = ({ todos, onToggle, onDelete, completedCount, totalCount }: TodoListProps) => {
    if (todos.length === 0) {
        return <EmptyState />;
    }

    return (
        <>
            <List sx={{ p: 0 }}>
                {todos.map((todo, index) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        index={index}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </List>

            {/* Completion Message */}
            {completedCount === totalCount && totalCount > 0 && (
                <Fade in={true}>
                    <Box 
                        textAlign="center" 
                        mt={3}
                        p={2}
                        sx={{
                            backgroundColor: 'success.light',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'success.main',
                        }}
                    >
                        <Box sx={{ fontWeight: 600, color: 'success.dark' }}>
                            🎉 Congratulations! All tasks completed!
                        </Box>
                    </Box>
                </Fade>
            )}
        </>
    );
};



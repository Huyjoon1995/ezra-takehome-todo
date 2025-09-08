import { 
    ListItem, 
    Checkbox, 
    ListItemText, 
    Typography, 
    IconButton, 
    Tooltip,
    Slide
} from "@mui/material";
import { 
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon
} from "@mui/icons-material";
import type { Todo } from "../models/Todo";

interface TodoItemProps {
    todo: Todo;
    index: number;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TodoItem = ({ todo, index, onToggle, onDelete }: TodoItemProps) => {
    return (
        <Slide 
            direction="up" 
            in={true} 
            timeout={300 + index * 100}
        >
            <ListItem 
                sx={{
                    mb: 1,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: todo.isCompleted ? 'action.hover' : 'background.paper',
                    border: '1px solid',
                    borderColor: todo.isCompleted ? 'success.light' : 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: todo.isCompleted ? 'action.selected' : 'action.hover',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                }}
            >
                <Checkbox
                    checked={todo.isCompleted}
                    onChange={() => onToggle(todo.id)}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    sx={{
                        color: 'primary.main',
                        '&.Mui-checked': {
                            color: 'success.main',
                        },
                    }}
                />
                <ListItemText 
                    primary={
                        <Typography
                            variant="body1"
                            sx={{
                                textDecoration: todo.isCompleted ? 'line-through' : 'none',
                                color: todo.isCompleted ? 'text.secondary' : 'text.primary',
                                fontWeight: todo.isCompleted ? 400 : 500,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {todo.title}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="caption" color="text.secondary">
                            {new Date(todo.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Typography>
                    }
                />
                <Tooltip title="Delete task">
                    <IconButton
                        onClick={() => onDelete(todo.id)}
                        size="small"
                        sx={{
                            color: 'error.main',
                            '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'error.dark',
                            },
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </ListItem>
        </Slide>
    );
};



import { Box, TextField, Button, InputAdornment } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface TodoInputProps {
    newTodo: string;
    onTodoChange: (value: string) => void;
    onAddTodo: () => void;
    onKeyPress: (event: React.KeyboardEvent) => void;
}

export const TodoInput = ({ 
    newTodo, 
    onTodoChange, 
    onAddTodo, 
    onKeyPress 
}: TodoInputProps) => {
    return (
        <Box 
            display="flex" 
            gap={2} 
            mb={3}
            sx={{
                '& .MuiTextField-root': {
                    flex: 1,
                }
            }}
        >
            <TextField
                fullWidth
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => onTodoChange(e.target.value)}
                onKeyPress={onKeyPress}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AddIcon color="action" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper',
                        '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                            },
                        },
                    },
                }}
            />
            <Button 
                variant="contained" 
                onClick={onAddTodo}
                disabled={!newTodo.trim()}
                startIcon={<AddIcon />}
                sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
                    '&:hover': {
                        boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.5)',
                    },
                }}
            >
                Add Task
            </Button>
        </Box>
    );
};



import { Box, Typography } from "@mui/material";
import { Task as TaskIcon } from "@mui/icons-material";

export const EmptyState = () => {
    return (
        <Box 
            textAlign="center" 
            py={6}
            sx={{
                opacity: 0.6,
            }}
        >
            <TaskIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
                No tasks yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Add your first task above to get started!
            </Typography>
        </Box>
    );
};



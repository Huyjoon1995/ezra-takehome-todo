import { Box, Typography, Chip, Fade } from "@mui/material";
import { 
    Task as TaskIcon,
    Assignment as AssignmentIcon,
    CheckCircle as CheckCircleIcon
} from "@mui/icons-material";

interface TodoHeaderProps {
    totalCount: number;
    completedCount: number;
}

export const TodoHeader = ({ totalCount, completedCount }: TodoHeaderProps) => {
    return (
        <>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={3}>
                <TaskIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    My Todo List
                </Typography>
            </Box>

            {/* Stats */}
            {totalCount > 0 && (
                <Fade in={true}>
                    <Box 
                        display="flex" 
                        flexWrap="wrap"
                        gap={1.5} 
                        mb={3}
                        sx={{
                            '& .MuiChip-root': {
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                height: { xs: 28, sm: 32 },
                                '& .MuiChip-label': {
                                    px: { xs: 1, sm: 1.5 }
                                }
                            }
                        }}
                    >
                        <Chip 
                            icon={<AssignmentIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
                            label={`${totalCount} Total`}
                            color="primary"
                            variant="outlined"
                        />
                        <Chip 
                            icon={<CheckCircleIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
                            label={`${completedCount} Completed`}
                            color="success"
                            variant="outlined"
                        />
                        <Chip 
                            label={`${Math.round((completedCount / totalCount) * 100)}% Done`}
                            color={completedCount === totalCount ? "success" : "default"}
                            variant="filled"
                            sx={{
                                fontWeight: 600,
                                minWidth: { xs: 'auto', sm: '80px' }
                            }}
                        />
                    </Box>
                </Fade>
            )}
        </>
    );
};



import { Box, TextField, Chip, InputAdornment } from "@mui/material";
import { 
    Search as SearchIcon,
    FilterList as FilterListIcon
} from "@mui/icons-material";

type Filter = 'all' | 'pending' | 'completed' | 'today' | 'thisWeek';

interface TodoSearchAndFilterProps {
    query: string;
    filter: Filter;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFilterChange: (filter: Filter) => void;
}

export const TodoSearchAndFilter = ({ 
    query, 
    filter, 
    onSearchChange, 
    onFilterChange 
}: TodoSearchAndFilterProps) => {
    return (
        <Box mb={3}>
            {/* Search Bar */}
            <TextField
                fullWidth
                value={query}
                placeholder="Search todos..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper',
                        '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                            },
                        },
                    },
                }}
                onChange={onSearchChange}
            />

            {/* Filter Buttons */}
            <Box display="flex" gap={1} flexWrap="wrap">
                <Chip
                    icon={<FilterListIcon />}
                    label="All"
                    variant={filter === 'all' ? "filled" : "outlined"}
                    color={filter === 'all' ? "primary" : "default"}
                    clickable
                    sx={{
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: filter === 'all' ? 'primary.dark' : 'action.hover',
                        }
                    }}
                    onClick={() => onFilterChange('all')}
                />
                <Chip
                    label="Today"
                    variant={filter === 'today' ? "filled" : "outlined"}
                    color={filter === 'today' ? "primary" : "default"}
                    clickable
                    sx={{
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: filter === 'today' ? 'primary.dark' : 'action.hover',
                        }
                    }}
                    onClick={() => onFilterChange('today')}
                />
                <Chip
                    label="This Week"
                    variant={filter === 'thisWeek' ? "filled" : "outlined"}
                    color={filter === 'thisWeek' ? "primary" : "default"}
                    clickable
                    sx={{
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: filter === 'thisWeek' ? 'primary.dark' : 'action.hover',
                        }
                    }}
                    onClick={() => onFilterChange('thisWeek')}
                />
                <Chip
                    label="Completed"
                    variant={filter === 'completed' ? "filled" : "outlined"}
                    color={filter === 'completed' ? "primary" : "default"}
                    clickable
                    sx={{
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: filter === 'completed' ? 'primary.dark' : 'action.hover',
                        }
                    }}
                    onClick={() => onFilterChange('completed')}
                />
                <Chip
                    label="Pending"
                    variant={filter === 'pending' ? "filled" : "outlined"}
                    color={filter === 'pending' ? "primary" : "default"}
                    clickable
                    sx={{
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: filter === 'pending' ? 'primary.dark' : 'action.hover',
                        }
                    }}
                    onClick={() => onFilterChange('pending')}
                />
            </Box>
        </Box>
    );
};



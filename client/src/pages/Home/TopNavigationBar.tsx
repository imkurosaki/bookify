import { Box, Button, styled, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

const TopBar = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  borderRadius: 30,
  '& .MuiToggleButtonGroup-grouped': {
    border: 'none',
    '&:not(:first-of-type)': {
      borderRadius: 30,
    },
    '&:first-of-type': {
      borderRadius: 30,
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: 30,
  border: 'none',
  textTransform: 'none',
  padding: '15px',
  fontWeight: 600,
  color: theme.palette.text.disabled,
  '&:hover': {
    backgroundColor: 'inherit',
  },
  '&.Mui-selected': {
    border: 'none',
    boxShadow: 'inset 0px 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F2F2F2',
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

interface TopNavigationBarProps {
  handleTabChange: (tabIndex: number) => void;
  tabIndex: number;
}

const TopNavigationBar = ({ tabIndex, handleTabChange }: TopNavigationBarProps) => {
  const handleChange = (event: React.SyntheticEvent | null, newValue: number) => {
    if (newValue !== null) {
      handleTabChange(newValue);
    }
  };

  return (
    <TopBar>
      <StyledToggleButtonGroup value={tabIndex} exclusive onChange={handleChange} aria-label="event tabs" fullWidth={true}>
        <StyledToggleButton value={0} aria-label="new event" fullWidth={true}>
          New Event
        </StyledToggleButton>
        <StyledToggleButton value={1} aria-label="my events" fullWidth={true}>
          My Events
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </TopBar>
  );
};
export default TopNavigationBar;

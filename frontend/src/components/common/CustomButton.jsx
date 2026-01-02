import { Button, CircularProgress } from '@mui/material';

const CustomButton = ({ children, loading, ...props }) => (
  <Button {...props} disabled={loading || props.disabled}>
    {loading ? <CircularProgress size={24} color="inherit" /> : children}
  </Button>
);

export default CustomButton;
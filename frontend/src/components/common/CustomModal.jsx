import { Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
};

const CustomModal = ({ open, handleClose, title, children }) => (
  <Modal open={open} onClose={handleClose}>
    <Box sx={style}>
      <Typography variant="h6" className="mb-4 font-bold">{title}</Typography>
      {children}
    </Box>
  </Modal>
);

export default CustomModal;
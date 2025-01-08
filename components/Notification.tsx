import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  autoHideDuration?: number;
}

const Notification: React.FC<NotificationProps> = ({ 
  open, 
  onClose, 
  message, 
  severity = 'info', 
  autoHideDuration = 2000
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;


import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function AlertStack({ alerts }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {alerts.map((alert, index) => (
        <Alert key={index} severity={alert.severity}>
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      ))}
    </Stack>
  );
}

function AlertProvider() {
  const [alertStack, setAlertStack] = React.useState([]);

  const addAlert = (severity, title, message) => {
    const newAlert = {
      severity,
      title,
      message,
    };
    setAlertStack(prevStack => [...prevStack, newAlert]);
  };

  const removeAlert = (index) => {
    setAlertStack(prevStack => prevStack.filter((_, i) => i !== index));
  };

  return (
    <AlertStack alerts={alertStack} />
  );
}

export default AlertProvider;

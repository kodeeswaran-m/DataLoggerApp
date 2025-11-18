import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDialog = ({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          paddingTop: 1,
          paddingBottom: 1,
          boxShadow: "0px 8px 28px rgba(0,0,0,0.15)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontSize: "1.2rem",
          paddingBottom: 1,
        }}
      >
        <WarningAmberRoundedIcon
          sx={{ color: theme.palette.warning.main, fontSize: 28,  }}
        />
        {title}
      </DialogTitle>

      <DialogContent sx={{ paddingTop: 0 }}>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
            fontSize: "0.95rem",
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px",
          paddingTop: 0,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderColor:"black",
            color:"black",
            borderRadius: "8px",
            textTransform: "none",
            paddingX: 2.5,
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            paddingX: 3,
            fontWeight: 600,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

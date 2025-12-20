"use client";

import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { GameStatus } from "@/types/games";

type Props = {
  open: boolean;
  status: GameStatus | null;
  hintText?: string;
  onClose: () => void;
};

export default function ResultSnackbar({
  open,
  status,
  hintText,
  onClose,
}: Props) {
  if (!status) return null;

  const isWin = status === "win";

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        icon={false}
        sx={{
          width: { xs: 320, sm: 560 },
          borderRadius: 1,
          color: "#fff",
          backgroundColor: isWin ? "#2e7d32" : "#d32f2f",
          py: 1.25,
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="flex-start">
          {isWin ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />}

          <Stack spacing={0.25}>
            <Typography sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {isWin ? "You won" : "You lost"}
            </Typography>

            {!isWin && hintText ? (
              <Typography variant="body2" sx={{ opacity: 0.95 }}>
                {hintText}
              </Typography>
            ) : null}
          </Stack>
        </Stack>
      </Alert>
    </Snackbar>
  );
}

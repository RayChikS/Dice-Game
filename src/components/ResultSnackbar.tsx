"use client";

import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { GameStatus } from "@/types/games";

/**
 * Властивості, що передаються у ResultSnackbar.
 * - open: чи відкрите сповіщення;
 * - status: поточний статус гри або null, якщо ще не грали;
 * - hintText: опційний текст підказки у разі програшу;
 * - onClose: обробник закриття сповіщення.
 */

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
  // якщо статус не визначений, не показувати снікбар
  if (!status) return null;

  // визначаємо, чи був виграш, щоб обрати колір та іконку
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
          // зелене для перемоги, червоне для поразки
          backgroundColor: isWin ? "#2e7d32" : "#d32f2f",
          py: 1.25,
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="flex-start">
            {/* Відображаємо відповідну іконку для виграшу/програшу */}
          {isWin ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />}

          <Stack spacing={0.25}>
            {/* Відображаємо відповідний текст для виграшу/програшу */}
            <Typography sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {isWin ? "You won" : "You lost"}
            </Typography>

            {/* Якщо гравець програв, відображаємо підказку */}
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

"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";

// Компонент керування грою (повзунок та вибір умови).
import GameControls from "@/components/GameControls";

// Компонент відображення результату гри (снекбар).
import ResultSnackbar from "@/components/ResultSnackbar";

// Компонент відображення історії гри (таблиця).
import HistoryTable from "@/components/HistoryTable";

// Типи, що описують умову гри, елемент історії та статус (перемога/поразка).
import { Condition, GameHistoryItem, GameStatus } from "@/types/games";

/**
 * Допоміжна функція для генерації числа від 1 до 100.
 * Умовно "кидає кубик": повертає випадкове ціле число.
 */

const rollDice100 = () => Math.floor(Math.random() * 100) + 1;

export default function HomePage() {
  // поріг, який обирає користувач (значення від 0 до 100)
  const [threshold, setThreshold] = useState<number>(20);

  // умова порівняння: "under" — загадане число має бути менше порогу,
  // "over" — більше. За замовчуванням стартуємо з "under".
  const [condition, setCondition] = useState<Condition>("under");

  // результат кидання кубика (число від 1 до 100)
  const [result, setResult] = useState<number | null>(100);

  // статус гри: "win" — перемога, "lose" — поразка.
  // null означає, що ще не було кидання.
  const [status, setStatus] = useState<GameStatus | null>(null);

  // відображення снікбара з результатом
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // історія гри: масив елементів, кожен з яких містить час, умову, порог, результат та статус.
  const [history, setHistory] = useState<GameHistoryItem[]>([]);

  // підказка для снікбара, яка показується, якщо гравець програв.
  // Якщо гравець ще не програв або результат не визначений, показувати нічого.
  const loseHint = useMemo(() => {
    if (!status || status !== "lose" || result == null) return undefined;

    if (condition === "under") {
      return "Number was higher";
    }
    return "Number was lower";
  }, [status, result, condition]);

  /**
   * Функція для запуску нової гри.
   * Викликається, коли користувач натискає кнопку "PLAY".
   * Генерує випадкове число, визначає статус гри (перемога/поразка) та оновлює стан.
   * Також додає нову запис до історії гри.
   */
  const handlePlay = () => {
    const dice = rollDice100();

    // визначаємо, чи гравець виграв чи програв
    const isWin = condition === "over" ? dice > threshold : dice < threshold;

    const nextStatus: GameStatus = isWin ? "win" : "lose";

    setResult(dice);
    setStatus(nextStatus);
    setSnackbarOpen(true);

    const item: GameHistoryItem = {
      time: new Date().toLocaleTimeString(),
      condition,
      threshold,
      result: dice,
      status: nextStatus,
    };

    setHistory((prev) => [item, ...prev].slice(0, 10));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        pt: 6,
        pb: 8,
      }}
    >
      <Container maxWidth="md">
        <ResultSnackbar
          open={snackbarOpen}
          status={status}
          hintText={loseHint}
          onClose={() => setSnackbarOpen(false)}
        />

        <Stack spacing={4} alignItems="center">
          <Box
            sx={{
              width: 220,
              height: 140,
              backgroundColor: "#f2f2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
            }}
          >
            <Typography
              sx={{ fontSize: 64, fontWeight: 500, color: "#212121" }}
            >
              {result ?? ""}
            </Typography>
          </Box>

          <GameControls
            threshold={threshold}
            condition={condition}
            onThresholdChange={setThreshold}
            onConditionChange={setCondition}
            onPlay={handlePlay}
          />
        </Stack>

        <HistoryTable history={history} />
      </Container>
    </Box>
  );
}

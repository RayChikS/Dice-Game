"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import GameControls from "@/components/GameControls";
import ResultSnackbar from "@/components/ResultSnackbar";
import HistoryTable from "@/components/HistoryTable";
import { Condition, GameHistoryItem, GameStatus } from "@/types/games";

const rollDice100 = () => Math.floor(Math.random() * 100) + 1;

export default function HomePage() {
  const [threshold, setThreshold] = useState<number>(20);
  const [condition, setCondition] = useState<Condition>("under");

  const [result, setResult] = useState<number | null>(100);
  const [status, setStatus] = useState<GameStatus | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [history, setHistory] = useState<GameHistoryItem[]>([]);

  const loseHint = useMemo(() => {
    if (!status || status !== "lose" || result == null) return undefined;

    if (condition === "under") {
      return "Number was higher";
    }
    return "Number was lower";
  }, [status, result, condition]);

  const handlePlay = () => {
    const dice = rollDice100();

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

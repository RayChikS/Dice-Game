export default function Home() {
"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import GameControls from "@/components/GameControls";
export default function HomePage() {
  const [history, setHistory] = useState<GameHistoryItem[]>([]);
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
          <GameControls
          />
        <HistoryTable history={history} />
      </Container>
    </Box>
  );
}

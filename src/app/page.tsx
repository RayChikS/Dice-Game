export default function Home() {
"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import GameControls from "@/components/GameControls";
export default function HomePage() {
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
      </Container>
    </Box>
  );
}

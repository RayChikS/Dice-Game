"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { GameHistoryItem } from "@/types/games";

type Props = {
  history: GameHistoryItem[];
};

export default function HistoryTable({ history }: Props) {
  if (!history.length) return null;

  return (
    <Box sx={{ mt: 5 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
            <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
              Condition
            </TableCell>
            <TableCell sx={{ fontWeight: 700, textAlign: "right" }}>
              Result
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {history.map((item, idx) => {
            const guessLabel = `${
              item.condition === "under" ? "Under" : "Over"
            } ${item.threshold}`;

            return (
              <TableRow key={`${item.time}-${idx}`}>
                <TableCell sx={{ color: "text.secondary" }}>
                  {item.time}
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>{guessLabel}</TableCell>

                <TableCell
                  sx={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: item.status === "win" ? "#2e7d32" : "#d32f2f",
                  }}
                >
                  {item.result}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}

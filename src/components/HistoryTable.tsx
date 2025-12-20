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

/**
 * Тип пропсів для таблиці: масив елементів історії.
 */
type Props = {
  history: GameHistoryItem[];
};

export default function HistoryTable({ history }: Props) {
  // якщо немає жодних записів, таблиця не потрібна
  if (!history.length) return null;

  return (
    <Box sx={{ mt: 5 }}>
      {/* Таблиця для відображення історії гри */}
      <Table size="small">
        {/* Заголовки таблиці */}
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

        {/* Тіло таблиці: рядок для кожного запису історії */}
        <TableBody>
          {history.map((item, idx) => {
            const guessLabel = `${
              item.condition === "under" ? "Under" : "Over"
            } ${item.threshold}`;

            return (
              // Ключ для React, щоб React міг визначити, який рядок змінився, а який ні.
              <TableRow key={`${item.time}-${idx}`}>
                {/* Клітинка для часу */}
                <TableCell sx={{ color: "text.secondary" }}>
                  {item.time}
                </TableCell>

                {/* Клітинка для умови та порогу */}
                <TableCell sx={{ textAlign: "center" }}>{guessLabel}</TableCell>

                {/* Клітинка для результату */}
                <TableCell
                  sx={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: item.status === "win" ? "#2e7d32" : "#d32f2f",
                  }}
                >
                  {/* Відображаємо результат */}
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

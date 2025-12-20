"use client";

import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import { Condition } from "@/types/games";

/**
 * Параметри, які передаються у GameControls.
 * - threshold: поточний поріг для порівняння;
 * - condition: умова ("under" чи "over");
 * - onThresholdChange: зворотній виклик для зміни порогу;
 * - onConditionChange: зворотній виклик для зміни умови;
 * - onPlay: функція, що викликається при натисканні на кнопку гри.
 */
type Props = {
  threshold: number;
  condition: Condition;
  onThresholdChange: (value: number) => void;
  onConditionChange: (value: Condition) => void;
  onPlay: () => void;
};

export default function GameControls({
  threshold,
  condition,
  onThresholdChange,
  onConditionChange,
  onPlay,
}: Props) {
  return (
    <Box sx={{ width: 360, maxWidth: "100%", textAlign: "center" }}>
      {/* Радіогрупа для вибору умови: менше чи більше порогу */}
      <RadioGroup
        row
        value={condition}
        onChange={(e) => onConditionChange(e.target.value as Condition)}
        sx={{
          justifyContent: "center",
          mb: 2,
          "& .MuiFormControlLabel-label": { fontSize: 13 },
        }}
      >
        <FormControlLabel
          value="under"
          control={<Radio size="small" />}
          label="Under"
        />
        <FormControlLabel
          value="over"
          control={<Radio size="small" />}
          label="Over"
        />
      </RadioGroup>

      {/* Блок з повзунком вибору порогу */}
      <Box sx={{ px: 2 }}>
        <Slider
          value={threshold}
          min={0}
          max={100}
          // Передаємо нове значення порогу вгору
          onChange={(_, v) => onThresholdChange(v as number)}
          valueLabelDisplay="on"
          sx={{
            color: "#8e24aa",
            "& .MuiSlider-valueLabel": {
              backgroundColor: "#616161",
              borderRadius: 1,
            },
          }}
        />

        {/* Підписи до мінімального та максимального значень повзунка */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            0
          </Typography>
          <Typography variant="caption" color="text.secondary">
            100
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={onPlay}
        sx={{
          mt: 3,
          backgroundColor: "#8e24aa",
          borderRadius: 1,
          py: 1.2,
          fontWeight: 700,
          "&:hover": { backgroundColor: "#7b1fa2" },
        }}
      >
        PLAY
      </Button>
    </Box>
  );
}

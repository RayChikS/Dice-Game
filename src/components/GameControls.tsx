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
export default function GameControls({
  condition,
  return (
    <Box sx={{ width: 360, maxWidth: "100%", textAlign: "center" }}>
      <RadioGroup
        row
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

      <Box sx={{ px: 2 }}>
        <Slider
          min={0}
          max={100}
          valueLabelDisplay="on"
          sx={{
            color: "#8e24aa",
            "& .MuiSlider-valueLabel": {
              backgroundColor: "#616161",
              borderRadius: 1,
            },
          }}
        />

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

import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { PhotoCamera, Videocam, Delete } from "@mui/icons-material";

export default function CaptureUpload() {
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleCapture = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleUpload = () => {
    console.log("Uploading files:", files);
    // Replace with your actual upload logic
  };

  return (
    <Box p={2}>

      {/* Hidden inputs for photo and video */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={photoInputRef}
        onChange={handleCapture}
        style={{ display: "none" }}
      />

      <input
        type="file"
        accept="video/*"
        capture="environment"
        ref={videoInputRef}
        onChange={handleCapture}
        style={{ display: "none" }}
      />

      {/* Buttons to trigger camera or video recorder */}
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant="contained"
          startIcon={<PhotoCamera />}
          onClick={() => photoInputRef.current.click()}
        >
          Capture Photo
        </Button>

        <Button
          variant="outlined"
          startIcon={<Videocam />}
          onClick={() => videoInputRef.current.click()}
        >
          Record Video
        </Button>
      </Stack>

      {/* File name list with delete */}
      <Stack spacing={1}>
        {files.map((file, idx) => (
          <Paper
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
              pl: 2,
            }}
          >
            <Typography variant="body2" noWrap maxWidth="80%">
              {file.name}
            </Typography>
            <IconButton onClick={() => removeFile(idx)} color="error">
              <Delete />
            </IconButton>
          </Paper>
        ))}
      </Stack>

      {files.length > 0 && (
        <Button
          variant="outlined"
          color="success"
          onClick={handleUpload}
          sx={{ mt: 3 }}
        >
          Upload ({files.length}) Files
        </Button>
      )}
    </Box>
  );
}

import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";

export default function CaptureUpload() {
  const fileInputRef = useRef(null);
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
    // Upload logic goes here, like:
    // files.forEach(file => uploadToServer(file));
  };

  return (
    <Box p={2}>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleCapture}
        style={{ display: "none" }}
        multiple
      />

      <Button
        variant="contained"
        startIcon={<PhotoCamera />}
        onClick={() => fileInputRef.current.click()}
        sx={{ mb: 2 }}
      >
        Capture Picture
      </Button>

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

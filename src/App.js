import React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import ImportModal from "./components/ImportModal";
import CompareArrowsOutlinedIcon from "@material-ui/icons/CompareArrowsOutlined";
import ImportExportOutlinedIcon from "@material-ui/icons/ImportExportOutlined";
import AutorenewOutlinedIcon from "@material-ui/icons/AutorenewOutlined";
import "./App.css";

const getResult = (input, mapObject) => {
  const inputs = input.split("");
  const result = [];
  inputs.forEach((input) => {
    result.push(mapObject[input] || input);
  });
  return result.join("");
};

const getMapObject = (partern) => {
  const parterns = partern.split(",");
  const result = {};
  parterns.forEach((item) => {
    const temp = item.split("=");
    result[temp[0].trim()] = temp[1].trim();
  });
  return result;
};

export const getDataLocal = () => {
  return JSON.parse(localStorage.getItem("DATA") || "[]");
};

function App() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState("");
  const [type, setType] = React.useState("IMPORT");

  const [choices, setChoices] = React.useState(getDataLocal());
  const [option, setOption] = React.useState(0);

  const handleConvert = () => {
    const data = getResult(input, getMapObject(choices[option].content));
    setResult(data);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    setOption(0);
    setChoices(getDataLocal());
  };

  const handleSubmit = () => {
    setOption(0);
    setChoices(getDataLocal());
  };

  const handleImport = () => {
    setType("IMPORT");
    handleOpenModal();
  };

  const handleClone = () => {
    setType("CLONE");
    handleOpenModal();
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            minRows={10}
            multiline
            variant="outlined"
            fullWidth
            label="Input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            minRows={10}
            multiline
            variant="outlined"
            fullWidth
            label="Result"
            value={result}
          />
        </Grid>
      </Grid>
      <Box mt={2} display="flex">
        <Box mr={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConvert}
            startIcon={<CompareArrowsOutlinedIcon />}
          >
            Convert
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleImport}
            startIcon={<ImportExportOutlinedIcon />}
          >
            Import
          </Button>
        </Box>
      </Box>
      <Box minWidth={200} display="flex" mt={2}>
        <Select
          variant="outlined"
          margin="dense"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          style={{ minWidth: 100 }}
        >
          {choices.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {choices.length ? (
          <Button
            onClick={handleClone}
            variant="contained"
            color="primary"
            style={{ marginLeft: 10 }}
            startIcon={<AutorenewOutlinedIcon />}
          >
            Clone
          </Button>
        ) : null}
      </Box>
      <ImportModal
        open={open}
        onClose={() => setOpen(false)}
        id={option}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
        type={type}
      />
    </Box>
  );
}

export default App;

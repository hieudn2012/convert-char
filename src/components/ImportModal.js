import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { getDataLocal } from "../App";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import SaveAltOutlinedIcon from "@material-ui/icons/SaveAltOutlined";
import HelpOutline from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 600,
  },
}));

export default function ImportModal({
  open,
  onClose,
  id,
  onDelete,
  onSubmit,
  type,
}) {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [state, setState] = React.useState("");

  const handleSubmit = () => {
    const localData = JSON.parse(localStorage.getItem("DATA") || "[]");
    const data = {
      id: localData.length,
      name,
      content: state,
    };
    localData.push(data);
    localStorage.setItem("DATA", JSON.stringify(localData));
    onClose();
    onSubmit();
    setName("");
    setState("");
  };

  const handleDelete = () => {
    const localData = getDataLocal();
    localData.splice(id, 1);
    localStorage.setItem("DATA", JSON.stringify(localData));
    onClose();
    onDelete();
    setName("");
    setState("");
  };

  React.useEffect(() => {
    const localData = getDataLocal();
    if (localData.length && type === "CLONE") {
      setName(localData[id].name);
      setState(localData[id].content);
    }

    if (type === "IMPORT") {
      setName("");
      setState("");
    }
  }, [id, open, type]);

  return (
    <Dialog open={open} onClose={onClose} className={classes.root}>
      <DialogTitle>Import Bộ Quy Tắc</DialogTitle>
      <DialogContent className={classes.root}>
        <TextField
          label="Tên quy tắc"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="dense"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Nội dung"
          fullWidth
          multiline
          minRows={10}
          variant="outlined"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Example: H=K, U=I, D=M"
        />
        <Tooltip title="Cách nhau dấu phẩy, vui lòng nhập đúng format">
          <HelpOutline />
        </Tooltip>
      </DialogContent>
      <DialogActions>
        <Box p={2} display="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<SaveAltOutlinedIcon />}
          >
            Submit
          </Button>
          {type === "CLONE" ? (
            <Box ml={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                startIcon={<HighlightOffOutlinedIcon />}
              >
                Delete
              </Button>
            </Box>
          ) : null}
        </Box>
      </DialogActions>
    </Dialog>
  );
}

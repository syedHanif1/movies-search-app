import React, { ReactNode } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "./IconButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 650,
  backgroundColor: "rgb(55 53 53)",
  borderRadius: 2,
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ open, children, onClose }: ModalProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <IconButton onClick={onClose} IconComponent={CloseIcon} sx={{ position: "absolute", right: 20, top: 10 }} iconStyle={{ fontSize: 30 }} />
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;

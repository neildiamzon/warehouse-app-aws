import React, { useState } from "react";
import Link from '@mui/material/Link';
import { Popover, Typography } from "@mui/material";

export default function AboutDeveloper() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.preventDefault(); // Prevent default link navigation
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "link-popover" : undefined;

  return (
    <div>
      <Link href="#" passHref>
        <a onMouseEnter={handleClick} style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}>
          Open Popover
        </a>
      </Link>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>This is a popover! 🎉</Typography>
      </Popover>
    </div>
  );
}

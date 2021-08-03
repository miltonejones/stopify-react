import React, { useCallback, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { PlayerAction } from "../../Audio/Player/Player";
import { playerQueueInsert } from "../../Audio/ResponsivePlayerDrawer/ResponsivePlayerDrawer";

export default function EventSnackBar() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const show = useCallback((s) => {
    setOpen(true);
    setMessage(s);
  }, []);

  useEffect(() => {
    const sub = [
      PlayerAction.subscribe((s) => {
        if (!s) return;
        !!s.Title && show(`Playing: "${s.Title}"`);
      }),

      playerQueueInsert.subscribe((s) => {
        if (!s) return;
        !!s.Title && show(`"${s.Title}" added to Queue`);
      }),
    ];

    return () => sub.map((s) => s.unsubscribe());
  }, [show]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        s
      />
    </div>
  );
}

import { Button, Drawer, TextField } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Observer from "../../../../services/Observables";
import {
  connect,
  download,
  socketResponse,
  status,
} from "../../../../services/Socket";
import Underline from "../../Underline/Underline";
import "./Importer.css";

const Importer = ({ complete }) => {
  const [keys, setKeys] = useState([]);
  const [message, setMessage] = useState("waiting");
  useEffect(() => {
    // console.log({ status });
    !status && connect();
    const sub = socketResponse.subscribe((msg) => {
      // console.log({ msg });
      !!msg &&
        (function () {
          const { state, response } = msg;
          state === "PROGRESS-DATA" && setMessage(response);
          state === "COMPLETE" && complete && complete();
        })();
    });
    return () => sub.unsubscribe();
  });

  const go = () => {
    const id = keys.pop();
    download(id);
  };

  const handleEdit = (event) => {
    commitTitle(event.target.value);
  };
  const commitTitle = (value) => {
    let title;
    const regex = [
      /v=([^&]{11})/,
      /list=([^&]{34})/,
      /\.\w+\/([^&]{11})/,
    ].filter((f) => f.exec(value))[0];
    !!regex && (title = regex.exec(value)[1]);
    if (title) {
      setKeys((k) => k.concat(title));
    } else console.log("could not parse", value);
  };

  return (
    <div className="Importer">
      <div className="import-header">
        <Underline dark>Import Music</Underline>
      </div>
      <TextField
        onChange={handleEdit}
        fullWidth
        autoFocus
        label={`Enter YouTube URL`}
        variant="outlined"
      />
      <div className="key-list">
        {keys?.map((key) => (
          <li key={key}>{key}</li>
        ))}
      </div>
      <Button
        color="primary"
        onClick={go}
        disabled={!keys?.length}
        variant="contained"
      >
        <CloudDownload />
        Download
      </Button>

      <div className="response-message">{message}</div>
    </div>
  );
};

Importer.defaultProps = {};
export default Importer;

export const openImporterDrawer = new Observer("openImporterDrawer");

export const ImporterDrawer = () => {
  const [args, setArgs] = useState({ open: false });

  const toggleDrawer = () => {
    setArgs({ open: false });
  };

  useEffect(() => {
    openImporterDrawer.subscribe(({ complete }) =>
      setArgs({
        complete: () => {
          complete();
          toggleDrawer();
        },
        open: true,
      })
    );
  });

  return (
    <div>
      <Drawer anchor="bottom" open={args.open} onClose={toggleDrawer}>
        <Importer {...args} />
      </Drawer>
    </div>
  );
};

import { useEffect, useState } from "react";
import "./App.css";
import * as jsPlumb from "@jsplumb/browser-ui";
require("@jsplumb/browser-ui");

const node1 = {
  id: "node1",
  label: "Node 1",
  x: 100,
  y: 100,
};

const node2 = {
  id: "node2",
  label: "Node 2",
  x: 200,
  y: 200,
};

function App() {
  const [plumb, setPlumb] = useState(null);

  useEffect(() => {
    const container = document.getElementById("jsplumb-container");
    if (container) {
      const instance = jsPlumb.newInstance({
        container: container,
      });
      console.log(instance);
      setPlumb(instance.BrowserJsPlumbInstance);
    }
  }, []);

  useEffect(() => {
    /*
    if (plumb) {
      plumb.addEndpoint("node1", {
        anchor: "Right",
        maxConnections: -1,
      });
      plumb.addEndpoint("node2", {
        anchor: "Left",
        maxConnections: -1,
      });
      plumb.connect({
        source: "node1",
        target: "node2",
      });
    }
    */
  });

  return (
    <div className="App">
      <header className="App-header"></header>
      <div
        id="jsplumb-container"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <div
          id="node1"
          style={{
            position: "absolute",
            left: node1.x,
            top: node1.y,
            width: 100,
            height: 100,
            backgroundColor: "red",
          }}
        >
          {node1.label}
        </div>
        <div
          id="node2"
          style={{
            position: "absolute",
            left: node2.x,
            top: node2.y,
            width: 100,
            height: 100,
            backgroundColor: "blue",
          }}
        >
          {node2.label}
        </div>
      </div>
    </div>
  );
}

export default App;

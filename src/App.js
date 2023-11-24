import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as jsPlumbBrowserUI from "@jsplumb/browser-ui";
import { nodes } from "./nodes";

const manageAll = (instance, elements) => {
  elements.forEach((node) => {
    instance.manage(node);
  });
};

const connectAll = (instance, elements) => {
  elements.forEach((node, index) => {
    if (index < elements.length - 1) {
      instance.connect({
        source: node,
        target: elements[index + 1],
        anchors: ["Right", "Left"],
        connector: { type: "Flowchart", options: { cornerRadius: 10 } },
      });
    }
  });
};

function App() {
  const jspRef = useRef(null);

  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!jspRef.current) {
      const element = document.getElementById("jsplumb-container");
      const instance = jsPlumbBrowserUI.newInstance({
        container: element,
      });
      jspRef.current = instance;
    }

    const others = [];
    nodes.forEach((node) => {
      others.push(document.getElementById(node.id));
    });
    setElements(others);
  }, []);

  useEffect(() => {
    if (jspRef.current) {
      manageAll(jspRef.current, elements);
      connectAll(jspRef.current, elements);
    }
  }, [elements]);

  return (
    <div className="App">
      <header className="App-header">
        <div
          id="jsplumb-container"
          className="jsplumb-container"
          style={{
            width: "1000px",
            height: "600px",
            position: "relative",
            border: "1px solid black",
          }}
        >
          {nodes.map((node) => (
            <div
              key={node.id}
              id={node.id}
              className="node"
              style={{ left: node.x, top: node.y }}
            >
              {node.title}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

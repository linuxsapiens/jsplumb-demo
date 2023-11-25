import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as jsPlumbBrowserUI from "@jsplumb/browser-ui";
import { nodes } from "./nodes";
import "@jsplumb/browser-ui/css/jsplumbtoolkit.css";

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

const addNode = (instance, element) => {
  instance.manage(element);
  instance.addEndpoint(element, {
    source: true,
    anchors: "Right",
    endpoint: "Dot",
    connector: { type: "Flowchart", options: { cornerRadius: 10 } },
  });
  instance.addEndpoint(element, {
    target: true,
    anchors: "Left",
    endpoint: "Dot",
    connector: { type: "Flowchart", options: { cornerRadius: 10 } },
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
        dragOptions: {
          grid: { w: 20, h: 20 },
          containment: "parent",
          containmentPadding: 100,
          // constrainFunction: (el, pos) => {},
        },
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

  const addElement = (type) => {
    const id = type + Math.random();
    const container = document.getElementById("jsplumb-container");
    const node = container.appendChild(
      document.createElement("div", {
        key: id,
        id: id,
        style: { left: 100, top: 100, width: 100, height: 100 },
      })
    );
    node.className = "node";
    node.appendChild(document.createTextNode(id));
    addNode(jspRef.current, node);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flow Editor</h1>
      </header>
      <div
        className="App-body"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          color: "white",
        }}
      >
        <div style={{ display: "flex-column", marginRight: "20px" }}>
          <button onClick={() => addElement("start")}>Add</button>
        </div>
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
      </div>
    </div>
  );
}

export default App;

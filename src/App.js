import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FlowEditor } from "./FlowEditor";
import { nodes } from "./nodes";

function App() {
  const refContainer = useRef(null);

  const [refNodes, setRefNodes] = useState(null);

  useEffect(() => {
    if (nodes && nodes.length > 0 && refNodes === null) {
      console.log(nodes);
      const myNodes = nodes.map((node) => {
        return { ...node, ref: document.getElementById(node.id) };
      });
      setRefNodes(myNodes);
    }
  }, [nodes]);

  return (
    <div className="App">
      <header className="App-header">
        <div
          id="jsplumb-container"
          ref={refContainer}
          style={{
            width: "1000px",
            height: "600px",
            position: "relative",
            border: "1px solid black",
          }}
        >
          {nodes &&
            Array.isArray(nodes) &&
            nodes.map((node, index) => (
              <div
                id={node.id}
                key={node.id}
                className="node"
                style={{ left: (node.x + 100) * index, top: node.y }}
                x={node.x}
              >
                {node.title}
              </div>
            ))}
          <FlowEditor
            nodes={refNodes}
            containerId="jsplumb-container"
            containerRef={refContainer}
          />
        </div>
      </header>
    </div>
  );
}

export default App;

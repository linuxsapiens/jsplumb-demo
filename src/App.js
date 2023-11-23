import { useEffect } from "react";
import "./App.css";
import * as jsPlumbBrowserUI from "@jsplumb/browser-ui";

function App() {

  useEffect(() => {
    const element = document.getElementById("jsplumb-container");
    const instance = jsPlumbBrowserUI.newInstance({
      container: element,
    });
    const start = document.getElementById("start");
    const node1 = document.getElementById("node1");
    const node2 = document.getElementById("node2");

    instance.manageAll([ start, node1, node2]);

    instance.connect({
      source: start,
      target: node1,
      anchors: ["Right", "Left"],
      connector:{ 
        type:"Bezier",
        options:{
          curviness: 50,
        },
      },
  });

    instance.connect({
      source: node1,
      target: node2,
      connector:{
        type: "Flowchart",
        options:{
          stub: [10, 10],
          // gap: 10,
          cornerRadius: 10,
        },
      },
      anchor:"Continuous",
      /*
      overlays:[
        { type:"Label", options:{label:"Connection 2", location: 0.5, cssClass:"myLabel"}},
        { type:"Arrow", options:{location:1}},
      ]
      */
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div
          id="jsplumb-container"
          style={{ width: "1000px", height: "600px", position: "relative", border: "1px solid black" }}
        >
        <div id="start" className="node" style={{ left: 100, top: 200 }}>Inicio</div>
        <div id="node1" className="node" style={{ left: 300, top: 300 }}>Fase 1</div>
        <div id="node2" className="node" style={{ left: 600, top: 400 }}>Fase 2</div>
        </div>
      </header>
    </div>
  );
}

export default App;

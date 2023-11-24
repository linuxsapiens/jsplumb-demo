import { useEffect, useRef, useState } from "react";
import * as jsPlumbBrowserUI from "@jsplumb/browser-ui";
import "./App.css";

export const FlowEditor = ( props ) => {
  const { nodes, containerId } = props;
  const [wkNodes, setWkNodes] = useState(nodes);

  const containerRef = useRef(null);

  useEffect(() => {

    if (containerId && wkNodes && Array.isArray(wkNodes)) {
      const instance = jsPlumbBrowserUI.newInstance(
        { 
          container: document.getElementById(containerId),
        }
      );
      console.log("jsplumb: ", instance);
      
        instance.manageAll(wkNodes);

        instance.connect({
          source: wkNodes[0],
          target: wkNodes[1],
          anchors: ["Right", "Left"],
          connector: {
            type: "Bezier",
            options: {
              curviness: 50,
            },
          },
        });
    
        instance.connect({
          source: wkNodes[1],
          target: wkNodes[2],
          anchors: ["Right", "Left"],
          connector: {
            type: "Flowchart",
            options: {
              stub: [10, 10],
              // gap: 10,
              cornerRadius: 10,
            },
          },
          /*
          overlays:[
            { type:"Label", options:{label:"Connection 2", location: 0.5, cssClass:"myLabel"}},
            { type:"Arrow", options:{location:1}},
          ]
          */
        });}
  }, [wkNodes, containerId]);

  return (
    <div>
      { wkNodes && Array.isArray(wkNodes) && wkNodes.map((node, index) => (
        <div id={node.id} key={node.id} className="node" style={{ left: node.x * index, top: node.y * index }}>
          {node.title}
        </div>   
      ))}
    </div>
  );
}
import { useEffect, useRef } from "react";
import * as jsPlumbBrowserUI from "@jsplumb/browser-ui";
import "./App.css";

export const FlowEditor = ( props ) => {

  const { nodes, containerId, containerRef } = props;

  const jspRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      jspRef.current = jsPlumbBrowserUI.newInstance({ 
        container: containerRef.current || document.getElementById(containerId),
      });
    }
  }, [containerRef, containerId]);

  useEffect(() => {
    if ( jspRef.current && nodes && nodes.length > 0) {
      jspRef.current.manageAll(nodes.map((node) => node.ref));
      nodes.forEach((node, index) => {       
        if (node.ref) {
          if (index < nodes.length - 1) {
            jspRef.current.connect({
              source: node.ref,
              target: nodes[index + 1].ref,
              anchors: ["Right", "Left"],
              connector: { type: "Flowchart", options: { cornerRadius: 10 }},
            })
            if ( index > 0 ) {
            }
          } else {
          }
        };
      });
    }
  }, [nodes, jspRef]);

  return (
    <div/>
  );
}
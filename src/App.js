import { useEffect, useRef, useState } from "react";
import "./App.css";
import { GrPowerReset } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import { newInstance } from "@jsplumb/browser-ui"
import { nodes } from "./nodes";
import "@jsplumb/browser-ui/css/jsplumbtoolkit.css";



const manageAll = (instance, elements) => {
  elements.forEach((node) => {
    instance.manage(node);
  });
};

const connectAll = (instance, elements, addElement) => {
  
  elements.forEach((node, index) => {
    if (index < elements.length - 1) {
      const ep1 = instance.addEndpoint(node, {
        source: true,
        anchors: "Right",
        endpoint:{type:"Dot", options:{radius: 10}},
        connector: { type: "Flowchart", options: { cornerRadius: 10, gap:4 }},
        connectorOverlays:[ 
          { type:"PlainArrow", options:{location:1, width:15, length:15, }},
        ],
        // hoverClass: "endPoint-hover"   
      });
      
      const ep2 = instance.addEndpoint(elements[index + 1], {
        target: true,
        anchors: "Left",
        endpoint: {type:"Rectangle", options:{width: 10, height:25}},
        connector: { type: "Flowchart", options: { cornerRadius: 10} },
        // hoverClass: "endPoint-hover"   
      });
      instance.connect({
        source: ep1,
        target: ep2, // elements[index + 1],
        endpoint: {type:"Rectangle", options:{width: 10, height:25}},
        anchor:["Right", "Left"],
        connector: { type: "Flowchart", options: { cornerRadius: 10 } },
        overlays:[
          {
            type:"Custom",
            options:{
              create:(component) => {
                console.log(component);
                const d = document.createElement("delate")
                d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#c3c9d5" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>';
                return d;
              },
              location:0.5,
              id:"Trash",
              events:{
                click:(event) => delateConnection(instance,event)        
              },
            }
          },
          {
            type:"Custom",
            options:{
              create:(component) => {
                const d = document.createElement("add")
                d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#c3c9d5" viewBox="0 0 24 24"> <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/> </svg>';
                return d;
              },
              location:0.5,
              id:"Add",
              events:{
                click:() => addElement("start")       
              },
            }
          },
        ]
      });
    }    
  });
  
};

const addNode = (instance, element, addElement) => {
  instance.manage(element);
  
  instance.addEndpoint(element, {
    source: true,
    anchors: "Right",
    endpoint:{type:"Dot", options:{radius: 10}},
    connector: { type: "Flowchart", options: { cornerRadius: 10, gap:4 }},
    connectorOverlays:[ 
      { type:"PlainArrow", options:{location:1, width:15, length:15, }},
      {
        type:"Custom",
        options:{
          create:(component) => {
            console.log(component);
            const d = document.createElement("delate")
            d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#c3c9d5" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>';
            return d;
          },
          location:0.5,
          id:"Trash",
          events:{
            click:(event) => delateConnection(instance,event)        
          },
        }
      },
      {
        type:"Custom",
        options:{
          create:(component) => {
            const d = document.createElement("add")
            d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#c3c9d5" viewBox="0 0 24 24"> <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/> </svg>';
            return d;
          },
          location:0.5,
          id:"Add",
          events:{
            click:() => addElement("start")       
          },
        }
      },
    ],
    // hoverClass: "endPoint-hover"
  });
  instance.addEndpoint(element, {
    target: true,
    anchors: "Left",
    endpoint: {type:"Rectangle", options:{width: 10, height:25}},
    // connector: { type: "Flowchart", options: { cornerRadius: 10} },
    // hoverClass: "endPoint-hover"
  });
};

const delateConnection = (instance, {overlay}) => {
  const{component} = overlay;
    instance.selectEndpoints({source: component.sourceId}).deleteAll();
}

function App() {

const jspRef = useRef(null);

const [zoom, setZoom] = useState(1)
const [elements, setElements] = useState([]);

useEffect(() => {
    if (!jspRef.current) {
      const element = document.getElementById("jsplumb-container");
      const instance = newInstance({
        container: element,
        dragOptions: {
          grid: { w: 20, h: 20 },
          containment: "parentEnclosed",
          // containmentPadding: 50,
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
      connectAll(jspRef.current, elements, addElement);
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
    addNode(jspRef.current, node, addElement);
  };

  const zoomIn = () => {
    
    
    console.log(zoom);
    document.getElementById("jsplumb-container").style.transform = `scale(${zoom + 0.05})`;
    jspRef.current.setZoom(zoom)
    setZoom( zoom + 0.05);
    // console.log(container);
  }

  const zoomOut = () => {
    
    document.getElementById("jsplumb-container").style.transform = `scale(${zoom - 0.05})`;
    jspRef.current.setZoom(zoom)
    setZoom(zoom - .05);
  }

  const zoomReset = () => {
    
    document.getElementById("jsplumb-container").style.transform = `scale(1)`;
    jspRef.current.setZoom(zoom)
    setZoom(1);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Flow Editor</h1>
      </header>
      <div
        className="App-body"
      >
        <div>
        <div
          id="jsplumb-container"
          className="jsplumb-container"
          >
          <button className="add-button" onClick={() => addElement("start")}><IoMdAdd size={30}/></button>
          <div className="zoom-conteiner">  
          <button onClick={() => zoomIn()} className="zoom"><MdOutlineZoomIn size={30} /></button>
          <button onClick={() => zoomOut()} className="zoom"><MdOutlineZoomOut size={30}/></button>
          {
            zoom !== 1 
            ? <button onClick={() => zoomReset()} className="zoom"><GrPowerReset  size={30}/></button>
            : ''
          }
          </div>
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
    </div>
  );
}

export default App;


import { useCallback, useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { v4 as uuidv4 } from "uuid";

import DragPanel from "../../components/panel/dragPanel";
import StartNode from "../../components/customNodes/startNode";
import ProcessNode from "../../components/customNodes/processNode";
import EndNode from "../../components/customNodes/endNode";
import { DnDProvider, useDnD } from "../../components/context/dndContext";
import NodeControlPanel from "../../components/panel/nodeControlPanel";
import {
  useWorkflow,
  WorkflowProvider,
} from "../../components/context/workflowContext";

const nodeTypes = {
  StartType: StartNode,
  ProcessType: ProcessNode,
  EndType: EndNode,
};
const Home = () => {
  const reactFlowWrapper = useRef(null);
  const {
    nodes,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleSelectionChange,
  } = useWorkflow();

  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  // to pick the color of the node
  const nodeColor = (node: any) => {
    switch (node?.type) {
      case "StartType":
        return "#ffbf00";
      case "ProcessType":
        return "#0074ba";
      case "EndType":
        return "#00d26a";
      default:
        return "#ff0072";
    }
  };
  // to pick the label of the node
  const nodeLabel = (node: any) => {
    switch (node) {
      case "StartType":
        return "Start";
      case "ProcessType":
        return "Process";
      case "EndType":
        return "End";
      default:
        return "default";
    }
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  //to add new node on dropping the node
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: nodeLabel(type) },
      };

      setNodes((nds) => nds.concat(newNode as any));
    },
    [screenToFlowPosition, type]
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={handleSelectionChange}
        fitView
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="top-right">
          <DragPanel />
        </Panel>
        <Panel position="top-center">
          <NodeControlPanel />
        </Panel>
      </ReactFlow>
    </div>
  );
};
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <WorkflowProvider>
        <Home />
      </WorkflowProvider>
    </DnDProvider>
  </ReactFlowProvider>
);

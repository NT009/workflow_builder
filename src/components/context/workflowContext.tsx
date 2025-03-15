import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { addEdge, useNodesState, useEdgesState } from "@xyflow/react";
import {
  WorkflowSaveStateType,
  WorkflowStateType,
} from "../../utils/type/workflow";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";

interface WorkflowContextType {
  nodes: any[];
  edges: any[];
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
  setEdges: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedState: React.Dispatch<React.SetStateAction<WorkflowStateType>>;
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: (params: any) => void;
  handleSelectionChange: (params: any) => void;
  selectedState: WorkflowStateType;
  workflow: WorkflowSaveStateType | null;
  setWorkflow: React.Dispatch<
    React.SetStateAction<WorkflowSaveStateType | null>
  >;
  messageApi: MessageInstance;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(
  undefined
);
// state management context provider
export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const initialNodes = [
    {
      id: "3",
      type: "StartType",
      position: { x: 100, y: 100 },
      data: {
        label: "Start",
        description:
          "This is the default start node. You can modify or remove it as needed.",
      },
    },
    {
      id: "4",
      type: "ProcessType",
      position: { x: 100, y: 300 },
      data: {
        label: "Process",
        description:
          "This is a default process node. Feel free to edit or delete it based on your workflow.",
      },
    },
    {
      id: "5",
      type: "EndType",
      position: { x: 100, y: 500 },
      data: {
        label: "End",
        description:
          "This is the default end node. You can update or remove it to fit your workflow needs.",
      },
    },
  ];

  const initialEdges = [
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5", sourceHandle: "b" },
  ];

  // this state hold the data of the loaded workflow
  const [workflow, setWorkflow] = React.useState<WorkflowSaveStateType | null>(
    null
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // this state hold the data of the selected nodes and edges
  const [selectedState, setSelectedState] = React.useState<WorkflowStateType>({
    nodes: [],
    edges: [],
  });
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSelectionChange = useCallback((data: any) => {
    setSelectedState(data);
  }, []);

  // antd message as global provider
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        handleSelectionChange,
        selectedState,
        setSelectedState,
        workflow,
        setWorkflow,
        messageApi,
      }}
    >
      {contextHolder}
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
};

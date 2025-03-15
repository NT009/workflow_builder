interface Position {
  x: number;
  y: number;
}

interface Measured {
  width: number;
  height: number;
}

interface NodeData {
  label: string;
}

export interface NodeType {
  id: string;
  type: "StartType" | "ProcessType" | "EndType";
  position: Position;
  data: NodeData;
  measured?: Measured;
  selected?: boolean;
}

export interface EdgeType {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  selected?: boolean;
}

export interface WorkflowStateType {
  nodes: NodeType[] | [];
  edges: EdgeType[] | [];
}
export interface WorkflowSaveStateType {
  id: string;
  name: string;
  nodes: NodeType[] | [];
  edges: EdgeType[] | [];
}

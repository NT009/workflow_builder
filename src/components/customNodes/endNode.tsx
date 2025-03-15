import { Handle, Position } from "@xyflow/react";
import "./endNode.style.css";
import { MdCheckCircle } from "react-icons/md";
type Props = {
  data: {
    label: string;
    description?: string;
  };
  selected: boolean;
};
export default function EndNode({ data, selected }: Props) {
  return (
    <div className={`endNodeContainer ${selected ? "node_selected" : ""}`}>
      <div className="endNodeTxt1">
        <MdCheckCircle />
        <span>{data?.label}</span>
      </div>
      {data?.description ? (
        <div className="endNodeTxt2">{data?.description}</div>
      ) : null}

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </div>
  );
}

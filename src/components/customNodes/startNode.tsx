import { Handle, Position } from "@xyflow/react";
import "./startNode.style.css";
import { MdPlayArrow } from "react-icons/md";
type Props = {
  data: {
    label: string;
    description?: string;
  };
  selected: boolean;
};
export default function StartNode({ data, selected }: Props) {
  return (
    <div className={`startNodeContainer ${selected ? "node_selected" : ""}`}>
      <div className="startNodeTxt1">
        <MdPlayArrow />
        <span>{data?.label}</span>
      </div>
      {data?.description ? (
        <div className="startNodeTxt2">{data?.description}</div>
      ) : null}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

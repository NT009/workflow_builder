import { Handle, Position } from "@xyflow/react";
import "./processNode.style.css";
import { FaCog } from "react-icons/fa";
type Props = {
  data: {
    label: string;
    description?: string;
  };
  selected: boolean;
};
export default function ProcessNode({ data, selected }: Props) {
  return (
    <div className={`processNodeContainer ${selected ? "node_selected" : ""}`}>
      {/* Top Handle (Target Only) */}
      <Handle type="target" position={Position.Top} />

      {/* Left Handles (Both Source & Target) */}
      <Handle type="source" position={Position.Left} id="l-source" />
      <Handle type="target" position={Position.Left} id="l-target" />

      <div className="processNodeTxt1">
        <FaCog />
        <span>{data?.label}</span>
      </div>
      {data?.description ? (
        <div className="processNodeTxt2">{data?.description}</div>
      ) : null}
      {/* Right Handles (Both Source & Target) */}
      <Handle type="source" position={Position.Right} id="r-source" />
      <Handle type="target" position={Position.Right} id="r-target" />

      {/* Bottom Handle (Source Only) */}
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

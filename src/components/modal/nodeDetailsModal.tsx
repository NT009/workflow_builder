import React from "react";
import { Modal, Descriptions } from "antd";

type Props = {
  visible: boolean;
  onCancel: () => void;
  data: {
    type: string;
    data: {
      label: string;
      description?: string;
    };
  };
};

// display the details of the selected node
const NodeDetailsModal: React.FC<Props> = ({ visible, onCancel, data }) => {
  const nodeLabel = (node: any) => {
    switch (node) {
      case "StartType":
        return "Start Node";
      case "ProcessType":
        return "Process Node";
      case "EndType":
        return "End Node";
      default:
        return "default";
    }
  };
  return (
    <Modal
      title="Node Details"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Type">
          {nodeLabel(data?.type)}
        </Descriptions.Item>
        <Descriptions.Item label="Label">{data?.data?.label}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {data?.data?.description || "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default NodeDetailsModal;

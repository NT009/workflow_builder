import { FaCog, FaFolderOpen, FaPlus, FaSave } from "react-icons/fa";
import { MdCheckCircle, MdPlayArrow } from "react-icons/md";
import "./dagPanel.style.css";
import { useDnD } from "../context/dndContext";
import { Button } from "antd";
import SaveWorkflowModal from "../modal/saveWorkflowModal";
import { useState } from "react";
import { useWorkflow } from "../context/workflowContext";
import LoadWorkflowModal from "../modal/loadWorkflowModal";

// drag and drop panel contain all the available nodes and save , new and load workflow buttons
export default function DragPanel() {
  const [, setType] = useDnD();
  const [saveModal, setSaveModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const { nodes, messageApi } = useWorkflow();

  const onDragStart = (event: any, nodeType: any) => {
    if (setType) {
      setType(nodeType);
      event.dataTransfer.effectAllowed = "move";
    }
  };
  const handleSaveModal = () => {
    try {
      if (nodes?.length > 0) {
        setSaveModal(true);
      } else {
        messageApi.open({
          type: "warning",
          content: "Cannot save empty workflow",
        });
      }
    } catch (error) {}
  };
  return (
    <div className="drap_panel_container">
      <div>
        <h3 className="drap_panel_title">
          <img
            src="/workflow_builder_logo.png"
            alt="Workflow Builder"
            className="drap_panel_logo"
          />
          Menu
        </h3>
        <div className="drap_panel_line" />
        <h4 className="drap_panel_subtitle">Available Nodes</h4>
      </div>
      <div
        className="drap_panel_input start_node"
        onDragStart={(event) => onDragStart(event, "StartType")}
        draggable
      >
        <MdPlayArrow />
        <span>Start</span>
      </div>
      <div
        className="drap_panel_input process_node"
        onDragStart={(event) => onDragStart(event, "ProcessType")}
        draggable
      >
        <FaCog />
        <span>Process</span>
      </div>
      <div
        className="drap_panel_input end_node"
        onDragStart={(event) => onDragStart(event, "EndType")}
        draggable
      >
        <MdCheckCircle />
        <span>end</span>
      </div>
      <div className="drap_panel_line" />
      <div className="drap_panel_container2">
        <Button
          key="new"
          type="default"
          icon={<FaPlus />}
          onClick={() => window.location.reload()}
        >
          New Workflow
        </Button>
        <Button
          key="load"
          icon={<FaFolderOpen />}
          onClick={() => setLoadModal(true)}
        >
          Load Workflow
        </Button>

        <Button
          key="save"
          type="primary"
          icon={<FaSave />}
          onClick={handleSaveModal}
        >
          Save Workflow
        </Button>
      </div>

      <SaveWorkflowModal
        visible={saveModal}
        onCancel={() => setSaveModal(false)}
      />
      {loadModal && (
        <LoadWorkflowModal
          visible={loadModal}
          onClose={() => setLoadModal(false)}
        />
      )}
    </div>
  );
}

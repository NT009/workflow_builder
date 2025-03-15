import { Button } from "antd";
import "./nodeControlPanel.style.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useWorkflow } from "../context/workflowContext";
import { useMemo, useState } from "react";
import EditNodeModal from "../modal/nodeEditModal";
import NodeDetailsModal from "../modal/nodeDetailsModal";

// this is the control panel for the selected node and edge.
// can delele selected nodes and edges.
// can edit, view, and delete the selected node (only one node at a time)
export default function NodeControlPanel() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);

  const { selectedState, setNodes, setEdges, setSelectedState, messageApi } =
    useWorkflow();

  //to check if any nodes or edges is selected
  const enableDelete = useMemo(
    () => Boolean(selectedState?.nodes?.length || selectedState?.edges?.length),
    [selectedState]
  );
  //to check if any node is selected
  const enableEditView = useMemo(
    () => selectedState?.nodes?.length === 1 && !selectedState?.edges?.length,
    [selectedState]
  );
  //array of selected node and edge ids
  const nodeIds = useMemo(
    () => selectedState?.nodes?.map((node) => node?.id),
    [selectedState]
  );
  const edgeIds = useMemo(
    () => selectedState?.edges?.map((edge) => edge?.id),
    [selectedState]
  );
  const handleDeleteItems = () => {
    try {
      if (nodeIds?.length) {
        setNodes((nds) => nds.filter((node) => !nodeIds?.includes(node?.id)));
      }
      if (edgeIds?.length) {
        setEdges((eds) => eds.filter((edge) => !edgeIds?.includes(edge?.id)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditNode = (data: { label: string; description?: string }) => {
    try {
      if (nodeIds?.length === 1) {
        setNodes((nds) =>
          nds?.map((node) => {
            if (node?.id === nodeIds?.[0]) {
              const newNode = {
                ...node,
                data: {
                  ...node.data,
                  label: data.label,
                  description: data?.description,
                },
              };
              setSelectedState({ nodes: [newNode], edges: [] });
              return newNode;
            }

            return node;
          })
        );
        setIsEditModalVisible(false);
      } else {
        messageApi.error("Only one node can be edited at a time");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={"nodeControlPanel_container"}>
      <Button
        className="nodeControlPanel_view_btn"
        icon={<FaEye />}
        type="text"
        onClick={() => setDetailsModalVisible(true)}
        disabled={!enableEditView}
      />
      <Button
        className={"nodeControlPanel_edit_btn"}
        icon={<FaEdit />}
        type="text"
        onClick={() => setIsEditModalVisible(true)}
        disabled={!enableEditView}
      />
      <Button
        className={"nodeControlPanel_delete_btn"}
        icon={<FaTrash />}
        type="text"
        onClick={handleDeleteItems}
        disabled={!enableDelete}
      />
      <EditNodeModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        data={selectedState?.nodes?.[0]?.data || {}}
        onSubmit={handleEditNode}
      />
      <NodeDetailsModal
        visible={isDetailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        data={selectedState?.nodes?.[0] || {}}
      />
    </div>
  );
}

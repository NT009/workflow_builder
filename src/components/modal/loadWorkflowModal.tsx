import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { WorkflowSaveStateType } from "../../utils/type/workflow";
import { deleteWorkflow, loadWorkflow } from "../../services/api";
import { useWorkflow } from "../context/workflowContext";

interface LoadWorkflowModalProps {
  visible: boolean;
  onClose: () => void;
}

//list of all saved workflow
const LoadWorkflowModal: React.FC<LoadWorkflowModalProps> = ({
  visible,
  onClose,
}) => {
  const { setWorkflow, setNodes, setEdges,messageApi } = useWorkflow();
  const [dataLoading, setDataLoading] = React.useState(false);
  const [btnLoading, setbtnLoading] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState<WorkflowSaveStateType | null>(
    null
  );
  const [data, setData] = useState<WorkflowSaveStateType[]>([]);

  const columns: ColumnsType<WorkflowSaveStateType> = [
    {
      title: "",
      dataIndex: "selection",
      width: 50,
      key: "id",
    },
    {
      title: "Sl No",
      dataIndex: "slNo",
      render: (_, __, index) => index + 1,
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "No. of Nodes",
      width: 200,
      render: (_, record) => record?.nodes?.length,
      responsive: ["lg"],
    },
  ];
  useEffect(() => {
    handleLoadWorkflow();
  }, []);

  //fetch all the saved workflow
  const handleLoadWorkflow = async () => {
    try {
      setDataLoading(true);
      const response: any = await loadWorkflow();
      if (response?.success) {
        setData(response?.data);
      } else {
        messageApi.error("Something went wrong");
      }
    } catch (error) {
      messageApi.error("Something went wrong");
    } finally {
      setDataLoading(false);
    }
  };
    //delete the selected workflow
  const handleDeleteWorkflow = async () => {
    try {
      if (selectedRow?.id) {
        setbtnLoading(true);
        const response: any = await deleteWorkflow(selectedRow?.id as string);
        if (response?.success) {
          messageApi.success("Workflow deleted successfully");
          handleLoadWorkflow();
        } else {
          messageApi.error("Something went wrong");
        }
      } else {
        messageApi.error("please Select a workflow");
      }
    } catch (error) {
      messageApi.error("Something went wrong");
    } finally {
      setbtnLoading(false);
    }
  };
  const handleOnLoad = () => {
    try {
      if (selectedRow?.id) {
        messageApi.success("Workflow Loaded successfully");
        setWorkflow(selectedRow);
        setNodes(selectedRow?.nodes);
        setEdges(selectedRow?.edges);
        onClose();
      } else {
        messageApi.error("please Select a workflow");
      }
    } catch (error) {
      messageApi.error("Something went wrong");
    }
  };
  return (
    <Modal
      open={visible}
      title="Load Workflow"
      onCancel={onClose}
      footer={null}
      width="90vw"
      centered
    >
      <Table<WorkflowSaveStateType>
        columns={columns}
        rowKey="id"
        loading={dataLoading}
        dataSource={data}
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedRow ? [selectedRow.id] : [],
          onChange: (_, selectedRows) => {
            setSelectedRow(selectedRows.length ? selectedRows[0] : null);
          },
        }}
        pagination={false}
        style={{ marginTop: 15 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 20,
        }}
      >
        <Button onClick={onClose} loading={btnLoading}>
          Close
        </Button>
        <Button
          type="primary"
          danger
          disabled={!selectedRow}
          style={{ marginLeft: 10 }}
          loading={btnLoading}
          onClick={handleDeleteWorkflow}
        >
          Delete
        </Button>
        <Button
          type="primary"
          disabled={!selectedRow}
          style={{ marginLeft: 10 }}
          loading={btnLoading}
          onClick={handleOnLoad}
        >
          Load
        </Button>
      </div>
    </Modal>
  );
};

export default LoadWorkflowModal;

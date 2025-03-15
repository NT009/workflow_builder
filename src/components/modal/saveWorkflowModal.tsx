import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useWorkflow } from "../context/workflowContext";
import { saveWorkflow } from "../../services/api";
type Props = {
  visible: boolean;
  onCancel: () => void;
};
// form to save the workflow
const SaveWorkflowModal: React.FC<Props> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const { nodes, edges, messageApi, workflow } = useWorkflow();
  useEffect(() => {
    if (workflow?.name) {
      form.setFieldsValue({ name: workflow.name });
    }
  }, [workflow]);
  const [loading, setLoading] = React.useState(false);
  
  const handleSubmit = async (values: any) => {
    const id = workflow?.id || uuidv4();
    const data = { ...values, id, nodes, edges };
    try {
      setLoading(true);
      const response: any = await saveWorkflow(data);
      if (response?.success) {
        messageApi.success("Workflow saved successfully");
        form.resetFields();
        onCancel();
      } else {
        messageApi.error("Something went wrong");
      }
    } catch (error) {
      messageApi.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Save Workflow"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "A name is required to save data" },
          ]}
        >
          <Input placeholder="Enter workflow name" />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button onClick={onCancel} loading={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default SaveWorkflowModal;

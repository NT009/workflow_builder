import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

type Props = {
  visible: boolean;
  onCancel: () => void;
  data: { label: string; description?: string };
  onSubmit: (values: { label: string; description?: string }) => void;
};


// form to edit the selected node
const EditNodeModal: React.FC<Props> = ({
  visible,
  onCancel,
  onSubmit,
  data,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <Modal
      title="Edit Node"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={data}
      >
        <Form.Item
          label="Label"
          name="label"
          rules={[{ required: true, message: "Label is required" }]}
        >
          <Input placeholder="Enter label" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter description " />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditNodeModal;

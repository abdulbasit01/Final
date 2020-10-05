import React, { Component } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export class AssignmentCreate extends Component {
  state = {
    formCount: 1,
  };
  remove = () => {
    const { formCount } = this.state;
    this.setState({
      formCount: formCount - 1,
    });
  };

  add = () => {
    const { formCount } = this.state;
    this.setState({
      formCount: formCount + 1,
    });
  };
  render() {
    const rules = [{ required: true }];
    const onFinish = (choices) => {
      console.log("Received values of form:", choices);
    };

    return (
      <Form onFinish={onFinish} className="my-form">
        <Form.List name="title">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col>
                      <Form.Item
                        name={[field.name, "title"]}
                        fieldKey={[field.fieldKey, "title"]}
                        rules={rules}
                      >
                        <Input placeholder="Enter Title" />
                      </Form.Item>
                    </Col>

                    <Col flex="none">
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          this.remove();
                        }}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      this.add();
                    }}
                    style={{ width: "100%" }}
                  >
                    <PlusOutlined /> Add Choices
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AssignmentCreate;

import React, { Component } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export class postchoices extends Component {
  render() {
    const rules = [{ required: true }];
    const onFinish = (choices) => {
      console.log("Received values of form:", choices);
      this.props.ChoicesSubmit(choices);
    };

    return (
      <Form onFinish={onFinish} className="my-form">
        <Form.List name="choice_set">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col>
                      <Form.Item
                        name={[field.name, "label"]}
                        fieldKey={[field.fieldKey, "label"]}
                        rules={rules}
                      >
                        <Input placeholder="Enter Choices" />
                      </Form.Item>
                    </Col>

                    <Col flex="none">
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
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

export default postchoices;

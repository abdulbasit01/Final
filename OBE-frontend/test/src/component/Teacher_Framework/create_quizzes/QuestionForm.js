import React from "react";
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const FormItem = Form.Item;

let id = 0;

class QuestionForm extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) return;
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(++id);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const { getFieldValue } = this.props.form;
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <Form.Item label={index === 0 ? "Choices" : ""} required={false} key={k}>
        <Form.Item
          name={`choices[${this.props.id}]`}
          validateTrigger={["onChange", "onBlur"]}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please input Choices.",
            },
          ]}
          noStyle
        >
          (<Input placeholder="Answer choice" />
          )}
        </Form.Item>
        {keys.length > 1 ? (
          <PlusOutlined
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <div>
        <Form.Item
          label="Question: "
          name={`question[${this.props.id}]`}
          validateTrigger={["onChange", "onBlur"]}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please enter question",
            },
          ]}
        >
          <Input placeholder="Add a Question" />
        </Form.Item>
        <Form.Item
          label="Answer: "
          name={`answers[${this.props.id}]`}
          validateTrigger={["onChange", "onBlur"]}
          rules={[
            {
              required: true,
              message: "Please input an answer",
            },
          ]}
        >
          <Input placeholder="What is the answer?" />
        </Form.Item>

        {formItems}
        <FormItem>
          <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
            <PlusOutlined /> Add an answer choice
          </Button>
        </FormItem>
      </div>
    );
  }
}

export default QuestionForm;

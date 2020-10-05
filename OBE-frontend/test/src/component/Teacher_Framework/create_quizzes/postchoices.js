import React from "react";
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import QuestionForm from "./QuestionForm";

class AssignmentCreate extends React.Component {
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
    const questions = [];
    for (let i = 0; i < this.state.formCount; i += 1) {
      questions.push(<QuestionForm id={i} key={i} {...this.props} />);
    }

    return (
      <div>
        <Form
          name="dynamic_form_item"
          {...formItemLayoutWithOutLabel}
          onFinish={onFinish}
        >
          <Form.List name="names">
            return (
            <div>
              <Form.Item
                label={"Title:"}
                name={["title"]}
                validateTrigger={["onChange", "onBlur"]}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input tittle.",
                  },
                ]}
              >
                <Input placeholder="title" />
              </Form.Item>

              <Form.Item>
                <Button type="dashed" onClick={this.add}>
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
            );
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AssignmentCreate;

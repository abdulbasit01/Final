import React, { Fragment } from "react";
import { Radio, Button } from "antd";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};
class Choices extends React.Component {
  render() {
    const { value } = this.state;
    const { questionId } = this.props;
    const { usersAnswers } = this.props;
    return (
      <Radio.Group
        onChange={(e, qId) => this.props.change(e, questionId)}
        value={
          usersAnswers[questionId] !== undefined &&
          usersAnswers[questionId] !== null
            ? usersAnswers[questionId]
            : null
        }
      >
        {this.props.choices.map((c, index) => {
          return (
            <Radio style={radioStyle} value={c} key={index}>
              {c}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  }
}

export default Choices;

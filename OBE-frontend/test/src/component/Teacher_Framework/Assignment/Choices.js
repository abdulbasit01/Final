import React from "react";
import { Radio } from "antd";

const RadioGroup = Radio.Group;

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

class Choices extends React.Component {
  render() {
    const { questionId } = this.props;
    const { choices } = this.props;
    const { usersAnswers } = this.props;
    return (
      <RadioGroup
        onChange={(e, qId) => this.props.change(e, questionId)}
        value={
          usersAnswers[questionId] !== undefined &&
          usersAnswers[questionId] !== null
            ? usersAnswers[questionId]
            : null
        }
      >
        {choices.map((c, index) => {
          return (
            <Radio style={radioStyle} value={c.choice_text} key={index}>
              {c.choice_text}
            </Radio>
          );
        })}
      </RadioGroup>
    );
  }
}

export default Choices;

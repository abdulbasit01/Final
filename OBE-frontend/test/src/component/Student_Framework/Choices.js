import React from "react";
import { Radio } from "antd";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

class Choices extends React.Component {
  render() {
    const { choices } = this.props;
    const { questionId } = this.props;
    const { usersAnswers } = this.props;
    console.log(choices);

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
        {choices.map((c, index) => {
          return (
            <Radio style={radioStyle} value={c.choice_text} key={index}>
              {c.choice_text}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  }
}

export default Choices;

import React, { Component } from "react";
//import our service
import JeopardyService from "../../jeopardyService";
import JeopardyDisplay from "../jeopardyDisplay/JeopardyDisplay";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0,
    };
  }

  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      this.setState({
        data: result.data[0],
      });
      console.log(this.state.data.answer);
    });
  }

  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  submittedAnswer = (event) => {
    let points = this.state.score;

    if (
      document.getElementById("answerInput").value.toLowerCase() ===
      this.state.data.answer.toLowerCase()
    ) {
      points = points + this.state.data.value;
    } else {
      points = points - this.state.data.value;
    }

    this.setState({
      score: points,
    });

    document.getElementById("answerInput").value = "";

    this.getNewQuestion();
  };

  //display the results on the screen
  render() {
    if (this.state.data.category === undefined) return <div>Loading</div>;

    return (
      <div>
        <JeopardyDisplay
          category={this.state.data.category.title}
          question={this.state.data.question}
          value={this.state.data.value}
          score={this.state.score}
        />
        <label>
          <strong>Answer: </strong>What/Who is
        </label>
        <input type="text" id="answerInput"></input> <br /> <br />
        <button onClick={this.submittedAnswer}>Submit</button>
      </div>
    );
  }
}

export default Jeopardy;

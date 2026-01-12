import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

class Form extends Component {
  function_Form() {
    return (
      <form>
        <label>
          Enter your Name:&nbsp;&nbsp;
          <input type="text" required /><br></br><br></br>
          Enter your Email ID:&nbsp;&nbsp;
          <input type="email" required /><br></br><br></br>
          Enter Password:&nbsp;&nbsp;
          <input type="password" required/><br></br><br></br>
          <button>Log IN</button>&nbsp;&nbsp;
          <button>Sign up</button>
        </label>
      </form>
    );
  }

  render() {
    return this.function_Form();
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Form />);

export default Form;
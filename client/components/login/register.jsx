import React from "react";
import loginImg from "../../1.png";

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
        </div>
        <div className="footer">
          Please Contact Nexellence Admin to Register
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { connect } from 'react-redux';
import withAuth from "../components/withAuth";

class User extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <h1 className="title">Welcome {this.props.user.username}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default withAuth(connect(mapStateToProps)(User));
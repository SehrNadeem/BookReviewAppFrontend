import React, { Component } from "react";
import { connect } from 'react-redux';
import withAuth from "../components/withAuth";

class User extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log('props in mount', this.props)
  }

  render(){
    console.log('props in mount', this.props)
    return (
      <div>
        <h1 className="title">Welcome {this.props.user.username}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("the store state is: ", state)
  return {
    user: state.user.user
  }
}

export default withAuth(connect(mapStateToProps)(User));
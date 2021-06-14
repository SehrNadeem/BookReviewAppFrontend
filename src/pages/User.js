import React, { Component } from "react";
import withAuth from "../components/withAuth";
import { connect } from 'react-redux';

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
        
        <h1 className="title">Welcome {}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("the store state is: ")
  console.log(state)
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(withAuth(User));
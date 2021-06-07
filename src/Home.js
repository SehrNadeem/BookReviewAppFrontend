import React, { Component } from 'react'

export default class Home extends Component {

  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: ''
    }
  }  

  
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <h2>Welcome {this.state.first_name} {this.state.last_name}</h2>
      </div>
    )
  }
}
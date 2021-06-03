export const signUp = user => {
  fetch(`${process.env.REACT_APP_SERVER_URL}users`, {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user:{
        username: user.username,
        password: user.password,
        first_name: user.firstName,
        last_name: user.lastName
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    localStorage.setItem("token", data.jwt)
    // this.setState({
    //   user: data.user
    // })
  })

  const token = localStorage.getItem("token")

  if(token){
    fetch(`${process.env.REACT_APP_SERVER_URL}user_is_authed`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

}

export const signIn = (user) => {
  fetch(`${process.env.REACT_APP_SERVER_URL}login`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        username: user.username,
        password: user.password
      }
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if (result.jwt){
      console.log(result.user)
      localStorage.setItem('token', result.jwt)
      // this.setState({
      //   user: result.user,
      //   isReturningUser: true
      // })
    }
    else {
      console.log(result.user)
      // this.setState({
      //   error: result.failure
      // })
    }
  })
}


export const userLoggedIn = (token) => {
  fetch(`${process.env.REACT_APP_SERVER_URL}profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(result => {
        if(result.id){
          console.log("user is already signed in")
          this.setState({
            user: result
          })
        }
      })
}
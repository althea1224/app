import React, { Component } from 'react';
import './App.css';
import ReqestIndex from './api/index'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: {},
      banks: [],
      userName: '',
    }
    this.updateUserInfo = this.updateUserInfo.bind(this)
    this.changeUserName = this.changeUserName.bind(this)
  }
 
  componentDidMount() {
    this.getUserInfo();
    this.getBanks();
  }
 
  render() {
    return (
      <div className="App">
        <div>{this.state.userInfo.user_id} {this.state.userInfo.user_name} {this.state.userInfo.phone_no}</div>
        <input value={this.state.userName} onChange={this.changeUserName}/>
        <button onClick={this.updateUserInfo}>修改用户名</button>
        <h1>banks</h1>
        {
          
          this.state.banks.map((item, index) => {
              return (
                 <div key={index}>{item.bank_code} {item.bank_name}</div>
              )
          })
        }
      </div>
    );
  }

  async getBanks() {
    // let _this = this;
    try {
      let data = await ReqestIndex.getBanks({id: 1});
      this.setState({
        banks: data.data
      });
    } catch (e) {

    }
  }

  changeUserName (event) {
    this.setState({
      userName: event.target.value
    });
  }
  async getUserInfo() {
    // let _this = this;
    try {
      let data = await ReqestIndex.getUserInfo({userAccount: '15921954885'});
      let info = data.data[0]
      if (data.code === 1) {
        this.setState({
          userInfo: info,
          userName: info.user_name
        });
      } else {
        alert(data.msg)
      }
    } catch (e) {

    }
  }

  async updateUserInfo() {
    // let _this = this;
    try {
      let data = await ReqestIndex.updateUserInfo({
        userId: this.state.userInfo.user_id,
        userName: this.state.userName
      });
      if (data.code === 1) {
        let info = Object.assign({}, this.state.userInfo)
        info.user_name = this.state.userName
        this.setState({
          userInfo: info
        })
      } else {
        alert(data.msg)
      }
      
    } catch (e) {

    }
  }


}


export default App;

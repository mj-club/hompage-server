import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'

export default class SubMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item style ={{background: "#fcd93f"}}>
          <Input placeholder='Search...' />
        </Menu.Item>

        <Menu.Item name='Home'
        active={activeItem ==='Home'} 
        onClick={this.handleItemClick}
        herf ="/">
          Home
        </Menu.Item>

        <Dropdown item text='Membership'>
          <Dropdown.Menu>
            <Dropdown.Item icon='Login' text='로그인' herf ="#"/>
            <Dropdown.Item icon='globe' text='회원가입' herf ="/"/>
            <Dropdown.Item icon='settings' text='ID/PW 찾기' herf ="/"/>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        >
          Messages
        </Menu.Item>

        <Dropdown item text='More'>
          <Dropdown.Menu>
            <Dropdown.Item icon='edit' text='회원정보수정' />
            <Dropdown.Item icon='globe' text='언어설정' />
            <Dropdown.Item icon='settings' text='환경설정' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    )
  }
}
import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import MonthlyPage from '../../pages/MonthlyPage'
import "../menubars/Moviebar.css"

export default class MenuExampleCompact extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu compact icon='labeled' vertical className ="menu">
        <Menu.Item
          name='eye'
          active={activeItem === 'eye'}
          onClick={this.handleItemClick}
        >
          <Icon name='eye' />
          조회순
        </Menu.Item>

        <Menu.Item
          name='heart'
          active={activeItem === 'heart'}
          onClick={this.handleItemClick}
        >
          <Icon name='heart' />
          댓글순
        </Menu.Item>

        <Menu.Item
          name='video play'
          active={activeItem === 'video play'}
          onClick={this.handleItemClick}
        >
          <Icon name='video play' />
          최신순
        </Menu.Item>

        <Link to = "/">
          <Menu.Item
            name='pencil alternate'
            active={activeItem === 'pencil alternate'}
            onClick={this.handleItemClick}
          >
            <Icon name='pencil alternate' />
            게시물 등록
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}



import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

const options = [
  { key: 1, text: '댓글순', value: 1 },
  { key: 2, text: '조회순', value: 2 },
  { key: 3, text: '최신순', value: 3 },
  { key: 4, text: '게시글 작성', value: 4}
]

const DropdownExampleSimple = () => (
  <Menu compact>
    <Dropdown text='정렬방식' options={options} simple item />
  </Menu>
)

export default DropdownExampleSimple
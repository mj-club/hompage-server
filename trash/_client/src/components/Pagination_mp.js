import React from 'react'
import { Pagination } from 'semantic-ui-react'

const Pagination_Month = () => (
  <Pagination
    boundaryRange={1}
    defaultActivePage={1}
    ellipsisItem={"..."}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    totalPages={10}
  /> 
)

export default Pagination_Month;
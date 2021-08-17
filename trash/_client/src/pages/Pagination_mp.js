import React from 'react'
import { Pagination } from 'semantic-ui-react'

const Pagination_Month = () => (
  <Pagination
    boundaryRange={5}
    defaultActivePage={1}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    totalPages={5}
  />
)

export default Pagination_Month;
import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import moment from 'moment';
import 'moment/locale/ko';



function Videocard({title, time, user, watched}){
  const nowTime = moment().format("YYYY-MM-DD HH:mm:ss"); 
  
  return(
    <Card className>
      <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          {time}{/* 여기 영상이 등록된 시간이 들어가야 합니다*/}
        </Card.Meta>
        <Card.Description>
          {user}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='eye' />
          {watched}
        </a>
      </Card.Content>
    </Card>
  )
}

export default Videocard
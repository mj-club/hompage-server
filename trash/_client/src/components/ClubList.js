import React from 'react';
import '../style/ClubList.css';

export default function ClubList() {
  return(
    <div class="clubs_list">
        <ul class="clubs_division">
            <p id="division">학술분과
                <li id="club"><a href="mju_club">MIRS</a></li>
                <li id="club"><a href="mju_club">ALS</a></li>
                <li id="club"><a href="mju_club">명지서법</a></li>
                <li id="club"><a href="mju_club">TIME</a></li>
            </p>
            <p id="division">사회연구분과
                <li id="club"><a href="mju_club">인액터스</a></li>
                <li id="club"><a href="mju_club">비주얼</a></li>
                <li id="club"><a href="mju_club">스카우트</a></li>
                <li id="club"><a href="mju_club">농어민후생연구회-흙</a></li>
                <li id="club"><a href="mju_club">P.E.R</a></li>
                <li id="club"><a href="mju_club">Flow-er</a></li>
                <li id="club"><a href="mju_club">SK루키</a></li>
            </p>
            <p id="division">전시창작분과
                <li id="club"><a href="mju_club">코아</a></li>
                <li id="club"><a href="mju_club">씨네메이션</a></li>
                <li id="club"><a href="mju_club">그림패시만화</a></li>
                <li id="club"><a href="mju_club">포토랩</a></li>
                <li id="club"><a href="mju_club">D-VISION</a></li>
            </p>
            <p id="division">체육분과
                <li id="club"><a href="#">FC명지</a></li>
                <li id="club"><a href="#">나이너스</a></li>
                <li id="club"><a href="#">파인</a></li>
                <li id="club"><a href="#">무릉도원</a></li>
                <li id="club"><a href="#">바다이야기</a></li>
                <li id="club"><a href="#">굴렁쇠</a></li>
                <li id="club"><a href="#">MJTA</a></li>
                <li id="club"><a href="#">콕콕콕</a></li>
                <li id="club"><a href="#">삼박자</a></li>
            </p>
            <p id="division">연행예술분과
                <li id="club"><a href="#">주리랑</a></li>
                <li id="club"><a href="#">화이트홀스</a></li>
                <li id="club"><a href="#">극예술연구회-알</a></li>
                <li id="club"><a href="#">흑풍theBLAST</a></li>
                <li id="club"><a href="#">MGH</a></li> 
                <li id="club"><a href="#">통해</a></li> 
            </p>
            <p id="division">종교분과
                <li id="club"><a href="#">실로암</a></li>
                <li id="club"><a href="#">대건안드레아</a></li>
                <li id="club"><a href="#">UBF</a></li>
                <li id="club"><a href="#">C.C.C</a></li>
                <li id="club"><a href="#">CFM</a></li>
            </p>
            <p id="division">봉사분과
                <li id="club"><a href="#">PTPI</a></li>
                <li id="club"><a href="#">나누미</a></li>
                <li id="club"><a href="#">RCY</a></li>
                <li id="club"><a href="#">키비탄</a></li>
                <li id="club"><a href="#">너나들이</a></li>
            </p>
        </ul>
    </div>
  );
}
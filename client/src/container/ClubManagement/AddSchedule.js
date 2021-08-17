import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import WhiteBox_Col1 from '../../components/WhiteBox/WhiteBox_Col1';

import ScheduleAddForm from '../../components/Schedule/ScheduleAddForm';

export default function AddSchedule() {

  return(
    <>
      <style>
        {`
        `}
      </style>
      <WhiteBox_Col1
        Content1={
          <>
            <SectionTitle
              titleOption="section-title text-center mb-7"
              headingOption="title fz-28"
              title="OO 동아리 일정 추가"
              subTitle=""
            />
            <ScheduleAddForm/>
          </>
        }
      />
    </>
  );
}

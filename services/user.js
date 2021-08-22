const { User, StudentInfo, Schedule, Union, UnionInfo } = require("../models");

// 프로필 정보 불러오기
module.exports.getProfile = async (id) => {
  const user = await User.findOne({
    where: { id }
  });

  if (!user) {
    const err = new Error();
    err.message = "db에 관련 정보가 없습니다.";
    err.status = 500;
    throw err;
  }

  const student = await StudentInfo.findOne({
    where: { users_id: user.id }
  });

  if (!student) {
    const err = new Error();
    err.message = "db에 관련 정보가 없습니다.";
    err.status = 500;
    throw err;
  }

  return {user, student};
};

// 프로필 정보 수정하기
module.exports.editProfile = async (userId, formData) => {
  const user = await User.findOne({
    where: { id: userId }
  });

  if (!user) {
    const err = new Error();
    err.message = "db에 관련 정보가 없습니다.";
    err.status = 500;
    throw err;
  }

  const student = await StudentInfo.findOne({
    where: { users_id: user.id }
  });

  if (!student) {
    const err = new Error();
    err.message = "db에 관련 정보가 없습니다.";
    err.status = 500;
    throw err;
  }

  const updateUser = await user.update({
    email: formData.email,
    name: formData.name,
    password: formData.password,
    ph_number: formData.ph_number,
    provider: formData.provider
  });

  const updateStudentInfo = await student.update({
    department: formData.department,
    major: formData.major,
    school_year: formData.school_year,
    student_id: formData.student_id
  });

  return {updateUser, updateStudentInfo};
};

// 일정 추가하기
module.exports.addSchedule = async (formData) => {
  const schedule = await Schedule.create({
    title: formData.title,
    description: formData.description,
    start: formData.start,
    end: formData.end,
    all_day_long: formData.all_day_long,
    provider: formData.provider
  });

  return schedule;
};

// 일정 수정하기
module.exports.editSchedule = async (scheduleId, formData) => {
  const schedule = await Schedule.findOne({
    where: { id: scheduleId }
  });

  if (!schedule) {
    const err = new Error();
    err.message = "db에 관련 정보가 없습니다.";
    err.status = 500;
    throw err;
  }

  const schedule = await Schedule.update({
    title: formData.title,
    description: formData.description,
    start: formData.start,
    end: formData.end,
    all_day_long: formData.all_day_long,
    provider: formData.provider
  });

  return schedule;
};

// 일정 삭제하기
module.exports.removeSchedule = async (scheduleId) => {
  const schedule = await Schedule.findOne({
    where: { id: scheduleId }
  });

  if (!schedule) {
    const err = new Error();
    err.message = "db에 관련 정보가 없습니다.";
    err.status = 500;
    throw err;
  }

  const delSchedule = await schedule.destroy();

  return delSchedule;
};

// 일정 불러오기 (상세)
module.exports.getSchedule = async (date ) => {

};

// 모든 일정 불러오기
module.exports.getAllSchedule = async (date, userId, unionId) => {
  // 불러올 날짜 조회
  let startDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-01";
  let uptoMonth = parseInt(date.substr(4, 2));
  if (uptoMonth >= 10 && uptoMonth < 12) {
    uptoMonth += 1;
  } else if (uptoMonth == 12) {
    uptoMonth == "01";
  } else {
    uptoMonth += 1;
    uptoMonth.toString();
    uptoMonth = "0" + uptoMonth;
  }
  let endDate = date.substr(0, 4) + "-" + String(uptoMonth) + "-01";
  console.log("조회날짜 >> ", startDate, " ~ ", endDate);

  let data = [];

  // 개인 일정
  const userSchedule = await Schedule.findAll({
    attributes: ["title", "description", "start", "end", "all_day_long"],
    where: {
      user_id: userId,
      start: {
        [Op.gte]: Date.parse(startDate),
        [Op.lt]: Date.parse(endDate),
      },
    },
    order: [["start", "DESC"]],
  });

  // err 
  if (!userSchedule) {
    const err = new Error();
    err.message = "db에 관련 정보가 없습니다.";
    err.status = 500;
    throw err;
  }

  // data.push({ scheduleType: "userSchedule", scheduleList: userSchedule });

  // // 동아리 일정
  // const user = await User.findByPk(userId, {
  //   include: [{ model: ClubInfo, attributes: ["name"] }],
  // });

  // // err 
  // if (!user) {
  //   const err = new Error();
  //   err.message = "db에 관련 정보가 없습니다.";
  //   err.status = 500;
  //   throw err;
  // }

  // try {
  //   await Promise.all(
  //     user.ClubInfos.map(async (club) => {
  //       let userClub = await ClubInfo.findOne({
  //         where: { name: club.name },
  //       });
  //       let clubSchedule = await userClub.getSchedules({
  //         where: {
  //           start: {
  //             [Op.gte]: Date.parse(startDate),
  //             [Op.lt]: Date.parse(endDate),
  //           },
  //         },
  //         order: [["start", "DESC"]],
  //       });
  //       data.push({ scheduleType: club.name, scheduleList: clubSchedule });
  //     })
  //   );

  //   // 총동연 일정
  //   const union = await UnionInfo.findOne({
  //     where: { id: unionId }
  //   });
  //   const unionSchedule = await Schedule.findAll({
  //     attributes: ["title", "description", "start", "end", "all_day_long"],
  //     where: {
  //       union_id: unionId,
  //       start: {
  //         [Op.gte]: Date.parse(startDate),
  //         [Op.lt]: Date.parse(endDate),
  //       },
  //     },
  //     order: [["start", "DESC"]],
  //   });

  //   // err 
  //   if (!unionSchedule) {
  //     const err = new Error();
  //     err.message = "db에 관련 정보가 없습니다.";
  //     err.status = 500;
  //     throw err;
  //   }
  //   data.push({ scheduleType: "unionSchedule", scheduleList: unionSchedule });
  // } catch (error) {
  //   res.send(error);
  // }
};

// 자유 게시물 등록하기
module.exports.addFreePost = () => {};

// 동아리 문의사항 게시물 등록하기
module.exports.addClubQuestionPost = () => {};

// 총동연 문의사항 게시물 등록하기
module.exports.addUnionQuestionPost = () => {};

// 청원 게시물 등록하기
module.exports.addPetitionPost = () => {};

// 게시물 수정하기
module.exports.editPost = () => {};

// 게시물 삭제하기
module.exports.removePost = () => {};

// 내가 쓴 게시물 모두 불러오기
module.exports.getAllUserPost = () => {};

// 내가 쓴 댓글 모두 불러오기
module.exports.getAllUserComment = () => {};

import "./Footer.css";
const Footer = () => {
  return (
    <div class="flex_container">
      <footer class="Footer">
        <div class="flex_item">
          <span class="spanstyle">
            <a href="/">개인정보보호정책</a>
          </span>
          <span class="spanstyle">
            <a href="/">이용약관</a>
          </span>
          <span class="spanstyle">
            <a href="/">이메일수집거부</a>
          </span>
          <p>
            명지대학교: 서울특별시 서대문구 거북골로 34<br></br>
            <span>
              Copyright &copy; 명지대학교 인문캠퍼스 총동아리연합회 All rights
              reserved.
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

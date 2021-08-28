const assert = require('assert');
const sayHello = require('../app').sayHello;

// 테스트 명령어 (파일명을 지정하지않으면 test디렉터리 내의 모든 테스트를 수행): mocha test/app.spec.js
describe('App.js를 테스트합니다.', function () {
  it('sayHello는 hello를 반환해야 합니다.', function () {
    assert.equal(sayHello(), 'hello');
  });
});

/*
// 비동기 테스트
const fs = require('fs');

describe('App.js에서 테스트합니다.', function () {
  it('async test', function (done) {
    this.timeout(3000);  // 단일 테스트의 제한 시간 설정
    fs.readFile(__filename, done);
  });
});
*/

// 중첩
const app = require('../app');

describe('App.js에서 테스트합니다.', function () {
  describe('# sayHello', function () {
    it('sayHello는 hello를 반환해야 합니다.', function () {
      assert.equal(app.sayHello(), "hello");
    });
  });

  describe('# addNumbers', function () {
    it('addNumbers는 반환값이 5이어야합니다.', function () {
      assert.equal(app.sayHello(3,2), 5);
    });
  });
});
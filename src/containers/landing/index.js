import React from "react";
import "./index.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollableAnchor from "react-scrollable-anchor";

const Landing = () => {
  AOS.init();
  return (
    <div className="landing">
      <div className="landing_header">
        <div className="header-flex container_landing">
          <a href="#header">
            <div className="logo"></div>
          </a>
          <a href="#download">
            <div>다운로드</div>
          </a>
        </div>
      </div>

      <ScrollableAnchor id={`header`}>
        <div className="body-box_01">
          <div className="body-box_01_flex container_landing">
            <div className="bigtitle-title">
              <h2 className="bigtitle-title-main">
                골프천재가 된 왕초보님
                <br />
                이제 꽃길만 걷자!
              </h2>
              <h4>
                즐거운 골프 라이프를
                <br />
                위한 지침서, 골프로드 72
                <br />
              </h4>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="400"
              style={{
                background: `url('./screenshot.png') center/contain no-repeat`,
                minWidth: 328,
                height: 694,
                boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`,
                borderRadius: 26
              }}
            />
          </div>
        </div>
      </ScrollableAnchor>

      <div className="body-box_02">
        <div className="body-box_02_flex">
          <div
            className="body-box_02_flex-top container_landing"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <div className="bigtitle-line bigtitle-line_green"></div>
            <div className="bigtitle-title ">
              <h2 className="bigtitle-title-main">
                골프 입문에서 싱글골퍼가 되기까지 72단계의 미션 로드맵
              </h2>
              <h4>
                행복골프학교 교장 김헌 선생님의 노하우로 72가지 미션을 통해
                여러분을 성장시키세요.
              </h4>
            </div>
          </div>
          <div className="body-box_02_flex-bottom">
            <div className="img" data-aos="fade-up" data-aos-duration="700" />
          </div>
        </div>
      </div>

      <div className="body-box_03">
        <div
          className="body-box_03_flex container_landing"
          data-aos="fade-down"
          data-aos-duration="500"
        >
          <div className="bigtitle-line"></div>
          <div className="bigtitle-title">
            <h2 className="bigtitle-title-main">
              다양한 혜택이 가득 <br />
              게이트 통과시마다 획득
            </h2>
            <h4>
              실력도 늘리고, 쇼핑도 알뜰하게! 활동지수에 따른 다양한 혜택을
              받아보세요.
            </h4>
          </div>
        </div>
      </div>

      <div className="body-box_04">
        <div className="body-box_04_flex container_landing">
          <div
            className="body-box_04_top"
            data-aos="fade-down"
            data-aos-duration="300"
          >
            <div className="bigtitle-line bigtitle-line_green"></div>
            <div className="bigtitle-title">
              <h2 className="bigtitle-title-main">
                함께하면 멀리, 오래 간다.
                <br />
                골프 인스타그램
              </h2>
              <h4>
                골프人 들끼리하는 SNS 인스타그램!
                <br />
                포스팅하고 소통하면서 즐거운 골프.
              </h4>
            </div>
          </div>
          <div className="body-box_04_bottom">
            <div
              className="body-box_04_bottom-box"
              style={{ background: `url('./in1.png') center / cover` }}
              data-aos="fade-up"
              data-aos-duration="300"
            >
              <div className="body-box_04_bottom-box-flex">
                <div className="ico_heart"></div>
                <h4 style={{ color: "white", margin: "8px 0" }}>일반 포스트</h4>
                <hr style={{ margin: `16px 0`, width: `50px` }} />
                <h4 style={{ color: `white` }}>
                  행복골프학교에서 배운
                  <br />
                  빈스윙 자세입니다!
                </h4>
              </div>
            </div>
            <div
              className="body-box_04_bottom-box"
              style={{ background: `url('./in2.png') center / cover` }}
              data-aos="fade-up"
              data-aos-duration="700"
            >
              <div className="body-box_04_bottom-box-flex">
                <div className="ico_heart"></div>
                <h4 style={{ color: "white", margin: "8px 0" }}>일반 포스트</h4>
                <hr style={{ margin: `16px 0`, width: `50px` }} />
                <h4 style={{ color: `white` }}>
                  실제 필드를 나가 골프를
                  <br />
                  해보니 정말 감회가 남다르네요!
                </h4>
              </div>
            </div>
            <div
              className="body-box_04_bottom-box"
              style={{ background: `url('./in3.png') center / cover` }}
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="body-box_04_bottom-box-flex">
                <div className="ico_ok"></div>
                <h4 style={{ color: "white", margin: "8px 0" }}>
                  게이트 포스트
                </h4>
                <hr style={{ margin: `16px 0`, width: `50px` }} />
                <h4 style={{ color: `white` }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: `Lexend Deca, sans-serif`
                    }}
                  >
                    GATE 15
                  </span>
                  <br />
                  골프로드 72를 통해 정말
                  <br />
                  실력이 팍팍 늘었어요.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollableAnchor id={`download`}>
        <div className="body-box_05">
          <div className="body-box_05-flex container_landing">
            <div className="body-box_05-left">
              <div className="body-box_05-left-content">
                <div className="bigtitle-line bigtitle-line_green"></div>
                <div className="bigtitle-title">
                  <h2 className="bigtitle-title-main">
                    골프로드 72로
                    <br />
                    시작하세요
                  </h2>
                  <h4>
                    다양한 골프 이야기를 담고 있는
                    <br />
                    골프로드 72로 시작하세요!
                  </h4>
                </div>
                <div className="ico_appstore"></div>
                <div className="ico_googleplay"></div>
              </div>
            </div>
            <div className="body-box_05-right">
              <div data-aos="zoom-in" data-aos-duration="400" className="img" />
            </div>
          </div>
        </div>
      </ScrollableAnchor>

      <div className="footer">
        <div>
          (주) 아틸런
          <br />
          대표자 : 김진석 | 사업자번호 : 354-81-01230 <br />
          TEL : 02-565-0329
          <br />
          Copyrights 2019 by Happygolf All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Landing;

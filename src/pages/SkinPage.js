import React, { useState, useEffect } from 'react';
import './PageStyles.css';

const SkinPage = () => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  
  // 현재 날짜 기반으로 요일 계산
  const getCurrentDay = () => {
    const today = new Date();
    const dayIndex = today.getDay(); // 0=일요일, 1=월요일, ...
    return dayIndex === 0 ? 6 : dayIndex - 1; // 월요일부터 시작하도록 조정
  };

  // 오늘 날짜 키 생성
  const getTodayKey = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  // 로컬스토리지에서 데이터 로드
  const loadSkinTasks = () => {
    const savedData = localStorage.getItem(`skinTasks_${getTodayKey()}`);
    return savedData ? JSON.parse(savedData) : {
      morningCompleted: false,
      eveningCompleted: false
    };
  };

  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [skinTasks, setSkinTasks] = useState(loadSkinTasks);

  // 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem(`skinTasks_${getTodayKey()}`, JSON.stringify(skinTasks));
  }, [skinTasks]);
  
  // 팩이 있는 요일인지 확인 (화:1, 목:3, 일:6)
  const hasFacePack = [1, 3, 6].includes(selectedDay);

    return (
    <div className="page-container">
      <header className="page-header">
        <h1>스킨</h1>
      </header>

      <main className="page-content">
        <div className="day-selector">
          {days.map((day, index) => (
            <button
              key={index}
              className={`day-btn ${selectedDay === index ? 'active' : ''}`}
              onClick={() => setSelectedDay(index)}
            >
              {day}
            </button>
          ))}
        </div>

                    <div className="skincare-routine">
              <div className="routine-time-section">
                <div className="routine-header">
                  <h2>아침 루틴</h2>
                  <div className="routine-checkbox">
                    <input
                      type="checkbox"
                      id="morning-complete"
                      checked={skinTasks.morningCompleted}
                      onChange={(e) => setSkinTasks(prev => ({...prev, morningCompleted: e.target.checked}))}
                      className="checkbox-input"
                    />
                    <label htmlFor="morning-complete" className="checkbox-label"></label>
                  </div>
                </div>
                <div className="routine-list">
                  <div className="routine-item-simple">
                    <div className="routine-info">
                      <span className="routine-name">폼 세안</span>
                      <span className="product-name">이니스프리 그린티 폼 클렌저</span>
                    </div>
                  </div>
                  <div className="routine-item-simple">
                    <div className="routine-info">
                      <span className="routine-name">토너</span>
                      <span className="product-name">아누아 77+</span>
                    </div>
                  </div>
                  <div className="routine-item-simple">
                    <div className="routine-info">
                      <span className="routine-name">세럼</span>
                      <span className="product-name">구달 어성초 히알루론 수딩 앰플</span>
                    </div>
                  </div>
                  <div className="routine-item-simple">
                    <div className="routine-info">
                      <span className="routine-name">수분크림</span>
                      <span className="product-name">메이크프렘 인테카 수딩 크림</span>
                    </div>
                  </div>
                  <div className="routine-item-simple">
                    <div className="routine-info">
                      <span className="routine-name">썬크림</span>
                      <span className="product-name">조선미녀</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="routine-time-section">
                <div className="routine-header">
                  <h2>저녁 루틴</h2>
                  <div className="routine-checkbox">
                    <input
                      type="checkbox"
                      id="evening-complete"
                      checked={skinTasks.eveningCompleted}
                      onChange={(e) => setSkinTasks(prev => ({...prev, eveningCompleted: e.target.checked}))}
                      className="checkbox-input"
                    />
                    <label htmlFor="evening-complete" className="checkbox-label"></label>
                  </div>
                </div>
                <div className="routine-list">
                  <div className="routine-item-simple">
                    <div className="routine-info">
                      <span className="routine-name">오일 + 폼 세안</span>
                      <span className="product-name">바이오더마 센시비오 H2O + 이니스프리 그린티 폼</span>
                    </div>
                  </div>
                  <div className="routine-item-simple">
                    <div className="routine-info">
                      <span className="routine-name">토너</span>
                      <span className="product-name">아누아 77+</span>
                    </div>
                  </div>
                  {hasFacePack && (
                    <div className="routine-item-simple">
                      <div className="routine-info">
                        <span className="routine-name">팩</span>
                        <span className="product-name">이니스프리 레티놀 시카 흔적 패드</span>
                      </div>
                    </div>
                  )}
                  <div className="routine-item-simple">
                    <div className="routine-info">
                      <span className="routine-name">세럼</span>
                      <span className="product-name">구달 어성초 히알루론 수딩 앰플</span>
                    </div>
                  </div>
                  <div className="routine-item-simple">
                    <div className="routine-info">
                      <span className="routine-name">수분크림</span>
                      <span className="product-name">메이크프렘 인테카 수딩 크림</span>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </main>
    </div>
  );
};

export default SkinPage;

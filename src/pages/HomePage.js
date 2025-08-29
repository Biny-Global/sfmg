import React, { useState, useEffect } from 'react';
import './PageStyles.css';
import { FaTooth, FaBed, FaSun, FaPumpSoap, FaPills, FaTint, FaGuitar } from 'react-icons/fa';
import { MdBedtime } from 'react-icons/md';

const HomePage = () => {
  // 오늘 날짜 키 생성
  const getTodayKey = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  // 로컬스토리지에서 데이터 로드
  const loadDailyTasks = () => {
    const savedData = localStorage.getItem(`dailyTasks_${getTodayKey()}`);
    return savedData ? JSON.parse(savedData) : {
      '양치': false,
      '수면': false,
      '바디로션': false,
      '영양제': false,
      '물섭취': false,
      '기타연습': false
    };
  };

  const [dailyTasks, setDailyTasks] = useState(loadDailyTasks);

  // 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem(`dailyTasks_${getTodayKey()}`, JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  const handleTaskCheck = (taskId) => {
    setDailyTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // 한달 종합 진행률 계산
  const calculateMonthlyProgress = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let totalCompletedTasks = 0;
    let totalPossibleTasks = 0;

    // 이번 달 각 날짜별 데이터 확인
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // 홈 일일 체크리스트
      const dailyData = localStorage.getItem(`dailyTasks_${dateKey}`);
      if (dailyData) {
        const tasks = JSON.parse(dailyData);
        totalCompletedTasks += Object.values(tasks).filter(task => task).length;
        totalPossibleTasks += Object.keys(tasks).length;
      } else if (day <= today.getDate()) {
        totalPossibleTasks += 6; // 통합된 홈 일일 체크리스트 항목 수
      }

      // 식단 체크리스트 (가정: 7개 항목)
      const dietData = localStorage.getItem(`dietTasks_${dateKey}`);
      if (dietData) {
        const tasks = JSON.parse(dietData);
        totalCompletedTasks += Object.values(tasks).filter(task => task).length;
        totalPossibleTasks += Object.keys(tasks).length;
      } else if (day <= today.getDate()) {
        totalPossibleTasks += 7; // 기본 식단 항목 수
      }

      // 운동 체크리스트 (가정: 10개 항목, 월수금만)
      const dayOfWeek = new Date(year, month, day).getDay();
      if ([1, 3, 5].includes(dayOfWeek)) { // 월수금
        const exerciseData = localStorage.getItem(`exerciseTasks_${dateKey}`);
        if (exerciseData) {
          const tasks = JSON.parse(exerciseData);
          totalCompletedTasks += Object.values(tasks).filter(task => task).length;
          totalPossibleTasks += Object.keys(tasks).length;
        } else if (day <= today.getDate()) {
          totalPossibleTasks += 10; // 기본 운동 항목 수
        }
      }

      // 스킨케어 체크리스트 (가정: 아침저녁 루틴)
      const skinData = localStorage.getItem(`skinTasks_${dateKey}`);
      if (skinData) {
        const tasks = JSON.parse(skinData);
        totalCompletedTasks += Object.values(tasks).filter(task => task).length;
        totalPossibleTasks += Object.keys(tasks).length;
      } else if (day <= today.getDate()) {
        totalPossibleTasks += 2; // 아침/저녁 루틴
      }
    }

    return totalPossibleTasks > 0 ? Math.round((totalCompletedTasks / totalPossibleTasks) * 100) : 0;
  };

  const monthlyProgressPercentage = calculateMonthlyProgress();

  const dailyTaskList = [
    { id: '양치', label: '양치 3회', icon: FaTooth },
    { id: '수면', label: '07시 기상 · 00시 취침', icon: MdBedtime },
    { id: '바디로션', label: '바디로션', icon: FaPumpSoap },
    { id: '영양제', label: '영양제 섭취 (얼라이브 원스데일리 포 맨)', icon: FaPills },
    { id: '물섭취', label: '물 1.5리터 섭취', icon: FaTint },
    { id: '기타연습', label: '기타연습', icon: FaGuitar }
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>홈</h1>
      </header>

      <main className="page-content">
        {/* 진행률 카드 */}
        <div className="progress-card">
          <div className="progress-header">
            <h2>이번 달 종합 진행률</h2>
            <div className="progress-percentage">{monthlyProgressPercentage}%</div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${monthlyProgressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <span>식단 · 운동 · 스킨 · 일상 종합</span>
          </div>
        </div>

        {/* 일일 체크리스트 */}
        <div className="daily-checklist">
          <h3>일일 체크리스트</h3>
          <div className="task-list">
            {dailyTaskList.map((task) => {
              const IconComponent = task.icon;
              return (
                <div key={task.id} className={`task-item ${dailyTasks[task.id] ? 'completed' : ''}`}>
                  <div className="task-info">
                    <IconComponent className="task-icon" />
                    <span className="task-label">{task.label}</span>
                    </div>
                  <div className="task-checkbox">
                    <input
                      type="checkbox"
                      id={task.id}
                      checked={dailyTasks[task.id]}
                      onChange={() => handleTaskCheck(task.id)}
                      className="checkbox-input"
                    />
                    <label htmlFor={task.id} className="checkbox-label"></label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

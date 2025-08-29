import React, { useState, useEffect } from 'react';
import './PageStyles.css';

const DietPage = () => {
  // 오늘 날짜 키 생성
  const getTodayKey = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const mealTypes = [
    { id: 'breakfast', label: '아침', content: '시리어스 매스 한스쿱', calories: '600' },
    { id: 'morning-snack', label: '간식', content: '초코파이', calories: '120' },
    { id: 'lunch', label: '점심', content: '일반식', calories: '약 500' },
    { id: 'afternoon-snack', label: '간식', content: '시리어스 매스 한스쿱', calories: '600' },
    { id: 'dinner', label: '저녁', content: '벌크업 도시락', calories: '약 750' },
    { id: 'pre-workout', label: '운동전', content: '크레아틴', calories: '0' },
    { id: 'night-snack', label: '야식', content: '밥 + 닭가슴살', calories: '약 465' }
  ];

  // 로컬스토리지에서 데이터 로드
  const loadDietTasks = () => {
    const savedData = localStorage.getItem(`dietTasks_${getTodayKey()}`);
    return savedData ? JSON.parse(savedData) : {};
  };

  const [checkedMeals, setCheckedMeals] = useState(loadDietTasks);

  // 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem(`dietTasks_${getTodayKey()}`, JSON.stringify(checkedMeals));
  }, [checkedMeals]);

  const handleCheck = (mealId) => {
    setCheckedMeals(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }));
  };

    return (
    <div className="page-container">
      <header className="page-header">
        <h1>식단</h1>
      </header>

      <main className="page-content">
        <div className="meal-list">
          {mealTypes.map((meal) => (
            <div key={meal.id} className={`meal-row ${checkedMeals[meal.id] ? 'completed' : ''}`}>
              <div className="meal-label">
                {meal.label}
              </div>
              <div className="meal-content">
                <div className="meal-food">{meal.content}</div>
                <div className="meal-calories">{meal.calories} Kcal</div>
              </div>
              <div className="meal-checkbox">
                <input
                  type="checkbox"
                  id={meal.id}
                  checked={checkedMeals[meal.id] || false}
                  onChange={() => handleCheck(meal.id)}
                  className="checkbox-input"
                />
                <label htmlFor={meal.id} className="checkbox-label"></label>
              </div>
            </div>
          ))}
        </div>
        
        <div className="nutrition-summary">
          <div className="summary-title">일일 영양 정보</div>
          <div className="summary-stats">
            <div className="summary-item">
              <span className="summary-label">총 칼로리</span>
              <span className="summary-value">약 3,035 Kcal</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">단백질</span>
              <span className="summary-value">144g</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DietPage;

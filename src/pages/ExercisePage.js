import React, { useState, useEffect } from 'react';
import './PageStyles.css';

const ExercisePage = () => {
  // 오늘 날짜 키 생성
  const getTodayKey = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const exercises = [
    { id: 'lat-pulldown', name: '랫풀다운', reps: '12개 3세트', weight: '12개 가능 무게', rest: '60초', category: 'back' },
    { id: 'chest-press', name: '체스트 프레스', reps: '12개 3세트', weight: '12개 가능 무게', rest: '', category: 'chest' },
    { id: 'cable-row', name: '케이블 로우', reps: '12개 3세트', weight: '12개 가능 무게', rest: '', category: 'back' },
    { id: 'pushup-fly', name: '푸쉬업 또는 플라이', reps: '12개 3세트', weight: '12개 가능 무게', rest: '', category: 'chest' },
    { id: 'shoulder-press', name: '덤벨 숄더 프레스', reps: '12개 3세트', weight: '12개 가능 무게', rest: '', category: 'shoulder' },
    { id: 'dumbbell-curl', name: '덤벨 컬', reps: '15개 3세트', weight: '15개 가능 무게', rest: '', category: 'arm' },
    { id: 'cable-pushdown', name: '케이블 푸쉬 다운', reps: '15개 3세트', weight: '15개 가능 무게', rest: '', category: 'arm' },
    { id: 'leg-press', name: '레그프레스', reps: '12개 3세트', weight: '12개 가능 무게', rest: '', category: 'leg' },
    { id: 'leg-extension', name: '레그 익스텐션', reps: '12개 3세트', weight: '12개 가능 무게', rest: '', category: 'leg' },
    { id: 'leg-curl', name: '레그 컬', reps: '12개 3세트', weight: '12개 가능 무게', rest: '', category: 'leg' }
  ];

  // 로컬스토리지에서 데이터 로드
  const loadExerciseTasks = () => {
    const savedData = localStorage.getItem(`exerciseTasks_${getTodayKey()}`);
    return savedData ? JSON.parse(savedData) : {};
  };

  const [checkedExercises, setCheckedExercises] = useState(loadExerciseTasks);

  // 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem(`exerciseTasks_${getTodayKey()}`, JSON.stringify(checkedExercises));
  }, [checkedExercises]);

  const handleCheck = (exerciseId) => {
    setCheckedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

    return (
    <div className="page-container">
      <header className="page-header">
        <h1>운동</h1>
      </header>

      <main className="page-content">
        <div className="workout-info">
          <div className="workout-schedule">
            <span className="schedule-label">운동 요일:</span>
            <span className="schedule-value">월 수 금</span>
          </div>
          <div className="workout-note">
            <span className="note-label">준비운동:</span>
            <span className="note-value">워밍업 2세트</span>
          </div>
        </div>
        
        <div className="exercise-list">
          {exercises.map((exercise) => (
            <div key={exercise.id} className={`exercise-row ${exercise.category} ${checkedExercises[exercise.id] ? 'completed' : ''}`}>
              <div className="exercise-main">
                <div className="exercise-name">{exercise.name}</div>
                <div className="exercise-details">
                  <div className="detail-item">
                    <span className="detail-label">횟수:</span>
                    <span className="detail-value">{exercise.reps}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">무게:</span>
                    <span className="detail-value">{exercise.weight}</span>
                  </div>
                  {exercise.rest && (
                    <div className="detail-item">
                      <span className="detail-label">휴식:</span>
                      <span className="detail-value">{exercise.rest}</span>
                    </div>
                  )}

                </div>
              </div>
              <div className="exercise-checkbox">
                <input
                  type="checkbox"
                  id={exercise.id}
                  checked={checkedExercises[exercise.id] || false}
                  onChange={() => handleCheck(exercise.id)}
                  className="checkbox-input"
                />
                <label htmlFor={exercise.id} className="checkbox-label"></label>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExercisePage;

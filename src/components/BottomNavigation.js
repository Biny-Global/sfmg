import React from 'react';
import './BottomNavigation.css';
import { AiFillHome } from 'react-icons/ai';
import { MdSpa } from 'react-icons/md';
import { IoRestaurant } from 'react-icons/io5';
import { FaDumbbell } from 'react-icons/fa';

const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: '홈', icon: AiFillHome },
    { id: 'skin', label: '스킨', icon: MdSpa },
    { id: 'diet', label: '식단', icon: IoRestaurant },
    { id: 'exercise', label: '운동', icon: FaDumbbell }
  ];

  return (
    <nav className="bottom-navigation">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <IconComponent className="nav-icon" />
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;

import React from 'react';
import React, { useState } from 'react';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderCalendar = () => {
    const numDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    const monthDays = [];
    for (let i = 1; i <= numDays; i++) {
      monthDays.push(i);
    }

    const blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push('');
    }

    const days = blanks.concat(monthDays);

    return (
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chunks(days, 7).map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td
                  key={`${i}-${j}`}
                  className={day === selectedDate ? 'selected' : ''}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const chunks = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  };

  return (
    <div className="calendar">
      <h2>
        {monthsOfYear[currentMonth]} {currentYear}
      </h2>
      {renderCalendar()}
    </div>
  );
}

export default Calendar;

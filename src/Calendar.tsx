import React from 'react';
import './Calendar.css';

interface CalendarProps {
    date: string;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
    const formattedDate = new Date(
        parseInt(date.split('/')[2]),
        parseInt(date.split('/')[1]) - 1,
        parseInt(date.split('/')[0])
    );

    const getMonthName = (date: Date) => {
        return date.toLocaleString('default', { month: 'long' });
    };

    const getDaysOfWeek = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return daysOfWeek.map((day) => <th key={day}>{day}</th>);
    };

    //     const year = formattedDate.getFullYear();
    //     const month = formattedDate.getMonth();
    //     const daysInMonth = new Date(year, month + 1, 0).getDate();
    //     const day = parseInt(date.split('/')[0]);
    //     const desiredWeekdayOrder = [6, 0, 1, 2, 3, 4, 5]; // Adjust this order as needed
    //     let firstDayOfMonth = new Date(year, month, 1).getDay();

    //     if (firstDayOfMonth === 0) {
    //         firstDayOfMonth = 6;
    //     } else {
    //         firstDayOfMonth -= 1;
    //     }

    //     let weekdayOffset = desiredWeekdayOrder.indexOf(firstDayOfMonth);
    //     if (weekdayOffset > day) {
    //         weekdayOffset -= 7;
    //     }

    //     const emptyCells = Array(weekdayOffset).fill(<td key={-1} />);

    //     const dates = [];

    //     for (let i = 1; i <= daysInMonth; i++) {
    //         const className = i === day ? 'highlight' : '';
    //         dates.push(
    //             <td key={i} className={className}>
    //                 {i}
    //             </td>
    //         );
    //     }

    //     return emptyCells.concat(dates);
    // };
    // const getMonthDates = () => {
    //     const year = formattedDate.getFullYear();
    //     const month = formattedDate.getMonth();
    //     const daysInMonth = new Date(year, month + 1, 0).getDate();
    //     const day = parseInt(date.split('/')[0]);
    //     const desiredWeekdayOrder = [6, 0, 1, 2, 3, 4, 5];
    //     let firstDayOfMonth = new Date(year, month, 1).getDay();
    //     if (firstDayOfMonth === 0) {
    //         firstDayOfMonth = 6;
    //     } else {
    //         firstDayOfMonth -= 1;
    //     }
    //     let weekdayOffset = desiredWeekdayOrder.indexOf(firstDayOfMonth);
    //     const emptyCells = Array(weekdayOffset).fill(null).map((_, index) => (
    //         <td key={`emptyCell-${index}`} />
    //     ));
    //     const dates = [];

    //     for (let i = 1; i <= daysInMonth; i++) {
    //         const className = i === day ? 'highlight' : '';
    //         dates.push(
    //             <td key={i} className={className}>
    //                 {i}
    //             </td>
    //         );
    //     }

    //     const allCells = emptyCells.concat(dates);
    //     const rows = [];
    //     for (let i = 0; i < allCells.length; i += 7) {
    //         rows.push(allCells.slice(i, i + 7));
    //     }

    //     return rows.map((row, index) => (
    //         <tr key={`row-${index}`}>{row}</tr>
    //     ));
    // };
    const getMonthDates = () => {
        const year = formattedDate.getFullYear();
        const month = formattedDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const day = parseInt(date.split('/')[0]);
        const desiredWeekdayOrder = [6, 0, 1, 2, 3, 4, 5];
        let firstDayOfMonth = new Date(year, month, 1).getDay();

        if (firstDayOfMonth === 0) {
            firstDayOfMonth = 6;
        } else {
            firstDayOfMonth -= 1;
        }

        let weekdayOffset = desiredWeekdayOrder.indexOf(firstDayOfMonth);
        const emptyCells = Array(weekdayOffset).fill(null).map((_, index) => (
            <td key={`emptyCell-${index}`} />
        ));
        const dates = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const className = i === day ? 'highlight' : '';
            dates.push(
                <td key={i} className={className}>
                    {i}
                </td>
            );
        }

        const allCells = emptyCells.concat(dates);
        const rows = [];
        let row = [];

        for (let i = 0; i < allCells.length; i++) {
            row.push(allCells[i]);
            if ((i + 1) % 7 === 0 || i === allCells.length - 1) {
                rows.push(row);
                row = [];
            }
        }

        return rows.map((row, index) => (
            <tr key={`row-${index}`}>{row}</tr>
        ));
    };



    return (
        <table className="calendar">
            <thead>
                <tr>
                    <th colSpan={7}>{getMonthName(formattedDate)} {formattedDate.getFullYear()}</th>
                </tr>
                <tr>{getDaysOfWeek()}</tr>
            </thead>
            <tbody>
                <tr>{getMonthDates()}</tr>
            </tbody>
        </table>
    );
};

export default Calendar;

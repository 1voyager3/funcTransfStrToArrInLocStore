'use strict';

// Accessing to the Dom Elements
let calendar = document.querySelector('#calendar');
let info = calendar.querySelector('.info');
let body = calendar.querySelector('.body');
let tableHead = calendar.querySelector('.tableHead');
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');

// utility functions
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let currentDate = date.getDate()
let currentMoment = { year: year,  month: month, date: currentDate}

const getLastDay = (year, month) => {
    let date = new Date (year, month + 1, 0)
    return date.getDate();
}

const getPrevYear = (year, month) => {
    if (month === 0) {
        return year - 1;
    } else {
        return year;
    }
}
const getPrevMonth = (month) => {
    if (month === 0) {
        return 11;
    } else {
        return month - 1;
    }
}
const getNextYear = (year, month) => {
    if (month === 11) {
        return year + 1;
    } else {
        return year;
    }
}
const getNextMonth = (month) => {
    if (month === 11) {
        return 0;
    } else {
        return month + 1;
    }
}
// utility function defines what is the numeric day of the
// week as a first number of the month
const getFirstWeekDay = (year, month) => {
    let date = new Date (year, month, 1);
    let num  = date.getDay();

    if (num === 0) {
        return 6;
    } else {
        return num - 1;
    }
}

// utility function defines what is the numeric day of the
// week as a last number of the month
const getLastWeekDay = (year, month) => {
    let date = new Date (year, month + 1, 0);
    let num  = date.getDay();

    if (num === 0) {
        return 6;
    } else {
        return num - 1;
    }
}

// creating Info with the current Month and Year
const infoMonthYear = (year, month, info) => {
    info.innerHTML = '';
    let dateInfo = new Date(Date.UTC(year, month, currentDate));
    const options = {month: 'long', year: 'numeric'};
    let currentMonthYear = new Intl.DateTimeFormat('en-GB', options).format(dateInfo);
    let divElement = document.createElement('div');
    divElement.innerHTML = currentMonthYear;
    return info.appendChild(divElement);
}

// creating tableHead in the HTML table
const weekArr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const createTableHead = (arr) => {
    let tr = document.createElement('tr');
    for (let i = 0; i < arr.length; i++) {
            let th = document.createElement('th');
            th.innerHTML = arr[i];
            tr.appendChild(th);
        }
    tableHead.appendChild(tr);
}
createTableHead(weekArr);

// range of days in the current month
const range = (count) => {
    let arr = [];
    for (let i = 1; i <= count; i++) {
        arr.push(i);
    }
    return arr;
}

// the filling of empty cells in the calendar
const getNormalize = (arr, left, right) => {
    for (let i = 0; i < left; i++) {
        arr.unshift('');
    }
    for (let i = 0; i < right; i++) {
        arr.push('');
    }
    return arr;
}

//to break into 2D Sub Array in order to fill the calendar
const getChunk = (arr, n) => {
    let result = [];
    let countOfSubArr = Math.ceil(arr.length / n);

    for (let i = 0; i < countOfSubArr; i++) {
        let elems = arr.splice(0, n);
        result.push(elems);
    }
    return result;
}

// creating table in the HTML file
let createTable = (parent, arr) => {

    parent.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < arr[i].length; j++) {
            let td = document.createElement('td');
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }

        parent.appendChild(tr);
    }
}

// wrapping the calendar function
function drawCalendar(body, year, month) {
    let arr = range(getLastDay(year, month))
    let firstWeekDay = getFirstWeekDay(year, month);
    let lastWeekDay  = getLastWeekDay(year, month);

    let nums = getChunk(getNormalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
    showActiveDate(body, year, month, currentMoment);

    createTable(body, nums);
}

//Showing current date with active red colour
const showActiveDate = (body, year, month, currentMoment) => {
    if (year === currentMoment.year && month === currentMoment.month) {
        let tds = document.querySelectorAll('td');
        for (let i = 0; i < tds.length; i++) {
            if (tds[i].innerHTML === currentMoment.date.toString()) {
                tds[i].classList.add('active');
                break;
            }
        }
    }
}

// The main calendar initialization
const initCalendar = () => {
    infoMonthYear(year, month, info);
    drawCalendar(body, year, month);
    showActiveDate(body, year, month, currentMoment);

    prev.addEventListener('click', function(event) {
        //changing global variables with the year and month to get the moment when click on prev. arrow
        year = getPrevYear(year, month);
        month = getPrevMonth(month);
        infoMonthYear(year, month, info);
        drawCalendar(body, year, month, currentMoment);
        event.preventDefault();
    })

    next.addEventListener('click', function(event) {
        //changing global variables with the year and month to get the moment when click on next arrow
        year = getNextYear(year, month);
        month = getNextMonth(month);
        infoMonthYear(year, month, info);
        drawCalendar(body, year, month, currentMoment);
        event.preventDefault();
    })
}
initCalendar();
















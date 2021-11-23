const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function app() {
    return {
        month: '',
        year: '',
        no_of_days: [],
        blankdays: [],
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

        events: [
            {
                event_date: new Date(2020, 3, 1),
                event_title: "April Fool's Day",
                event_theme: 'blue'
            },

            {
                event_date: new Date(2020, 3, 10),
                event_title: "Birthday",
                event_theme: 'red'
            },

            {
                event_date: new Date(2020, 3, 16),
                event_title: "Upcoming Event",
                event_theme: 'green'
            }
        ],
        event_title: '',
        event_date: '',
        event_theme: 'blue',

        themes: [
            {
                value: "blue",
                label: "Blue Theme"
            },
            {
                value: "red",
                label: "Red Theme"
            },
            {
                value: "yellow",
                label: "Yellow Theme"
            },
            {
                value: "green",
                label: "Green Theme"
            },
            {
                value: "purple",
                label: "Purple Theme"
            }
        ],

        openEventModal: false,

        initDate() {
            let today = new Date();
            this.month = today.getMonth();
            this.year = today.getFullYear();
            this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
        },

        isToday(date) {
            const today = new Date();
            const d = new Date(this.year, this.month, date);

            return today.toDateString() === d.toDateString() ? true : false;
        },

        showEventModal(date) {
            // open the modal
            this.openEventModal = true;
            this.event_date = new Date(this.year, this.month, date).toDateString();
        },

        addEvent() {
            if (this.event_title == '') {
                return;
            }

            this.events.push({
                event_date: this.event_date,
                event_title: this.event_title,
                event_theme: this.event_theme
            });


            // clear the form data
            this.event_title = '';
            this.event_date = '';
            this.event_theme = 'blue';

            //close the modal
            this.openEventModal = false;
        },

        getNoOfDays() {
            let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

            // find where to start calendar day of week
            let dayOfWeek = new Date(this.year, this.month).getDay();
            let blankdaysArray = [];
            for (var i = 1; i <= dayOfWeek; i++) {
                blankdaysArray.push(i);
            }

            let daysArray = [];
            for (var i = 1; i <= daysInMonth; i++) {
                daysArray.push(i);
            }

            this.blankdays = blankdaysArray;
            this.no_of_days = daysArray;
        }
    }
}

// create controller
const calendarController = app()

// assign some object
const calendarModal = document.getElementById('calendar-modal')
const monthLabel = document.getElementById('month-label')
const yearLabel = document.getElementById('year-label')
const prevMonthButton = document.getElementById('prev-month')
const nextMonthButton = document.getElementById('next-month')
const daysBar = document.getElementById('days-bar')
const dayList = document.getElementById('day-list')
// hide modal
calendarModal.style.display = 'none'
// DOM Event
function updateMonthAndYearLabel() {
    monthLabel.innerHTML = MONTH_NAMES[calendarController.month]
    yearLabel.innerHTML = calendarController.year
}
function disablePrevMonthButton() {
    prevMonthButton.disabled = true
    prevMonthButton.classList.add('cursor-not-allowed')
    prevMonthButton.classList.add('opacity-25')
}
function disableNextMonthButton() {
    nextMonthButton.disabled = true
    nextMonthButton.classList.add('cursor-not-allowed')
    nextMonthButton.classList.add('opacity-25')
}
function enablePrevMonthButton() {
    prevMonthButton.disabled = false
    prevMonthButton.classList.remove('cursor-not-allowed')
    prevMonthButton.classList.remove('opacity-25')
}
function enableNextMonthButton() {
    nextMonthButton.disabled = false
    nextMonthButton.classList.remove('cursor-not-allowed')
    nextMonthButton.classList.remove('opacity-25')
}
// init function
function init() {
    calendarController.initDate()
    calendarController.getNoOfDays()
    updateMonthAndYearLabel()
}
 // init calendar
init()

// prev and next month button
prevMonthButton.onclick = function () {
    calendarController.month--
    if (calendarController.month <= 0) {
        calendarController.month = 0;
        disablePrevMonthButton()
        enableNextMonthButton()
    } else {
        enablePrevMonthButton()
        enableNextMonthButton()
    }
    calendarController.getNoOfDays()
    updateMonthAndYearLabel()
    renderCalendar()
}

nextMonthButton.onclick = function () {
    calendarController.month++
    if (calendarController.month >= 11) {
        calendarController.month = 11;
        disableNextMonthButton()
        enablePrevMonthButton()
    } else {
        enableNextMonthButton()
        enablePrevMonthButton()
    }
    calendarController.getNoOfDays()
    updateMonthAndYearLabel()
    renderCalendar()
}

function toggleModal(date) {
    calendarController.showEventModal(date)
    calendarModal.style.display = 'block'
}

function renderDays() {
    let html = ''
    for (let day of DAYS) {
        html += `
           <div style="width: 14.26%" class="px-2 py-2">
                <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">${day}</div>
            </div>
        `
    }
    daysBar.innerHTML = html
}

function renderBlankDays() {
    let html = ''
    dayList.innerHTML = ''
    for (let blankday of calendarController.blankdays) {
        html += `
        <div style="width: 14.28%; height: 120px" class="text-center border-r border-b px-4 pt-2"></div>
        `
    }
    dayList.innerHTML += html
}

function renderNoOfDays() {
    let html = ''
    for (let date of calendarController.no_of_days) {
        let eventHtml = ''
        for (let event of calendarController.events.filter(e => new Date(e.event_date).toDateString() === new Date(calendarController.year, calendarController.month, date).toDateString())) {
            eventHtml += `
                <div class="px-2 py-1 rounded-lg mt-1 overflow-hidden border" :class="{
                                        'border-blue-200 text-blue-800 bg-blue-100': event.event_theme === 'blue',
                                        'border-red-200 text-red-800 bg-red-100': event.event_theme === 'red',
                                        'border-yellow-200 text-yellow-800 bg-yellow-100': event.event_theme === 'yellow',
                                        'border-green-200 text-green-800 bg-green-100': event.event_theme === 'green',
                                        'border-purple-200 text-purple-800 bg-purple-100': event.event_theme === 'purple'
                                    }">
                    <p x-text="event.event_title" class="text-sm truncate leading-tight"></p>
                </div>`
        }
        html += `
            <div style="width: 14.28%; height: 120px" class="px-4 pt-2 border-r border-b relative">
                <div onclick="toggleModal(${date})"
                    class="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${calendarController.isToday(date) ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'}">${date}</div>
                <div style="height: 80px;" class="overflow-y-auto mt-1">
                    ${eventHtml}
                </div>
            </div>`
    }
    dayList.innerHTML += html
}

function renderCalendar() {
    renderDays()
    renderBlankDays()
    renderNoOfDays()
}

renderCalendar()

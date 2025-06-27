# Stage Timer

A simple web-based timer application designed to help manage speaker sessions during events, meetings, or presentations. Allows multiple speakers to set individual timers, which run in a separate pop-up window for easy visibility.

---

## Features

- Add multiple speaker sessions with customizable names and time durations.
- Set timer duration in hours, minutes, and seconds.
- Start countdown timers in a separate pop-up window.
- Responsive and visually clear timer display.
- Built using plain JavaScript, HTML, and CSS with no external dependencies.

---

## Demo
https://nawukuamoako.github.io/Stage-Timer/

---

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari).
- No server required; runs entirely in the browser.

### Installation

1. Clone or download the repository:

```bash
git clone https://github.com/nawukuamoako/Stage-Timer.git
```
### Open index.html in your web browser

### Usage
- Click Add Speaker to create a new speaker timer form.
- Enter the session name and speaker name.
- Set the desired timer duration (hours, minutes, seconds).
- Click Start Timer to open a pop-up window with the countdown timer.
- The timer counts down to zero and resets if another timer is started.

---

## Code Overview
- index.html: Main HTML page containing speaker forms and buttons.
- timer.js: JavaScript logic to dynamically create speaker forms, manage timers, and handle the pop-up timer window.
- timer.css: CSS is used for styling of forms and timer display.

### Technologies Used
- JavaScript
- HTML
- CSS

### Future Improvements
- Add pause, resume, and reset timer controls.
- Add audio or visual alerts when timer ends.
- Improve input validation for time fields.

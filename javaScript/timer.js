let speakerCount = 0;
const speakerFormsContainer = document.getElementById('speakerFormsContainer');

let timerWindow;
let activeTimerInterval;

function createSpeakerForm() {
    speakerCount++;

    const formContainer = document.createElement('div');
    formContainer.classList.add('speaker-form');
    formContainer.id = `speakerForm-${speakerCount}`;

    formContainer.innerHTML = `
        <style>
            .speaker-form {
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode';
                border: 1px solid #ccc;
                padding: 10px;
                margin: 10px 0;
                background-color:rgb(45, 45, 45);
                border-radius: 5px;
            }
            .speaker-form:hover {
                background-color: rgb(56, 55, 55);
                transition: background-color 0.3s;
            }
            .speaker-form label {
                margin-bottom: 5px;
            }
            .speaker-form input {
                width: calc(100% - 100px);
                padding: 5px;
                margin-bottom: 10px;
            }
            .speaker-form input[type="number"] {
                width: 60px;
                margin-right: 1rem;
            }       
            .startTimerButton {
                background-color: #4CAF50;
                color: white;
                padding: 10px 15px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .startTimerButton:hover {
                background-color: #45a049;
            }
            .speaker-form h3 {
                color: #fff;
                font-size: 1.5rem;
                margin-bottom: 10px;
            }
            .speaker-form h4 {
                color: #fff;
                font-size: 1.2rem;
                margin: 0;
            }

        </style>
        <h3>Speaker ${speakerCount}</h3>
        <label for="sessionName-${speakerCount}">Session:</label><br>
        <input type="text" id="sessionName-${speakerCount}" placeholder="Enter Session" />
        <br>
        <label for="speakerName-${speakerCount}">Speaker Name:</label><br>
        <input type="text" id="speakerName-${speakerCount}" placeholder="Enter Speaker Name" />
        
        <h4>Set Time</h4>
        <label for="hours-${speakerCount}">Hours:</label>
        <input type="number" id="hours-${speakerCount}" min="0" placeholder="0" />
        <label for="minutes-${speakerCount}">Minutes:</label>
        <input type="number" id="minutes-${speakerCount}" min="0" placeholder="0" />
        
        <label for="seconds-${speakerCount}">Seconds:</label>
        <input type="number" id="seconds-${speakerCount}" min="0" placeholder="0" />
        
        <button class="startTimerButton" onclick="startTimer(${speakerCount})">Start Timer</button>
    `;

    speakerFormsContainer.appendChild(formContainer);
}

function startTimer(speakerId) {
    const sessionName = document.getElementById(`sessionName-${speakerId}`).value || " ";
    const speakerName = document.getElementById(`speakerName-${speakerId}`).value || " ";
    const hours = parseInt(document.getElementById(`hours-${speakerId}`).value) || 0;
    const minutes = parseInt(document.getElementById(`minutes-${speakerId}`).value) || 0;
    const seconds = parseInt(document.getElementById(`seconds-${speakerId}`).value) || 0;

    // If there is an active timer window and timer interval, clear it before starting the new one
    if (activeTimerInterval) {
        clearInterval(activeTimerInterval);  // Stop the old timer
    }

    // If the timer window doesn't exist, create a new one
    if (!timerWindow || timerWindow.closed) {
        timerWindow = window.open("", "Timer Window", "width=window.innerWidth,height=window.innerHeight,left=ScreenX");
        timerWindow.document.write(`
            <html>
            <head>
                <title>Timer for ${speakerName}</title>
                <style>
                    body {
                        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode';
                        text-align: center;
                        padding-top: 50px;
                        background-color:rgb(45, 45, 45);
                        color: #fff;
                    }
                    #timer {
                        font-size: calc(20px + 20vw);
                        font-weight: bold;
                        color: #fff;
                        box-shadow: 0 0 10px rgba(60, 60, 60, 0.5);
                    }
                    #session-name, #speaker-name {
                        font-size: 8vw;
                        color: rgb(255, 232, 151);
                        padding: 20px;
                        // background-color: #fff;
                    }
                </style>
            </head>
            <body>
                <div id="session-name">${sessionName}</div>
                <div id="timer">00:00:00</div>
                <div id="speaker-name">${speakerName}</div>
            </body>
            </html>
        `);
    } else {
        // If the window already exists, just update it
        timerWindow.document.getElementById('session-name').innerText = sessionName;
        timerWindow.document.getElementById('speaker-name').innerText = speakerName;
        timerWindow.document.getElementById('timer').innerText = '00:00:00';
    }

    let timeRemaining = { hours, minutes, seconds };

    function formatTime(time) {
        return String(time).padStart(2, '0');
    }

    function updateTimerDisplay() {
        const formattedTime = `${formatTime(timeRemaining.hours)}:${formatTime(timeRemaining.minutes)}:${formatTime(timeRemaining.seconds)}`;
        timerWindow.document.getElementById('timer').innerText = formattedTime;
    }

    function countdown() {
        if (timeRemaining.seconds > 0) {
            timeRemaining.seconds--;
        } else if (timeRemaining.minutes > 0) {
            timeRemaining.minutes--;
            timeRemaining.seconds = 59;
        } else if (timeRemaining.hours > 0) {
            timeRemaining.hours--;
            timeRemaining.minutes = 59;
            timeRemaining.seconds = 59;
        } else {
            clearInterval(activeTimerInterval);
            // alert(`Time's up for ${speakerName}!`);  
        }

        updateTimerDisplay();
    }

    // Start the countdown for the new timer
    activeTimerInterval = setInterval(countdown, 1000);
}

// Initialize with one default speaker form
createSpeakerForm();

// Add event listener to add new speaker form
document.getElementById('addSpeakerButton').addEventListener('click', createSpeakerForm);

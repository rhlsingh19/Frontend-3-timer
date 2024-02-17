document.addEventListener("DOMContentLoaded", function () {
  const startTimerBtn = document.getElementById("startTimerBtn");
  const activeTimersSection = document.getElementById("activeTimersSection");

  startTimerBtn.addEventListener("click", function () {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert("Please enter a valid time.");
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    createTimer(totalSeconds);
  });

  function createTimer(totalSeconds) {
    const timerItem = document.createElement("div");
    timerItem.classList.add("timer-item");
    let timeRemaining = totalSeconds;

    const intervalId = setInterval(function () {
      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        timerItem.classList.add("expired");
        timerItem.innerHTML = `<div class="timer-end-display">Time's up!</div>`;
        playAudio(); // Add your audio play function here
      } else {
        timeRemaining--;
        const formattedTime = formatTime(timeRemaining);
        timerItem.innerHTML = `<span>${formattedTime}</span><button class="stopTimerBtn">Stop Timer</button>`;
      }
    }, 1000);

    const stopTimerBtn = document.createElement("button");
    stopTimerBtn.classList.add("stopTimerBtn");
    stopTimerBtn.textContent = "Stop Timer";
    stopTimerBtn.addEventListener("click", function () {
      clearInterval(intervalId);
      timerItem.remove();
    });

    timerItem.appendChild(stopTimerBtn);
    activeTimersSection.appendChild(timerItem);
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours > 0 ? `${hours}h ` : "";
    const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";
    const formattedSeconds = `${remainingSeconds}s`;

    return formattedHours + formattedMinutes + formattedSeconds;
  }

  function playAudio() {
    // Add your audio play logic here
    const audio = new Audio("path/to/your/audio/file.mp3");
    audio.play();
  }
});

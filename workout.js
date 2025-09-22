// =================================
// COMPREHENSIVE WORKOUT DATABASE
// =================================

const workoutDatabase = {
  strength: {
    'full-body': {
      none: {
        beginner: ['Push-ups', 'Bodyweight Squats', 'Plank', 'Lunges', 'Wall Sit', 'Glute Bridges'],
        intermediate: ['Burpees', 'Single-leg Squats', 'Pike Push-ups', 'Jump Squats', 'Mountain Climbers', 'Side Planks'],
        advanced: ['One-arm Push-ups', 'Pistol Squats', 'Handstand Push-ups', 'Jump Lunges', 'Archer Push-ups', 'L-Sits']
      },
      dumbbells: {
        beginner: ['Dumbbell Squats', 'Chest Press', 'Bent-over Rows', 'Shoulder Press', 'Bicep Curls', 'Tricep Extensions'],
        intermediate: ['Goblet Squats', 'Renegade Rows', 'Thrusters', 'Romanian Deadlifts', 'Walking Lunges', 'Russian Twists'],
        advanced: ['Single-arm Snatches', 'Turkish Get-ups', 'Deficit Deadlifts', 'Single-arm Rows', 'Bulgarian Split Squats', 'Man Makers']
      },
      'full-gym': {
        beginner: ['Leg Press', 'Lat Pulldowns', 'Bench Press', 'Leg Curls', 'Cable Rows', 'Leg Extensions'],
        intermediate: ['Deadlifts', 'Pull-ups', 'Barbell Squats', 'Dips', 'Overhead Press', 'Barbell Rows'],
        advanced: ['Clean and Press', 'Front Squats', 'Weighted Pull-ups', 'Barbell Hip Thrusts', 'Muscle-ups', 'Heavy Deadlifts']
      }
    },
    'upper-body': {
      none: {
        beginner: ['Push-ups', 'Wall Push-ups', 'Tricep Dips', 'Plank to T', 'Arm Circles', 'Superman'],
        intermediate: ['Diamond Push-ups', 'Pike Push-ups', 'Single-arm Planks', 'Burpee Push-ups', 'Handstand Hold', 'Archer Push-ups'],
        advanced: ['One-arm Push-ups', 'Handstand Push-ups', 'Muscle-ups', 'Human Flag Progression', 'Planche Hold', 'One-arm Handstand']
      }
    },
    'lower-body': {
      none: {
        beginner: ['Bodyweight Squats', 'Lunges', 'Glute Bridges', 'Calf Raises', 'Wall Sit', 'Step-ups'],
        intermediate: ['Jump Squats', 'Single-leg Glute Bridges', 'Walking Lunges', 'Lateral Lunges', 'Single-leg Calf Raises', 'Jump Lunges'],
        advanced: ['Pistol Squats', 'Shrimp Squats', 'Single-leg Deadlifts', 'Dragon Squats', 'Cossack Squats', 'Broad Jumps']
      }
    }
  },
  cardio: {
    'full-body': {
      none: {
        beginner: ['Marching in Place', 'Arm Swings', 'Knee Lifts', 'Side Steps', 'Gentle Jumping Jacks', 'Walking Lunges'],
        intermediate: ['Jumping Jacks', 'High Knees', 'Butt Kicks', 'Burpees', 'Mountain Climbers', 'Star Jumps'],
        advanced: ['Burpee Tuck Jumps', 'Plyometric Lunges', 'Box Jumps', 'Sprint Intervals', 'Broad Jumps', 'Explosive Push-ups']
      }
    }
  },
  hiit: {
    'full-body': {
      none: {
        beginner: ['Modified Burpees', 'Squat Pulses', 'Push-up to T', 'Alternating Lunges', 'Plank Jacks', 'Wall Sit'],
        intermediate: ['Burpees', 'Jump Squats', 'Mountain Climbers', 'High Knees', 'Plank Up-downs', 'Tuck Jumps'],
        advanced: ['Burpee Box Jumps', 'Single-leg Burpees', 'Plyometric Push-ups', 'Jump Lunges', 'Sprawls', 'Devil Press']
      }
    }
  },
  yoga: {
    'full-body': {
      'yoga-mat': {
        beginner: ['Mountain Pose', 'Downward Dog', 'Child\'s Pose', 'Cat-Cow', 'Warrior I', 'Tree Pose'],
        intermediate: ['Sun Salutation', 'Warrior III', 'Side Plank', 'Crow Pose', 'Camel Pose', 'Boat Pose'],
        advanced: ['Handstand', 'Scorpion Pose', 'Eight-Angle Pose', 'Flying Pigeon', 'King Pigeon', 'Firefly Pose']
      }
    }
  },
  stretching: {
    'full-body': {
      none: {
        beginner: ['Neck Rolls', 'Shoulder Shrugs', 'Arm Circles', 'Hamstring Stretch', 'Calf Stretch', 'Hip Circles'],
        intermediate: ['Dynamic Lunges', 'Leg Swings', 'Torso Twists', 'Hip Flexor Stretch', 'Quad Stretch', 'Cross-body Stretch'],
        advanced: ['PNF Stretching', 'Oversplits', 'Pancake Stretch', 'Middle Split', 'Back Bridge', 'Scorpion Stretch']
      }
    }
  }
};

// Exercise descriptions and instructions
const exerciseInstructions = {
  'Push-ups': 'Start in plank position. Lower body until chest nearly touches floor, push back up.',
  'Bodyweight Squats': 'Stand with feet shoulder-width apart. Lower as if sitting in chair, return to standing.',
  'Burpees': 'Start standing, drop to squat, jump back to plank, do push-up, jump forward, jump up.',
  'Plank': 'Hold push-up position with body in straight line from head to heels.',
  'Mountain Climbers': 'Start in plank, alternate bringing knees toward chest rapidly.',
  'Jumping Jacks': 'Jump feet apart while raising arms overhead, return to starting position.',
  'Lunges': 'Step forward, lower hips until both knees are 90 degrees, return to start.',
  'High Knees': 'Run in place bringing knees up toward chest as high as possible.',
  // Add more as needed
};

// Current workout state
let currentWorkout = [];
let currentExerciseIndex = 0;
let workoutTimer = null;
let isPaused = false;
let timeRemaining = 30;
let isResting = false;

// =================================
// WORKOUT GENERATION
// =================================

document.getElementById('workout-form').addEventListener('submit', function (event) {
  event.preventDefault();
  generateWorkout();
});

function generateWorkout() {
  const workoutType = document.getElementById('workout-type').value;
  const bodyPart = document.getElementById('body-part').value;
  const difficulty = document.getElementById('difficulty').value;
  const duration = parseInt(document.getElementById('duration').value);
  const equipment = document.getElementById('equipment').value;
  const fitnessGoal = document.getElementById('fitness-goal').value;

  // Get exercises from database
  let exercises = getExercisesFromDatabase(workoutType, bodyPart, equipment, difficulty);
  
  // Calculate number of exercises based on duration
  const exercisesNeeded = Math.floor(duration / 5); // ~5 minutes per exercise including rest
  
  // Shuffle and select exercises
  const shuffled = exercises.sort(() => 0.5 - Math.random());
  const selectedExercises = shuffled.slice(0, Math.min(exercisesNeeded, exercises.length));
  
  // Create workout structure
  currentWorkout = selectedExercises.map(exercise => ({
    name: exercise,
    duration: getDurationByDifficulty(difficulty),
    rest: getRestByDifficulty(difficulty),
    instructions: exerciseInstructions[exercise] || 'Perform this exercise with proper form.'
  }));

  displayWorkout(currentWorkout, duration, workoutType, difficulty);
  document.getElementById('timer-section').style.display = 'block';
  resetTimer();
}

function getExercisesFromDatabase(workoutType, bodyPart, equipment, difficulty) {
  // Navigate through the database structure
  const typeData = workoutDatabase[workoutType];
  if (!typeData) return getDefaultExercises();

  const bodyData = typeData[bodyPart] || typeData['full-body'];
  if (!bodyData) return getDefaultExercises();

  const equipmentData = bodyData[equipment] || bodyData['none'];
  if (!equipmentData) return getDefaultExercises();

  const exercises = equipmentData[difficulty];
  if (!exercises || exercises.length === 0) return getDefaultExercises();

  return exercises;
}

function getDefaultExercises() {
  return ['Push-ups', 'Bodyweight Squats', 'Plank', 'Jumping Jacks', 'Lunges', 'Mountain Climbers'];
}

function getDurationByDifficulty(difficulty) {
  const durations = { beginner: 30, intermediate: 45, advanced: 60 };
  return durations[difficulty] || 30;
}

function getRestByDifficulty(difficulty) {
  const rests = { beginner: 30, intermediate: 20, advanced: 15 };
  return rests[difficulty] || 30;
}

function displayWorkout(workout, duration, type, difficulty) {
  const container = document.getElementById('workout-plan');
  
  container.innerHTML = `
    <div class="workout-header">
      <h2>Your ${type.charAt(0).toUpperCase() + type.slice(1)} Workout</h2>
      <div class="workout-stats">
        <span class="stat">Duration: ${duration} min</span>
        <span class="stat">Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
        <span class="stat">Exercises: ${workout.length}</span>
      </div>
    </div>
    <div class="exercises-grid">
      ${workout.map((exercise, index) => `
        <div class="exercise-card" data-index="${index}">
          <div class="exercise-number">${index + 1}</div>
          <h3>${exercise.name}</h3>
          <p class="exercise-duration">${exercise.duration}s work / ${exercise.rest}s rest</p>
          <p class="exercise-instructions">${exercise.instructions}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// =================================
// ENHANCED TIMER FUNCTIONALITY
// =================================

document.getElementById("start-timer").addEventListener("click", startWorkout);
document.getElementById("pause-timer").addEventListener("click", pauseWorkout);
document.getElementById("skip-exercise").addEventListener("click", skipExercise);
document.getElementById("reset-timer").addEventListener("click", resetTimer);

function startWorkout() {
  if (currentWorkout.length === 0) {
    alert('Please generate a workout first!');
    return;
  }

  if (isPaused) {
    resumeWorkout();
  } else {
    currentExerciseIndex = 0;
    startExercise();
  }
  
  updateTimerControls(true);
}

function startExercise() {
  if (currentExerciseIndex >= currentWorkout.length) {
    completeWorkout();
    return;
  }

  const exercise = currentWorkout[currentExerciseIndex];
  isResting = false;
  timeRemaining = exercise.duration;
  
  updateTimerDisplay();
  updateExerciseInfo(exercise.name, false);
  updateProgress();
  highlightCurrentExercise();
  
  workoutTimer = setInterval(timerTick, 1000);
}

function startRest() {
  const exercise = currentWorkout[currentExerciseIndex];
  isResting = true;
  timeRemaining = exercise.rest;
  
  updateTimerDisplay();
  updateExerciseInfo('Rest', true);
  
  workoutTimer = setInterval(timerTick, 1000);
}

function timerTick() {
  timeRemaining--;
  updateTimerDisplay();
  
  if (timeRemaining <= 0) {
    clearInterval(workoutTimer);
    playBeep();
    
    if (isResting) {
      currentExerciseIndex++;
      startExercise();
    } else {
      startRest();
    }
  }
}

function pauseWorkout() {
  clearInterval(workoutTimer);
  isPaused = true;
  updateTimerControls(false);
}

function resumeWorkout() {
  isPaused = false;
  workoutTimer = setInterval(timerTick, 1000);
  updateTimerControls(true);
}

function skipExercise() {
  clearInterval(workoutTimer);
  if (!isResting) {
    currentExerciseIndex++;
  }
  startExercise();
}

function resetTimer() {
  clearInterval(workoutTimer);
  currentExerciseIndex = 0;
  isPaused = false;
  timeRemaining = 30;
  updateTimerDisplay();
  updateExerciseInfo('Get Ready!', false);
  updateProgress();
  updateTimerControls(false);
  clearHighlights();
}

function completeWorkout() {
  clearInterval(workoutTimer);
  updateTimerDisplay('Complete!');
  updateExerciseInfo('Workout Complete! Great job!', false);
  updateTimerControls(false);
  saveWorkoutToHistory();
  showCompletionMessage();
}

function updateTimerDisplay(text = null) {
  const display = document.getElementById("timer-display");
  if (text) {
    display.textContent = text;
  } else {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

function updateExerciseInfo(exerciseName, isRestPeriod) {
  document.getElementById('current-exercise').textContent = exerciseName;
  document.getElementById('exercise-counter').textContent = 
    `Exercise ${currentExerciseIndex + 1} of ${currentWorkout.length}${isRestPeriod ? ' - Rest Time' : ''}`;
}

function updateProgress() {
  const progress = ((currentExerciseIndex) / currentWorkout.length) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
}

function updateTimerControls(isRunning) {
  document.getElementById('start-timer').style.display = isRunning ? 'none' : 'inline-block';
  document.getElementById('pause-timer').style.display = isRunning ? 'inline-block' : 'none';
  document.getElementById('skip-exercise').style.display = isRunning ? 'inline-block' : 'none';
  
  if (isRunning) {
    document.getElementById('start-timer').textContent = 'Resume';
  } else {
    document.getElementById('start-timer').textContent = currentExerciseIndex === 0 ? 'Start Workout' : 'Resume';
  }
}

function highlightCurrentExercise() {
  clearHighlights();
  const currentCard = document.querySelector(`[data-index="${currentExerciseIndex}"]`);
  if (currentCard) {
    currentCard.classList.add('current-exercise');
  }
}

function clearHighlights() {
  document.querySelectorAll('.exercise-card').forEach(card => {
    card.classList.remove('current-exercise');
  });
}

function playBeep() {
  try {
    const beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    beep.play().catch(() => {
      // Fallback: create beep using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    });
  } catch (error) {
    console.log('Audio not available');
  }
}

// =================================
// WORKOUT HISTORY & TRACKING
// =================================

function saveWorkoutToHistory() {
  const workoutData = {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    type: document.getElementById('workout-type').value,
    duration: document.getElementById('duration').value,
    difficulty: document.getElementById('difficulty').value,
    exercises: currentWorkout.length,
    completed: true
  };

  let history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
  history.unshift(workoutData); // Add to beginning
  
  // Keep only last 10 workouts
  if (history.length > 10) {
    history = history.slice(0, 10);
  }
  
  localStorage.setItem('workoutHistory', JSON.stringify(history));
  displayWorkoutHistory();
}

function displayWorkoutHistory() {
  const history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
  const container = document.getElementById('workout-history');
  
  if (history.length === 0) {
    container.innerHTML = '<p>No workouts completed yet. Start your first workout!</p>';
    return;
  }
  
  container.innerHTML = history.map(workout => `
    <div class="history-item">
      <div class="history-date">${workout.date} at ${workout.time}</div>
      <div class="history-details">
        ${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)} • 
        ${workout.duration} min • 
        ${workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)} • 
        ${workout.exercises} exercises
      </div>
    </div>
  `).join('');
}

function showCompletionMessage() {
  alert('🎉 Congratulations! You completed your workout! Keep up the great work!');
}

// Clear history functionality
document.getElementById('clear-history').addEventListener('click', function() {
  if (confirm('Are you sure you want to clear your workout history?')) {
    localStorage.removeItem('workoutHistory');
    displayWorkoutHistory();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  displayWorkoutHistory();
});

// Mobile nav toggle (if not already defined)
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const btn = document.querySelector('.hamburger');
  links.classList.toggle('active');
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
}

/**
 * Today Screen - Main workout interface
 * Shows today's session with exercises and set logging
 */

import { useState } from 'react';
import { getSessionByPointer } from '@/data/sampleProgram';
import { getExerciseById } from '@/data/sampleExercises';
import type { SetLog } from '@/types/models';
import './TodayScreen.css';

export default function TodayScreen() {
  // For now, hardcode session pointer 0 (will come from ProgramInstance later)
  const [sessionPointer] = useState(0);
  const [currentWeek] = useState(1);

  const session = getSessionByPointer(sessionPointer);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="today-screen">
      {/* Header */}
      <header className="today-header">
        <div className="date">{today}</div>
        <div className="session-info">
          Week {currentWeek} • {session.name}
        </div>
      </header>

      {/* Readiness Check */}
      <section className="readiness-check">
        <h3>How do you feel today?</h3>
        <div className="mood-buttons">
          <button className="mood-btn mood-great">Great</button>
          <button className="mood-btn mood-okay">Okay</button>
          <button className="mood-btn mood-rough">Rough</button>
        </div>
      </section>

      {/* Warm-up */}
      <section className="warm-up">
        <h3>Warm-up</h3>
        <ul>
          <li>5 min light cardio</li>
          <li>Dynamic stretches</li>
          <li>Activation exercises</li>
        </ul>
      </section>

      {/* Main Exercises */}
      <section className="exercises">
        <h2>Main Exercises</h2>
        {session.exercises.map((sessionExercise, index) => {
          const exercise = getExerciseById(sessionExercise.exerciseId);
          if (!exercise) return null;

          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              targetSets={sessionExercise.targetSets}
              targetReps={sessionExercise.targetReps}
              restSeconds={sessionExercise.restSeconds}
              exerciseNumber={index + 1}
            />
          );
        })}
      </section>

      {/* PT Block */}
      {session.exercises.some((ex) => {
        const exercise = getExerciseById(ex.exerciseId);
        return exercise?.isPTExercise;
      }) && (
        <section className="pt-block">
          <h3>PT / Prehab Block</h3>
          <p>Focus on quality movement and mind-muscle connection</p>
        </section>
      )}

      {/* Finish Workout Button */}
      <footer className="workout-footer">
        <button className="finish-btn">Finish Workout</button>
      </footer>
    </div>
  );
}

// ==================== EXERCISE CARD ====================

interface ExerciseCardProps {
  exercise: any;
  targetSets: number;
  targetReps: string;
  restSeconds: number;
  exerciseNumber: number;
}

function ExerciseCard({
  exercise,
  targetSets,
  targetReps,
  restSeconds,
  exerciseNumber,
}: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [sets, setSets] = useState<Partial<SetLog>[]>(
    Array.from({ length: targetSets }, (_, i) => ({
      setNumber: i + 1,
      actualWeight: 0,
      actualReps: 0,
      painFlag: false,
    }))
  );

  const handleSetChange = (setIndex: number, field: string, value: any) => {
    const newSets = [...sets];
    newSets[setIndex] = { ...newSets[setIndex], [field]: value };
    setSets(newSets);
  };

  const muscleGroupsText = exercise.muscleGroups.join(', ');
  const restMinutes = Math.floor(restSeconds / 60);
  const restSecondsRemainder = restSeconds % 60;
  const restText =
    restMinutes > 0
      ? `${restMinutes}:${restSecondsRemainder.toString().padStart(2, '0')}`
      : `${restSeconds}s`;

  return (
    <div className={`exercise-card ${expanded ? 'expanded' : ''}`}>
      {/* Card Header */}
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <div className="exercise-number">{exerciseNumber}</div>
        <div className="exercise-info">
          <h4>{exercise.name}</h4>
          <div className="exercise-meta">
            {muscleGroupsText} • {targetSets} sets × {targetReps} reps
            {exercise.youtubeUrl && ' • 🎥 Video'}
          </div>
        </div>
        <div className="expand-icon">{expanded ? '▼' : '▶'}</div>
      </div>

      {/* Card Body - Set Logging */}
      {expanded && (
        <div className="card-body">
          {/* Set Logging Table */}
          <table className="set-table">
            <thead>
              <tr>
                <th>Set</th>
                <th>Weight (lbs)</th>
                <th>Reps</th>
                <th>Pain?</th>
                <th>✓</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set, index) => (
                <tr key={index} className={set.actualReps ? 'completed' : ''}>
                  <td>{set.setNumber}</td>
                  <td>
                    <input
                      type="number"
                      value={set.actualWeight || ''}
                      onChange={(e) =>
                        handleSetChange(index, 'actualWeight', Number(e.target.value))
                      }
                      placeholder="0"
                      className="weight-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={set.actualReps || ''}
                      onChange={(e) =>
                        handleSetChange(index, 'actualReps', Number(e.target.value))
                      }
                      placeholder="0"
                      className="reps-input"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={set.painFlag || false}
                      onChange={(e) =>
                        handleSetChange(index, 'painFlag', e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    {set.actualReps && set.actualReps > 0 ? '✓' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="action-btn">Copy Previous Set</button>
            <button className="action-btn">Copy Last Workout</button>
            <span className="rest-time">Rest: {restText}</span>
          </div>

          {/* Substitute Exercise */}
          <button className="substitute-btn">Substitute Exercise</button>
        </div>
      )}
    </div>
  );
}

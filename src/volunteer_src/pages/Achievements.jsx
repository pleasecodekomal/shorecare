// src/pages/Achievements.jsx
import { useState } from 'react';
import quizzes from '../data/quizzes';
export default function Achievements()

{
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const userXP = score * 10;
  const badges = score >= 3 ? '🌟 Elite Volunteer' : score === 2 ? '⭐ Active Helper' : score === 1 ? '🎖️ First Timer' : '🔰 Newcomer';

  const handleSubmit = () => {
    if (selected === quizzes[current].answer) {
      setScore(prev => prev + 1);
    }
    if (current + 1 < quizzes.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setCompleted(true);
    }
  };

const stats = [
  { label: 'Total Cleanups', value: 27, color: 'bg-[#0077b6]' },
  { label: 'XP', value: userXP, color: 'bg-[#00b4d8]' },
  { label: 'Wall Contributions', value: 19, color: 'bg-[#0077b6]' },
  { label: 'Quizzes Won', value: score, color: 'bg-[#00b4d8]' }
];

return (
  <div className="p-6 bg-[#fdf6e3] min-h-screen">
    <br />
    <h2 className="text-3xl font-bold mb-6 text-[#005f73]">🏅 Achievements</h2>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mt-8 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`${stat.color} text-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300`}
        >
          <div className="text-4xl font-extrabold">{stat.value}</div>
          <div className="mt-3 text-lg font-medium">{stat.label}</div>
        </div>
      ))}
    </div>

      <div className="text-center">
        <button className="btn-primary" onClick={() => setShowQuiz(true)}>🎯 Take Quiz to Earn XP</button>
      </div>

      {showQuiz && (
        <div className="pretty-box mt-8">
          <h3 className="text-xl font-semibold mb-4 text-[#0a9396]">📚 Beach Cleanup Quiz</h3>

          {!completed ? (
            <div>
              <p className="mb-3 font-medium">{quizzes[current].question}</p>
              <div className="space-y-2">
                {quizzes[current].options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`block p-2 rounded-md cursor-pointer border transition ${selected === option ? 'bg-[#cce3dc] border-[#0077b6]' : 'border-gray-300'}`}
                  >
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selected === option}
                      onChange={() => setSelected(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <button onClick={handleSubmit} disabled={!selected} className="btn-primary mt-4">
                {current === quizzes.length - 1 ? 'Finish Quiz' : 'Next'}
              </button>
            </div>
          ) : (
            <p className="text-green-700 font-medium">🎉 Quiz Completed! Your XP has been updated.</p>
          )}
        </div>
      )}
    </div>
  );
}

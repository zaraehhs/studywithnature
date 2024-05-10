import React from 'react'

const PomodoroForm = ({showDuringDisplay, startTimer}) => {
  return (
    <form id="pomodoro-form" className={`${showDuringDisplay ? 'hidden' : 'block'}`} onSubmit={startTimer}>
    <div className="flex justify-between gap-2 my-5 text-left">
        <div>
            <label className="text-left text-sm"> Session Time: </label>
            <input className="rounded-full w-full p-1" type="number" id="sessionTime" min="1" max="200" required />
        </div>

        <div>
            <label className="text-left text-sm"> Short Break: </label>
            <input className="rounded-full w-full p-1" type="number" id="shortBreak" min="1" max="200" required />
        </div>

        <div>
            <label className="text-left text-sm"> Long Break: </label>
            <input className="rounded-full w-full p-1" type="number" id="longBreak" min="1" max="200" required />
        </div>
    </div>
    <button className="text-white text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2" id="submit" type="submit"> Start </button>
</form>
  )
}
export default PomodoroForm
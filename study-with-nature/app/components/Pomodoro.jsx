import React from 'react'

const Pomodoro = () => {
    let timer = {
        sessionTime: 0,
        shortBreak: 0,
        longBreak: 0,
        pausedTime: 0,
        sessions: 1,
        mode: 'Study time!',
    }
    
    let interval;
    let state = true;


  return (
    <div className="bg-[#eff2f6b5] rounded-lg mt-8 p-4 text-black box-shadow">
                        <div id="pomodoro-start">
                            <h1 className="font-bold text-xl"> Pomodoro </h1>
                            <p class=""> Set times to plan your study session </p>

                            <form id="pomodoro-form" className="">
                                <div className="flex justify-between gap-2 my-5">
                                    <div>
                                        <label for="sessionTime" className="text-left text-sm"> Session Time: </label>
                                        <input className="rounded-full w-full p-1" type="number" id="sessionTime" min="1" max="200" required />
                                    </div>

                                    <div>
                                        <label for="sessionTime" className="text-left text-sm"> Short Break: </label>
                                        <input className="rounded-full w-full p-1" type="number" id="shortBreak" min="1" max="200" required />
                                    </div>

                                    <div>
                                        <label for="sessionTime" className="text-left text-sm"> Long Break: </label>
                                        <input className="rounded-full w-full p-1" type="number" id="longBreak" min="1" max="200" required />
                                    </div>
                                </div>
                                <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2" id="submit" type="submit"> Start </button>
                            </form>
                           
                        </div>

                        <div id="pomodoro-during" className="text-center hidden">
                            <h1 class="text-body__title text-left"> Pomodoro </h1>
                            <p class="text-left" id="sessionDescription"> Study Session Time </p>

                            <h2 id="timeDisplay"> 0:00 </h2>

                            <button class="button-black padding-small text-subtitle" id="pausePomodoro"> Pause </button>
                            <button class="button-black padding-small text-subtitle" id="endPomodoro"> End Session</button>
                        </div>
                    </div>
  )
}

export default Pomodoro
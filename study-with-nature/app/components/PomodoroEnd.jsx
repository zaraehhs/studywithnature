import React, {useState, useEffect} from 'react'

const PomodoroEnd = ({setDuringDisplay, showDuringDisplay, setTimeDisplay, setTotalSeconds, setIntervalToggle, setSessionCount, setSoundToggle, setPomodoroMode, sessionCount}) => {

  const [endSession, setEndSession]  = useState(false);

      // useEffect(() => {

      // if (endSession) {
      //   setSoundToggle(false);
      //   setIntervalToggle(false)
      //   setDuringDisplay(false);
      //   setTimeDisplay("0:00");
      //   setTotalSeconds(0);
      //   setSessionCount(0); 
      //   setPomodoroMode("Study time!");

      //   console.log("Session count:" + sessionCount);
      // }
      //   },[endSession]);
    
  return (
    <button className={`${showDuringDisplay ? 'block' : 'hidden'} text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2`} onClick={setEndSession(true)}> End Session</button>
  )
}

export default PomodoroEnd
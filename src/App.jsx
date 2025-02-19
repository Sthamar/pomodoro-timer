import React, { useState, useEffect } from "react";

const App = () => {
  const [workTime, setWorkTime] = useState(25 * 60);  // Work time in seconds
  const [breakTime, setBreakTime] = useState(5 * 60);  // Break time in seconds
  const [timeLeft, setTimeLeft] = useState(workTime);  // Time left on the timer
  const [isWorking, setIsWorking] = useState(true);    // State to toggle between work/break
  const [isRunning, setIsRunning] = useState(false);   // Timer running state
  const click = new Audio('./sounds/click.mp3')
  const alarm = new Audio('./sounds/alarm.mp3')
  useEffect(() =>{
    let timer;

    if(isRunning){
      timer = setInterval(() =>{
        setTimeLeft((prevTime) => {
          if(prevTime > 0){
            return prevTime - 1;
          }else{
            setIsWorking(!isWorking);
            alarm.play();
            return isWorking ? breakTime : workTime
          }
        })
      },1000)
    }else{
      clearInterval(timer);
    }
    return () => clearInterval(timer);

  },
  [isWorking,breakTime, isRunning, workTime]

)

const toggleTimer = () =>{
  setIsRunning((prevTime) => !prevTime);
  click.play();
};

const resetTimer = () =>{
  setIsRunning(false);
  setIsWorking(true);
  setTimeLeft(workTime);
  click.play();
};

  const formatTime = (time) =>{
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0':''} ${minutes} : ${seconds < 10 ? '0':''}${seconds} `
  }
 return(
  <div className="hero min-h-screen">
    <div className="hero-content flex-col gap-16">
    <h1 className="text-xl -rotate-45 bg-primary rounded-t-full shadow-lg p-5 font-serif font-bold">Pomodoro</h1>
    <div className="card bg-secondary p-10 rounded-full text-center shadow-lg shrink-0 w-96">
      <h2 className="text-2xl font-bold text-primary-content">{isWorking ? 'Work Time' : 'breakTime'}</h2>
      <div className="m-4">
        <button onClick={toggleTimer} className={`btn ${isRunning ? 'btn-warning' : 'btn-success'} m-4 mt-0 mb-0`}>{isRunning ? 'Pause':'start'}</button>
        <button onClick={resetTimer} className="btn btn-error m-4 mt-0 mb-0">Reset</button>
      </div>
      <div className="bg-slate-200 shadow-inner shadow-xl w-fit self-center p-2 rounded-md font-mono text-2xl font-bold shadow-md">
        <h3 className="text-4xl">{formatTime(timeLeft)}</h3>
      </div>
      <div className="mt-4 flex self-center gap-4">
        <div className="form-control">
          <label className="label-text">Work Time (min) </label>
          <input type="number" 
          min='1'
          value={workTime/60}
          onChange={(e) => setWorkTime(e.target.value * 60)}
          className="input input-primary w-14 text-center self-center"
          />
        </div>
        <div className="form-control">
          <label className="label-text">Break Time (min)</label>
          <input type="number"
          min='1'
          value={breakTime / 60}
          onChange={(e) => setTimeLeft(e.target.value * 60)}
          className="input input-primary w-14 text-center self-center"
          />
        </div>
      </div>
      
    </div>
    
    </div>
    
  </div>
 )
};

export default App;

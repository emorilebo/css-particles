import React from 'react';
import './style.css';
//Task Bar - interactivity with the app
//Health Bar - information pertinent to the user
import LeavesParticles from '../../Particles/LeavesParticles';
import RainParticles from '../../Particles/RainParticles';
import SmokeParticles from '../../Particles/SmokePartcles';
import { useState } from 'react';

import ashleighIdle from './images/ashleigh_idle_1.GIF';
import ashleighDamageOne from './images/ashleigh_damage_1.GIF';
import ashleighDamageTwo from './images/ashleigh_damage_2.GIF';
import ashleighDamageThree from './images/ashleigh_damage_3.GIF';
import { useNavigate } from 'react-router-dom';

export const FightPage2 = () => {
  // this page is for the fight page screen view.
  let navigate = useNavigate();

  // state variables for healthbar
  const [noFirstTask, setFirstTask] = useState(true);
  const [numOfTasks, setNumOfTasks] = useState(0);
  const [health, setHealth] = useState(100);
  const [idleImage, changeImage] = useState(ashleighIdle);

  /* START OF FUNCTIONS FOR HEALTHBAR */
  function CompleteTask() {
    if (numOfTasks !== 0 && !noFirstTask) {
      setNumOfTasks(numOfTasks - 1);

      if (numOfTasks === 1) {
        navigate('/ashwin');
      }
    }
    Attack(noFirstTask ? 0 : health / numOfTasks);

    if (numOfTasks < 3) {
      changeImage(ashleighDamageOne);
    } else if (numOfTasks < 5) {
      changeImage(ashleighDamageTwo);
    } else {
      changeImage(ashleighDamageThree);
    }
  }

  // decreases health.
  function Attack(inc) {
    if (health > 0) {
      setHealth(health - inc);
    }
  }

  /* END OF HEALTHBAR FUNCTIONS */

  /* START OF TASKBAR FUNCTIONS */

  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  const inputTextHandler = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    if (inputText !== '') {
      setTodos([
        ...todos,
        { text: inputText, completed: false, id: Math.random() * 1000 },
      ]);
      setInputText('');

      if (noFirstTask) {
        setFirstTask(false);
      }

      setNumOfTasks(numOfTasks + 1);
    }
  };

  /* END OF TASKBAR FUNCTIONS */

  return (
    <>
      {health > 66 && <LeavesParticles />}

      {health < 66 && health > 40 && <RainParticles />}

      {health < 40 && <SmokeParticles />}
      <div className='root'>
        <div className='task-div'>
          {/* <TaskBar
            inputText={inputText}
            inputTextHandler={inputTextHandler}
            submitTodoHandler={submitTodoHandler}
            todos={todos}
            setTodos={setTodos}
            CompleteTask={CompleteTask}
            noFirstTask={noFirstTask}
            setNumOfTasks={setNumOfTasks}
            numOfTasks={numOfTasks}
          /> */}
        </div>

        <div className='right-side'>
          <div className='health-div'>
            {/* <HealthBar health={health} /> */}
          </div>
          <div className='monster-div'>
            <img src={idleImage} />
          </div>
        </div>
      </div>
    </>
  );
};

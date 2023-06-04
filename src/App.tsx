import { useState } from 'react';
import styles from  './App.module.css';
import useConsoleData from './hooks/useConsoleData';
import { consoleTypes } from './utils/consoleTypes';
import ConsoleTypes from './components/ConsoleTypes';

function App() {

  const {allLogs, resetLogs, selectedConsoleType, setSelectedConsoleType} = useConsoleData(500);

  const [newLog, setNewLog] = useState("");

  const onPressEnter=(e: any)=> {
      if(e.code === "Enter") {
        console.log(newLog);
        setNewLog("");
      }
  }

  const onSelectConsoleType=(type: string)=> {
    setSelectedConsoleType(type);
  }


  return (
    <>
     <div className={styles.console_window_wrapper}> 
     
     <div className={styles.console_window_header}>
        <span>Console</span>
        <button onClick={()=> {
          resetLogs()
        }}>Clear</button>
     </div>


     <div className={styles.console_content_wrapper}>

        <div className={styles.console_content_type}>
           {consoleTypes.map((type)=> {
            return (
              <ConsoleTypes 
              type={type} 
              selectedConsoleType={selectedConsoleType} 
              onSelectConsoleType={onSelectConsoleType }
              />
            )
           })}

        </div>
        <div className={styles.console_content_section}>
          {allLogs?.map((log, index)=> {
            return (
              <p 
              className={styles.individual_log_content} 
              style={selectedConsoleType === "Errors" ? {color: "red"}: {}} 
              key={index}>
                {log}
              </p>
            )
          })}
          <input type="text" value={newLog} 
          placeholder='Enter your log here'
          onKeyDown={onPressEnter}
          onChange={(e)=> {
            setNewLog(e.target.value);
          }}
          />
        </div>
     </div>
     </div>
    </>
  )
}

export default App



// Yesss !! We did it.
// Now, we can simulate other console functions such as debug, warn is similar way !!! 
// Thank you for watching ......
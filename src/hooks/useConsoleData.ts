



// lets override the default console log method and intercept what is going to be logged before hand.

import { useEffect, useState } from "react";


const extendedConsole = console as MyConsole;

extendedConsole.logs = [];
extendedConsole.errors = [];

const defaultLogger = console.log.bind(console);
const defaultErrorLogger = console.error.bind(console);


console.log = function () {
    defaultLogger.apply(console, Array.from(arguments));
    extendedConsole.logs?.push(Array.from(arguments));
}

console.error = function () {
    defaultErrorLogger.apply(console, Array.from(arguments));
    extendedConsole.errors?.push(Array.from(arguments));
}

let intervalId: number | undefined;


const getLogsByType=(type: string)=> {
    switch(type) {
        case "Logs": 
            return extendedConsole?.logs;
        case "Errors": 
            return extendedConsole?.errors;

        default: 
            return extendedConsole?.logs;
    }
}



const useConsoleData=(fetchInterval: number)=>{

    const [allLogs, setAllLogs] = useState<any[] | undefined>([]);
    const [selectedConsoleType, setSelectedConsoleType] = useState("Logs");


    const resetLogs=()=> {
        extendedConsole.logs = [];
        setAllLogs([]);
        console.clear();
    }

    useEffect(()=> {

        clearInterval(intervalId);
        setAllLogs([]);
        // lets capture the log in every interval.
        intervalId = setInterval(()=>{
            // the extendedConsole.logs is an object type. Not an array. we need to convert it first;
            const logContents = getLogsByType(selectedConsoleType);
            if(logContents) {
                setAllLogs(Array.from(logContents));
            }
        }, fetchInterval);

        return ()=> {
            clearInterval(intervalId);
        }
    }, [selectedConsoleType]);


    return {
        allLogs,
        resetLogs,
        selectedConsoleType,
        setSelectedConsoleType
    }

}

export default useConsoleData;
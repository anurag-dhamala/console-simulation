import { IndividualConsoleType } from "../ts/interfaces"
import styles from "./style.module.css";

interface ConsoleTypesInterface {
    type: IndividualConsoleType;
    onSelectConsoleType: (type: string)=> void;
    selectedConsoleType: string;
}

const ConsoleTypes=(props: ConsoleTypesInterface)=> {

    const { type, selectedConsoleType } = props;

    return (

        <div 
        style={selectedConsoleType === type.name ?{ backgroundColor: "#565656" }: {}}
        className={styles.console_type_wrapper}
         onClick={()=> {
            props.onSelectConsoleType(type.name);
        }}>
            <span>{type.name}</span>
        </div>
    )
}

export default ConsoleTypes;
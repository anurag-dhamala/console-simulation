
interface MyConsole extends Console { 
    logs?: Array<any>;
    errors?: Array<any>;

}

declare var Console: MyConsole;
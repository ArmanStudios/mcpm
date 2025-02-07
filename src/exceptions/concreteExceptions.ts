export class ConcreteFileNotFoundException extends Error {
    name = "ConcreteFileNotFoundException";
    message = "Cannot find concrete.json file on the current path. are you sure mcpm is initialized for the directory? (mcpm init)";
    constructor() {
        super();
        Object.setPrototypeOf(this, ConcreteFileNotFoundException.prototype);
    }
}
export class InvalidConcreteFileException extends Error {
    name = "InvalidConcreteFileException";
    message = "Cannot parse concrete.json file. please check concrete.json file for any syntax/structure mistakes."
    constructor() {
        super();
        Object.setPrototypeOf(this, InvalidConcreteFileException.prototype);
    }
}
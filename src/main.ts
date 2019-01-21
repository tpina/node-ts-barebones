import { Logger } from './utils/logger';
import { Person } from './person.interface';
import { Human } from './human';

const person: Person = { firstName: 'John', lastName: 'Doe', age: 40 };

const logger = new Logger('main');

logger.log('Its ALIVE!!!!!');
const john = new Human(person);
john.printPerson();

logger.warn("I'm about to die");

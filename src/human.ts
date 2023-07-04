import { Person } from './person.interface';
import { Logger } from './utils/logger';

export class Human {
  private readonly logger: Logger;
  private person: Person;

  constructor(person: Person) {
    this.logger = new Logger('person');
    this.logger.log('Logger created');
    this.logger.log('Creating human');
    this.person = person ?? {
      firstName: 'John',
      lastName: 'Doe',
      age: 40,
    };
  }

  printPerson(): string {
    const message: string = [
      this.person.firstName,
      this.person.lastName,
      'is',
      this.person.age,
      'years old',
    ].join(' ');
    this.logger.log(message);
    return message;
  }
}

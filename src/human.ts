import { Person } from './person.interface';
import { Logger } from './utils/logger';

export class Human {
  private readonly logger: Logger;
  constructor(private person?: Person) {
    this.logger = new Logger('person');
    this.logger.log('Logger created');
    this.logger.log('Creating human');
    this.person = person;
  }

  printPerson(): void {
    const message: string = [
      this.person.firstName,
      this.person.lastName,
      'is',
      this.person.age,
      'years old',
    ].join(' ');
    this.logger.log(message);
  }
}

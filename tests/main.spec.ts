import { Person } from '../src/person.interface';
import { Human } from '../src/human';

describe('it should create a new person', () => {
  it('should create a new person', () => {
    const person: Person = { firstName: 'John', lastName: 'Doe', age: 40 };

    const john = new Human(person);

    expect(john).toBeDefined();
  });
});

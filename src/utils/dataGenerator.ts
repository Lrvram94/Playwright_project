export class NewEmployeeDataGenerator {
  private static firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna'
  ];

  private static lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'
  ];

  private static middleNames = [
    'Alexander', 'Marie', 'James', 'Ann', 'Michael', 'Rose', 'Elizabeth', 'Grace',
    'William', 'Nicole', 'Anthony', 'Michelle', 'Joseph', 'Christine', 'Charles',
    'Catherine', 'Robert', 'Amanda', 'Christopher', 'Stephanie', 'Matthew', 'Carolyn'
  ];

  static generateRandomEmployee() {
    const firstName = this.getRandomItem(this.firstNames);
    const middleName = this.getRandomItem(this.middleNames);
    const lastName = this.getRandomItem(this.lastNames);
    const timestamp = Date.now().toString().slice(-4);
    
    return {
      firstName,
      middleName,
      lastName,
      employeeId: `EMP${timestamp}`
    };
  }

  private static getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
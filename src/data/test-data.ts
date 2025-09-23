export interface TestUser {
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

export interface TestEnvironment {
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  retries: number;
}

// Generic test users data (can be customized for any application)
export const testUsers: { [key: string]: TestUser } = {
  validUser: {
    username: 'testuser',
    password: 'password123',
    email: 'testuser@example.com',
    role: 'user'
  },
  adminUser: {
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    role: 'admin'
  },
  invalidUser: {
    username: 'invalid',
    password: 'wrongpassword',
    email: 'invalid@example.com',
    role: 'guest'
  }
};

// Generic test data for common testing scenarios
export const testData = {
  // Search functionality test data
  search: {
    validSearchTerms: ['automation', 'testing', 'playwright'],
    invalidSearchTerms: ['!@#$%', '', '   '],
    specialCharacterSearch: ['<script>', 'SELECT * FROM users', '../../etc/passwd']
  },
  
  // Form validation test data
  forms: {
    validEmails: ['test@example.com', 'user.name@domain.co.uk', 'test+tag@example.org'],
    invalidEmails: ['invalid-email', '@example.com', 'test@', 'test.com', 'test..test@example.com'],
    
    validPhoneNumbers: ['+1-555-123-4567', '(555) 123-4567', '555.123.4567'],
    invalidPhoneNumbers: ['123', 'abc-def-ghij', '555-555-555555'],
    
    validPasswords: ['Password123!', 'ComplexP@ss1', 'SecurePass2023#'],
    invalidPasswords: ['123', 'password', 'PASSWORD', '12345678'],
    
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10),
    specialCharacters: '!@#$%^&*()_+{}[]|;:,.<>?',
    sqlInjection: "'; DROP TABLE users; --",
    xssPayload: '<script>alert("XSS")</script>'
  },
  
  // File upload test data
  files: {
    validFileTypes: ['.txt', '.pdf', '.jpg', '.png', '.csv'],
    invalidFileTypes: ['.exe', '.bat', '.script'],
    largeFakeFileName: 'very_long_filename_'.repeat(10) + '.txt',
    specialCharFileName: 'file with spaces & symbols!@#.txt'
  },
  
  // Common test scenarios
  scenarios: {
    positiveFlow: 'happy_path',
    negativeFlow: 'error_handling',
    edgeCase: 'boundary_testing',
    securityTest: 'security_validation'
  }
};

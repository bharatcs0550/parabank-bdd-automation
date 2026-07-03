// Generates unique user data for each test run
// so registration never fails with "username already exists"

function generateUser() {
  const timestamp = Date.now(); // unique number each run

  return {
    firstName: 'Bharat',
    lastName: 'Singh',
    address: '123 Main Street',
    city: 'Noida',
    state: 'UP',
    zipCode: '201301',
    phone: '9876543210',
    ssn: '123-45-6789',
    username: `bharat_${timestamp}`, // unique username
    password: 'Test@1234',
  };
}

module.exports = { generateUser };
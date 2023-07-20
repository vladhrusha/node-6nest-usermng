# Task 6.1 User Management & 6.2 Nestjs Testing

http://localhost:3000/task6/v1/users GET
http://localhost:3000/task6/v1/user/:nickname GET
http://localhost:3000/task6/v1/user POST
http://localhost:3000/task6/v1/login POST
http://localhost:3000/task6/v1/user DELETE
http://localhost:3000/task6/v1/user PUT

# Task 3 Chat Bots

# Setup

npm init -y

npm i

npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit

// "test": "jest",

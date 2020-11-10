# Swimmingly

Backend - Node.js, PostgreSQL

Frontend - Next.js/React.js

### To Run

Needed: Node.js, yarn, git, postgreSQL, redis

1. Clone project

```
git clone https://github.com/henryboisdequin/swimmingly.git
cd swimmingly/
```

2. Install Dependencies

```
cd server/
yarn

cd .. && cd web/
yarn
```

3. Start PostgreSQL with Username: postgres and Password: postgres

```
createdb swimminglydb
```

4. Install and Start Redis
   <a href="https://www.youtube.com/watch?v=JGvbEk4jtrU">YouTube Installation of Redis Tutorial</a>

5. Start Server

1st Terminal:

```
cd server/
yarn watch
```

2nd Terminal:

```
cd server/
yarn dev
```

6. Start Frontend

```
cd web/
yarn dev
```

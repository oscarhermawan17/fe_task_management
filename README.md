## Front End - Task Managemenent App
Front End Task Management

### 1. Overview of this application
This is an app for organizing users' tasks. Users can view their task lists, create new tasks, update existing tasks, and delete tasks.
Technologies Used:
<ul>
  <li>React JS</li>
  <li>Vite JS</li>
  <li>Material UI</li>
</ul>
App running on [here](http://203.194.112.12:3017) with default username: <code>oscar</code>, and password: <code>oscar</code><br/>
The BackEnd (RESTful API app) can be seen [here](https://github.com/oscarhermawan17/be_task_management)


### 2. Minimun Requirement
Node Version 18.x.x. I recommend using Node Version 20.x.x (LTS Version).

### 3. How To Run This App (Step by Step) ?
<ul>
  <li>
    Rename .env.example file to be .env (in the root folder)
    <ul>
      <li>VITE_PORT=<code>port</code> (<code>port</code> is the port that will run this app)</li>
      <li>VITE_API_URL=<code>api</code> (<code>api</code> is the endpoint URL that will be used)<li>
    </ul>
  </li>
  <li>Run <code>npm install</code>. This command will download all modules and may take a while</li>
  <li>Run <code>npm run dev</code>. This command will run our application in development mode</li>
  <li>Open <code>http://localhost:port</code> on the browser</li>
</ul>

### 4. How To Run Unit Test ?
Make sure you have completed the third step first. (Run <code>npm install</code>)
Run <code>npm run test</code> 


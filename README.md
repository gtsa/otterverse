
## **OtterVerse**

**OtterVerse** is a modular, Dockerized platform designed to serve as a hub for interconnected projects and applications. Built to evolve over time, it supports a diverse ecosystem of technologies and services — ranging from APIs and dashboards to blogs, backlogs, autonomous web, mobile, and other apps. Scalable and extensible, OtterVerse unifies services, tools, and applications within a cohesive system powered by a microservices architecture and a centralized proxy.

### **Key Features**
- **Microservices Architecture:** A collection of modular applications, each independently developed and deployed, allowing seamless integration and scalability.
- **Multi-Technology Support:** Compatible with Ruby on Rails, React, Python, Django, Node.js, and other frameworks.
- **Dockerized Environment:** Simplified setup and deployment using Docker, with configurations for both development and production.
- **Extensible Platform:** Easily add new projects or services, such as blogs, APIs, task managers, or analytics tools.
- **Centralized Proxy:** A unified entry point for routing traffic across services using Nginx.

### **Services**
1. **API:** Backend service powered by Ruby on Rails, serving as the core API for data management.
2. **Frontend:** React-based user interface for a seamless and modern user experience.
3. **Proxy:** Nginx configuration for managing routes and service discovery.
4. **Static Apps:** Services like app1, backlog, blog, portfolio, and python are hosted via Nginx.
5. **ChronoQuest:** An engaging historical game application deployed as a separate Docker Compose stack and integrated via shared networking (using network aliases such as `chronoquest-frontend`).

### **Vision**
OtterVerse is not just a collection of applications—it's a platform to empower developers and teams to collaborate, build, and grow efficiently. The name reflects the collaborative nature of otters, symbolizing teamwork and adaptability.

### **Getting Started**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/otterverse.git
   cd otterverse
   ```
2. Spin up the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```
3. Access the platform:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3001`

### **Adding New Services**
To add a new service or project, place the service directory outside of the root directory of `otterverse` (e.g., `../app1`, `../blog`, etc.) and configure it similarly to the existing services.

For example:
```plaintext
otterverse
  └──
  └──
app1
  └── index.html
blog
  └── index.html
python
  └── index.html
chronoquest
  └──
  └──
```

### Adding New Services

To integrate a new service or project into Otterverse, place the new project's directory as a sibling to the Otterverse directory. This ensures that all projects reside at the same level in your workspace. For example, your workspace structure might look like this:

/workspace
<br>
├── otterverse
<br>
├── app1
<br>
├── blog
<br>
├── backlog
<br>
└── chronoquest

In this structure:
- **otterverse** contains the core platform (including the centralized Nginx proxy, API, frontend, etc.).
- **app1, blog, python,** and **chronoquest** are independent projects that can be integrated into Otterverse via updates to the Docker Compose files and proxy configurations.

After organizing your projects this way, update the `docker-compose.yml` and the Nginx configuration in Otterverse to include and route to these new services as needed.

Make sure to update the `docker-compose.yml` to include the new service, following the pattern for the existing services.

### **Configuring Subdomains**
For each service, you can create its own subdomain (e.g., `app1.localhost`, `blog.localhost`) by adding entries to your local machine’s `/etc/hosts` file. Here’s how to do it:

1. Open the `/etc/hosts` file:
   - On **Linux/macOS**, run:
     `sudo nano /etc/hosts`
   - On **Windows**, open Notepad as Administrator and navigate to:
     `C:\Windows\System32\drivers\etc\hosts`

2. Add the following entries:
   ```
   127.0.0.1   app1.localhost
   127.0.0.1   backlog.localhost
   127.0.0.1   blog.localhost
   127.0.0.1   python.localhost
   127.0.0.1   chronoquest.localhost
   ```

***(Or, if you use a custom domain, for example: "otter-verse.com", adjust accordingly, e.g., "app1.otter-verse.com", etc.)***

3. Save the file.

Now you can access each service via the respective subdomain (e.g., `http://blog.localhost`, `http://app1.localhost`, etc.).

## Double Deployment for ChronoQuest
ChronoQuest is deployed as a separate Docker Compose stack located in the `./chronoquest` directory. To deploy the complete platform, follow these steps:

1. **Set up a shared external network named *otterverse-net***
   ```bash
   docker network create otterverse-net
   ```

2. **First deploy the ChronoQuest Stack:**
   ```bash
   cd path/to/chronoquest/folder
   docker-compose down --remove-orphans
   docker-compose build --no-cache
   docker-compose up -d
   ```
   This stack includes the ChronoQuest **db**, **backend**, and **frontend** services (the frontend service is accessible via the network alias `chronoquest-frontend`).

3. **(Having deployed chronoquest stack) Deploy the OtterVerse Stack:**
   ```bash
   cd path/to/ottrerverse/folder
   docker-compose down --remove-orphans
   docker-compose build --no-cache
   docker-compose up -d
   ```
   The OtterVerse Nginx proxy routes requests (e.g., `/chronoquest/`) to `chronoquest-frontend` on the shared external network.

## Deployment Script
For convenience, you can use the following script (`deploy.sh`) to deploy both stacks sequentially (this script assumes that the two projects are organized as sibling directories):

```bash
#!/bin/bash
set -e

echo "Creating external network 'otterverse-net' if it doesn't exist..."
if ! docker network inspect otterverse-net > /dev/null 2>&1; then
  docker network create otterverse-net
fi

echo "Deploying ChronoQuest stack..."
cd chronoquest
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d
cd ..

echo "Deploying OtterVerse stack..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

echo "Deployment complete."
```

Make the script executable:
```bash
chmod +x deploy.sh
```
Then run it:
```bash
./deploy.sh
```

### **Future Additions**
- **Blog:** A Rails-powered blogging platform.
- **Backlog:** A task manager built with Node.js.
- **Analytics:** Data visualization tools using Python/Django.
- **Third-Party Integrations:** Support for external APIs and plugins.


## License & Contact
This project is licensed under the GNU General Public License v3.0.
For inquiries, please email [gtsagiannis@gmail.com](mailto:gtsagiannis@gmail.com).

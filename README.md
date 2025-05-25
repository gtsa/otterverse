
# OtterVerse

**OtterVerse** is a modular, Dockerized platform designed to serve as a hub for interconnected projects and applications. Built to evolve over time, it supports a diverse ecosystem of technologies and services — ranging from APIs and dashboards to blogs, backlogs, autonomous web, mobile, and other apps. Scalable and extensible, OtterVerse unifies services, tools, and applications within a cohesive system powered by a microservices architecture and a centralized proxy.

---

## **Key Features**

- **Microservices Architecture:** A collection of modular applications, each independently developed and deployed, allowing seamless integration and scalability.  
- **Multi-Technology Support:** Compatible with Ruby on Rails, React, Python, Django, Node.js, and other frameworks.  
- **Dockerized Environment:** Simplified setup and deployment using Docker, with configurations for both development and production.  
- **Extensible Platform:** Easily add new projects or services, such as blogs, APIs, task managers, or analytics tools.  
- **Centralized Proxy:** A unified entry point for routing traffic across services using Nginx.

---

## **Services**

1. **API** – Backend service powered by Ruby on Rails, serving as the core API for data management.  
2. **Frontend** – React-based user interface for a seamless and modern user experience.  
3. **Proxy** – Nginx configuration for managing routes and service discovery.  
4. **Static Apps** – Services like app1, backlog, blog, portfolio, and python are hosted via Nginx.  
5. **ChronoQuest** – An engaging historical game application deployed as a separate Docker Compose stack and integrated via shared networking (using network aliases such as `chronoquest-frontend`).

---

## **Vision**

OtterVerse is not just a collection of applications—it's a platform to empower developers and teams to collaborate, build, and grow efficiently. The name reflects the collaborative nature of otters, symbolizing teamwork and adaptability.

---

## **Getting Started**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/otterverse.git
   cd otterverse
   ```

2. **Spin up the services using Docker Compose**:
   ```bash
   docker-compose up --build
   ```

3. **Access the platform**:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3001`

---

## **Adding New Services**

To integrate a new service or project into Otterverse, place the new project's directory as a sibling to the Otterverse directory. This ensures that all projects reside at the same level in your workspace. For example, your workspace structure might look like this:

```
/workspace
├── otterverse
├── app1
├── blog
├── backlog
└── chronoquest
```

In this structure:

- **otterverse** contains the core platform (including the centralized Nginx proxy, API, frontend, etc.).
- **app1**, **blog**, **python**, and **chronoquest** are independent projects that can be integrated into Otterverse via updates to the Docker Compose files and proxy configurations.

After organizing your projects this way, update the `docker-compose.yml` and the Nginx configuration in Otterverse to include and route to these new services as needed.

Make sure to update the `docker-compose.yml` to include the new service, following the pattern for the existing services.

---

## **Configuring Subdomains**

For each service, you can create its own subdomain (e.g., `app1.localhost`, `blog.localhost`) by adding entries to your local machine’s `/etc/hosts` file. Here’s how to do it:

1. **Open** the `/etc/hosts` file:
   - On **Linux/macOS**, run:
     ```bash
     sudo nano /etc/hosts
     ```
   - On **Windows**, open Notepad as Administrator and navigate to:
     ```
     C:\Windows\System32\drivers\etc\hosts
     ```

2. **Add** the following entries (example for `.localhost` usage):
   ```
   127.0.0.1   app1.localhost
   127.0.0.1   backlog.localhost
   127.0.0.1   blog.localhost
   127.0.0.1   python.localhost
   127.0.0.1   chronoquest.localhost
   ```

   Or if you have a custom domain, e.g. `otter-verse.com`, add:
   ```
   127.0.0.1   app1.otter-verse.com
   127.0.0.1   backlog.otter-verse.com
   127.0.0.1   blog.otter-verse.com
   ...
   ```

3. **Save** the file. Now each service is accessible at its respective subdomain (e.g., `http://blog.localhost`).

---

## **Double Deployment for ChronoQuest**

ChronoQuest is deployed as a separate Docker Compose stack located in the `./chronoquest` directory. To deploy the complete platform, follow these steps:

1. **Set up a shared external network named `otterverse-net`:**
   ```bash
   docker network create otterverse-net
   ```

2. **Deploy the ChronoQuest Stack**:
   ```bash
   cd path/to/chronoquest/folder
   docker-compose down --remove-orphans
   docker-compose build --no-cache
   docker-compose up -d
   ```
   This stack includes the ChronoQuest **db**, **backend**, and **frontend** services (the frontend service is accessible via the network alias `chronoquest-frontend`).

3. **Deploy the OtterVerse Stack**:
   ```bash
   cd path/to/otterverse/folder
   docker-compose down --remove-orphans
   docker-compose build --no-cache
   docker-compose up -d
   ```
   The OtterVerse Nginx proxy routes subdomains (e.g., `chronoquest.otter-verse.com`) to `chronoquest-frontend` and `chronoquest-backend` on the shared external network.

---

## **Important Note on Restarting ChronoQuest**

If you only restart ChronoQuest (for example, `docker-compose down && docker-compose up -d` inside the ChronoQuest folder) without also restarting the OtterVerse proxy, you may get a `502 Bad Gateway` from Nginx.  
This can happen because **Nginx caches the old container IPs** and does not always re-resolve them automatically, even with advanced settings.  

**Temporary Workaround**:  
- **Manually restart** the proxy container (in the OtterVerse project) after ChronoQuest restarts:
  ```bash
  cd path/to/otterverse
  docker-compose restart proxy
  ```
  This ensures Nginx is aware of the new ChronoQuest container IPs.

**Long-Term Solution**:  
- Consider using a dynamic reverse proxy like **Traefik** or **Caddy**, which automatically detects container restarts and re-resolves IPs.
- Or ensure **all** relevant containers are up before Nginx starts, e.g., by using healthchecks + `depends_on`.

---

## **Deployment Script**

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

---

### **Future Additions**
- **Blog**: A Rails-powered blogging platform.  
- **Backlog**: A task manager built with Node.js.  
- **Analytics**: Data visualization tools using Python/Django.  
- **Third-Party Integrations**: Support for external APIs and plugins.

---

## **License & Contact**

This project is licensed under the **GNU General Public License v3.0**.  
For inquiries, please email [gtsagiannis@gmail.com](mailto:gtsagiannis@gmail.com).

---

**Enjoy exploring and extending the OtterVerse platform!**
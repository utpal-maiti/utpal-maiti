### Docker Documentation and Overview

Docker is a platform designed to develop, ship, and run applications inside containers. Here, I'll guide you through each of the commands and steps you provided, explaining their purpose and context. Let's start with the basics and then delve into your specific commands.

### Basic Docker Concepts

**Containers**: Lightweight, standalone, and executable packages that include everything needed to run a piece of software, including the code, runtime, system tools, libraries, and settings.

**Images**: Read-only templates used to create containers. An image includes the application and its dependencies.

**Dockerfile**: A text file that contains a series of instructions on how to build a Docker image.

**Docker Hub**: A cloud-based repository where Docker users can create, test, store, and distribute container images.

### Step-by-Step Explanation

#### Installing Necessary Tools

1. **Install basic tools**:
   ```sh
   yum install wget curl tree vim dnf -y
   ```
   These tools (`wget`, `curl`, `tree`, `vim`, `dnf`) are useful for downloading files, editing configurations, and navigating directories.

#### Downloading Docker Packages

2. **Download Docker packages**:
   ```sh
   wget https://storebits.docker.com/ee/centos/sub-9bdbc30c-b30f-4f9d-8123-b1cde9950dd0/centos/7/x86_64/stable-19.03/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm
   wget https://storebits.docker.com/ee/centos/sub-9bdbc30c-b30f-4f9d-8123-b1cde9950dd0/centos/7/x86_64/stable-19.03/Packages/docker-ee-19.03.5-3.el7.x86_64.rpm
   wget https://storebits.docker.com/ee/centos/sub-9bdbc30c-b30f-4f9d-8123-b1cde9950dd0/centos/7/x86_64/stable-19.03/Packages/docker-ee-cli-19.03.5-3.el7.x86_64.rpm
   ```
   These commands download Docker Engine and CLI packages required to install Docker on CentOS 7.

#### Installing Docker

3. **Install Docker packages**:

   ```sh
   yum install *.rpm -y
   ```

   This installs all the downloaded RPM packages.

4. **Check Docker status**:

   ```sh
   systemctl status docker
   ```

   Checks the status of the Docker service to ensure it is installed correctly.

5. **Start Docker service**:
   ```sh
   systemctl start docker
   systemctl enable docker
   ```
   Starts the Docker service and enables it to start on boot.

#### Working with Docker Containers and Images

6. **List Docker images**:

   ```sh
   docker image ls --help
   ```

   Displays help information for listing Docker images.

7. **Pull Docker images**:

   ```sh
   docker pull httpd:latest
   docker pull registry1.abc.com/httpd:latest
   ```

   Downloads the latest `httpd` (Apache HTTP server) images from Docker Hub and a private registry.

8. **Navigate to Docker directory**:
   ```sh
   cd /var/lib/docker
   ls
   ```
   Changes directory to Docker's default storage location and lists its contents.

#### Running and Managing Containers

9. **Run a Docker container**:

   ```sh
   docker container run -d -p 21000:80 --name apache-1 httpd:latest
   ```

   Runs a detached (`-d`) Apache HTTP server container, mapping port 21000 on the host to port 80 on the container.

10. **List running containers**:

    ```sh
    docker container ls
    ```

    Lists all running Docker containers.

11. **Stop and manage containers**:
    ```sh
    docker container stop 55b4170cda3c
    docker container ls -a
    docker container kill apache-2
    docker container start apache-1 apache-2
    docker container pause apache-1
    docker container unpause apache-1
    docker container rm apache-1 -f
    docker container stop apache-2
    docker container rm apache-2
    ```
    Commands to stop, list, kill, start, pause, unpause, and remove Docker containers.

#### Monitoring Docker Containers

12. **Check system and container stats**:
    ```sh
    free -h
    docker container stats 55b4170cda3c
    docker container top apache-1
    docker container logs apache-1
    ```
    Commands to check system memory usage, container stats, running processes inside a container, and container logs.

#### Interacting with a Running Container

13. **Execute commands inside a container**:

    ```sh
    docker container exec -it apache-1 /bin/bash
    ```

    Opens an interactive bash shell inside the running `apache-1` container.

14. **Modify container content**:
    ```sh
    echo "<html><body><h1>It works! This is Docker Engine ,It is Running in Container....</h1></body></html>" > /usr/local/apache2/htdocs/index.html
    ```
    Creates a simple HTML file inside the container.

#### Building and Running Custom Docker Images

15. **Build a custom Docker image**:

    ```sh
    docker image build -t helloworld:1.0.0 .
    ```

    Builds a Docker image named `helloworld` with version `1.0.0` from the Dockerfile in the current directory.

16. **Run a custom Docker container**:

    ```sh
    docker container run --name hello1 helloworld:1.0.0
    ```

17. **Create and build a Dockerfile**:
    ```sh
    touch Dockerfile
    vim Dockerfile
    docker image build -t myapache:1.0.0 .
    ```
    Creates a Dockerfile, edits it, and builds a new image named `myapache` with version `1.0.0`.

### Conclusion

Docker is a versatile and powerful tool for containerizing applications, ensuring consistency across environments, and simplifying deployment. The commands above showcase a variety of Docker operations, from installation and basic management to building and running custom images.

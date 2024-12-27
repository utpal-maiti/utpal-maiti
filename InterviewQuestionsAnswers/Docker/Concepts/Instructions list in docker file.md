A Dockerfile is a script containing instructions on how to build a Docker image. Here's a typical list of instructions you might find in a Dockerfile:

1. **FROM**: Specifies the base image
    ```dockerfile
    FROM [base_image]
    ```
    E.g.,
    ```dockerfile
    FROM ubuntu:latest
    ```

2. **LABEL**: Adds metadata to the image
    ```dockerfile
    LABEL [key]=[value]
    ```
    E.g.,
    ```dockerfile
    LABEL maintainer="you@example.com"
    ```

3. **RUN**: Executes a command during the build process
    ```dockerfile
    RUN [command]
    ```
    E.g.,
    ```dockerfile
    RUN apt-get update && apt-get install -y python3

4. **COPY**: Copies files from the host to the image
    ```dockerfile
    COPY [source_path] [destination_path]
    ```
    E.g.,
    ```dockerfile
    COPY . /app

5. **ADD**: Similar to COPY but can also download files from URLs and unpack archives
    ```dockerfile
    ADD [source_path] [destination_path]
    ```
    E.g.,
    ```dockerfile
    ADD https://example.com/file.tar.gz /app/

6. **WORKDIR**: Sets the working directory for the subsequent instructions
    ```dockerfile
    WORKDIR [directory_path]
    ```
    E.g.,
    ```dockerfile
    WORKDIR /app

7. **ENV**: Sets environment variables
    ```dockerfile
    ENV [key]=[value]
    ```
    E.g.,
    ```dockerfile
    ENV PORT=80

8. **EXPOSE**: Informs Docker that the container will listen on the specified network ports at runtime
    ```dockerfile
    EXPOSE [port]
    ```
    E.g.,
    ```dockerfile
    EXPOSE 80

9. **CMD**: Provides a command that will be executed when a container is run
    ```dockerfile
    CMD ["executable","param1","param2"]
    ```
    E.g.,
    ```dockerfile
    CMD ["python3", "app.py"]

10. **ENTRYPOINT**: Similar to CMD but sets the command and parameters that cannot be overridden
    ```dockerfile
    ENTRYPOINT ["executable","param1","param2"]
    ```
    E.g.,
    ```dockerfile
    ENTRYPOINT ["python3", "app.py"]

11. **VOLUME**: Creates a mount point with the specified path and marks it as holding externally mounted volumes from native host or other containers
    ```dockerfile
    VOLUME ["/data"]
    ```

12. **ARG**: Defines a variable that users can pass at build-time to the builder
    ```dockerfile
    ARG [variable_name]
    ```

13. **USER**: Sets the username or UID to use when running the image and for any RUN, CMD, and ENTRYPOINT instructions that follow
    ```dockerfile
    USER [username|uid]
    ```

14. **HEALTHCHECK**: Tells Docker how to test a container to check that it is still working
    ```dockerfile
    HEALTHCHECK [options] CMD [command]
    ```

Here’s an example of a basic Dockerfile:
```dockerfile
# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

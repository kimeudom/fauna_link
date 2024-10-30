# Fauna Link Docker Documentation

# Instructions for creating and running the Docker image
 1. Build the Docker image
      ```
      docker build -t fauna_link_image .
      ```

 2. Run the container
      ```
      docker run -p 5000:5000 fauna_link_image
      ```


#  Instructions for pulling and running the image from Docker Hub
 1. Pull the image from Docker Hub
    ```
    docker pull kimeudom/fauna_link:<latest>
    ```

 2. Run the container
    ```
    docker run -p 5000:5000 kimeudom/fauna_link:<latest>
    ```

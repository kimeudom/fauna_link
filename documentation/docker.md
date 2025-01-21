# Fauna Link Docker Documentation

# Instructions for creating and running the Docker image
 1. Build the Docker image with multi architecture support
   - amd64
   - arm64
   - arm/v8
   - arm/v7

      ```
      docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v8 -t fauna_link_image .
      ```
   Or build to upload
      ```
      docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v8,linux/arm/v7  -t kimeudom/fauna_link:<tag> --push  .   
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

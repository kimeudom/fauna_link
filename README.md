# fauna_link - Running a Local Instance
  To install all python dependancies run the command below within the root `/` directory.

  ```
  pip install -r requirements.txt
  ``` 

  Move into the `./frontend/` directory to install dependancies and build the project.

  ```
  cd ./frontend
  npm install
  npm run build
  ```

  Move back into the root `/` directory and run the flask server.
  ```
  cd ..
  python3 server.py
  ```


---
# Fauna link Docker Implementation

  Use this [link](./documentation/docker.md) to run the project on `Docker`.

---

# Fauna Link Database Implementation

  Use this [link](./db/fauna_link_db_documentation.md) to view the fauna_link database implementation.
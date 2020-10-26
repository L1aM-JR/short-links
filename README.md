Проект сделан по https://www.youtube.com/watch?v=ivDjWYcKDZI&t=7602s

docker run --restart=always --name my-mongo -p 27017:27017 -d mongo
docker rm my-mongo
docker ps
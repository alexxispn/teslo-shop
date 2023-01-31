<h1 align="center">NestJS Teslo API</h1>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h2 align="center">Stack used</h2>
<p align="center">
<a href="#"><img src="https://img.shields.io/badge/-NestJS-E0234E?style=for-the-badge&logo=NestJS&"></a>
<a href="#"><img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=PostgreSQL&logoColor=white"></a>
</p>

# 📁 Collection: Products


## End-point: Get products
### Method: GET
>```
>http://localhost:3000/api/products?limit=6&offset=1
>```
### Query Params

|Param|value|
|---|---|
|limit|6|
|offset|1|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get product/:term
### Method: GET
>```
>http://localhost:3000/api/products/326fb8fd-b3bd-41d2-9130-ba007a8f24c2
>http://localhost:3000/api/products/Alexis' shirt 2
>http://localhost:3000/api/products/alexis_shirt_2
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Post product
### Method: POST
>```
>http://localhost:3000/api/products
>```
### Body
Body:
```json
{
   "title": "Alexis' Shirt 2",
   "sizes": ["S", "M", "L"],
   "gender": "men"
}
```
--- 

Response:
```json
{
   "title": "Alexis' Shirt 7",
   "sizes": [
      "S",
      "M",
      "L"
   ],
   "gender": "men",
   "slug": "alexis_shirt_7",
   "description": null,
   "id": "ee7c7af8-63b9-48a7-a417-fa1ca3f57ee6",
   "price": 0,
   "stock": 0,
   "tags": []
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Patch product/:id
### Method: PATCH
>```
>http://localhost:3000/api/products/63cfca329c1ec789116ec596
>```
### Body

```json
{
   "title": "Alexis' Shirt 2",
   "description": "This is an example of a description",
   "slug": "Alexis Shirt 2",
   "price": 100,
   "stock": 10,
   "sizes": [
      "SM",
      "S",
      "M",
      "L"
   ],
   "gender": "men",
   "tags": [
      "tag 1",
      "tag 2"
   ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete product/:id
### Method: DELETE
>```
>http://localhost:3000/api/products/326fb8fd-b3bd-41d2-9130-ba007a8f24c2
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Seed

### Method: GET

```

http://localhost:3000/api/seed

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## Run in development

1. Clone the repository

   ```bash
   $ git clone https://github.com/alexxispn/teslo-shop.git
   ```

2. Install NestJS CLI

   ```bash
   $ pnpm add -g @nestjs/cli
   ```

3. Install dependencies

   ```bash
   $ pnpm install
   ```

4. Run the database

   ```bash
   $ docker-compose up -d
   ```

5. Clone the file `.env.example` and rename it to `.env`

   ```bash
   $ cp .env.example .env
   ```

6. Set the environment variables

7. Run the application

   ```bash
   $ pnpm run start:dev
   ```

8. Recreate the data with the seed

   ```bash
   $ get http://localhost:3000/api/seed
   ```   

[//]: # (## Run in production)

[//]: # ()
[//]: # ()
[//]: # (1. Clone the repository)

[//]: # ()
[//]: # ()
[//]: # (   ```bash)

[//]: # ()
[//]: # (   $ git clone)

[//]: # ()
[//]: # (    ```)

[//]: # ()
[//]: # ()
[//]: # (2. Install NestJS CLI)

[//]: # ()
[//]: # ()
[//]: # (    ```bash)

[//]: # ()
[//]: # (    $ pnpm add -g @nestjs/cli)

[//]: # ()
[//]: # (    ```)

[//]: # ()
[//]: # ()
[//]: # (3. Install dependencies)

[//]: # ()
[//]: # ()
[//]: # (    ```bash)

[//]: # ()
[//]: # (    $ pnpm install)

[//]: # ()
[//]: # (    ```)

[//]: # ()
[//]: # ()
[//]: # (4. Run the database)

[//]: # ()
[//]: # ()
[//]: # (    ```bash)

[//]: # ()
[//]: # (    $ docker-compose up -d)

[//]: # ()
[//]: # (    ```)

[//]: # ()
[//]: # ()
[//]: # (5. Clone the file `.env.example` and rename it to `.env.prod`)

[//]: # ()
[//]: # ()
[//]: # (    ```bash)

[//]: # ()
[//]: # (    $ cp .env.example .env.prod)

[//]: # ()
[//]: # (    ```)

[//]: # ()
[//]: # ()
[//]: # (6. Set the environment variables)

[//]: # ()
[//]: # (7. Build the image)

[//]: # ()
[//]: # ()
[//]: # (    ```bash)

[//]: # ()
[//]: # (    $ docker compose -f docker-compose.prod.yaml --env-file .env.prod up --build)

[//]: # ()
[//]: # (    ```)

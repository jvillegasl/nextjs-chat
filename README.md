# Chat Application

Real-time chat application impemented with NextJS 13.

## Requirements

-   Docker
-   Docker Compose

## Built with

-   [![Next 13][Next.js]][Next-url]
-   [![Tailwind][Tailwind]][Tailwind-url]
-   [![Typescript][Typescript]][Typescript-url]
-   [![MongoDB][MongoDB]][MongoDB-url]
-   [![Socket.io][Socket.io]][Socket.io-url]
-   [![MUI][MUI]][MUI-url]

## Deploy Locally

1. Clone this repository to your local machine:

```bash
git clone https://github.com/jvillegasl/nextjs-chat.git
```

2. Navigate to the project directory:

```bash
cd nextjs-chat
```

3. Start the application using Docker Compose:

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Roadmap

-   [x] Implement docker
    -   [x] NextJS
    -   [x] MongoDB
-   [x] PoC socket.io (success)
-   [ ] Implement authentication
    -   [x] Design User model
    -   [x] Login and Register APIs
    -   [x] Login and Register pages
    -   [x] Config middleware
-   [ ] Chat Backend

    -   [ ] Design models
    -   [ ] CRUD APIs for messages

-   [ ] Chat Frontend
    -   [ ] Sidebar (Contacts)
    -   [ ] Searchbar
    -   [ ] Conversation
    -   [ ] Profile

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js%2013-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

<!--  -->

[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

<!--  -->

[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

<!--  -->

[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/es

<!--  -->

[Socket.io]: https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101
[Socket.io-url]: https://socket.io/

<!--  -->

[MUI]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/

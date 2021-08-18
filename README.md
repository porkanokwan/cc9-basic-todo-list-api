## API Document

**API Endpoint:** localhost:8080

| Method   | Path        | Description       | Body                           |
|----------|-------------|-------------------|--------------------------------|
| GET      | /todo       | Get all todos     | None                           |
| GET      | /todo/:id   | Get todo by id    | None                           |
| POST     | /todo       | Create todo       | { name: "Task", status: true } |
| PUT      | /todo/:id   | Update todo by id | { name: "Task", status: true } |
| DELETE   | /todo/:id   | Delete todo by id | None                           |

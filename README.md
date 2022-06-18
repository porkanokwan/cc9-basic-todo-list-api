## API Document

**API Endpoint:** localhost:8080
<!-- จำลอง server นี้ไว้บน port 8080 บนเครื่อง และให้บริการเก็บข้อมูลของ TodoList อยากจะทำอะไรเกี่ยวกับ todo ให้ทำตาม path ด้านล่าง -->
| Method | Path       | Description       | Body                               |
| ------ | ---------- | ----------------- | ---------------------------------- |
| GET    | /todos     | Get all todos     | None                               |
| GET    | /todos/:id | Get todo by id    | None                               |
| POST   | /todos     | Create todo       | { title: "Task", completed: true } |
| PUT    | /todos/:id | Update todo by id | { title: "Task", completed: true } |
| DELETE | /todos/:id | Delete todo by id | None                               |

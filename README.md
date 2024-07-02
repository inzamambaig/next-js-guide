### Primsa Installation and Configuration of Sqlite

```bash
npm i primsa
```

```bash
npx prisma init --datasource-provider sqlite
```

### Defining Model and Running Migration

```JavaScript
model Snippet {
  id  Int @id @default(autoincrement())
  title String
  code String
}
```

```bash
npx prisma migrate dev
```

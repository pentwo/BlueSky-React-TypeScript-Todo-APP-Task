import {
  Server,
  Model,
  belongsTo,
  hasMany,
  RestSerializer,
  Factory,
  JSONAPISerializer,
  Serializer,
} from "miragejs";
import * as faker from "faker";
import { serialize } from "v8";

export function makeServer() {
  const server = new Server({
    serializers: {
      // application: JSONAPISerializer.extend({
      //     alwaysIncludeLinkageData: false
      // }),
      todo: RestSerializer.extend({
        serializeIds: "always",
      }),
      // users: RestSerializer.extend({
      //     include:["todo"],
      //     embed: true
      // })
    },
    models: {
      todo: Model.extend({
        user: belongsTo(),
      }),
      user: Model.extend({
        todos: hasMany(),
      }),
    },
    factories: {
      user: Factory.extend({
        id(i: number) {
          return Number(i + 1);
        },
        firstName() {
          return faker.name.firstName();
        },
        lastName() {
          return faker.name.lastName();
        },
      }),
      todo: Factory.extend({
        name() {
          return faker.random.words(faker.random.number(4) + 1);
        },
        isComplete() {
          return faker.random.boolean();
        },
      }),
    },
    seeds(server) {
      const users = server.createList("user", 5);
      for (const user of users) {
        server.createList("todo", faker.random.number(4), {
          user: user,
        } as any);
      }
    },
    routes() {
      this.namespace = "api";
      this.get("/users", (schema: any) => {
        return schema.users.all();
      });
      this.get("/user/:id/todos", (schema: any, request) => {
        const userID = request.params.id;
        const todos = schema.todos.where({ userID: userID });
        return {
          todos: todos,
        };
      });

      // todo apis

      this.get("/todos", (schema: any, request) => {
        const active = request.params.active;
        return schema.todos.all();
      });
      this.get("/todo/:id", (schema: any, request) => {
        const todoId = request.params.id;
        const todo = schema.todos.find(todoId);
        return {
          todo: todo,
        };
      });
      this.delete("/todo/:id/delete", (schema: any, request) => {
        const todoId = request.params.id;
        schema.todos.find(todoId).destroy();
        return { success: true };
      });

      this.patch("/todo/:id/edit", (schema: any, request) => {
        const todoId = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        const todo = schema.todos.find(todoId).update(attrs);

        return {
          todo: todo,
        };
      });

      this.post("/todo/create", (schema: any, request) => {
        let attrs = JSON.parse(request.requestBody);
        const user = schema.users.find(attrs.user);

        return schema.todos.create({ ...attrs, user });
      });
    },
  });
  return server;
}

import Koa from "koa";
import _ from "koa-route";
import json from "koa-json";

const app = new Koa();
// return json response
app.use(json());

// get all employee
app.use(
  _.get("/v1/employee", ctx => {
    ctx.body = { total: 30 };
  })
);

app.listen(8081);

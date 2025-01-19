import { Hono } from "hono";

const router = new Hono();

router.get("/health", (c) => {
  return c.text("API healthy");
});

router.post("/upload", async (c) => {
  //TODO add a zod validator for checking the body
  const body = await c.req.parseBody();
  console.log("body :>> ", body);
  // TODO create a function to check file type and run business logic
  return c.text("ok");
});

export default router;

import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { checkForm } from "./utils";
import { ClientErrorStatusCode } from "hono/utils/http-status";

const router = new Hono();

router.get("/health", (c) => {
  return c.text("API healthy");
});

router.post("/upload", async (c) => {
  // validate headers for encoding type
  const contentType = c.req.header("Content-Type");

  if (!contentType || !contentType.includes("multipart/form-data")) {
    throw new HTTPException(400 as ClientErrorStatusCode, {
      message: "set Content-Type: multipart/form-data",
    });
  }

  const body = await c.req.parseBody();
  // validator for checking the body
  const { success, output } = checkForm(body);
  if (!success) {
    throw new HTTPException(400 as ClientErrorStatusCode, {
      message: "incorrect request body",
    });
  }
  console.log("output :>> ", output);

  // TODO create a function to check file type and run business logic
  return c.text("ok");
});

export default router;

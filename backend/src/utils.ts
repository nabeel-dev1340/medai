import * as v from "valibot";

const formSchema = v.object({
  "files[]": v.array(v.instance(File)),
});

export const checkForm = (form: Record<string, string | File>) => {
  return v.safeParse(formSchema, form);
};

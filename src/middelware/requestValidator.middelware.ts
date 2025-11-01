import { NextFunction, Response, Request } from "express";

export const requestValidator = (
  schema: any,
  property: "body" | "params" | "query" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    if (
      !data ||
      typeof data !== "object" ||
      (property === "body" && Object.keys(data).length === 0)
    ) {
      return res.status(400).json({
        message: `No ${property} provided`,
        success: false,
        data: null,
      });
    }

    console.log("Validating data:", data);
    const result = schema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
      return res.status(400).json({
        success: false,
        data: null,
        message: result.error.issues
          .map((issue: any) => `${issue.path.join(".")} => ${issue.message}`)
          .join(", "),
      });
    }

    req[property] = result.data;
    next();
  };
};

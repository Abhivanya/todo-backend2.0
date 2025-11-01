import { NextFunction, Response, Request } from "express";

export const requestValidator = (
  schema: any,
  property: "body" | "params" | "query"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    if (!data || typeof data !== "object") {
      return res.status(400).json({
        message: `No ${property} provided`,
        success: false,
        data: null,
      });
    }

    const result = schema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
      return res.status(400).json({
        success: false,
        data: null,
        message: result.error.issues
          .map((issue: any) => issue.message)
          .join(", "),
      });
    }

    req[property] = result.data;
    next();
  };
};

import type { Request, Response } from "express";

import { errorSaver } from "../models/errorSaver";

type RequestBody = {
  projectName: string;
  context: string;
  errorMessage: string;
};

type RequestArg = Request & {
  body: RequestBody;
};

export const errorController = {
  saveNewError: async (req: RequestArg, res: Response) => {
    const { projectName, context, errorMessage } = req.body;

    const truncatedErrorMessage = errorMessage.substring(0, 5000);

    try {
      const result = (
        await errorSaver.saveNewError(
          projectName,
          context,
          truncatedErrorMessage,
        )
      )[0];
      res.status(201).json(["error_save_successfully", result]);
    } catch (error) {
      res.status(500).json(["server-error"]);
    }
  },
};

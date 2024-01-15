import {Request, Response} from "express";

import {errorSaver} from "../models/errorSaver";

export const errorController = {
    "saveNewError": async (_req: Request, res: Response) => {
        const {
            projectName, context, errorMessage,
        } = _req.body;

        const truncatedErrorMessage = errorMessage.substring(0, 5000);

        try {
            const result = (
                await errorSaver.saveNewError(
                    projectName,
                    context,
                    truncatedErrorMessage
                )
            )[0];
            res.status(201).json([
                "error_save_successfully",
                result
            ]);
        } catch (error) {
            res.status(500).json(["server-error"]);
        }
    },
};

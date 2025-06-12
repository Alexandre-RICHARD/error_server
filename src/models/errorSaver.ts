import { dbRequestExecuter as db } from "../database";

export const errorSaver = {
  saveNewError: async (
    project: string,
    context: string,
    error_message: string,
  ) => {
    const request = `
        INSERT INTO
            error_register
            (
                project_from,
                context,
                error_message
            )
            VALUES
            (
                ?,
                ?,
                ?
            )
        `;
    const parameters = [project, context, error_message];
    const result = await db(request, parameters);
    return result;
  },
};

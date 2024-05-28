import { ApiError } from "@errors";

export class LanguageNotFoundError extends ApiError {
    constructor() {
        super({
            code: "language_not_found",
            message: "Language Not Found",
            detail: null
        });
    }
}
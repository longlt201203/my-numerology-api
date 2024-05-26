import { ApiError } from "@errors";

export class NumerologyNotFoundApiError extends ApiError {
    constructor(id: string) {
        super({
            code: "numerology_not_found",
            message: "Numerology Not Found",
            detail: { id: id }
        });
    }
}
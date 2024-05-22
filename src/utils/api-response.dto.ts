import { PaginationDto } from "./pagination.dto";

export class ApiResponseDto<T = any> {
    message?: string;
    data?: T;
    pagination?: PaginationDto;

    constructor(
        data?: T,
        pagination?: PaginationDto,
        message?: string
    ) {
        this.data = data;
        this.pagination = pagination;
        this.message = message;
    }
}
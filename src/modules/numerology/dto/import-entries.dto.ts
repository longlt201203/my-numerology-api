import { ApiProperty } from "@nestjs/swagger";
import { AddEntryDto } from "./add-entry.dto";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ImportEntriesDto {
    @ApiProperty({ type: [AddEntryDto] })
    @ValidateNested({ each: true })
    @Type(() => AddEntryDto)
    data: AddEntryDto[];
}
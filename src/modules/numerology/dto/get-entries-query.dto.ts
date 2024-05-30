import { ApiProperty } from "@nestjs/swagger";
import { NumerologyEntryType } from "@utils";
import { IsEnum, IsOptional } from "class-validator";

export class GetEntriesQueryDto {
    @ApiProperty({ required: false, enum: NumerologyEntryType })
    @IsEnum(NumerologyEntryType)
    @IsOptional()
    type?: NumerologyEntryType;

    @ApiProperty({ required: false, description: "Language Code" })
    @IsOptional()
    lang?: string;
}
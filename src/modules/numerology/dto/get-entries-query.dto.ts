import { ApiProperty } from "@nestjs/swagger";
import { NumerologyEntryTypeEnum } from "@utils";
import { IsEnum, IsOptional } from "class-validator";

export class GetEntriesQueryDto {
    @ApiProperty({ required: false, enum: NumerologyEntryTypeEnum })
    @IsEnum(NumerologyEntryTypeEnum)
    @IsOptional()
    type?: NumerologyEntryTypeEnum;
}
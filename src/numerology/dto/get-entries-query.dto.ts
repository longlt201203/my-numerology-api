import { ApiProperty } from "@nestjs/swagger";
import { NumerologyEntryTypeEnum } from "@utils";
import { IsEnum } from "class-validator";

export class GetEntriesQueryDto {
    @ApiProperty({ enum: NumerologyEntryTypeEnum })
    @IsEnum(NumerologyEntryTypeEnum)
    type: NumerologyEntryTypeEnum;
}
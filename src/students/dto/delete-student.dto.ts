import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsString} from 'class-validator'


export class DeleteStudentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String})
    id: String;

    @ApiProperty({type: Boolean})
    deleted: Boolean;
}
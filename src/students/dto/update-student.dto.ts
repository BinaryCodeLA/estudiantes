import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @ApiProperty({type:String})
    id: String;

    @ApiProperty({type:Date})
    createdAt: Date;
    
    @ApiProperty({type:Date})
    updatedAt: Date; 

    @ApiProperty({type: Boolean})
    updated: Boolean;
}

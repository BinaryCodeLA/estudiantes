import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { ListStudentsdto } from './dto/students-items.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiCreatedResponse({description:'Student Added Succesfully'})
  @ApiResponse({status:201})
  @ApiBadRequestResponse({status:400, description:'Bad Request'})
  @ApiBody({type: CreateStudentDto,description:"Student Registration"})
  async create(@Body() createStudentDto: CreateStudentDto):Promise<CreateStudentDto> {
    let results = await this.studentsService.create(createStudentDto)
    return results
  }

  @ApiCreatedResponse({description: 'Get All Students'})
  @ApiResponse({status:200,type:ListStudentsdto})
  @Get()
 async findAll():Promise<Array<ListStudentsdto>> {
    let students = await this.studentsService.findAll();
    return students
  }

  @ApiCreatedResponse({description: 'Get Student by Id'})
  @ApiResponse({status:200, type:ListStudentsdto})
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<ListStudentsdto> {
    let student = await this.studentsService.findOne(id)
    return student
  }

  @ApiCreatedResponse({description: 'Update Student by Id'})
  @ApiResponse({status:200, type: UpdateStudentDto})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: CreateStudentDto):Promise<UpdateStudentDto> {
    let result =  this.studentsService.update(id,updateStudentDto)
    return result
  }

  @ApiCreatedResponse({description: 'Delete Student by Id'})
  @ApiResponse({status:200, type:DeleteStudentDto})
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<DeleteStudentDto> {
    let resultDelete = await this.studentsService.remove(id);
    return resultDelete
  }
}

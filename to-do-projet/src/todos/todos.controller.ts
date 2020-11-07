import { Controller, Body ,Get,Post, Param, Patch, Delete} from "@nestjs/common";

import {  TodosService } from './todos.service'
import { title } from "process";

@Controller('todos')
export class TodosController{

    constructor(private readonly todosService : TodosService){}

    @Post()
    addTodo(
        @Body('title') todotitle : string,
        @Body('description') tododescrip : string
    ) {
      const id =   this.todosService.insertToDo(todotitle,tododescrip)
      return { id : id}
    }

    @Get() 
    getTodos(){
        return this.todosService.getTodos()
    }

    @Get(':id')
    getTodo(@Param('id') todoId : string){
        return this.todosService.getTodo(todoId)
    }

    @Patch(':id')
    updateTodo(@Param('id') todoId : string, @Body('title') title : string , @Body('description') desc : string ){
        this.todosService.updateTodo(todoId,title,desc)
        return null; 
    }

    @Delete(':id')
    deleteTodo(@Param('id') todoId : string){
        this.todosService.deleteTdo(todoId)
        return null;
    }
}

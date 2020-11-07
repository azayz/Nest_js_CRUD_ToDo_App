import { Injectable , NotFoundException} from "@nestjs/common";
import { ToDo } from './todo.model' 
//import { from } from "rxjs";


@Injectable()
export class TodosService{
    private todos : ToDo[] = [];

    insertToDo(title : string, description : string) : string {
        var todoid = new Date().toString()
        const new_todo = new ToDo(todoid, title,description)
        this.todos.push(new_todo)
        return todoid
    }

    getTodos(){
        return [...this.todos]
    }

    getTodo(todoid : string){
        const todo = this.findTodo(todoid)[0]
        return {...todo}
    }

    updateTodo(todoid : string, title : string , desc : string){
        const [todo , idx] = this.findTodo(todoid)
        const updatedtodo = {...todo}
        if (title) {
            updatedtodo.title = title
        }
        if (desc) {
            updatedtodo.description = desc
        }

        this.todos[idx] = updatedtodo
    }

    deleteTdo(todoid : string) {
        const [_,idx] = this.findTodo(todoid)
        this.todos.splice(idx,1)
    }

    private findTodo(todoid : string) : [ToDo , number ]{
        const todoIndex = this.todos.findIndex((todo) => todo.id === todoid);
        const todo = this.todos[todoIndex]
        if (!todo) {
            throw new NotFoundException()
        }
        return [todo,todoIndex]
    }

}
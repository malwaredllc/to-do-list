import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {

  constructor(
      public id: number,
      public description: string,
      public done: boolean,
      public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];
  message: string;

  constructor(
    private router: Router,
    private todoService: TodoDataService) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('dvm').subscribe(
      response => {
        this.todos = response;
      }
    );
  }

  deleteTodo(id) {
    this.todoService.deleteTodo('dvm', id).subscribe(
      response => {
        this.message = `To do ${id} deleted.`;
      }
    );
    this.refreshTodos();
  }

  updateTodo(id) {
    this.router.navigate(['todos',id]);
  }

  addTodo() {
    this.router.navigate(['todos',-1]);
  }
}

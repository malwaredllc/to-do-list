import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoDataService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    if (this.id != -1) {
      this.todoService.retrieveTodo('dvm', this.id).subscribe(
        data => this.todo = data
      );
    }
  }

  saveTodo() {
    if (this.id === -1) {
      this.todoService.createTodo('dvm', this.todo).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['todos']);
        }
      );
    } else {
      this.todoService.updateTodo('dvm', this.id, this.todo).subscribe(
        data => this.todo = data
      );
      this.router.navigate(['todos']);
    }
  }

}

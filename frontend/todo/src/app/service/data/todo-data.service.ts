import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../../list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  private static username = 'dvm';
  private static password = '123';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    let basicAuthString = this.createBasicAuthenticationHttpHeader();
    this.headers = new HttpHeaders({
      Authorization: basicAuthString
    });
  }

  retrieveAllTodos(username: string) {
    return this.http.get<Todo[]>(
      `http://localhost:8080/users/${username}/todos`, 
      {headers: this.headers});
  }

  deleteTodo(username: string, id: number) {
    return this.http.delete(
      `http://localhost:8080/users/${username}/todos/${id}`,
      {headers: this.headers}
    );
  }

  retrieveTodo(username: string, id: number) {
    return this.http.get<Todo>(
      `http://localhost:8080/users/${username}/todos/${id}`,
      {headers: this.headers});
  }

  updateTodo(username: string, id: number, todo: Todo) {
    return this.http.put<Todo>(
      `http://localhost:8080/users/${username}/todos/${id}`,
       todo, {headers: this.headers});
  }

  createTodo(username: string, todo: Todo) {
    return this.http.post(
      `http://localhost:8080/users/${username}/todos`, 
      todo, {headers: this.headers});
  }

  createBasicAuthenticationHttpHeader() {
    let basicAuthHeaderString = 'Basic ' + window.btoa(TodoDataService.username + ':' + TodoDataService.password);
    return basicAuthHeaderString;
  }
}

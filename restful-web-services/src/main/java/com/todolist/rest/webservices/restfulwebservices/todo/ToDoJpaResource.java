package com.todolist.rest.webservices.restfulwebservices.todo;

import java.util.List;
import java.util.Date;
import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.todolist.rest.webservices.restfulwebservices.todo.Todo;


@CrossOrigin(origins="http://localhost:4200")
@RestController
public class ToDoJpaResource {
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;
	
	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username) {
		return todoJpaRepository.findByUsername(username);
	}
	
	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getAllTodos(
			@PathVariable String username, @PathVariable long id) {
		return todoJpaRepository.findById(id).get();
	}
	
	
	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(
			@PathVariable String username, @PathVariable long id) {
		todoJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) {
		
		Todo todoUpdated = todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todoUpdated, HttpStatus.OK);
	}
	
	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Todo> createTodo(
			@PathVariable String username, @RequestBody Todo todo) {

		todo.setUsername(username);
		Todo todoCreated = todoJpaRepository.save(todo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(todoCreated.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
}

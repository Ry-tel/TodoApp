$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addTodos)
	.catch( err => console.log(err))
	
	$('#todoInput').keypress(function(event){
		if(event.which == 13){
			createTodo();
		}
	});
	
	$('.list').on('click', 'li', function(){		
		updateTodo($(this));
	})
	
	$('.list').on('click', 'span', function (e){
		e.stopPropagation();
		removeTodo($(this).parent());
	
	});
});



function addTodos(todos) {
	console.log(todos);
  //add todos to page here
  todos.forEach(function(todo){
    addTodo(todo);
  });
}

function addTodo(todo){
	let newTodo = $('<li class="task">'+todo.name +'<span>X</span></li>');
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
		if(todo.completed){
			newTodo.addClass("done");
		}
		$('.list').append(newTodo);
}

function createTodo(){
	let usrInput = $('#todoInput').val();
	// console.log(usrInput);
	$.post('/api/todos', {name: usrInput})
	.then(function(newTodo){
		usrInput = $('#todoInput').val(' ');
		 addTodo(newTodo);
	})
	.catch(function(err){
		console.log(err);
	})
}

function removeTodo (todo){
	let clickedID = todo.data('id');
	let deleteURL = '/api/todos/' + clickedID;
			$.ajax({
			method: 'DELETE',
			url: deleteURL
		})
		.then( data => {
			todo.remove();
		})
}

function updateTodo(todo){
	let clickedID = todo.data('id');
	let updateURL = '/api/todos/' + clickedID;
	let status = !todo.data('completed');
	let statusForUpdate = {completed: status};
	console.log(statusForUpdate);
	$.ajax({
			method: 'PUT',
			url: updateURL,
			data: statusForUpdate		
	})
	.then( updTodo => {
		todo.toggleClass('done');
		// todo.data('completed', status)
	})
}

var organizeByTags = function (toDoObjects) { 
	var tags = [];
	toDoObjects.forEach(function (toDo) {
		toDo.tags.forEach(function (tag) {
			if (tags.indexOf(tag) === -1) { 
				tags.push(tag);
			}
		});
	}); 
	var tagObjects = tags.map(function (tag) {
		var toDosWithTag = []; 
		toDoObjects.forEach(function (toDo) {
			if (toDo.tags.indexOf(tag) !== -1) { 
				toDosWithTag.push(toDo.description);
			}
		});
		return { "name": tag, "toDos": toDosWithTag };
	});
	return tagObjects;
};
var main = function (toDoObjects) {
	"use strict";
	var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	});
	
	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function() {
			var $element = $(element);
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();
			if ($element.parent().is(":nth-child(1)")) {
				for (var i = toDos.length-1; i > -1; i--) {
					$(".content").append($("<li>").text(toDos[i]));
				}
			} else if ($element.parent().is(":nth-child(2)")) {
				toDos.forEach(function (todo) {
					$(".content").append($("<li>").text(todo));
				});
			} else if ($element.parent().is(":nth-child(3)")) {
				var organizedByTag = organizeByTags(toDoObjects);
				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
					$content = $("<ul>");
					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			} else if ($element.parent().is(":nth-child(4)")) {
				var $input = $("<input>").addClass("description"), 
				$textInput = $("<p>").text("Введите новую задачу: "),
				$tagInput = $("<input>").addClass("tags"),
				$tagLabel = $("<p>").text("Тэги: "),
				$button = $("<button>").text("+");
				$("main .content").append($textInput).append($input).append($tagLabel).append($tagInput).append($button); 
				function btnfunc() {
					var description = $input.val(),
						tags = $tagInput.val().split(","),
						newToDo = {"description":description, "tags":tags};
					$.post("todos", newToDo, function(result) {
						console.log(result);
						toDoObjects.push(newToDo);
						toDos = toDoObjects.map(function (toDo) {
							return toDo.description;
						});
						$input.val("");
						$tagInput.val("");
						$(".tabs a:first-child span").trigger("click");
					});
				}
				$button.on("click", function() {
					btnfunc();
				});
				$('.tags').on('keydown',function(e){
					if (e.which === 13) {
						btnfunc();
					}
				});
			}
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
};
$(document).ready(function() {
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});
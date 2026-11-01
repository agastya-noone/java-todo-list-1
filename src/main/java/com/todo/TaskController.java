
package com.todo;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final List<Task> tasks = new ArrayList<>();
    private final AtomicInteger idCounter = new AtomicInteger(1);

    @GetMapping
    public List<Task> getTasks() {
        return tasks;
    }

    // Add task with deadline
    @PostMapping
    public Task addTask(@RequestBody Task task) {

        task.setId(idCounter.getAndIncrement());
        task.setCompleted(false);

        tasks.add(task);

        return task;
    }

    // Update task
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable int id,
            @RequestBody Task updatedTask) {

        for (Task task : tasks) {

            if (task.getId() == id) {

                task.setTitle(updatedTask.getTitle());
                task.setCompleted(updatedTask.isCompleted());
                task.setDeadline(updatedTask.getDeadline());

                return task;
            }
        }

        return null;
    }

    // Delete task
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable int id) {

        tasks.removeIf(task -> task.getId() == id);

        return "Task deleted successfully";
    }
}

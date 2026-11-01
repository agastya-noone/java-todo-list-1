
package com.todo;

public class Task {

    private Integer id;
    private String title;
    private Boolean completed = false;
    private String deadline;

    public Task() {
    }

    public Task(Integer id, String title, Boolean completed, String deadline) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.deadline = deadline;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return Boolean.TRUE.equals(completed);
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }
}

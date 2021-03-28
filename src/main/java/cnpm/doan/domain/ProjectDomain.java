package cnpm.doan.domain;

import java.time.LocalDate;

public class ProjectDomain {
    private String title;
    private String description;
    private LocalDate dueDate;
    private String usernameOfAdmin;

    public ProjectDomain(String title, String description, LocalDate dueDate, String usernameOfAdmin) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.usernameOfAdmin = usernameOfAdmin;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getUsernameOfAdmin() {
        return usernameOfAdmin;
    }

    public void setUsernameOfAdmin(String usernameOfAdmin) {
        this.usernameOfAdmin = usernameOfAdmin;
    }
}

INSERT INTO departments (id, department_name)
VALUES (001, "finance"),
       (002, "marketing"),
       (003, "operations"),
       (004, "human resources");

INSERT INTO roles (id, title, salary, department)
VALUES (001, "sales person", 50000, "marketing"),
       (002, "sales lead", 80000, "marketing"),
       (003, "lead engineer", 150000, "operations"),
       (004, "accountant", 60000, "finance"),
       (005, "training and development", 60000, "human resources");

INSERT INTO employees (id, first_name, last_name, job_title, department, salary, manager)
VALUES (001, "Joe", "Bloe", "sales person", "marketing", 50000, "John Doe"),
       (002, "John", "Doe", "sales lead", "marketing", 80000, NULL),
       (003, "Mike", "Chan", "lead engineer", "operations", 150000, NULL),
       (004, "Sarah", "Lourd", "accountant", "finance", 60000, "Jeff"),
       (005, "Sam", "kash", "training and development", "human resources", 60000, "Jeff");
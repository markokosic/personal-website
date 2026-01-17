---
date: 2026-01-14
---

# SOLID

## Single Responsibility Principle (SRP)

Every class, function, or component should be responsible to one, and only one, actor. If a class or function handles multiple responsibilities—such as validation, business logic, and persistence—these responsibilities should be separated into distinct classes or functions, each focused on a single concern. Further, a class or function should have only one reason to change.

```java
// SRP violation: handles validation and persistence
class CustomerService {
    void createCustomer(Customer c) {
        if (c.getName() == null) throw new IllegalArgumentException();
        // Save to DB
        new CustomerRepository().save(c);
    }
}

// SRP-compliant: separate responsibilities
class CustomerValidator {
    void validate(Customer c) {
        if (c.getName() == null) throw new IllegalArgumentException();
    }
}

class CustomerRepository {
    void save(Customer c) { /* persist to DB */ }
}

class CustomerService {
    private final CustomerValidator validator = new CustomerValidator();
    private final CustomerRepository repository = new CustomerRepository();

    void createCustomer(Customer c) {
        validator.validate(c);
        repository.save(c);
    }
}
```

## Open/Closed Principle (OCP)

Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. That means you should be able to add new behavior without changing the existing, tested code, usually by using polymorphism, interfaces, or composition.

```java
interface CustomerNotifier {
    void sendNotification(Customer c);
}

class EmailNotifier implements CustomerNotifier {
    public void sendNotification(Customer c) {
        System.out.println("Send email to " + c.getEmail());
    }
}

class SMSNotifier implements CustomerNotifier {
    public void sendNotification(Customer c) {
        System.out.println("Send SMS to " + c.getPhone());
    }
}

// CustomerService uses abstraction, can extend notifiers without modifying existing code
class CustomerService {
    private CustomerNotifier notifier;

    CustomerService(CustomerNotifier notifier) {
        this.notifier = notifier;
    }

    void notifyCustomer(Customer c) {
        notifier.sendNotification(c);
    }
}
```

## Liskov Substitution Principle (LSP)

Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program. Subclasses can extend the behavior of a superclass but not break it.

```java
class Bird {
    void eat() { System.out.println("Bird eats"); }
}

class FlyingBird extends Bird {
    void fly() { System.out.println("Flying"); }
}

class Eagle extends FlyingBird { }

class Ostrich extends Bird { } // cannot fly, but still a Bird

// LSP-compliant: code expecting Bird can work with Eagle or Ostrich
void feedBird(Bird b) {
    b.eat(); // works for both Eagle and Ostrich
}
```

## Interface Segregation Principle (ISP)

Favor many small, client-specific interfaces over one large general-purpose interface. Don't force a class to implement what it doesn't need.

```java
// Bad: one large interface
interface CustomerOperations {
    void create();
    void update();
    void delete();
    void sendMarketingEmail();
}

class VIPCustomerManager implements CustomerOperations {
    public void create() { ... }
    public void update() { ... }
    public void delete() { ... }
    public void sendMarketingEmail() {
        throw new UnsupportedOperationException();
    }
}

// Good: split into smaller interfaces
interface CustomerCRUD {
    void create();
    void update();
    void delete();
}

interface CustomerMarketing {
    void sendMarketingEmail();
}

class VIPCustomerManager implements CustomerCRUD {
    public void create() { ... }
    public void update() { ... }
    public void delete() { ... }
}

```

## Dependency Inversion Principle (DIP)

High-level (business logic) modules should not depend on low-level (db, file system) modules. Both should depend on abstractions (e.g., interfaces). Abstractions should not depend on details. Details should depend on abstractions.

```java
// High-level module
class CustomerService {
    private CustomerRepository repository;

    CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    void createCustomer(Customer c) {
        repository.save(c);
    }
}

// Abstraction
interface CustomerRepository {
    void save(Customer c);
}

// Low-level module
class MySQLCustomerRepository implements CustomerRepository {
    public void save(Customer c) {
        System.out.println("Saving to MySQL DB");
    }
}

// Usage
CustomerRepository repo = new MySQLCustomerRepository();
CustomerService service = new CustomerService(repo);
service.createCustomer(new Customer("John Doe"));

```

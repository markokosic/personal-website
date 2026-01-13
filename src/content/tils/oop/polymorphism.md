---
date: 2026-01-13
---

# Polymorphism

Verschiedene Klassen implementieren dieselbe Schnittstelle oder abstrakte Klasse, können aber unterschiedliches Verhalten zeigen, wenn dieselbe Methode aufgerufen wird.

cart.pay() -> verwendet dann PayPalPayment, VisaPayment

Example:

```java
    interface Payment {
        void pay(double amount);
    }

    class PayPalPayment implements Payment {
        public void pay(double amount) {
            System.out.println("Paid " + amount + " via PayPal");
        }
    }

    class VisaPayment implements Payment {
        public void pay(double amount) {
            System.out.println("Paid " + amount + " via Visa");
        }
    }
```

// Nutzung:
Payment cartPayment = new PayPalPayment();
cartPayment.pay(100.0);

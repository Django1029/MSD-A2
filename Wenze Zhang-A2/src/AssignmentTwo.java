public class AssignmentTwo {
public static void main(String[] args) {
    System.out.println("=== Theme Park Management System ===");
    
    AssignmentTwo assignment = new AssignmentTwo();
    
    try {

        assignment.partThree();
        assignment.partFourA();
        assignment.partFourB();
        assignment.partFive();
        assignment.partSix();
        assignment.partSeven();
        
        System.out.println("\n🎉 All parts completed successfully!");
    } catch (Exception e) {
        System.out.println("❌ Error running assignment: " + e.getMessage());
        e.printStackTrace();
    }
}
    
public void partThree() {
    System.out.println("\n=== Part 3: Queue Implementation ===");
    

    Employee operator = new Employee("John Operator", 30, "john@themepark.com", "E001", "Ride Operations");
    

    Ride rollerCoaster = new Ride("Roller Coaster", "Thrill Ride", operator, 4);
    
 
    Visitor visitor1 = new Visitor("Alice", 25, "alice@email.com", "V001", "Day Pass");
    Visitor visitor2 = new Visitor("Bob", 30, "bob@email.com", "V002", "Season Pass");
    Visitor visitor3 = new Visitor("Charlie", 22, "charlie@email.com", "V003", "Day Pass");
    Visitor visitor4 = new Visitor("Diana", 28, "diana@email.com", "V004", "VIP Pass");
    Visitor visitor5 = new Visitor("Eve", 35, "eve@email.com", "V005", "Day Pass");
    
    System.out.println("\n--- Adding visitors to queue ---");
    rollerCoaster.addVisitorToQueue(visitor1);
    rollerCoaster.addVisitorToQueue(visitor2);
    rollerCoaster.addVisitorToQueue(visitor3);
    rollerCoaster.addVisitorToQueue(visitor4);
    rollerCoaster.addVisitorToQueue(visitor5);
    
 
    System.out.println("\n--- Printing queue ---");
    rollerCoaster.printQueue();
    
  
    System.out.println("\n--- Removing visitor from queue ---");
    rollerCoaster.removeVisitorFromQueue();
    
   
    System.out.println("\n--- Printing queue after removal ---");
    rollerCoaster.printQueue();
}
    
public void partFourA() {
    System.out.println("\n=== Part 4A: Ride History ===");

  
    Employee operator = new Employee("Sarah Operator", 28, "sarah@themepark.com", "E002", "Ride Operations");

 
    Ride waterRide = new Ride("Water Splash", "Water Ride", operator, 6);


    Visitor visitor1 = new Visitor("Frank", 20, "frank@email.com", "V006", "Day Pass");
    Visitor visitor2 = new Visitor("Grace", 24, "grace@email.com", "V007", "Season Pass");
    Visitor visitor3 = new Visitor("Henry", 19, "henry@email.com", "V008", "Day Pass");
    Visitor visitor4 = new Visitor("Ivy", 26, "ivy@email.com", "V009", "VIP Pass");
    Visitor visitor5 = new Visitor("Jack", 32, "jack@email.com", "V010", "Day Pass");

   
    System.out.println("\n--- Adding visitors to ride history ---");
    waterRide.addVisitorToHistory(visitor1);
    waterRide.addVisitorToHistory(visitor2);
    waterRide.addVisitorToHistory(visitor3);
    waterRide.addVisitorToHistory(visitor4);
    waterRide.addVisitorToHistory(visitor5);

   
    System.out.println("\n--- Checking visitors in history ---");
    waterRide.checkVisitorFromHistory(visitor1);
    waterRide.checkVisitorFromHistory(visitor3);

   
    System.out.println("\n--- Number of visitors in history ---");
    waterRide.numberOfVisitors();

   
    System.out.println("\n--- Printing ride history ---");
    waterRide.printRideHistory();
}
    
public void partFourB() {
    System.out.println("\n=== Part 4B: Sorting Ride History ===");


    Employee operator = new Employee("Mike Operator", 35, "mike@themepark.com", "E003", "Ride Operations");


    Ride ferrisWheel = new Ride("Ferris Wheel", "Scenic Ride", operator, 8);


    Visitor visitor1 = new Visitor("Zoe", 25, "zoe@email.com", "V011", "Day Pass");
    Visitor visitor2 = new Visitor("Adam", 30, "adam@email.com", "V012", "Season Pass");
    Visitor visitor3 = new Visitor("Charlie", 22, "charlie2@email.com", "V013", "Day Pass");
    Visitor visitor4 = new Visitor("Diana", 30, "diana2@email.com", "V014", "VIP Pass");
    Visitor visitor5 = new Visitor("Bob", 22, "bob2@email.com", "V015", "Day Pass");


    System.out.println("\n--- Adding visitors to ride history ---");
    ferrisWheel.addVisitorToHistory(visitor1);
    ferrisWheel.addVisitorToHistory(visitor2);
    ferrisWheel.addVisitorToHistory(visitor3);
    ferrisWheel.addVisitorToHistory(visitor4);
    ferrisWheel.addVisitorToHistory(visitor5);


    System.out.println("\n--- Printing ride history before sorting ---");
    ferrisWheel.printRideHistory();


    System.out.println("\n--- Sorting ride history ---");
    ferrisWheel.sortRideHistory();


    System.out.println("\n--- Printing ride history after sorting ---");
    ferrisWheel.printRideHistory();
}
    
public void partFive() {
    System.out.println("\n=== Part 5: Run Ride Cycle ===");


    Employee operator = new Employee("Lisa Operator", 26, "lisa@themepark.com", "E004", "Ride Operations");


    Ride carousel = new Ride("Carousel", "Family Ride", operator, 3);

    Visitor visitor1 = new Visitor("Olivia", 10, "olivia@email.com", "V016", "Child Pass");
    Visitor visitor2 = new Visitor("Liam", 12, "liam@email.com", "V017", "Child Pass");
    Visitor visitor3 = new Visitor("Emma", 9, "emma@email.com", "V018", "Child Pass");
    Visitor visitor4 = new Visitor("Noah", 11, "noah@email.com", "V019", "Child Pass");
    Visitor visitor5 = new Visitor("Ava", 10, "ava@email.com", "V020", "Child Pass");
    Visitor visitor6 = new Visitor("William", 13, "william@email.com", "V021", "Child Pass");
    Visitor visitor7 = new Visitor("Sophia", 8, "sophia@email.com", "V022", "Child Pass");
    Visitor visitor8 = new Visitor("James", 14, "james@email.com", "V023", "Child Pass");
    Visitor visitor9 = new Visitor("Isabella", 9, "isabella@email.com", "V024", "Child Pass");
    Visitor visitor10 = new Visitor("Benjamin", 12, "benjamin@email.com", "V025", "Child Pass");


    System.out.println("\n--- Adding 10 visitors to queue ---");
    carousel.addVisitorToQueue(visitor1);
    carousel.addVisitorToQueue(visitor2);
    carousel.addVisitorToQueue(visitor3);
    carousel.addVisitorToQueue(visitor4);
    carousel.addVisitorToQueue(visitor5);
    carousel.addVisitorToQueue(visitor6);
    carousel.addVisitorToQueue(visitor7);
    carousel.addVisitorToQueue(visitor8);
    carousel.addVisitorToQueue(visitor9);
    carousel.addVisitorToQueue(visitor10);

    System.out.println("\n--- Printing queue before cycle ---");
    carousel.printQueue();


    System.out.println("\n--- Running one cycle ---");
    carousel.runOneCycle();


    System.out.println("\n--- Printing queue after cycle ---");
    carousel.printQueue();


    System.out.println("\n--- Printing ride history ---");
    carousel.printRideHistory();
}
    
public void partSix() {
    System.out.println("\n=== Part 6: Writing to File ===");


    Employee operator = new Employee("Tom Operator", 40, "tom@themepark.com", "E005", "Ride Operations");


    Ride dropTower = new Ride("Drop Tower", "Thrill Ride", operator, 4);


    Visitor visitor1 = new Visitor("Nathan", 27, "nathan@email.com", "V026", "Day Pass");
    Visitor visitor2 = new Visitor("Sophie", 24, "sophie@email.com", "V027", "Season Pass");
    Visitor visitor3 = new Visitor("Ethan", 31, "ethan@email.com", "V028", "Day Pass");
    Visitor visitor4 = new Visitor("Mia", 29, "mia@email.com", "V029", "VIP Pass");
    Visitor visitor5 = new Visitor("Lucas", 26, "lucas@email.com", "V030", "Day Pass");

 
    System.out.println("\n--- Adding visitors to ride history ---");
    dropTower.addVisitorToHistory(visitor1);
    dropTower.addVisitorToHistory(visitor2);
    dropTower.addVisitorToHistory(visitor3);
    dropTower.addVisitorToHistory(visitor4);
    dropTower.addVisitorToHistory(visitor5);


    System.out.println("\n--- Exporting ride history to file ---");
    dropTower.exportRideHistory("ride_history.csv");
}
    
public void partSeven() {
    System.out.println("\n=== Part 7: Reading from File ===");


    Employee operator = new Employee("Rachel Operator", 32, "rachel@themepark.com", "E006", "Ride Operations");


    Ride newRide = new Ride("New Ride", "Family Ride", operator, 5);


    System.out.println("\n--- Importing ride history from file ---");
    newRide.importRideHistory("ride_history.csv");


    System.out.println("\n--- Number of visitors after import ---");
    newRide.numberOfVisitors();


    System.out.println("\n--- Printing imported ride history ---");
    newRide.printRideHistory();
}
}
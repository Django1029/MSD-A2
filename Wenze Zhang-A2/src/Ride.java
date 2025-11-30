import java.util.*;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Ride implements RideInterface {

    private String rideName;
    private String rideType;
    private Employee operator;
    private int maxRider;
    private int numOfCycles;
    

    private Queue<Visitor> waitingLine;
    private LinkedList<Visitor> rideHistory;
    

    public Ride() {
        this.rideName = "Unknown Ride";
        this.rideType = "General";
        this.operator = null;
        this.maxRider = 2;
        this.numOfCycles = 0;
        this.waitingLine = new LinkedList<>();
        this.rideHistory = new LinkedList<>();
    }
    

    public Ride(String rideName, String rideType, Employee operator, int maxRider) {
        this.rideName = rideName;
        this.rideType = rideType;
        this.operator = operator;
        this.maxRider = maxRider;
        this.numOfCycles = 0;
        this.waitingLine = new LinkedList<>();
        this.rideHistory = new LinkedList<>();
    }
    

    public String getRideName() {
        return rideName;
    }
    
    public void setRideName(String rideName) {
        this.rideName = rideName;
    }
    
    public String getRideType() {
        return rideType;
    }
    
    public void setRideType(String rideType) {
        this.rideType = rideType;
    }
    
    public Employee getOperator() {
        return operator;
    }
    
    public void setOperator(Employee operator) {
        this.operator = operator;
    }
    
    public int getMaxRider() {
        return maxRider;
    }
    
    public void setMaxRider(int maxRider) {
        this.maxRider = maxRider;
    }
    
    public int getNumOfCycles() {
        return numOfCycles;
    }
    



public void exportRideHistory(String filename) {
    try (PrintWriter writer = new PrintWriter(new FileWriter(filename))) {
        for (Visitor visitor : rideHistory) {
            // 将每个访客的信息写入一行，用逗号分隔
            writer.println(visitor.getName() + "," + 
                           visitor.getAge() + "," + 
                           visitor.getEmail() + "," + 
                           visitor.getVisitorId() + "," + 
                           visitor.getTicketType());
        }
        System.out.println("✅ Ride history exported to " + filename);
    } catch (IOException e) {
        System.out.println("❌ Error exporting ride history: " + e.getMessage());
    }
}



public void importRideHistory(String filename) {
    try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
        String line;
        int count = 0;
        while ((line = reader.readLine()) != null) {
            String[] parts = line.split(",");
            if (parts.length == 5) {
                String name = parts[0];
                int age = Integer.parseInt(parts[1]);
                String email = parts[2];
                String visitorId = parts[3];
                String ticketType = parts[4];

                Visitor visitor = new Visitor(name, age, email, visitorId, ticketType);
                // 添加到历史记录
                addVisitorToHistory(visitor);
                count++;
            }
        }
        System.out.println("✅ Imported " + count + " visitors from " + filename);
    } catch (IOException e) {
        System.out.println("❌ Error importing ride history: " + e.getMessage());
    } catch (NumberFormatException e) {
        System.out.println("❌ Error parsing age: " + e.getMessage());
    }
}





    
    @Override
    public void addVisitorToQueue(Visitor visitor) {
        if (visitor != null) {
            waitingLine.add(visitor);
            System.out.println("Visitor " + visitor.getName() + " added to queue for " + rideName);
        } else {
            System.out.println("Cannot add null visitor to queue");
        }
    }
    
    @Override
    public void removeVisitorFromQueue() {
        if (!waitingLine.isEmpty()) {
            Visitor removed = waitingLine.poll();
            System.out.println("Visitor " + removed.getName() + " removed from queue");
        } else {
            System.out.println("Queue is empty, cannot remove visitor");
        }
    }
    
    @Override
    public void printQueue() {
        if (waitingLine.isEmpty()) {
            System.out.println("Queue for " + rideName + " is empty");
            return;
        }
        
        System.out.println("Queue for " + rideName + ":");
        int position = 1;
        for (Visitor visitor : waitingLine) {
            System.out.println(position + ". " + visitor.getName() + " (ID: " + visitor.getVisitorId() + ")");
            position++;
        }
    }
    


@Override
public void addVisitorToHistory(Visitor visitor) {
    if (visitor != null) {
        // 检查是否已经存在
        if (!rideHistory.contains(visitor)) {
            rideHistory.add(visitor);
            System.out.println("✅ Visitor " + visitor.getName() + " added to ride history of " + rideName);
        } else {
            System.out.println("ℹ️ Visitor " + visitor.getName() + " is already in the ride history");
        }
    } else {
        System.out.println("❌ Cannot add null visitor to history");
    }
}

@Override
public boolean checkVisitorFromHistory(Visitor visitor) {
    if (visitor == null) {
        System.out.println("❌ Cannot check null visitor");
        return false;
    }
    boolean found = rideHistory.contains(visitor);
    System.out.println("🔍 Visitor " + visitor.getName() + " in history of " + rideName + ": " + found);
    return found;
}

@Override
public int numberOfVisitors() {
    int count = rideHistory.size();
    System.out.println("📊 Number of visitors in history of " + rideName + ": " + count);
    return count;
}

@Override
public void printRideHistory() {
    if (rideHistory.isEmpty()) {
        System.out.println("ℹ️ Ride history for " + rideName + " is empty");
        return;
    }

    System.out.println("📜 Ride history for " + rideName + ":");
    Iterator<Visitor> iterator = rideHistory.iterator();
    int count = 1;
    while (iterator.hasNext()) {
        Visitor visitor = iterator.next();
        System.out.println("  " + count + ". " + visitor.getName() + 
                          " (ID: " + visitor.getVisitorId() + 
                          ", Age: " + visitor.getAge() + 
                          ", Ticket: " + visitor.getTicketType() + ")");
        count++;
    }
}
 
public void sortRideHistory() {
    System.out.println("🔄 Sorting ride history for " + rideName);
    VisitorComparator comparator = new VisitorComparator();
    rideHistory.sort(comparator);
    System.out.println("✅ Ride history sorted by age and name");
}

@Override
public void runOneCycle() {
    // 检查是否有操作员
    if (operator == null) {
        System.out.println("❌ Cannot run ride " + rideName + ": No operator assigned");
        return;
    }

    // 检查队列是否为空
    if (waitingLine.isEmpty()) {
        System.out.println("❌ Cannot run ride " + rideName + ": No visitors in queue");
        return;
    }

    System.out.println("🎢 Running ride " + rideName + " for one cycle (max " + maxRider + " visitors)");

    int visitorsToTake = Math.min(maxRider, waitingLine.size());
    System.out.println("Taking " + visitorsToTake + " visitors from queue");

    for (int i = 0; i < visitorsToTake; i++) {
        Visitor visitor = waitingLine.poll();
        if (visitor != null) {
            // 添加到历史记录
            addVisitorToHistory(visitor);
            System.out.println("✅ " + visitor.getName() + " has taken the ride");
        }
    }

    numOfCycles++;
    System.out.println("✅ Ride cycle completed. Total cycles: " + numOfCycles);
}
    
    @Override
    public String toString() {
        return "Ride{" +
                "rideName='" + rideName + '\'' +
                ", rideType='" + rideType + '\'' +
                ", operator=" + (operator != null ? operator.getName() : "None") +
                ", maxRider=" + maxRider +
                ", numOfCycles=" + numOfCycles +
                '}';
    }
}


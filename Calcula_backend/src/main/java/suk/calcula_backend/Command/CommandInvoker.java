package suk.calcula_backend.Command;

import java.util.HashMap;
import java.util.Map;

//Responsable de l'enregistrement et de l'exécution de la commande,
//il garde une liste de toutes les commandes disponibles et sait comment les exécuter.
public class CommandInvoker {
    private final Map<String, Command> commands = new HashMap<>();

    //enregistrer la commande
    public void register(String operation, Command command) {
        commands.put(operation, command);
    }

    //execute la commande
    public double execute(String operation, double num1, double num2) {
        Command command = commands.get(operation);
        if (command == null) throw new IllegalArgumentException("Invalid operation");
        return command.execute(num1, num2);
    }
}


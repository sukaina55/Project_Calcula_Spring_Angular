package suk.calcula_backend.controllers;

import org.springframework.web.bind.annotation.*;
import suk.calcula_backend.Command.*;

/*import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;*/

import java.util.List;

@RestController
@RequestMapping("/suk/calculator")
public class CalculatorController {
    private final CommandInvoker commandInvoker;

    //initialisation du commandInvoker
    //objet qui gère l'exécution des commandes (les opérations tq + / * -).
    public CalculatorController() {
        this.commandInvoker = new CommandInvoker();
        this.commandInvoker.register("add", new AddCommand());
        this.commandInvoker.register("subtract", new SubtractCommand());
        this.commandInvoker.register("multiply", new MultiplyCommand());
        this.commandInvoker.register("divide", new DivideCommand());
    }

    @GetMapping("/plugins")
    public List<String> getPlugins() {
        return List.of("add", "subtract", "multiply", "divide");
    }

    @GetMapping("/calculate")
    public double calculate(@RequestParam String operation, @RequestParam double num1, @RequestParam double num2) {
        return commandInvoker.execute(operation, num1, num2);
    }

    /*@GetMapping("/calculateExpression")
    public double calculateExpression(@RequestParam String expression) throws ScriptException {
        // Utiliser un moteur de script Java pour évaluer l'expression
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("JavaScript");
        return (double) engine.eval(expression);
    }*/

}

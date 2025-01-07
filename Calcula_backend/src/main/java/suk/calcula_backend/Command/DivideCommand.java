package suk.calcula_backend.Command;

public class DivideCommand implements Command {
    @Override
    public double execute(double num1, double num2) {
        if (num2 == 0) throw new ArithmeticException("Division by zero");
        return num1 / num2;
    }
}
package suk.calcula_backend.Command;


public class MultiplyCommand implements Command {
    @Override
    public double execute(double num1, double num2) {
        return num1 * num2;
    }
}
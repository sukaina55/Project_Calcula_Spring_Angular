import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from '../service/calculator-service.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})

export class CalculatorComponent implements OnInit {
  plugins: string[] = [];
  selectedPlugin: string = '';
  operatorSymbol: string = ''; // Store the operator symbol dynamically
  display: string = ''; // Expression to display
  result: number | null = null; // Store the result

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    // Load plugins from the backend
    this.calculatorService.getPlugins().subscribe(
      (plugins) => (this.plugins = plugins),
      (error) => console.error('Error loading plugins:', error)
    );
  }

  onButtonClick(value: string) {
    this.display += value; // Append the number or operator to the display
  }

  selectPlugin(plugin: string) {
    this.selectedPlugin = plugin;
    this.operatorSymbol = this.getOperatorSymbol(plugin); // Get the corresponding symbol
  }

  calculate() {
    if (!this.operatorSymbol) {
      alert('Please select an operator first.');
      return;
    }

    // Parse the expression (e.g., "1+2")
    const [num1, num2] = this.parseExpression(this.display, this.operatorSymbol);

    if (!num1 || !num2) {
      alert('Invalid operation. Ensure the input format is correct (e.g., 1+2).');
      return;
    }

    // Call the backend service
    this.calculatorService.calculate(this.selectedPlugin, +num1, +num2).subscribe(
      (result) => {
        this.result = result;
        this.display = result.toString(); // Update display with result
      },
      (error) => {
        console.error('Error:', error);
        alert('Failed to calculate. Please try again.');
      }
    );
  }

  clear() {
    this.display = '';
    this.result = null;
    this.selectedPlugin = '';
    this.operatorSymbol = '';
  }

  private parseExpression(expression: string, operator: string): [string, string] {
    const parts = expression.split(operator);
    return parts.length === 2 ? [parts[0], parts[1]] : ['', ''];
  }

  private getOperatorSymbol(plugin: string): string {
    const symbols: { [key: string]: string } = {
      add: '+',
      subtract: '-',
      multiply: '*',
      divide: '/',
    };
    return symbols[plugin] || '';
  }
}
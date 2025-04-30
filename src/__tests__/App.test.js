import { render, screen } from "@testing-library/react";
import App from "../App";

import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

// Test the initial state of the page

test("pizza checkbox is initially unchecked", () => {
    // Arrange
    render(<App />);
   // Act
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
   // Assert
  expect(addPepperoni).not.toBeChecked();
})


test("topping appears in toppings list when checked", () => {
    render(<App />);
  
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  
    userEvent.click(addPepperoni);
  
    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();
  });

// Test the effect of clicking the checkbox
test("checkboxes become checked when user clicks them", () => {
    render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
});

// Test the effect of clicking the checkbox a second time
test("selected topping disappears when checked a second time", () => {
    render(<App />);
  
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  
    userEvent.click(addPepperoni);
  
    expect(addPepperoni).toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();
  
    userEvent.click(addPepperoni);
  
    expect(addPepperoni).not.toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
  });
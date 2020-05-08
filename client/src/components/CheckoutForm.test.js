import React from "react";
import { render, fireEvent, findByText } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  const { getByText } = render(<CheckoutForm />);
  const formHeader = getByText(/checkout form/i);

  expect(formHeader).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
  const { getByText, getByLabelText, getByTestId, } = render(<CheckoutForm />);
  const checkoutButton = getByTestId("checkoutBtn");
  const fName = "John";
  const lName = "Doe";
  const address = "2864 Camden Place";
  const city = "Bluffton";
  const state = "SC";
  const zip = "29910";

  const fNameInput = getByLabelText(/first name:/i);
  const lNameInput = getByLabelText(/last name:/i);
  const addressInput = getByLabelText(/address:/i);
  const cityInput = getByLabelText(/city:/i);
  const stateInput = getByLabelText(/state:/i);
  const zipInput = getByLabelText(/zip:/i);

  fireEvent.change(fNameInput, { target: { value: fName } });
  fireEvent.change(lNameInput, { target: { value: lName } });
  fireEvent.change(addressInput, { target: { value: address } });
  fireEvent.change(cityInput, { target: { value: city } });
  fireEvent.change(stateInput, { target: { value: state } });
  fireEvent.change(zipInput, { target: { value: zip } });


  fireEvent.click(checkoutButton);
  
  expect(getByTestId('successMessage')).toBeInTheDocument();

  expect(getByText(`${fName} ${lName}`)).toBeInTheDocument();
  expect(getByText(address)).toBeInTheDocument();
  expect(getByText(`${city}, ${state} ${zip}`)).toBeInTheDocument();
});

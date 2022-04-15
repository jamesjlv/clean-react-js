import { FieldValidationSpy } from "../test/mock-validation";
import { ValidationComposite } from "./validation-composite";

describe("ValidationComposite", () => {
  test("Should return error if any validation fails", () => {
    const fieldvalidationSpy = new FieldValidationSpy("any_field");
    const fieldvalidationSpy2 = new FieldValidationSpy("any_field");
    fieldvalidationSpy.error = new Error("any_error_message");
    const sut = new ValidationComposite([
      fieldvalidationSpy,
      fieldvalidationSpy2,
    ]);
    const error = sut.validate("any_field", "any_value");
    expect(error).toBe("any_error_message");
  });
});

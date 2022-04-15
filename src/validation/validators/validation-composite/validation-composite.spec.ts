import { FieldValidationSpy } from "../test/mock-validation";
import { ValidationComposite } from "./validation-composite";
import faker from "@faker-js/faker";
type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy("any_field"),
    new FieldValidationSpy("any_field"),
  ];

  const sut = new ValidationComposite(fieldValidationSpy);

  return {
    sut,
    fieldValidationsSpy: fieldValidationSpy,
  };
};

describe("ValidationComposite", () => {
  test("Should return error if any validation fails", () => {
    const { sut, fieldValidationsSpy } = makeSut();
    const errorMessage = faker.random.words();
    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(errorMessage);
    const error = sut.validate("any_field", "any_value");
    expect(error).toBe(errorMessage);
  });
});

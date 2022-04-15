import { RequiredFieldError } from "../errors";
import { RequiredFieldValidation } from "./";
import faker from "@faker-js/faker";
describe("RequiredFieldValidation", () => {
  test("Should return error if field is empty", () => {
    const sut = new RequiredFieldValidation("email");
    const error = sut.validate("");
    expect(error).toEqual(new RequiredFieldError());
  });
  test("Should return falsy if field isnt empty", () => {
    const sut = new RequiredFieldValidation("email");
    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  });
});

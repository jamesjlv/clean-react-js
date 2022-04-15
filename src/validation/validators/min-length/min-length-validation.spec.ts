import { InvalidFieldError } from "@/validation/errors";
import { MinLengthValidation } from "./min-length-validation";

const makeSut = (minLength: number): MinLengthValidation =>
  new MinLengthValidation("field", minLength);

describe("MinLengthValidation", () => {
  test("Should return error if value lenght is less than required", () => {
    const sut = makeSut(12);
    const error = sut.validate("123");
    expect(error).toEqual(new InvalidFieldError());
  });
  test("Should return falsy if value lenght is more than minLimit", () => {
    const sut = makeSut(1);
    const error = sut.validate("1");
    expect(error).toBeFalsy();
  });
});

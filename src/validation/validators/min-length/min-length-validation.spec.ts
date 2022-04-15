import { InvalidFieldError } from "@/validation/errors";
import { MinLengthValidation } from "./min-length-validation";

describe("MinLengthValidation", () => {
  test("Should return error if value lenght is less than required", () => {
    const sut = new MinLengthValidation("field", 12);
    const error = sut.validate("123");
    expect(error).toEqual(new InvalidFieldError());
  });
  test("Should return falsy if value lenght is more than minLimit", () => {
    const sut = new MinLengthValidation("field", 1);
    const error = sut.validate("1");
    expect(error).toBeFalsy();
  });
});

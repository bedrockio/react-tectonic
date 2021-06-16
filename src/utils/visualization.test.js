import { formatterForDataCadence } from "./visualization";

describe("formatterForDataCadence", () => {
  it("large range than a year", () => {
    const formatter = formatterForDataCadence([
      { timestamp: new Date("2000-01-01") },
      { timestamp: new Date("2002-01-01") },
    ]);
    expect(formatter(new Date("2000/01/01"))).toBe("1/1/2000");
  });
  it("delta than 5 hour", () => {
    const formatter = formatterForDataCadence([
      { timestamp: new Date("2000-01:00:00") },
      { timestamp: new Date("2000-01:06:00") },
    ]);
    expect(formatter(new Date("2000-01:00:00"))).toBe("1/1");
  });
  it("everything else", () => {
    const formatter = formatterForDataCadence([
      { timestamp: new Date("2000-01:01:10") },
      { timestamp: new Date("2000-01:03:00") },
    ]);
    expect(formatter(new Date("2000-01:01:10"))).toBe("1:10 AM");
  });
});

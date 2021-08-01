import { validIntervals, determineInterval } from "./intervals";

describe("intevals", () =>  {
  describe("#validIntervals()", () =>  {
    it("should find valid intervals", () =>  {
      const start = 1625243590590;
      const end = 1626834365440;
      expect(validIntervals(new Date(start), new Date(end)).toString()).toBe(
        ["1h", "1d", "1w"].toString()
      );
    });
  });

  describe("#determineInterval()", () =>  {
    it("should determine an interval", () =>  {
      const start = 1625243590590;
      const end = 1626834365440;
      expect(
        determineInterval({
          from: new Date(start),
          to: new Date(end),
        }).toString()
      ).toBe("1d");
    });

    it("should handle undefined", () =>  {
      const start = 1625243590590;
      const end = undefined;
      expect(
        determineInterval({
          from: new Date(start),
          to: new Date(end),
        })
      ).toBe("1d");
    });
  });
});

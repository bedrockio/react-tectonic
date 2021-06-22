const { convert } = require("./dateMath");

describe("datemath", function () {
  describe("#convert()", function () {
    it("should convert seconds to milliseconds", function () {
      const dateTime = Date.now();
      const milliseconds = convert("now-15s");
      expect(dateTime + milliseconds).toBe(dateTime - 15 * 1000);
    });
    it("should convert minutes to milliseconds", function () {
      const dateTime = Date.now();
      const milliseconds = convert("now-5m");
      expect(dateTime + milliseconds).toBe(dateTime - 5 * 60 * 1000);
    });
    it("should convert now", function () {
      const dateTime = Date.now();
      const milliseconds = convert("now-1d/d");
      console.log(milliseconds);
      expect(dateTime + milliseconds).toBe(dateTime);
    });
    it("should convert hours to milliseconds", function () {
      const dateTime = Date.now();
      const milliseconds = convert("now-7h");
      expect(dateTime + milliseconds).toBe(dateTime - 7 * 60 * 60 * 1000);
    });
    it("should convert days to milliseconds", function () {
      const dateTime = Date.now();
      const milliseconds = convert("now-4d");
      expect(dateTime + milliseconds).toBe(dateTime - 4 * 24 * 60 * 60 * 1000);
    });
    it("should convert weeks to milliseconds", function () {
      const dateTime = Date.now();
      const milliseconds = convert("now-3w");
      expect(dateTime + milliseconds).toBe(dateTime - 21 * 24 * 60 * 60 * 1000);
    });
    it("should convert months to milliseconds", function () {
      const dateTime = Date.now();
      const milliseconds = convert("now-2M");
      expect(dateTime + milliseconds).toBe(dateTime - 60 * 24 * 60 * 60 * 1000);
    });
    it("should convert years to milliseconds", function () {
      const dateTime = Date.now();
      const milliseconds = convert("now-1y");
      expect(dateTime + milliseconds).toBe(
        dateTime - 365 * 24 * 60 * 60 * 1000
      );
    });
    it("should convert every combination to milliseconds", function () {
      const dateTime = Date.now();
      const milliseconds = convert("now-15s+5m-7h+4d-3w+2M-1y");
      expect(dateTime + milliseconds).toBe(
        dateTime -
          15 * 1000 +
          5 * 60 * 1000 -
          7 * 60 * 60 * 1000 +
          4 * 24 * 60 * 60 * 1000 -
          21 * 24 * 60 * 60 * 1000 +
          60 * 24 * 60 * 60 * 1000 -
          365 * 24 * 60 * 60 * 1000
      );
    });
  });
});

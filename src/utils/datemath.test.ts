import { parse } from "./datemath";
import { sub, add } from "date-fns";

describe("datemath", () => {
  describe("#parse()", () => {
    it("should convert now", () => {
      const dateTime = new Date();
      expect(parse("now", { forceNow: dateTime }).valueOf()).toBe(
        dateTime.valueOf()
      );
    });
    it("should convert seconds to milliseconds", () => {
      const dateTime = new Date();
      expect(parse("now-15s", { forceNow: dateTime }).valueOf()).toBe(
        dateTime.valueOf() - 15 * 1000
      );
    });

    it("should convert minutes to milliseconds", () => {
      const dateTime = new Date();
      expect(parse("now-5m", { forceNow: dateTime }).valueOf()).toBe(
        dateTime.valueOf() - 5 * 60 * 1000
      );
    });

    it("should convert hours to milliseconds", () => {
      const dateTime = new Date();
      expect(parse("now-7h", { forceNow: dateTime }).valueOf()).toBe(
        dateTime.valueOf() - 7 * 60 * 60 * 1000
      );
    });

    it("should convert days to milliseconds", () => {
      const dateTime = new Date();
      expect(parse("now-4d", { forceNow: dateTime }).valueOf()).toBe(
        dateTime.valueOf() - 4 * 24 * 60 * 60 * 1000
      );
    });

    it("should convert weeks to milliseconds", () => {
      const dateTime = new Date();
      expect(parse("now-3w", { forceNow: dateTime }).valueOf()).toBe(
        dateTime.valueOf() - 21 * 24 * 60 * 60 * 1000
      );
    });

    it("should convert months to milliseconds", () => {
      const dateTime = new Date();
      expect(parse("now-2M", { forceNow: dateTime }).valueOf()).toBe(
        sub(dateTime, {
          months: 2,
        }).valueOf()
      );
    });

    it("should convert years to milliseconds", () => {
      const dateTime = new Date();
      expect(parse("now-1y", { forceNow: dateTime }).toLocaleString()).toBe(
        sub(dateTime, {
          years: 1,
        }).toLocaleString()
      );
    });

    it("should convert every combination to milliseconds", () => {
      const dateTime = new Date();

      let result = add(
        sub(dateTime, {
          seconds: 15,
          hours: 7,
          weeks: 3,
          years: 1,
        }),
        {
          minutes: 5,
          days: 4,
          months: 2,
        }
      );

      expect(
        parse("now-15s+5m-7h+4d-3w+2M-1y", {
          forceNow: dateTime,
        }).toLocaleString()
      ).toBe(result.toLocaleString());
    });
  });
});

// ─── Arabic ↔ English translations for the public-facing app ─────────────────
// Usage: translate("form.name") → returns the correct string for the active language
//
// Each sub-file groups translations by domain (category, form, booking, etc.)
// Each entry: { en: "English text", ar: "Arabic text" }

import { category } from "./category";
import { leadType } from "./leadType";
import { location } from "./location";
import { price } from "./price";
import { form } from "./form";
import { button } from "./button";
import { hero } from "./hero";
import { status } from "./status";
import { booking } from "./booking";
import { checkout } from "./checkout";
import { cancel } from "./cancel";
import { success } from "./success";
import { source } from "./source";
import { consultLevels } from "./consultLevels";
import { bookingSteps } from "./booking/bookingSteps";
import { identity } from "./identity";

export const dictionary = {
  ...category,
  ...leadType,
  ...location,
  ...price,
  ...form,
  ...button,
  ...hero,
  ...status,
  ...booking,
  ...checkout,
  ...cancel,
  ...success,
  ...source,
  ...consultLevels,
  ...bookingSteps,
  ...identity,
};

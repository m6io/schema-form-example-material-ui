import { CustomFields } from "@m6oss/schema-form";
import { MuiArrayField } from "./MuiArrayField";
import { MuiBooleanField } from "./MuiBooleanField";
import { MuiNumberField } from "./MuiNumberField";
import { MuiObjectField } from "./MuiObjectField";
import { MuiStringField } from "./MuiStringField";
import { MuiFormComponent } from "./MuiFormComponent";

/**
 * Custom Fields Object
 */
const muiCustomFields: CustomFields = {
  ArrayField: MuiArrayField,
  BooleanField: MuiBooleanField,
  NumberField: MuiNumberField,
  ObjectField: MuiObjectField,
  StringField: MuiStringField,
};

export { muiCustomFields, MuiFormComponent };

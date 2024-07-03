import { SchemaDefinitions, useArrayField } from "@react-formgen/json-schema";
import { JSONSchema7, BaseArraySchema, CustomFields } from "@react-formgen/json-schema";
import { renderField } from "@react-formgen/json-schema";
import { IconButton, Box, Button, Typography } from "@mui/material";
import { Close, ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

/**
 * Array Field Component Template
 * @param {BaseArraySchema} schema - The schema for the array field.
 * @param {string[]} path - The path to the array field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {CustomFields} customFields - The custom fields object.
 * @returns {JSX.Element} - The array field component.
 * @example
 * <MuiArrayField schema={schema} path={path} definitions={definitions} customFields={customFields} />
 */
export const MuiArrayField: React.FC<{
  schema: BaseArraySchema;
  path: string[];
  definitions: SchemaDefinitions;
  customFields?: CustomFields;
}> = ({ schema, path, definitions, customFields = {} }) => {
  const { valueAtPath, errorsAtPath, moveItem, removeItem, addItem } =
    useArrayField(path, schema, definitions, []);

  return (
    <Box border={1} borderColor="gray.400" p={2} my={2} borderRadius={1}>
      {schema.title && <Typography variant="h6">{schema.title}</Typography>}
      {schema.description && (
        <Typography variant="body2" color="textSecondary">
          {schema.description}
        </Typography>
      )}
      <Box>
        {schema.items &&
          Array.isArray(valueAtPath) &&
          valueAtPath.map((_, index: number) => (
            <Box key={index} position="relative" p={2} my={1}>
              <IconButton
                onClick={() => removeItem(index)}
                style={{ position: "absolute", top: 8, right: 0 }}
              >
                <Close />
              </IconButton>
              <IconButton
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
                style={{ position: "absolute", top: 8, right: 40 }}
              >
                <ArrowDropUp />
              </IconButton>
              <IconButton
                onClick={() => moveItem(index, "down")}
                disabled={index === valueAtPath.length - 1}
                style={{ position: "absolute", top: 8, right: 80 }}
              >
                <ArrowDropDown />
              </IconButton>
              {renderField(
                schema.items as JSONSchema7,
                [...path, index.toString()],
                definitions,
                customFields
              )}
            </Box>
          ))}
        <Button variant="contained" color="primary" onClick={addItem}>
          Add Item
        </Button>
        {errorsAtPath &&
          errorsAtPath.map((error, index) => (
            <Typography key={index} color="error">
              {error.message}
            </Typography>
          ))}
      </Box>
    </Box>
  );
};

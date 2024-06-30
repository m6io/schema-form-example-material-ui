import { BaseObjectSchema, useFieldErrors } from "@m6oss/schema-form";
import { SchemaDefinitions } from "@m6oss/schema-form";
import { JSONSchema7, CustomFields } from "@m6oss/schema-form";
import { renderField } from "@m6oss/schema-form";
import { Box, Typography } from "@mui/material";

/**
 * Object Field Component Template
 * @param {BaseObjectSchema} schema - The schema for the object field.
 * @param {string[]} path - The path to the object field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {CustomFields} customFields - The custom fields object.
 * @returns {JSX.Element} - The object field component.
 * @example
 * <MuiObjectField schema={schema} path={path} definitions={definitions} customFields={customFields} />
 *
 */
export const MuiObjectField: React.FC<{
  schema: BaseObjectSchema;
  path: string[];
  definitions: SchemaDefinitions;
  customFields?: CustomFields;
}> = ({ schema, path, definitions, customFields = {} }) => {
  const errorsAtPath = useFieldErrors(path);

  return (
    <Box border={1} borderColor="gray.400" p={2} my={2} borderRadius={1}>
      {schema.title && <Typography variant="h6">{schema.title}</Typography>}
      {schema.description && (
        <Typography variant="body2" color="textSecondary">
          {schema.description}
        </Typography>
      )}
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <Typography key={index} color="error">
            {error.message}
          </Typography>
        ))}
      <Box>
        {schema.properties &&
          Object.keys(schema.properties).map((key) => (
            <Box key={key} mb={2}>
              {renderField(
                schema.properties?.[key] as JSONSchema7,
                [...path, key],
                definitions,
                customFields
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

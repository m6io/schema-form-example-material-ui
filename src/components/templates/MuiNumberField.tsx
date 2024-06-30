import { NumberSchema, useFieldData, useFieldErrors } from "@m6oss/schema-form";
import { TextField, Box, Typography } from "@mui/material";

/**
 * Number Field Component Template
 * @param {NumberSchema} schema - The schema for the number field.
 * @param {string[]} path - The path to the number field in the form data.
 * @returns {JSX.Element} - The number field component.
 * @example
 * <MuiNumberField schema={schema} path={path} />
 *
 */
export const MuiNumberField: React.FC<{
  schema: NumberSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value ? Number(event.target.value) : null);
  };

  return (
    <Box>
      {schema.title && <Typography variant="h6">{schema.title}</Typography>}
      <TextField
        type="number"
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        label={schema.title || ""}
        variant="outlined"
        fullWidth
        margin="normal"
      />
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
    </Box>
  );
};

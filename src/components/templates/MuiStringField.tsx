import { StringSchema, useFieldData, useFieldErrors } from "@m6oss/schema-form";
import { TextField, Select, MenuItem, Box, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const MuiStringField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if the schema has oneOf or enum options.
  if (schema.enum || schema.oneOf) {
    return <MuiSelectField schema={schema} path={path} />;
  } // Check if the schema has a format of date, datetime, or date-time. If so, return the MuiDateField component.
  else if (
    schema.format &&
    ["date", "datetime", "date-time"].includes(schema.format)
  ) {
    return <MuiDateField schema={schema} path={path} />;
  } // Check if the schema has a uiSchema of textarea. If so, return the MuiTextareaField component.
  else if (schema.uiSchema?.component === "textarea") {
    return <MuiTextareaField schema={schema} path={path} />;
  }
  return <MuiInputField schema={schema} path={path} />;
};

/**
 * Input Field Component Template
 * @param {StringSchema} schema - The schema for the input field.
 * @param {string[]} path - The path to the input field in the form data.
 * @returns {JSX.Element} - The input field component.
 * @example
 * <MuiInputField schema={schema} path={path} />
 */
const MuiInputField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value);
  };

  const inputType =
    schema.format && ["password", "email", "url"].includes(schema.format)
      ? schema.format
      : schema.uiSchema?.component === "tel"
        ? "tel"
        : "text";

  return (
    <Box>
      {schema.title && <Typography variant="h6">{schema.title}</Typography>}
      <TextField
        type={inputType}
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

/**
 * Textarea Field Component Template
 * @param {StringSchema} schema - The schema for the textarea field.
 * @param {string[]} path - The path to the textarea field in the form data.
 * @returns {JSX.Element} - The textarea field component.
 * @example
 * <MuiTextareaField schema={schema} path={path} />
 */
const MuiTextareaField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueAtPath(event.target.value);
  };

  return (
    <Box>
      {schema.title && <Typography variant="h6">{schema.title}</Typography>}
      <TextField
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        label={schema.title || ""}
        variant="outlined"
        multiline
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

/**
 * Select Field Component Template
 * @param {StringSchema} schema - The schema for the select field.
 * @param {string[]} path - The path to the select field in the form data.
 * @returns {JSX.Element} - The select field component.
 * @example
 * <MuiSelectField schema={schema} path={path} />
 */
const MuiSelectField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, "");
  const errorsAtPath = useFieldErrors(path);

  return (
    <Box>
      {schema.title && <Typography variant="h6">{schema.title}</Typography>}
      <Select
        value={valueAtPath}
        onChange={(event) => setValueAtPath(event.target.value)}
        displayEmpty
        variant="outlined"
        fullWidth
        // margin="normal"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {schema.enum
          ? schema.enum.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))
          : schema.oneOf?.map((option) => (
              <MenuItem key={option.const} value={option.const}>
                {option.title}
              </MenuItem>
            ))}
      </Select>
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

/**
 * Date Field Component Template
 * @param {StringSchema} schema - The schema for the date field.
 * @param {string[]} path - The path to the date field in the form data.
 * @returns {JSX.Element} - The date field component.
 * @example
 * <MuiDateField schema={schema} path={path} />
 */
const MuiDateField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  return (
    <Box>
      {schema.title && <Typography variant="h6">{schema.title}</Typography>}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={valueAtPath ? dayjs(valueAtPath) : null}
          onChange={(value) => setValueAtPath(value?.format("YYYY-MM-DD"))}
          label={schema.title || ""}
        />
      </LocalizationProvider>
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

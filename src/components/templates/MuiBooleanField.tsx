import {
  BooleanSchema,
  useFieldData,
  useFieldErrors,
} from "@m6oss/schema-form";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";

/**
 * Boolean Field Component Template
 * @param {BooleanSchema} schema - The schema for the boolean field.
 * @param {string[]} path - The path to the boolean field in the form data.
 * @returns {JSX.Element} - The boolean field component.
 * @example
 * <MuiBooleanField schema={schema} path={path} />
 */
export const MuiBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if no oneOf options. This is the default boolean field.
  if (!schema.oneOf) {
    return <MuiCheckboxBooleanField schema={schema} path={path} />;
  }

  // Return the appropriate boolean field based on the uiSchema.
  switch (schema.uiSchema?.component) {
    case "radio":
      return <MuiRadioBooleanField schema={schema} path={path} />;
    case "switch":
      return <MuiSwitchBooleanField schema={schema} path={path} />;
    default: // in the case that the uiSchema does not match radio or switch
      return <MuiCheckboxBooleanField schema={schema} path={path} />;
  }
};

/**
 * Radio Boolean Field Component Template.
 * @param {BooleanSchema} schema - The schema for the radio boolean field.
 * @param {string[]} path - The path to the radio boolean field in the form data.
 * @returns {JSX.Element} - The radio boolean field component.
 * @example
 * <MuiRadioBooleanField schema={schema} path={path} />
 */
export const MuiRadioBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, false);
  const errorsAtPath = useFieldErrors(path);

  if (!schema.oneOf || schema.uiSchema?.component !== "radio") {
    return null;
  } else {
    return (
      <Box>
        {schema.title && <Typography variant="h6">{schema.title}</Typography>}
        <RadioGroup
          value={valueAtPath}
          onChange={(event) => setValueAtPath(event.target.value === "true")}
        >
          {schema.oneOf.map((option) => (
            <FormControlLabel
              key={option.title}
              value={option.const.toString()}
              control={<Radio />}
              label={option.title}
            />
          ))}
        </RadioGroup>
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
  }
};

/**
 * Switch Boolean Field Component Template.
 * @param {BooleanSchema} schema - The schema for the switch boolean field.
 * @param {string[]} path - The path to the switch boolean field in the form data.
 * @returns {JSX.Element} - The switch boolean field component.
 * @example
 * <MuiSwitchBooleanField schema={schema} path={path} />
 */
export const MuiSwitchBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, false);
  const errorsAtPath = useFieldErrors(path);

  if (!schema.oneOf || schema.uiSchema?.component !== "switch") {
    return null;
  } else {
    return (
      <Box>
        {schema.title && <Typography variant="h6">{schema.title}</Typography>}
        <Box display="flex" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            {schema.oneOf.find((option) => option.const === false)?.title}
          </Typography>
          <Switch
            checked={valueAtPath}
            onChange={(event) => setValueAtPath(event.target.checked)}
          />
          <Typography variant="body2" color="textSecondary">
            {schema.oneOf.find((option) => option.const === true)?.title}
          </Typography>
        </Box>
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
  }
};

/**
 * Checkbox Boolean Field Component Template.
 * @param {BooleanSchema} schema - The schema for the checkbox boolean field.
 * @param {string[]} path - The path to the checkbox boolean field in the form data.
 * @returns {JSX.Element} - The checkbox boolean field component.
 * @example
 * <MuiCheckboxBooleanField schema={schema} path={path} />
 */
export const MuiCheckboxBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, false);
  const errorsAtPath = useFieldErrors(path);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.checked);
  };

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={valueAtPath} onChange={handleChange} />}
        label={schema.title}
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

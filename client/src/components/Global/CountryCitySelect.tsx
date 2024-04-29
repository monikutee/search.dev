import React from "react";
import { Country, City } from "country-state-city";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export const CountryCitySelect: React.FC<{
  helpers: any;
  disabled?: boolean;
}> = ({ helpers, disabled = false }) => {
  const [countryCode, setCountryCode] = React.useState(
    helpers.values.country ?? ""
  );
  const countries = Country.getAllCountries();
  const cities = React.useMemo(
    () => City.getCitiesOfCountry(countryCode),
    [countryCode]
  );

  const handleCountryChange = (event: any) => {
    if (event) {
      const newCountryCode = event.code as string;
      if (newCountryCode !== countryCode) {
        setCountryCode(newCountryCode);
        helpers.setFieldValue("country", event.label);
        helpers.setFieldValue("city", "");
      }
    } else {
      helpers.setFieldValue("country", "");
    }
  };

  const handleCityChange = (event: any) => {
    if (event) {
      helpers.setFieldValue("city", event.label);
    } else {
      helpers.setFieldValue("city", "");
    }
  };

  return (
    <>
      <FormControl fullWidth>
        <Autocomplete
          disabled={disabled}
          disablePortal
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.code}>
                {option.flag} {option.label}
              </li>
            );
          }}
          value={helpers.values.country}
          options={countries.map((country) => {
            return {
              label: `${country.name}`,
              code: country.isoCode,
              flag: country.flag,
            };
          })}
          onChange={(_e, value) => handleCountryChange(value)}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              error={helpers.errors.country && helpers.touched.country}
              label="Country"
            />
          )}
        />
        {helpers.touched.country && (
          <FormHelperText error>{helpers.errors.country}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          disabled={disabled}
          renderOption={(props, option) => {
            return (
              <li {...props} key={`${option.label}, ${option.state}`}>
                {option.label}
              </li>
            );
          }}
          value={helpers.values.city}
          options={
            cities && cities.length > 0
              ? cities.map((city) => {
                  return {
                    label: `${city.name}`,
                    state: city.stateCode,
                  };
                })
              : [
                  {
                    label: `-`,
                    state: "-",
                  },
                ]
          }
          onChange={(_e, value) => handleCityChange(value)}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              error={helpers.errors.city && helpers.touched.city}
              label="City"
            />
          )}
        />
        {helpers.touched.city && (
          <FormHelperText error>{helpers.errors.city}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

import React from "react";
import { Country, City } from "country-state-city";
import { ICountry, ICity } from "country-state-city";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

export const CountryCitySelect: React.FC<{ helpers: any }> = ({ helpers }) => {
  const [countryCode, setCountryCode] = React.useState("");
  const [cities, setCities] = React.useState<ICity[] | undefined>(undefined);
  const countries = Country.getAllCountries();

  React.useEffect(() => {
    setCities(City.getCitiesOfCountry(countryCode));
  }, [countryCode]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          labelId="country-select-label"
          name="country"
          label="Country"
          onChange={(e) => {
            setCountryCode(e.target.value as string);
            helpers.handleChange(e);
          }}
          MenuProps={MenuProps}
          error={helpers.touched.country && !!helpers.errors.country}
        >
          {countries.map((country: ICountry, i) => (
            <MenuItem value={country.isoCode} key={i}>
              {country.name} {country.flag}
            </MenuItem>
          ))}
        </Select>
        {helpers.touched.country && (
          <FormHelperText error>{helpers.errors.country}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="city-select-label">City</InputLabel>
        <Select
          labelId="city-select-label"
          name="city"
          label="City"
          onChange={helpers.handleChange}
          MenuProps={MenuProps}
          error={helpers.touched.city && !!helpers.errors.city}
        >
          {cities && cities.length > 0 ? (
            cities.map((city: ICity, i) => (
              <MenuItem value={city.name} key={i}>
                {city.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={"-"}>-</MenuItem>
          )}
        </Select>
        {helpers.touched.city && (
          <FormHelperText error>{helpers.errors.city}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

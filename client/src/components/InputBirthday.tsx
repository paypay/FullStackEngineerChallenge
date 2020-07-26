import { yupResolver } from "@hookform/resolvers";
import { i18n } from "@lingui/core";
import { defineMessage } from "@lingui/macro";
import classNames from "classnames";
import { DateTime } from "luxon";
import React, {
  FC,
  HTMLProps,
  Ref,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { FormStateProxy } from "react-hook-form/dist/types/form";
import * as yup from "yup";

import { FormGroup, Input } from ".";

interface InputBirthday extends HTMLProps<HTMLInputElement> {
  // Get submit count from parent to trigger validations
  formState?: FormStateProxy;
}

const schema = yup.object().shape({
  day: yup.number().min(1).max(31),
  month: yup.number().min(1).max(12),
  year: yup
    .number()
    .min(DateTime.local().minus({ year: 120 }).year)
    .max(DateTime.local().minus({ year: 10 }).year),
});

export const InputBirthday: FC<InputBirthday> = React.forwardRef(
  (
    {
      name = "birthday",
      className,
      disabled,
      defaultValue,
      formState,
      ...props
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const [birthday, setBirthday] = useState<string | null>("");

    const classes = classNames("text-center", className);

    const {
      register,
      setValue,
      getValues,
      trigger: triggerValidation,
      errors,
    } = useForm({
      resolver: yupResolver(schema),
      // Validate each field on change
      mode: "onChange",
    });

    // On submit, trigger validation for year, month and day
    useEffect(() => {
      if (formState?.submitCount) {
        triggerValidation();
      }
    }, [formState?.submitCount]);

    // On mount calculate defaultValue
    useEffect(() => {
      if (defaultValue) {
        const date = DateTime.fromISO(defaultValue as string);
        if (date.isValid) {
          setValue("day", date.day);
          setValue("month", date.month);
          setValue("year", date.year);
          setBirthday(date.toISODate());
        }
      }
    }, []);

    // Update hidden input when the 3 inputs are valid, otherwise set it to invalid
    const onChangeListener = useCallback(() => {
      const { day = 0, month = 0, year = 0 } = getValues();
      const hasErrors = Object.keys(errors).length > 0;

      if (!hasErrors) {
        const date = DateTime.fromObject({
          day: Number(day),
          month: Number(month),
          year: Number(year),
        });
        setBirthday(date.toISODate());
      } else {
        setBirthday("");
      }
    }, []);

    return (
      <div>
        <div className="grid grid-cols-3 gap-2">
          <FormGroup displayError={false} className="mb-0" error={errors.year}>
            <Input
              name="year"
              type="number"
              placeholder={i18n._(
                defineMessage({
                  id: "input.birthday.year.placeholder",
                  message: "YYYY",
                })
              )}
              disabled={disabled}
              className={classes}
              onChange={onChangeListener}
              ref={register}
              min={DateTime.local().minus({ year: 120 }).year}
              max={new Date().getFullYear()}
              autoComplete="bday-year"
            />
          </FormGroup>

          <FormGroup displayError={false} className="mb-0" error={errors.month}>
            <Input
              name="month"
              type="number"
              placeholder={i18n._(
                defineMessage({
                  id: "input.birthday.month.placeholder",
                  message: "MM",
                })
              )}
              disabled={disabled}
              className={classes}
              onChange={onChangeListener}
              ref={register}
              min={1}
              max={12}
              autoComplete="bday-month"
            />
          </FormGroup>

          <FormGroup displayError={false} className="mb-0" error={errors.day}>
            <Input
              name="day"
              type="number"
              placeholder={i18n._(
                defineMessage({
                  id: "input.birthday.day.placeholder",
                  message: "DD",
                })
              )}
              disabled={disabled}
              className={classes}
              onChange={onChangeListener}
              ref={register}
              min={1}
              autoComplete="bday-day"
            />
          </FormGroup>
        </div>
        <input
          {...props}
          name={name}
          className="hidden"
          readOnly
          type="date"
          disabled={disabled}
          defaultValue={birthday || ""}
          ref={ref}
          autoComplete="bday"
        />
      </div>
    );
  }
);

InputBirthday.displayName = "InputBirthday";

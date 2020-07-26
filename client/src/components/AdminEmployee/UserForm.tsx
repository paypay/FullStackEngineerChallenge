import { yupResolver } from "@hookform/resolvers";
import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { DateTime } from "luxon";
import React, { FC } from "react";
import { useForm, UseFormMethods } from "react-hook-form";
import * as yup from "yup";

import { Button, FormGroup, Input, InputBirthday } from "../";
import { CreateUserInput, UpdateUserInput, User } from "../../graphql/types";
import { handleClose } from "../Modal";
import { TextArea } from "../TextArea";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthday: yup.date().notRequired(),
  email: yup.string().email().required(),
  phone: yup.string().notRequired().min(8),
  mobilePhone: yup.string().notRequired().min(8),
  address: yup.string().notRequired(),
});

interface FormSubmitData {
  input: CreateUserInput | UpdateUserInput;
  setError: UseFormMethods["setError"];
}

export type FormSubmit = (data: FormSubmitData) => void;

interface UserFormProps {
  user?: Partial<User>;
  loading?: boolean;
  onFormSubmit: FormSubmit;
}

export const UserForm: FC<UserFormProps> = ({
  user,
  loading,
  onFormSubmit,
}) => {
  const { register, handleSubmit, formState, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async ({ birthday, ...input }: any) => {
    onFormSubmit({
      input: {
        ...input,
        birthday: DateTime.fromJSDate(birthday).toISODate(),
      },
      setError,
    });
  });
  return (
    <form noValidate={true} onSubmit={onSubmit}>
      <div className="md:flex items-center">
        <div className="mx-auto mb-4 md:mb-0 md:mr-6 flex-shrink-0 flex-grow-0 w-40 h-40 bg-gray-400 rounded text-6xl text-gray-700">
          <div className="mx-auto w-full h-full flex items-center justify-center">
            {!user?.avatar && <AddAPhotoIcon fontSize="inherit" />}
            {user?.avatar && (
              <img
                className="w-full h-full object-fit rounded"
                src={user?.avatar}
              />
            )}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormGroup
              label={i18n._(
                defineMessage({
                  id: "admin.user.modal.name",
                  message: "Name",
                })
              )}
              labelFor="firstName"
              error={errors?.firstName}
            >
              <Input
                id="firstName"
                defaultValue={user?.firstName}
                name="firstName"
                className="py-1"
                type="text"
                required
                ref={register}
                disabled={loading}
              />
            </FormGroup>
            <FormGroup
              label={i18n._(
                defineMessage({
                  id: "admin.user.modal.lastName",
                  message: "Last Name",
                })
              )}
              labelFor="lastName"
              error={errors?.lastName}
            >
              <Input
                id="lastName"
                defaultValue={user?.lastName}
                className="py-1"
                name="lastName"
                type="text"
                required
                ref={register}
                disabled={loading}
              />
            </FormGroup>

            <FormGroup
              label={i18n._(
                defineMessage({
                  id: "admin.user.modal.birthday",
                  message: "Birthday",
                })
              )}
              labelFor="birthday"
              error={errors?.birthday}
            >
              <InputBirthday
                name="birthday"
                formState={formState}
                className="py-1"
                type="date"
                required
                ref={register}
                defaultValue={user?.birthday}
                disabled={loading}
              />
            </FormGroup>

            <FormGroup
              label={i18n._(
                defineMessage({
                  id: "admin.user.modal.email",
                  message: "Email",
                })
              )}
              labelFor="email"
              error={errors?.email}
            >
              <Input
                id="email"
                defaultValue={user?.email}
                name="email"
                className="py-1"
                type="email"
                required
                ref={register}
                disabled={loading}
              />
            </FormGroup>
            <FormGroup
              label={i18n._(
                defineMessage({
                  id: "admin.user.modal.phone",
                  message: "Phone",
                })
              )}
              labelFor="phone"
              error={errors?.phone}
            >
              <Input
                id="phone"
                defaultValue={user?.phone}
                name="phone"
                className="py-1"
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
                ref={register}
                disabled={loading}
              />
            </FormGroup>
            <FormGroup
              label={i18n._(
                defineMessage({
                  id: "admin.user.modal.mobilePhone",
                  message: "Mobile Phone",
                })
              )}
              labelFor="mobilePhone"
              error={errors?.mobilePhone}
            >
              <Input
                id="mobilePhone"
                defaultValue={user?.mobilePhone}
                name="mobilePhone"
                className="py-1"
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
                ref={register}
                disabled={loading}
              />
            </FormGroup>
          </div>
        </div>
      </div>
      <FormGroup
        label={i18n._(
          defineMessage({
            id: "admin.user.modal.address",
            message: "Address",
          })
        )}
        labelFor="address"
        error={errors?.address}
        className="mt-4"
      >
        <TextArea
          id="address"
          defaultValue={user?.address}
          name="address"
          type="tel"
          required
          ref={register}
          disabled={loading}
        />
      </FormGroup>

      <div className="py-3 sm:flex sm:flex-row-reverse mt-6">
        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <Button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center w-full rounded-md border border-transparent px-8 py-2 text-base leading-6 font-medium text-white shadow-sm  focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <Trans id="admin.employee.form.submit">Submit</Trans>
          </Button>
        </span>
        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <Button
            type="button"
            variant="default"
            className="w-auto"
            size="sm"
            onClick={() => handleClose()}
          >
            <Trans id="admin.user.modal.cancel">Cancel</Trans>
          </Button>
        </span>
      </div>
    </form>
  );
};

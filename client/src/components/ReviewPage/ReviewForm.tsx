import { yupResolver } from "@hookform/resolvers";
import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import React, { FC } from "react";
import { useForm, UseFormMethods } from "react-hook-form";
import * as yup from "yup";

import { FormGroup } from "../../components/FormGroup";
import { CreateReviewInput } from "../../graphql/types";
import { Button } from "../Button/Button";
import { InputRating } from "../InputRating";
import { handleClose } from "../Modal";
import { TextArea } from "../TextArea";

const rating = yup.number().min(1).max(5).required();

const schema = yup.object().shape({
  comment: yup.string().required(),
  attitude: rating,
  communication: rating,
  growth: rating,
  dependability: rating,
  productivity: rating,
  initiative: rating,
  innovation: rating,
});

interface FormSubmitData {
  input: CreateReviewInput;
  setError: UseFormMethods["setError"];
}

export type FormSubmit = (data: FormSubmitData) => void;

interface ReviewFormProps {
  loading?: boolean;
  onFormSubmit: FormSubmit;
}

export const ReviewForm: FC<ReviewFormProps> = ({ loading, onFormSubmit }) => {
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (input: any) => {
    onFormSubmit({
      input,
      setError,
    });
  });
  return (
    <form noValidate={true} className="w-full" onSubmit={onSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <FormGroup
          className="text-gray-700 text-lg"
          label={i18n._(
            defineMessage({
              id: "admin.review.modal.attitude",
              message: "Attitude",
            })
          )}
          labelFor="attitude"
          position="horizontal"
          error={errors.attitude}
        >
          <InputRating
            id="attitude"
            name="attitude"
            ref={register}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup
          className="text-gray-700 text-lg"
          label={i18n._(
            defineMessage({
              id: "admin.review.modal.productivity",
              message: "Productivity",
            })
          )}
          labelFor="productivity"
          position="horizontal"
          error={errors.productivity}
        >
          <InputRating
            id="productivity"
            name="productivity"
            className="inline-block"
            ref={register}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup
          className="text-gray-700 text-lg"
          label={i18n._(
            defineMessage({
              id: "admin.review.modal.communication",
              message: "Communication",
            })
          )}
          labelFor="communication"
          position="horizontal"
          error={errors.communication}
        >
          <InputRating
            id="communication"
            name="communication"
            ref={register}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup
          className="text-gray-700 text-lg"
          label={i18n._(
            defineMessage({
              id: "admin.review.modal.initiative",
              message: "Initiative",
            })
          )}
          labelFor="initiative"
          position="horizontal"
          error={errors.initiative}
        >
          <InputRating
            id="initiative"
            name="initiative"
            ref={register}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup
          className="text-gray-700 text-lg"
          label={i18n._(
            defineMessage({
              id: "admin.review.modal.growth",
              message: "Growth",
            })
          )}
          labelFor="growth"
          position="horizontal"
          error={errors.growth}
        >
          <InputRating
            id="growth"
            name="growth"
            ref={register}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup
          className="text-gray-700 text-lg"
          label={i18n._(
            defineMessage({
              id: "admin.review.modal.innovation",
              message: "Innovation",
            })
          )}
          labelFor="innovation"
          position="horizontal"
          error={errors.innovation}
        >
          <InputRating
            id="innovation"
            name="innovation"
            ref={register}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup
          className="text-gray-700 text-lg"
          label={i18n._(
            defineMessage({
              id: "admin.review.modal.dependability",
              message: "Dependability",
            })
          )}
          labelFor="dependability"
          position="horizontal"
          error={errors.attitude}
        >
          <InputRating name="dependability" ref={register} disabled={loading} />
        </FormGroup>
      </div>
      <div className="border-b border-gray-300 my-8 w-full" />

      <FormGroup
        label={i18n._(
          "admin.review.modal.comments",
          {},
          { message: "Comments" }
        )}
        labelFor="comment"
        className="mt-4"
        error={errors.comment}
      >
        <TextArea
          id="comment"
          name="comment"
          type="text"
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
            disabled={loading}
            size="sm"
            onClick={() => handleClose()}
          >
            <Trans id="auth.review.modal.cancel">Cancel</Trans>
          </Button>
        </span>
      </div>
    </form>
  );
};

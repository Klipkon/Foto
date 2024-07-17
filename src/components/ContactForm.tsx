import type { Field as IField, Button as IButton } from "@/interfaces/page.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Formik, Form, Field, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox.tsx";
import { Separator } from "./ui/separator.tsx";

interface Props {
  fields: IField[];
  button: IButton;
}

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy aders email!")
    .required("Aby otrzymać wiadomość zwrotną podaj swój adres email!"),
  message: Yup.string()
    .min(1)
    .max(1000)
    .required("Napisz proszę w jakiej sprawie się kontaktujesz!"),
  allowToSendMarketingInfo: Yup.boolean()
    .oneOf([true], "Zgoda jest wymagana!")
    .required(),
});

export function ContactForm({ fields, button }: Props) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState<string>("");

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    await executeRecaptcha("Submit").then((token) => setToken(token));
    console.log(token);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  async function onSumbmit(
    values: Yup.InferType<typeof FormSchema>,
    actions: FormikHelpers<Yup.InferType<typeof FormSchema>>
  ) {
    await handleReCaptchaVerify();
    fetch(import.meta.env.PUBLIC_STRAPI_URL + "/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        message: values.message,
        allowToSendMarketingInfo: values.allowToSendMarketingInfo,
        token: token,
      }),
    }).then((res) => {
      if (res.ok) {
        actions.resetForm();
        toast.success("Wiadomość została wysłana!");
      } else if (res.status === 400) {
        toast.error("Nie udało się wysłać wiadomości!");

        res.json().then((data: { path: string[]; message: string }[]) => {
          for (let i = 0; i < data.length; i++) {
            actions.setErrors({ [data[i].path[0]]: data[i].message });
          }
        });
      }
    });
    actions.setSubmitting(false);
  }

  return (
    <Card
      className="title form p-[35px] lg:px-[35px] w-full md:w-2/3 xl:w-1/2"
      featured
      id="contactForm"
    >
      <Formik
        validationSchema={FormSchema}
        initialValues={{
          email: "",
          message: "",
          allowToSendMarketingInfo: false,
        }}
        onSubmit={onSumbmit}
      >
        {({ errors, touched, isSubmitting, values, setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <Label>{fields[0].label}</Label>
              <Field
                name="email"
                type="email"
                as={Input}
                placeholder={fields[0].placeholder}
              />
              {errors.email && touched.email ? (
                <span className="text-red-500 block text-sm pt-1">
                  {errors.email}
                </span>
              ) : null}
            </div>
            <div>
              <Label>{fields[1].label}</Label>
              <Field
                name="message"
                as={Textarea}
                placeholder={fields[1].placeholder}
              />
              {errors.message && touched.message ? (
                <span className="text-red-500 block text-sm pt-1">
                  {errors.message}
                </span>
              ) : null}
            </div>
            <div>
              <div className="flex justify-start items-start gap-2">
                <Field
                  name="allowToSendMarketingInfo"
                  component={Checkbox}
                  onCheckedChange={() =>
                    setFieldValue(
                      "allowToSendMarketingInfo",
                      !values.allowToSendMarketingInfo
                    )
                  }
                  id="allowToSendMarketingInfo"
                  checked={values.allowToSendMarketingInfo}
                  type="checkbox"
                />
                <Label className="leading-5" htmlFor="allowToSendMarketingInfo">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                  otrzymywania informacji handlowych od Klipkon Sp. z o.o.
                  (wymagane)
                </Label>
              </div>
              {errors.allowToSendMarketingInfo &&
              touched.allowToSendMarketingInfo ? (
                <span className="text-red-500 block text-sm pt-1">
                  {errors.allowToSendMarketingInfo}
                </span>
              ) : null}
            </div>

            <Button
              disabled={isSubmitting}
              fullwidth={true}
              type="submit"
              variant={button.variant}
              size={button.size}
              className="w-full mt-4"
            >
              {button.content}
            </Button>
            <Separator className="my-2" />
            <p className="text-center text-xs">
              This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">
                Privacy Policy
              </a>{" "}
              and
              <a href="https://policies.google.com/terms">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default function FormWrapper(props: Props) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.PUBLIC_GOOGLE_RECAPTCHA_SECRET}
    >
      <ContactForm {...props} />
    </GoogleReCaptchaProvider>
  );
}
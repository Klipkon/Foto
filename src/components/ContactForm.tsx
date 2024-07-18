import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import type { Button as IButton, Field as IField } from "@/interfaces/page.tsx";
import { cn } from "@/lib/utils.ts";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { useCallback, useEffect, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { toast } from "sonner";
import * as Yup from "yup";
import { Checkbox } from "./ui/checkbox.tsx";
import { Separator } from "./ui/separator.tsx";

interface Props {
  fields: IField[];
  button: IButton;
  fullWidth?: boolean;
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

export function ContactForm({ fields, button, fullWidth }: Props) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState<string>("");

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    await executeRecaptcha("Submit").then((token) => setToken(token));
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  async function onSumbmit(
    values: Yup.InferType<typeof FormSchema>,
    actions: FormikHelpers<Yup.InferType<typeof FormSchema>>,
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
      } else {
        toast.error("Nie udało się wysłać wiadomości!");
      }
    });
    actions.setSubmitting(false);
  }

  return (
    <Card
      className={cn(
        !fullWidth ? "md:w-2/3 xl:w-1/2" : "",
        "title form w-full p-[35px] lg:px-[35px]",
      )}
      featured={true}
      id="contactForm"
    >
      <Formik
        validationSchema={FormSchema}
        validateOnBlur={false}
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
                <span className="block pt-1 text-sm text-red-500">
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
                <span className="block pt-1 text-sm text-red-500">
                  {errors.message}
                </span>
              ) : null}
            </div>
            <div>
              <div className="flex items-start justify-start gap-2">
                <Field
                  name="allowToSendMarketingInfo"
                  component={Checkbox}
                  onCheckedChange={() =>
                    setFieldValue(
                      "allowToSendMarketingInfo",
                      !values.allowToSendMarketingInfo,
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
                <span className="block pt-1 text-sm text-red-500">
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
              className="mt-4 w-full"
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

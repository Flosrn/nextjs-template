import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { providers, csrfToken, signIn } from "next-auth/client";
import { useForm } from "react-hook-form";
import { I18nProps } from "next-rosetta";
import { MyLocale } from "i18n/index";
import LayoutPage from "components/ui/layout-page";
import Alert from "components/ui/alert";

interface Props {
  providersList: any;
  token: string;
}

const SignInPage: React.FC<Props> = ({ providersList, token }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [formType, setFormType] = useState<string | string[]>("signup");
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<string | string[]>(null);
  const [errorMessage, setErrorMessage] = useState<string | string[]>(null);
  const { query } = useRouter();

  useEffect(() => {
    setFormType(query.form);
    setErrorCode(query.errorCode);
    setErrorMessage(query.errorMessage);
  }, [query]);

  useEffect(() => {
    setAlertOpen(true);
  }, [errorCode]);

  const onSubmit = (data) => {
    return signIn("credentials", { formType, email: data.email, password: data.password });
  };

  return (
    <LayoutPage>
      <section className="relative w-screen h-screen">
        <div className="absolute w-full top-0 left-0 right-0 bottom-0 flex justify-center overflow-hidden m-0 -z-10">
          <Image
            src="/images/register_bg_2.png"
            layout="fill"
            className="absolute object-contain xl:object-cover object-top bg-no-repeat w-full -z-10"
            quality={50}
          />
        </div>

        <div className="container mx-auto px-4 h-full z-50">
          <div className="flex flex-col content-center items-start justify-center md:items-center h-full md:mt-0">
            <div className="w-full lg:w-4/12 px-4">
              {isAlertOpen && (
                <Alert
                  type="error"
                  title={errorCode}
                  content={errorMessage}
                  closeHandler={() => setAlertOpen(false)}
                />
              )}
              <div className="relative flex flex-col justify-center min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                {formType !== "verify-request" && formType !== "newUser" ? (
                  <>
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="text-center mb-3">
                        <h6 className="text-gray-600 text-sm font-bold">Sign in with</h6>
                      </div>
                      <div className="btn-wrapper text-center">
                        {Object.values(providersList)?.map((provider: any) => {
                          if (provider.id !== "credentials") {
                            return (
                              <button
                                key={provider.id}
                                onClick={() => signIn(provider.id)}
                                className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                <Image src={`/logo/${provider.id}.svg`} width={20} height={20} />
                                <span className="ml-3">{provider.name}</span>
                              </button>
                            );
                          }
                        })}
                      </div>
                      <hr className="mt-6 border-b-1 border-gray-400" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <div className="text-gray-500 text-center mb-3 font-bold">
                        <small>Or sign in with email</small>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <input name="csrfToken" type="hidden" defaultValue={token} />
                        <div className="relative w-full mb-5">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            className="px-3 py-3 mb-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Email"
                            ref={register({ required: true })}
                          />
                          {errors.email && (
                            <span className="text-sm text-red-500 pl-2">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="relative w-full mb-5">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="px-3 py-3 mb-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Password"
                            aria-invalid={errors.password ? "true" : "false"}
                            ref={register({ required: true })}
                          />
                          {errors.password && (
                            <span role="alert" className="text-sm text-red-500 pl-2">
                              This field is required
                            </span>
                          )}
                        </div>
                        {formType === "signup" && (
                          <div className="relative w-full mb-5">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Password repeat
                            </label>
                            <input
                              type="password"
                              id="passwordRepeat"
                              name="passwordRepeat"
                              className="px-3 py-3 mb-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              placeholder="Password"
                              aria-invalid={errors.passwordRepeat ? "true" : "false"}
                              ref={register({
                                required: true,
                                validate: (value) => value === watch("password"),
                              })}
                            />
                            {errors.passwordRepeat && errors.passwordRepeat.type === "required" && (
                              <span role="alert" className="text-sm text-red-500 pl-2">
                                The password is required
                              </span>
                            )}
                            {errors.passwordRepeat && errors.passwordRepeat.type === "validate" && (
                              <span role="alert" className="text-sm text-red-500 pl-2">
                                Passwords are not the same !
                              </span>
                            )}
                          </div>
                        )}

                        <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              id="customCheckLogin"
                              type="checkbox"
                              className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                            />
                            <span className="ml-2 text-sm font-semibold text-gray-700">
                              Remember me
                            </span>
                          </label>
                        </div>

                        <div className="text-center mt-6">
                          <button
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="submit"
                          >
                            {formType === "signup" ? "Sign Up" : "Sign in"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center p-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-12 h-12 text-gray-700"
                    >
                      {formType === "verify-request" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      )}
                      {formType === "newUser" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                        />
                      )}
                    </svg>

                    <div className="text-center mt-3">
                      {formType === "verify-request" &&
                        `A confirmation email have been sent to you, check your inmail box and click on
                      the link for complete your registration.`}
                      {formType === "newUser" &&
                        `Your email address are confirmed, you can sign in :)`}
                    </div>
                    <div className="text-center mt-4">
                      {formType === "verify-request" && (
                        <Link href="/">
                          <a className="text-indigo-600 underline">Go to home</a>
                        </Link>
                      )}
                      {formType === "newUser" && (
                        <a
                          className="text-indigo-600 underline cursor-pointer"
                          onClick={() => setFormType("signin")}
                        >
                          Sign in
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap mt-6">
                <div className="w-1/2">
                  <a href="#pablo" className="text-gray-300">
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  {formType === "signup" ? (
                    <Link href="/auth/signin?form=signin">
                      <a className="text-gray-300" onClick={() => setFormType("signin")}>
                        <small>Log in</small>
                      </a>
                    </Link>
                  ) : (
                    <Link href="/auth/signin?form=signup">
                      <a className="text-gray-300" onClick={() => setFormType("signup")}>
                        <small>Create new account</small>
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutPage>
  );
};

export const getServerSideProps: GetServerSideProps<I18nProps<MyLocale>> = async (context) => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`i18n/${locale}`);
  return {
    props: {
      table,
      token: await csrfToken(context),
      providersList: await providers(context),
    },
  };
};

export default SignInPage;

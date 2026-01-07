---
date: 2026-01-07
---

# How to Use Zod in Combination with React Hook Form to validate and compare passwords

To use Zod together with React Hook Form (RHF), you connect the `zodResolver` to a predefined Zod schema that contains the validation logic. This resolver is passed to the `useForm` hook, allowing RHF to delegate validation entirely to Zod.

```ts
//react hook form
const methods = useForm({
  resolver: zodResolver(getRegisterFormSchema()),
  defaultValues: {
    tenantName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  mode: 'onSubmit',
});
```

```ts
//schema
export const getRegisterFormSchema = () => {
  return z
    .object({
      tenantName: getNameSchema(),
      firstName: getNameSchema(),
      lastName: getNameSchema(),
      email: getEmailSchema(),
      password: getPasswordSchema(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
};
```

The .refine call performs cross-field validation. Instead of validating a single field in isolation, it compares password and confirmPassword at the object level.

By specifying path: ['confirmPassword'], the validation error is explicitly assigned to the confirmPassword field.

## Validation Behavior

When a user submits the form and the values of password and confirmPassword do not match:

- Zod produces a schema-level validation error.

- Due to the configured path, this error is mapped to confirmPassword.

- React Hook Form exposes this error via formState.errors.confirmPassword.

This allows the mismatch error to be handled and displayed exactly like any other field-level validation error in RHF.

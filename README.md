# Free eCommerce Template for Next.js - NextMerce

The free Next.js eCommerce template is a lite version of the NextMerce Next.js eCommerce boilerplate, designed to streamline the launch and management of your online store.

![NextMerce](https://github.com/user-attachments/assets/57155689-a756-4222-8af7-134e556acae2)


While NextMerce Pro features advanced functionalities, seamless integration, and customizable options, providing all the essential tools needed to build and expand your business, the lite version offers a basic Next.js template specifically crafted for eCommerce websites. Both versions ensure superior performance and flexibility, all powered by Next.js.

### NextMerce Free VS NextMerce Pro

| ✨ Features                         | 🎁 NextMerce Free                 | 🔥 NextMerce Pro                        |
|----------------------------------|--------------------------------|--------------------------------------|
| Next.js Pages                    | Static                         | Dynamic Boilerplate Template         |
| Components                       | Limited                        | All According to Demo                |
| eCommerce Functionality          | Included                       | Included                             |
| Integrations (DB, Auth, etc.)    | Not Included                   | Included                             |
| Community Support                | Included                       | Included                             |
| Premium Email Support            | Not Included                   | Included                             |
| Lifetime Free Updates            | Included                       | Included                             |


#### [🚀 Live Demo](https://demo.nextmerce.com/)

#### [🌐 Visit Website](https://nextmerce.com/)

## Update Logs

Version 0.1.2 - [Mar 16, 2026]
- Update Next.js, React, and React DOM dependencies, add baseline-browser-mapping

## Supabase setup

The application now includes the initial Supabase client setup and commerce schema.

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add the project URL and publishable key from Supabase's Connect dialog.
4. Run `supabase/migrations/20260919000000_initial_schema.sql` in the Supabase SQL Editor.
5. Run `supabase/seed.sql` in the SQL Editor to load the current catalog.
6. Create the first user through Supabase Auth, then promote that user to an admin by running:

```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_AUTH_USER_ID';
```

Product files are stored in the `product-media` Storage bucket created by the migration. The storefront currently retains its static catalog while the database-backed catalog and admin workflows are added incrementally.
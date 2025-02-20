### Commands

- `pnpm run dev` - start dev server
- `pnpm run build` - build for production

#### Database

- `pnpm prisma studio` - open prisma studio
- `pnpm prisma migrate dev --name migration_info` - run migrations for api(go to api folder)
- `pnpm prisma migrate reset` - reset migrations

#### Secrets

`openssl rand -hex 32` - generate secret

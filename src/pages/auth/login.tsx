import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { getProviders, getSession, signIn, signOut } from 'next-auth/react'
import type { FC } from 'react'

interface LoginProps {}

const Login: NextPage = ({
  data: session,
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button className='btn btn-error' onClick={() => signOut()}>
          Sign out
        </button>
      </>
    )
  }

  return (
    <>
      Not signed in xd
      <br />
      {providers &&
        Object?.values(providers)?.map((provider: any) => (
          <div key={provider?.name}>
            <button className='btn btn-accent' onClick={() => signIn(provider?.id)}>
              Sign in with {provider?.name}
            </button>
          </div>
        ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const providers = await getProviders()
  const data = await getSession({ req })

  return {
    props: { providers, data },
  }
}

export default Login

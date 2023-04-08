import { useSession } from 'next-auth/react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useRouter } from 'next/router';

function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status !== 'authenticated') {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }

    return <p className={classes.profile}>Loading...</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;

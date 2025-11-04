import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import SplashTela from './auth/splash';

export default function Index() {
  // const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.replace('/auth/login');
  //   }, 7000); 

  //   return () => clearTimeout(timer);
  // }, [router]);

  // return <SplashTela />;

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/auth/(tabs)/home');
    }, 1000); 

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashTela />;
}
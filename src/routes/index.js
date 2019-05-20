import Loadable from 'react-loadable';
import SpinContainer from '../components/SpinContainer/SpinContainer';

export const SignUp = Loadable({
  loader: () => import('./SignUp'),
  loading: SpinContainer
});

export const SignIn = Loadable({
  loader: () => import('./SignIn'),
  loading: SpinContainer
});

export const SecretGarden = Loadable({
  loader: () => import('./SecretGarden'),
  loading: SpinContainer
});

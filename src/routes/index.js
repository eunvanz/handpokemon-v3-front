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

export const Pick = Loadable({
  loader: () => import('./Pick'),
  loading: SpinContainer
});

export const Collection = Loadable({
  loader: () => import('./Collection'),
  loading: SpinContainer
});

export const Book = Loadable({
  loader: () => import('./Book'),
  loading: SpinContainer
});

export const Achievement = Loadable({
  loader: () => import('./Achievement'),
  loading: SpinContainer
});

export const Ranking = Loadable({
  loader: () => import('./Ranking'),
  loading: SpinContainer
});

export const Shop = Loadable({
  loader: () => import('./Shop'),
  loading: SpinContainer
});

export const Giftbox = Loadable({
  loader: () => import('./Giftbox'),
  loading: SpinContainer
});

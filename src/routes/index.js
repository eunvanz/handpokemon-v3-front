import Loadable from 'react-loadable';
import SpinContainer from '../components/SpinContainer/SpinContainer';

export const SignUp = Loadable({
  loader: () => import('./SignUp'),
  loading: SpinContainer
});

import Loadable from 'react-loadable';
import SpinContainer from '../../../components/SpinContainer';

export const CreateMon = Loadable({
  loader: () => import('./CreateMon'),
  loading: SpinContainer
});

export const CreateMonImage = Loadable({
  loader: () => import('./CreateMonImage'),
  loading: SpinContainer
});

export const MonList = Loadable({
  loader: () => import('./MonList'),
  loading: SpinContainer
});

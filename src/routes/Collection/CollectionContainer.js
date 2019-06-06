import React, { PureComponent } from 'react';
import { compose } from 'redux';
import queryString from 'query-string';

import CollectionView from './CollectionView';
import withUser from '../../hocs/withUser';
import { getCollectionsByUserId } from '../../api/requestCollection';
import MessageModal from '../../components/MessageMoal';
import SpinContainer from '../../components/SpinContainer';
import withView from '../../hocs/withView';
import { getAllMons } from '../../api/requestMon';
import withFilter from '../../hocs/withFilter';
import ConfirmModal from '../../components/ConfirmModal';
import { isUserBookMon } from '../../libs/hpUtils';

class CollectionContainer extends PureComponent {
  state = {
    collections: null,
    mode: null
  };

  componentDidMount() {
    const { match, user, history, colToMix, location } = this.props;
    if (match.params.id === 'user') {
      if (user) {
        const { mode } = queryString.parse(location.search);
        let collections;
        if (mode === 'mix' && colToMix) {
          collections = user.collections.filter(
            item => item.monId !== colToMix.monId
          );
          this.setState({ mode });
        } else if (mode === 'book') {
          collections = user.collections;
          this.setState({ mode });
        } else collections = user.collections;
        this.setState({ collections });
      } else history.push('/sign-in');
    } else {
      getCollectionsByUserId(match.params.id)
        .then(res => {
          this.setState({ collections: res.data });
        })
        .catch(err => {
          MessageModal({
            type: 'error',
            content: err
          });
        });
    }
  }

  _handleOnMix = cols => {
    const { viewActions, history } = this.props;

    const proceed = () => {
      viewActions.receiveView('colsToMix', cols);
      history.push('/pick');
    };

    proceed();
  };

  _handleOnEvolute = col => {
    const { viewActions, history } = this.props;
    viewActions.receiveView('colToEvolute', col);
    history.push('/pick');
  };

  render() {
    const { match, filter } = this.props;
    const { collections, mode } = this.state;
    if (!collections || !filter) return <SpinContainer />;
    return (
      <CollectionView
        {...this.props}
        collections={this.props.collections || collections}
        isMyCollection={match.params.id === 'user'}
        onMix={this._handleOnMix}
        onEvolute={this._handleOnEvolute}
        mode={mode}
      />
    );
  }
}

const wrappedCollectionView = compose(
  withUser(),
  withView([
    {
      key: 'mons',
      request: getAllMons,
      required: true
    },
    {
      key: 'colToMix'
    },
    {
      key: 'defaultSelectOptions'
    }
  ]),
  withFilter()
)(CollectionContainer);

export default wrappedCollectionView;

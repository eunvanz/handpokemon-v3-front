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
import { getUserByUserId } from '../../api/requestUser';
import withMonCardProps from '../../hocs/withMonCardProps';

class CollectionContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { mode } = queryString.parse(props.location.search);
    this.state = {
      collections: props.user ? props.user.collections : null,
      user: null,
      mode // null, mix, book, defense
    };
  }

  componentDidMount() {
    const {
      match,
      user,
      history,
      colToMix,
      location,
      userActions
    } = this.props;
    if (match.params.id === 'user') {
      this.setState({ user: null });
      if (user) {
        userActions.fetchUserCollectionsWithToken().then(() => {
          const { mode } = queryString.parse(location.search);
          let collections;
          if (mode === 'mix' && colToMix) {
            collections = user.collections.filter(
              item => item.monId !== colToMix.monId
            );
            this.setState({ mode });
          } else if (mode === 'book' || mode === 'defense') {
            collections = user.collections;
            this.setState({ mode });
          } else collections = user.collections;
          this.setState({ collections });
        });
      } else history.push('/sign-in');
    } else {
      getUserByUserId(match.params.id)
        .then(res => {
          this.setState({ user: res.data });
          return getCollectionsByUserId(match.params.id);
        })
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
    const { match, filter, user, ...restProps } = this.props;
    const { collections, mode } = this.state;
    if (!collections || !filter) return <SpinContainer />;
    return (
      <CollectionView
        {...restProps}
        filter={filter}
        user={this.state.user || user}
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
  withFilter(),
  withMonCardProps
)(CollectionContainer);

export default wrappedCollectionView;

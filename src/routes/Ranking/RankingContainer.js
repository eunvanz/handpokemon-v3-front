import React, { PureComponent } from 'react';
import { compose } from 'redux';

import RankingView from './RankingView';
import withUser from '../../hocs/withUser';
import withList from '../../hocs/withList';
import { getRank, getMyRank } from '../../api/requestUser';
import SpinContainer from '../../components/SpinContainer';
import withView from '../../hocs/withView';

const typeMap = {
  collection: 'colPoint',
  battle: 'battlePoint'
};
const keyMap = {
  collection: 'colRankList',
  battle: 'battleRankList'
};
const myKeyMap = {
  collection: 'myColRank',
  battle: 'myBattleRank'
};
class RankingContainer extends PureComponent {
  state = {
    loading: false
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { type } = params;
    this._initList(type);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this._initList(typeMap[this.props.match.params.type]);
    }
  }

  _initList = type => {
    const { listActions, viewActions, user } = this.props;
    listActions.fetchAndAppendList({
      key: keyMap[type],
      reset: true,
      request: () =>
        getRank({ curPage: 1, perPage: 20, orderBy: typeMap[type] })
    });
    if (user) {
      viewActions.fetchView({
        key: myKeyMap[type],
        request: () => getMyRank({ key: typeMap[type] })
      });
    }
  };

  _getTitle = () => {
    const { match } = this.props;
    const { type } = match.params;
    if (type === 'collection') return '콜렉션랭킹';
    else return '시합랭킹';
  };

  _handleLoadNextPage = () => {
    const { listActions } = this.props;
    const { type } = this.props.match.params;
    const list = this.props[keyMap[type]];
    this.setState({ loading: true });
    listActions
      .fetchAndAppendList({
        key: keyMap[type],
        request: () =>
          getRank({
            curPage: list.curPage + 1,
            perPage: list.size,
            orderBy: typeMap[type]
          })
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const {
      match,
      colRankList,
      battleRankList,
      myColRank,
      myBattleRank
    } = this.props;
    if (
      (match.params.type === 'collection' && !colRankList) ||
      (match.params.type === 'battle' && !battleRankList)
    )
      return <SpinContainer />;
    return (
      <RankingView
        {...this.props}
        title={this._getTitle()}
        loadNextPage={this._handleLoadNextPage}
        loading={this.state.loading}
        list={match.params.type === 'collection' ? colRankList : battleRankList}
        myRank={match.params.type === 'collection' ? myColRank : myBattleRank}
        pointKey={
          match.params.type === 'collection' ? 'colPoint' : 'battlePoint'
        }
      />
    );
  }
}

const wrappedRankingView = compose(
  withUser(),
  withList([
    {
      key: 'colRankList'
    },
    {
      key: 'battleRankList'
    }
  ]),
  withView([
    {
      key: 'myColRank'
    },
    {
      key: 'myBattleRank'
    }
  ])
)(RankingContainer);

export default wrappedRankingView;

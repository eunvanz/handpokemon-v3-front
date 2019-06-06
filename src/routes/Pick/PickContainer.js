import React, { PureComponent } from 'react';
import { compose } from 'redux';

import PickView from './PickView';
import withView from '../../hocs/withView';
import withCodes from '../../hocs/withCodes';
import {
  getPick,
  getMixedCollection,
  getEvolutedCollection
} from '../../api/requestCollection';
import withUser from '../../hocs/withUser';
import { proceedPickActions } from '../../libs/hpUtils';
import MessageModal from '../../components/MessageMoal/index';

class PickContainer extends PureComponent {
  state = {
    loading: false
  };

  componentDidMount() {
    const {
      colsToMix,
      viewActions,
      userActions,
      user,
      colToEvolute
    } = this.props;
    if (colsToMix) {
      this.setState({ loading: true });
      getMixedCollection(colsToMix.map(col => col.id).join(','))
        .then(res => {
          proceedPickActions({
            viewActions,
            userActions,
            prevUserCollections: user.collections,
            pickedMons: res.data
          });
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ loading: false });
          MessageModal({
            type: 'error',
            content: err
          });
        });
    } else if (colToEvolute) {
      this._handleOnClickEvolute(colToEvolute);
    }
  }

  _handleOnPick = ({ gradeCds, attrCds, repeatCnt }) => {
    const { viewActions, userActions, prevPickOptions, user } = this.props;
    // before after 비교를 위해 사용자의 콜렉션을 읽어옴
    const pickOptions = Object.assign({}, prevPickOptions);
    if (gradeCds) pickOptions.gradeCds = gradeCds;
    if (attrCds) pickOptions.attrCds = attrCds;
    if (repeatCnt) pickOptions.repeatCnt = repeatCnt;
    viewActions.receiveView('prevPickOptions', pickOptions);
    return getPick(pickOptions)
      .then(res => {
        proceedPickActions({
          viewActions,
          userActions,
          prevUserCollections: user.collections,
          pickedMons: res.data
        });
        return Promise.resolve();
      })
      .catch(err => {
        MessageModal({
          type: 'error',
          content: err
        });
        userActions.signInUserWithToken();
      });
  };

  _handleOnInitialize = () => {
    const { viewActions } = this.props;
    viewActions.clearView('pickedMons');
  };

  _handleOnClickMix = col => {
    const { viewActions, history } = this.props;
    viewActions.receiveView('colToMix', col);
    history.push('/collection/user?mode=mix');
  };

  _handleOnClickEvolute = col => {
    const { viewActions, userActions, user } = this.props;
    this.setState({ loading: true });
    getEvolutedCollection(col.id).then(res => {
      proceedPickActions({
        viewActions,
        userActions,
        prevUserCollections: user.collections,
        pickedMons: res.data
      });
      this.setState({ loading: false });
    });
  };

  render() {
    return (
      <PickView
        onPick={this._handleOnPick}
        onInit={this._handleOnInitialize}
        onClickMix={this._handleOnClickMix}
        onClickEvolute={this._handleOnClickEvolute}
        loading={this.state.loading}
        {...this.props}
      />
    );
  }
}

const wrappedPickView = compose(
  withView([
    {
      key: 'pickedMons'
    },
    {
      key: 'prevPickOptions'
    },
    {
      key: 'prevUserCollections'
    },
    {
      key: 'colsToMix'
    },
    {
      key: 'colToEvolute'
    }
  ]),
  withCodes,
  withUser({ required: true })
)(PickContainer);

export default wrappedPickView;

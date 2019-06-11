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
import TitleTag from '../../components/TitleTag';

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
            pickedMons: res.data,
            achieved: res.achievements
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.achieved !== this.props.achieved) {
      const { achieved } = this.props;
      if (achieved) {
        const hasIssue =
          achieved.inserted.length + achieved.deactivated.length > 0;
        if (hasIssue) {
          const { inserted, deactivated } = achieved;
          if (inserted.length > 0) {
            MessageModal({
              type: 'success',
              title: '업적 달성',
              content: (
                <div>
                  콜렉션 성장으로 아래의 칭호를 얻었습니다!
                  {inserted.map(item => (
                    <div style={{ marginTop: 12 }}>
                      <TitleTag
                        title={item.achievement.name}
                        attrCd={item.achievement.attrCd}
                        burf={item.achievement.burf.split(',')}
                      />
                      <span
                        className='c-primary fw-700'
                        style={{ marginLeft: 12 }}
                      >
                        +{item.achievement.reward}
                      </span>{' '}
                      포키머니
                    </div>
                  ))}
                </div>
              )
            });
          }
          if (deactivated.length > 0) {
            MessageModal({
              type: 'warning',
              title: '칭호 해제',
              content: (
                <div>
                  콜렉션 변화로 아래의 칭호가 해제되었습니다!
                  {inserted.map(item => (
                    <div style={{ marginTop: 12 }}>
                      <TitleTag
                        title={item.achievement.name}
                        attrCd={item.achievement.attrCd}
                        burf={item.achievement.burf.split(',')}
                      />
                    </div>
                  ))}
                </div>
              )
            });
          }
        }
      }
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
          pickedMons: res.data,
          achieved: res.achievements
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
        pickedMons: res.data,
        achieved: res.achievements
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

// pickedMons에 { insert, update } 방식으로 데이터가 들어있으면 채집결과 화면을 보여줌
// 위의 조건과 함께 prevUserCollections가 세팅되어있어야함

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
    },
    {
      key: 'achieved'
    }
  ]),
  withCodes,
  withUser({ required: true })
)(PickContainer);

export default wrappedPickView;

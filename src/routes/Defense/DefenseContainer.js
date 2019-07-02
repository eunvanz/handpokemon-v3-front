import React, { PureComponent } from 'react';
import { compose } from 'redux';
import withView from '../../hocs/withView';
import withUser from '../../hocs/withUser';
import withCodes from '../../hocs/withCodes';
import withFilter from '../../hocs/withFilter';
import { LEAGUE_RULE } from '../../constants/rules';

import DefenseView from './DefenseView';
import { getDefensesByToken } from '../../api/requestDefense';

class DefenseContainer extends PureComponent {
  componentDidMount() {
    const { viewActions } = this.props;
  }

  _handleOnClickChangeMon = defense => {
    const { history } = this.props;
    this._handleOnClickCommon(defense.seq);
    history.push('/collection/user?mode=defense');
  };

  _handleOnClickCommon = seq => {
    const {
      user,
      filterActions,
      viewActions,
      resetFilter,
      history,
      defenseMons
    } = this.props;
    const maxCost = LEAGUE_RULE[user.leagueCd].maxCost;
    const restDefenseMons = defenseMons.filter(defense => defense.seq !== seq);
    const currentCost = restDefenseMons.reduce(
      (accm, item) => item.col.mon.cost + accm,
      0
    );
    const availableCost = maxCost - currentCost - 2 - restDefenseMons.length;
    const availableCostArr = [];
    for (let i = 0; i < availableCost; i++) {
      availableCostArr.push(i + 1);
    }
    resetFilter();
    filterActions.updateFilter('disabled', ['defense', 'cost']);
    filterActions.updateFilter('defense', ['N']);
    filterActions.updateFilter('cost', availableCostArr);
    viewActions.receiveView('defaultSelectOptions', {
      message: <div>수비에 배치할 포켓몬을 선택해주세요.</div>,
      onSelect: targetCol => {
        viewActions.receiveView('colToPostDefense', targetCol);
        viewActions.receiveView('colToPostDefenseSeq', seq);
        resetFilter();
        history.push('/defense');
      },
      onCancel: () => {
        resetFilter();
        history.push('/defense');
      }
    });
  };

  _handleOnClickAddMon = seq => {
    const { history } = this.props;
    this._handleOnClickCommon(seq);
    history.push('/collection/user?mode=defense');
  };

  render() {
    return (
      <DefenseView
        onClickChangeMon={this._handleOnClickChangeMon}
        onClickAddMon={this._handleOnClickAddMon}
        {...this.props}
      />
    );
  }
}

const wrappedDefenseView = compose(
  withView([
    {
      key: 'defenseMons',
      request: getDefensesByToken,
      required: true
    },
    {
      key: 'colToPostDefense'
    },
    {
      key: 'colToPostDefenseSeq'
    }
  ]),
  withUser({
    required: true
  }),
  withCodes,
  withFilter()
)(DefenseContainer);

export default wrappedDefenseView;

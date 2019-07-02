import React from 'react';
import { connect } from 'react-redux';
import { receiveFilter, updateFilter } from '../store/filter';
import withCodes from './withCodes';
import { getMasterCdGroup } from '../libs/codeUtils';
import { MASTER_CD } from '../constants/codes';
import SpinContainer from '../components/SpinContainer';

export default (
  { initialFilter } = { initialFilter: null }
) => ComposedComponent => {
  class withFilter extends React.PureComponent {
    componentDidMount() {
      const { filterActions, filter } = this.props;
      if (!filter) {
        this._initializeFilter();
      }
      if (initialFilter) filterActions.receiveFilter(initialFilter);
    }

    _initializeFilter = () => {
      const { filterActions, codes } = this.props;
      const basicFilter = {
        has: ['Y'],
        gradeCd: getMasterCdGroup(MASTER_CD.MON_GRADE, codes).map(
          item => item.detailCd
        ),
        mainAttrCd: getMasterCdGroup(MASTER_CD.MON_ATTRS, codes).map(
          item => item.detailCd
        ),
        subAttrCd: [''].concat(
          getMasterCdGroup(MASTER_CD.MON_ATTRS, codes).map(
            item => item.detailCd
          )
        ),
        cost: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        rankCd: [''].concat(
          getMasterCdGroup(MASTER_CD.MON_RANK, codes).map(item => item.detailCd)
        ),
        generation: [1, 2, 3, 4, 5, 6, 7, 8],
        evolutable: ['Y', 'N'],
        defense: ['Y', 'N'],
        disabled: []
      };
      filterActions.receiveFilter(basicFilter);
    };

    render() {
      const { filter } = this.props;
      if (!filter) return <SpinContainer />;
      return (
        <ComposedComponent
          {...this.props}
          resetFilter={this._initializeFilter}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return { filter: state.filter };
  };

  const mapDispatchToProps = dispatch => ({
    filterActions: {
      receiveFilter: filter => dispatch(receiveFilter(filter)),
      updateFilter: (key, filter) => dispatch(updateFilter(key, filter))
    }
  });

  return withCodes(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withFilter)
  );
};

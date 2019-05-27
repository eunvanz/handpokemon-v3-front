import React, { memo } from 'react';
import SelectDungeon from './SelectDungeon';
import PickResult from './PickResult';
import SpinContainer from '../../components/SpinContainer';

const PickView = ({
  pickedMons,
  onPick,
  user,
  codes,
  history,
  onInit,
  prevUserCollections,
  prevPickOptions,
  onClickMix,
  onClickEvolute,
  loading
}) => {
  return (
    <div>
      {loading && <SpinContainer />}
      {!loading && !pickedMons && (
        <SelectDungeon onPick={onPick} user={user} codes={codes} />
      )}
      {pickedMons && (
        <PickResult
          pickedMons={pickedMons}
          codes={codes}
          onPick={onPick}
          user={user}
          history={history}
          onInit={onInit}
          prevUserCollections={prevUserCollections}
          prevPickOptions={prevPickOptions}
          onClickMix={onClickMix}
          onClickEvolute={onClickEvolute}
        />
      )}
    </div>
  );
};

export default memo(PickView);

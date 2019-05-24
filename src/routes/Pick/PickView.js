import React, { memo } from 'react';
import SelectDungeon from './SelectDungeon';
import PickResult from './PickResult';

const PickView = ({ pickedMons, onPick, user, codes, history }) => {
  return (
    <div>
      {!pickedMons && (
        <SelectDungeon onPick={onPick} user={user} codes={codes} />
      )}
      {pickedMons && (
        <PickResult
          pickedMons={pickedMons}
          codes={codes}
          onPick={onPick}
          user={user}
          history={history}
        />
      )}
    </div>
  );
};

export default memo(PickView);

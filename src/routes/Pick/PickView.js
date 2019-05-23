import React, { memo, useState } from 'react';
import SelectDungeon from './SelectDungeon';

const PickView = ({
  defaultStep = 0, // 0 - 던전선택, 1 - 채집
  pickedMons,
  onSelectDungeon,
  user,
  codes
}) => {
  const [step, setStep] = useState(defaultStep);

  return (
    <div>
      {step === 0 && (
        <SelectDungeon
          onSelectDungeon={onSelectDungeon}
          user={user}
          codes={codes}
        />
      )}
    </div>
  );
};

export default memo(PickView);

import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { translate as __ } from 'foremanReact/common/I18n';
import { DualListSelector } from '@patternfly/react-core';
import ACSCreateContext from '../ACSCreateContext';
import WizardHeader from '../../../ContentViews/components/WizardHeader';
import { selectSmartProxy } from '../../../SmartProxy/SmartProxyContentSelectors';

const ACSSmartProxies = () => {
  const {
    smartProxies, setSmartProxies,
  } = useContext(ACSCreateContext);
  const availableSmartProxies = useSelector(selectSmartProxy);
  const { results } = availableSmartProxies;
  const [availableOptions, setAvailableOptions] = useState(results?.map(proxy =>
    proxy.name)?.filter(sp => !smartProxies.includes(sp)));
  const onListChange = (newAvailableOptions, newChosenOptions) => {
    setAvailableOptions(newAvailableOptions);
    setSmartProxies(newChosenOptions);
  };

  return (
    <>
      <WizardHeader
        title={__('Select smart proxy')}
        description={__('Select smart proxies to be used with this source.')}
      />
      <DualListSelector
        isSearchable
        availableOptions={availableOptions}
        chosenOptions={smartProxies}
        addAll={onListChange}
        removeAll={onListChange}
        addSelected={onListChange}
        removeSelected={onListChange}
        id="selector"
      />
    </>
  );
};

export default ACSSmartProxies;

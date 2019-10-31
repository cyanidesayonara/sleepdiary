import React from 'react';
import External from './External';
import ExternalForm from './ExternalForm';

const Externals = ({
    externals,
    addExternal,
    externalType,
    handleExternalTypeChange,
    externalDate,
    handleDateChange,
    externalQuantityValue,
    handleQuantityChange,
    deleteExternal, 
    updateExternal
}) => {
    const formInputs = [
        {
            name: 'Quantity',
            type: 'text',
            value: externalQuantityValue,
            onChange: handleQuantityChange
        }
    ]
    const selectionInputs = {
        value: externalType,
        onChange: handleExternalTypeChange,
        values: [
            {
                id: 1,
                value: 'COFFEE'
            },
            {
                id: 2,
                value: 'ALCOHOL'
            },
            {
                id: 3,
                value: 'MEDICINE'
            },
            {
                id: 4,
                value: 'OTHER'
            }
        ]
    }
    return (
        <div>
            <h1>Externals</h1>
            <h2>Add a new external</h2>
            <ExternalForm externalDate={externalDate} handleDateChange={handleDateChange} inputs={formInputs} select={selectionInputs} submit={addExternal}/>
            <h2>Externals</h2>
            <h3>Add a new external</h3>
            <ExternalForm inputs={formInputs} select={selectionInputs} submit={addExternal} />
            <h1>
                External factors 
            </h1>
            {externals.map(e => 
            <External 
                key={e.id} 
                ext={e} 
                deleteExternal={deleteExternal}
                updateExternal={updateExternal}
                select={selectionInputs}
            />)}
        </div>
    )
}

export default Externals;
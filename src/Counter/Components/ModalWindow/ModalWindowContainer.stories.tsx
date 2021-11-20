import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ReduxProviderDecorator} from "../../ReduxProviderDecorator";
import {
    ModalWindowContainer,
    ModalWindowContainerPropsType
} from "./ModalWindowContainer";
import {action} from "@storybook/addon-actions";



export default {
    component: ModalWindowContainer,
    title: 'Components/ModalWindowContainer',
    decorators:[ReduxProviderDecorator]
} as Meta;

const Template: Story<ModalWindowContainerPropsType> = (args) => <ModalWindowContainer {...args} />;

export const ModalWindowContainerBasic = Template.bind({});

const setModalCallback = action('event setModalCallback was happened')
ModalWindowContainerBasic.args = {
    setModal: setModalCallback,
/*    startValue: 10,
    finishValue: 20,
    autoPlayOption: true,
    speedAutoplayOption: 2,
    conditionOfWork: 'increase'*/
};


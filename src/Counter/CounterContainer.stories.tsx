import React from 'react';
import { Meta } from '@storybook/react';
import {CounterContainer} from "./CounterContainer";
import {ReduxProviderDecorator} from "./ReduxProviderDecorator";



export default {
    component: CounterContainer,
    title: 'Components/CounterContainer',
    decorators:[ReduxProviderDecorator]
} as Meta;

const Template = () => <CounterContainer />;

export const CounterContainerBasic = Template.bind({});

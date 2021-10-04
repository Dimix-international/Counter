import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Area, AreaPropsType} from "./Area";


export default {
    component: Area,
    title: 'Components/Area',
} as Meta;

const Template: Story<AreaPropsType> = (args) => <Area {...args} />;

export const AreaBasic = Template.bind({});

AreaBasic.args = {
    maxValue: 5,
    value: 0,
};
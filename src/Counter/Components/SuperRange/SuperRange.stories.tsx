import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {SuperRange, SuperRangePropsType} from "./SuperRange";



export default {
    component: SuperRange,
    title: 'Components/SuperRange',
} as Meta;

const Template: Story<SuperRangePropsType> = (args) => <SuperRange {...args} />;

export const SuperRangeBasic = Template.bind({});

const callback = action('event submit was happened')
SuperRangeBasic.args = {
    value: 1,
    callback: callback
};
